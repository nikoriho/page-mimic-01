export { initRouter };

const routes = {
    "/": () => import("./views/home.js"),
    "/ir": () => import("./views/ir/ir.js"),
    "/ir/news": () => import("./views/ir/news.js"),
    "/ir/archives": () => import("./views/ir/archives.js"),
    "/ir/notices": () => import("./views/ir/notices.js"),
    "/recruit": () => import("./views/recruit.js"),
};

function initRouter() {
    // Initial render
    render(location.pathname);

    // Intercept link clicks
    document.body.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (
            link &&
            link.getAttribute("href")?.startsWith("/") &&
            !link.hasAttribute("target")
        ) {
            e.preventDefault();
            navigate(link.getAttribute("href"));
            updateNavStyle();
        }
    });

    // Handle back/forward
    window.addEventListener("popstate", () => {
        updateNavStyle();
        render(location.pathname);
    });
}

function updateNavStyle() {
    const prevLink = document.querySelector(".header__nav-item--active");

    // Extract first path segment or fallback to "/"
    const path = location.pathname.split('/')[1] || '';
    const pathPrefix = path ? `/${path}` : '/';

    // Find the nav link matching the path prefix
    const navLink = document.querySelector(`[data-nav-link][href="${pathPrefix}"]`);

    prevLink.classList.remove("header__nav-item--active");
    navLink.classList.add("header__nav-item--active");
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
