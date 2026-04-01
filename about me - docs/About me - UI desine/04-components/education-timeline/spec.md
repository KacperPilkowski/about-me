---
title: "Component: Education Timeline"
aliases:
  - education timeline
  - academic history
tags:
  - design-system
  - component
  - education
date: 2026-03-31
---

# Education Timeline

See also: [[About me - UI desine/04-components/experience-timeline/spec|Experience Timeline]]

## Purpose

Displays academic history on a vertical timeline.

## Anatomy

```
2021 Jul ──●── MASTER'S DEGREE IN "IT IN BUSINESS — BIG DATA"
               Wroclaw University of Economics and Business

2019 Nov ──○──

2018 Mar ──●── ENGINEER'S DEGREE IN "COMPUTER SCIENCE"
               Wroclaw University of Science and Technology

2014 Nov ──○──
```

- Filled dot (`●`) marks a degree / milestone
- Hollow dot (`○`) marks a range boundary (start or end)

## Tailwind Classes

| Element          | Classes                                                     |
|------------------|-------------------------------------------------------------|
| Timeline line    | `border-l-2 border-border`                                  |
| Dot (entry)      | `w-2.5 h-2.5 rounded-full bg-accent`                       |
| Dot (range end)  | `w-2 h-2 rounded-full bg-border`                           |
| Date label       | `text-xs text-muted font-mono`                             |
| Entry title      | `text-sm font-bold uppercase text-primary font-mono`       |
| Institution      | `text-sm text-muted font-body`                             |

## Mobile Adaptation

Same structure, narrower padding. No layout change needed — the vertical timeline works at any width.

## Angular Tag

```html
<app-education-timeline [items]="education" />
```
