export const stats_UI = document.createElement('div');
stats_UI.className = "window";
stats_UI.id = "stats";

stats_UI.innerHTML = `
    <div class="stats-header">
        <div class="stats-title">
            <span class="eyebrow">ANALYTICS & INSIGHTS</span>
            <h1>Cognitive Stats</h1>
            <p>Track your mental performance and progress over time.</p>
        </div>

        <div class="stats-period-filter">
            <button class="filter-option active" data-period="7d">7 Days</button>
            <button class="filter-option" data-period="30d">30 Days</button>
            <button class="filter-option" data-period="all">All Time</button>
        </div>
    </div>

    <div class="stats-content">

        <!-- Performance Summary Grid -->
        <div class="stats-grid">
            <div class="stat-summary-card">
                <span class="summary-label">Cognitive Index</span>
                <strong class="summary-value">1,280</strong>
                <span class="summary-trend positive">↑ +5.4% this week</span>
            </div>

            <div class="stat-summary-card">
                <span class="summary-label">Total Time Played</span>
                <strong class="summary-value">4h 12m</strong>
                <span class="summary-trend">14 sessions</span>
            </div>

            <div class="stat-summary-card">
                <span class="summary-label">Accuracy Rate</span>
                <strong class="summary-value">92.4%</strong>
                <span class="summary-trend positive">↑ +1.2% this week</span>
            </div>
        </div>

        <!-- Domain Breakdown -->
        <section class="stats-section">
            <div class="section-header">
                <h2>Cognitive Skill Breakdown</h2>
            </div>
            
            <div class="skill-bars">
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Memory</span>
                        <span class="skill-score">88 / 100</span>
                    </div>
                    <div class="bar-bg">
                        <div class="bar-fill" style="width: 88%; background: var(--primary-2);"></div>
                    </div>
                </div>

                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Speed & Reaction</span>
                        <span class="skill-score">74 / 100</span>
                    </div>
                    <div class="bar-bg">
                        <div class="bar-fill" style="width: 74%; background: var(--primary);"></div>
                    </div>
                </div>

                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Cognitive Flexibility</span>
                        <span class="skill-score">62 / 100</span>
                    </div>
                    <div class="bar-bg">
                        <div class="bar-fill" style="width: 62%; background: var(--orange);"></div>
                    </div>
                </div>
            </div>
        </section>

    </div>
`;

// Period Filter Switching
const periodButtons = stats_UI.querySelectorAll(".stats-period-filter .filter-option");
periodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        periodButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        console.log("Selected period:", btn.dataset.period);
    });
});