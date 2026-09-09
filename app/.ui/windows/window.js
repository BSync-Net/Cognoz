/**
 * Window
 * ---------------------------------------------------------------------------
 * Abstract base class for every window in the app (Home, Games, Progress,
 * Settings, ...). A subclass provides the markup via `template()` and wires
 * up its own listeners via `bindEvents()`. Everything else (creating the
 * root element, showing/hiding, lifecycle hooks) is handled here so each
 * window file only has to describe *itself*.
 */
export class Window {
    constructor(id, options = {}) {
        if (new.target === Window) {
            throw new Error("Window is an abstract class and cannot be instantiated directly.");
        }

        this.id = id;
        this.title = options.title || id;
        this.className = options.className || "window";

        this.element = null;
        this.isMounted = false;
        this.isVisible = false;
    }

    // ---- Subclasses override these -----------------------------------

    /** Return the inner HTML markup string for this window. */
    template() {
        return "";
    }

    /** Attach event listeners. Called once, right after the element is built. */
    bindEvents() {
        // no-op by default
    }

    // ---- Lifecycle ------------------------------------------------------

    /** Build the DOM element (idempotent — safe to call more than once). */
    mount() {
        if (this.isMounted) return this.element;

        this.element = document.createElement("div");
        this.element.className = this.className;
        this.element.id = this.id;
        this.element.style.display = "none";
        this.element.innerHTML = this.template();

        this.bindEvents();

        this.isMounted = true;
        return this.element;
    }

    show() {
        if (!this.isMounted) this.mount();
        this.element.style.display = "";
        this.isVisible = true;
    }

    hide() {
        if (this.element) this.element.style.display = "none";
        this.isVisible = false;
    }

    /** Called by WindowManager right after this window becomes active. */
    onFocus() {}

    /** Called by WindowManager right after this window loses focus. */
    onBlur() {}

    /** Called by WindowManager when this window is explicitly closed. */
    onClose() {}

    /** Tear the window down completely (used by WindowManager.unload). */
    destroy() {
        this.element = null;
        this.isMounted = false;
        this.isVisible = false;
    }

    // ---- Convenience ------------------------------------------------------

    /** querySelector scoped to this window's own element. */
    $(selector) {
        return this.element ? this.element.querySelector(selector) : null;
    }

    /** querySelectorAll scoped to this window's own element. */
    $$(selector) {
        return this.element ? this.element.querySelectorAll(selector) : [];
    }
}
