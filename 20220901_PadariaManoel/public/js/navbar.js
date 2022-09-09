// Menus
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
    navToggle.addEventListener("click", (e) => {
        navMenu.classList.add("show-menu");
    });
}

if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

const navMenuLink = document.getElementById("nav-menu");
const collapseMenuMobile = function () {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
};
navMenu.addEventListener("click", collapseMenuMobile);