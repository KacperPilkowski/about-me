---
title: Font Usage Rules
aliases:
  - font rules
  - monospace rules
tags:
  - design-system
  - typography
  - conventions
date: 2026-03-31
source: "[[design-system#4. Typography System]]"
---

# Font Usage Rules

See also: [[type-scale]] | [[i18n-notes]]

## The Core Rule

> [!important] Font family constraint
> `font-mono` is for headings, labels, skill names, and terminal elements only.
> `font-body` (Inter) is for all body text, descriptions, and blog content.

**Never use monospace for paragraphs or long-form reading content.**

## font-mono — Use for

- Page/section headings
- Sidebar name and role title
- Skill names in skill cards
- Terminal-style UI elements (typewriter text, blinking cursor)
- Navigation labels and menu items
- Code-style labels and tags
- Progress bar labels

## font-body — Use for

- All body paragraphs and descriptions
- Blog article content
- Experience/education descriptions
- Project summaries
- "About me" bio text
- Form labels and inputs
- Tooltips and helper text

## Typewriter Effect

The typewriter animation (blinking cursor) uses `font-mono` — it's a terminal aesthetic element. The `blink` keyframe controls the cursor. See [[keyframes]].

## Accent Color in Typography

- Use `text-accent` sparingly to highlight key terms or interactive text links
- Never use accent color for large blocks of text — it's for emphasis only
