---
title: Routing & Page Architecture
aliases:
  - routing
  - routes
  - page structure
tags:
  - design-system
  - routing
  - i18n
date: 2026-03-31
source: "[[design-system#8. Routing & Page Architecture]]"
---

# Routing & Page Architecture

## Route Table

| Path              | Page                    | Component / View         |
|-------------------|-------------------------|--------------------------|
| `/`               | Redirect → `/en/`       | —                        |
| `/:lang/`         | Home — full CV page     | All sections in sequence |
| `/:lang/blog`     | Blog listing            | `app-blog-card` list     |
| `/:lang/blog/:slug` | Individual article    | Markdown rendered article|

## Language Param

`:lang` is either `en` or `pl`. Route-based i18n via `@ngx-translate`.

- Default redirect: `/` → `/en/`
- [[About me - UI desine/04-components/language-switcher/spec|Language switcher]] navigates between `/en/...` and `/pl/...` preserving the current path

## CV Page Section Order

Sections render top-to-bottom in the main content area:

1. About me
2. Skills
3. Experience
4. Education
5. Languages
6. Projects
7. Blog (preview / latest posts)

## Page Types

**Home Page (CV)** — single scrollable page with all sections. Fixed sidebar on desktop, full-screen intro on mobile. This is the "virtual business card" — it should load fast and feel complete.

**Blog Listing** — grid or list of all [[About me - UI desine/04-components/blog-card/spec|blog post cards]]. Same sidebar layout. [[About me - UI desine/04-components/article-search-overlay/spec|Article search overlay]] works here too. Filtered by language.

**Blog Article** — full-width article content. Layout:

- Top: back link (`← Back to blog`), article title, date, tags
- Body: `max-w-[720px] mx-auto` prose area, `font-body leading-relaxed`
- Bottom: related articles or "next/prev" links
- Sidebar: stays visible on desktop (consistent identity)

## Blog Content Strategy

Blog articles are stored as Markdown files in the Angular project and rendered at build time or via `ngx-markdown`. No external CMS for v2 — keeps it simple. See [[i18n-notes#Blog Content]] for file structure.

See also: [[blog-flow]] | [[search-overlay-flow]] | [[i18n-notes]]
