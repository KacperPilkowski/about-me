---
title: "Component: app-blog-card"
aliases:
  - blog card
  - article card
  - app-blog-card
tags:
  - design-system
  - component
  - blog
date: 2026-03-31
source: "[[design-system#5. Component Library]]"
---

# Component: app-blog-card

See also: [[blog-flow]] | [[interaction-transitions]] | [[routing-structure#Blog Routes]]

## Purpose

Card displayed in the blog listing page and in the blog preview section on the CV homepage. Summarises a single article.

## Anatomy

```
┌──────────────────────────────────────────┐
│  [Cover image or placeholder]            │
│                                          │
│  [Tag / Category]      [Date]            │
│  Article Title                           │
│  Short excerpt or description...         │
│                                          │
│  → Read more                             │
└──────────────────────────────────────────┘
```

- Container: `bg-surface rounded-lg border border-border`
- Title: `font-mono text-lg text-primary`
- Excerpt: `font-body text-sm text-muted`
- Date: `font-mono text-xs text-muted`
- Tag/category: accent pill badge
- "Read more" link: `text-accent hover:text-accent-hover font-mono text-sm`

## States

| State  | Visual change                                         |
|--------|-------------------------------------------------------|
| Default| `border-border`                                       |
| Hover  | `border-border-accent`, `shadow-glow-accent`, cursor pointer |

## Tailwind Classes

```html
<article class="bg-surface border border-border rounded-md p-6
                hover:border-border-accent hover:shadow-md hover:-translate-y-0.5
                transition-all duration-fast group">
  <div class="flex justify-between items-center mb-3">
    <span class="text-xs font-mono uppercase text-accent bg-accent-subtle
                 px-2 py-0.5 rounded-sm">Architecture</span>
    <time class="text-xs text-muted font-mono">Mar 2026</time>
  </div>
  <h3 class="text-lg font-bold text-primary font-body leading-tight">
    How I Approach Event-Driven System Design
  </h3>
  <p class="mt-2 text-sm text-muted font-body line-clamp-2">
    Short excerpt of the article content...
  </p>
  <span class="mt-4 inline-flex items-center text-sm text-accent font-mono
               group-hover:translate-x-1 transition-transform duration-fast">
    → Read article
  </span>
</article>
```

## Mobile Adaptation

Single column, full width.

## Angular Tag

```html
<app-blog-card [post]="article" />
```
