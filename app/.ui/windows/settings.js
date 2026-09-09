import { Window } from "./window.js";
import { WindowManager } from "./windowManager.js";

export class SettingsWindow extends Window {
    template() {
        return `
            <div class="settings-header">
                <div class="settings-title">
                    <span class="eyebrow">PREFERENCES</span>
                    <h1>Settings</h1>
                    <p>Customize your experience and gameplay settings.</p>
                </div>
            </div>

            <div class="settings-content">
                <!-- Game Settings Card -->
                <section class="setting-card">
                    <div class="setting-card-header">
                        <h2>Games</h2>
                    </div>

                    <div class="setting-option">
                        <div class="setting-info">
                            <h3>Challenge Level</h3>
                            <p>Adjust how the Next Game Selection algorithm weighs your cognitive stats.</p>
                        </div>
                        <div class="setting-control">
                            <select class="settings-select" id="challenge-level">
                                <option value="adaptive">Adaptive (Balanced)</option>
                                <option value="favour">Favour Strengths</option>
                                <option value="challenge">Challenge Weaknesses</option>
                            </select>
                        </div>
                    </div>
                </section>

                <!-- Appearance Settings Card -->
                <section class="setting-card">
                    <div class="setting-card-header">
                        <h2>Appearance</h2>
                    </div>

                    <div class="setting-option">
                        <div class="setting-info">
                            <h3>Theme</h3>
                            <p>Choose between light and dark themed interfaces.</p>
                        </div>
                        <div class="setting-control">
                            <div class="theme-toggle-group">
                                <button class="theme-btn active" data-theme="light">Light</button>
                                <button class="theme-btn" data-theme="dark">Dark</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    bindEvents() {
        const themeButtons = this.$$(".theme-btn");

        themeButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                themeButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                console.log("Theme changed to:", btn.dataset.theme);
            });
        });
    }
}

WindowManager.register("settings", SettingsWindow, { title: "Settings" });
