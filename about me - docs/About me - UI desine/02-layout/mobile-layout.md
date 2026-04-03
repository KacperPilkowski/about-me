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
date: 2026-04-03
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
│  [Get In Touch label]          │
│  [Social links]                │
│  [or divider]                  │
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

  <!-- Language switcher — absolute top-left -->
  <div class="absolute top-4 left-4"><app-language-switcher /></div>

  <!-- Avatar -->
  <img src="/assets/profile-photo-320x320.webp" alt="Kacper Piłkowski"
       class="w-52 h-52 rounded-full ring-2 ring-border shrink-0"
       width="208" height="208" />

  <!-- Name -->
  <h1 class="mt-6 mb-2 text-2xl font-bold font-mono text-primary tracking-wide text-center">
    Kacper Piłkowski
  </h1>

  <!-- Role -->
  <p class="text-lg text-accent tracking-wide text-center mb-8">
    {{ 'sidebar.role' | translate }}
  </p>

  <!-- Get In Touch label -->
  <p class="text-xs text-muted uppercase tracking-widest mt-6 mb-3">
    {{ 'sidebar.get_in_touch' | translate }}
  </p>

  <!-- Social icons -->
  <div class="flex items-center gap-4 mb-3">
    <!-- LinkedIn + GitHub SVGs: w-6 h-6 text-muted hover:text-accent, focus-visible ring -->
  </div>

  <!-- "Or" divider -->
  <p class="text-xs text-muted mb-3">{{ 'sidebar.or' | translate }}</p>

  <!-- CTA -->
  <app-cta-button />

  <!-- Scroll indicator at bottom -->
  <div class="absolute bottom-8 flex flex-col items-center animate-bounce">
    <span class="text-xs text-muted font-mono mb-2">{{ 'scroll.down' | translate }}</span>
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
