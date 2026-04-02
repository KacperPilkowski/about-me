---
title: Decisions Log
aliases:
  - decisions
  - design decisions
  - ADR
tags:
  - design-system
  - decisions
  - architecture
date: 2026-04-02
source: "[[design-system#13. Decisions Log]]"
---

# Decisions Log

This file captures design decisions that have been made and closed. Every decision should include the rationale so future contributors (or a future version of Kacper) understand why.

> [!note] Workflow
> Undecided items belong in the relevant section spec — once resolved, move them here.

---

## Decided

### No skill star ratings
**Decision:** Skills use the terminal progress bar ([[About me - UI desine/04-components/skill-progress-bar/spec|app-skill-progress-bar]]) — no stars.
**Rationale:** Stars feel generic and "resume template"-like. The progress bar fits the terminal aesthetic and communicates the same information in a more distinctive way.
**Date:** 2026-03-31

---

### Dark theme only — no light mode
**Decision:** Single dark theme. No system preference switching.
**Rationale:** The dark terminal aesthetic is the brand identity. A light mode would dilute it and double the theming surface area to maintain.
**Date:** 2026-03-31

---

### Route-based i18n (EN/PL)
**Decision:** Language determined by URL prefix (`/en/` and `/pl/`), not browser preference or cookies.
**Rationale:** Makes URLs shareable and bookmarkable per language. Consistent with how most multilingual sites work. Avoids hydration issues with server-side rendering.
**Date:** 2026-03-31

---

### Font pairing: JetBrains Mono + Inter
**Decision:** `font-mono` = JetBrains Mono (with Fira Code, Consolas as fallbacks). `font-body` = Inter. See [[font-usage-rules]] and [[type-scale]].
**Rationale:** JetBrains Mono is legible at small sizes, has good glyph coverage, and is recognizable as a developer font. Inter is a clean, highly readable system font for body copy.
**Date:** 2026-03-31

---

### Accent color: #e91e8c
**Decision:** Brand pink `#e91e8c` as the single accent color. See [[color-palette#Accent]].
**Rationale:** Distinct from common developer portfolio blues and greens. High contrast against dark backgrounds. Memorable.
**Date:** 2026-03-31

---

### Projects section — yes, minimal list
**Decision:** Include a projects section, displayed as a minimal list with terminal `>` prefix. See [[About me - UI desine/04-components/project-list-item/spec|Project List Item]].
**Rationale:** Shows work without overwhelming the CV page. Can expand later.
**Date:** 2026-03-31

---

### Contact interaction — mailto link
**Decision:** Primary CTA ("Say Hi!") opens `mailto:kacperpilkowski@gmail.com`. No backend contact form. See [[About me - UI desine/04-components/cta-button/spec|CTA Button]].
**Rationale:** Simple, no backend needed. Opens user's email client directly.
**Date:** 2026-03-31

---

### Blog routing — in-app via Angular Router
**Decision:** Blog is part of the Angular app, not a separate platform. See [[routing-structure]].
**Rationale:** Full control over design, SEO, and reading experience.
**Date:** 2026-03-31

---

### Analytics — Google Analytics
**Decision:** Google Analytics with cookie consent banner.
**Rationale:** Industry standard. Requires cookie consent — see [[a11y-checklist#Cookie Consent Banner (Google Analytics)]].
**Date:** 2026-03-31

---

### Mobile sidebar — full-screen intro, scroll to reveal
**Decision:** On mobile, sidebar becomes a full-screen intro panel, user scrolls to reach content. No hamburger menu. See [[mobile-layout]].
**Rationale:** Natural scroll UX. Chevron indicator hints at content below.
**Date:** 2026-03-31

---

### Network background — edge-based opacity fade
**Decision:** Dot and line opacity fades from `0.80` at the canvas edges to `0.10` at the center, over a 250px transition zone. Static rgba values were rejected.
**Rationale:** Flat opacity made the effect either too invisible at the center or too distracting globally. Edge fade keeps the effect decorative without drawing attention away from the content in the middle of the screen.
**Date:** 2026-04-02

See [[04-components/network-background/spec|Network Background]] for the edge opacity formula.

---

### Network background — canvas opacity: opacity-40
**Decision:** The `<canvas>` element uses Tailwind class `opacity-40` (not `opacity-10` as originally spec'd).
**Rationale:** `opacity-10` was too faint to be visible in practice. `opacity-40` provides enough contrast against the dark background while remaining non-distracting.
**Date:** 2026-04-02

---

### Network background — connection threshold: 200px
**Decision:** Dots connect when within `200px` of each other (not `120px` as originally spec'd).
**Rationale:** 120px produced a sparse, disconnected network that looked unfinished. 200px creates a denser, more cohesive effect on all screen sizes.
**Date:** 2026-04-02

---

### Network background — variable particle speed
**Decision:** Each particle has a randomised base speed (`0.05–0.20 px/frame`) with independent x/y axis multipliers (`0.7–1.3×`). The original fixed `0.3 px/frame` was dropped.
**Rationale:** Uniform speed makes all particles move in perfect lockstep, which looks artificial. Randomised speed adds organic variation without increasing visual noise.
**Date:** 2026-04-02

---

### Network background — respawn along edges, not corner
**Decision:** When a particle exits the top or left edge, it respawns randomly along either the entire bottom edge or the entire right edge (50/50 chance). The original "bottom-right corner" respawn was dropped.
**Rationale:** Corner respawning caused a visible cluster of new particles appearing simultaneously in one spot. Edge respawning spreads entries naturally across the full canvas boundary.
**Date:** 2026-04-02

---

### Network background — SSR canvas guard
**Decision:** The `<canvas>` element is wrapped in `@if (isBrowser)` so it is never emitted in server-rendered HTML.
**Rationale:** Without the guard, the server renders a `<canvas>` with no dimensions and `position: fixed` CSS not yet applied. The browser allocates block space before the CSS takes effect, causing a CLS of 1.0. The guard eliminates the element from SSR output entirely.
**Date:** 2026-04-02

---

## Open / TBD

### Projects section — expand in-place or navigate?
**Question:** When the user clicks "View all projects", should remaining projects expand within the page, or navigate to a separate `/projects` route?
**Status:** Undecided — log the decision here once made.

### Blog listing — pagination or infinite scroll?
**Question:** Should the blog listing use traditional pagination or infinite scroll?
**Status:** Undecided — log the decision here once made.
