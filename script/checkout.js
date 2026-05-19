import { products } from "./products.js";

const checkoutItemsContainer = document.querySelector(".js-checkout-items");
const itemsCountElement = document.querySelector(".js-summary-items");
const subtotalElement = document.querySelector(".js-summary-subtotal");
const totalElement = document.querySelector(".js-summary-total");

let cart = JSON.parse(localStorage.getItem("shopco-cart") || "[]");

if (!Array.isArray(cart)) {
    cart = [];
}

function formatPrice(cents) {
    return `$${(cents / 100).toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem("shopco-cart", JSON.stringify(cart));
}

function renderCheckout() {
    if (!checkoutItemsContainer) {
        return;
    }

    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = `
            <div class="empty-state">
                Your cart is empty. Add some products from the homepage.
            </div>
        `;
        if (itemsCountElement) {
            itemsCountElement.textContent = "0";
        }
        if (subtotalElement) {
            subtotalElement.textContent = "$0.00";
        }
        if (totalElement) {
            totalElement.textContent = "$0.00";
        }
        return;
    }

    let itemsHtml = "";
    let totalItems = 0;
    let subtotalCents = 0;

    cart.forEach((cartItem) => {
        const matchedProduct = products.find((product) => product.id === cartItem.productId);
        if (!matchedProduct) {
            return;
        }

        totalItems += cartItem.quantity;
        subtotalCents += matchedProduct.priceCents * cartItem.quantity;

        itemsHtml += `
            <article class="checkout-item">
                <img src="../${matchedProduct.image}" alt="${matchedProduct.name}">
                <div>
                    <p class="item-title">${matchedProduct.name}</p>
                    <div class="item-quantity-controls">
                        <button class="quantity-btn js-update-quantity" type="button" data-product-id="${cartItem.productId}" data-change="-1">-</button>
                        <span class="item-qty-value">${cartItem.quantity}</span>
                        <button class="quantity-btn js-update-quantity" type="button" data-product-id="${cartItem.productId}" data-change="1">+</button>
                    </div>
                    <p class="item-meta">Unit Price: ${formatPrice(matchedProduct.priceCents)}</p>
                    <button class="delete-btn js-delete-item" type="button" data-product-id="${cartItem.productId}">Delete</button>
                </div>
                <p class="item-price">${formatPrice(matchedProduct.priceCents * cartItem.quantity)}</p>
            </article>
        `;
    });

    checkoutItemsContainer.innerHTML = itemsHtml;

    if (itemsCountElement) {
        itemsCountElement.textContent = String(totalItems);
    }

    if (subtotalElement) {
        subtotalElement.textContent = formatPrice(subtotalCents);
    }

    if (totalElement) {
        totalElement.textContent = formatPrice(subtotalCents);
    }
}

if (checkoutItemsContainer) {
    checkoutItemsContainer.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        const quantityButton = target.closest(".js-update-quantity");
        if (quantityButton instanceof HTMLElement) {
            const productId = quantityButton.dataset.productId;
            const change = Number(quantityButton.dataset.change);

            if (!productId || !Number.isFinite(change)) {
                return;
            }

            cart = cart
                .map((item) => {
                    if (item.productId !== productId) {
                        return item;
                    }

                    return {
                        ...item,
                        quantity: item.quantity + change
                    };
                })
                .filter((item) => item.quantity > 0);

            saveCart();
            renderCheckout();
            return;
        }

        const deleteButton = target.closest(".js-delete-item");
        if (deleteButton instanceof HTMLElement) {
            const productId = deleteButton.dataset.productId;
            if (!productId) {
                return;
            }

            cart = cart.filter((item) => item.productId !== productId);
            saveCart();
            renderCheckout();
        }
    });
}

renderCheckout();
