import { windows, setNavEnabled } from "./UI/sidebar.js";

const app = document.getElementById('app');
const sidebar = document.getElementById('sidebar');
const container = document.getElementById('container');
const startBtn = document.getElementById('start-btn');
const welcomePanel = document.getElementById('welcome-panel');

const sideNavItems = document.querySelectorAll('.sidebar nav a');

setNavEnabled(sideNavItems, true);

startBtn.addEventListener('click', () => {
    setTimeout(() => {
        const _item_dashboard = sideNavItems[0];
        welcomePanel.style.display = 'none';
        _item_dashboard.classList.add('active');
        windows.dashboard(container);
        setNavEnabled(sideNavItems, true);
    }, 500);
});

sidebar.addEventListener('click', e => {
    
    const option = e.target.closest('a.nav-item');

    if (!option) return; // Returns if the clicked element is not an HTML element with the class "nav-item"
    if (!option.classList.contains("nav-item")) return; // Returns if the clicked element is not a "nav-item"

    sideNavItems.forEach(item => item.classList.remove('active'));
    option.className = "nav-item active";
    //console.log(option.dataset.option);
    
    windows[`${option.dataset.option}`](container);
});
