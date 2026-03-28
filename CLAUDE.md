# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Site

This is a static website with no build system. Serve it with any HTTP server:

```bash
python -m http.server 8000
# or
npx serve
```

Open at `http://localhost:8000`. There are no install steps, build steps, or tests.

## Architecture

Four files, no dependencies:

| File         | Purpose                                                       |
| ------------ | ------------------------------------------------------------- |
| `index.html` | Single HTML document (~405 lines) with all sections           |
| `styles.css` | All styling (~1343 lines), loaded first                       |
| `aurora.js`  | Canvas aurora background animation, loaded before `script.js` |
| `script.js`  | All page interactions and DOM logic (~232 lines)              |

### Sections

The page has four anchor-linked sections: `#about`, `#work`, `#resume`, `#contact`. Navigation active states are driven by `IntersectionObserver` in `script.js`.

### Design Token System (`styles.css` `:root`, lines 32–89)

All visual properties use CSS custom properties. Key groups:

- **Glass levels**: `--glass-subtle` → `--glass-heavy` (increasing opacity for elevation)
- **Text hierarchy**: `--text-primary` / `--text-secondary` / `--text-tertiary`
- **Spacing scale**: `--space-xs` through `--space-3xl`
- **Typography**: Inter (body), Instrument Serif (italic accents — hero name, project names, modal titles)
- **Easing**: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`

Always use these tokens rather than hardcoded values.

### Scroll Animations

Elements with `[data-animate]` get a `.visible` class when 15% in viewport (via `IntersectionObserver`). Stagger timing is controlled by the `data-animate-delay` attribute.

### Project Modal

Projects are defined as a hardcoded array at the top of `script.js`. `openProject(index)` populates and shows the modal; `closeModal()` hides it. The modal supports fullscreen toggle and keyboard (Escape) close.

### Aurora Background (`aurora.js`)

Six color blobs rendered on a fixed full-viewport `<canvas>` using radial gradients and `screen` blend mode. Blob positions animate via `Math.sin`/`Math.cos`. The canvas resizes on `window.resize`.

### Responsive Breakpoints

- `≤1024px` — tablet: project rows restructure, resume stacks
- `≤768px` — mobile: hamburger nav replaces desktop nav, cards go single-column, modal goes full-width
