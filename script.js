// ============================================
// Menu Buddy — Landing Page Scripts
// ============================================

(function () {
    "use strict";

    // Scroll-triggered fade-in animations
    function initScrollAnimations() {
        const selectors = [
            ".user-card",
            ".feature-card",
            ".screen-showcase",
            ".step",
            ".tech-card",
            ".philosophy-item",
            ".roadmap-item",
        ];

        const elements = document.querySelectorAll(selectors.join(","));
        elements.forEach((el) => el.classList.add("fade-in"));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Stagger siblings
                        const parent = entry.target.parentElement;
                        const siblings = Array.from(parent.children).filter((c) =>
                            c.classList.contains("fade-in")
                        );
                        const index = siblings.indexOf(entry.target);
                        const delay = index * 80;

                        setTimeout(() => {
                            entry.target.classList.add("visible");
                        }, delay);

                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        elements.forEach((el) => observer.observe(el));
    }

    // Smooth nav background on scroll
    function initNavScroll() {
        const nav = document.querySelector(".nav");
        if (!nav) return;

        let ticking = false;
        window.addEventListener("scroll", () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 60) {
                        nav.style.borderBottomColor = "rgba(42, 37, 32, 0.8)";
                        nav.style.background = "rgba(12, 11, 9, 0.92)";
                    } else {
                        nav.style.borderBottomColor = "";
                        nav.style.background = "";
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Parallax on hero phone
    function initHeroParallax() {
        const phone = document.querySelector(".hero-phone");
        if (!phone || window.matchMedia("(max-width: 900px)").matches) return;

        let ticking = false;
        window.addEventListener("scroll", () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const y = window.scrollY;
                    phone.style.transform = `translateY(${y * 0.08}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Active nav link on scroll
    function initActiveNav() {
        const links = document.querySelectorAll(".nav-links a");
        const sections = [];

        links.forEach((link) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                const section = document.querySelector(href);
                if (section) sections.push({ link, section });
            }
        });

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const match = sections.find((s) => s.section === entry.target);
                    if (match) {
                        if (entry.isIntersecting) {
                            links.forEach((l) => (l.style.color = ""));
                            match.link.style.color = "#f0ebe3";
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach((s) => observer.observe(s.section));
    }

    // Init
    document.addEventListener("DOMContentLoaded", () => {
        initScrollAnimations();
        initNavScroll();
        initHeroParallax();
        initActiveNav();
    });
})();
