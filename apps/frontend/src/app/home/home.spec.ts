import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Home } from './home';

const translateServiceMock = {
  use: vi.fn(),
  setDefaultLang: vi.fn(),
  get currentLang() { return 'en'; },
  getCurrentLang: vi.fn().mockReturnValue('en'),
  getFallbackLang: vi.fn().mockReturnValue(null),
  get: vi.fn().mockReturnValue({ subscribe: vi.fn() }),
  getParsedResult: vi.fn().mockReturnValue(''),
  instant: (key: string) => key,
  onLangChange: { subscribe: vi.fn().mockReturnValue({ unsubscribe: vi.fn() }) },
  onTranslationChange: { subscribe: vi.fn().mockReturnValue({ unsubscribe: vi.fn() }) },
  onDefaultLangChange: { subscribe: vi.fn().mockReturnValue({ unsubscribe: vi.fn() }) },
  onFallbackLangChange: { subscribe: vi.fn().mockReturnValue({ unsubscribe: vi.fn() }) },
};

// Stored IntersectionObserver callback so tests can fire it manually.
// afterNextRender fires asynchronously, so the callback is set after whenStable().
let intersectionCallback: IntersectionObserverCallback | undefined;
const observeSpy = vi.fn();
const disconnectSpy = vi.fn();

function setupIntersectionObserver() {
  intersectionCallback = undefined;
  observeSpy.mockReset();
  disconnectSpy.mockReset();

  vi.stubGlobal('IntersectionObserver', vi.fn(function(cb: IntersectionObserverCallback) {
    intersectionCallback = cb;
    return {
      observe: observeSpy,
      disconnect: disconnectSpy,
      unobserve: vi.fn(),
    };
  }));
}

function fireIntersection(target: Element, idx: number, isIntersecting: boolean) {
  if (!intersectionCallback) throw new Error('IntersectionObserver callback not yet registered — call whenStable() first');
  target.setAttribute('data-heading-index', String(idx));
  intersectionCallback(
    [{ target, isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 } as IntersectionObserverEntry],
    {} as IntersectionObserver
  );
}

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let comp: Home;

  beforeEach(async () => {
    setupIntersectionObserver();

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    TestBed.resetTestingModule();
  });

  it('initial state: activeIndex is -1, allTyped is false', () => {
    expect(comp.activeIndex()).toBe(-1);
    expect(comp.allTyped()).toBe(false);
  });

  it('becomes active at index 0 when IntersectionObserver fires for index 0', async () => {
    // Wait for afterNextRender to fire (registers observer + calls advanceTo(0))
    await fixture.whenStable();
    expect(intersectionCallback).toBeDefined();

    // advanceTo(0) was called but section 0 is not yet visible, so pendingIndex = 0.
    // Fire intersection for section 0.
    const sections = fixture.nativeElement.querySelectorAll('section');
    fireIntersection(sections[0], 0, true);
    await fixture.whenStable();

    expect(comp.activeIndex()).toBe(0);
  });

  it('onHeadingTyped(0) advances activeIndex to 1 when section 1 is visible', async () => {
    await fixture.whenStable();

    const sections = fixture.nativeElement.querySelectorAll('section');
    // Make sections 0 and 1 visible
    fireIntersection(sections[0], 0, true);
    fireIntersection(sections[1], 1, true);
    await fixture.whenStable();

    // Simulate typing complete for heading 0
    comp.onHeadingTyped(0);
    await fixture.whenStable();

    expect(comp.activeIndex()).toBe(1);
  });

  it('onHeadingTyped(1) advances activeIndex to 2 when section 2 is visible', async () => {
    await fixture.whenStable();

    const sections = fixture.nativeElement.querySelectorAll('section');
    fireIntersection(sections[1], 1, true);
    fireIntersection(sections[2], 2, true);
    await fixture.whenStable();

    comp.onHeadingTyped(1);
    await fixture.whenStable();

    expect(comp.activeIndex()).toBe(2);
  });

  it('onHeadingTyped(2) sets activeIndex to 0 and allTyped to true', async () => {
    await fixture.whenStable();

    const sections = fixture.nativeElement.querySelectorAll('section');
    fireIntersection(sections[0], 0, true);
    await fixture.whenStable();

    comp.onHeadingTyped(2);
    await fixture.whenStable();

    expect(comp.activeIndex()).toBe(0);
    expect(comp.allTyped()).toBe(true);
  });

  it('pending visibility gate: advanceTo(1) when section 1 not visible keeps activeIndex unchanged', async () => {
    await fixture.whenStable();

    const sections = fixture.nativeElement.querySelectorAll('section');

    // Section 0 visible; unblocks the initial advanceTo(0)
    fireIntersection(sections[0], 0, true);
    await fixture.whenStable();
    expect(comp.activeIndex()).toBe(0);

    // Section 1 is NOT visible; advanceTo(1) should queue it as pendingIndex
    comp.advanceTo(1);
    await fixture.whenStable();
    // activeIndex must still be 0 because section 1 is not visible
    expect(comp.activeIndex()).toBe(0);

    // Now section 1 becomes visible — should unblock the pending advance
    fireIntersection(sections[1], 1, true);
    await fixture.whenStable();
    expect(comp.activeIndex()).toBe(1);
  });

  it('cycleTextKeys are only passed to h1 after allTyped becomes true', async () => {
    await fixture.whenStable();

    // Before completion: allTyped is false
    expect(comp.allTyped()).toBe(false);

    comp.onHeadingTyped(2);
    await fixture.whenStable();

    // After all typed: allTyped is true, cycleTextKeys are non-empty
    expect(comp.allTyped()).toBe(true);
    expect(comp.cycleTextKeys.length).toBeGreaterThan(0);
    expect(comp.cycleTextKeys).toContain('section.about');
    expect(comp.cycleTextKeys).toContain('hero.cycle.0');
    expect(comp.cycleTextKeys.length).toBe(4);
  });
});
