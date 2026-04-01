/* 1. Nav scroll state */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

/* 2. Mobile menu toggle */
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  mobileNav.classList.toggle("open");
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("open");
    mobileNav.classList.remove("open");
  });
});

/* 3. Scroll-triggered reveal via IntersectionObserver */
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);

document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

/* 4. Copy email to clipboard */
document.getElementById("copyEmail").addEventListener("click", function () {
  const email = this.getAttribute("data-email");
  const handle = document.getElementById("emailHandle");
  navigator.clipboard.writeText(email).then(() => {
    const original = handle.textContent;
    handle.textContent = "Copied to clipboard";
    setTimeout(() => {
      handle.textContent = original;
    }, 2000);
  });
});
