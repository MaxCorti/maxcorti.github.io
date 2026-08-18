# maxcorti.github.io

Personal portfolio site — a space-themed, animated showcase of my GitHub
projects. Pure static HTML/CSS/JS, no build step, deployed straight from the
`main` branch via GitHub Pages.

**Live site:** https://maxcorti.github.io

## What's here

| Path | Purpose |
|---|---|
| `index.html` | Home page — floating orb (profile photo + name), click to enter |
| `projects.html` | Scroll-driven project gallery (3D semicircle arc effect) |
| `project.html` | Project detail template, rendered from `?slug=` |
| `js/projects-data.js` | **The file you edit to add/update projects** |
| `assets/` | Drop `profile.jpg` here (see `assets/README.md`) |
| `css/`, `js/` | Styles and behavior, split per page |

## Editing content

- **Projects:** edit `js/projects-data.js`. Each object in the `PROJECTS`
  array becomes one entry in the scroll gallery and one detail page — no
  other file needs to change.
- **Profile photo:** add `assets/profile.jpg`. Falls back to an "MC"
  initials badge automatically if missing.
- **Name / title / bio:** edit the text directly in `index.html`
  (`.orb__name`, `.orb__title`, `.orb__hint`).
- **Colors / fonts:** CSS custom properties at the top of `css/base.css`.

## Running locally

No build step — just serve the folder statically, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly via `file://` also mostly works, but a local
server avoids any browser quirks with `fetch`/module loading.)

## Deploying

This repo follows the standard GitHub Pages setup for a *user* site:

1. Push to the `main` branch of `maxcorti.github.io`.
2. In the repo's **Settings → Pages**, set **Source** to `Deploy from a
   branch`, branch `main`, folder `/ (root)`.
3. The site publishes at `https://maxcorti.github.io` — no Actions workflow
   needed for this plain HTML/CSS/JS setup.

If a build step (Astro, Vite, etc.) is introduced later, switch **Source**
to `GitHub Actions` and add a Pages workflow — the URL stays the same.

## Security notes

- This repository is **public**. Never commit API keys, tokens, resumes/CVs
  with personal data, or any customer/private information here.
- The project gallery reads only from `js/projects-data.js`, which you
  control — there are no secrets or credentials anywhere in this codebase.
