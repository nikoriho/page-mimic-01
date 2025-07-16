export { initRouter };

function initRouter() {
    // Initial render
    render(location.pathname);

    // Intercept link clicks
    document.body.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (link && link.getAttribute("href").startWith("/") && !link.hasAttribute("target")) {
            e.preventDefault();
            navigate(link.getAttribute("href"));
        }
    });

    // Handle back/forward
    window.addEventListener("popstate", () => {
        render(location.pathname);
    });
}

async function render(path) {
    let viewModule;

    switch (path) {
        case "/":
            viewModule = await import("./views/home.js");
            break;
        case "/news":
            viewModule = await import("./views/news.js");
            break;
        case "/recruit":
            viewModule = await import("./views/recruit.js");
            break;
        default:
            viewModule = await import("./views/notfound.js");
    }

    const view = viewModule.default;
    document.getElementById("app").innerHTML = view();
}

function navigate(path) {
    history.pushState({}, "", path);
    render(path);
}