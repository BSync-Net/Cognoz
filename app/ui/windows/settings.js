import { Window } from "./window.js";


export class Settings extends Window {

    constructor() {
        super("settings", {
            title: "Settings",
            className: "window"
        });
    }


    /**
     * Builds the Settings UI.
     *
     * @returns {HTMLElement}
     */
    getContent() {

        const settingsUI = document.createElement("div");

        // ========================================
        // SETTINGS HEADER
        // ========================================

        const settingsHeader = document.createElement("div");
        settingsHeader.className = "settings-header";

        const settingsTitle = document.createElement("div");
        settingsTitle.className = "settings-title";

        const eyebrow = document.createElement("span");
        eyebrow.className = "eyebrow";
        eyebrow.textContent = "PREFERENCES";

        const title = document.createElement("h1");
        title.textContent = "Settings";

        const description = document.createElement("p");
        description.textContent = "Customize your experience and gameplay settings.";

        settingsTitle.appendChild(eyebrow);
        settingsTitle.appendChild(title);
        settingsTitle.appendChild(description);

        settingsHeader.appendChild(settingsTitle);

        // ========================================
        // SETTINGS CONTENT
        // ========================================

        const settingsContent = document.createElement("div");
        settingsContent.className = "settings-content";

        // ========================================
        // GAME SETTINGS
        // ========================================

        const gameSettings = this.createSettingCard(
            "Games",
            "Challenge Level",
            "Adjust how the Next Game Selection algorithm weighs your cognitive stats."
        );

        const challengeSelect = document.createElement("select");

        challengeSelect.className = "settings-select";
        challengeSelect.id = "challenge-level";

        const challengeOptions = [
            ["adaptive", "Adaptive (Balanced)"],
            ["favour", "Favour Strengths"],
            ["challenge", "Challenge Weaknesses"]
        ];

        challengeOptions.forEach(([value, text]) => {

            const option = document.createElement("option");
            option.value = value;
            option.textContent = text;

            challengeSelect.appendChild(option);

        });

        gameSettings.control.appendChild(
            challengeSelect
        );

        // ========================================
        // APPEARANCE SETTINGS
        // ========================================

        const appearanceSettings =
            this.createSettingCard(
                "Appearance",
                "Theme",
                "Choose between light and dark themed interfaces."
            );

        const themeToggle =
            document.createElement("div");

        themeToggle.className =
            "theme-toggle-group";

        const lightButton =
            document.createElement("button");

        lightButton.className =
            "theme-btn active";

        lightButton.type = "button";
        lightButton.dataset.theme = "light";
        lightButton.textContent = "Light";

        const darkButton = document.createElement("button");
        darkButton.className = "theme-btn";

        darkButton.type = "button";
        darkButton.dataset.theme = "dark";
        darkButton.textContent = "Dark";

        themeToggle.appendChild(lightButton);
        themeToggle.appendChild(darkButton);

        appearanceSettings.control.appendChild(
            themeToggle
        );

        // ========================================
        // BUILD SETTINGS
        // ========================================

        settingsContent.appendChild(
            gameSettings.card
        );

        settingsContent.appendChild(
            appearanceSettings.card
        );

        settingsUI.appendChild(settingsHeader);
        settingsUI.appendChild(settingsContent);

        return settingsUI;
    }


    /**
     * Creates a setting card.
     *
     * @param {string} title
     * @param {string} optionTitle
     * @param {string} description
     * @returns {{
     *     card: HTMLElement,
     *     control: HTMLElement
     * }}
     */
    createSettingCard(
        title,
        optionTitle,
        description
    ) {

        const card = document.createElement("section");
        card.className = "setting-card";


        // ========================================
        // CARD HEADER
        // ========================================

        const cardHeader =
            document.createElement("div");

        cardHeader.className =
            "setting-card-header";


        const cardTitle =
            document.createElement("h2");

        cardTitle.textContent = title;


        cardHeader.appendChild(cardTitle);


        // ========================================
        // SETTING OPTION
        // ========================================

        const settingOption =
            document.createElement("div");

        settingOption.className =
            "setting-option";


        // Info
        const settingInfo =
            document.createElement("div");

        settingInfo.className =
            "setting-info";


        const optionHeading =
            document.createElement("h3");

        optionHeading.textContent =
            optionTitle;


        const optionDescription =
            document.createElement("p");

        optionDescription.textContent =
            description;


        settingInfo.appendChild(optionHeading);
        settingInfo.appendChild(optionDescription);


        // Control
        const settingControl =
            document.createElement("div");

        settingControl.className =
            "setting-control";


        settingOption.appendChild(settingInfo);
        settingOption.appendChild(settingControl);


        // Build card
        card.appendChild(cardHeader);
        card.appendChild(settingOption);


        return {
            card,
            control: settingControl
        };
    }


    /**
     * Attaches Settings event listeners.
     */
    bindEvents() {

        if (!this.element) {
            return;
        }


        // ========================================
        // CHALLENGE LEVEL
        // ========================================

        const challengeSelect =
            this.element.querySelector(
                "#challenge-level"
            );


        if (challengeSelect) {

            challengeSelect.addEventListener(
                "change",
                () => {

                    const level =
                        challengeSelect.value;


                    console.log(
                        "Challenge level changed:",
                        level
                    );

                }
            );

        }


        // ========================================
        // THEME
        // ========================================

        const themeButtons =
            this.element.querySelectorAll(
                ".theme-btn"
            );


        themeButtons.forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const html =
                        document.documentElement;


                    const theme =
                        button.dataset.theme;


                    // Update active button
                    themeButtons.forEach((item) => {
                        item.classList.remove("active");
                    });


                    button.classList.add("active");


                    // Apply theme
                    if (theme === "dark") {

                        html.setAttribute(
                            "data-theme",
                            "dark"
                        );

                    }
                    else {

                        html.removeAttribute(
                            "data-theme"
                        );

                    }


                    console.log(
                        "Theme changed to:",
                        theme
                    );

                }
            );

        });

    }
}