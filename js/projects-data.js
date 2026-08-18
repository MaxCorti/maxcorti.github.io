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
    slug: "project-one",
    title: "Project One",
    tagline: "One-line description of what this project does and why it exists.",
    tech: ["TypeScript", "React", "Node.js"],
    links: {
      github: "https://github.com/maxcorti/project-one",
      demo: "",
    },
    summary: [
      "Replace this with a short overview of the project: what problem it solves, who it's for, and the overall approach you took.",
      "A second paragraph can cover scale, constraints, or anything that gives context to the diagrams and contributions below.",
    ],
    contributions: [
      "Describe a specific piece you built or owned (e.g. \"designed the REST API and its auth flow\").",
      "Describe another concrete contribution — be specific about your role if this was a team project.",
      "Add as many bullets as needed.",
    ],
    workflow: ["Input", "Processing", "Output"],
    lessons: [
      "What you'd do differently next time, or a specific technical lesson learned.",
      "A second lesson — tools, architecture decisions, or process takeaways.",
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
