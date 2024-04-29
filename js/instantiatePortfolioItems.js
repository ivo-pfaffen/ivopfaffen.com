import {instantiatePortfolioItems, PortfolioItemCategory} from "./portfolio-items.js"

const navPortfolioCategory = document.querySelectorAll(".portfolio-toggle");

// Instantiate default items on page load
instantiatePortfolioItems(PortfolioItemCategory.Default);

navPortfolioCategory.forEach(button => {
    button.addEventListener("click", () => {
        instantiatePortfolioItems(button.id);
    });
})