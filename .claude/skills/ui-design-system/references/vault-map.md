# Vault File Inventory

Complete map of every file in the "About me - UI desine" vault, with a one-line description.

## Root

| File | Description |
|------|-------------|
| `design-system.md` | **MOC** — Map of Content, entry point for everything |
| `design-system-v1-archive.md` | Archive of the v1 design system (read-only reference) |
| `CLAUDE.md` | Instructions for Claude sessions working in this vault |

## 01-tokens/

| File | Description |
|------|-------------|
| `color-palette.md` | All color tokens: backgrounds (base, surface, surface-alt), text (primary, muted, inverse), accent (#e91e8c + hover + subtle), progress bar (bar-filled, bar-track), borders, semantic (success, warning, error) |
| `spacing-and-sizing.md` | Sidebar widths (360px desktop, 280px tablet), border radius (4/8/16/9999px), box shadows (sm/md/lg/glow-accent), z-index scale (0–300), transitions (fast 150ms, normal 300ms, slow 500ms), easing curves, Tailwind 4px spacing grid |

## 02-layout/

| File | Description |
|------|-------------|
| `desktop-layout.md` | ≥1024px: fixed sidebar (360px) + scrollable main, skills grid with auto-fill columns, sidebar contents list |
| `tablet-layout.md` | 768–1024px: sidebar narrows to 280px, main offset adjusts |
| `mobile-layout.md` | <768px: sidebar becomes full-screen intro panel, scroll indicator with bounce, component adaptation table |
| `routing-structure.md` | Route table (paths, pages, components), language param strategy, CV section order (7 sections), page types, blog markdown strategy |

## 03-typography/

| File | Description |
|------|-------------|
| `type-scale.md` | Font families (mono + body with fallbacks), size scale (xs 12px → 3xl 40px with line heights), 14 pre-made class combinations |
| `font-usage-rules.md` | Core rule: font-mono for headings/labels, font-body for paragraphs. Lists of where each font applies. Typewriter effect note. Accent in type. |
| `i18n-notes.md` | @ngx-translate setup, route-based strategy, language switcher ref, Polish text +10-15% length, translation JSON keys, language detection logic, blog content file structure per language |

## 04-components/

Each component has a `spec.md` inside its named folder.

| Component | Angular Tag | One-line description |
|-----------|-------------|---------------------|
| `article-search-overlay` | `<app-article-search-overlay>` | Cmd+K / click search overlay with debounced filtering, keyboard nav |
| `blog-card` | `<app-blog-card>` | Card for blog listing grid — thumbnail, title, date, excerpt, tags |
| `cta-button` | `<app-cta-button>` | Call-to-action button (Download CV, Contact) with accent styling |
| `education-timeline` | `<app-education-timeline>` | Vertical timeline for education entries |
| `experience-timeline` | `<app-experience-timeline>` | Interactive work experience timeline with detail panel swap |
| `language-card` | `<app-language-card>` | Card showing language name + proficiency level |
| `language-switcher` | `<app-language-switcher>` | EN/PL toggle in sidebar |
| `network-background` | `<app-network-background>` | Constellation/particle canvas background animation |
| `project-list-item` | `<app-project-list-item>` | Minimal list row for projects section |
| `section-heading` | `<app-section-heading>` | Section title with terminal prompt prefix and optional typewriter effect |
| `skill-card` | `<app-skill-card>` | Skill name + progress bar in a hoverable card |
| `skill-progress-bar` | `<app-skill-progress-bar>` | Terminal-style progress bar (filled blocks + track) |
| `skills-section` | `<app-skills-section>` | Skills grid with search filter and "show more" expand |

## 05-animations/

| File | Description |
|------|-------------|
| `keyframes.md` | 4 Tailwind keyframes (blink, fade-in-up, slide-down, wave-travel) + 4 Angular animation triggers (@expandCollapse, @contentSwap, @sectionEnter, typewriter) |
| `motion-rules.md` | Core motion principle, prefers-reduced-motion CSS rule, special cases (cursor/canvas/progress/chevron), when-to-animate table (7 situations), when-NOT-to-animate (3 patterns) |
| `interaction-transitions.md` | Standard hover/focus/active patterns, card hover (border+shadow), link hover (color), button states table, focus ring pattern, page transitions |

## 06-ux-flows/

| File | Description |
|------|-------------|
| `cv-page-flow.md` | Entry point flow, first load (desktop vs mobile), scroll-triggered reveal (IntersectionObserver threshold 0.15), skill search, show-more expand, experience nav, progressive disclosure, CTA interactions |
| `blog-flow.md` | Blog listing structure, article view (max-w 720px), reading experience, prev/next navigation, language switching on articles |
| `search-overlay-flow.md` | Trigger methods (Cmd+K, /, icon), open phases (backdrop→panel→focus), search behavior (300ms debounce, title/tags/excerpt), result format, keyboard nav, close triggers |

## 07-assets/

| Path | Contents |
|------|----------|
| `README.md` | Asset overview and naming conventions |
| `avatar/` | Profile photo files |
| `icons/` | SVG icon files |
| `og-images/` | Open Graph social preview images |

## 08-accessibility/

| File | Description |
|------|-------------|
| `a11y-checklist.md` | Full accessibility checklist covering ARIA, keyboard nav, color contrast, focus management, screen reader support |

## 09-decisions-log/

| File | Description |
|------|-------------|
| `decisions.md` | All design decisions — 7 decided (no stars, dark only, route i18n, font pairing, accent color, minimal projects, mailto contact) + 2 open (blog routing, analytics) |
| `v2-improvements.md` | Changelog of v2 redesign improvements over v1 |
