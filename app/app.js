import "./ui/sidebar.js";
import { WindowManager } from "./ui/windowManager.js";
import { loadIcons } from "./ui/utils/iconManager.js";

const app = document.getElementById("app");
const container = document.getElementById("container");
const start = document.getElementById("start-btn");

/*const home = new Home("home", {
    title: "HOME"
});

const games = new Games("games",{
    title: "GAMES"
});

const progress = new Progress("progress", {
    title: "PROGRESS"
});

const settings = new Settings("settings", {
    title: "SETTINGS"
});*/

const Home = WindowManager.get("home");

await loadIcons();

start.addEventListener("click", () => {
    container.innerHTML = "";
    Home.mount(container);
})
