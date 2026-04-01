---
title: "Component: Skills Section"
aliases:
  - skills section
  - skills grid
  - skill search
tags:
  - design-system
  - component
  - skills
date: 2026-03-31
---

# Skills Section (search + show more)

See also: [[About me - UI desine/04-components/skill-card/spec|app-skill-card]] | [[cv-page-flow#Progressive Disclosure — Skills]]

## Purpose

Searchable, collapsible grid of [[About me - UI desine/04-components/skill-card/spec|skill cards]].

## States

| State     | Behaviour                                      |
|-----------|-------------------------------------------------|
| Collapsed | First 18 skills visible (3 rows × 6 cols)      |
| Expanded  | All skills visible                              |
| Filtered  | Only skills matching the search query           |

## Search Input

```html
<div class="relative mb-6">
  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted">...</svg>
  <input type="text"
         placeholder="Search by skill..."
         class="w-full bg-surface-alt border border-border rounded-md
                pl-10 pr-4 py-2 text-sm text-primary font-mono
                placeholder:text-muted
                focus:border-border-accent focus:outline-none
                transition-colors duration-fast" />
</div>
```

- Inline — no overlay
- On input: filters cards in place (no network call)
- Filtered-out cards: `opacity-0 scale-95`, `duration-normal`

## Show More / Show Less

```html
<button class="text-sm text-muted hover:text-accent transition-colors duration-fast
               font-mono cursor-pointer">
  Show more
</button>
```

- On click: grid `max-height` animates via Angular `@expandCollapse` trigger
- New skills fade in with stagger (`20ms` per card)
- See [[keyframes]] and [[cv-page-flow#Progressive Disclosure — Skills]]

## Grid Layout

```html
<div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
  <!-- skill cards -->
</div>
```

> [!note] Mobile
> On mobile the grid switches to `minmax(140px, 1fr)`.
