---
title: "Component: app-language-switcher"
aliases:
  - language switcher
  - lang toggle
  - app-language-switcher
tags:
  - design-system
  - component
  - i18n
date: 2026-03-31
source: "[[design-system#5. Component Library]]"
---

# Component: app-language-switcher

See also: [[i18n-notes]] | [[routing-structure]] | [[desktop-layout#Sidebar Contents (top → bottom)]]

## Purpose

Toggles between EN and PL language variants. Sits at the top of the sidebar (and intro panel on [[mobile-layout|mobile]]).

## Anatomy

```
EN  |  PL
```

- Active language: `text-primary font-mono`
- Inactive language: `text-muted font-mono hover:text-primary`
- Divider: `text-muted mx-1`

## Tailwind Classes

```html
<nav class="flex items-center gap-1 font-mono text-sm">
  <a [class]="isActive('en') ? 'text-primary' : 'text-muted hover:text-primary transition duration-fast'">EN</a>
  <span class="text-muted">|</span>
  <a [class]="isActive('pl') ? 'text-primary' : 'text-muted hover:text-primary transition duration-fast'">PL</a>
</nav>
```

## Behavior

- Clicking a language navigates to the equivalent route in the target language
- Active language is not a link (or is styled to indicate current state)
- Uses Angular Router with `@ngx-translate`

## Angular Tag

```
<app-language-switcher />
```
