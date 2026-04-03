# ADR 001 — Use RxJS for component animation timing

**Date:** 2026-04-03
**Status:** Accepted
**Deciders:** Kacper Pilkowski

---

## Context

The Angular frontend uses `ChangeDetectionStrategy.OnPush` on all components. The typewriter and cycling animations in `app-section-heading` require precise multi-phase timing: initial delay, character-by-character typing, backspace erase, and indefinitely repeating cycles.

Initial implementations used `setTimeout` and `setInterval` directly. This caused three concrete bugs:

1. **Accelerating animation** — each navigation re-triggered an `effect()` that watched `cycleTextKeys`. When `allTyped` flipped the array from `[]` to the real keys, the effect fired again while `startTyping` was still `true`, spawning a second animation loop. Two loops ran concurrently; on the next trigger a third was added. The cycling visibly sped up with each iteration.

2. **Animation not stopping** — no mechanism prevented the old loop from continuing when the component re-initialised. Boolean flags (`animationStarted`) were added as guards, but they introduced new state that was easy to get wrong.

3. **Leaked intervals** — `clearInterval` in cleanup callbacks was missed in some paths, leaving orphaned intervals running after component destroy.

## Decision

All animation timing in Angular components uses RxJS primitives:

- `timer(ms)` — single delay
- `interval(ms)` — repeating tick
- `concat(a, b, c)` — sequential phases
- `defer(() => obs)` — create a new observable on each subscription (enables recursive cycling)
- `switchMap` — replaces the current stream when a new trigger fires
- `take(1)` — makes a pipeline one-shot by definition; no guard flags needed
- `combineLatest([a, b])` — waits for two conditions simultaneously
- `takeUntilDestroyed(destroyRef)` — auto-unsubscribes on component destroy
- `toObservable(signal, { injector })` — bridges Angular signals to RxJS

`setTimeout` and `setInterval` are not permitted in component classes.

## Consequences

**Positive:**
- Cleanup is declarative and automatic via `takeUntilDestroyed` — no `ngOnDestroy` cleanup code
- `take(1)` eliminates the need for boolean guard flags like `animationStarted`
- `combineLatest` cleanly expresses "wait for both conditions" without manual coordination
- `defer(step)` enables recursive cycling loops without stacking callbacks
- Testable with `vi.useFakeTimers()` + `vi.advanceTimersByTimeAsync()` in Vitest

**Negative:**
- Developers unfamiliar with RxJS must learn `concat`, `defer`, and `switchMap` patterns before working on animation code
- More verbose than a plain `setTimeout` for trivial single-delay use cases

## Files

- `apps/frontend/src/app/shared/section-heading/section-heading.ts`

## See also

- [Design decision: RxJS for animations](../../about%20me%20-%20docs/About%20me%20-%20UI%20desine/09-decisions-log/decisions.md)
- ADR 002 — linkedSignal + afterNextRender SSR pattern
