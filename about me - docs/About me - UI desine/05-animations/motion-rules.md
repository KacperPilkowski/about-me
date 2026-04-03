---
title: Motion Rules
aliases:
  - animation rules
  - reduced motion
  - prefers-reduced-motion
tags:
  - design-system
  - animation
  - accessibility
  - conventions
date: 2026-04-03
source: "[[design-system#6. Animation & Motion Specifications]]"
---

# Motion Rules

See also: [[keyframes]] | [[interaction-transitions]] | [[a11y-checklist]]

## Core Principle

> [!quote] Design principle
> Every animation must serve a functional goal: orient the user, confirm an action, or create a sense of place. Zero gratuitous animations.

## Reduced Motion (Required)

> [!danger] Do not remove
> All animations must respect `prefers-reduced-motion`. The global CSS rule in [[design-system]] handles this at the stylesheet level — **do not remove it**.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Special cases to handle explicitly in components (not just via the global rule):

- **Blinking cursor** (`animate-blink`): stop entirely, show cursor as static visible
- **Network background** canvas: pause the animation loop
- **Skill progress bar**: set width instantly (no fill animation)
- **Chevron scroll indicator**: show static, no bounce

## When to Animate

| Situation               | Animation to use         | Purpose                        |
|-------------------------|--------------------------|-------------------------------|
| Section enters viewport | `animate-fade-in-up`     | Orient — section is appearing  |
| Search overlay opens    | `animate-slide-down`     | Confirm — drawer appearing     |
| Terminal cursor         | `animate-blink`          | Sense of place — live terminal |
| Skill bar fill (on load)| Width transition `duration-slow` | Confirm — skill loaded  |
| Card hover              | `shadow-glow-accent` transition | Confirm — item is interactive |
| Page background         | Canvas particle drift    | Sense of place — ambient       |
| Heading typewriter sequence | Character-by-character typing | Orient — establishes which section is active |
| h1 cycling phrases      | Backspace + retype every 3 s | Sense of place — keeps hero alive after sequence |

## When NOT to Animate

- Decorative transitions between static text blocks
- Looping effects on non-interactive elements (except background canvas)
- Anything that moves faster than `duration-fast` (150ms) for user-triggered actions — this feels janky
