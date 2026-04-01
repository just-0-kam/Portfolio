/* ================================================================
   PROJECT-SCRIPT.JS
   Shared JavaScript for all project case study pages.
   - Nav scroll state
   - Mobile menu toggle
   - Scroll reveal via IntersectionObserver
================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* 1. Nav scroll state */
  const navbar = document.getElementById("projNav");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    });
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }

  /* 2. Mobile menu toggle */
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
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
  }

  /* 3. Scroll-triggered reveal via IntersectionObserver */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
    revealObs.observe(el);
  });
});
