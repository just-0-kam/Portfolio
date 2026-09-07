/* ================================================================
   PROJECT-SCRIPT.JS
   Shared JavaScript for all project case study pages.
   - Nav scroll state
   - Mobile menu toggle (a11y)
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
    function setMenuOpen(open) {
      menuToggle.classList.toggle("open", open);
      mobileNav.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        const first = mobileNav.querySelector("a");
        if (first) first.focus();
      } else {
        menuToggle.focus();
      }
    }

    menuToggle.addEventListener("click", () => {
      setMenuOpen(!mobileNav.classList.contains("open"));
    });

    document.querySelectorAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("open")) {
        setMenuOpen(false);
      }
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
