/* Projects gallery: renders one .orbit-item per entry in PROJECTS
   (from projects-data.js) and animates them along a semicircular
   arc — far and small, sweeping through large/near at screen
   center, then far and small again — driven by scroll position. */
(function () {
  const scrollSection = document.getElementById("orbitScroll");
  const stage = document.getElementById("orbitPerspective");
  if (!scrollSection || !stage || typeof PROJECTS === "undefined") return;

  const count = PROJECTS.length;
  scrollSection.style.setProperty("--orbit-count", String(count));

  // Distance (in px, ~viewport heights) the user must scroll to move
  // one project from "not yet reached" through "centered" to "passed".
  const VH = () => window.innerHeight;
  const SLOT = () => VH() * 0.85;

  const items = PROJECTS.map((project, i) => {
    const el = document.createElement("div");
    el.className = "orbit-item";
    el.dataset.index = String(i);
    el.innerHTML = `
      <div class="orbit-item__title">${escapeHtml(project.title)}</div>
      <span class="orbit-item__cta">View project →</span>
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
      const halfRange = slot * 0.62;
      const clamped = Math.max(-1, Math.min(1, delta / halfRange));
      const theta = clamped * (Math.PI / 2); // -90deg..90deg in radians

      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      const scale = 0.38 + 0.62 * cosT;
      const opacity = Math.max(0, Math.pow(cosT, 1.4));
      const z = -460 * (1 - cosT);
      const y = -sinT * 46; // vh units, applied below
      const x = (1 - cosT) * 8; // vw units — bows the arc to one side
      const blur = (1 - cosT) * 5;

      el.style.transform = `translate3d(calc(-50% + ${x}vw), calc(-50% + ${y}vh), ${z.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.filter = opacity < 0.02 ? "none" : `blur(${blur.toFixed(1)}px)`;
      el.style.zIndex = String(1000 - Math.round(Math.abs(z)));

      const isActive = Math.abs(clamped) < 0.16;
      el.classList.toggle("is-active", isActive);
      el.style.pointerEvents = opacity < 0.05 ? "none" : isActive ? "auto" : "none";
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
