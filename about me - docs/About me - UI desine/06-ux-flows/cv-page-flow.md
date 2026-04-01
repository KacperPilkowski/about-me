---
title: "UX Flow: CV Page (Home)"
aliases:
  - cv flow
  - home page flow
  - progressive disclosure
tags:
  - design-system
  - ux-flow
  - cv
  - home
date: 2026-03-31
source: "[[design-system#7. UX Interaction Flows]]"
---

# UX Flow: CV Page (Home)

See also: [[routing-structure]] | [[desktop-layout]] | [[mobile-layout]] | [[keyframes#fade-in-up]]

## Entry Point

User lands on `/:lang/` — the full CV page (see [[routing-structure#Route Table]]).

## First Load — Desktop

```
Browser loads page
  │
  ▼
Sidebar renders immediately (no animation)
  │
  ▼
Background canvas initialises (fades in over 300ms)
  │
  ▼
"about me_" typewriter starts (300ms delay)
  │
  ▼
Remaining sections animate in on scroll (Intersection Observer)
```

## First Load — Mobile

```
Browser loads page
  │
  ▼
Full-screen intro panel renders (profile, name, role, links, CTA)
  │
  ▼
Scroll indicator visible at bottom (animated chevron + "scroll down")
  │
  ▼
User scrolls/swipes down
  │
  ▼
Intro slides up naturally (part of page flow, not fixed)
  │
  ▼
Main content sections appear below → animate in on scroll
```

## Scroll-Triggered Section Reveal

As the user scrolls, each section animates in via `animate-fade-in-up` when it enters the viewport (Intersection Observer, threshold: 0.15).

**Section order:**
1. About me
2. Skills
3. Experience
4. Education
5. Languages
6. Projects
7. Blog preview

## Skill Search Flow

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

See also: [[About me - UI desine/04-components/skills-section/spec|Skills Section]]

## Skills Show More Flow

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

## Experience Navigation Flow

```
Hover date → text turns pink (150ms)
  │
  ▼
Click date → selected border + pink text
  │
  ▼
Detail panel: old content fades out (150ms) → height adjusts → new content fades in (150ms)
```

See also: [[About me - UI desine/04-components/experience-timeline/spec|Experience Timeline]] | [[keyframes#@contentSwap (Experience panel)]]

## Progressive Disclosure — Experience

- Default: first 3 experience entries visible
- "Show full history" button at the bottom of the timeline
- All entries animate in (`animate-fade-in-up`) when expanded

## Progressive Disclosure — Projects

- Default: first 4 projects visible
- "View all projects →" link at the bottom (navigates or expands in-place — TBD, see [[decisions#Projects section — expand in-place or navigate?]])

## CTA Interactions

- "Download CV" → triggers file download (PDF)
- "Contact" → scrolls to email or opens mail client
