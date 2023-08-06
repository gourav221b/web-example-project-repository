const hamMenu = document.getElementById('hamBurgerMenu');
const navMenu = document.getElementById('navMenu');
let menuOpen = false;

hamMenu.addEventListener('click', () => {
    if (menuOpen) {
        hamMenu.classList.remove("active");
        navMenu.classList.remove("active");
    }
    else if (!menuOpen) {
        hamMenu.classList.add("active");
        navMenu.classList.add("active");
    }
    menuOpen = !menuOpen
})
