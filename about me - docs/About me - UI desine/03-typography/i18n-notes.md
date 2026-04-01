---
title: i18n Notes (EN / PL)
aliases:
  - internationalization
  - localization
  - translations
  - multilingual
tags:
  - design-system
  - i18n
  - routing
date: 2026-03-31
source: "[[design-system#10. Internationalization (i18n)]]"
---

# i18n Notes (EN / PL)

See also: [[routing-structure]] | [[About me - UI desine/04-components/language-switcher/spec|Language Switcher]]

## Setup

- Library: `@ngx-translate`
- Strategy: Route-based — `/en/...` and `/pl/...`
- Default: `/` redirects to `/en/`

## Language Switcher

Component: [[About me - UI desine/04-components/language-switcher/spec|app-language-switcher]]
Placed at the top of the sidebar (and intro panel on mobile).
Navigates between language variants preserving the current path.

## Typography Considerations for Polish

> [!tip] Polish text length
> Polish text tends to run ~10–15% longer than English equivalents. Test all UI text in PL to ensure no overflow in:

- Sidebar role label (single line preferred)
- Skill card labels
- Section headings
- Navigation items
- CTA button text

## Translation Files

Location (in Angular project): `src/assets/i18n/en.json` and `src/assets/i18n/pl.json`

**Translation keys (example):**

```json
{
  "nav.say_hi": "Say Hi!",
  "section.about": "about me",
  "section.skills": "skills",
  "section.experience": "experience",
  "section.education": "education",
  "section.languages": "languages",
  "section.projects": "projects",
  "section.blog": "blog",
  "skills.search": "Search by skill...",
  "skills.show_more": "Show more",
  "skills.show_less": "Show less",
  "blog.read": "Read article",
  "blog.no_results": "No articles found for '{{query}}'",
  "scroll.down": "scroll down"
}
```

## Content Translation

- **UI strings:** JSON translation files (see above)
- **CV content (bio, experience descriptions):** Separate JSON or markdown files per language
- **Blog posts:** Separate markdown files per language (see below)

## Language Detection

On first visit with no language prefix (`/`), detect browser language:

- If `navigator.language.startsWith('pl')` → redirect to `/pl/`
- Otherwise → redirect to `/en/`

Store preference in a cookie for return visits.

## Blog Content

Blog articles are stored as separate Markdown files per language:

```
/src/content/blog/
  en/
    event-driven-design.md
    azure-functions-patterns.md
  pl/
    event-driven-design.md
```

Each file has frontmatter:

```yaml
---
title: "How I Approach Event-Driven System Design"
slug: "event-driven-design"
date: 2026-03-15
tags: [architecture, azure]
excerpt: "A practical guide to..."
lang: en
---
```

Slug structure should be consistent across languages for cross-linking.
