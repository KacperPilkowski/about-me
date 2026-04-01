---
title: "Component: app-skill-progress-bar"
aliases:
  - skill bar
  - progress bar
  - app-skill-progress-bar
tags:
  - design-system
  - component
  - skills
date: 2026-03-31
source: "[[design-system#5. Component Library]]"
---

# Component: app-skill-progress-bar

See also: [[About me - UI desine/04-components/skill-card/spec|app-skill-card]] | [[color-palette#Progress Bar (Skill Rating)]] | [[motion-rules]]

## Purpose

Terminal-style horizontal progress bar for skill proficiency. Used inside [[About me - UI desine/04-components/skill-card/spec|app-skill-card]]. Replaces star ratings entirely — this is a design constraint, not a preference (see [[decisions]]).

## Anatomy

```
████████░░  80%
↑filled    ↑track  ↑label
```

- Filled portion: `bg-bar-filled` (`#e91e8c`)
- Track (unfilled): `bg-bar-track` (`#2a2f42`)
- Label: percentage value, `font-mono text-xs text-muted`

## Tailwind Classes (div-based)

```html
<div class="mt-2 flex items-center gap-3">
  <!-- Track -->
  <div class="flex-1 h-2.5 bg-bar-track rounded-sm overflow-hidden">
    <!-- Filled portion -->
    <div class="h-full bg-bar-filled rounded-sm transition-all duration-normal"
         [style.width.%]="skill.level">
    </div>
  </div>
  <!-- Percentage label -->
  <span class="font-mono text-xs text-muted w-8 text-right">{{ value }}%</span>
</div>
```

| Property   | Value                                   |
|------------|-----------------------------------------|
| Bar filled | `bg-bar-filled` (accent pink `#e91e8c`) |
| Bar track  | `bg-bar-track` (`#2a2f42`)              |
| Bar height | `h-2.5` (10px)                          |

## Alternative: block-character rendering

For an even stronger terminal feel, render the bar using monospace block characters instead of a `<div>`:

```html
<span class="font-mono text-sm text-bar-filled">████████</span><!--
--><span class="font-mono text-sm text-bar-track">░░░░</span>
```

Generated dynamically: `level / 10` filled blocks (`█`) and `10 - (level / 10)` empty blocks (`░`).

## Proficiency Scale

| Label     | Level  | Bars (of 10)  |
|-----------|--------|---------------|
| Expert    | 90–100 | █████████░    |
| Advanced  | 70–89  | ████████░░    |
| Proficient| 50–69  | ██████░░░░    |
| Familiar  | 30–49  | ████░░░░░░    |
| Exploring | 10–29  | ██░░░░░░░░    |

## States

| State    | Behavior                                      |
|----------|-----------------------------------------------|
| Default  | Static bar at set width                       |
| On load  | Animates from 0% → value (`duration-slow`)    |
| Reduced motion | Width set instantly, no animation       |

## Input

| Prop  | Type   | Description              |
|-------|--------|--------------------------|
| value | number | Proficiency % (0–100)    |

## Angular Tag

```
<app-skill-progress-bar [value]="90" />
```
