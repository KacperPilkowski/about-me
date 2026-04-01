---
title: "Component: Language Card"
aliases:
  - language card
  - spoken language
tags:
  - design-system
  - component
  - languages
date: 2026-03-31
---

# Language Card

## Purpose

Displays a spoken language with its flag and proficiency level. Used in the Languages section of the CV page.

## Anatomy

```
┌──────────────────────────────────┐
│  🇵🇱  Polish — Native tongue     │
└──────────────────────────────────┘
```

## Tailwind Classes

```html
<div class="flex items-center gap-4 bg-surface rounded-md p-4 px-6">
  <img src="/assets/flags/pl.svg" class="w-8 h-8 rounded-full" alt="Polish flag" />
  <div>
    <span class="text-base font-bold text-primary font-body">Polish</span>
    <span class="text-sm text-muted font-body ml-2">— Native tongue</span>
  </div>
</div>
```

## Angular Tag

```html
<app-language-card [language]="{ name: 'Polish', level: 'Native tongue', flag: 'pl' }" />
```
