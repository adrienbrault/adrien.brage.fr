# Implementation Progress

This file tracks the implementation status of adrien.brage.fr.

**Last Updated:** 2026-01-18

---

## Phase 1: Foundation (MVP)

Goal: Ship something live with proper structure

### Project Setup
- [x] Create CLAUDE.md with project conventions
- [x] Create PROGRESS.md for tracking
- [x] Initialize Astro project with bun
- [x] Configure TypeScript (strict, extends astro/tsconfigs/strict)
- [x] Set up Tailwind CSS v4 with Vite plugin (dark mode via class strategy)
- [x] Add Astro integrations (MDX, React, Sitemap, RSS)

### Core Infrastructure
- [x] Create BaseLayout with dark mode (no-flash inline script)
- [x] Create BaseHead component (SEO/OG tags, Twitter cards)
- [x] Create Header component (navigation with active state)
- [x] Create Footer component (social links, site links)
- [x] Create ThemeToggle component (sun/moon icons, localStorage persistence)

### Content Collections
- [x] Define blog collection schema (src/content.config.ts with glob loader)
- [x] Define projects collection schema
- [x] Create sample blog post for testing

### Pages
- [x] Home page (intro, recent posts)
- [x] About page
- [x] Blog listing page (with tags)
- [x] Blog post page ([id].astro with prev/next navigation)
- [x] Projects page
- [x] Privacy page
- [x] 404 page

### SEO & Feeds
- [x] JSON-LD structured data (WebSite + BlogPosting)
- [x] RSS feed (/rss.xml)
- [x] Sitemap generation (via @astrojs/sitemap)
- [x] robots.txt

### Security
- [x] _headers file (CSP, X-Frame-Options, etc.)

### Testing & Verification
- [x] Build completes without errors (`bun build` passes)
- [ ] Type checking passes (optional: `bun run check`)
- [x] Dark mode works without flash (inline script in head)
- [x] All pages render correctly
- [x] RSS feed is valid

---

## Phase 2: Content Infrastructure

Goal: Easy to add content

### Photo Infrastructure
- [ ] Set up R2 bucket structure (documented)
- [ ] Create photo data model (src/lib/photos.ts)
- [ ] Build photo gallery page
- [ ] Add lightbox component (React)

### Additional Pages
- [x] Projects page with inline project cards
- [ ] /uses page
- [ ] /now page

### Components
- [ ] PostCard component (extracted)
- [ ] ProjectCard component (extracted)
- [ ] PhotoGrid component

---

## Phase 3: Polish

Goal: Production quality

### Design
- [ ] Refine typography and spacing
- [ ] Add micro-interactions (respect prefers-reduced-motion)
- [ ] Mobile responsiveness check

### Accessibility
- [x] Keyboard navigation (focusable elements)
- [x] Focus states visible (:focus-visible)
- [ ] Color contrast passes WCAG AA
- [x] Skip-to-content link

### Performance
- [ ] Lighthouse audit
- [ ] Core Web Vitals check

---

## Phase 4: Future (as needed)

- [ ] Search with Pagefind (when 15+ posts)
- [ ] Comments with Giscus
- [ ] Newsletter signup
- [ ] Automated OG image generation

---

## Current Focus

**Working on:** Phase 1 complete - ready for content and polish

**Blockers:** None

**Notes:**
- Using bun as package manager
- TypeScript only (no .js files)
- Tailwind v4 with Vite plugin (not deprecated @astrojs/tailwind)
- Astro 5 content collections use `glob()` loader and `id` (not `slug`)
- Cloudflare Pages deployment will be done manually at the end

---

## Commit Log

Track significant commits here for reference:

| Date | Commit | Description |
|------|--------|-------------|
| 2026-01-18 | a7fffbd | docs: add CLAUDE.md and PROGRESS.md |
| 2026-01-18 | 8f5be33 | feat: initialize Astro 5 site with complete Phase 1 foundation |
