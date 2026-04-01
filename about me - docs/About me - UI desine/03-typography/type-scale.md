---
title: Type Scale
aliases:
  - font sizes
  - typography scale
tags:
  - design-system
  - typography
  - tokens
date: 2026-03-31
source: "[[design-system#4. Typography System]]"
---

# Type Scale

See also: [[font-usage-rules]] | [[color-palette]] | [[i18n-notes]]

## Font Families

| Token     | Stack                                              | Tailwind class | Use for                              |
|-----------|----------------------------------------------------|----------------|--------------------------------------|
| font-mono | JetBrains Mono → Fira Code → Consolas → monospace | `font-mono`    | Headings, labels, skill names, terminal elements |
| font-body | Inter → Segoe UI → system-ui → sans-serif          | `font-body`    | Body text, descriptions, blog content |

## Font Size Scale

| Token | Size    | Line Height | Tailwind class | Example use              |
|-------|---------|-------------|----------------|--------------------------|
| xs    | 12px    | 1rem        | `text-xs`      | Timestamps, captions     |
| sm    | 14px    | 1.25rem     | `text-sm`      | Muted labels, metadata   |
| base  | 16px    | 1.5rem      | `text-base`    | Body text                |
| lg    | 18px    | 1.75rem     | `text-lg`      | Lead paragraphs          |
| xl    | 24px    | 2rem        | `text-xl`      | Section headings         |
| 2xl   | 32px    | 2.25rem     | `text-2xl`     | Name in sidebar          |
| 3xl   | 40px    | 2.75rem     | `text-3xl`     | Hero / large display     |

## Common Combinations

| Element              | Classes                                  |
|----------------------|------------------------------------------|
| Sidebar name         | `font-mono text-2xl text-primary`        |
| Sidebar role         | `font-body text-sm text-muted`           |
| Section heading      | `font-mono text-xl text-primary`         |
| Body paragraph       | `font-body text-base text-primary`       |
| Muted label          | `font-body text-sm text-muted`           |
| Skill name           | `font-mono text-sm text-primary`         |
| Blog post title      | `font-mono text-lg text-primary`         |
| Blog post body       | `font-body text-base text-primary`       |
| Timestamp / metadata | `font-body text-xs text-muted`           |
