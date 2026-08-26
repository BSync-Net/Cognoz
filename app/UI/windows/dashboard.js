export const dashboard_UI = document.createElement('div');
dashboard_UI.className = "window";
dashboard_UI.id = "dashboard";

dashboard_UI.innerHTML = `
    <div class="greeting">
        <div class="greeting-content">
            <span class="eyebrow">Ready to game?</span>
            <h1>Hello, <span class="player-tag">ABC</span></h1>
            <p>Let's give your brain a quick workout today.</p>
        </div>
        <button class="play-btn hero-play-btn">
            <span>New Game</span>
        </button>
    </div>

    <!-- Stats overview cards-->
    <div class="stats-overview">
        <div class="stat-card">
            <div class="label">Overall</div>
            <div class="stat-data">Games played: <span data-id="games_played">10</span></div>
            <div class="stat-data">Best score: <span data-id="best_score">85</span></div>
        </div>

        <div class="stat-card">
            <div class="label">Weekly</div>
            <div class="stat-data">Games played: <span data-id="games_played">4</span></div>
            <div class="stat-data">Best score: <span data-id="best_score">60</span></div>
        </div>

        <div class="stat-card">
            <div class="label">Today</div>
            <div class="stat-data">Games played: <span data-id="games_played">0</span></div>
            <div class="stat-data">Best score: <span data-id="best_score">0</span></div>
        </div>
    </div>

    <!-- Gaming history -->
    <div class="history">
        <div class="header">
            <div class="label">Your Gaming History</div>

            <div class="history-controls">
                <!-- Date sorting -->
                <button class="sort-date" aria-label="Sort by date">
                    Date <span class="sort-arrow">↓</span>
                </button>

                <!-- Time filters -->
                <div class="history-filter">
                    <button class="filter-option active" data-filter="overall">
                        Overall
                    </button>
                    <button class="filter-option" data-filter="week">
                        This week
                    </button>
                    <button class="filter-option" data-filter="today">
                        Today
                    </button>
                </div>
            </div>
        </div>
        <div class="history-log"></div>
    </div>

`


const filterOptions = dashboard_UI.querySelectorAll(".filter-option");

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        filterOptions.forEach(item => {
            item.classList.remove("active");
        });

        option.classList.add("active");

        const selectedFilter = option.dataset.filter;

        console.log("Selected filter:", selectedFilter);
    });
});


const sortDateButton = dashboard_UI.querySelector(".sort-date");
const sortArrow = dashboard_UI.querySelector(".sort-arrow");

let ascending = false;

sortDateButton.addEventListener("click", () => {
    ascending = !ascending;

    sortArrow.textContent = ascending ? "↑" : "↓";

    console.log(
        ascending
            ? "Oldest first"
            : "Newest first"
    );
});
