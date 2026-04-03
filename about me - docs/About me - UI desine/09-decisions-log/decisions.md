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
date: 2026-04-03
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

### Orchestrated sequential typewriter
**Decision:** Section headings type one at a time, top-to-bottom. Only the currently-typing heading shows `>` and `_`. After all headings complete, focus returns to h1 permanently.
**Rationale:** A single self-animating h1 is disconnected from the rest of the page. Sequencing all headings creates a "terminal boot" narrative — the page reveals itself as a system initialising — which fits the terminal brand identity. See [[keyframes#Typewriter Effect (Orchestrated heading sequence)]].
**Date:** 2026-04-03

---

### IntersectionObserver viewport gate for typewriter
**Decision:** Each heading only starts typing when its parent section is ≥10% visible (`threshold: 0.1`). If the previous heading finishes before the next is visible, the advance is queued as `pendingIndex` and fires on intersection.
**Rationale:** Without the gate, headings below the fold would type into invisible sections. The viewport gate ensures the user always sees each heading as it types and gives natural pacing on smaller screens. See [[About me - UI desine/04-components/section-heading/spec|section-heading]].
**Date:** 2026-04-03

---

### Asterisk prefix for completed headings
**Decision:** After a heading finishes typing and loses focus, its prefix changes from `>` to `*` (`text-muted`). The prefix is always present in the DOM as a placeholder (`invisible`) before typing.
**Rationale:** Removing the `>` entirely caused the heading text to shift left — a jarring layout shift on every state transition. A permanent DOM placeholder eliminates the shift. The `*` gives visual closure (this section is "done") without drawing attention away from the active heading.
**Date:** 2026-04-03

---

### Numbered i18n keys for cycling phrases
**Decision:** Cycling phrases use numbered keys: `hero.cycle.0`, `hero.cycle.1`, `hero.cycle.2`. Named slugs (`hero.cycle.who_i_am`) were rejected.
**Rationale:** Named slugs couple the key to a specific phrase, requiring a key rename when the phrase changes. Numbers are order-stable: adding a new phrase only requires adding `hero.cycle.3` to both `en.json` and `pl.json`. The parent component holds the key array; the component resolves them via `TranslateService.instant` at cycle time.
**Date:** 2026-04-03

---

### Cycling with backspace before retype
**Decision:** When h1 cycles to a new phrase, it backspaces the current text character by character (50ms/char) before typing the new phrase (80ms/char). The title is not cleared instantly.
**Rationale:** An instant clear feels like a cut; the animated erase maintains the terminal metaphor and gives the user time to process that a change is happening. The slower erase speed (50ms) vs. type speed (80ms) emphasises erasure as cleanup, not the main event.
**Date:** 2026-04-03

---

### `aria-label` + `aria-hidden` for animated headings
**Decision:** All `app-section-heading` headings have `[attr.aria-label]="title()"` on the element. All inner spans — including the `>`, `*`, `_` decorators and the animated `displayedText` span — have `aria-hidden="true"`.
**Rationale:** Screen readers would otherwise narrate the animation character by character. `aria-label` gives AT users the complete, static heading text. `aria-hidden` on inner spans prevents any decorative or partial content from reaching the accessibility tree. This pattern is consistent with the `prefers-reduced-motion` philosophy: motion should never carry meaning not available through other means.
**Date:** 2026-04-03

---

### RxJS for animations (no setTimeout / setInterval)
**Decision:** All animation timing in the frontend uses RxJS primitives (`timer()`, `interval()`, `concat()`, `defer()`). Native `setTimeout` and `setInterval` are not used in components.
**Rationale:** RxJS integrates with Angular's `DestroyRef` / `takeUntilDestroyed` for automatic cleanup. `take(1)` makes pipelines one-shot by definition, eliminating the need for boolean guard flags. `defer()` enables recursive cycling without stacking callbacks. `toObservable(signal)` bridges Angular signals to RxJS so the two reactive systems compose cleanly. See also architecture ADR: `docs/adr/002-rxjs-animations.md`.
**Date:** 2026-04-03

---

### linkedSignal + afterNextRender SSR animation pattern
**Decision:** Components that animate text use `linkedSignal(() => this.title())` for `displayedText`. `afterNextRender()` resets it to `''` and starts the animation pipeline. All animation setup lives inside `afterNextRender()`.
**Rationale:** `linkedSignal` initialises from `title()` so prerendered HTML contains the full text — critical for crawler indexing. In the browser, `afterNextRender` fires once after the first render, resets `displayedText` to `''`, and begins the animation. This avoids `isPlatformBrowser` checks scattered throughout the component. See also architecture ADR: `docs/adr/002-ssr-animation-pattern.md`.
**Date:** 2026-04-03

---

### opacity-0 + isBrowser hydration flash fix
**Decision:** `app-section-heading` adds `readonly isBrowser = signal(false)`. Inside `afterNextRender`, after resetting `displayedText` to `''`, it sets `isBrowser.set(true)`. The `displayedText` span has `[class.opacity-0]="!isBrowser()"`.
**Rationale:** Without this, there is a brief flash on every page load: the browser receives prerendered HTML with full heading text visible, and only `afterNextRender` clears it. The `opacity-0` class hides the SSR text visually during the hydration window while keeping it in the DOM for crawlers. Since `isBrowser` is set *after* `displayedText` is reset, the transition is: `opacity-0 + full title` → `opacity-1 + empty string` → animation starts — no visible title at any point.
**Date:** 2026-04-03

See [[About me - UI desine/04-components/section-heading/spec|section-heading]] for the implementation.

---

### Tailwind @source inline for dynamic class strings
**Decision:** Any Tailwind class that is assembled at runtime inside a `computed()` signal or template literal must be added to an `@source inline(...)` directive in `styles.css`. Currently covers `SectionHeading.headingClass()`.
**Rationale:** Tailwind v4 scans source files for class name strings. Classes concatenated inside template literals (`` `font-mono ${size} text-primary` ``) may not survive the scanner because the full string is never written literally. `@source inline("class1 class2 ...")` explicitly allowlists them. This is separate from `@utility`, which is for classes applied via Angular's `[class.x]` binding syntax (e.g. `animate-blink`).
**Date:** 2026-04-03

---

### Heading levels h1–h4 with shared visual treatment
**Decision:** `app-section-heading` accepts `level: 1 | 2 | 3 | 4` (default `2`). All levels use identical visual styling — `font-mono`, `text-primary`, `flex items-baseline gap-1` — differing only in font size via a `Record<1|2|3|4, string>` size map.
**Rationale:** The terminal aesthetic is uniform across all heading levels; only the size hierarchy matters. A single component with a level input avoids duplicating markup and styling for each semantic heading level.
**Date:** 2026-04-03

---

### Original title included in h1 cycling phrases
**Decision:** `app-home` passes `['hero.cycle.0', 'hero.cycle.1', 'hero.cycle.2', 'section.about']` as `cycleTextKeys`. The `section.about` key is last in the array.
**Rationale:** Without the original title in the cycle, the heading permanently shows one of the cycle phrases after the first iteration. Including `section.about` at the end means the cycle loops back to the page title: `who I am → my story → my profile → About → who I am → ...`. The key resolves via `TranslateService.instant` at cycle time, so it picks up language changes.
**Date:** 2026-04-03

---

## Open / TBD

### Projects section — expand in-place or navigate?
**Question:** When the user clicks "View all projects", should remaining projects expand within the page, or navigate to a separate `/projects` route?
**Status:** Undecided — log the decision here once made.

### Blog listing — pagination or infinite scroll?
**Question:** Should the blog listing use traditional pagination or infinite scroll?
**Status:** Undecided — log the decision here once made.
