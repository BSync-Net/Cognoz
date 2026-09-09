import { Window } from "./window.js";


export class Games extends Window {

    constructor() {
        super("games", {
            title: "Games",
            className: "window"
        });
    }


    /**
     * Builds the Games UI.
     *
     * @returns {HTMLElement}
     */
    getContent() {

        const gamesUI = document.createElement("div");

        // ========================================
        // GAMES HEADER
        // ========================================

        const gamesHeader = document.createElement("div");
        gamesHeader.className = "games-header";

        const gamesTitle = document.createElement("div");
        gamesTitle.className = "games-title";

        const eyebrow = document.createElement("span");
        eyebrow.className = "eyebrow";
        eyebrow.textContent = "PLAY & CHALLENGE";

        const title = document.createElement("h1");
        title.textContent = "Games";

        const description = document.createElement("p");
        description.textContent = "Pick a challenge and give your mind a workout.";

        gamesTitle.appendChild(eyebrow);
        gamesTitle.appendChild(title);
        gamesTitle.appendChild(description);

        // ========================================
        // GAMES SUMMARY
        // ========================================
        const gamesSummary = document.createElement("div");
        gamesSummary.className = "games-summary";

        const summaryLabel = document.createElement("span");
        summaryLabel.className = "summary-label";
        summaryLabel.textContent = "Games played";

        const summaryValue = document.createElement("strong");
        summaryValue.textContent = "10";

        gamesSummary.appendChild(summaryLabel);
        gamesSummary.appendChild(summaryValue);

        gamesHeader.appendChild(gamesTitle);
        gamesHeader.appendChild(gamesSummary);

        // ========================================
        // GAMES TOOLBAR
        // ========================================

        const gamesToolbar = document.createElement("div");
        gamesToolbar.className = "games-toolbar";

        const gamesSectionTitle = document.createElement("div");
        gamesSectionTitle.className = "games-section-title";

        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = "Choose a Game";

        const sectionDescription = document.createElement("p");
        sectionDescription.textContent = "Find a challenge that suits you.";

        gamesSectionTitle.appendChild(sectionTitle);
        gamesSectionTitle.appendChild(sectionDescription);

        // ========================================
        // GAME FILTERS
        // ========================================

        const gameFilters = document.createElement("div");
        gameFilters.className = "game-filters";

        const filterData = [
            ["all", "All"],
            ["memory", "Memory"],
            ["logic", "Logic"],
            ["speed", "Speed"],
            ["focus", "Focus"]
        ];

        filterData.forEach(([value, text], index) => {

            const button = document.createElement("button");
            button.className = "game-filter";

            if (index === 0) {
                button.classList.add("active");
            }

            button.type = "button";
            button.dataset.filter = value;
            button.textContent = text;

            gameFilters.appendChild(button);

        });

        gamesToolbar.appendChild(gamesSectionTitle);
        gamesToolbar.appendChild(gameFilters);

        // ========================================
        // GAMES GRID
        // ========================================

        const gamesGrid = document.createElement("div");
        gamesGrid.className = "games-grid";

        // ========================================
        // MEMORY MATCH
        // ========================================

        const memoryCard = this.createGameCard({
            category: "memory",
            image: "assets/game_MP.png",
            difficulty: "easy",
            difficultyText: "EASY",
            title: "Memory Match",
            description:
                "Match the hidden pairs and test your memory.",
            score: "85",
            game: "memory"
        });

        // ========================================
        // TASK RESET
        // ========================================

        const taskResetCard = this.createGameCard({
            category: "logic",
            image: "assets/game_RS.png",
            difficulty: "medium",
            difficultyText: "MEDIUM",
            title: "Task Reset",
            description:
                "Watch out the rules might change!",
            score: "72",
            game: "numbers"
        });

        gamesGrid.appendChild(memoryCard);
        gamesGrid.appendChild(taskResetCard);

        // ========================================
        // BUILD UI
        // ========================================

        gamesUI.appendChild(gamesHeader);
        gamesUI.appendChild(gamesToolbar);
        gamesUI.appendChild(gamesGrid);

        return gamesUI;
    }


    /**
     * Creates a game card.
     *
     * @param {object} data
     * @returns {HTMLElement}
     */
    createGameCard(data) {

        const card = document.createElement("article");
        card.className = "game-card";
        card.dataset.category = data.category;

        // ========================================
        // ICON
        // ========================================

        const image = document.createElement("img");

        image.className = "game-card-icon";
        image.src = data.image;
        image.alt = `${data.title} icon`;

        // ========================================
        // CONTENT
        // ========================================

        const content = document.createElement("div");
        content.className = "game-card-content";

        const difficulty = document.createElement("span");
        difficulty.className = `difficulty ${data.difficulty}`;
        difficulty.textContent = data.difficultyText;

        const title = document.createElement("h3");
        title.textContent = data.title;

        const description = document.createElement("p");
        description.textContent = data.description;

        content.appendChild(difficulty);
        content.appendChild(title);
        content.appendChild(description);

        // ========================================
        // FOOTER
        // ========================================

        const footer = document.createElement("div");
        footer.className = "game-card-footer";

        const bestScore = document.createElement("span");
        bestScore.className = "best-score";

        const bestText = document.createTextNode("Best: ");
        const score = document.createElement("strong");
        score.textContent = data.score;

        bestScore.appendChild(bestText);
        bestScore.appendChild(score);

        // Play button
        const playButton = document.createElement("button");
        playButton.className = "play-btn";
        playButton.type = "button";
        playButton.dataset.game = data.game;
        playButton.textContent = "Play";

        footer.appendChild(bestScore);
        footer.appendChild(playButton);

        // ========================================
        // BUILD CARD
        // ========================================

        card.appendChild(image);
        card.appendChild(content);
        card.appendChild(footer);

        return card;
    }


    /**
     * Attaches Games event listeners.
     */
    bindEvents() {

        if (!this.element) {
            return;
        }

        // ========================================
        // FILTERS
        // ========================================

        const filters = this.element.querySelectorAll(".game-filter");
        const gameCards = this.element.querySelectorAll(".game-card");

        filters.forEach((filter) => {

            filter.addEventListener("click", () => {

                filters.forEach((item) => {
                    item.classList.remove("active");
                });

                filter.classList.add("active");
                const selectedCategory = filter.dataset.filter;

                gameCards.forEach((card) => {

                    const matches = selectedCategory === "all" ||
                        card.dataset.category === selectedCategory;

                    card.style.display = matches ? "" : "none";
                });
                console.log("Selected category:", selectedCategory);

            });

        });


        // ========================================
        // PLAY BUTTONS
        // ========================================

        const playButtons = this.element.querySelectorAll(".play-btn");

        playButtons.forEach((button) => {

            button.addEventListener("click", () => {
                const game = button.dataset.game;
                console.log("Starting game:", game);
                alert( `Starting ${game} game...`);
            });

        });

    }
}