---
title: "Kacper Piłkowski — Personal Site · UI Design System"
aliases:
  - design system
  - UI spec
  - design spec
  - MOC
tags:
  - design-system
  - source-of-truth
  - moc
version: "2.0"
stack: Angular + Tailwind CSS
theme: Dark only
i18n: EN + PL (route-based)
status: in-progress
date: 2026-03-31
---

# Kacper Piłkowski — Personal Site · UI Design System

> [!abstract] Map of Content
> This is the **Map of Content (MOC)** for the entire design system. Each section links to the file that owns the full detail. Start here, navigate by topic.
>
> **Version:** 2.0 (v2 redesign) · **Status:** 🟡 In progress · **Last updated:** 2026-03-31

---

## 1. Design Principles

These principles drive every design decision. When in doubt, refer back here.

**Terminal-Aesthetic, Not Gimmick.** The dark theme, monospaced headings, and typewriter effects reflect real developer culture — not cosplay. Every "techy" element should feel earned, not decorative.

**Content Is King.** The layout exists to surface Kacper's experience and writing. No component should compete with the content for attention.

**Motion With Purpose.** Every animation must serve a functional goal: orient the user, confirm an action, or create a sense of place. Zero gratuitous animations.

**Consistent but Not Rigid.** Components share tokens but are not identical. Variety in size and layout is acceptable as long as it maps to a consistent visual grammar.

**Progressive Disclosure.** Long lists hide behind "show more" interactions rather than overwhelming the initial view. The page should feel scannable at first glance.

---

## 2. Design Tokens

All tokens are defined in `tailwind.config.ts` and consumed via Tailwind utility classes. No raw CSS values in components.

| Topic | File |
|-------|------|
| Colors, backgrounds, accent, semantic, borders | [[color-palette\|Color Palette]] |
| Spacing, border radius, shadows, z-index, transitions, easing | [[spacing-and-sizing\|Spacing & Sizing]] |

---

## 3. Layout Architecture

| Breakpoint | File |
|------------|------|
| Desktop ≥ 1024px — fixed sidebar + scrollable main | [[desktop-layout\|Desktop Layout]] |
| Tablet 768–1024px — narrower sidebar | [[tablet-layout\|Tablet Layout]] |
| Mobile < 768px — full-screen intro panel + scroll to content | [[mobile-layout\|Mobile Layout]] |
| Routes, page types, blog content strategy | [[routing-structure\|Routing Structure]] |

---

## 4. Typography System

| Topic | File |
|-------|------|
| Font sizes, line heights, common class combinations | [[type-scale\|Type Scale]] |
| `font-mono` vs `font-body` rules | [[font-usage-rules\|Font Usage Rules]] |
| EN/PL translation strategy, keys, detection, blog content structure | [[i18n-notes\|i18n Notes]] |

---

## 5. Component Library

Each component has a dedicated spec file with purpose, anatomy, Tailwind classes, states, and Angular tag.

| Component | Tag | Spec |
|-----------|-----|------|
| Skill Card | `app-skill-card` | [[About me - UI desine/04-components/skill-card/spec\|spec]] |
| Skill Progress Bar | `app-skill-progress-bar` | [[About me - UI desine/04-components/skill-progress-bar/spec\|spec]] |
| Skills Section (search + show more) | — | [[About me - UI desine/04-components/skills-section/spec\|spec]] |
| Section Heading | `app-section-heading` | [[About me - UI desine/04-components/section-heading/spec\|spec]] |
| Experience Timeline | `app-experience-timeline` | [[About me - UI desine/04-components/experience-timeline/spec\|spec]] |
| Education Timeline | `app-education-timeline` | [[About me - UI desine/04-components/education-timeline/spec\|spec]] |
| Language Card | `app-language-card` | [[About me - UI desine/04-components/language-card/spec\|spec]] |
| CTA Button ("Say Hi!") | — | [[About me - UI desine/04-components/cta-button/spec\|spec]] |
| Blog Post Card | `app-blog-card` | [[About me - UI desine/04-components/blog-card/spec\|spec]] |
| Project List Item | `app-project-list-item` | [[About me - UI desine/04-components/project-list-item/spec\|spec]] |
| Article Search Overlay | `app-article-search-overlay` | [[About me - UI desine/04-components/article-search-overlay/spec\|spec]] |
| Language Switcher | `app-language-switcher` | [[About me - UI desine/04-components/language-switcher/spec\|spec]] |
| Network Background | `app-network-background` | [[About me - UI desine/04-components/network-background/spec\|spec]] |

---

## 6. Animation & Motion

| Topic | File |
|-------|------|
| Tailwind keyframes (blink, fade-in-up, slide-down, wave) + Angular triggers (@expandCollapse, @contentSwap, @sectionEnter, typewriter) | [[keyframes\|Keyframes]] |
| Reduced motion rules, when to animate, when not to | [[motion-rules\|Motion Rules]] |
| Hover, focus, button states, card glow, page transitions | [[interaction-transitions\|Interaction Transitions]] |

---

## 7. UX Interaction Flows

| Flow | File |
|------|------|
| CV page: first load (desktop + mobile), scroll reveal, skill search, show more, experience nav | [[cv-page-flow\|CV Page Flow]] |
| Blog: listing, article view, reading experience, navigation | [[blog-flow\|Blog Flow]] |
| Article search overlay: trigger, open/close, keyboard nav, debounce | [[search-overlay-flow\|Search Overlay Flow]] |

---

## 8. Assets

Icon, avatar, and OG image conventions → [[README\|Assets README]]

---

## 9. Accessibility

Full checklist: reduced motion, keyboard nav, screen readers, color contrast, semantic HTML, cookie consent → [[a11y-checklist\|Accessibility Checklist]]

---

## 10. Decisions & History

| Topic | File |
|-------|------|
| All closed and open design decisions with rationale | [[decisions\|Decisions Log]] |
| What changed between v1 and v2 | [[v2-improvements\|V2 Improvements]] |

---

*Document maintained by Kacper Piłkowski. This MOC links to the individual files that own each topic — update those files, not this index.*
