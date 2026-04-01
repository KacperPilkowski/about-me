---
title: Tablet Layout
aliases:
  - tablet
tags:
  - design-system
  - layout
  - tablet
  - responsive
date: 2026-03-31
source: "[[design-system#9. Responsive Behavior]]"
---

# Tablet Layout (768px – 1024px)

Related: [[desktop-layout]] | [[mobile-layout]]

## Changes from Desktop

- Sidebar width narrows to `w-sidebar-md` (280px)
- Main content offset adjusts: `md:ml-sidebar-md`
- Sidebar remains fixed and visible
- All sidebar content stays the same — just narrower

## Sidebar Spec

```html
<aside class="... md:w-sidebar-md ...">
```

- **Width:** `w-sidebar-md` (280px)
- Everything else inherits from the desktop sidebar spec

## Notes

- Avatar may scale down slightly to fit narrower sidebar
- Social links row may wrap if icons are too wide
- CTA button stays full-width within sidebar padding
