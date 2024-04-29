import {instantiatePortfolioItems, PortfolioItemCategory} from "./portfolio-items.js"

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");
const navBack = document.querySelector(".nav-back");
const navPortfolioCategory = document.querySelectorAll(".portfolio-toggle");

navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
    })
}) 

if(navBack != null) {
    navBack.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
}

instantiatePortfolioItems(PortfolioItemCategory.Default);

navPortfolioCategory.forEach(button => {
    button.addEventListener("click", () => {
        instantiatePortfolioItems(button.id);
    });
})