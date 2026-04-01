---
title: Accessibility Checklist
aliases:
  - a11y
  - accessibility
  - a11y checklist
tags:
  - design-system
  - accessibility
  - checklist
date: 2026-03-31
source: "[[design-system#11. Accessibility Notes]]"
---

# Accessibility Checklist

See also: [[motion-rules#Reduced Motion (Required)]] | [[interaction-transitions#Focus Ring (Keyboard Navigation)]]

## Reduced Motion (Critical)

> [!danger] These are hard requirements — see [[motion-rules]]

- [ ] Global CSS rule present: `@media (prefers-reduced-motion: reduce)` disables all transitions and animations
- [ ] [[About me - UI desine/04-components/network-background/spec|Network background]] canvas: animation loop paused when reduced motion is set
- [ ] Blinking cursor (`animate-blink`): renders as static, visible cursor
- [ ] Skill progress bar: fills instantly without animation
- [ ] Chevron bounce indicator: renders static
- [ ] Search overlay: no slide animation — instant appear/disappear

## Keyboard Navigation

- [ ] All interactive elements reachable via `Tab`
- [ ] Focus ring visible on all interactive elements (`focus-visible:ring-2 ring-accent`)
- [ ] [[About me - UI desine/04-components/article-search-overlay/spec|Search overlay]]: focus trapped while open
- [ ] Search results: navigable with `↑`/`↓` arrows, `Enter` to select, `Esc` to close (see [[search-overlay-flow]])
- [ ] Experience timeline "show more" toggle: keyboard accessible
- [ ] Language switcher: keyboard accessible

## Screen Readers

- [ ] `app-network-background` canvas has `aria-hidden="true"` (decorative)
- [ ] Search overlay: `role="dialog"`, `aria-modal="true"`, focus trap, `aria-label="Search articles"`
- [ ] Search results list: `role="listbox"`, items have `role="option"`
- [ ] Skill progress bars: `role="meter"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label="C# proficiency: 80%"`
- [ ] Experience timeline: `role="listbox"` on date list, `aria-selected` on active item, `aria-live="polite"` on detail panel
- [ ] Blog cards: `<article>` element, meaningful `<h3>` for title
- [ ] Social link icons: have `aria-label` describing destination
- [ ] Blog article images: meaningful `alt` text
- [ ] Language switcher: `aria-label="Switch language to English/Polski"`, `aria-current="true"` on active
- [ ] Mobile scroll indicator: `aria-hidden="true"` (purely decorative)
- [ ] Skip link: hidden `<a>` before sidebar that jumps to `#main-content` on focus

## Color & Contrast

- [ ] Body text (`text-primary` on `bg-base`): check contrast ratio ≥ 4.5:1
- [ ] Muted text (`text-muted` on `bg-base`): check contrast ratio ≥ 3:1 (large text) or 4.5:1 (body)
- [ ] Accent color on dark background: verify readability at `text-accent` on `bg-base`
- [ ] No information conveyed by color alone (e.g. skill bars also show percentage label)

## Semantic HTML

- [ ] Page uses `<main>`, `<aside>`, `<nav>`, `<article>`, `<section>` correctly
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skips)
- [ ] Blog articles use proper heading structure within Markdown

## Cookie Consent Banner (Google Analytics)

- [ ] Banner is keyboard accessible and dismissable
- [ ] Focus is managed correctly when banner appears
- [ ] Consent state stored and respected on subsequent visits
