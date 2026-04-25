# PRD — homeloop.app

## Phase 1 — Core Homeschool Management ✓
- [x] Parent dashboard with daily task tracking
- [x] Per-child progress view with streaks
- [x] Weekly consistency chart
- [x] Compliance tracking page
- [x] Transcript generation (PDF export)

## Phase 2 — Launch & Discoverability

### 2a — Hosting & Deployment
- [ ] Publish site on homeloop.app domain via Cloudflare Workers (Static Assets)
- [ ] Connect GitHub repo to Cloudflare Workers Builds for CI/CD
- [x] `wrangler.jsonc` — Workers Static Assets config with SPA fallback (`not_found_handling: single-page-application`)
- [x] `public/_headers` — cache + security headers (immutable for `/assets/*`, no-cache for HTML, security headers site-wide)
- [x] Build: `pnpm build` → `dist/` served by Workers Static Assets
- [x] Vite ≥ 6 (required by Wrangler's Vite integration)

### 2b — Analytics (day-one priority — need data from launch)
- [x] `src/analytics/ga.ts` — GA4 event helper module
- [x] `VITE_GA_ID` env var; gtag script injected in `index.html`
- [x] Custom events: `task_added`, `task_completed`, `transcript_exported`, `compliance_viewed`, `child_viewed`
- [x] Dev-mode: log GA events to console instead of sending
- [ ] Wire `trackTask*` calls into Dashboard.jsx and ChildView.jsx
- [ ] Wire `trackTranscriptExported` into Transcript.jsx
- [ ] Wire `trackComplianceViewed` into Compliance.jsx
- [ ] Add `VITE_GA_ID` to Cloudflare environment variables (Workers project settings)

### 2c — SEO & Crawlability
- [ ] Submit to Google Search Console (GSC)
- [ ] `robots.txt` — allow all public routes, disallow `/dashboard`, `/child/*`, `/transcript`
- [ ] `sitemap.xml` — landing + public pages only; submit to GSC
- [ ] Canonical URL `<link>` on all pages
- [ ] JSON-LD on landing page: `WebApplication`, `Organization`, `WebSite` with `SearchAction`, `FAQPage`
- [ ] Real `public/og-image.png` (1200×630) to replace current placeholder
- [ ] `public/llms.txt` — AI agent discoverability (pattern from civictools.app)

### 2d — Legal Pages
- [ ] `/privacy` — Privacy Policy page
- [ ] `/terms` — Terms of Service page
- [ ] `/about` — About / credibility page
- [ ] Footer component with links to all three

### 2e — SEO Audit & Testing
- [ ] `pnpm test:seo` — vitest suite: checks meta tags, canonical, OG, JSON-LD presence (pattern from civictools)
- [ ] `pnpm test:seo:build` — same but forces a fresh build first
- [ ] Lighthouse CI script: automated perf/SEO audit on every build

## Phase 3 — Data Persistence & Auth
- [ ] Replace localStorage with a real backend (Supabase or Go+SQLite)
- [ ] Parent auth (login / signup)
- [ ] Per-family data isolation
- [ ] Data export (JSON backup / restore)

## Phase 4 — Product Depth
- [ ] Curriculum planning view (weekly/monthly schedule builder)
- [ ] Resource library (attach materials to tasks)
- [ ] Multi-child subject hour tracking (auto-accumulates into transcript)
- [ ] Compliance report export per state (CA, TX, FL templates)
- [ ] State-specific homeschool requirement lookup (SEO pages, civictools pattern)
- [ ] `Disclaimer` component on compliance + transcript pages (legal coverage)
- [ ] PWA / installable on mobile (service worker + manifest)
