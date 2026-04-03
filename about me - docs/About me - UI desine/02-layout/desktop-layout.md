---
title: Desktop Layout
aliases:
  - desktop
  - sidebar layout
tags:
  - design-system
  - layout
  - desktop
date: 2026-04-03
source: "[[design-system#3. Layout Architecture]]"
---

# Desktop Layout (≥ 1024px)

Related: [[tablet-layout]] | [[mobile-layout]] | [[routing-structure]]

## Structure

Fixed sidebar + scrollable main content split. The sidebar is an identity anchor — always visible.

```
┌────────────────────────────────────────────────────────┐
│  SIDEBAR (fixed, w-sidebar)  │  MAIN CONTENT (scroll)  │
│                              │                          │
│  [Language switcher: EN/PL]  │  [Background animation]  │
│  [Avatar]                    │                          │
│  [Name]                      │  [Section: about me_]    │
│  [Role]                      │  [Section: skills]       │
│  [Social links]              │  [Section: experience]   │
│  [CTA button]                │  [Section: education]    │
│                              │  [Section: languages]    │
│                              │  [Section: projects]     │
│                              │  [Section: blog]         │
└────────────────────────────────────────────────────────┘
```

## Sidebar Spec

```html
<aside class="fixed inset-y-0 left-0 w-sidebar bg-base border-r border-border
              z-raised flex flex-col items-center py-10 px-8
              lg:flex  md:w-sidebar-md  max-md:hidden">
```

- **Width:** `w-sidebar` (360px)
- **Position:** `fixed`, full height
- **Background:** `bg-base`
- **Border:** `border-r border-border`
- **Z-index:** `z-raised`
- **Padding:** `py-10 px-8`

## Main Content Spec

```html
<main class="ml-[360px] md:ml-sidebar-md lg:ml-sidebar
             max-md:ml-0
             px-16 pt-12 max-w-[960px] relative">
  ...
</main>
```

- Offset by sidebar width so content doesn't underlap
- Scrollable independently of sidebar
- Background canvas animation ([[About me - UI desine/04-components/network-background/spec|app-network-background]]) renders here

## Content Grid (Skills Section)

```html
<div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
  <!-- skill cards -->
</div>
```

## Sidebar Contents (top → bottom)

1. **Language switcher** — [[About me - UI desine/04-components/language-switcher/spec|app-language-switcher]], flag icons (EN / PL)
2. **Avatar** — circular `w-52 h-52 rounded-full`, subtle ring `ring-2 ring-border`
3. **Name** — `text-2xl font-bold text-primary font-mono mt-6 mb-2 text-center`
4. **Role / Title** — `text-lg text-accent tracking-wide text-center mb-8`
5. **Contact zone** — pushed to sidebar bottom with `mt-auto`; all items inside wrapped in `flex flex-col items-center gap-3` for uniform 12px spacing:
   - **"Get In Touch" label** — `text-xs text-muted uppercase tracking-widest`
   - **Social icons row** — LinkedIn + GitHub SVGs, `w-6 h-6 text-muted hover:text-accent transition-colors duration-fast`; each `<a>` has `aria-label`, `target="_blank" rel="noopener noreferrer"`, and `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base`
   - **"Or" divider** — `text-xs text-muted`
   - **CTA Button** — [[About me - UI desine/04-components/cta-button/spec|app-cta-button]] pink pill, `mailto:` link

> [!note] Layout: `mt-auto` vs `flex-1` spacer
> The contact zone uses `mt-auto` on its wrapper div. This pushes it to the bottom of the flex column while keeping a proportional gap, without creating an oversized empty block.

## Breakpoints (Tailwind defaults)

```
sm:   640px
md:   768px
lg:  1024px
xl:  1280px
2xl: 1536px
```
