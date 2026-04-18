(function () {
    "use strict";

    // ==========================================
    // SVG Icons
    // ==========================================
    const ICONS = {
        mushrooms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 4C7 4 3 7.5 3 11c0 1 .5 2 1 2h16c.5 0 1-1 1-2 0-3.5-4-7-9-7z"/><path d="M10 13v6c0 .5.5 1 1 1h2c.5 0 1-.5 1-1v-6"/></svg>',
        raw_tomato: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="13" r="8"/><path d="M9 5c1.5 1 4.5 1 6 0"/><path d="M12 5V3"/><path d="M12 9v8"/><path d="M8 13h8"/></svg>',
        blue_cheese: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8l8-4 8 4v8l-8 4-8-4V8z"/><circle cx="10" cy="12" r="1.5"/><circle cx="15" cy="10" r="1"/><circle cx="13" cy="15" r="1.2"/></svg>',
        cilantro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20V10"/><path d="M12 10c-3-3-7-2-7 1s4 4 7 1"/><path d="M12 10c3-3 7-2 7 1s-4 4-7 1"/><path d="M12 6c-2-2-5-1-5 1s3 3 5 1"/><path d="M12 6c2-2 5-1 5 1s-3 3-5 1"/></svg>',
        avocado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3c-4 0-7 4-7 9s3 9 7 9 7-4 7-9-3-9-7-9z"/><circle cx="12" cy="14" r="3.5"/></svg>',
        sushi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="14" rx="8" ry="5"/><path d="M4 14V10c0-2.8 3.6-5 8-5s8 2.2 8 5v4"/><path d="M8 11.5c1.5-.8 3.5-.8 5-.2s3 .4 3-.5"/></svg>',
        olives: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="9" cy="13" rx="4.5" ry="6"/><ellipse cx="9" cy="11" rx="1.5" ry="2"/><path d="M13 7c2-3 5-4 7-3"/><ellipse cx="16" cy="13" rx="3.5" ry="5" transform="rotate(15 16 13)"/></svg>',
        spicy_curry: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12c0 5 3 9 7 9s7-4 7-9"/><path d="M5 12h14"/><path d="M8 12V9c0-1 1-2 2-2"/><path d="M16 12V8"/><path d="M12 12V7"/><path d="M9 3c0 1.5 1 2.5 1 4"/><path d="M12 2c0 2 1 3 1 5"/><path d="M15 3c0 1.5 1 2.5 1 4"/></svg>',
        runny_egg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3c-2 0-4 3-5.5 6.5S4 16 4 17.5C4 20 7.5 21 12 21s8-1 8-3.5c0-1.5-1-4.5-2.5-8S14 3 12 3z"/><circle cx="12" cy="14" r="3"/></svg>',
        liver: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 8c0-2 2-4 5-4 2 0 3.5.5 4.5 1.5S18 8 18 10c0 3-1 5.5-3 7s-4.5 3-7 3c-1.5 0-2.5-1-2.5-3 0-1.5.5-3 1.5-4.5S6 10 6 8z"/><path d="M10 10c1 .5 2.5.5 4 0"/></svg>',
        pickles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="7" y="3" width="10" height="18" rx="5"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>',
        coconut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3c-1 3-1 6 0 9s3 6 5 8"/><path d="M12 3c1 3 1 6 0 9s-3 6-5 8"/><circle cx="10" cy="9" r="1"/><circle cx="14" cy="9" r="1"/></svg>',
        honey_glaze: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v4"/><path d="M10 7h4"/><path d="M8 10c0-1.5 1.8-3 4-3s4 1.5 4 3"/><path d="M6 10c0 2 1 3.5 2 5l-1 3c0 1 1 2 2.5 2h5c1.5 0 2.5-1 2.5-2l-1-3c1-1.5 2-3 2-5H6z"/><path d="M8 14h8"/></svg>',
        mayo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 4h8l1 4H7l1-4z"/><path d="M7 8v10c0 1.5 1 3 2.5 3h5c1.5 0 2.5-1.5 2.5-3V8"/><path d="M10 12c.5 1 1.5 1 2.5.5s2-.5 2.5.5"/></svg>',
        ripe_banana: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8c1-2 4-4 7-4 4 0 7 2 8 6 1 4-1 8-5 10-2 1-4 1-5 0"/><path d="M5 8c2 1 5 4 6 8s0 6-1 7"/></svg>',
    };

    // ==========================================
    // Data
    // ==========================================
    const GATEWAY_ITEMS = [
        { id: "mushrooms", name: "Mushrooms", desc: "Button, portobello, shiitake, truffle..." },
        { id: "raw_tomato", name: "Raw Tomato", desc: "Sliced on a sandwich, in a salad" },
        { id: "blue_cheese", name: "Blue Cheese", desc: "Roquefort, gorgonzola, stilton" },
        { id: "cilantro", name: "Cilantro", desc: "Fresh herb, common in Mexican & Asian food" },
        { id: "avocado", name: "Avocado", desc: "Guacamole, on toast, in sushi" },
        { id: "sushi", name: "Sushi (raw fish)", desc: "Nigiri, sashimi, rolls with raw fish" },
        { id: "olives", name: "Olives", desc: "Green, black, kalamata, on pizza" },
        { id: "spicy_curry", name: "Spicy Thai Curry", desc: "Green/red curry, coconut milk, chili" },
        { id: "runny_egg", name: "Runny Egg Yolk", desc: "Sunny-side up, soft poached, dippy eggs" },
        { id: "liver", name: "Liver / Pate", desc: "Organ meats, foie gras, liverwurst" },
        { id: "pickles", name: "Pickles / Sauerkraut", desc: "Fermented, vinegary, tangy" },
        { id: "coconut", name: "Coconut", desc: "Shredded, in curries, coconut milk, desserts" },
        { id: "honey_glaze", name: "Honey-Glazed Meat", desc: "Sweet + savory combo, teriyaki-style" },
        { id: "mayo", name: "Mayo / Aioli", desc: "On sandwiches, as dipping sauce, in dressings" },
        { id: "ripe_banana", name: "Ripe Banana", desc: "Soft, sweet, spotty brown" },
    ];

    const REACTIONS = [
        { value: "love", label: "Love it" },
        { value: "fine", label: "It's fine" },
        { value: "meh", label: "Not really" },
        { value: "hard_no", label: "Hard no" },
        { value: "depends", label: "It depends" },
        { value: "unknown", label: "Never tried" },
    ];

    const FOLLOWUPS = {
        raw_tomato: {
            title: "Tomatoes",
            context: "Tomatoes show up in lots of forms. Which of these work for you?",
            variants: [
                { name: "Raw sliced on a sandwich", desc: "Cold, firm, sliced" },
                { name: "Fresh salsa / bruschetta", desc: "Chopped raw, with herbs" },
                { name: "Tomato sauce on pasta", desc: "Cooked down, smooth" },
                { name: "Whole roasted tomato", desc: "Cooked, soft, split open" },
            ],
        },
        mushrooms: {
            title: "Mushrooms",
            context: "Mushrooms come in very different forms. Where's the line?",
            variants: [
                { name: "Button mushrooms on pizza", desc: "Sliced, mild" },
                { name: "Mushroom cream sauce", desc: "Blended into sauce" },
                { name: "Grilled portobello", desc: "Thick, meaty, charred" },
                { name: "Truffle oil on pasta", desc: "Earthy flavor, no texture" },
            ],
        },
        blue_cheese: {
            title: "Cheese",
            context: "Blue cheese is strong. But cheese is a big world.",
            variants: [
                { name: "Mozzarella on pizza", desc: "Melted, mild, stringy" },
                { name: "Cheddar on a burger", desc: "Melted, sharp" },
                { name: "Parmesan on pasta", desc: "Grated, salty, like seasoning" },
                { name: "Cream cheese on a bagel", desc: "Cold, smooth, spreadable" },
            ],
        },
        sushi: {
            title: "Sushi & Raw Fish",
            context: "What specifically works or doesn't about sushi?",
            variants: [
                { name: "California roll", desc: "Cooked crab, avocado, cucumber" },
                { name: "Salmon nigiri", desc: "Raw fish on rice" },
                { name: "Sashimi", desc: "Just raw fish, nothing else" },
                { name: "Fried tempura roll", desc: "Cooked, crunchy, with sauce" },
            ],
        },
        runny_egg: {
            title: "Eggs",
            context: "Runny yolk is specific. How about eggs in general?",
            variants: [
                { name: "Scrambled / hard-boiled", desc: "Fully cooked, no liquid" },
                { name: "Sunny-side up / poached", desc: "Runny yolk" },
                { name: "In Caesar dressing", desc: "Raw egg, hidden in sauce" },
                { name: "Baked into things", desc: "Cakes, quiche, frittata" },
            ],
        },
        olives: {
            title: "Olives",
            context: "Is it the olive itself or the flavor in general?",
            variants: [
                { name: "Whole olives on pizza/salad", desc: "The actual olive" },
                { name: "Olive tapenade / spread", desc: "Blended, on bread" },
                { name: "Olive oil for cooking", desc: "Just the oil" },
            ],
        },
        mayo: {
            title: "Creamy Condiments",
            context: "Mayo is divisive. What about nearby territory?",
            variants: [
                { name: "Plain mayo on a sandwich", desc: "Classic, cold, thick" },
                { name: "Garlic aioli as dip", desc: "Flavored, with fries" },
                { name: "Ranch dressing", desc: "On salad or as dip" },
            ],
        },
        honey_glaze: {
            title: "Sweet + Savory",
            context: "Where's the line with sweet in savory food?",
            variants: [
                { name: "Teriyaki chicken", desc: "Sweet soy glaze" },
                { name: "BBQ sauce on ribs", desc: "Smoky-sweet" },
                { name: "Fruit with cheese", desc: "Grapes, figs, on a board" },
                { name: "Mango salsa on fish", desc: "Tropical-sweet on savory" },
            ],
        },
    };

    // State
    const profile = { responses: {}, notes: {}, followups: {}, story: "" };
    let totalScreens = 0;
    let followupScreenIds = [];

    // ==========================================
    // Screen Navigation
    // ==========================================
    function goToScreen(n) {
        const current = document.querySelector(".screen.active");
        const next = document.querySelector(`.screen[data-screen="${n}"]`);
        if (!next || next === current) return;

        if (current) {
            current.classList.remove("active");
            current.classList.add("exit");
            setTimeout(() => current.classList.remove("exit"), 500);
        }

        next.classList.add("active");
        updateProgress(n);
    }

    function updateProgress(n) {
        const pct = Math.round(((n + 1) / totalScreens) * 100);
        document.getElementById("progressFill").style.width = Math.min(pct, 100) + "%";
    }

    // Global click handler for navigation buttons
    document.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-goto]");
        if (btn) goToScreen(parseInt(btn.dataset.goto, 10));
    });

    // ==========================================
    // Build Food Screens (1-15)
    // ==========================================
    function buildFoodScreens() {
        const container = document.getElementById("screens");
        const followupIntro = document.querySelector('[data-screen="16"]');

        GATEWAY_ITEMS.forEach((item, i) => {
            const screenNum = i + 1;
            const nextScreen = i < GATEWAY_ITEMS.length - 1 ? screenNum + 1 : 16;
            const section = document.createElement("section");
            section.className = "screen";
            section.dataset.screen = screenNum;

            section.innerHTML = `
                <div class="screen-content food-screen-content">
                    <div class="food-counter">${i + 1} of ${GATEWAY_ITEMS.length}</div>
                    <div class="food-icon-large">${ICONS[item.id]}</div>
                    <div class="food-name-large">${item.name}</div>
                    <div class="food-desc-large">${item.desc}</div>
                    <div class="reactions-stack">
                        ${REACTIONS.map(r => `
                            <div class="reaction-row" data-value="${r.value}" data-item="${item.id}">
                                <div class="reaction-dot"></div>
                                <div class="reaction-label">${r.label}</div>
                            </div>
                        `).join("")}
                    </div>
                    <div class="food-note-display" data-note-display="${item.id}"></div>
                    <div class="food-actions">
                        <button class="note-btn" data-note-for="${item.id}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            Add note
                        </button>
                        <button class="next-food-btn" data-goto="${nextScreen}">Next</button>
                    </div>
                </div>
            `;

            container.insertBefore(section, followupIntro);
        });
    }

    // Reaction row clicks
    document.addEventListener("click", function (e) {
        const row = e.target.closest(".reaction-row");
        if (!row) return;

        const stack = row.closest(".reactions-stack");
        if (!stack) return;

        const itemId = row.dataset.item;
        const value = row.dataset.value;

        // Toggle
        if (row.classList.contains("active")) {
            row.classList.remove("active");
            delete profile.responses[itemId];
            return;
        }

        stack.querySelectorAll(".reaction-row").forEach(r => r.classList.remove("active"));
        row.classList.add("active");
        profile.responses[itemId] = value;
    });

    // Note buttons
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".note-btn");
        if (btn) openNoteModal(btn.dataset.noteFor);
    });

    // ==========================================
    // Note Modal
    // ==========================================
    let activeNoteId = null;

    function openNoteModal(id) {
        activeNoteId = id;
        const item = GATEWAY_ITEMS.find(i => i.id === id);
        document.getElementById("noteModalTitle").textContent = "Note: " + (item ? item.name : id);
        document.getElementById("noteModalInput").value = profile.notes[id] || "";
        document.getElementById("noteModal").classList.remove("hidden");
        setTimeout(() => document.getElementById("noteModalInput").focus(), 100);
    }

    function closeNoteModal() {
        document.getElementById("noteModal").classList.add("hidden");
        activeNoteId = null;
    }

    document.getElementById("noteModalClose").addEventListener("click", closeNoteModal);
    document.getElementById("noteModalBackdrop").addEventListener("click", closeNoteModal);

    document.getElementById("noteModalSave").addEventListener("click", function () {
        const val = document.getElementById("noteModalInput").value.trim();
        if (val) {
            profile.notes[activeNoteId] = val;
        } else {
            delete profile.notes[activeNoteId];
        }

        // Update display
        const noteEl = document.querySelector(`[data-note-display="${activeNoteId}"]`);
        if (noteEl) {
            noteEl.textContent = val ? '"' + val + '"' : "";
            noteEl.classList.toggle("visible", !!val);
        }

        // Update button
        document.querySelectorAll(`.note-btn[data-note-for="${activeNoteId}"]`).forEach(btn => {
            btn.classList.toggle("has-note", !!val);
        });

        closeNoteModal();
    });

    // ==========================================
    // Build Follow-up Screens
    // ==========================================
    function buildFollowupScreens() {
        const container = document.getElementById("screens");

        // Determine which items need follow-ups
        const needsFollowup = [];
        for (const [id, response] of Object.entries(profile.responses)) {
            if ((response === "depends" || response === "hard_no" || response === "meh") && FOLLOWUPS[id]) {
                needsFollowup.push(id);
            }
        }
        for (const id of Object.keys(profile.notes)) {
            if (FOLLOWUPS[id] && !needsFollowup.includes(id)) {
                needsFollowup.push(id);
            }
        }

        // Remove old follow-up screens
        followupScreenIds.forEach(num => {
            const el = document.querySelector(`[data-screen="${num}"]`);
            if (el) el.remove();
        });
        followupScreenIds = [];

        // If no follow-ups needed, skip to free text
        const freeTextNum = 17 + needsFollowup.length;
        const profileNum = freeTextNum + 1;

        if (needsFollowup.length === 0) {
            // Update follow-up intro to skip
            const intro = document.querySelector('[data-screen="16"]');
            intro.querySelector("h2").textContent = "No follow-ups needed";
            intro.querySelector(".section-desc").textContent = "Your answers were pretty clear-cut. Let's keep going.";
            intro.querySelector("[data-goto]").dataset.goto = freeTextNum;
        } else {
            document.querySelector('[data-screen="16"] [data-goto]').dataset.goto = "17";
        }

        // Create follow-up screens
        needsFollowup.forEach((id, i) => {
            const screenNum = 17 + i;
            followupScreenIds.push(screenNum);
            const fu = FOLLOWUPS[id];
            const nextScreen = i < needsFollowup.length - 1 ? screenNum + 1 : freeTextNum;
            const userNote = profile.notes[id];

            const section = document.createElement("section");
            section.className = "screen";
            section.dataset.screen = screenNum;

            section.innerHTML = `
                <div class="screen-content followup-content">
                    <div class="food-counter">Follow-up ${i + 1} of ${needsFollowup.length}</div>
                    <div class="followup-title">${fu.title}</div>
                    <div class="followup-context">${fu.context}</div>
                    ${userNote ? `<div class="followup-user-note">Your note: "${userNote}"</div>` : ""}
                    <div class="followup-variants">
                        ${fu.variants.map((v, vi) => `
                            <div class="fu-variant">
                                <div class="fu-variant-top">
                                    <div>
                                        <div class="fu-variant-name">${v.name}</div>
                                        <div class="fu-variant-desc">${v.desc}</div>
                                    </div>
                                </div>
                                <div class="fu-reactions">
                                    <button class="fu-react-btn" data-value="love" data-fu="${id}" data-vi="${vi}">Love</button>
                                    <button class="fu-react-btn" data-value="fine" data-fu="${id}" data-vi="${vi}">Fine</button>
                                    <button class="fu-react-btn" data-value="hard_no" data-fu="${id}" data-vi="${vi}">No</button>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                    <button class="primary-btn" data-goto="${nextScreen}" style="width:100%">Next</button>
                </div>
            `;

            container.appendChild(section);
        });

        // Create free text screen
        const existingFreeText = document.querySelector(`[data-screen="${freeTextNum}"]`);
        if (!existingFreeText) {
            const freeSection = document.createElement("section");
            freeSection.className = "screen";
            freeSection.dataset.screen = freeTextNum;

            freeSection.innerHTML = `
                <div class="screen-content center-content">
                    <div class="section-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    </div>
                    <h2>Anything else?</h2>
                    <p class="section-desc">A meal that went wrong, a weird food rule, an exception that doesn't fit buttons. Optional but helpful.</p>
                    <textarea class="freetext-input" id="mealStory" rows="5" placeholder="That time I ordered the..."></textarea>
                    <button class="primary-btn" data-goto="${profileNum}" style="width:100%;margin-bottom:8px">Build my profile</button>
                    <button class="ghost-btn" data-goto="${profileNum}" style="width:100%">Skip</button>
                </div>
            `;

            container.appendChild(freeSection);
        }

        // Create profile screen
        const existingProfile = document.querySelector(`[data-screen="${profileNum}"]`);
        if (!existingProfile) {
            const profileSection = document.createElement("section");
            profileSection.className = "screen";
            profileSection.dataset.screen = profileNum;
            profileSection.dataset.isProfile = "true";

            profileSection.innerHTML = `
                <div class="screen-content profile-screen-content">
                    <h2 style="text-align:center;margin-bottom:4px">Your Taste Profile</h2>
                    <p class="section-desc" style="text-align:center;margin-bottom:24px">Everything is editable. This gets smarter with every menu scan.</p>

                    <div class="profile-block">
                        <div class="profile-block-header">
                            <div class="block-icon safe">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <div class="block-title">Safe Food Core</div>
                        </div>
                        <div class="block-desc">Your reliable go-tos for stressful dining situations.</div>
                        <div class="safe-foods" id="safeFoods"></div>
                    </div>

                    <div class="profile-block">
                        <div class="profile-block-header">
                            <div class="block-icon narrative">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            </div>
                            <div class="block-title">Taste Profile</div>
                        </div>
                        <div class="block-desc">What the AI reads when analyzing menus for you.</div>
                        <div class="narrative-entries" id="narrativeEntries"></div>
                    </div>

                    <div class="profile-block">
                        <div class="profile-block-header">
                            <div class="block-icon rules">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                            </div>
                            <div class="block-title">Hard Rules</div>
                        </div>
                        <div class="block-desc">Always flag red, no exceptions.</div>
                        <div class="hard-rules" id="hardRules"></div>
                    </div>

                    <div class="confidence-wrap">
                        <div class="confidence-bar"><div class="confidence-fill" id="confidenceFill"></div></div>
                        <div class="confidence-text" id="confidenceText"></div>
                    </div>
                </div>
            `;

            container.appendChild(profileSection);
        }

        totalScreens = profileNum + 1;
    }

    // Follow-up reaction clicks
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".fu-react-btn");
        if (!btn) return;

        const variant = btn.closest(".fu-variant");
        variant.querySelectorAll(".fu-react-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const fuId = btn.dataset.fu;
        const vi = btn.dataset.vi;
        if (!profile.followups[fuId]) profile.followups[fuId] = {};
        profile.followups[fuId][vi] = btn.dataset.value;
    });

    // Free text
    document.addEventListener("input", function (e) {
        if (e.target.id === "mealStory") profile.story = e.target.value;
    });

    // ==========================================
    // Build Profile (when profile screen shown)
    // ==========================================
    function buildProfile() {
        // Safe foods
        const safes = ["French fries", "Plain rice", "Grilled chicken", "Fresh bread"];
        for (const [id, val] of Object.entries(profile.responses)) {
            if (val === "love") {
                const item = GATEWAY_ITEMS.find(i => i.id === id);
                if (item) safes.push(item.name);
            }
        }
        for (const [fuId, variants] of Object.entries(profile.followups)) {
            const fu = FOLLOWUPS[fuId];
            if (!fu) continue;
            for (const [vi, val] of Object.entries(variants)) {
                if (val === "love") safes.push(fu.variants[parseInt(vi)].name);
            }
        }
        document.getElementById("safeFoods").innerHTML = safes.map(s => `<span class="safe-tag">${s}</span>`).join("");

        // Narrative
        const entries = [];
        const labels = { love: "Loves", fine: "Fine with", meh: "Not a big fan of", hard_no: "Hard no on", depends: "Complicated relationship with", unknown: "Has never tried" };

        for (const item of GATEWAY_ITEMS) {
            const response = profile.responses[item.id];
            if (!response) continue;
            let text = labels[response] + " " + item.name.toLowerCase() + ".";
            const note = profile.notes[item.id];
            if (note) text += ' Note: "' + note + '"';
            const fuData = profile.followups[item.id];
            const fu = FOLLOWUPS[item.id];
            if (fuData && fu) {
                const details = [];
                for (const [vi, val] of Object.entries(fuData)) {
                    const variant = fu.variants[parseInt(vi)];
                    const l = val === "love" ? "loves" : val === "fine" ? "okay with" : "avoids";
                    details.push(l + " " + variant.name.toLowerCase());
                }
                if (details.length) text += " Specifically: " + details.join(", ") + ".";
            }
            entries.push({ title: item.name, text });
        }
        if (profile.story.trim()) {
            entries.push({ title: "In Their Own Words", text: profile.story.trim() });
        }
        document.getElementById("narrativeEntries").innerHTML = entries.map(e =>
            `<div class="narrative-entry"><div class="narrative-entry-title">${e.title}</div><div class="narrative-entry-text">${e.text}</div></div>`
        ).join("");

        // Hard rules
        const rules = [];
        for (const [id, val] of Object.entries(profile.responses)) {
            if (val === "hard_no") {
                const item = GATEWAY_ITEMS.find(i => i.id === id);
                if (item) rules.push(item.name);
            }
        }
        document.getElementById("hardRules").innerHTML = rules.length
            ? rules.map(r => `<span class="hard-rule-tag">${r}</span>`).join("")
            : '<span class="safe-tag">No absolute dealbreakers set</span>';

        // Confidence
        const answered = Object.keys(profile.responses).length;
        const hasFu = Object.keys(profile.followups).length > 0;
        const hasNotes = Object.keys(profile.notes).length > 0;
        const hasStory = profile.story.trim().length > 0;
        let pct = Math.round((answered / GATEWAY_ITEMS.length) * 30);
        if (hasFu) pct += 15;
        if (hasNotes) pct += 5;
        if (hasStory) pct += 5;
        pct = Math.min(pct, 55);
        document.getElementById("confidenceFill").style.width = pct + "%";
        document.getElementById("confidenceText").textContent = "Profile confidence: " + pct + "% \u2014 scan real menus to improve.";
    }

    // Watch for profile screen activation
    const observer = new MutationObserver(function () {
        const profileScreen = document.querySelector('[data-is-profile="true"].active');
        if (profileScreen) buildProfile();
    });
    observer.observe(document.getElementById("screens"), { subtree: true, attributes: true, attributeFilter: ["class"] });

    // Build follow-ups when reaching screen 16
    const fuObserver = new MutationObserver(function () {
        const fuIntro = document.querySelector('[data-screen="16"].active');
        if (fuIntro) buildFollowupScreens();
    });
    fuObserver.observe(document.getElementById("screens"), { subtree: true, attributes: true, attributeFilter: ["class"] });

    // ==========================================
    // Typing Animation
    // ==========================================
    function typeText(el, text, speed, callback) {
        let i = 0;
        el.innerHTML = '<span class="cursor"></span>';
        function type() {
            if (i < text.length) {
                el.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
                i++;
                setTimeout(type, speed);
            } else {
                el.innerHTML = text;
                if (callback) callback();
            }
        }
        type();
    }

    // ==========================================
    // Init
    // ==========================================
    totalScreens = 1 + GATEWAY_ITEMS.length + 1 + 1 + 1 + 1; // welcome + foods + fu-intro + fu + freetext + profile
    buildFoodScreens();
    updateProgress(0);

    // Welcome animation
    setTimeout(function () {
        typeText(document.getElementById("typedHeading"), "Hi, I'm Menu Buddy.", 50, function () {
            document.getElementById("welcomeSub").style.opacity = "1";
            setTimeout(function () {
                document.getElementById("welcomeNote").style.opacity = "1";
                setTimeout(function () {
                    document.getElementById("welcomeBtn").style.opacity = "1";
                    document.getElementById("welcomeBtn").style.transition = "opacity 0.4s ease";
                }, 300);
            }, 300);
        });
    }, 400);
})();
