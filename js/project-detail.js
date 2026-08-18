/* Renders a single project's detail page from projects-data.js,
   selected via the ?slug= query param. */
(function () {
  const root = document.getElementById("detail");
  if (!root || typeof PROJECTS === "undefined") return;

  const slug = new URLSearchParams(window.location.search).get("slug");
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    root.innerHTML = `
      <div class="detail__not-found">
        <h1>Project not found</h1>
        <p><a class="detail__link" href="projects.html">← Back to all projects</a></p>
      </div>
    `;
    document.title = "Project not found — Max Corti";
    return;
  }

  document.title = `${project.title} — Max Corti`;

  root.innerHTML = `
    <header>
      <h1 class="detail__title">${esc(project.title)}</h1>
      <p class="detail__tagline">${esc(project.tagline || "")}</p>
      ${renderTags(project.tech)}
      ${renderLinks(project.links)}
    </header>

    ${renderTextSection("Project Summary", project.summary)}
    ${renderListSection("My Contributions", project.contributions)}
    ${renderWorkflowSection("How It Works", project.workflow)}
    ${renderListSection("Lessons Learned", project.lessons)}
  `;

  function esc(str) {
    const d = document.createElement("div");
    d.textContent = str || "";
    return d.innerHTML;
  }

  function renderTags(tech) {
    if (!tech || !tech.length) return "";
    return `<div class="detail__tags">${tech.map((t) => `<span class="detail__tag">${esc(t)}</span>`).join("")}</div>`;
  }

  function renderLinks(links) {
    if (!links) return "";
    const parts = [];
    if (links.github) parts.push(`<a class="detail__link" href="${esc(links.github)}" target="_blank" rel="noopener">GitHub ↗</a>`);
    if (links.demo) parts.push(`<a class="detail__link" href="${esc(links.demo)}" target="_blank" rel="noopener">Live Demo ↗</a>`);
    if (!parts.length) return "";
    return `<div class="detail__links">${parts.join("")}</div>`;
  }

  function renderTextSection(heading, paragraphs) {
    if (!paragraphs || !paragraphs.length) return "";
    return `
      <section class="detail__section">
        <h2>${esc(heading)}</h2>
        ${paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
      </section>
    `;
  }

  function renderListSection(heading, items) {
    if (!items || !items.length) return "";
    return `
      <section class="detail__section">
        <h2>${esc(heading)}</h2>
        <ul class="detail__list">
          ${items.map((i) => `<li>${esc(i)}</li>`).join("")}
        </ul>
      </section>
    `;
  }

  function renderWorkflowSection(heading, steps) {
    if (!steps || !steps.length) return "";
    const stepEls = steps
      .map(
        (label, i) => `
        <div class="flow-step">
          <div class="flow-step__num">${i + 1}</div>
          <div class="flow-step__label">${esc(label)}</div>
        </div>
        ${i < steps.length - 1 ? '<div class="flow-arrow">→</div>' : ""}
      `
      )
      .join("");
    return `
      <section class="detail__section">
        <h2>${esc(heading)}</h2>
        <div class="flow-diagram">${stepEls}</div>
      </section>
    `;
  }
})();
