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
    slug: "aura",
    title: "AURA",
    tagline: "The intelligent copilot for tour guides — AI-assisted route planning, validated with 41 pilot users.",
    tech: [
      "Django",
      "Python",
      "PostgreSQL",
      "PostGIS",
      "pgvector",
      "LangGraph",
      "Gemini",
      "OR-Tools",
      "Celery",
      "Redis",
      "Stripe",
      "Docker",
      "Google Cloud Run",
    ],
    links: {
      github: "https://github.com/G4-AURA/Entrega-S1",
      demo: "",
    },
    summary: [
      "AURA is a daily working tool for professional tour guides, built to eliminate improvisation rather than compete with consumer travel apps. Guides describe the tour they want and AURA proposes a coherent, geographically validated route they can adjust and take out on the job.",
      "The system pairs a Django backend with PostgreSQL, PostGIS and pgvector for geospatial and vector workloads. Route generation runs through a LangGraph pipeline that prompts Gemini for candidate stops, validates them against real map data, and optimises stop ordering with OR-Tools, while Celery and Redis keep the heavy work off the request cycle.",
      "I worked as Product Owner for a 13-person engineering team while contributing as a developer — the largest contributor on the repository across my two accounts, with roughly 170 commits between February and May 2026.",
    ],
    contributions: [
      "Led product delivery through completion for a 13-person engineering team — translating user needs into sprint priorities, acceptance criteria and independently deliverable GitHub issues, and integrating work across the project via the PR/merge process.",
      "Validated the product with 41 pilot users, including 15 tour guides and 26 tourists.",
      "Built the AI-assisted stop generation flow on Gemini: prompt engineering, response normalisation, validation and controlled failure handling with retries and contextual fallback.",
      "Implemented a decoupled geospatial validation layer for AI-generated stops, integrating Mapbox and OpenStreetMap clients with strict accuracy, deduplication and traceability rules.",
      "Redesigned AI generation around an allowlist selector — mood-to-category mapping, Google relevance ranking and city-boundary polygon filtering.",
      "Contributed tests across the LangGraph generation pipeline, covering Gemini quota/failure and fallback behaviour, geographic validation and the OR-Tools optimisation stage.",
      "Created the Django billing module from scratch: subscription and Stripe webhook-event models, the checkout-session and webhook endpoints, and event-synchronisation validation.",
      "Developed the Freemium/Premium tier-enforcement layer — server-side guards, frontend validation and usage tracking across both plans.",
      "Built and debugged the production deployment: Docker/Gunicorn setup, database readiness and migrations on startup, Celery worker startup on Cloud Run with SSL Redis, and Google Cloud Storage media integration.",
    ],
    workflow: [
      "Guide states intent",
      "Gemini proposes stops",
      "Geo-validation (Mapbox/OSM)",
      "OR-Tools optimises order",
      "Route delivered & cached",
    ],
    lessons: [
      "LLM output is a starting point, not a source of truth — the value came from the validation layer around Gemini: bounding candidates to a real city polygon, deduplicating, and verifying every coordinate against map providers before a guide ever saw it.",
      "Plan explicitly for model failure. Quota limits and bad responses are normal operating conditions, so retries, contextual fallback and tests that deliberately exercise the failure paths mattered as much as the happy path.",
      "As Product Owner, slicing work into genuinely independent deliverables was what kept 13 people unblocked — ambiguity in acceptance criteria surfaced later as integration pain during merges.",
      "Deployment is its own engineering problem. Most of the production friction came not from application code but from environment concerns: SSL Redis on Cloud Run, migration ordering at startup, and media storage configuration.",
      "Talking to 41 pilot users, especially the 15 working guides, repeatedly corrected assumptions we had made about what guides actually need day to day.",
    ],
  },
  {
    slug: "whatsapp-sales-automation",
    title: "WhatsApp Sales Automation",
    tagline: "AI drafts the reply, the owner approves it — a human-in-the-loop sales assistant for small businesses.",
    tech: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "pgvector",
      "Gemini",
      "RAG",
      "WhatsApp Cloud API",
      "Telegram Bot API",
      "React",
      "TypeScript",
      "Vite",
      "Redis",
      "Docker",
    ],
    links: {
      // Repository is private — no public link rather than one that 404s.
      github: "",
      demo: "",
    },
    summary: [
      "Small businesses lose sales to slow WhatsApp replies, but handing customer conversations to a bot risks saying something wrong to a real client. This system takes the middle path: AI does the drafting, a human does the approving.",
      "An incoming WhatsApp message is stored, classified by Gemini, and matched against the business's own knowledge base via pgvector semantic search. Gemini drafts a reply grounded in that retrieved content, and the draft goes to the owner on Telegram with Accept / Edit / Reject buttons. Nothing reaches the customer until a person says so.",
      "Built solo over roughly ten days in July 2026 as a working MVP, using a catamaran tour business as the first use case — pricing, departure times, availability, private vs. public tours and booking rules.",
    ],
    contributions: [
      "Designed and built the whole system end to end — backend, data model, integrations and admin frontend.",
      "Built the FastAPI pipeline: WhatsApp webhook handling, message storage, classification orchestration, retrieval, prompt construction, draft generation and approval state.",
      "Implemented RAG over the business knowledge base with Postgres + pgvector, including document chunking and an ingestion script.",
      "Integrated the Telegram Bot API as the approval interface, with per-draft Accept / Edit / Reject actions and a full audit trail of approval events.",
      "Integrated the WhatsApp Cloud API for send and receive, gated so an outbound message can only ever follow an explicit owner decision.",
      "Built a multi-tenant React + Vite + TypeScript admin dashboard with authentication, talking to the admin API through a dev-server proxy instead of opening CORS.",
      "Containerised the stack with Docker Compose (API, Postgres, Redis, frontend, Adminer) and set up Alembic migrations and Redis-backed rate limiting.",
      "Kept a written decision log of every significant design choice with its reasoning and tradeoffs, alongside architecture, schema, security and runbook documentation.",
    ],
    workflow: [
      "WhatsApp message in",
      "Classify (Gemini)",
      "Retrieve knowledge (pgvector)",
      "Draft reply",
      "Owner approves on Telegram",
      "Send to customer",
    ],
    lessons: [
      "Keeping a human in the loop was the design decision that made the product viable. Full automation is easy to build and hard to trust — the approval step is what makes it safe to point at real customers.",
      "Pin model versions rather than `-latest` aliases. Several model names the project was originally scaffolded with had already been retired, which is a failure that only shows up at runtime.",
      "Delete infrastructure you aren't using. n8n was provisioned early for \"simple orchestration\" and never given a single workflow — the whole pipeline lived in FastAPI — so it came out of the compose file rather than lingering as unused surface area.",
      "Design for missing configuration. Features whose API keys aren't set log a warning and degrade instead of crashing, which keeps the system startable while integrations are still being wired up.",
      "Endpoints that cost money need auth even in an MVP. The test endpoints call Gemini on every request, so they sit behind an admin login rather than being left open.",
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
