/* ================================================================
   PROJECT-SCRIPT.JS
   Shared JavaScript for all project case study pages.
   - Custom cursor with lerp-lagged follower ring
   - Nav scroll state
   - Mobile menu toggle
   - Scroll reveal via IntersectionObserver
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Init Lucide icons */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* 2. Custom cursor with lerp-lagged follower ring */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower) {
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function tick() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(tick);
    })();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }

  /* 3. Nav scroll state */
  const navbar = document.getElementById('projNav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
    /* Ensure correct initial state if page loaded mid-scroll */
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  /* 4. Mobile menu toggle */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav  = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* 5. Scroll-triggered reveal via IntersectionObserver */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    revealObs.observe(el);
  });

});
