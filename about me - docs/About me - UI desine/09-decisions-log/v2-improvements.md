---
title: V2 Improvements Over V1
aliases:
  - v2 changes
  - what changed
  - v1 vs v2
tags:
  - design-system
  - decisions
  - changelog
date: 2026-03-31
---

# V2 Improvements Over V1

| Area               | V1                             | V2                                                  |
|--------------------|--------------------------------|-----------------------------------------------------|
| Role               | ".NET developer"               | "Solution Architect"                                |
| Skill rating       | Gold stars (5-star scale)      | Terminal progress bar (accent pink, monospace) — [[04-components/skill-progress-bar/spec|spec]] |
| Blog               | Not present                    | In-app blog with Markdown articles + Angular Router — [[blog-flow]] |
| Projects           | Not present                    | Minimal list with terminal `>` prompt prefix — [[04-components/project-list-item/spec|spec]] |
| Mobile layout      | Stacked sidebar (not optimised)| Full-screen intro + scroll indicator — [[mobile-layout]] |
| Styling            | Custom SCSS                    | Tailwind CSS with custom config — [[color-palette]] |
| Section animations | None                           | Intersection Observer fade-in on scroll — [[keyframes#@sectionEnter (Scroll reveal)]] |
| Font system        | All monospace                  | Monospace headings + Inter body — [[font-usage-rules]] |
| Performance        | Canvas always running          | Pause on hidden tab; fewer dots on mobile — [[04-components/network-background/spec|spec]] |
| Social links       | LinkedIn, Instagram, Facebook  | LinkedIn, GitHub                                    |
| i18n               | Flag click (unclear behaviour) | Route-based EN + PL with `@ngx-translate` — [[i18n-notes]] |
| Contact            | Unclear behaviour              | `mailto:` link (simple, no backend) — [[04-components/cta-button/spec|spec]] |
| Theme              | Dark only                      | Dark only (intentional brand decision) — [[decisions#Dark theme only — no light mode]] |
| Analytics          | Unknown                        | Google Analytics (with cookie consent) — [[decisions#Analytics — Google Analytics]] |
