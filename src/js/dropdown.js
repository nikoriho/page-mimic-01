// Handle aria-expanded update.

// Note: firing focusout event after mouseenter event or reverse will set to false.
// Not fixing this for now — original site also ignores it.

export function initDropdown() {
    const dropdown = document.querySelector(".dropdown");
    const dropdownLnk = dropdown.querySelector(".dropdown__link");

    dropdown.addEventListener("mouseenter", () => setExpanded(true));
    dropdown.addEventListener("focusin", () => setExpanded(true));

    dropdown.addEventListener("mouseleave", () => setExpanded(false));
    dropdown.addEventListener("focusout", () => {
        setTimeout(() => {
            if(!dropdown.contains(document.activeElement)) {
                setExpanded(false);
            }
        });
    });

    function setExpanded(val) {
        dropdownLnk.setAttribute("aria-expanded", val);
    }
}
