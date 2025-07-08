// Handling scroll up button visibility.

export function initScrollBtn() {
    const scrollBtn = document.querySelector(".scroll-up");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            scrollBtn.classList.add("scroll-up--visible");
        } else {
            scrollBtn.classList.remove("scroll-up--visible");
        }
    });
}
