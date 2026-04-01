---
title: Claude Project Instructions
aliases:
  - CLAUDE
  - project instructions
tags:
  - meta
  - instructions
date: 2026-03-31
---

# Claude Instructions — kacperpilkowski.com UI Design

> [!important] Start here every session
> Read [[design-system]] first. It is the **Map of Content (MOC)** that links to every topic in the vault. Then navigate to the specific file you need.

---

## How this vault is structured

[[design-system]] is an **index**, not a monolith. Each topic is owned by a single file — the detail lives there, not in the MOC.

| If you need…                | Go to                                                            |
|-----------------------------|------------------------------------------------------------------|
| Color, spacing, shadow tokens | [[color-palette\|Color Palette]] or [[spacing-and-sizing\|Spacing & Sizing]] |
| Layout at a breakpoint      | [[desktop-layout\|Desktop]], [[tablet-layout\|Tablet]], or [[mobile-layout\|Mobile]] |
| Routes and page types        | [[routing-structure\|Routing Structure]]               |
| Font rules and type scale    | [[font-usage-rules\|Font Usage Rules]] or [[type-scale\|Type Scale]] |
| Translations / i18n          | [[i18n-notes\|i18n Notes]]                         |
| A component spec             | `04-components/<name>/spec.md` — see [[design-system#5. Component Library]] for full list |
| Animation timing / keyframes | [[keyframes\|Keyframes]] or [[motion-rules\|Motion Rules]] |
| UX flows                     | [[cv-page-flow\|CV Page]], [[blog-flow\|Blog]], or [[search-overlay-flow\|Search Overlay]] |
| Accessibility checklist      | [[a11y-checklist\|A11y Checklist]]              |
| Past decisions               | [[decisions\|Decisions Log]]                    |

---

## Before making any change

1. Open [[design-system]] and navigate to the relevant topic file.
2. If the change touches a component, read its spec in `04-components/`.
3. Check [[decisions\|Decisions Log]] — if the topic has already been decided, follow that decision. Do not re-open it.

---

## Hard constraints — never break these

> [!danger] Non-negotiable
> Violating any of these breaks the core brand identity.

- **Dark theme only.** Never add light mode or respond to `prefers-color-scheme`. See [[decisions#Dark theme only — no light mode]].
- **No raw values in components.** Every color, size, shadow, and timing must come from a Tailwind token defined in `tailwind.config.ts`. See [[color-palette\|Color Palette]] and [[spacing-and-sizing\|Spacing & Sizing]].
- **`font-mono` for headings, labels, and terminal elements only.** Use `font-body` (Inter) for all body text and descriptions. See [[font-usage-rules\|Font Usage Rules]].
- **Accent (`#e91e8c`) for emphasis and interaction only.** Never on large backgrounds or decorative elements. See [[color-palette#Accent]].
- **All animations must respect `prefers-reduced-motion`.** Never remove the global CSS rule. See [[motion-rules\|Motion Rules]].
- **No star ratings for skills.** Always use `app-skill-progress-bar`. See [[About me - UI desine/04-components/skill-progress-bar/spec\|Skill Progress Bar]] and [[decisions#No skill star ratings]].

---

## When editing or creating files

Follow these Obsidian conventions on every file you touch:

- **Frontmatter** — every `.md` file must have `title`, `aliases`, `tags`, and `date` properties.
- **Wikilinks** — use `[[note-name]]` or `[[path/to/note|Display Text]]` for all internal links. Never use relative markdown links (`[text](./path.md)`).
- **Callouts** — use `> [!type]` callouts for important notices, constraints, warnings, and tips. Do not use plain blockquotes for these.
- **Update `date`** — always update the `date` frontmatter property on any file you modify.
- **One source of truth per topic** — content belongs in the topic file, not in the MOC. The MOC ([[design-system]]) only has short summaries + wikilinks. Never duplicate detailed content between files.

---

## When a design decision is made

1. Add it to [[decisions\|Decisions Log]] with the date and rationale.
2. Do not leave anything in an "undecided" state in spec files — either decide it or mark it explicitly as `Status: open` in the decisions log.

---

## When updating a component spec

Each component has its own folder under `04-components/`. The spec file must include:

- **Purpose** — what the component does and where it's used
- **Anatomy** — ASCII diagram of the layout
- **Tailwind classes** — exact classes for the component wrapper and key elements
- **States** — default, hover, focus, active, disabled (where applicable)
- **Angular tag** — the exact `<app-...>` usage example

See any existing spec (e.g. [[About me - UI desine/04-components/skill-card/spec\|Skill Card]]) as a reference for the format.

---

## What this folder is and is not

> [!warning] Design documentation only
> This folder contains design docs only — not Angular source code. Do not create `.ts`, `.html`, `.scss`, or any Angular component files here.
>
> If a code example is needed, include it as a fenced code block inside the relevant spec.

---

## Folder map

| Folder | What's in it |
|--------|--------------|
| [[color-palette\|01-tokens/]] | Design token references (colors, spacing, shadows, z-index, transitions) |
| [[desktop-layout\|02-layout/]] | Layout specs for desktop, tablet, mobile + routing |
| [[type-scale\|03-typography/]] | Font scale, font usage rules, i18n notes |
| [[About me - UI desine/04-components/skill-card/spec\|04-components/]] | One subfolder per Angular component, each with a `spec.md` |
| [[keyframes\|05-animations/]] | Keyframe definitions, motion rules, interaction transitions |
| [[cv-page-flow\|06-ux-flows/]] | End-to-end UX flows for the CV page, blog, and search overlay |
| [[README\|07-assets/]] | Avatar, icons, OG images |
| [[a11y-checklist\|08-accessibility/]] | Accessibility checklist |
| [[decisions\|09-decisions-log/]] | Design decisions + v2 changelog |
