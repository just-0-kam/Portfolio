/**
 * aurora.js
 * ─────────────────────────────────────────────────────────────────
 * Animated Aurora Background  —  HTML5 Canvas, no libraries needed
 *
 * HOW IT WORKS (beginner-friendly explanation):
 *
 *   1. A <canvas> element sits behind all page content (z-index: -1).
 *
 *   2. We define several large "blobs" — each blob is just a circle
 *      drawn with a radial gradient (bright in the centre, fading to
 *      completely transparent at the edges).
 *
 *   3. Every frame (~60× per second) we move each blob slightly using
 *      Math.sin() and Math.cos(), which produce smooth wave-like paths.
 *      This makes the colours feel alive and flowing.
 *
 *   4. We paint all the blobs using the "screen" blend mode.
 *      In screen mode, colours ADD together like projector lights on
 *      a wall — two overlapping teal + violet blobs make a bright
 *      cyan-purple, exactly like a real aurora borealis.
 *
 * ─────────────────────────────────────────────────────────────────
 */

/* ════════════════════════════════════════════════════════════════
   SECTION 1 — CANVAS SETUP
   Get a reference to the canvas, grab a 2D drawing context,
   and make sure the canvas always fills the whole window.
════════════════════════════════════════════════════════════════ */

const auroraCanvas = document.getElementById("aurora-bg");

// '2d' gives us the HTML5 Canvas 2D drawing API
const ctx = auroraCanvas.getContext("2d");

/**
 * resizeCanvas
 * Sets the canvas pixel dimensions to match the browser window.
 * Without this, drawings would be stretched or cropped.
 */
function resizeCanvas() {
  auroraCanvas.width = window.innerWidth;
  auroraCanvas.height = window.innerHeight;
}

// Run once right away, then re-run whenever the window is resized
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ════════════════════════════════════════════════════════════════
   SECTION 2 — BLOB CONFIGURATION
   An array of objects, one per aurora colour blob.
   Think of each blob as a soft glowing light source.
════════════════════════════════════════════════════════════════ */

/**
 * AURORA_BLOBS  —  the six colour blobs that make up the aurora.
 *
 * Each property explained:
 *
 *   xFrac, yFrac  Starting position as a fraction of the screen.
 *                 0.0 = left/top edge,  1.0 = right/bottom edge.
 *                 Example: xFrac 0.75 = 75% across from the left.
 *
 *   r, g, b       Red, Green, Blue colour values (0 – 255).
 *
 *   alpha         How opaque the blob is at its very centre (0 – 1).
 *                 Lower values = more see-through.
 *
 *   radius        The blob's size in pixels. These are intentionally
 *                 very large so colours blend smoothly.
 *
 *   speedX/Y      How fast the blob drifts left–right / up–down.
 *                 Very small numbers keep the movement slow and dreamy.
 *
 *   phase         A time offset (in radians) so each blob starts its
 *                 sine-wave path at a different point — preventing all
 *                 blobs from moving in perfect unison.
 */
const AURORA_BLOBS = [
  // Teal — upper-right quadrant
  {
    xFrac: 0.75,
    yFrac: 0.22,
    r: 13,
    g: 148,
    b: 136,
    alpha: 0.65,
    radius: 580,
    speedX: 0.0003,
    speedY: 0.00018,
    phase: 0.0,
  },
  // Violet — centre-left
  {
    xFrac: 0.2,
    yFrac: 0.45,
    r: 124,
    g: 58,
    b: 237,
    alpha: 0.52,
    radius: 620,
    speedX: 0.00022,
    speedY: 0.0003,
    phase: 1.2,
  },
  // Blue — upper-left
  {
    xFrac: 0.3,
    yFrac: 0.18,
    r: 29,
    g: 78,
    b: 216,
    alpha: 0.48,
    radius: 520,
    speedX: 0.00038,
    speedY: 0.0002,
    phase: 2.4,
  },
  // Emerald — lower-right
  {
    xFrac: 0.82,
    yFrac: 0.72,
    r: 5,
    g: 150,
    b: 105,
    alpha: 0.5,
    radius: 500,
    speedX: 0.00025,
    speedY: 0.00035,
    phase: 3.6,
  },
  // Pink — lower-left (subtle accent, lower alpha)
  {
    xFrac: 0.12,
    yFrac: 0.78,
    r: 219,
    g: 39,
    b: 119,
    alpha: 0.32,
    radius: 440,
    speedX: 0.00018,
    speedY: 0.00025,
    phase: 4.8,
  },
  // Cyan — near centre (acts as a "glue" between other blobs)
  {
    xFrac: 0.52,
    yFrac: 0.5,
    r: 6,
    g: 182,
    b: 212,
    alpha: 0.4,
    radius: 550,
    speedX: 0.00028,
    speedY: 0.00015,
    phase: 0.7,
  },
];

/* ════════════════════════════════════════════════════════════════
   SECTION 3 — DRAWING FUNCTIONS
════════════════════════════════════════════════════════════════ */

/**
 * drawBlob
 * Draws one aurora blob at its current animated position.
 *
 * The position is calculated using sine and cosine functions,
 * which naturally produce smooth, looping curved paths — perfect
 * for the fluid look of an aurora.
 *
 * @param {object} blob  — one entry from AURORA_BLOBS
 * @param {number} time  — time in milliseconds (from requestAnimationFrame)
 */
function drawBlob(blob, time) {
  const W = auroraCanvas.width;
  const H = auroraCanvas.height;

  /*
   * Animated position:
   *   Math.sin() returns a value that cycles smoothly between -1 and +1.
   *   Multiplying by W * 0.28 turns that into a drift of ±28% of screen width.
   *   The blob's base position (xFrac * W) stays roughly where we set it,
   *   but gently floats back and forth around that centre point.
   */
  const x =
    blob.xFrac * W + Math.sin(time * blob.speedX + blob.phase) * W * 0.28;
  const y =
    blob.yFrac * H + Math.cos(time * blob.speedY + blob.phase) * H * 0.22;

  /*
   * Radial gradient:
   *   createRadialGradient(x0, y0, r0,  x1, y1, r1)
   *     — inner circle: same centre, radius 0 (a single point → brightest)
   *     — outer circle: same centre, full blob radius (fades to transparent)
   */
  const grad = ctx.createRadialGradient(x, y, 0, x, y, blob.radius);
  grad.addColorStop(0, `rgba(${blob.r}, ${blob.g}, ${blob.b}, ${blob.alpha})`);
  grad.addColorStop(
    0.45,
    `rgba(${blob.r}, ${blob.g}, ${blob.b}, ${blob.alpha * 0.42})`,
  );
  grad.addColorStop(1, `rgba(${blob.r}, ${blob.g}, ${blob.b}, 0)`);

  ctx.fillStyle = grad;

  /*
   * fillRect covers the ENTIRE canvas with our gradient.
   * Because most of the gradient is transparent (alpha = 0 at the edges),
   * only the glowing blob area is actually visible.
   */
  ctx.fillRect(0, 0, W, H);
}

/* ════════════════════════════════════════════════════════════════
   SECTION 4 — ANIMATION LOOP
   requestAnimationFrame asks the browser to call our function
   before the next screen repaint (~60× per second).
   By calling it again at the end of each frame, we create an
   infinite smooth loop.
════════════════════════════════════════════════════════════════ */

/**
 * animate
 * The main render loop — clears the canvas and redraws everything
 * slightly moved, creating the illusion of motion.
 *
 * @param {number} time  — milliseconds since page load, auto-provided
 *                         by requestAnimationFrame
 */
function animate(time) {
  const W = auroraCanvas.width;
  const H = auroraCanvas.height;

  /* ── Step 1: Paint a solid dark background ─────────────────── */
  ctx.fillStyle = "#080c14"; // very dark navy — also set on <body> as a fallback
  ctx.fillRect(0, 0, W, H);

  /* ── Step 2: Switch to "screen" blend mode ─────────────────── */
  /*
   * In "screen" mode, each blob's colour is ADDED to whatever is
   * already on the canvas, rather than painted over it.
   * This is the same maths as shining two coloured lights at a wall:
   *   teal + violet  →  bright cyan-purple
   *   blue + green   →  bright cyan
   * Result: vivid, luminous aurora colours where blobs overlap.
   */
  ctx.globalCompositeOperation = "screen";

  /* ── Step 3: Draw all blobs ────────────────────────────────── */
  AURORA_BLOBS.forEach((blob) => drawBlob(blob, time));

  /* ── Step 4: Reset blend mode to normal ────────────────────── */
  ctx.globalCompositeOperation = "source-over";

  /* ── Step 5: Schedule the next frame ───────────────────────── */
  requestAnimationFrame(animate);
}

/* Start the loop */
requestAnimationFrame(animate);
