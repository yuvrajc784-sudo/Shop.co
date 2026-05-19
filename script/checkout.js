import { products } from "./products.js";

const checkoutItemsContainer = document.querySelector(".js-checkout-items");
const itemsCountElement = document.querySelector(".js-summary-items");
const subtotalElement = document.querySelector(".js-summary-subtotal");
const totalElement = document.querySelector(".js-summary-total");

const savedCart = JSON.parse(localStorage.getItem("shopco-cart") || "[]");

function formatPrice(cents) {
    return `$${(cents / 100).toFixed(2)}`;
}

function renderCheckout() {
    if (!checkoutItemsContainer) {
        return;
    }

    if (!Array.isArray(savedCart) || savedCart.length === 0) {
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

    savedCart.forEach((cartItem) => {
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
                    <p class="item-meta">Qty: ${cartItem.quantity}</p>
                    <p class="item-meta">Unit Price: ${formatPrice(matchedProduct.priceCents)}</p>
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

renderCheckout();
