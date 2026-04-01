---
title: "Design System v1 Archive (original monolith)"
aliases:
  - v1 archive
  - original design system
tags:
  - archive
  - design-system
date: 2026-03-31
---

> [!warning] Archive — do not edit
> This is the original monolithic `design-system.md` before it was split into individual topic files. Kept for reference only. The current source of truth is [[design-system]] (MOC) + the individual files it links to.

---

# Kacper Piłkowski — Personal Site · UI Design System

> **Version:** 2.0 (v2 redesign)
> **Stack:** Angular + Tailwind CSS
> **Theme:** Dark only
> **i18n:** EN + PL (route-based)
> **Status:** 🟡 In progress
> **Last updated:** 2026-03-31

This document is the single source of truth for the UI design of kacperpilkowski.com. It covers design tokens (mapped to Tailwind), layout architecture, component specifications, animation contracts, and UX interaction flows.

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Design Tokens (Tailwind Config)](#2-design-tokens-tailwind-config)
3. [Layout Architecture](#3-layout-architecture)
4. [Typography System](#4-typography-system)
5. [Component Library](#5-component-library)
6. [Animation & Motion Specifications](#6-animation--motion-specifications)
7. [UX Interaction Flows](#7-ux-interaction-flows)
8. [Routing & Page Architecture](#8-routing--page-architecture)
9. [Responsive Behavior](#9-responsive-behavior)
10. [Internationalization (i18n)](#10-internationalization-i18n)
11. [Accessibility Notes](#11-accessibility-notes)
12. [V2 Improvements Over V1](#12-v2-improvements-over-v1)
13. [Decisions Log](#13-decisions-log)

---

## 1. Design Principles

These principles drive every design decision. When in doubt, refer back to these.

**Terminal-Aesthetic, Not Gimmick.**
The dark theme, monospaced headings, and typewriter effects reflect real developer culture — not cosplay. Every "techy" element should feel earned, not decorative. Remove anything that looks like a theme template.

**Content Is King.**
The layout exists to surface Kacper's experience and writing. No component should compete with the content for attention. Accent color is used for emphasis and interaction feedback only.

**Motion With Purpose.**
Every animation must serve a functional goal: orient the user, confirm an action, or create a sense of place. Zero gratuitous animations.

**Consistent but Not Rigid.**
Components share tokens (colors, spacing, radii) but are not identical. Variety in size and layout is acceptable as long as it maps to a consistent visual grammar.

**Progressive Disclosure.**
Long lists (skills, experience history) hide behind "show more" interactions rather than overwhelming the initial view. The page should feel scannable at first glance.

---

## 2. Design Tokens (Tailwind Config)

All design tokens are defined in `tailwind.config.ts` and consumed via Tailwind utility classes throughout the app. Avoid raw CSS values — everything should map to a token.

### 2.1 Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      // ── Colors ─────────────────────────────────────
      colors: {
        // Backgrounds
        base:        '#12151e',    // Page & sidebar base — near-black navy
        surface:     '#1c2030',    // Card/panel backgrounds
        'surface-alt': '#141720',  // Skills grid, experience panel (darker variant)

        // Text
        primary:     '#e8eaf0',    // Body text, headings (off-white)
        muted:       '#7a8099',    // Secondary labels, timestamps, disabled
        inverse:     '#12151e',    // Text on accent backgrounds

        // Accent
        accent: {
          DEFAULT:   '#e91e8c',    // Primary brand pink
          hover:     '#ff3da3',    // Lighter pink for hover
          subtle:    'rgba(233, 30, 140, 0.12)', // Tinted bg on active
        },

        // Progress bar (skill rating)
        bar: {
          filled:    '#e91e8c',    // Accent pink — filled portion
          track:     '#2a2f42',    // Unfilled track
        },

        // Borders
        border: {
          DEFAULT:   'rgba(255, 255, 255, 0.07)',
          accent:    '#e91e8c',
        },

        // Semantic
        success:     '#4caf7d',
        warning:     '#f5a623',
        error:       '#e05c5c',
      },

      // ── Font Families ──────────────────────────────
      fontFamily: {
        mono:  ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        body:  ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },

      // ── Font Sizes (extending Tailwind defaults) ───
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],     // 12px
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
        'base': ['1rem',     { lineHeight: '1.5rem' }],    // 16px
        'lg':   ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
        'xl':   ['1.5rem',   { lineHeight: '2rem' }],      // 24px
        '2xl':  ['2rem',     { lineHeight: '2.25rem' }],   // 32px
        '3xl':  ['2.5rem',   { lineHeight: '2.75rem' }],   // 40px
      },

      // ── Spacing (Tailwind default is already 4px base) ─
      // Tailwind's default scale: 1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px, etc.
      // We use these directly. No custom overrides needed.

      // ── Border Radius ──────────────────────────────
      borderRadius: {
        'sm':   '4px',
        'md':   '8px',
        'lg':   '16px',
        'full': '9999px',
      },

      // ── Box Shadow ─────────────────────────────────
      boxShadow: {
        'sm':         '0 1px 4px rgba(0, 0, 0, 0.3)',
        'md':         '0 4px 12px rgba(0, 0, 0, 0.4)',
        'lg':         '0 8px 32px rgba(0, 0, 0, 0.55)',
        'glow-accent': '0 0 20px rgba(233, 30, 140, 0.25)',
      },

      // ── Z-index ────────────────────────────────────
      zIndex: {
        'base':    '0',
        'raised':  '10',
        'overlay': '100',
        'modal':   '200',
        'toast':   '300',
      },

      // ── Transitions ────────────────────────────────
      transitionDuration: {
        'fast':   '150ms',
        'normal': '300ms',
        'slow':   '500ms',
      },
      transitionTimingFunction: {
        'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-spring':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // ── Keyframes (for custom animations) ──────────
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        'wave-travel': {
          from: { strokeDashoffset: '0' },
          to:   { strokeDashoffset: '-200px' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-100%)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'blink':       'blink 1s step-end infinite',
        'wave':        'wave-travel 2s linear infinite',
        'fade-in-up':  'fade-in-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) both',
        'slide-down':  'slide-down 0.3s cubic-bezier(0.4, 0, 0.2, 1) both',
      },

      // ── Sidebar width (custom) ────────────────────
      width: {
        'sidebar':    '360px',
        'sidebar-md': '280px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### 2.2 Token Usage Quick Reference

| Purpose                | Tailwind class                              |
|------------------------|---------------------------------------------|
| Page background        | `bg-base`                                   |
| Card background        | `bg-surface`                                |
| Body text              | `text-primary`                              |
| Muted/secondary text   | `text-muted`                                |
| Accent highlight       | `text-accent`                               |
| Accent button bg       | `bg-accent hover:bg-accent-hover`           |
| Card border            | `border border-border`                      |
| Active border          | `border-border-accent`                      |
| Monospace heading      | `font-mono`                                 |
| Body font              | `font-body`                                 |
| Fast transition        | `duration-fast ease-default`                |
| Normal transition      | `duration-normal ease-default`              |
| Glow on hover          | `hover:shadow-glow-accent`                  |

---

## 3. Layout Architecture

### 3.1 Overall Structure (Desktop)

The layout uses a **fixed sidebar + scrollable main content** split. The sidebar is an identity anchor — always visible on desktop.

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

### 3.2 Sidebar Spec

```html
<!-- Desktop: fixed sidebar -->
<aside class="fixed inset-y-0 left-0 w-sidebar bg-base border-r border-border
              z-raised flex flex-col items-center py-10 px-8
              lg:flex  md:w-sidebar-md  max-md:hidden">
  ...
</aside>
```

**Sidebar elements (top to bottom):**

1. **Language switcher** — top-left, flag icons (EN / PL), links to `/:lang/...` routes
2. **Avatar** — circular `w-36 h-36 rounded-full`, subtle ring `ring-2 ring-border`
3. **Name** — `text-2xl font-bold text-primary font-mono`
4. **Role / Title** — `text-sm text-accent tracking-wide`
5. **"Get In Touch" label** — `text-xs text-muted uppercase tracking-widest`
6. **Social icons** — LinkedIn, GitHub. Icon size `w-6 h-6`, `text-muted hover:text-accent duration-fast`
7. **"Or" divider** — `text-xs text-muted`
8. **CTA Button** — "Say Hi!" pink pill, `mailto:` link (see Component 5.3)

### 3.3 Main Content Area

```html
<!-- Main content offset by sidebar width -->
<main class="ml-[360px] md:ml-sidebar-md lg:ml-sidebar
             max-md:ml-0
             px-16 pt-12 max-w-[960px] relative">
  ...
</main>
```

### 3.4 Content Grid (Skills Section)

```html
<div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
  <!-- skill cards -->
</div>
```

---

## 4. Typography System

### 4.1 Font Stack

```
Headings & labels:  font-mono  → JetBrains Mono → Fira Code → Consolas → monospace
Body text & prose:  font-body  → Inter → Segoe UI → system-ui → sans-serif
```

Monospace is reserved for headings, section labels, skill names, and the terminal progress bar. Body paragraphs (bio, experience descriptions, blog posts) use `font-body` for comfortable reading at length.

### 4.2 Section Heading Style

All section headings follow the terminal pattern: `[section name]_`

```html
<h2 class="font-mono text-xl font-bold text-primary mb-8 lowercase">
  experience<span class="text-accent animate-blink">_</span>
</h2>
```

The blinking `_` cursor only activates on the first heading during initial page load. All other headings show a static `_`.

---

## 5. Component Library

Each component entry covers: purpose, anatomy, Tailwind classes, states, and Angular notes.

---

### 5.1 Skill Card (v2 — Terminal Progress Bar)

**Purpose:** Display a single skill/technology with a proficiency level using a terminal-style progress bar instead of stars.

**Anatomy:**
```
┌─────────────────────────────────────┐
│  C#                                 │
│  [████████████████████░░░░░] 80%    │
└─────────────────────────────────────┘
```

The progress bar uses block characters to match the terminal aesthetic. The filled portion uses the accent color; the track is a muted dark tone.

**Tailwind implementation:**

```html
<div class="bg-surface-alt border border-border rounded-md p-4 min-h-[72px]
            hover:bg-surface hover:border-border-accent hover:-translate-y-0.5
            transition-all duration-fast">

  <!-- Skill name -->
  <span class="font-mono text-sm text-primary">C#</span>

  <!-- Progress bar container -->
  <div class="mt-2 flex items-center gap-3">

    <!-- Track (full bar background) -->
    <div class="flex-1 h-2.5 bg-bar-track rounded-sm overflow-hidden">
      <!-- Filled portion -->
      <div class="h-full bg-bar-filled rounded-sm transition-all duration-normal"
           [style.width.%]="skill.level">
      </div>
    </div>

    <!-- Percentage label (optional, shown on hover or always) -->
    <span class="font-mono text-xs text-muted w-8 text-right">80%</span>

  </div>
</div>
```

**Alternative: block-character rendering (pure terminal look)**

For an even stronger terminal feel, render the bar using monospace block characters instead of a `<div>`:

```html
<span class="font-mono text-sm text-bar-filled">████████</span><!--
--><span class="font-mono text-sm text-bar-track">░░░░</span>
```

This can be generated dynamically: `level / 10` filled blocks (`█`) and `10 - (level / 10)` empty blocks (`░`). The percentage label appears after the bar: `80%`.

| Property       | Tailwind classes / value                     |
|----------------|----------------------------------------------|
| Background     | `bg-surface-alt`                             |
| Border         | `border border-border`                       |
| Border radius  | `rounded-md`                                 |
| Padding        | `p-4`                                        |
| Min height     | `min-h-[72px]`                               |
| Bar filled     | `bg-bar-filled` (accent pink `#e91e8c`)      |
| Bar track      | `bg-bar-track` (`#2a2f42`)                   |
| Bar height     | `h-2.5` (10px)                               |

**Proficiency scale mapping:**

| Label       | Level  | Bars (of 10) |
|-------------|--------|--------------|
| Expert      | 90–100 | █████████░   |
| Advanced    | 70–89  | ████████░░   |
| Proficient  | 50–69  | ██████░░░░   |
| Familiar    | 30–49  | ████░░░░░░   |
| Exploring   | 10–29  | ██░░░░░░░░   |

**States:**
- Default: standard background
- Hover: `bg-surface`, `border-border-accent`, `-translate-y-0.5`, `duration-fast`
- Hidden (collapsed): `opacity-0 scale-95`, not in tab order

**Angular component:** `<app-skill-card [skill]="skill" />`

**Accessibility:** `role="meter"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label="C# proficiency: 80%"`

---

### 5.2 Skills Section (with search + show more)

**Purpose:** Display a searchable, collapsible grid of skills.

**States:**
- Collapsed: shows first 18 skills (3 rows × 6 columns at default grid)
- Expanded: all skills visible
- Filtered: shows only skills matching search query

**Search input:**

```html
<div class="relative mb-6">
  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted">...</svg>
  <input type="text"
         placeholder="Search by skill..."
         class="w-full bg-surface-alt border border-border rounded-md
                pl-10 pr-4 py-2 text-sm text-primary font-mono
                placeholder:text-muted
                focus:border-border-accent focus:outline-none
                transition-colors duration-fast" />
</div>
```

- Inline, no overlay
- On input: filters skill cards in place (no network call)
- Filtered-out cards: `opacity-0 scale-95`, `duration-normal`

**Show more / Show less button:**

```html
<button class="text-sm text-muted hover:text-accent transition-colors duration-fast
               font-mono cursor-pointer">
  Show more
</button>
```

- On click: skills grid `max-height` animates via Angular `@expandCollapse` trigger
- New skills fade in with stagger (`20ms` per card)

---

### 5.3 CTA Button ("Say Hi!")

**Purpose:** Primary contact call-to-action in the sidebar. Opens `mailto:kacperpilkowski@gmail.com`.

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

---

### 5.4 Experience Timeline

**Purpose:** Navigate and display work history entries.

**Anatomy:**
```
┌────────────────────┬──────────────────────────────────┐
│ Timeline nav       │ Detail panel                     │
│                    │                                  │
│ ▌ 2022 June ←sel  │ [Job title at Company]           │
│   2019 November    │ [Description paragraph(s)]       │
│   2017 November    │                                  │
│   2017 July        │                                  │
└────────────────────┴──────────────────────────────────┘
```

**Timeline nav item:**

```html
<!-- Default state -->
<button class="text-sm font-mono text-muted py-1 pl-3 border-l-[3px] border-transparent
               hover:text-accent transition-colors duration-fast">
  2019 November
</button>

<!-- Selected state -->
<button class="text-sm font-mono text-accent py-1 pl-3 border-l-[3px] border-accent">
  2022 June
</button>
```

**Detail panel behavior:**
- On selection change: content fades out (`opacity-0`, `150ms`), then fades in (`opacity-100`, `150ms`)
- Panel `min-h-[200px]`; height animates via Angular animation with `ease-spring` if content differs in height

**Detail panel:**

```html
<div class="bg-surface-alt rounded-md p-6 min-h-[200px]">
  <h3 class="text-lg font-bold text-primary font-body">
    Senior Software Developer <span class="text-accent">at Xebia</span>
  </h3>
  <p class="mt-4 text-base text-primary leading-relaxed font-body">
    Description text...
  </p>
</div>
```

---

### 5.5 Education Timeline

**Purpose:** Display academic history on a vertical timeline.

```
2021 Jul ──●── MASTER'S DEGREE IN "IT IN BUSINESS — BIG DATA"
               Wroclaw University of Economics and Business

2019 Nov ──○──

2018 Mar ──●── ENGINEER'S DEGREE IN "COMPUTER SCIENCE"
               Wroclaw University of Science and Technology

2014 Nov ──○──
```

| Element          | Tailwind classes                                            |
|------------------|-------------------------------------------------------------|
| Timeline line    | `border-l-2 border-border`                                  |
| Dot (entry)      | `w-2.5 h-2.5 rounded-full bg-accent`                       |
| Dot (range end)  | `w-2 h-2 rounded-full bg-border`                           |
| Date label       | `text-xs text-muted font-mono`                             |
| Entry title      | `text-sm font-bold uppercase text-primary font-mono`       |
| Institution      | `text-sm text-muted font-body`                             |

---

### 5.6 Language Card

```html
<div class="flex items-center gap-4 bg-surface rounded-md p-4 px-6">
  <img src="/assets/flags/pl.svg" class="w-8 h-8 rounded-full" alt="Polish flag" />
  <div>
    <span class="text-base font-bold text-primary font-body">Polish</span>
    <span class="text-sm text-muted font-body ml-2">— Native tongue</span>
  </div>
</div>
```

---

### 5.7 Project List Item (v2 new)

**Purpose:** Minimal display of a notable project. This is a compact list — not full case study cards.

**Anatomy:**
```
┌───────────────────────────────────────────────────────┐
│ > Project Name                              [GitHub]  │
│   One-line description of the project                 │
│   Angular · .NET · Azure                              │
└───────────────────────────────────────────────────────┘
```

```html
<div class="py-4 border-b border-border group">
  <div class="flex items-center justify-between">
    <h3 class="font-mono text-base text-primary">
      <span class="text-accent mr-2">></span>Project Name
    </h3>
    <a href="..." class="text-muted hover:text-accent transition-colors duration-fast">
      <!-- GitHub icon -->
    </a>
  </div>
  <p class="text-sm text-muted font-body mt-1">
    One-line description of the project
  </p>
  <div class="flex gap-2 mt-2">
    <span class="text-xs font-mono text-accent bg-accent-subtle px-2 py-0.5 rounded-sm">
      Angular
    </span>
    <span class="text-xs font-mono text-accent bg-accent-subtle px-2 py-0.5 rounded-sm">
      .NET
    </span>
  </div>
</div>
```

The `>` prefix mirrors a terminal prompt, reinforcing the aesthetic.

---

### 5.8 Article Search Overlay

**Purpose:** Full-site article search, triggered from the persistent search bar.

**Trigger:** User clicks the "Search article..." bar in the top-right of the main content area.

**Behavior:**
1. Entire page blurs (`backdrop-blur-lg`, `duration-slow`)
2. Centered overlay appears: `animate-slide-down`
3. Input auto-focused
4. Results update as user types (debounced `300ms`)
5. `Escape` or backdrop click dismisses

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-base/85 backdrop-blur-lg z-overlay
            transition-opacity duration-slow">
</div>

<!-- Overlay panel -->
<div class="fixed top-12 left-1/2 -translate-x-1/2
            w-[min(640px,90vw)] bg-surface border border-border-accent
            rounded-md shadow-lg z-overlay
            animate-slide-down">
  <input type="text" autofocus placeholder="Search articles..."
         class="w-full bg-transparent border-b border-border
                px-6 py-4 text-lg text-primary font-mono
                placeholder:text-muted focus:outline-none" />
  <div class="max-h-[60vh] overflow-y-auto p-4">
    <!-- Search results here -->
  </div>
</div>
```

**Keyboard:** `Escape` closes overlay, restores focus to trigger element.

---

### 5.9 Blog Post Card (v2 new)

**Purpose:** Preview card for a blog entry on the home page and blog listing page.

```
┌─────────────────────────────────────────────────┐
│  [Tag: Architecture]           [Date: Mar 2026]  │
│                                                  │
│  How I Approach Event-Driven System Design       │
│                                                  │
│  Short excerpt of 2–3 lines…                     │
│                                                  │
│  → Read article                                  │
└─────────────────────────────────────────────────┘
```

```html
<article class="bg-surface border border-border rounded-md p-6
                hover:border-border-accent hover:shadow-md hover:-translate-y-0.5
                transition-all duration-fast group">
  <div class="flex justify-between items-center mb-3">
    <span class="text-xs font-mono uppercase text-accent bg-accent-subtle
                 px-2 py-0.5 rounded-sm">Architecture</span>
    <time class="text-xs text-muted font-mono">Mar 2026</time>
  </div>
  <h3 class="text-lg font-bold text-primary font-body leading-tight">
    How I Approach Event-Driven System Design
  </h3>
  <p class="mt-2 text-sm text-muted font-body line-clamp-2">
    Short excerpt of the article content...
  </p>
  <span class="mt-4 inline-flex items-center text-sm text-accent font-mono
               group-hover:translate-x-1 transition-transform duration-fast">
    → Read article
  </span>
</article>
```

---

### 5.10 Section Heading Component

```html
<app-section-heading label="experience" />

<!-- Renders: -->
<h2 class="font-mono text-xl font-bold text-primary mb-8 lowercase">
  experience<span class="text-accent animate-blink">_</span>
</h2>
```

The `animate-blink` class comes from the Tailwind keyframes defined in the config. Only the first section heading on page load gets the blinking cursor; all others show a static `_` via `opacity-100` (no animation).

---

### 5.11 Language Switcher

**Purpose:** Toggle between EN and PL versions of the site.

```html
<div class="flex gap-2">
  <a [routerLink]="'/en' + currentPath"
     class="w-6 h-6 rounded-full overflow-hidden ring-2"
     [class]="isEn ? 'ring-accent' : 'ring-transparent opacity-50 hover:opacity-100'"
     >
    <img src="/assets/flags/gb.svg" alt="English" />
  </a>
  <a [routerLink]="'/pl' + currentPath"
     class="w-6 h-6 rounded-full overflow-hidden ring-2"
     [class]="isPl ? 'ring-accent' : 'ring-transparent opacity-50 hover:opacity-100'"
     >
    <img src="/assets/flags/pl.svg" alt="Polski" />
  </a>
</div>
```

Active language is indicated by an accent-colored ring and full opacity. Inactive flag is dimmed to 50%.

---

## 6. Animation & Motion Specifications

All animations use Angular's `@angular/animations` module or Tailwind's CSS keyframes. Each animation is documented with trigger, timing, and implementation.

All non-essential animations respect `prefers-reduced-motion`:

```scss
// global styles
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 6.1 Network/Constellation Background

**Location:** Main content area background canvas (`<canvas>`)
**Angular service:** `NetworkBackgroundService`

**Behavior:**
- ~80–120 dots distributed randomly across canvas
- Each dot drifts toward upper-left at ~`0.3px/frame`
- When a dot exits top-left, it respawns at bottom-right
- Any two dots within `120px` are connected by a line
- Line opacity: `1 - (distance / 120)` — fades as dots separate
- Dot size: `2–4px` radius (randomized)
- Colors: dots `rgba(233, 30, 140, 0.4)`, lines `rgba(255, 255, 255, 0.05)`

**Performance:**
- Use `requestAnimationFrame`
- Pause when tab is not visible (`document.visibilitychange`)
- On mobile (`< 768px`): reduce to ~40 dots for battery/performance

---

### 6.2 Typewriter Effect (Hero heading)

**Trigger:** On initial page load, `about me_` types character by character.

| Property        | Value                                    |
|-----------------|------------------------------------------|
| Character delay | `80ms` per character                     |
| Cursor          | `_`, `text-accent`, blinks after typing  |
| Start delay     | `300ms` after page load                  |
| Replay on nav   | No — first visit or hard refresh only    |

---

### 6.3 Wave / Serpentine Decoration

**Location:** Between bio text and skills section.

An SVG sine wave that travels leftward infinitely using the `animate-wave` Tailwind class defined in config.

```html
<svg class="w-16 h-4 my-6" viewBox="0 0 64 16">
  <path d="M0,8 Q8,0 16,8 Q24,16 32,8 Q40,0 48,8 Q56,16 64,8"
        class="stroke-accent stroke-[3px] fill-none animate-wave" />
</svg>
```

---

### 6.4 Show More / Collapse (Skills)

**Angular animation trigger:** `@expandCollapse`

```typescript
trigger('expandCollapse', [
  state('collapsed', style({ maxHeight: '{{collapsedHeight}}' }), { params: { collapsedHeight: '240px' } }),
  state('expanded',  style({ maxHeight: '2000px' })),
  transition('collapsed <=> expanded', animate('300ms cubic-bezier(0.34, 1.56, 0.64, 1)')),
])
```

Hidden skill cards fade in with stagger: `opacity-0 scale-95 → opacity-100 scale-100`, each card delayed by `index * 20ms`.

---

### 6.5 Experience Content Transition

**Trigger:** User clicks a different date in the timeline nav.

```
Phase 1 (0 → 150ms):    Current content fades out (opacity 1 → 0)
Phase 2 (150ms → ?):    Panel height animates if content height differs
Phase 3 (150ms → 300ms): New content fades in (opacity 0 → 1)
```

Panel height uses `ease-spring` easing. Implemented via Angular `@contentSwap` animation trigger.

---

### 6.6 Article Search Overlay

**Open:** Backdrop `opacity-0 → opacity-100` over `500ms`, panel `animate-slide-down`.

**Close:** Panel `opacity-100 → opacity-0` + `translateY(-12px)` over `150ms`, backdrop fades over `300ms`.

**Keyboard:** `Escape` closes overlay, restores focus.

---

### 6.7 Section Entry Animations

On first scroll into view (Intersection Observer with `threshold: 0.1`):

```typescript
trigger('sectionEnter', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(24px)' }),
    animate('500ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0)' }))
  ])
])
```

Tailwind alternative for simple cases: `animate-fade-in-up` class.

---

## 7. UX Interaction Flows

### 7.1 First Load Flow (Desktop)

```
Browser loads page
  │
  ▼
Sidebar renders immediately (no animation)
  │
  ▼
Background canvas initializes (fades in over 300ms)
  │
  ▼
"about me_" typewriter starts (300ms delay)
  │
  ▼
Remaining sections animate in on scroll (Intersection Observer)
```

### 7.2 First Load Flow (Mobile)

```
Browser loads page
  │
  ▼
Full-screen sidebar panel renders (profile, name, role, links, CTA)
  │
  ▼
Scroll indicator visible at bottom (animated chevron + "scroll down")
  │
  ▼
User scrolls/swipes down
  │
  ▼
Sidebar scrolls up naturally (it's part of the page flow, not fixed)
  │
  ▼
Main content sections appear below
  │
  ▼
Sections animate in on scroll
```

### 7.3 Article Search Flow

```
User clicks "Search article..." bar
  │
  ▼
Page blurs, overlay appears, input focused
  │
  ▼
User types → results update (debounced 300ms)
  │
  ├─ Results found → article cards appear with staggered fade-in
  └─ No results → "No articles found for '...'" message
        │
        ▼
User clicks result → navigates to /blog/:slug (Angular Router)
        OR
User presses Escape → overlay closes
```

### 7.4 Skill Search Flow

```
User types in skill search bar (inline, no overlay)
  │
  ▼
Skills grid filters live (local data, no debounce needed)
  │
  ├─ Match → visible, others fade out (opacity + scale)
  └─ No match → "No skills matching '...'"
        │
        ▼
User clears input → all skills fade back in
```

### 7.5 Experience Navigation Flow

```
Hover date → text turns pink (150ms)
  │
  ▼
Click date → selected border + pink text
  │
  ▼
Detail panel: old content fades out (150ms) → height adjusts → new content fades in (150ms)
```

### 7.6 Skills Show More Flow

```
Hover "Show more" → text turns pink (150ms)
  │
  ▼
Click → label changes to "Show less"
  │
  ▼
Grid expands (300ms, spring easing) → hidden cards fade in (20ms stagger)
  │
  ▼
Click "Show less" → grid collapses (reverse, no stagger)
```

---

## 8. Routing & Page Architecture

The site uses **Angular Router** with route-based i18n. The home page is a single scroll with all CV sections. Blog is a separate page type.

### 8.1 Route Map

```
/:lang/                     → Home page (CV: about, skills, experience, education, languages, projects, blog preview)
/:lang/blog                 → Blog listing page (all articles)
/:lang/blog/:slug           → Individual blog article

Where :lang = "en" | "pl"
Default redirect: / → /en/
```

### 8.2 Page Types

**Home Page (CV)**
Single scrollable page with all sections. Fixed sidebar on desktop, full-screen intro on mobile. This is the "virtual business card" — it should load fast and feel complete.

**Blog Listing Page**
Grid or list of all blog post cards. Same sidebar layout. Article search overlay works here too. Filtered by language.

**Blog Article Page**
Full-width article content (no sidebar-constrained reading width). Layout:
- Top: back link (`← Back to blog`), article title, date, tags
- Body: `max-w-[720px] mx-auto` prose area, `font-body leading-relaxed`
- Bottom: related articles or "next/prev" links
- Sidebar: stays visible on desktop (consistent identity)

### 8.3 Blog Content Strategy

Blog articles are stored as **Markdown files** in the Angular project and rendered at build time or via a runtime markdown parser (e.g., `ngx-markdown`). No external CMS for v2 — keeps it simple.

```
/src/content/blog/
  en/
    event-driven-design.md
    azure-functions-patterns.md
  pl/
    event-driven-design.md
```

Each markdown file has frontmatter:
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

---

## 9. Responsive Behavior

### 9.1 Breakpoints (Tailwind defaults)

```
sm:   640px
md:   768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### 9.2 Layout Shifts

| Viewport      | Sidebar                              | Main content          |
|---------------|--------------------------------------|-----------------------|
| `lg:` (≥1024) | Fixed left, `w-sidebar` (360px)     | `ml-sidebar`          |
| `md:` (≥768)  | Fixed left, `w-sidebar-md` (280px)  | `ml-sidebar-md`       |
| `< md` (mobile)| Full-screen intro panel (in flow)  | Full width below      |

### 9.3 Mobile Layout (< 768px) — Full-Screen Sidebar Intro

On mobile, the sidebar is **not fixed** and **not a hamburger drawer**. Instead, it renders as a full-viewport intro panel that is part of the normal page scroll flow. The user scrolls past it to reach the content.

```html
<!-- Mobile: full-screen intro (visible only < md) -->
<section class="md:hidden min-h-screen flex flex-col items-center justify-center
                bg-base px-8 relative">

  <!-- Language switcher -->
  <div class="absolute top-4 left-4 flex gap-2">...</div>

  <!-- Profile content (same as sidebar) -->
  <img src="..." class="w-36 h-36 rounded-full ring-2 ring-border" />
  <h1 class="mt-6 text-2xl font-bold font-mono text-primary">Kacper Piłkowski</h1>
  <p class="text-sm text-accent tracking-wide">Solution Architect</p>

  <!-- Social + CTA -->
  <div class="mt-6 flex gap-4">...</div>
  <a href="mailto:..." class="mt-4 bg-accent text-inverse rounded-full px-8 py-3 ...">
    Say Hi!
  </a>

  <!-- Scroll indicator at bottom -->
  <div class="absolute bottom-8 flex flex-col items-center animate-bounce">
    <span class="text-xs text-muted font-mono mb-2">scroll down</span>
    <svg class="w-5 h-5 text-muted">
      <!-- Chevron down icon -->
    </svg>
  </div>
</section>

<!-- Main content (flows directly below on mobile) -->
<main class="md:ml-sidebar-md lg:ml-sidebar px-6 md:px-16 pt-12 max-w-[960px]">
  ...
</main>
```

**Key behaviors:**
- The intro panel is `min-h-screen` so it fills the entire viewport initially
- Content sits directly below in the normal document flow
- The `animate-bounce` chevron hints that there's more below
- As the user scrolls, the intro slides up naturally — no special JS needed
- On desktop the sidebar stays fixed and this mobile section is hidden via `md:hidden`
- Background constellation animation also runs behind this panel on mobile (with reduced dot count)

### 9.4 Mobile Component Adaptations

| Component           | Mobile adaptation                                              |
|---------------------|----------------------------------------------------------------|
| Skills grid         | `grid-cols-[repeat(auto-fill,minmax(140px,1fr))]`             |
| Experience timeline | Stack vertically: dates above, detail below (no side-by-side) |
| Education timeline  | Same structure, narrower padding                               |
| Blog cards          | Single column, full width                                      |
| Article search      | Overlay goes full-width, `top-4`                               |
| Article page        | Full-width prose, no sidebar overlap                           |

---

## 10. Internationalization (i18n)

### 10.1 Strategy

Route-based language switching: `/en/...` and `/pl/...`. All UI chrome and content is translated.

### 10.2 Implementation

Use Angular's built-in i18n or `@ngx-translate/core` for runtime switching. Recommended: **`@ngx-translate`** for simpler setup with JSON translation files.

```
/src/assets/i18n/
  en.json
  pl.json
```

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

### 10.3 Content Translation

- **UI strings:** JSON translation files (see above)
- **CV content (bio, experience descriptions):** Separate JSON or markdown files per language
- **Blog posts:** Separate markdown files per language (see section 8.3)

### 10.4 Language Detection

On first visit with no language prefix (`/`), detect browser language:
- If `navigator.language.startsWith('pl')` → redirect to `/pl/`
- Otherwise → redirect to `/en/`

Store preference in a cookie for return visits.

---

## 11. Accessibility Notes

- All interactive elements: `:focus-visible` outline using `ring-2 ring-accent ring-offset-2 ring-offset-base`
- Skill progress bars: `role="meter"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label="C# proficiency: 80%"`
- Experience timeline: `role="listbox"` on date list, `aria-selected` on active item, `aria-live="polite"` on detail panel
- Search overlay: `role="dialog"`, `aria-modal="true"`, focus trap within overlay, `aria-label="Search articles"`
- Blog cards: `<article>` element, meaningful `<h3>` for title
- Language switcher: `aria-label="Switch language to English/Polski"`, `aria-current="true"` on active
- Mobile scroll indicator: `aria-hidden="true"` (purely decorative)
- `prefers-reduced-motion`: disable all non-essential animations
- Color contrast: all text on dark backgrounds meets WCAG AA (`4.5:1` for body, `3:1` for large text)
- Skip link: hidden `<a>` before sidebar that jumps to `#main-content` on focus

---

## 12. V2 Improvements Over V1

| Area               | V1                             | V2                                                  |
|--------------------|--------------------------------|-----------------------------------------------------|
| Role               | ".NET developer"               | "Solution Architect"                                |
| Skill rating       | Gold stars (5-star scale)      | Terminal progress bar (accent pink, monospace)       |
| Blog               | Not present                    | In-app blog with Markdown articles + Angular Router |
| Projects           | Not present                    | Minimal list with terminal `>` prompt prefix        |
| Mobile layout      | Stacked sidebar (not optimized)| Full-screen intro + scroll indicator                |
| Styling            | Custom SCSS                    | Tailwind CSS with custom config                     |
| Section animations | None                           | Intersection Observer fade-in on scroll             |
| Font system        | All monospace                  | Monospace headings + Inter body                     |
| Performance        | Canvas always running          | Pause on hidden tab; fewer dots on mobile           |
| Social links       | LinkedIn, Instagram, Facebook  | LinkedIn, GitHub                                    |
| i18n               | Flag click (unclear behavior)  | Route-based EN + PL with `@ngx-translate`           |
| Contact            | Unclear behavior               | `mailto:` link (simple, no backend)                 |
| Theme              | Dark only                      | Dark only (intentional brand decision)              |
| Analytics          | Unknown                        | Google Analytics (with cookie consent)              |

---

## 13. Decisions Log

All open decisions have been resolved. This log records what was decided and why.

| # | Decision                     | Resolution                            | Rationale                                                          |
|---|------------------------------|---------------------------------------|--------------------------------------------------------------------|
| 1 | Projects section?            | **Yes — minimal list**                | Shows work without overwhelming the CV page. Can expand later.     |
| 2 | Contact interaction          | **`mailto:` link**                    | Simple, no backend. Opens user's email client.                     |
| 3 | Blog routing                 | **In-app (Angular Router)**           | Full control over design, SEO, and reading experience.             |
| 4 | Skill rating display         | **Terminal progress bar**             | Consistent with terminal aesthetic. Pink bar on dark track.        |
| 5 | i18n strategy                | **Route-based EN + PL**              | Full bilingual site. Polish audience is significant.               |
| 6 | Analytics                    | **Google Analytics**                  | Industry standard. Requires cookie consent banner.                 |
| 7 | Dark mode / light mode?      | **Dark only**                         | The terminal aesthetic IS the brand. Light mode would dilute it.   |
| 8 | Mobile sidebar behavior      | **Full-screen intro, scroll to reveal**| Natural scroll UX. No hamburger. Indicator hints at content below. |

---

*Document maintained by Kacper Piłkowski. Update this file whenever a design decision is made or a component spec changes.*
