export { initRouter };

const routes = {
    "/":        () => import("./views/home.js"),
    "/news":    () => import("./views/news.js"),
    "/recruit": () => import("./views/recruit.js"),
}

function initRouter() {
    // Initial render
    render(location.pathname);

    // Intercept link clicks
    document.body.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (link && link.getAttribute("href")?.startsWith("/") && !link.hasAttribute("target")) {
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

    if (Object.hasOwn(routes, path)) {
        viewModule = await routes[path]();
    } else {
        viewModule = await import("./views/notfound.js");
    }

    const view = viewModule.default;
    document.getElementById("app").innerHTML = view();
}

function navigate(path) {
    history.pushState({}, "", path);
    render(path);
}