// main.js — ES module version (React compatible)

// -----------------------------------
// Utility Helpers (exported)
// -----------------------------------
export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
export const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

export const delegate = (root, selector, ev, handler) => {
    on(root, ev, function (e) {
        const target = e.target.closest(selector);
        if (target && root.contains(target)) handler.call(target, e);
    });
};

export const ready = (fn) => {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fn);
    } else {
        fn();
    }
};

export const fadeOut = (el, ms = 400) => {
    if (!el) return;
    el.style.transition = `opacity ${ms}ms`;
    el.style.opacity = 0;
    setTimeout(() => el.remove(), ms);
};

// -----------------------------------
// Exported Init Functions
// -----------------------------------

/** PRELOADER */
export function initPreloader() {
    const preloader = document.querySelector(".preloader");
    if (preloader) fadeOut(preloader, 1000);
}

/** BACKGROUND IMAGES */
export function initBackgrounds() {
    $$(".bg_img").forEach((el) => {
        const bg = el.dataset.background;
        if (bg) el.style.backgroundImage = `url('${bg}')`;
    });
}

/** GRID / SHUFFLE (old isotope) */
export function initGridShuffle() {
    const gridEl = document.querySelector(".grid-area");
    let shuffleInstance = null;

    if (gridEl && window.Shuffle) {
        shuffleInstance = new Shuffle(gridEl, {
            itemSelector: ".grid-item",
        });
    } else if (gridEl) {
        gridEl.querySelectorAll(".grid-item").forEach(i => (i.style.display = ""));
    }

    // Filter buttons
    document.querySelectorAll("ul.filter li").forEach((btn) => {
        btn.addEventListener("click", function () {
            const filterValue = this.getAttribute("data-filter");

            if (shuffleInstance) {
                if (!filterValue || filterValue === "*")
                    shuffleInstance.filter(Shuffle.ALL_ITEMS);
                else shuffleInstance.filter(filterValue);
            } else {
                const items = gridEl.querySelectorAll(".grid-item");
                items.forEach(it => {
                    it.style.display = (!filterValue || filterValue === "*" || it.matches(filterValue)) ? "" : "none";
                });
            }
        });
    });

    // Active class toggling
    document.querySelectorAll("ul.filter").forEach((group) => {
        group.addEventListener("click", (e) => {
            const li = e.target.closest("li");
            if (!li) return;
            group.querySelectorAll(".active").forEach(a => a.classList.remove("active"));
            li.classList.add("active");
        });
    });
}

/** FAQ */
export function initFAQ() {
    document.querySelectorAll(".faq-wrapper .faq-title").forEach((title) => {
        title.addEventListener("click", function () {
            const item = this.closest(".faq-item");
            const content = item.querySelector(".faq-content");

            const isOpen = item.classList.contains("open");

            // Close all siblings
            item.parentElement.querySelectorAll(".faq-item.open").forEach(sib => {
                sib.classList.remove("open");
                const sc = sib.querySelector(".faq-content");
                if (sc) sc.style.display = "none";
            });

            if (isOpen) {
                item.classList.remove("open");
                if (content) content.style.display = "none";
            } else {
                item.classList.add("open");
                if (content) content.style.display = "block";
            }
        });
    });
}

/** MENU / MOBILE MENU */
export function initMenu() {
    const headerBar = document.querySelector(".header-bar");
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay");

    if (headerBar) {
        headerBar.addEventListener("click", () => {
            menu?.classList.toggle("active");
            headerBar.classList.toggle("active");
            overlay?.classList.toggle("active");
        });
    }

    overlay?.addEventListener("click", () => {
        menu?.classList.remove("active");
        headerBar?.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Add class for submenu
    document.querySelectorAll("ul>li>.submenu").forEach((el) => {
        el.parentElement.classList.add("menu-item-has-children");
    });

    // Mobile dropdown toggles
    document.querySelectorAll(".menu li a").forEach(a => {
        a.addEventListener("click", function (e) {
            const li = this.parentElement;
            const sub = li.querySelector("ul");
            if (!sub) return;

            e.preventDefault();

            const open = li.classList.contains("open");

            li.parentElement.querySelectorAll(":scope > li.open").forEach(sib => {
                sib.classList.remove("open");
                sib.querySelector("ul")?.style?.setProperty("display", "none");
            });

            li.classList.toggle("open", !open);
            sub.style.display = open ? "none" : "block";
        });
    });
}

/** SCROLL TO TOP */
export function initScrollToTop() {
    const btn = document.querySelector(".scrollToTop");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY < 500) btn.classList.remove("active");
        else btn.classList.add("active");
    });

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/** HEADER STICKY */
export function initStickyHeader() {
    const headerOne = document.querySelector(".header-section");
    if (!headerOne) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY < 1) headerOne.classList.remove("header-active");
        else headerOne.classList.add("header-active");
    });
}

/** TABS */
export function initTabs() {
    document.querySelectorAll(".tab ul.tab-menu").forEach(menu => {
        menu.addEventListener("click", function (e) {
            const li = e.target.closest("li");
            if (!li) return;

            const tab = this.closest(".tab");
            const index = Array.from(li.parentElement.children).indexOf(li);

            tab.querySelectorAll("li").forEach(x => x.classList.remove("active"));
            li.classList.add("active");

            const items = tab.querySelectorAll(".tab-area .tab-item");
            items.forEach((item, idx) =>
                item.style.display = idx === index ? "block" : "none"
            );

            e.preventDefault();
        });
    });
}

/** ODOMETER */
export function initOdometer() {
    const odometers = document.querySelectorAll(".odometer");

    const showFinal = (el) => {
        const final = el.getAttribute("data-odometer-final");
        if (final) el.textContent = final;
    };

    if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver((entries, ob) => {
            entries.forEach(ent => {
                if (ent.isIntersecting) {
                    showFinal(ent.target);
                    ob.unobserve(ent.target);
                }
            });
        });

        odometers.forEach(o => obs.observe(o));
    } else {
        odometers.forEach(showFinal);
    }
}

/** SEAT BOOKING */
export function initSeatBooking() {
    document.querySelectorAll(".seat-free img").forEach(img => {
        let booked = false;
        img.addEventListener("click", () => {
            booked = !booked;
            img.src = booked
                ? "./assets/images/movie/seat01-booked.png"
                : "./assets/images/movie/seat01-free.png";
        });
    });
}

/** CART BUTTONS */
export function initCartButtons() {
    document.querySelectorAll(".cart-plus-minus").forEach(wrapper => {
        wrapper.insertAdjacentHTML("afterbegin", '<div class="dec qtybutton">-</div>');
        wrapper.insertAdjacentHTML("beforeend", '<div class="inc qtybutton">+</div>');

        delegate(wrapper, ".qtybutton", "click", function () {
            const input = wrapper.querySelector("input");
            let oldVal = parseFloat(input.value || 0);
            let newVal = this.textContent.includes("+") ? oldVal + 1 : Math.max(1, oldVal - 1);
            input.value = newVal;
            input.dispatchEvent(new Event("change", { bubbles: true }));
        });
    });
}

/** COUNTDOWN */
export function initCountdown() {
    $$(".countdown").forEach(cd => {
        const dateStr = cd.dataset.date;
        if (!dateStr) return;

        const target = new Date(dateStr).getTime();
        function tick() {
            const now = Date.now();
            let remaining = target - now;

            if (remaining <= 0) return;

            const days = Math.floor(remaining / 86400000);
            const hours = Math.floor((remaining / 3600000) % 24);
            const mins = Math.floor((remaining / 60000) % 60);
            const secs = Math.floor((remaining / 1000) % 60);

            const d = cd.querySelector(".days");
            if (d) d.textContent = days;

            const h = cd.querySelector(".hours");
            if (h) h.textContent = hours;

            const m = cd.querySelector(".minutes");
            if (m) m.textContent = mins;

            const s = cd.querySelector(".seconds");
            if (s) s.textContent = secs;
        }
        tick();
        setInterval(tick, 1000);
    });
}

/** MAIN FUNCTION — calls everything */
export function initPageScripts() {
    // ON LOAD
    window.addEventListener("load", () => {
        initPreloader();
        initBackgrounds();
        initGridShuffle();
    });

    // DOM READY
    ready(() => {
        initMenu();
        initFAQ();
        initScrollToTop();
        initStickyHeader();
        initTabs();
        initOdometer();
        initSeatBooking();
        initCartButtons();
        initCountdown();
    });
}