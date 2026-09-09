import { WindowManager } from "./windowManager.js";

const sidebar = document.getElementById('sidebar');
const sideNavItems = document.querySelectorAll('.sidebar nav a');
const container = document.getElementById("container");

function setNavEnabled(sideNavItems, enabled) {
    sideNavItems.forEach(item => {
        item.classList.toggle('disabled', !enabled);
    });
}

sidebar.addEventListener('click', e => {
    
    const option = e.target.closest('a.nav-item');

    if (!option) return; // Returns if the clicked element is not an HTML element with the class "nav-item"
    if (!option.classList.contains("nav-item")) return; // Returns if the clicked element is not a "nav-item"

    sideNavItems.forEach(item => item.classList.remove('active'));
    option.className = "nav-item active";
    WindowManager.closeAll();
    container.innerHTML = "";
    WindowManager.open(option.dataset.option, container);
});


/*export const windows = {

    home: (container) => {
        container.innerHTML = ""; // Clear the container before appending the new window
        container.appendChild(home_UI);
        console.log("Home window loaded");
    },

    games: (container) => {
        container.innerHTML = ""; // Clear the container before appending the new window
        container.appendChild(games_UI);
        console.log("Games window loaded");
    },

    progress: (container) => {
        container.innerHTML = ""; // Clear the container before appending the new window
        container.appendChild(progress_UI);
        console.log("Progress window loaded");
    },

    settings: (container) => {
        container.innerHTML = ""; // Clear the container before appending the new window
        container.appendChild(settings_UI);
        console.log("Settings window loaded");
    }

};*/
