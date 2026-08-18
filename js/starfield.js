/* Lightweight canvas starfield: twinkling stars + slow parallax drift.
   Attaches to <canvas id="starfield">. Shared across all pages. */
(function () {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height, stars, dpr;
  const STAR_COUNT_PER_PX = 0.00022;

  /* Seeded PRNG (mulberry32). The star layout must be identical on every
     page: the orb flies from the middle of the home page to the corner of
     the projects page, and a reshuffled sky behind it would give the
     navigation away. Same seed + same viewport = same sky. */
  const STAR_SEED = 0x5eed1e;
  function makeRandom(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedStars();
  }

  function seedStars() {
    const count = Math.round(width * height * STAR_COUNT_PER_PX);
    const rand = makeRandom(STAR_SEED);
    stars = new Array(count).fill(0).map(() => ({
      x: rand() * width,
      y: rand() * height,
      r: rand() * 1.3 + 0.2,
      phase: rand() * Math.PI * 2,
      speed: rand() * 0.015 + 0.005,
      drift: rand() * 0.06 + 0.01,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    // Driven by wall-clock time, not a per-page frame counter: a counter
    // restarts at zero on the new document, so every star would jump to a
    // new brightness at the exact moment of navigation. Absolute time
    // makes both pages agree on the sky's state.
    const now = Date.now() / 1000;
    for (const s of stars) {
      const twinkle = 0.5 + 0.5 * Math.sin(now * s.speed * 60 + s.phase);
      const alpha = 0.25 + twinkle * 0.75;
      const y = (s.y + now * s.drift * 3) % height;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
      ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  requestAnimationFrame(draw);
})();
