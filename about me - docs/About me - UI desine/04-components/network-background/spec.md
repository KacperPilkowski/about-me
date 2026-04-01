---
title: "Component: app-network-background"
aliases:
  - network background
  - canvas background
  - particle background
  - app-network-background
tags:
  - design-system
  - component
  - animation
  - canvas
date: 2026-03-31
source: "[[design-system#5. Component Library]]"
---

# Component: app-network-background

See also: [[motion-rules]] | [[a11y-checklist]] | [[desktop-layout]]

## Purpose

Canvas-based animated background that renders in the main content area. Creates a low-key "network nodes" or particle effect that reinforces the developer/terminal aesthetic without being distracting.

## Behavior

**Angular service:** `NetworkBackgroundService`

- ~80–120 dots distributed randomly across canvas
- Each dot drifts toward upper-left at ~`0.3px/frame`
- When a dot exits top-left, it respawns at bottom-right
- Any two dots within `120px` are connected by a line
- Line opacity: `1 - (distance / 120)` — fades as dots separate
- Dot size: `2–4px` radius (randomised)
- Colors: dots `rgba(233, 30, 140, 0.4)`, lines `rgba(255, 255, 255, 0.05)`

## Performance

- Use `requestAnimationFrame`
- Pause when tab is not visible (`document.visibilitychange`)
- On mobile (`< 768px`): reduce to ~40 dots for battery / performance
- Canvas size updates on window resize

## Reduced Motion

> [!warning] Accessibility requirement
> When `prefers-reduced-motion` is set, the animation **stops** — the canvas renders a static snapshot (or hides entirely). See [[motion-rules#Reduced Motion (Critical)]].

## Positioning

```html
<canvas class="fixed inset-0 z-base pointer-events-none opacity-10"
        aria-hidden="true">
</canvas>
```

- `pointer-events-none` — never blocks interactions
- `aria-hidden` — decorative, ignored by screen readers
- `z-base` — behind all content

## Angular Tag

```
<app-network-background />
```

This is implemented as an Angular service + directive pair, not a simple template component.
