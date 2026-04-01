---
title: Interaction Transitions
aliases:
  - hover states
  - focus states
  - button states
  - transitions
tags:
  - design-system
  - animation
  - interaction
date: 2026-03-31
source: "[[design-system#6. Animation & Motion Specifications]]"
---

# Interaction Transitions

See also: [[motion-rules]] | [[keyframes]] | [[spacing-and-sizing#Transitions]]

## Standard Hover Pattern

Most interactive elements (cards, links, buttons) follow this pattern:

```html
class="transition duration-normal ease-default"
```

150ms (`duration-fast`) for micro-interactions (icon swaps, color changes).
300ms (`duration-normal`) for border/shadow transitions on cards.

## Card Hover

All card-like elements ([[About me - UI desine/04-components/skill-card/spec|app-skill-card]], [[About me - UI desine/04-components/blog-card/spec|app-blog-card]]) use:

```
border-border → border-border-accent
shadow-none   → shadow-glow-accent
```

Transition: `duration-normal ease-default`

## Link Hover

Text links: `text-muted → text-primary` or `text-primary → text-accent`
Transition: `duration-fast ease-default`

## Button States

| State   | Classes                                      |
|---------|----------------------------------------------|
| Default | `bg-accent text-inverse`                     |
| Hover   | `bg-accent-hover`                            |
| Focus   | Focus ring: `ring-2 ring-accent ring-offset-2 ring-offset-base` |
| Active  | Slight scale: `active:scale-95`              |

## Focus Ring (Keyboard Navigation)

> [!important] Accessibility
> All interactive elements must have a visible focus ring for keyboard navigation. See [[a11y-checklist]].

```
focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base
```

Use `focus-visible` (not `focus`) to avoid showing the ring on mouse click.

## Page Transitions

Route changes: `animate-fade-in-up` on the main content wrapper.
Duration: `duration-slow` (500ms).
