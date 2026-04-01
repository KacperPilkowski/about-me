---
title: Color Palette
aliases:
  - colors
  - colour palette
tags:
  - design-system
  - tokens
  - colors
date: 2026-03-31
source: "[[design-system#2.1 Tailwind Configuration]]"
---

# Color Palette

All colors are defined in `tailwind.config.ts` and consumed via Tailwind utility classes. Never use raw hex values in components.

> [!info] Source of truth
> This is a reference extracted from [[design-system]] § 2.1. The canonical definition lives in `tailwind.config.ts`.

See also: [[spacing-and-sizing]] for the other token categories.

## Backgrounds

| Token         | Hex / Value              | Tailwind class   | Usage                              |
|---------------|--------------------------|------------------|------------------------------------|
| base          | `#12151e`               | `bg-base`        | Page background, sidebar base      |
| surface       | `#1c2030`               | `bg-surface`     | Card and panel backgrounds         |
| surface-alt   | `#141720`               | `bg-surface-alt` | Skills grid, experience panel      |

## Text

| Token   | Hex       | Tailwind class  | Usage                              |
|---------|-----------|-----------------|------------------------------------|
| primary | `#e8eaf0` | `text-primary`  | Body text, headings                |
| muted   | `#7a8099` | `text-muted`    | Secondary labels, timestamps       |
| inverse | `#12151e` | `text-inverse`  | Text on accent-colored backgrounds |

## Accent

| Token         | Value                       | Tailwind class          | Usage                        |
|---------------|-----------------------------|-------------------------|------------------------------|
| accent        | `#e91e8c`                  | `text-accent` / `bg-accent` | Primary brand pink — emphasis & interaction only |
| accent-hover  | `#ff3da3`                  | `bg-accent-hover`       | Hover state for accent elements |
| accent-subtle | `rgba(233, 30, 140, 0.12)` | `bg-accent-subtle`      | Tinted background on active  |

## Progress Bar (Skill Rating)

| Token      | Hex       | Tailwind class    | Usage           |
|------------|-----------|-------------------|-----------------|
| bar-filled | `#e91e8c` | `bg-bar-filled`   | Filled portion  |
| bar-track  | `#2a2f42` | `bg-bar-track`    | Unfilled track  |

## Borders

| Token         | Value                        | Tailwind class        |
|---------------|------------------------------|-----------------------|
| border        | `rgba(255, 255, 255, 0.07)` | `border-border`       |
| border-accent | `#e91e8c`                  | `border-border-accent`|

## Semantic

| Token   | Hex       | Tailwind class    |
|---------|-----------|-------------------|
| success | `#4caf7d` | `text-success`    |
| warning | `#f5a623` | `text-warning`    |
| error   | `#e05c5c` | `text-error`      |

## Rules

> [!warning] Design constraints
> - Accent is for **emphasis and interaction only** — not decorative elements or large backgrounds.
> - Dark theme only. No light mode variants. See [[decisions#No skill star ratings|decisions log]].
