# Portfolio Website

Personal portfolio of Rajeev Ranjan Chaurasia — a single-page, typography-driven site with a git-based CMS and a GitHub-powered projects section.

**Live:** [rajeev-chaurasia.vercel.app](https://rajeev-chaurasia.vercel.app)

## Stack

- [Next.js 15](https://nextjs.org) (App Router, React 19, TypeScript)
- [Tailwind CSS](https://tailwindcss.com) with semantic design tokens (dark/light themes)
- [Keystatic](https://keystatic.com) — git-based CMS; content lives as YAML files in `content/`
- [framer-motion](https://www.framer.com/motion/) — scroll-reveal animations (reduced-motion aware)
- [nodemailer](https://nodemailer.com) — contact form email relay

## Local development

```bash
npm install
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Content admin: [http://localhost:3000/keystatic](http://localhost:3000/keystatic) (local mode — edits write directly to `content/` on disk)

If `/keystatic` misbehaves under Turbopack, use the webpack fallback:

```bash
npm run dev:webpack
```

## Content model

All content is edited through the Keystatic admin UI (or directly as YAML in `content/`):

| Source | What it holds |
| --- | --- |
| `content/site.yaml` (singleton) | Name, tagline, bio, email, GitHub/LinkedIn URLs, profile image, resume |
| `content/experience/` | Work experience entries (role, company, dates, bullets) |
| `content/education/` | Education entries (degree, institution, dates, grade, coursework) |
| `content/skills/` | Individual skills grouped by category |
| `content/projects/` | Per-repo project overrides (see below) |

### GitHub projects pipeline

The Projects section is driven by the GitHub API, not just the CMS:

1. **Tag a repo** on GitHub with the `portfolio` topic → it appears on the site automatically (name, description, topics, language, stars, homepage) within ~1 hour (hourly ISR, no redeploy needed).
2. **Enrich it** (optional) with an override in `content/projects/` keyed by the repo name — rich bullet descriptions, a custom title, tech-stack tags, order, featured flag, demo URL.
3. **Standalone entries** — an override whose slug matches no fetched repo still renders (useful for projects hosted in other GitHub accounts/orgs).

If the GitHub API is unavailable, the site falls back to override-derived entries and never crashes.

## Environment variables

None are required for a local build (content is read from the filesystem; the GitHub fetch works unauthenticated). See [.env.example](.env.example) for full documentation.

| Variable | Purpose |
| --- | --- |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | Contact form SMTP transport |
| `CONTACT_RECEIVER_EMAIL` | Inbox receiving contact submissions |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (sitemap, robots, JSON-LD, metadata) |
| `GITHUB_TOKEN` | Optional — fine-grained read-only token to avoid GitHub API rate limits |
| `KEYSTATIC_GITHUB_CLIENT_ID` / `KEYSTATIC_GITHUB_CLIENT_SECRET` / `KEYSTATIC_SECRET` / `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Keystatic GitHub-mode admin (production only) |

## Deploy (Vercel)

1. Push to `main` — Vercel builds and deploys automatically.
2. **Keystatic GitHub mode (one-time):** visit `<production-url>/keystatic` and follow Keystatic's built-in setup flow. It creates a GitHub App scoped to this repo and produces the 4 `KEYSTATIC_*` env vars — add them in the Vercel project settings. After that, editing at `<production-url>/keystatic` commits to `main`, which auto-deploys (~1–2 min).
3. Add the remaining env vars (`SMTP_*`, `CONTACT_RECEIVER_EMAIL`, `NEXT_PUBLIC_SITE_URL`, optionally `GITHUB_TOKEN`).
4. **Resume:** replace the placeholder at `public/files/resume.pdf` with the real resume PDF.
