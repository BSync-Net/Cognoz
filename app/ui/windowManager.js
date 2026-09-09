import { Games } from "./windows/games.js";
import { Home } from "./windows/home.js";
import { Progress } from "./windows/progress.js";
import { Settings } from "./windows/settings.js";
import { Window } from "./windows/window.js";

export const WindowManager = (() => {

    const registry = new Map();
    const loaded = new Map();

    function _init() {
        registry.set(
            "home",
            new Home("home")
        );

        registry.set(
            "games",
            new Games("games")
        );

        registry.set(
            "progress",
            new Progress("progress")
        );

        registry.set(
            "settings",
            new Settings("settings")
        );
    }

    function get(id) {
        return registry.get(id);
    }

    function register(window) {
        if (!(window instanceof Window))
            throw new Error("WindowManager: window is not of instance 'Window'.");
        registry.set(window.id, window);
    }

    function open(id, container) {
        const window = registry.get(id);

        if (!window)
            throw new Error(`WindowManager: Window by ID '${id}' does not exist in the registry`);

        const element = window.mount(container);
        loaded.set(id, element);
    }

    function close(id) {
        const window = registry.get(id);

        if (!window || !window.isMounted)
            throw new Error(`WindowManager: Window by ID '${id}' is not loaded.`);

        window.unmount();
        loaded.delete(id);
    }

    function closeAll() {
        for (const id of Array.from(loaded.keys())) {
            close(id);
        }
    }

    return {
        _init,
        get,
        registry,
        open,
        close,
        closeAll
    };


})();

WindowManager._init();