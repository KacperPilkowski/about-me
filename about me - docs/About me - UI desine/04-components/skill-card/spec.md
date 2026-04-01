---
title: "Component: app-skill-card"
aliases:
  - skill card
  - app-skill-card
tags:
  - design-system
  - component
  - skills
date: 2026-03-31
source: "[[design-system#5. Component Library]]"
---

# Component: app-skill-card

See also: [[About me - UI desine/04-components/skill-progress-bar/spec|app-skill-progress-bar]] | [[color-palette]] | [[interaction-transitions]]

## Purpose

Displays a single skill with its name and proficiency level using the terminal progress bar. Used in a grid inside the Skills section.

## Anatomy

```
┌─────────────────────────────┐
│  skill-name_                │  ← font-mono, text-sm, text-primary
│  ████████░░  80%            │  ← app-skill-progress-bar
└─────────────────────────────┘
```

## Tailwind Classes

```html
<div class="bg-surface-alt border border-border rounded-md p-4 min-h-[72px]
            hover:bg-surface hover:border-border-accent hover:-translate-y-0.5
            transition-all duration-fast">

  <!-- Skill name -->
  <span class="font-mono text-sm text-primary">{{ skill.name }}</span>

  <!-- Progress bar -->
  <app-skill-progress-bar [value]="skill.level" />
</div>
```

| Property       | Tailwind classes / value                     |
|----------------|----------------------------------------------|
| Background     | `bg-surface-alt`                             |
| Border         | `border border-border`                       |
| Border radius  | `rounded-md`                                 |
| Padding        | `p-4`                                        |
| Min height     | `min-h-[72px]`                               |

## States

| State   | Visual change                                                          |
|---------|------------------------------------------------------------------------|
| Default | `bg-surface-alt`, `border-border`                                      |
| Hover   | `bg-surface`, `border-border-accent`, `-translate-y-0.5`, `duration-fast` |
| Focus   | Same as hover + focus ring for keyboard nav                            |
| Hidden  | `opacity-0 scale-95`, not in tab order (collapsed / filtered out)      |

## Rules

> [!warning] Design constraint
> **No stars.** Skill rating is always shown as a terminal progress bar. See [[decisions]].

- Skill names use `font-mono` — not `font-body` (see [[font-usage-rules]]).
- Progress values are 0–100 (percentage).

## Accessibility

- `role="meter"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- `aria-label="C# proficiency: 80%"`

## Angular Tag

```html
<app-skill-card [skill]="{ name: 'TypeScript', level: 90 }" />
```
