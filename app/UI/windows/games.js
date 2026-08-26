export const games_UI = document.createElement("div");
games_UI.className = "window";
games_UI.id = "games";

games_UI.innerHTML = `
    <div class="games-header">
        <div class="games-title">
            <span class="eyebrow">PLAY & CHALLENGE</span>
            <h1>Games</h1>
            <p>Pick a challenge and give your mind a workout.</p>
        </div>

        <div class="games-summary">
            <span class="summary-label">Games played</span>
            <strong>10</strong>
        </div>
    </div>

    <div class="games-toolbar">
        <div class="games-section-title">
            <h2>Choose a Game</h2>
            <p>Find a challenge that suits you.</p>
        </div>

        <div class="game-filters">
            <button class="game-filter active" data-filter="all">All</button>
            <button class="game-filter" data-filter="memory">Memory</button>
            <button class="game-filter" data-filter="logic">Logic</button>
            <button class="game-filter" data-filter="speed">Speed</button>
            <button class="game-filter" data-filter="focus">Focus</button>
        </div>
    </div>

    <div class="games-grid">

        <article class="game-card" data-category="memory">
            <img class="game-card-icon" src="assets/game_MP.png"/>

            <div class="game-card-content">
                <span class="difficulty easy">EASY</span>
                <h3>Memory Match</h3>
                <p>Match the hidden pairs and test your memory.</p>
            </div>

            <div class="game-card-footer">
                <span class="best-score">Best: <strong>85</strong></span>
                <button class="play-btn" data-game="memory">
                    Play
                </button>
            </div>
        </article>

        <article class="game-card" data-category="logic">
            <img class="game-card-icon" src="assets/game_RS.png"/>

            <div class="game-card-content">
                <span class="difficulty medium">MEDIUM</span>
                <h3>Task Reset</h3>
                <p>Watch out the rules might change!</p>
            </div>

            <div class="game-card-footer">
                <span class="best-score">Best: <strong>72</strong></span>
                <button class="play-btn" data-game="numbers">
                    Play
                </button>
            </div>
        </article>

    </div>
`;


// ================================
// Game filters
// ================================

const filters = games_UI.querySelectorAll(".game-filter");
const gameCards = games_UI.querySelectorAll(".game-card");

filters.forEach(filter => {
    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const selectedCategory = filter.dataset.filter;

        gameCards.forEach(card => {

            if (
                selectedCategory === "all" ||
                card.dataset.category === selectedCategory
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });
    });
});


// ================================
// Play buttons
// ================================

const playButtons = games_UI.querySelectorAll(".play-btn");

playButtons.forEach(button => {
    button.addEventListener("click", () => {

        const game = button.dataset.game;

        console.log("Starting game:", game);

        alert(`Starting ${game} game...`); // Just testing
    });
});