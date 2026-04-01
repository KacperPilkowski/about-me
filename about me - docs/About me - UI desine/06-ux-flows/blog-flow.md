---
title: "UX Flow: Blog"
aliases:
  - blog flow
  - article flow
tags:
  - design-system
  - ux-flow
  - blog
date: 2026-03-31
source: "[[design-system#7. UX Interaction Flows]]"
---

# UX Flow: Blog

See also: [[search-overlay-flow]] | [[cv-page-flow]] | [[routing-structure#Blog Routes]]

## Blog Listing (`/:lang/blog`)

1. User arrives at the blog listing page
2. Header with search icon (triggers [[About me - UI desine/04-components/article-search-overlay/spec|app-article-search-overlay]])
3. Grid of [[About me - UI desine/04-components/blog-card/spec|app-blog-card]] components — most recent first
4. Pagination or infinite scroll (TBD — see [[decisions#Blog listing — pagination or infinite scroll?]])
5. Each card links to `/:lang/blog/:slug`

## Article View (`/:lang/blog/:slug`)

1. Article loads with `animate-fade-in-up` on the content wrapper
2. Layout: single column, max-width constrained for readability
3. Typography: `font-body text-base text-primary` for article body
4. Headings in article: `font-mono` (H1, H2, H3)
5. Code blocks: monospace, `bg-surface` background, `border border-border`
6. "Back to blog" link at top: `← blog` in `font-mono text-accent`

## Reading Experience

- Max content width: ~680px (approx `max-w-2xl`) for comfortable line length
- Line height for article body: `leading-relaxed` (1.75)
- Images: full width within content column, `rounded-md`

## Navigation Between Articles

- "Previous / Next" article links at the bottom of each article
- Links show article title and date

## Language Switching on Blog

Switching language on a blog article redirects to the equivalent article in the other language (if it exists), otherwise to the blog listing in the target language.
