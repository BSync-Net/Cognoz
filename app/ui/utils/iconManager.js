export async function loadIcons() {

    const icons = document.querySelectorAll("[data-icon]");
    
    for (const icon of icons) {
        const name = icon.dataset.icon;
        try {
            const request = await fetch(`assets/icon_${name}.svg`);
            
            if (!request.ok)
                throw new Error(`Could not fetch '/assets/icon_${name}.svg'.`);

            icon.innerHTML = await request.text();

            const svg = icon.querySelector("svg");
            //svg.removeAttribute("width");
            //svg.removeAttribute("height");
            svg.classList.add("icon");

        } catch (error) {
            console.log(error);
        }

    }

}