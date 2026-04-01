---
title: Assets
aliases:
  - images
  - icons
  - media
tags:
  - design-system
  - assets
date: 2026-03-31
---

# Assets

This folder holds static assets for the site design. Organized into three subfolders:

## avatar/
Profile photo(s) for the sidebar. Use a high-resolution source (min 400×400px). The component crops it to a circle.

Naming: `avatar.jpg` (or `.png`, `.webp`)

## icons/
UI icons and social icons. Prefer SVG format for crispness at all sizes.

Suggested files:
- `github.svg`
- `linkedin.svg`
- `twitter.svg` / `x.svg`
- `email.svg`
- `external-link.svg`
- `chevron-down.svg` (used in mobile scroll indicator)
- `search.svg`
- `close.svg`

## og-images/
Open Graph / social preview images for the site and individual blog articles.

- `og-default.png` — fallback for the homepage (1200×630px)
- Per-article OG images can be generated programmatically or stored here

---

Place final production-ready assets here. Work-in-progress or raw exports go to a `_wip/` subfolder.
