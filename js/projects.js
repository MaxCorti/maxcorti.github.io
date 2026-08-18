/* Projects gallery: renders one .orbit-item per entry in PROJECTS
   (from projects-data.js) and animates them along a semicircular
   arc — far and small, sweeping through large/near at screen
   center, then far and small again — driven by scroll position. */
(function () {
  const scrollSection = document.getElementById("orbitScroll");
  const stage = document.getElementById("orbitPerspective");
  if (!scrollSection || !stage || typeof PROJECTS === "undefined") return;

  // Arriving from the home page, the orb has just flown into the corner —
  // a browser-restored scroll offset would drop us mid-gallery and break
  // that continuity. Only forced on that entry path, so returning from a
  // project detail page still keeps your place.
  const cameFromHome = /(^|\/)index\.html$|\/$/.test(document.referrer || "");
  if (cameFromHome) {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }

  const count = PROJECTS.length;
  scrollSection.style.setProperty("--orbit-count", String(count));

  // Distance (in px, ~viewport heights) the user must scroll to move
  // one project from "not yet reached" through "centered" to "passed".
  const VH = () => window.innerHeight;
  const SLOT = () => VH() * 0.7;

  // How far along the arc a neighbouring project sits. Above 1.0 the
  // adjacent items stop short of the arc's vanishing ends, so the next
  // project stays faintly visible while you're on the current one.
  const ARC_SPAN = 1.45;

  const LEFT_BIAS_VW = 3; // slight leftward rest position at the far ends of the arc
  const RIGHT_BULGE_VW = 15; // how far right it swings when centered
  const REDUCE_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SNAP_IDLE_MS = 140;

  const items = PROJECTS.map((project, i) => {
    const el = document.createElement("div");
    el.className = "orbit-item";
    el.dataset.index = String(i);
    el.innerHTML = `
      <div class="orbit-item__title">${escapeHtml(project.title)}</div>
      <span class="orbit-item__cta" aria-hidden="true">&gt;</span>
    `;
    el.addEventListener("click", () => {
      if (el.classList.contains("is-active")) {
        window.location.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
      }
    });
    stage.appendChild(el);
    return el;
  });

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  let ticking = false;

  function update() {
    ticking = false;
    const slot = SLOT();
    const sectionTop = scrollSection.getBoundingClientRect().top + window.scrollY;
    const progress = window.scrollY - sectionTop; // px scrolled into this section

    items.forEach((el, i) => {
      const centerAt = (i + 0.5) * slot;
      const delta = progress - centerAt;
      const halfRange = slot * ARC_SPAN;
      const clamped = Math.max(-1, Math.min(1, delta / halfRange));
      const theta = clamped * (Math.PI / 2); // -90deg..90deg in radians

      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      const scale = 0.38 + 0.62 * cosT;
      // Steep falloff keeps the neighbours present but clearly secondary.
      const opacity = Math.max(0, Math.pow(cosT, 1.8));
      const z = -460 * (1 - cosT);
      const y = -sinT * 33; // vh units, applied below
      // Arc bows right: slightly left of center at the far ends,
      // sweeping to its rightmost point exactly when centered.
      const x = -LEFT_BIAS_VW + RIGHT_BULGE_VW * cosT;
      const blur = (1 - cosT) * 5;

      el.style.transform = `translate3d(calc(-50% + ${x}vw), calc(-50% + ${y}vh), ${z.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.filter = opacity < 0.02 ? "none" : `blur(${blur.toFixed(1)}px)`;
      el.style.zIndex = String(1000 - Math.round(Math.abs(z)));

      // Keyed off raw scroll distance so the clickable window stays tight
      // regardless of how wide the arc is spread.
      const isActive = Math.abs(delta) < slot * 0.25;
      el.classList.toggle("is-active", isActive);
      el.style.pointerEvents = opacity < 0.05 ? "none" : isActive ? "auto" : "none";
    });
  }

  let snapTimer = null;
  let snapping = false;

  function trySnap() {
    if (snapping) return;
    const slot = SLOT();
    const totalHeight = count * slot;
    const sectionTop = scrollSection.getBoundingClientRect().top + window.scrollY;
    const progress = window.scrollY - sectionTop;

    // Only snap while inside the gallery itself — leave the intro/outro
    // sections free to scroll through without being pulled back in.
    if (progress < 0 || progress > totalHeight) return;

    const nearestIndex = Math.min(count - 1, Math.max(0, Math.round(progress / slot - 0.5)));
    const target = Math.round(sectionTop + (nearestIndex + 0.5) * slot);

    if (Math.abs(window.scrollY - target) < 2) return;

    snapping = true;
    window.scrollTo({ top: target, behavior: REDUCE_MOTION ? "auto" : "smooth" });

    const clearSnap = () => {
      snapping = false;
      window.removeEventListener("scrollend", clearSnap);
    };
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", clearSnap, { once: true });
    } else {
      setTimeout(clearSnap, 500);
    }
  }

  function scheduleSnap() {
    clearTimeout(snapTimer);
    snapTimer = setTimeout(trySnap, SNAP_IDLE_MS);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
    if (!snapping) scheduleSnap();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
