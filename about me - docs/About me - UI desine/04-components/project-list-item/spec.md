---
title: "Component: app-project-list-item"
aliases:
  - project item
  - app-project-list-item
tags:
  - design-system
  - component
  - projects
date: 2026-03-31
source: "[[design-system#5. Component Library]]"
---

# Component: app-project-list-item

See also: [[cv-page-flow#Progressive Disclosure — Projects]] | [[decisions#Projects section — expand in-place or navigate?]]

## Purpose

Displays a single project in the Projects section. More compact than a blog card — list-style rather than card-style.

## Anatomy

```
→ Project Name                    [GitHub] [Live]
  Short description of the project.
  [tag1] [tag2] [tag3]
```

- Arrow prefix: `text-accent font-mono`
- Project name: `font-mono text-base text-primary`
- Description: `font-body text-sm text-muted`
- Tags: small pill badges (`bg-surface rounded-full px-2 py-0.5 text-xs font-mono text-muted`)
- Links: icon buttons — GitHub icon, external link icon

## States

| State  | Visual change                                    |
|--------|--------------------------------------------------|
| Default| No background                                    |
| Hover  | Subtle `bg-surface` background on the row, accent arrow |

## Angular Tag

```
<app-project-list-item [project]="project" />
```
