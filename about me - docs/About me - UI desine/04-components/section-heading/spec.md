---
title: "Component: app-section-heading"
aliases:
  - section heading
  - app-section-heading
tags:
  - design-system
  - component
  - layout
date: 2026-03-31
source: "[[design-system#5. Component Library]]"
---

# Component: app-section-heading

See also: [[keyframes#blink]] | [[font-usage-rules]] | [[motion-rules]]

## Purpose

Consistent heading for each content section (Skills, Experience, Education, etc.) with a terminal-aesthetic style.

## Anatomy

```
> skills_
─────────────────
```

- Prefix: `>` in `text-accent`
- Label: section name in `font-mono`
- Cursor: blinking `_` via `animate-blink`
- Divider: `border-b border-border` below the heading

## Tailwind Classes

```html
<div class="mb-8">
  <h2 class="font-mono text-xl text-primary flex items-baseline gap-1">
    <span class="text-accent">></span>
    {{ title }}
    <span class="animate-blink text-accent">_</span>
  </h2>
  <div class="border-b border-border mt-2"></div>
</div>
```

## States

- Static — no interactive states
- Blinking cursor pauses when `prefers-reduced-motion` is set

## Inputs

| Prop  | Type   | Description                |
|-------|--------|----------------------------|
| title | string | Section label (translated) |

## Angular Tag

```
<app-section-heading title="skills" />
```
