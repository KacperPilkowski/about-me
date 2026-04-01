---
title: Spacing, Sizing & Effects
aliases:
  - spacing
  - sizing
  - shadows
  - z-index
  - transitions
tags:
  - design-system
  - tokens
  - spacing
date: 2026-03-31
source: "[[design-system#2.1 Tailwind Configuration]]"
---

# Spacing, Sizing & Effects

All tokens are defined in `tailwind.config.ts`. No raw pixel or hex values in components.

> [!info] Source of truth
> This is a reference extracted from [[design-system]] § 2.1. The canonical definition lives in `tailwind.config.ts`.

See also: [[color-palette]] for color tokens.

## Sidebar Widths

| Token       | Value  | Tailwind class    | Breakpoint        |
|-------------|--------|-------------------|-------------------|
| sidebar     | 360px  | `w-sidebar`       | Desktop (≥ 1024px)|
| sidebar-md  | 280px  | `w-sidebar-md`    | Tablet (768–1024px)|

## Border Radius

| Token | Value  | Tailwind class |
|-------|--------|----------------|
| sm    | 4px    | `rounded-sm`   |
| md    | 8px    | `rounded-md`   |
| lg    | 16px   | `rounded-lg`   |
| full  | 9999px | `rounded-full` |

## Box Shadow

| Token       | Value                              | Tailwind class       |
|-------------|-------------------------------------|----------------------|
| sm          | `0 1px 4px rgba(0,0,0,0.3)`        | `shadow-sm`          |
| md          | `0 4px 12px rgba(0,0,0,0.4)`       | `shadow-md`          |
| lg          | `0 8px 32px rgba(0,0,0,0.55)`      | `shadow-lg`          |
| glow-accent | `0 0 20px rgba(233,30,140,0.25)`   | `shadow-glow-accent` |

## Z-Index Scale

| Token   | Value | Tailwind class  | Usage                        |
|---------|-------|-----------------|------------------------------|
| base    | 0     | `z-base`        | Default stacking             |
| raised  | 10    | `z-raised`      | Sidebar, sticky elements     |
| overlay | 100   | `z-overlay`     | Dropdowns, tooltips          |
| modal   | 200   | `z-modal`       | Modal dialogs                |
| toast   | 300   | `z-toast`       | Notification toasts          |

## Transitions

| Token   | Duration | Tailwind class   |
|---------|----------|------------------|
| fast    | 150ms    | `duration-fast`  |
| normal  | 300ms    | `duration-normal`|
| slow    | 500ms    | `duration-slow`  |

**Easing functions:**

| Token        | Curve                            | Tailwind class       |
|--------------|----------------------------------|----------------------|
| ease-default | `cubic-bezier(0.4, 0, 0.2, 1)`  | `ease-default`       |
| ease-spring  | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `ease-spring`    |

## Spacing Scale

Uses Tailwind's default 4px base grid — no custom overrides. Standard classes apply: `p-4` = 16px, `p-6` = 24px, `p-8` = 32px, etc.
