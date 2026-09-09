import { Window } from "./window.js";
import { Card } from "../utils/cardManager.js";

export class Home extends Window {

    constructor() {
        super("home", {
            title: "Home",
            className: "window"
        });

        this.ascending = false;
    }


    /**
     * Builds the Home UI.
     *
     * @returns {HTMLElement}
     */
    getContent() {

        const homeUI = document.createElement("div");

        // ========================================
        // GREETING SECTION
        // ========================================

        const greetingContainer = document.createElement("div");
        greetingContainer.className = "greeting";

        const greetingContent = document.createElement("div");
        greetingContent.className = "greeting-content";

        const eyebrow = document.createElement("span");
        eyebrow.className = "eyebrow";
        eyebrow.textContent = "Ready to game?";

        const greeting = document.createElement("h1");
        greeting.className = "greeting-msg";

        const greetingDescription = document.createElement("p");
        greetingDescription.textContent =
            "Let's give your brain a quick workout today.";

        greetingContent.appendChild(eyebrow);
        greetingContent.appendChild(greeting);
        greetingContent.appendChild(greetingDescription);

        // ========================================
        // NEW GAME BUTTON
        // ========================================

        const newGameButton = document.createElement("button");
        newGameButton.className = "play-btn hero-play-btn";
        newGameButton.type = "button";

        const newGameText = document.createElement("span");
        newGameText.textContent = "New Game";

        newGameButton.appendChild(newGameText);

        greetingContainer.appendChild(greetingContent);
        greetingContainer.appendChild(newGameButton);

        // ========================================
        // STATS OVERVIEW
        // ========================================

        const statOverview = document.createElement("div");
        statOverview.className = "stats-overview";

        // ========================================
        // GAMING HISTORY
        // ========================================

        const history = document.createElement("div");
        history.className = "history";

        // ========================================
        // HISTORY HEADER
        // ========================================

        const historyHeader = document.createElement("div");
        historyHeader.className = "header";

        const historyLabel = document.createElement("div");
        historyLabel.className = "label";
        historyLabel.textContent = "Your Gaming History";

        // ========================================
        // HISTORY CONTROLS
        // ========================================

        const historyControls = document.createElement("div");
        historyControls.className = "history-controls";

        // ========================================
        // SORT BUTTON
        // ========================================

        const historySortButton = document.createElement("button");

        historySortButton.className = "sort-date";
        historySortButton.type = "button";
        historySortButton.setAttribute(
            "aria-label",
            "Sort by date"
        );

        const dateText = document.createTextNode("Date ");

        const sortArrow = document.createElement("span");
        sortArrow.className = "sort-arrow";
        sortArrow.textContent = "↓";

        historySortButton.appendChild(dateText);
        historySortButton.appendChild(sortArrow);

        // ========================================
        // TIME FILTERS
        // ========================================

        const historyFilter = document.createElement("div");
        historyFilter.className = "history-filter";

        // Overall
        const overallFilter = document.createElement("button");

        overallFilter.className = "filter-option active";
        overallFilter.type = "button";
        overallFilter.dataset.filter = "overall";
        overallFilter.textContent = "Overall";

        // This week
        const weekFilter = document.createElement("button");

        weekFilter.className = "filter-option";
        weekFilter.type = "button";
        weekFilter.dataset.filter = "week";
        weekFilter.textContent = "This week";

        // Today
        const todayFilter = document.createElement("button");

        todayFilter.className = "filter-option";
        todayFilter.type = "button";
        todayFilter.dataset.filter = "today";
        todayFilter.textContent = "Today";

        // Add filters
        historyFilter.appendChild(overallFilter);
        historyFilter.appendChild(weekFilter);
        historyFilter.appendChild(todayFilter);

        // Add controls
        historyControls.appendChild(historySortButton);
        historyControls.appendChild(historyFilter);

        // Add header elements
        historyHeader.appendChild(historyLabel);
        historyHeader.appendChild(historyControls);

        // ========================================
        // HISTORY LOG
        // ========================================

        const historyLog = document.createElement("div");
        historyLog.className = "history-log";

        // ========================================
        // BUILD HISTORY
        // ========================================

        history.appendChild(historyHeader);
        history.appendChild(historyLog);

        // ========================================
        // STAT CARDS
        // ========================================

        const overall = new Card("overall");

        overall
            .setTitle("Overall")
            .addDataItem(
                "game",
                "Games played: ",
                5
            );

        const week = new Card("week");

        week
            .setTitle("Week")
            .addDataItem(
                "game",
                "Games played: ",
                5
            );

        const today = new Card("today");

        today
            .setTitle("Today")
            .addDataItem(
                "game",
                "Games played: ",
                5
            );

        // Add cards
        statOverview.appendChild(overall.load());
        statOverview.appendChild(week.load());
        statOverview.appendChild(today.load());

        // ========================================
        // BUILD HOME UI
        // ========================================

        homeUI.appendChild(greetingContainer);
        homeUI.appendChild(statOverview);
        homeUI.appendChild(history);

        return homeUI;
    }


    /**
     * Adds event listeners to the Home UI.
     */
    bindEvents() {

        // ========================================
        // SAFETY CHECK
        // ========================================

        if (!this.element) {
            return;
        }

        // ========================================
        // FILTER FUNCTIONALITY
        // ========================================

        const filterOptions =
            this.element.querySelectorAll(".filter-option");

        filterOptions.forEach((option) => {

            option.addEventListener("click", () => {

                // Remove active from all filters
                filterOptions.forEach((item) => {
                    item.classList.remove("active");
                });

                // Activate selected filter
                option.classList.add("active");

                const selectedFilter =
                    option.dataset.filter;

                console.log(
                    "Selected filter:",
                    selectedFilter
                );
            });

        });

        // ========================================
        // SORT FUNCTIONALITY
        // ========================================

        const historySortButton =
            this.element.querySelector(
                ".history-controls .sort-date"
            );

        const sortArrow =
            this.element.querySelector(".sort-arrow");

        if (historySortButton && sortArrow) {

            historySortButton.addEventListener(
                "click",
                () => {

                    this.ascending = !this.ascending;

                    sortArrow.textContent =
                        this.ascending
                            ? "↑"
                            : "↓";

                    console.log(
                        this.ascending
                            ? "Oldest first"
                            : "Newest first"
                    );
                }
            );

        }
    }

    onLoad() {
        this.greetUser("Abhrojit");
    }


    /**
     * Updates the greeting message.
     *
     * @param {string} playerTag
     */
    greetUser(playerTag) {

        if (!this.element) {
            return;
        }

        const greeting =this.element.querySelector(".greeting-msg");
        if (!greeting) {
            return;
        }

        const hour = new Date().getHours();
        let message;

        if (hour < 12) {
            message = `Good morning, ${playerTag}.`;
        }
        else if (hour < 18) {
            message = `Good afternoon, ${playerTag}.`;
        }
        else {
            message = `Good evening, ${playerTag}.`;
        }

        greeting.textContent = message;
    }
}