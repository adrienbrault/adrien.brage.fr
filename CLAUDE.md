# CLAUDE.md - Project Instructions for AI Agents

This document provides instructions for AI agents working on this codebase.

## Project Overview

Personal static site for Adrien Brault at `adrien.brage.fr`. Built with Astro, Tailwind CSS, and deployed to Cloudflare Pages.

**Tech Stack:**
- Framework: Astro 5.x (static site generation)
- Styling: Tailwind CSS 4.x via `@tailwindcss/vite` plugin
- Content: Markdown + MDX via Astro Content Collections (glob loader)
- Interactive: React 19 (via @astrojs/react) - only when needed
- Package Manager: **bun** (preferred over npm/yarn/pnpm)
- Language: **TypeScript only** - no .js files allowed

## Commands

```bash
# Development
bun dev              # Start dev server at localhost:4321
bun build            # Build for production (PRIMARY FEEDBACK LOOP)
bun preview          # Preview production build locally

# Utilities
bun run check        # Run Astro type checking (requires @astrojs/check)
```

## Project Structure

```
src/
├── components/      # Reusable Astro/React components
├── content/         # Content files (blog/, projects/)
├── content.config.ts  # Content collections schema (Astro 5 location!)
├── layouts/         # Page layouts (BaseLayout, etc.)
├── pages/           # File-based routing
├── styles/          # Global CSS (global.css with @import "tailwindcss")
└── lib/             # Utility functions and data
public/              # Static assets (favicon, robots.txt, _headers)
scripts/             # Build/utility scripts (if needed)
```

## Astro 5 Specifics

### Content Collections

**IMPORTANT:** Astro 5 uses a new content layer API:
- Config file is `src/content.config.ts` (NOT `src/content/config.ts`)
- Uses `loader: glob()` from `astro/loaders`
- Entry identifier is `id` (NOT `slug`)
- Use `render()` from `astro:content`, not from the entry

```typescript
// src/content.config.ts
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    // ...
  }),
});

export const collections = { blog };
```

### Tailwind CSS 4

**IMPORTANT:** `@astrojs/tailwind` is deprecated. Use the Vite plugin:

```typescript
// astro.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

CSS setup in `src/styles/global.css`:
```css
@import "tailwindcss";

/* Custom theme variables */
@theme {
  --color-bg: #ffffff;
  /* ... */
}
```

## Git Conventions

### Commit Messages

Follow **Conventional Commits** format:

```
<type>(<scope>): <description>

[optional body]
[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring (no feature/fix)
- `perf`: Performance improvement
- `test`: Adding/updating tests
- `chore`: Build, tooling, dependencies
- `content`: Blog posts, page content updates

**Examples:**
```bash
feat(blog): add post layout with prev/next navigation
fix(theme): correct dark mode flash on initial load
chore(deps): update astro to 5.x
content(blog): add post about typed LLM outputs
refactor(components): extract BaseHead from layout
```

### Branching & History

- **Atomic commits**: Each commit should be a single logical change
- **Clean history**: When on a feature branch, use `git rebase` to maintain linear history
- **Commit as you go**: Don't batch unrelated changes into one commit
- **Rebase before PR**: `git rebase main` to incorporate upstream changes cleanly

```bash
# Interactive rebase to clean up commits before merging
git rebase -i main

# Rebase current branch on latest main
git fetch origin main && git rebase origin/main
```

## Code Style

### TypeScript

- **No .js files** - all code must be TypeScript (.ts, .tsx, .astro)
- Extends `astro/tsconfigs/strict`
- Prefer explicit types over `any`
- Use interfaces for object shapes, types for unions/primitives

### Astro Components

- Use `.astro` for static components
- Use React (`.tsx`) only for interactive components requiring client-side state
- Keep components small and focused
- Frontmatter at top, then template

```astro
---
// Frontmatter: imports, props, logic
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!-- Template -->
<div class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>
```

### Tailwind CSS

- Use Tailwind utilities directly in templates
- Use CSS variables for theming: `var(--color-bg)`, `var(--color-text)`
- Dark mode: use `dark:` prefix with class strategy (set on `<html>`)
- Extract repeated patterns to components, not CSS classes

### Content Collections

**Blog frontmatter:**
```yaml
---
title: "Post Title"
description: "SEO description (max 160 chars)"
publishedAt: 2024-01-15
updatedAt: 2024-02-01  # optional
tags: ["llm", "python"]
draft: false
---
```

**Tag normalization:** lowercase, hyphenated. Canonical tags:
- `llm`, `ai`, `python`, `typescript`, `react`, `home-automation`
- `3d-printing`, `photography`, `system-design`, `devtools`

## Testing & Feedback Loops

Since Cloudflare Pages deployment happens only at the end, use these feedback loops:

### 1. Build Verification (PRIMARY)
```bash
bun build            # Must complete without errors
```

### 2. Preview Testing
```bash
bun preview          # Test production build locally at localhost:4321
```

### 3. Type Checking (Optional)
```bash
bun run check        # Astro's built-in type checker
```

### 4. Manual Verification Checklist
Before committing significant changes:
- [ ] `bun build` completes without errors
- [ ] Dark mode toggle works (no flash on load)
- [ ] All links work (no 404s)
- [ ] Images load correctly
- [ ] RSS feed is valid XML
- [ ] Mobile layout looks good

### 5. Accessibility Quick Check
- Tab through the page - all interactive elements focusable
- Check color contrast in both themes
- Verify heading hierarchy (single h1, logical order)

## Progress Tracking

Use `PROGRESS.md` in the repo root to track implementation status. Update it as work progresses.

## File Naming Conventions

- Components: PascalCase (`PostCard.astro`, `ThemeToggle.tsx`)
- Pages: kebab-case or index (`about.astro`, `blog/index.astro`)
- Content: kebab-case (`my-first-post.mdx`)
- Utilities: camelCase (`formatDate.ts`)
- Dynamic routes: `[id].astro` (Astro 5 uses `id`, not `slug`)

## Important Notes

1. **No over-engineering**: Only add features explicitly needed
2. **Content first**: A working blog with one post beats a feature-rich empty site
3. **Minimal dependencies**: Bun has built-in capabilities; avoid adding packages unless truly needed
4. **Privacy-focused**: No tracking except Cloudflare Web Analytics (added post-deploy)
5. **Performance**: Minimize client-side JS; Astro's strength is static HTML
6. **Build is truth**: Always run `bun build` to verify changes work

## Photo Infrastructure

Photos are stored in Cloudflare R2 and served via custom domain.

### R2 Bucket Structure
```
adrienbrault-assets/
├── photos/
│   ├── {collection-slug}/
│   │   ├── full/      # 2000-2500px, 80% quality JPEG
│   │   └── thumb/     # 600px, 70% quality JPEG
├── og/                # Generated OG images
└── misc/              # Other assets
```

### Photo Data Model
```typescript
// src/lib/photos.ts
export const ASSET_BASE = "https://adrien-assets.brage.fr";

export interface Photo {
  filename: string;
  alt: string;
  caption?: string;
}

export interface PhotoCollection {
  slug: string;
  title: string;
  date: string;
  cover: string;
  photos: Photo[];
}
```

### Photo Workflow
1. Export from Lightroom to iCloud folder (full/ and thumb/ sizes)
2. Run sync script: `./scripts/sync-photos.sh`
3. Update `src/lib/photos.ts` with new collection
4. Commit and push

## Deployment

### Cloudflare Pages
- Build command: `bun run build`
- Output directory: `dist`
- Node version: 20.x
- Custom domain: `adrien.brage.fr`

### Environment Variables (if needed)
```
SITE_URL=https://adrien.brage.fr
```

## External Resources

- Site: `adrien.brage.fr`
- Assets CDN: `adrien-assets.brage.fr` (Cloudflare R2)
- GitHub: `adrienbrault`
- Twitter: `@AdrienBrault`
- LinkedIn: `adrienbrault`

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `bun dev` |
| Build site | `bun build` |
| Preview build | `bun preview` |
| Type check | `bun run check` |
| New blog post | Create file in `src/content/blog/` |
| Update progress | Edit `PROGRESS.md` |
