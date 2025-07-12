export function initToggleSearch() {
    const button = document.querySelector(".header__toggle-search");
    const icon = button.querySelector("img");
    const searchBar = document.querySelector(".header__search");

    let isVisible = false;

    button.addEventListener("pointerdown", () => {
        isVisible = !isVisible;
        button.setAttribute("aria-expanded", isVisible);
        icon.src = isVisible ? "img/hide_search.svg" : "img/disp_search.svg";
        searchBar.style.display = isVisible ? "flex" : "none";
    });
}
