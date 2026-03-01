import { products } from "./products.js";
import { cart } from "./cart.js";
let html = "";

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

let count = 0;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        let productId = button.dataset.id;

        let exists = false;
        let cartQuantity = 0;
        cart.forEach((item) => {
            if (item.productId === productId) {
                item.quantity += 1;
                exists = true;
            }
            cartQuantity += item.quantity;
        });

        if (!exists) {
            cart.push({
                productId,
                quantity: 1
            });
        }
        console.log(cart)
        console.log(cartQuantity)
        document.querySelector(".js-fa-solid").innerHTML = cartQuantity;
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
})