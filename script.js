/* ==========================================================
   1. HERO NAME — SPLIT-TEXT ANIMATION
========================================================== */
(function initSplitText() {
  const lines = [
    {
      el: document.querySelector(".hero-display .serif-italic"),
      baseDelay: 0.35,
    },
    {
      el: document.querySelector(".hero-display .hero-display-line2"),
      baseDelay: 0.78,
    },
  ];

  lines.forEach(({ el, baseDelay }) => {
    if (!el) return;
    const text = el.textContent;
    el.textContent = "";
    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "split-char";
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.animationDelay = `${baseDelay + i * 0.038}s`;
      el.appendChild(span);
    });
  });
})();

/* ==========================================================
   2. TOPNAV — ACTIVE LINK HIGHLIGHT ON SCROLL
========================================================== */
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".topnav-links a");
const mobileLinks = document.querySelectorAll(".mobile-nav-panel a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => link.classList.remove("active"));
        const ad = document.querySelector(`.topnav-links a[href="#${id}"]`);
        if (ad) ad.classList.add("active");
        mobileLinks.forEach((link) => link.classList.remove("active"));
        const am = document.querySelector(`.mobile-nav-panel a[href="#${id}"]`);
        if (am) am.classList.add("active");
      }
    });
  },
  { threshold: 0.3 },
);

sections.forEach((sec) => sectionObserver.observe(sec));

/* ==========================================================
   4. TOPNAV — DARKEN ON SCROLL
========================================================== */
const topnav = document.getElementById("topnav");
window.addEventListener("scroll", () => {
  topnav.classList.toggle("scrolled", window.scrollY > 40);
});

/* ==========================================================
   5. MOBILE MENU TOGGLE
========================================================== */
const menuToggle = document.getElementById("menuToggle");
const mobilePanel = document.getElementById("mobileNavPanel");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  mobilePanel.classList.toggle("open");
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("open");
    mobilePanel.classList.remove("open");
  });
});

/* ==========================================================
   6. SCROLL-TRIGGERED ANIMATIONS
========================================================== */
const animatedEls = document.querySelectorAll("[data-animate]");
const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        animObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
animatedEls.forEach((el) => animObserver.observe(el));

/* ==========================================================
   7. COPY EMAIL TO CLIPBOARD
========================================================== */
const copyBtn = document.getElementById("copyEmailBtn");
copyBtn.addEventListener("click", () => {
  const email = copyBtn.getAttribute("data-email");
  navigator.clipboard.writeText(email).then(() => {
    copyBtn.classList.add("copied");
    copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied to clipboard`;
    setTimeout(() => {
      copyBtn.classList.remove("copied");
      copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> ${email}`;
    }, 2000);
  });
});

/* ==========================================================
   8. LIVE LOCAL CLOCK
========================================================== */
function updateClock() {
  document.getElementById("localTime").textContent =
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
}
updateClock();
setInterval(updateClock, 1000);
