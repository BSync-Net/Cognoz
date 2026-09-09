import { Window } from "./window.js";


export class Progress extends Window {

    constructor() {
        super("progress", {
            title: "Progress",
            className: "window"
        });
    }


    /**
     * Builds the Progress UI.
     *
     * @returns {HTMLElement}
     */
    getContent() {

        const progressUI = document.createElement("div");

        // ========================================
        // PROGRESS HEADER
        // ========================================

        const progressHeader = document.createElement("div");
        progressHeader.className = "progress-header";

        const progressTitle = document.createElement("div");
        progressTitle.className = "progress-title";

        const eyebrow = document.createElement("span");
        eyebrow.className = "eyebrow";
        eyebrow.textContent = "ANALYTICS & INSIGHTS";

        const title = document.createElement("h1");
        title.textContent = "Cognitive progress";

        const description = document.createElement("p");
        description.textContent = "Track your mental performance and progress over time.";

        progressTitle.appendChild(eyebrow);
        progressTitle.appendChild(title);
        progressTitle.appendChild(description);

        // ========================================
        // PERIOD FILTER
        // ========================================

        const periodFilter = document.createElement("div");
        periodFilter.className = "progress-period-filter";

        const periods = [
            ["7d", "7 Days"],
            ["30d", "30 Days"],
            ["all", "All Time"]
        ];

        periods.forEach(([value, text], index) => {
            const button = document.createElement("button");
            button.className = "filter-option";
            if (index === 0) {
                button.classList.add("active");
            }

            button.type = "button";
            button.dataset.period = value;
            button.textContent = text;

            periodFilter.appendChild(button);
        });


        progressHeader.appendChild(progressTitle);
        progressHeader.appendChild(periodFilter);

        // ========================================
        // PROGRESS CONTENT
        // ========================================

        const progressContent = document.createElement("div");
        progressContent.className = "progress-content";

        // ========================================
        // SUMMARY GRID
        // ========================================

        const progressGrid = document.createElement("div");
        progressGrid.className = "progress-grid";

        progressGrid.appendChild(
            this.createSummaryCard(
                "Cognitive Index",
                "1,280",
                "↑ +5.4% this week",
                true
            )
        );

        progressGrid.appendChild(
            this.createSummaryCard(
                "Total Time Played",
                "4h 12m",
                "14 sessions",
                false
            )
        );

        progressGrid.appendChild(
            this.createSummaryCard(
                "Accuracy Rate",
                "92.4%",
                "↑ +1.2% this week",
                true
            )
        );

        // ========================================
        // SKILL SECTION
        // ========================================

        const progressSection = document.createElement("section");
        progressSection.className = "progress-section";

        const sectionHeader = document.createElement("div");
        sectionHeader.className = "section-header";

        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = "Cognitive Skill Breakdown";

        sectionHeader.appendChild(sectionTitle);

        // ========================================
        // SKILL BARS
        // ========================================

        const skillBars = document.createElement("div");
        skillBars.className = "skill-bars";

        skillBars.appendChild(
            this.createSkillBar(
                "Memory",
                88,
                "var(--primary-2)"
            )
        );

        skillBars.appendChild(
            this.createSkillBar(
                "Speed & Reaction",
                74,
                "var(--primary)"
            )
        );

        skillBars.appendChild(
            this.createSkillBar(
                "Cognitive Flexibility",
                62,
                "var(--orange)"
            )
        );

        progressSection.appendChild(sectionHeader);
        progressSection.appendChild(skillBars);

        // ========================================
        // BUILD CONTENT
        // ========================================

        progressContent.appendChild(progressGrid);
        progressContent.appendChild(progressSection);

        // ========================================
        // BUILD UI
        // ========================================

        progressUI.appendChild(progressHeader);
        progressUI.appendChild(progressContent);

        return progressUI;
    }


    /**
     * Creates a summary card.
     *
     * @param {string} label
     * @param {string} value
     * @param {string} trend
     * @param {boolean} positive
     * @returns {HTMLElement}
     */
    createSummaryCard(label, value, trend, positive) {

        const card = document.createElement("div");
        card.className = "stat-summary-card";

        const summaryLabel = document.createElement("span");
        summaryLabel.className = "summary-label";
        summaryLabel.textContent = label;

        const summaryValue = document.createElement("strong");
        summaryValue.className = "summary-value";
        summaryValue.textContent = value;

        const summaryTrend = document.createElement("span");
        summaryTrend.className = "summary-trend";

        if (positive) {
            summaryTrend.classList.add("positive");
        }

        summaryTrend.textContent = trend;

        card.appendChild(summaryLabel);
        card.appendChild(summaryValue);
        card.appendChild(summaryTrend);

        return card;
    }


    /**
     * Creates a skill progress bar.
     *
     * @param {string} name
     * @param {number} score
     * @param {string} background
     * @returns {HTMLElement}
     */
    createSkillBar(name, score, background) {
        const item = document.createElement("div");
        item.className = "skill-item";

        // Skill info
        const skillInfo = document.createElement("div");
        skillInfo.className = "skill-info";

        const skillName = document.createElement("span");
        skillName.className = "skill-name";
        skillName.textContent = name;

        const skillScore = document.createElement("span");
        skillScore.className = "skill-score";
        skillScore.textContent = `${score} / 100`;

        skillInfo.appendChild(skillName);
        skillInfo.appendChild(skillScore);

        // Bar
        const barBackground = document.createElement("div");
        barBackground.className = "bar-bg";

        const barFill = document.createElement("div");
        barFill.className = "bar-fill";

        barFill.style.width = `${score}%`;
        barFill.style.background = background;

        barBackground.appendChild(barFill);

        // Build item
        item.appendChild(skillInfo);
        item.appendChild(barBackground);

        return item;
    }


    /**
     * Attaches Progress event listeners.
     */
    bindEvents() {

        if (!this.element) {
            return;
        }

        const periodButtons =
            this.element.querySelectorAll(".progress-period-filter .filter-option");

        periodButtons.forEach((button) => {

            button.addEventListener("click", () => {

                periodButtons.forEach((item) => {
                    item.classList.remove("active");
                });

                button.classList.add("active");
                const selectedPeriod = button.dataset.period;
                console.log("Selected period:", selectedPeriod);

            });

        });

    }
}