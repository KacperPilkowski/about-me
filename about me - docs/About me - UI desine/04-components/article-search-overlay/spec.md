---
title: "Component: app-article-search-overlay"
aliases:
  - search overlay
  - article search
  - app-article-search-overlay
tags:
  - design-system
  - component
  - blog
  - search
date: 2026-03-31
source: "[[design-system#5. Component Library]]"
---

# Component: app-article-search-overlay

See also: [[search-overlay-flow]] | [[keyframes#slide-down]] | [[a11y-checklist]]

## Purpose

Full-screen or modal-style search overlay for finding blog articles. Triggered by keyboard shortcut or search icon click.

## Anatomy

```
┌──────────────────────────────────────────────────┐  ← z-overlay, backdrop blur
│                                                  │
│   ┌──────────────────────────────────────────┐  │
│   │  🔍  Search articles...        [Esc ✕]  │  │  ← input, font-mono
│   └──────────────────────────────────────────┘  │
│                                                  │
│   [Result 1 title]              [Category] [Date]│
│   [Result 2 title]              [Category] [Date]│
│   [Result 3 title]              [Category] [Date]│
│   ...                                            │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Tailwind Classes

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-base/85 backdrop-blur-lg z-overlay
            transition-opacity duration-slow">
</div>

<!-- Overlay panel -->
<div class="fixed top-12 left-1/2 -translate-x-1/2
            w-[min(640px,90vw)] bg-surface border border-border-accent
            rounded-md shadow-lg z-overlay
            animate-slide-down">
  <input type="text" autofocus placeholder="Search articles..."
         class="w-full bg-transparent border-b border-border
                px-6 py-4 text-lg text-primary font-mono
                placeholder:text-muted focus:outline-none" />
  <div class="max-h-[60vh] overflow-y-auto p-4">
    <!-- Search results here -->
  </div>
</div>
```

## Trigger

- User clicks the "Search article…" bar in the top-right of the main content area
- Keyboard: `Cmd/Ctrl + K` or `/`

## Open/Close Animation

- **Open:** Backdrop `opacity-0 → opacity-100` over `500ms`, panel `animate-slide-down`
- **Close:** Panel `opacity-100 → opacity-0` + `translateY(-12px)` over `150ms`, backdrop fades over `300ms`
- **Reduced motion:** instant show/hide

## Behaviour

1. Entire page blurs (`backdrop-blur-lg`, `duration-slow`)
2. Centred overlay appears: `animate-slide-down`
3. Input auto-focused
4. Results update as user types (debounced `300ms`)
5. `Escape` or backdrop click dismisses

## Accessibility

- `role="dialog"`, `aria-modal="true"`, focus trap within overlay
- `aria-label="Search articles"`
- Keyboard: `Escape` closes overlay, restores focus to trigger element

## Mobile Adaptation

Overlay goes full-width, `top-4`.

## Angular Tag

```html
<app-article-search-overlay [(open)]="searchOpen" />
```
