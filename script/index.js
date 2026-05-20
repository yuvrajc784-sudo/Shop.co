import { products } from "./products.js";
import { cart } from "./cart.js";

async function login() {
    const response = await fetch("", {
        method: "POST",
        headers: {  "Content-Type": "application/json" },
        body: JSON.stringify({ username: "user", password: "pass" }),
    }); 
}

let html = "";

cart.length = 0;
localStorage.setItem("shopco-cart", "[]");

products.forEach((product) => {
    const ratingImage = `images/ratings/rating-${Math.round(product.rating.stars * 10)}.png`;

    html += `<div class="item">
            <div class="pic"><img src="${product.image}" alt=""></div>
            <h3 class="product-name">${product.name}</h3>
            <div class="rating-stars"><img src="${ratingImage}" alt="${product.rating.stars} stars"><span>${product.rating.count}</span></div>
            <h4>$${(product.priceCents / 100).toFixed(2)}</h4>
            <button class="add-to-cart js-add-to-cart" data-id = "${product.id}">ADD TO CART</button>
           </div>`
})

document.querySelector(".product").innerHTML = html;

function getCartQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function syncCart() {
    localStorage.setItem("shopco-cart", JSON.stringify(cart));
    const cartIcon = document.querySelector(".js-fa-solid");
    if (cartIcon) {
        const quantity = getCartQuantity();
        cartIcon.innerHTML = quantity > 0 ? quantity : "";
    }
}

syncCart();

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        let productId = button.dataset.id;

        let exists = false;
        cart.forEach((item) => {
            if (item.productId === productId) {
                item.quantity += 1;
                exists = true;
            }
        });

        if (!exists) {
            cart.push({
                productId,
                quantity: 1
            });
        }
        syncCart();
    });
})


const banners = [
    {
        image: "./images/HomePageBanner_Desktop_Toner_1600x.avif",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab id voluptas nesciunt ipsa, beatae eligendi eos nemo hic sequi est minima, quae tenetur, animi modi. Doloremque eum"
    },
    {
        image: "./images/Artboard_1_copy_9_3_1600x.avif",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab id voluptas nesciunt ipsa, beatae eligendi eos nemo hic sequi est minima, quae tenetur, animi modi. Doloremque eum"
    }
];

let bannerIndex = 0;
const bannerContainer = document.querySelector(".js-banner");

function renderBanner() {
    if (!bannerContainer) {
        return;
    }

    const banner = banners[bannerIndex];
    bannerContainer.innerHTML = `
        <img src="${banner.image}" alt="Banner image">
        <p class="line">${banner.text}</p>
    `;
}

renderBanner();

setInterval(() => {
    if (!bannerContainer) {
        return;
    }

    bannerContainer.classList.add("is-fading");

    setTimeout(() => {
        bannerIndex = (bannerIndex + 1) % banners.length;
        renderBanner();
        bannerContainer.classList.remove("is-fading");
    }, 350);
}, 3000);
    
document.querySelector(".js-bar").addEventListener("click", () => {
    const menuButton = document.querySelector(".js-bar");
    const mobileMenu = document.querySelector(".items2");
    const isActive = mobileMenu.classList.toggle("active");

    menuButton.innerHTML = isActive
        ? `<i class="fa-solid fa-x"></i>`
        : `<i class="fa-solid fa-bars"></i>`;
});

const cartButton = document.querySelector(".js-cart");
if (cartButton) {
    cartButton.addEventListener("click", () => {
        window.location.href = "./html/checkout.html";
    });
}

const userButton = document.querySelector(".user");
if (userButton) {
    userButton.addEventListener("click", () => {
        window.location.href = "./html/auth.html";
    });
}

const chatToggleButton = document.querySelector(".js-chat-toggle");
const chatPanel = document.querySelector(".js-chat-panel");
const chatCloseButton = document.querySelector(".js-chat-close");
const chatClearButton = document.querySelector(".js-chat-clear");
const chatSuggestionButtons = document.querySelectorAll(".js-chat-suggestion");
const chatBody = document.querySelector(".chat-body");
const chatInput = document.querySelector(".chat-input");
const chatStorageKey = "shopco-chat-history";

function getStoredChatMessages() {
    try {
        const storedMessages = window.localStorage.getItem(chatStorageKey);
        return storedMessages ? JSON.parse(storedMessages) : [];
    } catch {
        return [];
    }
}

function saveChatMessages(messages) {
    window.localStorage.setItem(chatStorageKey, JSON.stringify(messages));
}

function getCurrentChatMessages() {
    return Array.from(chatBody?.querySelectorAll(".chat-message") || []).map((messageElement) => ({
        type: messageElement.classList.contains("user") ? "user" : "support",
        message: messageElement.textContent || ""
    }));
}

function appendChatMessage(message, type) {
    if (!chatBody) {
        return;
    }

    const messageElement = document.createElement("div");
    messageElement.className = `chat-message ${type}`;
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function renderChatHistory(messages) {
    if (!chatBody) {
        return;
    }

    chatBody.querySelectorAll(".chat-message").forEach((messageElement) => messageElement.remove());

    messages.forEach((entry) => {
        appendChatMessage(entry.message, entry.type);
    });
}

function getChatReply(question) {
    const normalizedQuestion = question.toLowerCase();

    if (/\b(hello|hi|hey)\b/.test(normalizedQuestion)) {
        return "Hi! Ask me about orders, shipping, returns, payments, or products.";
    }

    if (normalizedQuestion.includes("track") || normalizedQuestion.includes("where is my order") || normalizedQuestion.includes("delivery status")) {
        return "If your order has shipped, tracking details should appear in your order confirmation or checkout flow.";
    }

    if (normalizedQuestion.includes("order") || normalizedQuestion.includes("checkout")) {
        return "You can review your cart and continue to checkout from the cart icon.";
    }

    if (normalizedQuestion.includes("cancel") || normalizedQuestion.includes("change my order")) {
        return "If you need to cancel or change an order, contact support as soon as possible with your order details.";
    }

    if (normalizedQuestion.includes("shipping") || normalizedQuestion.includes("delivery")) {
        return "Shipping details are shown during checkout before you place the order.";
    }

    if (normalizedQuestion.includes("coupon") || normalizedQuestion.includes("discount") || normalizedQuestion.includes("promo")) {
        return "You can enter discount or promo codes during checkout if one is available.";
    }

    if (normalizedQuestion.includes("return") || normalizedQuestion.includes("refund")) {
        return "If you need a return or refund, please contact support with your order details.";
    }

    if (normalizedQuestion.includes("account") || normalizedQuestion.includes("login") || normalizedQuestion.includes("sign in")) {
        return "You can use the account page to sign in, register, or update your details.";
    }

    if (normalizedQuestion.includes("payment") || normalizedQuestion.includes("card")) {
        return "We currently support standard checkout flow. If payment fails, try again from checkout.";
    }

    if (normalizedQuestion.includes("size") || normalizedQuestion.includes("color") || normalizedQuestion.includes("available")) {
        return "Product cards on the homepage show the items we currently have listed.";
    }

    if (normalizedQuestion.includes("product") || normalizedQuestion.includes("size")) {
        return "You can browse the product cards on the homepage to see details and prices.";
    }

    if (normalizedQuestion.includes("contact") || normalizedQuestion.includes("support") || normalizedQuestion.includes("help")) {
        return "You can reach support through this chat for help with orders, shipping, returns, or payment.";
    }

    return "I can help with orders, shipping, tracking, returns, payment, discounts, account questions, and products. Try asking one of those.";
}

if (chatToggleButton && chatPanel) {
    chatToggleButton.addEventListener("click", () => {
        const isOpen = chatPanel.classList.toggle("open");
        chatPanel.setAttribute("aria-hidden", String(!isOpen));
    });
}

if (chatCloseButton && chatPanel) {
    chatCloseButton.addEventListener("click", () => {
        chatPanel.classList.remove("open");
        chatPanel.setAttribute("aria-hidden", "true");
    });
}

if (chatClearButton && chatBody) {
    chatClearButton.addEventListener("click", () => {
        chatBody.querySelectorAll(".chat-message").forEach((messageElement) => messageElement.remove());
        appendChatMessage("Hi! How can we help you today?", "support");
        saveChatMessages(getCurrentChatMessages());
    });
}

chatSuggestionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const question = button.dataset.question || button.textContent || "";
        if (!chatInput || !question) {
            return;
        }

        chatInput.value = question;
        chatInput.focus();
    });
});

const storedChatMessages = getStoredChatMessages();
if (chatBody) {
    if (storedChatMessages.length > 0) {
        renderChatHistory(storedChatMessages);
    } else {
        saveChatMessages(getCurrentChatMessages());
    }
}

const chatInputForm = document.querySelector(".chat-input-row");
if (chatInputForm) {
    chatInputForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!chatInput) {
            return;
        }

        const question = chatInput.value.trim();
        if (!question) {
            return;
        }

        appendChatMessage(question, "user");
        chatInput.value = "";

        window.setTimeout(() => {
            appendChatMessage(getChatReply(question), "support");
            saveChatMessages(getCurrentChatMessages());
        }, 250);

        saveChatMessages(getCurrentChatMessages());
    });
}