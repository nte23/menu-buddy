(function () {
    "use strict";

    const TOTAL_STEPS = 5;
    let currentStep = 0;

    // ==========================================
    // Gateway Items (from methodology doc)
    // ==========================================
    const GATEWAY_ITEMS = [
        { id: "mushrooms", name: "Mushrooms", desc: "Button, portobello, shiitake, truffle...", emoji: "\ud83c\udf44" },
        { id: "raw_tomato", name: "Raw Tomato", desc: "Sliced on a sandwich, in a salad", emoji: "\ud83c\udf45" },
        { id: "blue_cheese", name: "Blue Cheese", desc: "Roquefort, gorgonzola, stilton", emoji: "\ud83e\uddc0" },
        { id: "cilantro", name: "Cilantro", desc: "Fresh herb, common in Mexican & Asian food", emoji: "\ud83c\udf3f" },
        { id: "avocado", name: "Avocado", desc: "Guacamole, on toast, in sushi", emoji: "\ud83e\udd51" },
        { id: "sushi", name: "Sushi (raw fish)", desc: "Nigiri, sashimi, rolls with raw fish", emoji: "\ud83c\udf63" },
        { id: "olives", name: "Olives", desc: "Green, black, kalamata, on pizza", emoji: "\ud83e\uded2" },
        { id: "spicy_curry", name: "Spicy Thai Curry", desc: "Green/red curry, coconut milk, chili", emoji: "\ud83c\udf5b" },
        { id: "runny_egg", name: "Runny Egg Yolk", desc: "Sunny-side up, soft poached, dippy eggs", emoji: "\ud83c\udf73" },
        { id: "liver", name: "Liver / Pat\u00e9", desc: "Organ meats, foie gras, liverwurst", emoji: "\ud83c\udf56" },
        { id: "pickles", name: "Pickles / Sauerkraut", desc: "Fermented, vinegary, tangy", emoji: "\ud83e\udd52" },
        { id: "coconut", name: "Coconut", desc: "Shredded, in curries, coconut milk, desserts", emoji: "\ud83e\udd65" },
        { id: "honey_glaze", name: "Honey-Glazed Meat", desc: "Sweet + savory combo, teriyaki-style", emoji: "\ud83c\udf6f" },
        { id: "mayo", name: "Mayo / Aioli", desc: "On sandwiches, as dipping sauce, in dressings", emoji: "\ud83e\ude94" },
        { id: "ripe_banana", name: "Ripe Banana", desc: "Soft, sweet, spotty brown — the mushy kind", emoji: "\ud83c\udf4c" },
    ];

    const REACTIONS = [
        { value: "love", label: "Love it" },
        { value: "fine", label: "It's fine" },
        { value: "meh", label: "Not really" },
        { value: "hard_no", label: "Hard no" },
        { value: "depends", label: "Depends" },
        { value: "unknown", label: "Never tried" },
    ];

    // Follow-up templates keyed by item ID
    const FOLLOWUPS = {
        raw_tomato: {
            title: "Tomatoes",
            context: "You flagged raw tomato. Tomatoes show up in lots of forms \u2014 which of these are okay?",
            variants: [
                { name: "Raw sliced on a sandwich", desc: "Cold, firm, sliced" },
                { name: "Fresh salsa / bruschetta", desc: "Chopped raw, with herbs" },
                { name: "Tomato sauce on pasta", desc: "Cooked down, smooth" },
                { name: "Whole roasted tomato", desc: "Cooked, soft, split open" },
            ],
        },
        mushrooms: {
            title: "Mushrooms",
            context: "Mushrooms come in very different forms. Can you be more specific?",
            variants: [
                { name: "Button/white mushrooms", desc: "On pizza, in salads" },
                { name: "Mushroom in a cream sauce", desc: "Blended or chopped in sauce" },
                { name: "Grilled portobello", desc: "Thick, meaty, charred" },
                { name: "Truffle oil on pasta", desc: "Earthy mushroom flavor, no texture" },
            ],
        },
        blue_cheese: {
            title: "Cheese",
            context: "Blue cheese is a hard no \u2014 but cheese is a big world. What about these?",
            variants: [
                { name: "Mozzarella on pizza", desc: "Melted, mild, stringy" },
                { name: "Cheddar on a burger", desc: "Melted, sharp" },
                { name: "Parmesan on pasta", desc: "Grated, salty, seasoning-like" },
                { name: "Cream cheese on a bagel", desc: "Cold, smooth, spreadable" },
            ],
        },
        sushi: {
            title: "Sushi & Raw Fish",
            context: "Let me figure out what specifically works or doesn't about sushi.",
            variants: [
                { name: "California roll", desc: "Cooked crab, avocado, cucumber" },
                { name: "Salmon nigiri", desc: "Raw fish on rice" },
                { name: "Sashimi", desc: "Just raw fish, nothing else" },
                { name: "Fried tempura roll", desc: "Cooked, crunchy, with sauce" },
            ],
        },
        runny_egg: {
            title: "Eggs",
            context: "Runny yolk is specific. Let me map out your egg preferences.",
            variants: [
                { name: "Scrambled / hard-boiled", desc: "Fully cooked, no liquid" },
                { name: "Sunny-side up / soft poached", desc: "Runny yolk" },
                { name: "In Caesar dressing", desc: "Raw egg, hidden in sauce" },
                { name: "Baked into things", desc: "Cakes, quiche, frittata" },
            ],
        },
        olives: {
            title: "Olives",
            context: "Olives can be polarizing. Is it the olive itself or the flavor in general?",
            variants: [
                { name: "Whole olives (on pizza, in salad)", desc: "The actual olive" },
                { name: "Olive tapenade / spread", desc: "Blended, on bread" },
                { name: "Olive oil (for cooking)", desc: "Just the oil, no olive pieces" },
                { name: "Stuffed olives (appetizer)", desc: "With cheese or garlic" },
            ],
        },
        mayo: {
            title: "Creamy Condiments",
            context: "Mayo is divisive. Let me check nearby territory.",
            variants: [
                { name: "Plain mayo on a sandwich", desc: "Classic, cold, thick" },
                { name: "Garlic aioli as dip", desc: "Flavored, with fries" },
                { name: "Ranch dressing", desc: "On salad or as dip" },
                { name: "Tartar sauce with fish", desc: "Chunky, tangy" },
            ],
        },
        honey_glaze: {
            title: "Sweet + Savory",
            context: "You flagged honey-glazed meat. Let me figure out where the line is.",
            variants: [
                { name: "Teriyaki chicken", desc: "Sweet soy glaze" },
                { name: "BBQ sauce on ribs", desc: "Smoky-sweet" },
                { name: "Fruit with cheese", desc: "Grapes, figs, on a board" },
                { name: "Mango salsa on fish", desc: "Tropical-sweet on savory" },
            ],
        },
    };

    // State
    const profile = {
        responses: {},
        notes: {},
        followups: {},
        story: "",
    };

    // ==========================================
    // Progress
    // ==========================================
    function updateProgress() {
        const pct = ((currentStep + 1) / TOTAL_STEPS) * 100;
        document.getElementById("progressFill").style.width = pct + "%";
    }

    // ==========================================
    // Step navigation
    // ==========================================
    function showStep(n) {
        currentStep = n;
        const step = document.querySelector(`.step[data-step="${n}"]`);
        if (!step) return;
        step.classList.remove("hidden");
        updateProgress();

        if (n === 2) buildFollowups();
        if (n === 4) buildProfile();

        setTimeout(() => step.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }

    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".continue-btn") || e.target.closest(".skip-btn");
        if (!btn) return;
        const next = parseInt(btn.dataset.next, 10);
        showStep(next);
    });

    // ==========================================
    // Build Round 1 Grid
    // ==========================================
    function buildFoodGrid() {
        const grid = document.getElementById("foodGrid");
        GATEWAY_ITEMS.forEach((item) => {
            const el = document.createElement("div");
            el.className = "food-item";
            el.dataset.id = item.id;

            el.innerHTML = `
                <div class="food-item-header">
                    <div class="food-item-info">
                        <div class="food-item-emoji">${item.emoji}</div>
                        <div>
                            <div class="food-item-name">${item.name}</div>
                            <div class="food-item-desc">${item.desc}</div>
                        </div>
                    </div>
                    <button class="food-note-btn" data-id="${item.id}" title="Add a note">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </button>
                </div>
                <div class="food-reactions">
                    ${REACTIONS.map(
                        (r) =>
                            `<button class="reaction-btn" data-value="${r.value}" data-id="${item.id}">${r.label}</button>`
                    ).join("")}
                </div>
                <div class="food-item-note" data-note-display="${item.id}"></div>
            `;

            grid.appendChild(el);
        });
    }

    // Handle reaction clicks
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".reaction-btn");
        if (!btn || !btn.closest(".food-grid")) return;

        const id = btn.dataset.id;
        const value = btn.dataset.value;
        const item = btn.closest(".food-item");

        // Toggle: if already selected, deselect
        if (btn.classList.contains("active")) {
            btn.classList.remove("active");
            delete profile.responses[id];
            delete item.dataset.selected;
            return;
        }

        // Deselect siblings
        item.querySelectorAll(".reaction-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        profile.responses[id] = value;
        item.dataset.selected = value;
    });

    // Note button clicks
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".food-note-btn");
        if (!btn) return;
        openNoteModal(btn.dataset.id);
    });

    // ==========================================
    // Note Modal
    // ==========================================
    let activeNoteId = null;

    function openNoteModal(id) {
        activeNoteId = id;
        const item = GATEWAY_ITEMS.find((i) => i.id === id);
        const modal = document.getElementById("noteModal");
        const title = document.getElementById("noteModalTitle");
        const input = document.getElementById("noteModalInput");

        title.textContent = `Note: ${item ? item.name : id}`;
        input.value = profile.notes[id] || "";
        modal.classList.remove("hidden");
        setTimeout(() => input.focus(), 100);
    }

    function closeNoteModal() {
        document.getElementById("noteModal").classList.add("hidden");
        activeNoteId = null;
    }

    document.getElementById("noteModalClose").addEventListener("click", closeNoteModal);
    document.getElementById("noteModal").addEventListener("click", function (e) {
        if (e.target === this) closeNoteModal();
    });

    document.getElementById("noteModalSave").addEventListener("click", function () {
        const input = document.getElementById("noteModalInput");
        const val = input.value.trim();

        if (val) {
            profile.notes[activeNoteId] = val;
        } else {
            delete profile.notes[activeNoteId];
        }

        // Update UI
        const noteDisplay = document.querySelector(`[data-note-display="${activeNoteId}"]`);
        if (noteDisplay) {
            noteDisplay.textContent = val ? `"${val}"` : "";
            noteDisplay.classList.toggle("visible", !!val);
        }

        const noteBtn = document.querySelector(`.food-note-btn[data-id="${activeNoteId}"]`);
        if (noteBtn) noteBtn.classList.toggle("has-note", !!val);

        closeNoteModal();
    });

    // ==========================================
    // Build Round 2 Follow-ups
    // ==========================================
    function buildFollowups() {
        const list = document.getElementById("followupList");
        list.innerHTML = "";

        // Find items that need follow-ups: depends, hard_no, meh + items with notes
        const needsFollowup = [];
        for (const [id, response] of Object.entries(profile.responses)) {
            if (
                (response === "depends" || response === "hard_no" || response === "meh") &&
                FOLLOWUPS[id]
            ) {
                needsFollowup.push(id);
            }
        }
        // Also include items with notes that have follow-up templates
        for (const id of Object.keys(profile.notes)) {
            if (FOLLOWUPS[id] && !needsFollowup.includes(id)) {
                needsFollowup.push(id);
            }
        }

        if (needsFollowup.length === 0) {
            list.innerHTML = `
                <div class="ai-message" style="margin-left:-44px">
                    <div class="ai-avatar">MB</div>
                    <div class="ai-bubble">
                        <p>Your answers were pretty clear-cut! No follow-ups needed. Let's move on.</p>
                    </div>
                </div>
            `;
            return;
        }

        needsFollowup.forEach((id) => {
            const fu = FOLLOWUPS[id];
            const group = document.createElement("div");
            group.className = "followup-group";

            const userNote = profile.notes[id];
            const noteHtml = userNote
                ? `<div style="font-size:0.75rem;color:var(--accent);font-style:italic;margin-bottom:10px;">Your note: "${userNote}"</div>`
                : "";

            group.innerHTML = `
                <div class="followup-group-title">${fu.title}</div>
                <div class="followup-group-context">${fu.context}</div>
                ${noteHtml}
                <div class="followup-variants">
                    ${fu.variants
                        .map(
                            (v, i) => `
                        <div class="followup-variant">
                            <div>
                                <div class="followup-variant-name">${v.name}</div>
                                <div class="followup-variant-desc">${v.desc}</div>
                            </div>
                            <div class="followup-reactions">
                                <button class="reaction-btn" data-value="love" data-fu="${id}" data-vi="${i}">Love</button>
                                <button class="reaction-btn" data-value="fine" data-fu="${id}" data-vi="${i}">Fine</button>
                                <button class="reaction-btn" data-value="hard_no" data-fu="${id}" data-vi="${i}">No</button>
                            </div>
                        </div>
                    `
                        )
                        .join("")}
                </div>
            `;

            list.appendChild(group);
        });
    }

    // Follow-up reaction clicks
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".followup-reactions .reaction-btn");
        if (!btn) return;

        const variant = btn.closest(".followup-variant");
        variant.querySelectorAll(".reaction-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const fuId = btn.dataset.fu;
        const vi = btn.dataset.vi;
        if (!profile.followups[fuId]) profile.followups[fuId] = {};
        profile.followups[fuId][vi] = btn.dataset.value;

        // Update variant border
        variant.style.borderColor =
            btn.dataset.value === "love"
                ? "var(--green-border)"
                : btn.dataset.value === "hard_no"
                ? "var(--red-border)"
                : "var(--accent-border)";
    });

    // Free text
    document.getElementById("mealStory").addEventListener("input", function () {
        profile.story = this.value;
    });

    // ==========================================
    // Build Profile
    // ==========================================
    function buildProfile() {
        buildSafeFoods();
        buildNarrative();
        buildHardRules();
        buildConfidence();
    }

    function buildSafeFoods() {
        const el = document.getElementById("safeFoods");
        const safes = [];

        // Calibration items always safe
        safes.push("French fries", "Plain rice", "Grilled chicken", "Fresh bread");

        // Items rated "love"
        for (const [id, val] of Object.entries(profile.responses)) {
            if (val === "love") {
                const item = GATEWAY_ITEMS.find((i) => i.id === id);
                if (item) safes.push(item.name);
            }
        }

        // Follow-up loves
        for (const [fuId, variants] of Object.entries(profile.followups)) {
            const fu = FOLLOWUPS[fuId];
            if (!fu) continue;
            for (const [vi, val] of Object.entries(variants)) {
                if (val === "love") safes.push(fu.variants[parseInt(vi)].name);
            }
        }

        el.innerHTML = safes.map((s) => `<span class="safe-tag">${s}</span>`).join("");
    }

    function buildNarrative() {
        const el = document.getElementById("narrativeEntries");
        const entries = [];

        for (const item of GATEWAY_ITEMS) {
            const response = profile.responses[item.id];
            if (!response) continue;

            const note = profile.notes[item.id];
            const fuData = profile.followups[item.id];
            const fu = FOLLOWUPS[item.id];

            let text = "";
            const responseLabel = {
                love: "Loves",
                fine: "Fine with",
                meh: "Not a big fan of",
                hard_no: "Hard no on",
                depends: "Complicated relationship with",
                unknown: "Has never tried",
            };

            text = `${responseLabel[response]} ${item.name.toLowerCase()}.`;

            if (note) text += ` User note: "${note}"`;

            if (fuData && fu) {
                const details = [];
                for (const [vi, val] of Object.entries(fuData)) {
                    const variant = fu.variants[parseInt(vi)];
                    const label =
                        val === "love" ? "loves" : val === "fine" ? "okay with" : "avoids";
                    details.push(`${label} ${variant.name.toLowerCase()}`);
                }
                if (details.length > 0) text += " Specifically: " + details.join(", ") + ".";
            }

            entries.push({ title: item.name, text: text });
        }

        // Add story if provided
        if (profile.story.trim()) {
            entries.push({
                title: "In Their Own Words",
                text: profile.story.trim(),
            });
        }

        el.innerHTML = entries
            .map(
                (e) => `
                <div class="narrative-entry">
                    <div class="narrative-entry-title">${e.title}</div>
                    <div class="narrative-entry-text">${e.text}</div>
                </div>
            `
            )
            .join("");
    }

    function buildHardRules() {
        const el = document.getElementById("hardRules");
        const rules = [];

        for (const [id, val] of Object.entries(profile.responses)) {
            if (val === "hard_no") {
                const item = GATEWAY_ITEMS.find((i) => i.id === id);
                if (item) rules.push(item.name);
            }
        }

        if (rules.length === 0) {
            el.innerHTML = '<span class="safe-tag">No absolute dealbreakers set</span>';
        } else {
            el.innerHTML = rules
                .map((r) => `<span class="hard-rule-tag">${r}</span>`)
                .join("");
        }
    }

    function buildConfidence() {
        const answered = Object.keys(profile.responses).length;
        const hasFollowups = Object.keys(profile.followups).length > 0;
        const hasNotes = Object.keys(profile.notes).length > 0;
        const hasStory = profile.story.trim().length > 0;

        let pct = Math.round((answered / GATEWAY_ITEMS.length) * 30);
        if (hasFollowups) pct += 15;
        if (hasNotes) pct += 5;
        if (hasStory) pct += 5;
        pct = Math.min(pct, 55);

        document.getElementById("confidenceFill").style.width = pct + "%";
        document.getElementById("confidenceText").textContent = `Profile confidence: ${pct}% \u2014 this is a starting point. Scan a few real menus and I'll get much smarter.`;
    }

    // ==========================================
    // Init
    // ==========================================
    buildFoodGrid();
    updateProgress();
})();
