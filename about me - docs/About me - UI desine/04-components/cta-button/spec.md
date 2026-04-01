---
title: "Component: CTA Button (Say Hi!)"
aliases:
  - cta button
  - say hi button
  - contact button
tags:
  - design-system
  - component
  - sidebar
date: 2026-03-31
---

# CTA Button ("Say Hi!")

See also: [[desktop-layout#Sidebar Contents (top → bottom)]] | [[interaction-transitions#Button States]]

## Purpose

Primary contact call-to-action in the sidebar. Opens `mailto:kacperpilkowski@gmail.com`.

## Tailwind Classes

```html
<a href="mailto:kacperpilkowski@gmail.com"
   class="inline-block bg-accent text-inverse rounded-full
          px-8 py-3 text-sm font-bold tracking-wide
          hover:bg-accent-hover hover:shadow-glow-accent hover:scale-[1.03]
          active:scale-[0.98]
          transition-all duration-fast">
  Say Hi!
</a>
```

## States

| State   | Classes                                            |
|---------|----------------------------------------------------|
| Default | `bg-accent text-inverse rounded-full`              |
| Hover   | `bg-accent-hover shadow-glow-accent scale-[1.03]`  |
| Active  | `scale-[0.98]`                                     |
| Focus   | `ring-2 ring-accent ring-offset-2 ring-offset-base`|

## Angular Tag

```html
<app-cta-button />
```
