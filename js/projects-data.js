/* ============================================================
   EDIT ME — this is the only file you need to touch to update
   your project list. Add / remove / reorder objects in PROJECTS.
   The order here is the scroll order on the projects page.

   Fields:
     slug          — used in the URL: project.html?slug=this-value
     title         — shown in the scrolling gallery + detail page
     tagline       — one line, shown under the title on the detail page
     tech          — array of short tag strings
     links         — { github: "...", demo: "..." } — omit either key to hide it
     summary       — 1-3 short paragraphs (array of strings, one per paragraph)
     contributions — array of bullet strings — what YOU specifically did
     workflow      — array of short step labels for the auto-generated
                     workflow/pipeline diagram, e.g. ["Ingest", "Transform", "Serve"]
     lessons       — array of bullet strings — what you learned / would do differently
   ============================================================ */

const PROJECTS = [
  {
    // TODO: replace every placeholder value below with the real AURA details.
    slug: "aura",
    title: "AURA",
    tagline: "TODO — one-line description of what AURA does and why it exists.",
    tech: ["TODO"], // e.g. ["Python", "React", "PostgreSQL"]
    links: {
      github: "https://github.com/maxcorti/aura", // fix if the repo name/org differs
      demo: "",
    },
    summary: [
      "TODO — what AURA is, who it's for, and the overall approach.",
    ],
    contributions: [
      "TODO — specific things you personally built or owned on AURA.",
    ],
    workflow: ["TODO step 1", "TODO step 2", "TODO step 3"],
    lessons: [
      "TODO — what you learned building AURA.",
    ],
  },
  {
    slug: "project-two",
    title: "Project Two",
    tagline: "One-line description of what this project does and why it exists.",
    tech: ["Python", "PostgreSQL"],
    links: {
      github: "https://github.com/maxcorti/project-two",
      demo: "",
    },
    summary: [
      "Replace this with a short overview of the project.",
    ],
    contributions: [
      "Concrete contribution one.",
      "Concrete contribution two.",
    ],
    workflow: ["Collect data", "Clean & store", "Analyze", "Report"],
    lessons: [
      "Lesson learned one.",
    ],
  },
  {
    slug: "project-three",
    title: "Project Three",
    tagline: "One-line description of what this project does and why it exists.",
    tech: ["Java", "Spring Boot"],
    links: {
      github: "https://github.com/maxcorti/project-three",
      demo: "",
    },
    summary: [
      "Replace this with a short overview of the project.",
    ],
    contributions: [
      "Concrete contribution one.",
    ],
    workflow: ["Request", "Service layer", "Database", "Response"],
    lessons: [
      "Lesson learned one.",
    ],
  },
];
