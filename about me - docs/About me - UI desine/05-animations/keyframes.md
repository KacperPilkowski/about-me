---
title: Keyframes & Animation Definitions
aliases:
  - keyframes
  - animations
  - blink
  - fade-in-up
  - slide-down
  - wave-travel
tags:
  - design-system
  - animation
  - tokens
date: 2026-03-31
source: "[[design-system#2.1 Tailwind Configuration]]"
---

# Keyframes & Animation Definitions

All keyframes are defined in `tailwind.config.ts` and consumed via Tailwind animation utility classes.

See also: [[motion-rules]] | [[interaction-transitions]] | [[spacing-and-sizing#Transitions]]

## Defined Keyframes

### blink
```
'0%, 100%': { opacity: '1' }
'50%':      { opacity: '0' }
```
**Class:** `animate-blink`
**Use:** Blinking cursor `_` in terminal headings ([[About me - UI desine/04-components/section-heading/spec|app-section-heading]]) and typewriter effects.
**Duration:** 1s, step-end, infinite.

---

### fade-in-up
```
from: { opacity: '0', transform: 'translateY(24px)' }
to:   { opacity: '1', transform: 'translateY(0)' }
```
**Class:** `animate-fade-in-up`
**Use:** Section entry animations as the user scrolls down. Triggered by Intersection Observer.
**Duration:** 0.5s, `cubic-bezier(0.4, 0, 0.2, 1)`, fill: both.

---

### slide-down
```
from: { opacity: '0', transform: 'translateY(-100%)' }
to:   { opacity: '1', transform: 'translateY(0)' }
```
**Class:** `animate-slide-down`
**Use:** [[About me - UI desine/04-components/article-search-overlay/spec|Search overlay]] opening animation.
**Duration:** 0.3s, `cubic-bezier(0.4, 0, 0.2, 1)`, fill: both.

---

### wave-travel
```
from: { strokeDashoffset: '0' }
to:   { strokeDashoffset: '-200px' }
```
**Class:** `animate-wave`
**Use:** SVG sine wave between bio text and skills section.
**Duration:** 2s, linear, infinite.

```html
<svg class="w-16 h-4 my-6" viewBox="0 0 64 16">
  <path d="M0,8 Q8,0 16,8 Q24,16 32,8 Q40,0 48,8 Q56,16 64,8"
        class="stroke-accent stroke-[3px] fill-none animate-wave" />
</svg>
```

---

## Angular Animation Triggers

These are implemented with `@angular/animations`, not Tailwind keyframes.

### @expandCollapse (Skills show more)

```typescript
trigger('expandCollapse', [
  state('collapsed', style({ maxHeight: '{{collapsedHeight}}' }),
        { params: { collapsedHeight: '240px' } }),
  state('expanded',  style({ maxHeight: '2000px' })),
  transition('collapsed <=> expanded',
    animate('300ms cubic-bezier(0.34, 1.56, 0.64, 1)')),
])
```

Hidden cards fade in with stagger: `opacity-0 scale-95 → opacity-100 scale-100`, each card delayed by `index * 20ms`.

See also: [[About me - UI desine/04-components/skills-section/spec|Skills Section]]

---

### @contentSwap (Experience panel)

```
Phase 1 (0 → 150ms):    Current content fades out (opacity 1 → 0)
Phase 2 (150ms → ?):    Panel height animates if content height differs (ease-spring)
Phase 3 (150ms → 300ms): New content fades in (opacity 0 → 1)
```

See also: [[About me - UI desine/04-components/experience-timeline/spec|Experience Timeline]]

---

### @sectionEnter (Scroll reveal)

```typescript
trigger('sectionEnter', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(24px)' }),
    animate('500ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0)' }))
  ])
])
```

Triggered by Intersection Observer with `threshold: 0.1`. Tailwind alternative for simple cases: `animate-fade-in-up`.

---

### Typewriter Effect (Hero heading)

| Property        | Value                                    |
|-----------------|------------------------------------------|
| Character delay | `80ms` per character                     |
| Cursor          | `_`, `text-accent`, blinks after typing  |
| Start delay     | `300ms` after page load                  |
| Replay on nav   | No — first visit or hard refresh only    |

> [!note] Blink behaviour
> Only the first [[About me - UI desine/04-components/section-heading/spec|section heading]] on page load gets the blinking cursor. All others show a static `_`.
