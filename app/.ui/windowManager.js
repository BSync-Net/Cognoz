/**
 * WindowManager
 * ---------------------------------------------------------------------------
 * IIFE singleton responsible for:
 *   - "available" windows  -> registered classes, not yet built
 *   - "loaded" windows     -> instantiated + mounted to the DOM
 *   - the currently active (visible/focused) window
 *
 * Individual window files (home.js, games.js, ...) each import this and
 * call WindowManager.register(id, WindowClass) at the bottom of the file.
 * The app shell then calls WindowManager.init(container) once, and
 * WindowManager.open(id) whenever the user navigates.
 */
export const WindowManager = (() => {

    const registry = new Map();   // id -> { WindowClass, options }  (available)
    const loaded = new Map();     // id -> Window instance            (loaded)

    let activeId = null;
    let container = null;

    // Setup functions

    function init(containerEl) {
        container = containerEl;
    }

    function register(id, WindowClass, options = {}) {
        if (registry.has(id)) {
            console.warn(`WindowManager: "${id}" is already registered.`);
            return;
        }
        registry.set(id, { WindowClass, options });
    }

    function unregister(id) {
        if (isLoaded(id)) unload(id);
        registry.delete(id);
    }

    // Helper functions

    function isRegistered(id) {
        return registry.has(id);
    }

    function isLoaded(id) {
        return loaded.has(id);
    }

    function getAvailable() {
        return Array.from(registry.keys());
    }

    function getLoaded() {
        return Array.from(loaded.keys());
    }

    function getActiveId() {
        return activeId;
    }

    function getActive() {
        return activeId ? loaded.get(activeId) : null;
    }

    function get(id) {
        return loaded.get(id) || null;
    }

    /**
     * Instantiates and mounts a registered window without showing it.
     */
    function load(id) {
        if (loaded.has(id)) return loaded.get(id);

        if (!registry.has(id))
            throw new Error(`WindowManager: cannot load unknown window "${id}".`);

        const { WindowClass, options } = registry.get(id);
        const instance = new WindowClass(id, options);

        instance.mount();
        loaded.set(id, instance);

        if (container && instance.element) {
            container.appendChild(instance.element);
        }

        return instance;
    }

    function unload(id) {
        if (!loaded.has(id)) return;

        const instance = loaded.get(id);
        instance.hide();
        instance.destroy();

        if (instance.element && instance.element.parentNode) {
            instance.element.parentNode.removeChild(instance.element);
        }

        loaded.delete(id);

        if (activeId === id) activeId = null;
    }

    // ---- Navigation ------------------------------------------------------------

    /** Load (if needed), show, and focus a window. Hides the previous active one. */
    function open(id) {
        if (!registry.has(id)) {
            console.error(`WindowManager: cannot open unknown window "${id}".`);
            return null;
        }

        if (activeId && activeId !== id) {
            const current = loaded.get(activeId);
            if (current) {
                current.hide();
                current.onBlur();
            }
        }

        const instance = isLoaded(id) ? loaded.get(id) : load(id);

        instance.show();
        instance.onFocus();
        activeId = id;

        return instance;
    }

    /** Hide a window without unloading it (stays in memory/DOM). */
    function close(id) {
        if (!loaded.has(id)) return;

        const instance = loaded.get(id);
        instance.hide();
        instance.onClose();

        if (activeId === id) activeId = null;
    }

    return {
        init,
        register,
        unregister,
        isRegistered,
        isLoaded,
        getAvailable,
        getLoaded,
        getActiveId,
        getActive,
        get,
        load,
        unload,
        open,
        close
    };
})();
