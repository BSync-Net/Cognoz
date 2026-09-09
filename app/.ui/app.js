import { windows, setNavEnabled } from "./UI/sidebar.js";
//import { Card } from "./UI/utils/cardManager.js";
import { loadIcons } from "./UI/utils/iconManager.js";
import { Home } from "./UI/windows/home.js";

const app = document.getElementById('app');
const sidebar = document.getElementById('sidebar');
const container = document.getElementById('container');
const startBtn = document.getElementById('start-btn');
const welcomePanel = document.getElementById('welcome-panel');

const sideNavItems = document.querySelectorAll('.sidebar nav a');

setNavEnabled(sideNavItems, true);

startBtn.addEventListener('click', () => {
    setTimeout(() => {
        const _item_home = sideNavItems[0];
        welcomePanel.style.display = 'none';
        _item_home.classList.add('active');
        windows.home(container);
        setNavEnabled(sideNavItems, true);
    }, 300);
});

sidebar.addEventListener('click', e => {
    
    const option = e.target.closest('a.nav-item');

    if (!option) return; // Returns if the clicked element is not an HTML element with the class "nav-item"
    if (!option.classList.contains("nav-item")) return; // Returns if the clicked element is not a "nav-item"

    sideNavItems.forEach(item => item.classList.remove('active'));
    option.className = "nav-item active";
    
    windows[`${option.dataset.option}`](container);
});

await loadIcons();
Home.greetUser("Nilpawan Kalita");


/*const card = new Card("player-card");
card.setTitle("Player")
    .addDataItem("name", "Name: ", "John")
    .addDataItem("score", "Score: ", 100);
sidebar.appendChild(card.load());

setTimeout(() => {
    card.setData("score", 200);
}, 3000);*/