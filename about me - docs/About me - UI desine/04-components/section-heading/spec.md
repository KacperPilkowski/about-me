---
title: "Component: app-section-heading"
aliases:
  - section heading
  - app-section-heading
  - typewriter heading
tags:
  - design-system
  - component
  - layout
  - animation
date: 2026-04-03
source: "[[design-system#5. Component Library]]"
---

# Component: app-section-heading

See also: [[keyframes#blink]] | [[keyframes#Typewriter Effect]] | [[font-usage-rules]] | [[motion-rules]] | [[decisions#Orchestrated sequential typewriter]]

## Purpose

Consistent heading for each content section (About, Experience, Skills, etc.) with a terminal-aesthetic style. Participates in the orchestrated typewriter sequence driven by `app-home`: the parent controls which heading is active and when typing starts. The component is purely reactive — it animates when told to, emits when done.

Supports four heading levels (`h1`–`h4`) via the `level` input, sharing identical visual treatment scaled by a size token.

## Anatomy

Three distinct visual states:

```
(inactive — before typing)
  [invisible placeholder] heading text  [invisible _]
  ─────────────────────────────────────────────────

(active — currently typing)
  > heading text_
  ─────────────────────────────────────────────────

(done — typing complete, focus elsewhere)
  * heading text  [invisible _]
  ─────────────────────────────────────────────────
```

- **Prefix**: `>` (`text-accent`) when active · `*` (`text-muted`) when done · invisible `>` placeholder before typing — prevents layout shift
- **Label**: animated `displayedText` signal; `opacity-0` during SSR/hydration, visible once `isBrowser` is `true`
- **Cursor**: `_` in `text-accent`, visible + blinking only when `active`, invisible otherwise — always in the DOM to prevent layout shift
- **Divider**: `border-b border-border` below the heading row

## Tailwind Classes

Heading level and size are computed dynamically. The `headingClass` computed signal returns the full class string from a Record lookup:

```ts
protected headingClass = computed(() => {
  const sizeByLevel: Record<1 | 2 | 3 | 4, string> = {
    1: 'text-3xl',
    2: 'text-xl',
    3: 'text-lg',
    4: 'text-base',
  };
  return `font-mono ${sizeByLevel[this.level()]} text-primary flex items-baseline gap-1`;
});
```

The template uses `@switch` to render the correct heading element, then a shared `ng-template` for the inner content (avoids duplication):

```html
<div class="mb-8">
  @switch (level()) {
    @case (1) { <h1 [class]="headingClass()" [attr.aria-label]="title()">
      <ng-container *ngTemplateOutlet="innerContent" />
    </h1> }
    @case (2) { <h2 [class]="headingClass()" [attr.aria-label]="title()">
      <ng-container *ngTemplateOutlet="innerContent" />
    </h2> }
    @case (3) { <h3 [class]="headingClass()" [attr.aria-label]="title()">
      <ng-container *ngTemplateOutlet="innerContent" />
    </h3> }
    @case (4) { <h4 [class]="headingClass()" [attr.aria-label]="title()">
      <ng-container *ngTemplateOutlet="innerContent" />
    </h4> }
  }
  <div class="border-b border-border mt-2"></div>
</div>

<ng-template #innerContent>
  @if (active()) {
    <span aria-hidden="true" class="text-accent">&gt;</span>
  } @else if (typingDone()) {
    <span aria-hidden="true" class="text-muted">*</span>
  } @else {
    <span aria-hidden="true" class="invisible">&gt;</span>
  }
  <span aria-hidden="true" [class.opacity-0]="!isBrowser()">{{ displayedText() }}</span>
  <span
    aria-hidden="true"
    class="text-accent"
    [class.animate-blink]="active()"
    [class.invisible]="!active()"
  >_</span>
</ng-template>
```

> [!note] Tailwind safelist required
> `headingClass()` is a dynamically-constructed string — Tailwind's content scanner may not detect the classes inside the template literal. `styles.css` must include:
> ```css
> @source inline("font-mono text-3xl text-xl text-lg text-base text-primary flex items-baseline gap-1");
> ```
> `animate-blink` is handled separately via `@utility animate-blink { ... }`.
> See [[decisions#Tailwind @source inline for dynamic class strings]].

## States

| State | Prefix | `displayedText` span | Cursor |
|-------|--------|---------------------|--------|
| SSR / prerender | invisible (no `active`) | `opacity-0`, contains full `title()` | invisible |
| Hydrating (pre-`afterNextRender`) | invisible | `opacity-0`, contains full `title()` | invisible |
| Browser ready, inactive | invisible `>` placeholder | visible, `''` | invisible |
| Active — typing | `>` `text-accent` | visible, growing char by char | visible, blinking |
| Done (focus moved) | `*` `text-muted` | visible, full title | invisible |
| Active + done (h1 cycling) | `>` `text-accent` | visible, cycling phrases | visible, blinking |

> [!warning] Layout-shift prevention
> The prefix and cursor spans are **always present in the DOM**. Visibility is toggled via `class="invisible"` — not `@if`. Removing/adding DOM nodes changes the flex layout width and shifts text horizontally. See [[decisions#Asterisk prefix for completed headings]].

> [!note] Flash prevention
> `opacity-0` on the `displayedText` span hides the SSR-rendered title from users during the hydration window. The text is still in the DOM for crawlers. `isBrowser` is set to `true` inside `afterNextRender` — after `displayedText` is reset to `''` — so the transition is: invisible full-title → visible empty string → animation starts. See [[decisions#opacity-0 isBrowser hydration flash fix]].

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | required | Section label — translated by the parent via `TranslatePipe` before passing in |
| `level` | `1 \| 2 \| 3 \| 4` | `2` | Heading level — renders `<h1>` through `<h4>` |
| `active` | `boolean` | `false` | Renders `>` prefix and blinking `_` cursor |
| `startTyping` | `boolean` | `false` | Flipping to `true` triggers the typewriter animation (fires once) |
| `cycleTextKeys` | `string[]` | `[]` | i18n keys to cycle through after typing completes; intended for h1 only |

## Output

| Output | Type | When emitted |
|--------|------|--------------|
| `typingComplete` | `void` | Once, immediately after the last character of `title()` is typed |

## Internal Signals

| Signal | Type | Description |
|--------|------|-------------|
| `displayedText` | `linkedSignal<string>` | SSR: equals `title()` (crawler indexing); browser: reset to `''` in `afterNextRender`, then driven by animation |
| `typingDone` | `signal<boolean>` | Becomes `true` when title typing completes; used internally to trigger cycling |
| `isBrowser` | `signal<boolean>` | `false` on server, `true` after `afterNextRender`; controls `opacity-0` on `displayedText` span |
| `headingClass` | `computed<string>` | Builds the heading's Tailwind class string from `level()` via a size Record |

## Animation Implementation

Typing and cycling are delegated to utility functions in `shared/typewriter/`:

- `typeText(text, charDelay, startDelay)` — returns an `Observable<string>` that emits growing substrings
- `cycleTexts(phraseResolver, currentTextGetter)` — returns an `Observable<string>` that loops: wait → erase → type next phrase

Both use RxJS exclusively (`timer`, `interval`, `concat`, `defer`). See [[decisions#RxJS for animations]].

## Animation Timings

| Phase | Value |
|-------|-------|
| Initial delay (before first char) | `300ms` |
| Character typing speed | `80ms` per character |
| Backspace speed (cycling erase) | `50ms` per character |
| Cycle phrase typing speed | `80ms` per character |
| Pause between cycles | `3000ms` |

## Cycling Behavior (h1 only)

When both `typingDone` is `true` AND `cycleTextKeys` is non-empty, cycling starts automatically via `combineLatest`:

1. Wait 3000ms
2. Backspace the current `displayedText` one character at a time (50ms/char)
3. Resolve the next phrase via `TranslateService.instant(key)` — picks up language changes dynamically
4. Type the phrase one character at a time (80ms/char)
5. Repeat indefinitely

The `cycleTextKeys` array (set by `app-home`) includes the original heading translation as the last key, so the cycle loops back to the page title: `who I am → my story → my profile → About → who I am → ...`

> [!note] Cycling is SSR-safe
> The cycling pipeline is created inside `afterNextRender()`, so it never runs during prerendering. Prerendered HTML always contains the full static title. See [[decisions#linkedSignal SSR animation pattern]].

## Accessibility

- `[attr.aria-label]="title()"` on the heading element — screen readers always announce the full static title, regardless of animation state
- All inner spans have `aria-hidden="true"` — `>`, `*`, `_`, and the animated character stream are purely decorative
- `prefers-reduced-motion` global rule stops `animate-blink`; character-by-character text progression is unaffected (motion is not the primary meaning)
- `opacity-0` on SSR text does not affect the accessibility tree — `aria-label` remains authoritative

## Angular Tag

```html
<!-- h2 section heading (standard) -->
<app-section-heading
  [title]="'section.experience' | translate"
  [active]="activeIndex() === 1"
  [startTyping]="activeIndex() === 1"
  (typingComplete)="onHeadingTyped(1)" />

<!-- h1 hero heading with cycling (after all sections typed) -->
<app-section-heading
  [title]="'section.about' | translate"
  [level]="1"
  [active]="activeIndex() === 0 || allTyped()"
  [startTyping]="activeIndex() === 0"
  [cycleTextKeys]="allTyped() ? cycleTextKeys : []"
  (typingComplete)="onHeadingTyped(0)" />
```
