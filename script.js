/* ==========================================================
   1. PROJECT DATA
========================================================== */
const projects = [
  {
    title: "FinFlow Banking App",
    tag: "Mobile App · UI/UX",
    role: "Lead Designer",
    year: "2025",
    tools: "Figma, Protopie, After Effects",
    heroColor: "linear-gradient(135deg, #D63484, #FF9BD2)",
    overview:
      "FinFlow is a mobile banking app redesigned from the ground up for Gen-Z users who demand speed, clarity, and visual appeal from their financial tools. The goal was to strip away the intimidation of traditional banking and replace it with an experience that feels as smooth as their favourite social apps.",
    process:
      "The project kicked off with competitive benchmarking across 8 banking apps and 12 user interviews. Affinity mapping revealed three core pain points: confusing navigation, lack of spending insights, and poor onboarding. I ran two rounds of usability testing on mid-fi wireframes before moving into high-fidelity UI.",
    outcome:
      "The redesigned app saw a 40% increase in task-completion rate during testing and received positive feedback from all 6 stakeholder reviews. The design system was handed off with a 120-component Figma library.",
  },
  {
    title: "Evora Brand Identity",
    tag: "Branding · Visual Identity",
    role: "Brand Designer",
    year: "2024",
    tools: "Illustrator, Photoshop, Figma",
    heroColor: "linear-gradient(135deg, #402B3A, #D63484)",
    overview:
      "Evora is a sustainable fashion start-up that needed a complete brand identity — from logo to packaging to a digital styleguide. The brief called for something modern, eco-conscious, and unmistakably premium.",
    process:
      "I started with a brand strategy workshop to define personality, audience, and tone of voice. After 40+ logo sketches and 3 concept directions, we landed on a logotype that combines geometric precision with organic curves. I then built out a full visual system including colour palette, typography, iconography, and packaging mockups.",
    outcome:
      "The brand launch generated 2,000+ social impressions in the first week. The packaging received a local design award nomination and the client reported a 25% increase in perceived brand value among focus groups.",
  },
  {
    title: "NomadStay Web Platform",
    tag: "Web Design · Responsive",
    role: "UI/UX Designer",
    year: "2024",
    tools: "Figma, Webflow, Lottie",
    heroColor: "linear-gradient(135deg, #FF9BD2, #402B3A)",
    overview:
      "NomadStay is a responsive booking platform that connects digital nomads with unique work-friendly stays around the world. The design had to feel adventurous yet trustworthy, and support complex filtering and booking flows on every screen size.",
    process:
      "Research began with a survey of 50 remote workers and heuristic evaluations of Airbnb, Booking.com, and Selina. I mapped out user flows for search, filtering, and checkout, then designed a modular component system in Figma for responsive scaling. Micro-interactions were prototyped with Lottie animations.",
    outcome:
      "The final prototype scored 92/100 on usability testing benchmarks. Development hand-off included a detailed Webflow style-guide and the client launched the MVP within 6 weeks of design completion.",
  },
  {
    title: "TaskPulse Dashboard",
    tag: "Dashboard · SaaS",
    role: "Product Designer",
    year: "2025",
    tools: "Figma, D3.js concepts, FigJam",
    heroColor: "linear-gradient(135deg, #D63484, #402B3A)",
    overview:
      "TaskPulse is an analytics dashboard for a project-management SaaS tool used by mid-size teams. The challenge was to surface dense data in a way that's glanceable for managers and drill-downable for analysts.",
    process:
      "I audited the existing dashboard and catalogued 14 usability issues via cognitive walk-throughs. Card-sorting sessions with 8 users helped restructure the information architecture. I designed three dashboard layouts (compact, standard, expanded) and validated with A/B preference testing.",
    outcome:
      "Compact layout won with 73% preference. The redesign reduced average time-to-insight by 35% based on task-timing tests. Shipped to 4,000+ users in the first release cycle.",
  },
  {
    title: "MindfulMe App",
    tag: "Mobile App · Health & Wellness",
    role: "UI Designer",
    year: "2024",
    tools: "Figma, Principle, Procreate",
    heroColor: "linear-gradient(135deg, #FF9BD2, #D63484)",
    overview:
      "MindfulMe is a meditation and mindfulness app focused on calming micro-interactions and gentle onboarding. The target audience is beginners who find existing meditation apps overwhelming.",
    process:
      'I conducted diary studies with 6 participants over two weeks to understand daily stress triggers. The design philosophy was "less is more" — each screen shows only one action. Custom illustrations and fluid animations were created in Procreate and Principle to reinforce a sense of calm.',
    outcome:
      "Prototype testing showed 90% of first-time users completed a guided session without help. The calming animation set was later adopted by the client's marketing team for social-media content.",
  },
];

/* ==========================================================
   2. MODAL — OPEN, CLOSE, FULLSCREEN
========================================================== */
const modalOverlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalTitle = document.getElementById("modalProjectTitle");

function openProject(i) {
  const p = projects[i];
  modalTitle.textContent = p.title;

  modalBody.innerHTML = `
    <div style="width:100%;aspect-ratio:16/8;border-radius:var(--radius-md);background:${p.heroColor};margin-bottom:var(--space-xl);display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:700;color:rgba(255,255,255,0.15);">${p.title}</div>
    <h2>${p.title}</h2>
    <div class="modal-meta">
      <div class="modal-meta-item"><div class="label">Role</div><div class="value">${p.role}</div></div>
      <div class="modal-meta-item"><div class="label">Year</div><div class="value">${p.year}</div></div>
      <div class="modal-meta-item"><div class="label">Tools</div><div class="value">${p.tools}</div></div>
      <div class="modal-meta-item"><div class="label">Type</div><div class="value">${p.tag}</div></div>
    </div>
    <h3>Overview</h3>
    <p>${p.overview}</p>
    <div class="modal-image-grid">
      <div style="aspect-ratio:4/3;border-radius:var(--radius-sm);background:${p.heroColor};opacity:0.6;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.2);font-weight:600;">Screen 1</div>
      <div style="aspect-ratio:4/3;border-radius:var(--radius-sm);background:${p.heroColor};opacity:0.45;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.2);font-weight:600;">Screen 2</div>
    </div>
    <h3>Design Process</h3>
    <p>${p.process}</p>
    <div style="width:100%;aspect-ratio:16/7;border-radius:var(--radius-sm);background:${p.heroColor};opacity:0.35;margin:var(--space-xl) 0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.2);font-weight:600;font-size:1rem;">Process / Wireframes</div>
    <h3>Outcome</h3>
    <p>${p.outcome}</p>
  `;

  modalBody.scrollTop = 0;
  modal.classList.remove("fullscreen");
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("active");
  modal.classList.remove("fullscreen");
  document.body.style.overflow = "";
}

function toggleFullscreen() {
  modal.classList.toggle("fullscreen");
}

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ==========================================================
   3. TOPNAV — ACTIVE LINK HIGHLIGHT ON SCROLL
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
        const ad = document.querySelector(
          `.topnav-links a[href="#${id}"]`,
        );
        if (ad) ad.classList.add("active");
        mobileLinks.forEach((link) => link.classList.remove("active"));
        const am = document.querySelector(
          `.mobile-nav-panel a[href="#${id}"]`,
        );
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
    copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
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
