---
title: "UX Flow: Article Search Overlay"
aliases:
  - search flow
  - Cmd+K
tags:
  - design-system
  - ux-flow
  - search
  - blog
date: 2026-03-31
source: "[[design-system#7. UX Interaction Flows]]"
---

# UX Flow: Article Search Overlay

See also: [[About me - UI desine/04-components/article-search-overlay/spec|Component spec]] | [[keyframes#slide-down]] | [[a11y-checklist]]

## Trigger

| Method          | Detail                                  |
|-----------------|-----------------------------------------|
| Keyboard        | `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux) or `/` |
| UI              | Search icon in blog page header         |

## Full Flow

```
User clicks "Search article..." bar or presses Cmd+K
  │
  ▼
Page blurs, overlay appears, input focused
  │
  ▼
User types → results update (debounced 300ms)
  │
  ├─ Results found → article cards appear with staggered fade-in
  └─ No results → "No articles found for '...'" message
        │
        ▼
User clicks result → navigates to /blog/:slug (Angular Router)
        OR
User presses Escape → overlay closes
```

## Open State

1. Backdrop: `opacity-0 → opacity-100` over `500ms`
2. Panel: `animate-slide-down`
3. Input auto-focuses
4. Placeholder: `Search articles...` in `font-mono text-muted`

## Search Behavior

- Real-time filtering as user types (debounced `300ms`)
- Searches: article title, tags, excerpt
- Results appear below input, sorted by relevance then recency
- Empty state: `No results for "query"` in `font-mono text-muted`

## Result Item

```
[Article Title]              [Category]  [Date]
```
- Title: `font-mono text-base text-primary`
- Category + Date: `font-mono text-xs text-muted`
- Hover: `bg-surface` highlight on row

## Keyboard Navigation

- `↑` / `↓` arrows move between results
- `Enter` navigates to selected article
- `Esc` closes the overlay

## Close Animation

Panel `opacity-100 → opacity-0` + `translateY(-12px)` over `150ms`, backdrop fades over `300ms`.

**Close triggers:**

- `Esc` key
- Click on backdrop
- Navigating to a result
- Instant if `prefers-reduced-motion` (see [[motion-rules]])

## Accessibility

- Focus trapped inside overlay while open
- `role="dialog"`, `aria-label="Search articles"`
- Results list: `role="listbox"`, each result: `role="option"`
