export class Window {

    /**
     * Creates a window controller object
     * @param {string} id 
     * @param {object} options 
     */
    constructor(id, options) {
        if (new.target === "Window")
            throw new Error("Cannot instantiate an abstract class directly.");

        this.id = id;
        this.title = options.title || `Window-${id}`;
        this.className = options.className || "window";

        this.element = null;
        this.isMounted = false;
        this.isVisible = false;
    }

    /* To be overrided by the subclasses. */
    getContent() {
        return null;
    }

    /* Attaches event listeners. Called only once, right after the element is built. */
    bindEvents() {
        // no-op by default
    }

    /* Gets called once the UI is mounted. */
    onLoad() {

    }

    /**
     * Mounts the window into a container
     * @param {HTMLElement} container 
     */
    mount(container) {
        if (this.isMounted) {
            if (this.element && container) {
                container.appendChild(this.element);
            }
            return this.element;
        }
        
        const element = this.getContent();
        element.className = this.className;
        element.id = this.id;
        element.style.visibility = "visible";
        if (element)
            container.appendChild(element);

        this.element = element;
        this.isMounted = true;
        this.isVisible = true;

        this.bindEvents();
        this.onLoad();
        console.log("Window is loaded.");
        return this.element;
    }

    show() {
        if (!this.isMounted) return;
        this.element.style.visibility = "visible";
        this.isVisible = true;
    }

    hide() {
        if (!this.element) this.element.style.visibility = "invisible";
        this.isVisible = false;
    }

    /**
     * Removes the UI element from its container and destroys it
     */
    unmount() {
        if (!this.isMounted) return;

        const parent = this.element.parent;

        if (!parent) return;

        parent.removeChild(this.element);
        //this.element = null;
        this.isMounted = false;
        this.isVisible = false;
    }
}