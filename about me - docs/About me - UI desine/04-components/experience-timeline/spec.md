---
title: "Component: app-experience-timeline"
aliases:
  - experience timeline
  - work history
  - app-experience-timeline
tags:
  - design-system
  - component
  - experience
date: 2026-03-31
---

# Component: app-experience-timeline

See also: [[cv-page-flow#Experience Navigation Flow]] | [[interaction-transitions]] | [[keyframes#@contentSwap (Experience panel)]]

## Purpose

Navigate and display work history entries. Side-by-side layout: a date nav on the left, a detail panel on the right.

## Anatomy

```
┌────────────────────┬──────────────────────────────────┐
│ Timeline nav       │ Detail panel                     │
│                    │                                  │
│ ▌ 2022 June ←sel  │ [Job title at Company]           │
│   2019 November    │ [Description paragraph(s)]       │
│   2017 November    │                                  │
│   2017 July        │                                  │
└────────────────────┴──────────────────────────────────┘
```

## Timeline Nav Item

```html
<!-- Default state -->
<button class="text-sm font-mono text-muted py-1 pl-3 border-l-[3px] border-transparent
               hover:text-accent transition-colors duration-fast">
  2019 November
</button>

<!-- Selected state -->
<button class="text-sm font-mono text-accent py-1 pl-3 border-l-[3px] border-accent">
  2022 June
</button>
```

## Detail Panel

```html
<div class="bg-surface-alt rounded-md p-6 min-h-[200px]">
  <h3 class="text-lg font-bold text-primary font-body">
    Senior Software Developer <span class="text-accent">at Xebia</span>
  </h3>
  <p class="mt-4 text-base text-primary leading-relaxed font-body">
    Description text...
  </p>
</div>
```

## Content Transition

On selection change, content swaps with a fade animation:

```
Phase 1 (0 → 150ms):    Current content fades out (opacity 1 → 0)
Phase 2 (150ms → ?):    Panel height animates if content height differs (ease-spring)
Phase 3 (150ms → 300ms): New content fades in (opacity 0 → 1)
```

Panel `min-h-[200px]`; height animates via Angular `@contentSwap` trigger. See [[keyframes#@contentSwap (Experience panel)]].

## States

| State       | Behaviour                                    |
|-------------|----------------------------------------------|
| Default     | First entry selected                         |
| Nav hover   | `text-accent` (150ms)                        |
| Nav selected| `border-l-[3px] border-accent text-accent`   |
| Entry hover | Subtle background highlight on the entry     |

## Accessibility

- `role="listbox"` on date list
- `aria-selected` on active item
- `aria-live="polite"` on detail panel

## Mobile Adaptation

Stack vertically: dates above, detail below (no side-by-side).

## Angular Tag

```html
<app-experience-timeline [items]="experience" />
```
