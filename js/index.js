const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");
const navBack = document.querySelector(".nav-back");


navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
    })
}) 

if(navBack != null)
{
navBack.addEventListener("click", () => {
    window.location.href = "../index.html";
});
}