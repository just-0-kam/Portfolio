/* 1. Init Lucide icons */
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

/* 2. Custom cursor with lerp-lagged follower ring */
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");
let mx = 0,
  my = 0,
  fx = 0,
  fy = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

(function tick() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + "px";
  follower.style.top = fy + "px";
  requestAnimationFrame(tick);
})();

document.querySelectorAll("a, button, .project-card").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
});

/* 3. Nav scroll state */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

/* 4. Mobile menu toggle */
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

/* 5. Scroll-triggered reveal via IntersectionObserver */
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

document
  .querySelectorAll(".reveal, .reveal-stagger")
  .forEach((el) => obs.observe(el));

/* 6. Project data */
const projects = [
  {
    title: "AllTrails",
    tags: ["Mobile App", "Feature Design"],
    text: "Designing a Group Hike feature for AllTrails to help outdoor enthusiasts connect, coordinate, and explore trails together. The project focused on enabling group coordination, real-time trail sharing, and social features that bring the hiking community closer.",
    type: "Mobile App",
    role: "Product Designer",
    platform: "iOS / Android",
    focus: "Feature Design & UX",
    bg: "repeating-linear-gradient(45deg, #d0d0c8 0px, #d0d0c8 1px, transparent 1px, transparent 40px), #e8e8e3",
    link: "site/projects/alltrails.html",
  },
  {
    title: "Service Hub",
    tags: ["Mobile App", "App Design"],
    text: "End-to-end brand identity for a sustainable fashion start-up. The project encompassed the full design lifecycle from user research and wireframing through to high-fidelity prototypes and brand guidelines.",
    type: "Mobile App",
    role: "Brand & Product Designer",
    platform: "Mobile",
    focus: "App Design & Branding",
    bg: "radial-gradient(circle at 30% 50%, #d0d0c8 0%, transparent 60%), #e8e8e3",
    link: "site/projects/service-hub.html",
  },
  {
    title: "Lights & Camera Magazine",
    tags: ["Content Strategy", "Marketing"],
    text: "A Vancouver film industry magazine connecting emerging talent with jobs, reviews, and curated content. The project involved editorial strategy, visual identity, layout design, and building a content pipeline for the local film community.",
    type: "Magazine / Editorial",
    role: "Content Strategist & Designer",
    platform: "Print & Digital",
    focus: "Content Strategy & Marketing",
    bg: "repeating-linear-gradient(0deg, #d0d0c8 0px, #d0d0c8 1px, transparent 1px, transparent 24px), #e8e8e3",
    link: "site/projects/lights-camera.html",
  },
  {
    title: "Monocoque Magazine",
    tags: ["Magazine Design", "Branding"],
    text: "An independent Formula 1 magazine built from scratch, covering audience research, editorial direction, and full art direction. The project spanned naming, visual identity, typographic systems, and a complete editorial framework.",
    type: "Magazine / Publication",
    role: "Art Director & Designer",
    platform: "Print",
    focus: "Magazine Design & Branding",
    bg: "repeating-linear-gradient(90deg, #d0d0c8 0px, #d0d0c8 1px, transparent 1px, transparent 32px), repeating-linear-gradient(0deg, #d0d0c8 0px, #d0d0c8 1px, transparent 1px, transparent 32px), #e8e8e3",
    link: "site/projects/monocoque.html",
  },
];

/* 7. Modal open/close */
function openModal(i) {
  const p = projects[i];
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalText").textContent = p.text;
  document.getElementById("modalType").textContent = p.type;
  document.getElementById("modalRole").textContent = p.role;
  document.getElementById("modalPlatform").textContent = p.platform;
  document.getElementById("modalFocus").textContent = p.focus;
  document.getElementById("modalImage").style.background = p.bg;
  document.getElementById("modalTags").innerHTML = p.tags
    .map((t) => '<span class="tag">' + t + "</span>")
    .join("");
  document.getElementById("modalCta").innerHTML =
    '<a href="' +
    p.link +
    '" class="btn-primary">View Full Case Study <i data-lucide="arrow-up-right" style="width:12px;height:12px;"></i></a>';
  document.getElementById("modalBackdrop").classList.add("open");
  document.body.style.overflow = "hidden";
  lucide.createIcons();
}

function closeModal(e) {
  if (e.target === document.getElementById("modalBackdrop")) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById("modalBackdrop").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalDirect();
});

/* 8. Copy email to clipboard */
document.getElementById("copyEmail").addEventListener("click", function () {
  const email = this.getAttribute("data-email");
  const handle = document.getElementById("emailHandle");
  const icon = this.querySelector("[data-lucide]");
  navigator.clipboard.writeText(email).then(() => {
    handle.textContent = "Copied to clipboard";
    if (icon) {
      icon.setAttribute("data-lucide", "check");
      lucide.createIcons();
    }
    setTimeout(() => {
      handle.textContent = email;
      if (icon) {
        icon.setAttribute("data-lucide", "copy");
        lucide.createIcons();
      }
    }, 2000);
  });
});
