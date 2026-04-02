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
date: 2026-04-02
source: "[[design-system#5. Component Library]]"
---

# Component: app-network-background

See also: [[motion-rules]] | [[a11y-checklist]] | [[desktop-layout]]

## Purpose

Canvas-based animated background that renders behind all page content. Creates a low-key "network nodes" particle effect that reinforces the developer/terminal aesthetic without being distracting.

## Behavior

**Angular service:** `NetworkBackgroundService`

- ~80–120 dots on desktop, exactly 40 on mobile (`< 768px`)
- Each dot drifts toward upper-left at a **randomised speed per particle** — base speed `0.05–0.20 px/frame`, each axis varies independently by a `0.7–1.3×` multiplier
- When a dot exits off the top or left edge, it **respawns randomly along either the bottom edge or the right edge** (50/50 split) — not in a corner
- Any two dots within `200px` are connected by a line
- **Edge-based opacity fade** — both dots and lines are most visible near the canvas edges and fade toward the center. Transition zone: `250px` from each edge.
  - Dot opacity: `0.10` (center) → `0.80` (at edge)
  - Line opacity: `(1 - distance / 200) × (0.10 + edgeFactor × 0.70)` using midpoint of the line for edgeFactor
- Dot size: `2–4px` radius (randomised)
- Dot color: `rgba(233, 30, 140, <opacity>)` — accent pink
- Line color: `rgba(255, 255, 255, <opacity>)` — white

> [!note] Edge opacity formula
> `edgeDist = min(x, width - x, y, height - y)`
> `edgeFactor = max(0, 1 - edgeDist / 250)`
> `opacity = 0.10 + edgeFactor × 0.70`

## Performance

- Use `requestAnimationFrame`
- Pause when tab is not visible (`document.visibilitychange`)
- On mobile (`< 768px`): reduce to 40 dots for battery / performance
- Canvas size updates on window resize (debounced 200ms)

## Reduced Motion

> [!warning] Accessibility requirement
> When `prefers-reduced-motion` is set, the animation **stops** — the service draws one static frame and does not start the RAF loop. See [[motion-rules#Reduced Motion (Critical)]].

## Positioning

```html
@if (isBrowser) {
  <canvas #canvas
          width="0" height="0"
          class="fixed inset-0 z-base pointer-events-none opacity-40"
          aria-hidden="true">
  </canvas>
}
```

- `@if (isBrowser)` — SSR guard; prevents the canvas element from appearing in server-rendered HTML (avoids CLS)
- `width="0" height="0"` — prevents the browser from allocating block space before `position: fixed` takes effect
- `pointer-events-none` — never blocks interactions
- `aria-hidden` — decorative, ignored by screen readers
- `z-base` — behind all content
- `opacity-40` — canvas-level opacity multiplier applied on top of the per-element rgba values

## Angular Tag

```
<app-network-background />
```

Implemented as a standalone Angular component (`NetworkBackground`) that owns the `<canvas>` element, wired to `NetworkBackgroundService` via `afterNextRender()` and `DestroyRef`.
