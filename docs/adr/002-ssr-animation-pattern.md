# ADR 002 — linkedSignal + afterNextRender for SSR-safe text animations

**Date:** 2026-04-03 (updated 2026-04-03)
**Status:** Accepted
**Deciders:** Kacper Pilkowski

---

## Context

The site uses Angular SSR with static prerendering of 3 routes (`/en/`, `/en/blog`, `/pl/`, `/pl/blog`, etc.). Section headings must satisfy two conflicting requirements:

1. **SEO** — prerendered HTML must contain the full heading text so crawlers index it correctly
2. **Animation** — in the browser, headings should start empty and animate character by character (typewriter effect)

Previous approaches had one of two failure modes:

- **Skip SSR text** — initialise `displayedText = signal('')`. Crawler sees empty headings. Bad for SEO.
- **`isPlatformBrowser()` checks** — scattered `if (isPlatformBrowser(this.platformId))` guards throughout component logic. Verbose, requires injecting `PLATFORM_ID`, and easy to miss in new code paths.

## Decision

Use the `linkedSignal` + `afterNextRender` pattern for all animated text signals:

```typescript
// Initialises from title() — SSR renders the full translated text.
// Browser resets to '' in afterNextRender before animation starts.
displayedText = linkedSignal(() => this.title());

constructor() {
  afterNextRender(() => {
    this.displayedText.set('');  // hide SSR text; animation will fill it in

    // All browser-only setup goes here:
    // - RxJS animation pipelines
    // - IntersectionObserver registration
    // - toObservable() signal bridges
  });
}
```

**Why `linkedSignal`:**
`linkedSignal(() => this.title())` initialises from the `title` input and also reacts to future changes (e.g., language switch mid-cycle). The server renders `displayedText` as the full title. The browser resets it to `''` and begins animation.

**Why `afterNextRender`:**
`afterNextRender` fires exactly once in the browser after the first render is committed to the DOM. It never runs on the server. This is the Angular-idiomatic SSR guard — no `PLATFORM_ID`, no `isPlatformBrowser`, no `inject(DOCUMENT)`.

`isPlatformBrowser()` is not used for animation gating anywhere in the codebase.

**Hydration flash fix — `isBrowser` + `opacity-0`:**

A secondary problem exists: even with `linkedSignal`, there is a brief flash between the browser receiving the prerendered HTML (full title visible) and `afterNextRender` firing (title reset to `''`). The fix is an `isBrowser` signal and an `opacity-0` class on the animated text span:

```typescript
readonly isBrowser = signal(false);

constructor() {
  afterNextRender(() => {
    this.displayedText.set('');  // reset first
    this.isBrowser.set(true);   // then reveal — displayedText is already ''
    // animation pipelines follow...
  });
}
```

```html
<span aria-hidden="true" [class.opacity-0]="!isBrowser()">{{ displayedText() }}</span>
```

The transition is: `opacity-0 + full title (SSR)` → `opacity-1 + empty string` → animation types text character by character. The text is never visibly present outside of the animation. The text remains in the DOM for HTML crawlers; `aria-label` provides the heading content for JavaScript-rendered crawls and accessibility.

## Consequences

**Positive:**
- Prerendered HTML always contains the full heading text — crawlers index it correctly without extra configuration
- Single `afterNextRender` block is the canonical place for all browser-only setup in a component
- No `PLATFORM_ID` injection or `isPlatformBrowser` checks scattered through components
- `linkedSignal` also handles language changes: if the user switches language, `title()` updates, `displayedText` follows (the cycling step re-resolves via `TranslateService.instant` on the next cycle)
- Works correctly with Angular hydration — the SSR DOM is preserved until `afterNextRender` fires

**Negative:**
- `displayedText` briefly shows the full title between SSR hydration and `afterNextRender` — in practice this is imperceptible (happens before the first interactive paint), but it is technically a flash
- All browser-only code must live inside `afterNextRender`, which requires passing `{ injector: this.injector }` to `toObservable()` calls (since `afterNextRender` runs outside the injection context)
- `Injector` must be injected explicitly: `private injector = inject(Injector)`

## Files

- `apps/frontend/src/app/shared/section-heading/section-heading.ts`
- `apps/frontend/src/app/home/home.ts`

## See also

- [Design decision: linkedSignal SSR animation pattern](../../about%20me%20-%20docs/About%20me%20-%20UI%20desine/09-decisions-log/decisions.md)
- ADR 001 — RxJS for component animation timing
