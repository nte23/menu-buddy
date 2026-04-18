(function () {
    "use strict";

    const totalSteps = 6; // 0-5
    let currentStep = 0;

    // State
    const profile = {
        pickyLevel: 2,
        flavors: {},
        textures: {},
        dealbreakers: [],
        story: "",
    };

    // Progress bar
    function updateProgress() {
        const pct = ((currentStep + 1) / totalSteps) * 100;
        document.getElementById("progressFill").style.width = pct + "%";
    }

    // Show next step
    function showStep(n) {
        currentStep = n;
        const step = document.querySelector(`.step[data-step="${n}"]`);
        if (!step) return;
        step.classList.remove("hidden");
        updateProgress();

        // Build result if final step
        if (n === 5) buildResult();

        // Scroll to new step
        setTimeout(() => {
            step.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    }

    // Continue buttons
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".continue-btn");
        if (!btn) return;
        const next = parseInt(btn.dataset.next, 10);
        showStep(next);
    });

    // Picky slider
    const slider = document.getElementById("pickySlider");
    const labels = document.querySelectorAll(".picky-label");
    const pickyValue = document.getElementById("pickyValue");

    function updateSlider() {
        const val = parseInt(slider.value, 10);
        profile.pickyLevel = val;
        labels.forEach((l) => {
            l.classList.toggle("active", parseInt(l.dataset.index, 10) === val);
        });
        pickyValue.textContent = labels[val].textContent;
    }

    slider.addEventListener("input", updateSlider);
    updateSlider();

    // Flavor rating buttons
    document.querySelectorAll(".flavor-card").forEach((card) => {
        card.querySelectorAll(".rate-btn").forEach((btn) => {
            btn.addEventListener("click", function () {
                card.querySelectorAll(".rate-btn").forEach((b) =>
                    b.classList.remove("active")
                );
                btn.classList.add("active");
                const flavor = card.dataset.flavor;
                const value = btn.dataset.value;
                profile.flavors[flavor] = value;
                card.dataset.selected = value;
            });
        });
    });

    // Texture toggles
    document.querySelectorAll(".texture-card").forEach((card) => {
        card.querySelectorAll(".toggle-btn").forEach((btn) => {
            btn.addEventListener("click", function () {
                card.querySelectorAll(".toggle-btn").forEach((b) =>
                    b.classList.remove("active")
                );
                btn.classList.add("active");
                const texture = card.dataset.texture;
                const value = btn.dataset.value;
                profile.textures[texture] = value;
                card.dataset.selected = value;
            });
        });
    });

    // Dealbreaker chips
    document.querySelectorAll(".dealbreaker-chip").forEach((chip) => {
        chip.addEventListener("click", function () {
            chip.classList.toggle("active");
            const item = chip.dataset.item;
            if (chip.classList.contains("active")) {
                if (!profile.dealbreakers.includes(item))
                    profile.dealbreakers.push(item);
            } else {
                profile.dealbreakers = profile.dealbreakers.filter(
                    (d) => d !== item
                );
            }
        });
    });

    // Custom dealbreaker
    document.getElementById("addDealbreaker").addEventListener("click", function () {
        const input = document.getElementById("customDealbreaker");
        const val = input.value.trim();
        if (!val) return;

        const chip = document.createElement("button");
        chip.className = "dealbreaker-chip active";
        chip.dataset.item = val;
        chip.textContent = val;
        profile.dealbreakers.push(val);

        chip.addEventListener("click", function () {
            chip.classList.toggle("active");
            if (chip.classList.contains("active")) {
                profile.dealbreakers.push(val);
            } else {
                profile.dealbreakers = profile.dealbreakers.filter(
                    (d) => d !== val
                );
            }
        });

        document.querySelector(".dealbreaker-grid").appendChild(chip);
        input.value = "";
    });

    // Enter key for custom input
    document
        .getElementById("customDealbreaker")
        .addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("addDealbreaker").click();
            }
        });

    // Free text
    document.getElementById("mealStory").addEventListener("input", function () {
        profile.story = this.value;
    });

    // Build result
    function buildResult() {
        // Flavors
        const flavorsEl = document.getElementById("resultFlavors");
        flavorsEl.innerHTML = "";
        const flavorNames = {
            umami: "Umami",
            sweet: "Sweet",
            salty: "Salty",
            sour: "Sour",
            bitter: "Bitter",
            spicy: "Spicy",
        };
        for (const [key, label] of Object.entries(flavorNames)) {
            const val = profile.flavors[key];
            if (!val) continue;
            const tag = document.createElement("span");
            tag.className = "result-tag " + val;
            const prefix =
                val === "love" ? "Loves" : val === "like" ? "Okay with" : "Avoids";
            tag.textContent = prefix + ": " + label;
            flavorsEl.appendChild(tag);
        }

        // Textures
        const texturesEl = document.getElementById("resultTextures");
        texturesEl.innerHTML = "";
        const textureNames = {
            crunchy: "Crunchy",
            creamy: "Creamy",
            chewy: "Chewy",
            slimy: "Slimy",
            mushy: "Mushy",
            crispy: "Crispy",
        };
        for (const [key, label] of Object.entries(textureNames)) {
            const val = profile.textures[key];
            if (!val) continue;
            const tag = document.createElement("span");
            tag.className =
                "result-tag " + (val === "yes" ? "texture-yes" : "texture-no");
            tag.textContent = (val === "yes" ? "Likes" : "Avoids") + ": " + label;
            texturesEl.appendChild(tag);
        }

        // Dealbreakers
        const dbEl = document.getElementById("resultDealbreakers");
        dbEl.innerHTML = "";
        if (profile.dealbreakers.length === 0) {
            dbEl.innerHTML =
                '<span class="result-tag like">No absolute dealbreakers</span>';
        } else {
            profile.dealbreakers.forEach((item) => {
                const tag = document.createElement("span");
                tag.className = "result-tag dealbreaker";
                tag.textContent = item;
                dbEl.appendChild(tag);
            });
        }
    }

    // Init
    updateProgress();
})();
