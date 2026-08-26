import { dashboard_UI } from "./windows/dashboard.js";
import { games_UI } from "./windows/games.js";
import { settings_UI } from "./windows/settings.js";
import { stats_UI } from "./windows/stats.js";

export const windows = {

    dashboard: (container) => {
        container.innerHTML = ""; // Clear the container before appending the new window
        container.appendChild(dashboard_UI);
        console.log("Dashboard window loaded");
    },

    games: (container) => {
        container.innerHTML = ""; // Clear the container before appending the new window
        container.appendChild(games_UI);
        console.log("Games window loaded");
    },

    stats: (container) => {
        container.innerHTML = ""; // Clear the container before appending the new window
        container.appendChild(stats_UI);
        console.log("Stats window loaded");
    },

    settings: (container) => {
        container.innerHTML = ""; // Clear the container before appending the new window
        container.appendChild(settings_UI);
        console.log("Settings window loaded");
    }

};

export function setNavEnabled(sideNavItems, enabled) {
    sideNavItems.forEach(item => {
        item.classList.toggle('disabled', !enabled);
    });
}
