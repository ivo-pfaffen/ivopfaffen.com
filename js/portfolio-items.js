let portfolioContainer = document.querySelector("#portfolio-items");

function portfolioItemTemplate(data) {
    if(data.overlayPath != "") {
        data.overlayPath = "href=" + data.overlayPath;
    }

    return `
        <div class="portfolio__item p-dark" id="${data.id}">
            <a class="overlay" ${data.overlayPath}>
                <div class="content vertical-center">
                    <h2 class="portfolio__title">${data.title}</h2>
                    <p class="portfolio__subtitle">${data.subtitle}</p>
                </div> 
            </a>
        </div>
    `
}

const PortfolioItemCategory = {
    Default: "",
    Games: "games",
    AI: "ai",
    School: "school"
};
  
var portfolioItems = [
    {
        categories: [PortfolioItemCategory.Games],
        id: "p-spacerewinders",
        overlayPath: "projects/space-rewinders.html",
        title: "SPACE REWINIDERS",
        subtitle: "Retro shoot'em up made in one week for the Brackeys Game Jam 2020.2 contest"
    },
    {
        categories: [PortfolioItemCategory.Games],
        id: "p-twinrun",
        overlayPath: "",
        title: "TWIN RUN",
        subtitle: "Retro pixel art platformer for a freelance client"
    },
    {
        categories: [PortfolioItemCategory.Games],
        id: "p-thekey",
        overlayPath: "projects/the-key.html",
        title: "THE KEY",
        subtitle: "Simple 2D platformer made in 48 hours for the Global Game Jam 2020 contest"
    },
    {
        categories: [PortfolioItemCategory.Games],
        id: "p-frank",
        overlayPath: "projects/frank.html",
        title: "FRANK",
        subtitle: "3D puzzle game made in one week for the Brackeys Game Jam 2021.2 contest"
    },
    {
        categories: [PortfolioItemCategory.Games],
        id: "p-visualistchallenge",
        overlayPath: "",
        title: "VISUALIST CHALLENGE",
        subtitle: "Memo card game for <i>visualistapp.com</i>, a web platform designed for creatives"
    },
    {
        categories: [PortfolioItemCategory.School, PortfolioItemCategory.AI],
        id: "p-rnntextclassifier",
        overlayPath: "https://github.com/ivo-pfaffen/nn-text-classifier",
        title: "PYTORCH TEXT CLASSIFICATION",
        subtitle: "Vanilla RNN for text classification with PyTorch"
    }
]

function idIsValidCategory(id) {
    let isValidCategory = false;
    let itemCategories = Object.values(PortfolioItemCategory);
    for(let i=0; i < itemCategories.length; i++) {
        isValidCategory = isValidCategory | itemCategories[i] == id;
    }
    return isValidCategory;
}

function instantiatePortfolioItems(itemCategory) {
    portfolioContainer.innerHTML = "";

    if(!idIsValidCategory(itemCategory)) {
        console.error("Not a valid item category! Stop messing with my HTML :(");
        return;
    }

    for(let i=0; i < portfolioItems.length; i++) {
        if(portfolioItems[i].categories.includes(itemCategory) | itemCategory == "") {
            let portfolioItem = portfolioItemTemplate(portfolioItems[i]);
            portfolioContainer.insertAdjacentHTML("beforeend", portfolioItem);
        }
    }
}


export {instantiatePortfolioItems, PortfolioItemCategory}

