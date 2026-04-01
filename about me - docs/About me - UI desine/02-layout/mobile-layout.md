---
title: Mobile Layout
aliases:
  - mobile
  - intro panel
tags:
  - design-system
  - layout
  - mobile
  - responsive
date: 2026-03-31
source: "[[design-system#9. Responsive Behavior]]"
---

# Mobile Layout (< 768px)

Related: [[desktop-layout]] | [[tablet-layout]]

## Key Difference from Desktop/Tablet

The sidebar **is not fixed** on mobile. It becomes a full-screen intro panel that is part of the normal page flow. The main content sits directly below it and the user scrolls down to reach it.

## Structure

```
┌────────────────────────────────┐
│  INTRO PANEL (full screen)     │
│                                │
│  [Language switcher]           │
│  [Avatar]                      │
│  [Name]                        │
│  [Role]                        │
│  [Social links]                │
│  [CTA button]                  │
│                                │
│  [↓ bouncing chevron]          │
└────────────────────────────────┘
          ↕ scroll
┌────────────────────────────────┐
│  MAIN CONTENT                  │
│  [Section: about me_]          │
│  [Section: skills]             │
│  [Section: experience]         │
│  ...                           │
└────────────────────────────────┘
```

## Intro Panel

```html
<!-- Mobile: full-screen intro (visible only < md) -->
<section class="md:hidden min-h-screen flex flex-col items-center justify-center
                bg-base px-8 relative">

  <!-- Language switcher -->
  <div class="absolute top-4 left-4 flex gap-2">...</div>

  <!-- Profile content (same as sidebar) -->
  <img src="..." class="w-36 h-36 rounded-full ring-2 ring-border" />
  <h1 class="mt-6 text-2xl font-bold font-mono text-primary">Kacper Piłkowski</h1>
  <p class="text-sm text-accent tracking-wide">Solution Architect</p>

  <!-- Social + CTA -->
  <div class="mt-6 flex gap-4">...</div>
  <a href="mailto:..." class="mt-4 bg-accent text-inverse rounded-full px-8 py-3 ...">
    Say Hi!
  </a>

  <!-- Scroll indicator at bottom -->
  <div class="absolute bottom-8 flex flex-col items-center animate-bounce">
    <span class="text-xs text-muted font-mono mb-2">scroll down</span>
    <svg class="w-5 h-5 text-muted"><!-- Chevron down icon --></svg>
  </div>
</section>
```

Key behaviours:

- `min-h-screen` fills the entire viewport initially
- Content sits directly below in the normal document flow
- `animate-bounce` chevron hints there's more below
- As the user scrolls, intro slides up naturally — no special JS needed
- Background [[About me - UI desine/04-components/network-background/spec|constellation animation]] also runs behind this panel (with reduced dot count)
- Must respect `prefers-reduced-motion` — disable bounce if set (see [[motion-rules]])

## Mobile Component Adaptations

| Component           | Mobile adaptation                                              |
|---------------------|----------------------------------------------------------------|
| Skills grid         | `grid-cols-[repeat(auto-fill,minmax(140px,1fr))]`             |
| Experience timeline | Stack vertically: dates above, detail below (no side-by-side) |
| Education timeline  | Same structure, narrower padding                               |
| Blog cards          | Single column, full width                                      |
| Article search      | Overlay goes full-width, `top-4`                               |
| Article page        | Full-width prose, no sidebar overlap                           |

## Sidebar Hidden

```html
<aside class="... max-md:hidden">
```

The fixed sidebar is hidden (`max-md:hidden`) on mobile — the intro panel replaces it.
