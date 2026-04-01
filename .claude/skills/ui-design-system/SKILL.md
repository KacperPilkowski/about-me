---
name: ui-design-system
description: >
  Navigate, read, and edit the Obsidian-based UI design system vault for kacperpilkowski.com.
  Use this skill whenever a task involves the personal site's design — implementing a component,
  looking up tokens (colors, spacing, shadows), checking layout specs, understanding animation
  timing, reading a component spec, creating a new component spec, editing an existing spec,
  updating the decisions log, or any reference to the design system, design tokens, or the
  "About me - UI desine" vault. Also use when the user mentions: Tailwind classes for the site,
  dark theme rules, font-mono vs font-body, accent color, skill progress bar, sidebar layout,
  mobile layout, typewriter effect, constellation background, or any Angular component from
  the site (app-skill-card, app-blog-card, app-experience-timeline, etc.).
  Even if the user just says "check the design docs" or "what does the spec say" — use this skill.
---

# UI Design System Navigator

You are working with an **Obsidian vault** that documents the complete UI design system for Kacper Piłkowski's personal portfolio site (Angular + Tailwind CSS, dark theme only). This skill teaches you how to find information, respect constraints, and maintain the vault when editing.

## How to orient yourself

The vault lives in the mounted folder named **"About me - UI desine"** in **about me - docs** vault. The entry point is always `design-system.md` — it's a **Map of Content (MOC)** that links to every topic file. Don't try to guess file paths from memory; open the MOC and follow the wikilinks.

**Navigation flow:**

```
design-system.md (MOC)
  ├─ 01-tokens/     → color-palette.md, spacing-and-sizing.md
  ├─ 02-layout/     → desktop-layout.md, tablet-layout.md, mobile-layout.md, routing-structure.md
  ├─ 03-typography/ → type-scale.md, font-usage-rules.md, i18n-notes.md
  ├─ 04-components/ → <component-name>/spec.md  (13 components)
  ├─ 05-animations/ → keyframes.md, motion-rules.md, interaction-transitions.md
  ├─ 06-ux-flows/   → cv-page-flow.md, blog-flow.md, search-overlay-flow.md
  ├─ 07-assets/     → avatar/, icons/, og-images/
  ├─ 08-accessibility/ → a11y-checklist.md
  └─ 09-decisions-log/ → decisions.md, v2-improvements.md
```

Read `references/vault-map.md` for the complete file inventory with one-line descriptions of every file.

## Quick-lookup table

Use this to jump straight to the right file without opening the MOC every time:

| You need…                          | Read this file                                |
|------------------------------------|-----------------------------------------------|
| Hex colors, Tailwind color classes | `01-tokens/color-palette.md`                  |
| Spacing, shadows, z-index, easing | `01-tokens/spacing-and-sizing.md`             |
| Desktop sidebar + main layout     | `02-layout/desktop-layout.md`                 |
| Tablet layout adjustments         | `02-layout/tablet-layout.md`                  |
| Mobile full-screen intro + scroll | `02-layout/mobile-layout.md`                  |
| Routes, page types, section order | `02-layout/routing-structure.md`              |
| Font sizes and line heights        | `03-typography/type-scale.md`                 |
| When to use mono vs body font     | `03-typography/font-usage-rules.md`           |
| i18n / translation setup          | `03-typography/i18n-notes.md`                 |
| Any component spec                | `04-components/<name>/spec.md`                |
| Keyframe definitions              | `05-animations/keyframes.md`                  |
| When/how to animate               | `05-animations/motion-rules.md`               |
| Hover/focus/active transitions    | `05-animations/interaction-transitions.md`    |
| CV page scroll/reveal flow        | `06-ux-flows/cv-page-flow.md`                 |
| Blog listing + article flow       | `06-ux-flows/blog-flow.md`                    |
| Search overlay (Cmd+K) flow       | `06-ux-flows/search-overlay-flow.md`          |
| Accessibility checklist           | `08-accessibility/a11y-checklist.md`          |
| Past design decisions             | `09-decisions-log/decisions.md`               |
| V2 changelog                      | `09-decisions-log/v2-improvements.md`         |

## Hard constraints — never break these

These are non-negotiable. Breaking any of them contradicts the core brand identity. Before making any change, verify you aren't violating one.

1. **Dark theme only.** No light mode. No `prefers-color-scheme` media query. The entire site is dark, always.

2. **No raw CSS values in components.** Every color, size, shadow, and timing must come from a Tailwind token defined in `tailwind.config.ts`. If you need a value that doesn't exist as a token, propose adding it — don't hardcode.

3. **`font-mono` is for headings, labels, and terminal elements only.** All body text, descriptions, and paragraphs use `font-body` (Inter). Mixing this up breaks the typographic hierarchy.

4. **Accent color (`#e91e8c`) is for emphasis and interaction only.** Never apply it to large backgrounds or decorative areas. It's a highlight, not a fill.

5. **All animations must respect `prefers-reduced-motion`.** The global CSS rule that disables motion must never be removed. Exceptions (blinking cursor, canvas, progress bar fill) are documented in `05-animations/motion-rules.md`.

6. **No star ratings for skills.** Always use `app-skill-progress-bar`. This was a deliberate design decision — see `09-decisions-log/decisions.md`.

## Before making any change

1. **Check the decisions log first** (`09-decisions-log/decisions.md`). If the topic has already been decided, follow that decision. Don't re-open it without Kacper's explicit request.
2. **Read the relevant topic file.** Don't rely on summaries in the MOC — the detail lives in the topic-owned file.
3. **If the change touches a component**, read its spec in `04-components/<name>/spec.md`.

## Obsidian conventions for editing

Every file you create or edit in this vault must follow these rules. They keep the vault consistent and make Obsidian's graph view, search, and backlinks work correctly.

### Frontmatter (required on every .md file)

```yaml
---
title: "Human-readable title"
aliases:
  - short form
  - alternate name
tags:
  - design-system
  - relevant-topic-tag
date: 2026-04-01          # always update on edit
source: "[[design-system#Section Name]]"   # optional, for traceability
---
```

- `title`: descriptive, human-readable
- `aliases`: 2–5 alternate names (used by Obsidian's link autocomplete)
- `tags`: always include `design-system` plus topic-specific tags (`component`, `tokens`, `layout`, `typography`, `animation`, `ux-flow`, `accessibility`, `decision`)
- `date`: **always update** to today when editing any file

### Wikilinks — the only link format

Use `[[wikilinks]]` for every internal reference. Never use relative markdown links like `[text](./path.md)`.

**Patterns:**

| Pattern | Example | When to use |
|---------|---------|-------------|
| Simple | `[[color-palette]]` | Referencing a file by name |
| Path + display | `[[04-components/skill-card/spec\|Skill Card]]` | When the filename alone is ambiguous |
| Anchor | `[[design-system#5. Component Library]]` | Linking to a specific section |

### Callouts

Use Obsidian callout syntax for important notices — not plain blockquotes.

| Type | Usage |
|------|-------|
| `> [!danger]` | Hard constraints that must never be broken |
| `> [!warning]` | Design constraints, accessibility requirements |
| `> [!important]` | Critical reading instructions |
| `> [!note]` | Workflow notes, implementation details |
| `> [!info]` | Source-of-truth notes, reference information |
| `> [!tip]` | Best practices, helpful guidance |
| `> [!quote]` | Attributed quotes (design principles) |

### One source of truth per topic

Content belongs in the topic file, not in the MOC. The MOC (`design-system.md`) only has short summaries plus wikilinks. Never duplicate detailed content between files.

## Creating a new component spec

When adding a new component, create `04-components/<component-name>/spec.md`. Read `references/spec-template.md` for the exact template — it includes every required section with placeholder content you fill in.

**Required sections:**

1. **Frontmatter** — title, aliases, tags, date, source
2. **See also** — wikilinks to related specs, token files, animation files
3. **Purpose** — one or two sentences: what it does and where it's used
4. **Anatomy** — ASCII diagram showing the visual layout
5. **Tailwind Classes** — exact classes for the wrapper and key elements, as an HTML code block
6. **States** — table covering: Default, Hover, Focus, Active, Disabled (where applicable)
7. **Rules** — callout with design constraints specific to this component
8. **Accessibility** — ARIA attributes, roles, keyboard interaction
9. **Angular Tag** — the exact `<app-...>` usage example

After creating the spec, add a row for it in `design-system.md` under section 5 (Component Library).

## Recording a design decision

When a new decision is made:

1. Open `09-decisions-log/decisions.md`
2. Add an entry under "## Decided" with this format:

```markdown
### Decision Title
**Decision:** What was decided
**Rationale:** Why — one or two sentences
**Date:** 2026-04-01

See [[related-spec-or-file]] for details.
```

3. If a spec file had something marked as undecided, update it to reflect the decision.

## What this vault is NOT

This folder contains **design documentation only** — not Angular source code. Never create `.ts`, `.html`, `.scss`, or any Angular component files here. If a code example is needed, include it as a fenced code block inside the relevant spec.

---

> [!tip] When in doubt
> Open `design-system.md`, find the relevant section, follow the wikilink. The answer is almost always in the topic file that owns that subject.
