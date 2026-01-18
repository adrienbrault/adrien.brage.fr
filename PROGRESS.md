# Implementation Progress

This file tracks the implementation status of adrien.brage.fr.

**Last Updated:** 2026-01-18

---

## Phase 1: Foundation (MVP)

Goal: Ship something live with proper structure

### Project Setup
- [x] Create CLAUDE.md with project conventions
- [x] Create PROGRESS.md for tracking
- [ ] Initialize Astro project with bun
- [ ] Configure TypeScript (strict, no .js)
- [ ] Set up Tailwind CSS with dark mode
- [ ] Add Astro integrations (MDX, React, Sitemap, RSS)

### Core Infrastructure
- [ ] Create BaseLayout with dark mode (no-flash script)
- [ ] Create BaseHead component (SEO/OG tags)
- [ ] Create Header component (navigation)
- [ ] Create Footer component
- [ ] Create ThemeToggle component

### Content Collections
- [ ] Define blog collection schema
- [ ] Define projects collection schema
- [ ] Create sample blog post for testing

### Pages
- [ ] Home page (intro, recent posts placeholder)
- [ ] About page
- [ ] Blog listing page
- [ ] Blog post page ([slug].astro)
- [ ] Privacy page
- [ ] 404 page

### SEO & Feeds
- [ ] JSON-LD structured data
- [ ] RSS feed (/rss.xml)
- [ ] Sitemap generation
- [ ] robots.txt

### Security
- [ ] _headers file (security headers)

### Testing & Verification
- [ ] Build completes without errors
- [ ] Type checking passes
- [ ] Dark mode works without flash
- [ ] All pages render correctly
- [ ] RSS feed is valid

---

## Phase 2: Content Infrastructure

Goal: Easy to add content

### Photo Infrastructure
- [ ] Set up R2 bucket structure (documented)
- [ ] Create photo data model (src/lib/photos.ts)
- [ ] Build photo gallery page
- [ ] Add lightbox component (React)

### Additional Pages
- [ ] Projects page with ProjectCard
- [ ] /uses page
- [ ] /now page

### Components
- [ ] PostCard component
- [ ] ProjectCard component
- [ ] PhotoGrid component

---

## Phase 3: Polish

Goal: Production quality

### Design
- [ ] Refine typography and spacing
- [ ] Add micro-interactions (respect prefers-reduced-motion)
- [ ] Mobile responsiveness check

### Accessibility
- [ ] Keyboard navigation complete
- [ ] Focus states visible
- [ ] Color contrast passes WCAG AA
- [ ] Skip-to-content link

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

**Working on:** Project initialization and Astro setup

**Blockers:** None

**Notes:**
- Using bun as package manager
- TypeScript only (no .js files)
- Cloudflare Pages deployment will be done manually at the end

---

## Commit Log

Track significant commits here for reference:

| Date | Commit | Description |
|------|--------|-------------|
| 2026-01-18 | (pending) | Initial project setup with CLAUDE.md |
