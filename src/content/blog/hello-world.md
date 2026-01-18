---
title: "Hello World"
description: "Welcome to my new blog. A fresh start for technical writing about LLMs, system design, and more."
publishedAt: 2026-01-18
tags: ["meta"]
draft: false
---

Welcome to my new blog! This is a fresh start for my technical writing.

## What to Expect

I'll be writing about:

- **LLMs and AI tooling** - Practical applications, typed outputs, structured generation
- **System design** - Architecture patterns, trade-offs, and lessons learned
- **Python and TypeScript** - The languages I use most
- **Home automation** - Building a smart home that actually works
- **3D printing** - Designs, failures, and successes

## Why a Personal Site?

I wanted a space that's truly mine. Social media platforms come and go, but a personal domain is forever (or at least as long as I pay the registrar).

This site is built with [Astro](https://astro.build), styled with Tailwind CSS, and hosted on Cloudflare Pages. It's fast, minimal, and focused on content.

## Code Example

Here's a quick TypeScript snippet to show off syntax highlighting:

```typescript
interface BlogPost {
  title: string;
  description: string;
  publishedAt: Date;
  tags: string[];
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
```

Looking forward to sharing more here. Stay tuned!
