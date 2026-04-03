import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { SectionHeading } from './section-heading';

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

async function createFixture(
  titleVal: string,
  options: { active?: boolean; startTyping?: boolean; cycleTextKeys?: string[]; level?: 1 | 2 } = {}
): Promise<ComponentFixture<SectionHeading>> {
  await TestBed.configureTestingModule({
    imports: [SectionHeading],
    providers: [
      { provide: TranslateService, useValue: translateServiceMock },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(SectionHeading);

  fixture.componentRef.setInput('title', titleVal);
  if (options.level !== undefined) fixture.componentRef.setInput('level', options.level);
  if (options.active !== undefined) fixture.componentRef.setInput('active', options.active);
  if (options.startTyping !== undefined) fixture.componentRef.setInput('startTyping', options.startTyping);
  if (options.cycleTextKeys !== undefined) fixture.componentRef.setInput('cycleTextKeys', options.cycleTextKeys);

  // Trigger initial render so afterNextRender fires (sets isBrowser gate)
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

/**
 * Creates a fixture without startTyping so no animation fires during setup.
 * Call `fixture.componentRef.setInput('startTyping', true)` + `fixture.detectChanges()`
 * after fake timers are already active.
 */
async function createFixtureIdle(
  titleVal: string,
  options: { active?: boolean; cycleTextKeys?: string[]; level?: 1 | 2 } = {}
): Promise<ComponentFixture<SectionHeading>> {
  return createFixture(titleVal, { ...options, startTyping: false });
}

describe('SectionHeading', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    TestBed.resetTestingModule();
  });

  describe('SSR initial state', () => {
    it('isBrowser is false initially, true after afterNextRender fires', async () => {
      const fixture = await createFixture('About');
      // afterNextRender has fired by the time createFixture resolves (it calls whenStable)
      expect(fixture.componentInstance.isBrowser()).toBe(true);
    });

    it('displayedText() is empty string after browser hydration (afterNextRender reset)', async () => {
      const fixture = await createFixture('About');
      expect(fixture.componentInstance.displayedText()).toBe('');
    });
  });

  describe('active input', () => {
    it('renders prefix as invisible and cursor as invisible when active is false and not done', async () => {
      const fixture = await createFixture('About', { active: false });
      await fixture.whenStable();
      fixture.detectChanges();
      const allSpans: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('span');
      const invisibleSpans = Array.from(allSpans).filter(s => s.classList.contains('invisible'));
      // prefix span (invisible) + cursor span (invisible) = 2 invisible spans
      expect(invisibleSpans.length).toBe(2);
    });

    it('renders > and _ spans with text-accent when active is true', async () => {
      const fixture = await createFixture('About', { active: true });
      await fixture.whenStable();
      fixture.detectChanges();
      const accentSpans: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('span.text-accent');
      // prefix > span + cursor _ span both have text-accent
      expect(accentSpans.length).toBe(2);
      // cursor should not be invisible when active
      const cursorSpan = accentSpans[accentSpans.length - 1];
      expect(cursorSpan.classList.contains('invisible')).toBe(false);
    });

    it('renders * prefix with text-muted class after typing is done and active is false', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: false });

      const title = 'Hi';
      const fixture = await createFixtureIdle(title);

      fixture.componentRef.setInput('startTyping', true);
      fixture.detectChanges();

      // Complete full animation
      await vi.advanceTimersByTimeAsync(400 + title.length * 80 + 100);
      fixture.detectChanges();

      // active stays false — typingDone is now true
      const allSpans: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('span');
      const mutedSpan = Array.from(allSpans).find(s => s.classList.contains('text-muted'));
      expect(mutedSpan).toBeDefined();
      expect(mutedSpan?.textContent?.trim()).toBe('*');
    }, 10000);

    it('displayedText span does not have opacity-0 class after hydration', async () => {
      const fixture = await createFixture('About');
      fixture.detectChanges();
      const allSpans = Array.from(fixture.nativeElement.querySelectorAll('span[aria-hidden]')) as HTMLElement[];
      const textDisplaySpan = allSpans.find(
        s => !s.classList.contains('text-accent') &&
             !s.classList.contains('text-muted') &&
             !s.classList.contains('invisible') &&
             s.textContent === ''
      );
      // isBrowser is true after afterNextRender, so opacity-0 should not be present
      expect(textDisplaySpan?.classList.contains('opacity-0')).toBe(false);
    });

    it('sets aria-label attribute to the full title on the heading element', async () => {
      const title = 'Experience';
      const fixture = await createFixture(title, { level: 2 });
      await fixture.whenStable();
      fixture.detectChanges();

      const heading: HTMLElement | null = fixture.nativeElement.querySelector('h2');
      expect(heading?.getAttribute('aria-label')).toBe(title);
    });

    it('sets aria-label on h1 when level is 1', async () => {
      const title = 'About';
      const fixture = await createFixture(title, { level: 1 });
      await fixture.whenStable();
      fixture.detectChanges();

      const heading: HTMLElement | null = fixture.nativeElement.querySelector('h1');
      expect(heading?.getAttribute('aria-label')).toBe(title);
    });
  });

  describe('startTyping animation', () => {
    it('animates to full title after timers complete', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: false });

      const title = 'About';
      // Create fixture with startTyping: false so no animation fires during setup
      const fixture = await createFixtureIdle(title);

      // Now enable typing — effect fires synchronously within Angular's CD with fake timers active
      fixture.componentRef.setInput('startTyping', true);
      fixture.detectChanges();

      // Advance past the 300ms startup delay
      await vi.advanceTimersByTimeAsync(400);
      // Advance through all character intervals (title.length * 80ms)
      await vi.advanceTimersByTimeAsync(title.length * 80 + 100);
      fixture.detectChanges();

      expect(fixture.componentInstance.displayedText()).toBe(title);
    }, 10000);

    it('emits typingComplete once after full animation', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: false });

      const title = 'Hi';
      const fixture = await createFixtureIdle(title);
      const emitSpy = vi.fn();
      fixture.componentInstance.typingComplete.subscribe(emitSpy);

      fixture.componentRef.setInput('startTyping', true);
      fixture.detectChanges();

      await vi.advanceTimersByTimeAsync(400);
      await vi.advanceTimersByTimeAsync(title.length * 80 + 100);
      fixture.detectChanges();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    }, 10000);
  });

  describe('cycling', () => {
    it('starts cycling and calls TranslateService.instant with first key', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: false });
      const instantSpy = vi.spyOn(translateServiceMock, 'instant');

      const title = 'About';
      const cycleKeys = ['hero.cycle.0', 'hero.cycle.1'];
      const fixture = await createFixtureIdle(title, { cycleTextKeys: cycleKeys });

      fixture.componentRef.setInput('startTyping', true);
      fixture.detectChanges();

      // Complete initial typing
      await vi.advanceTimersByTimeAsync(400);
      await vi.advanceTimersByTimeAsync(title.length * 80 + 100);
      fixture.detectChanges();

      // Advance through the 3000ms cycle wait + erase title (title.length * 50ms) + first phrase typing
      // instant returns key as-is, so phrase = 'hero.cycle.0'
      const firstPhrase = 'hero.cycle.0';
      await vi.advanceTimersByTimeAsync(3000 + title.length * 50 + firstPhrase.length * 80 + 100);
      fixture.detectChanges();

      expect(instantSpy).toHaveBeenCalledWith('hero.cycle.0');
    }, 15000);

    it('sets displayedText to the resolved phrase after one cycle', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: false });

      const title = 'Hi';
      const fixture = await createFixtureIdle(title, {
        cycleTextKeys: ['hero.cycle.0'],
      });

      fixture.componentRef.setInput('startTyping', true);
      fixture.detectChanges();

      // Complete initial typing
      await vi.advanceTimersByTimeAsync(400);
      await vi.advanceTimersByTimeAsync(title.length * 80 + 100);
      fixture.detectChanges();

      // Advance through cycle wait + erase title (title.length * 50ms) + phrase typing
      // instant returns key as-is, so phrase = 'hero.cycle.0'
      const phrase = 'hero.cycle.0';
      await vi.advanceTimersByTimeAsync(3000 + title.length * 50 + phrase.length * 80 + 100);
      fixture.detectChanges();

      // instant returns the key as-is, so displayedText should equal the key
      expect(fixture.componentInstance.displayedText()).toBe('hero.cycle.0');
    }, 15000);

    it('calls TranslateService.instant with correct keys on subsequent cycles', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: false });
      const instantSpy = vi.spyOn(translateServiceMock, 'instant');

      const title = 'Hi';
      const cycleKeys = ['hero.cycle.0', 'hero.cycle.1', 'hero.cycle.2'];
      const fixture = await createFixtureIdle(title, { cycleTextKeys: cycleKeys });

      fixture.componentRef.setInput('startTyping', true);
      fixture.detectChanges();

      // Complete initial typing
      await vi.advanceTimersByTimeAsync(400 + title.length * 80 + 100);
      fixture.detectChanges();

      // Advance through two full cycles.
      // Each cycle: 3000ms wait + erase current text (currentLen * 50ms) + type phrase (phraseLen * 80ms)
      // Cycle 0: erase title 'Hi' (2 chars) then type 'hero.cycle.0' (12 chars)
      const cycle0Phrase = cycleKeys[0];
      await vi.advanceTimersByTimeAsync(3000 + title.length * 50 + cycle0Phrase.length * 80 + 100);
      fixture.detectChanges();

      // Cycle 1: erase 'hero.cycle.0' (12 chars) then type 'hero.cycle.1' (12 chars)
      const cycle1Phrase = cycleKeys[1];
      await vi.advanceTimersByTimeAsync(3000 + cycle0Phrase.length * 50 + cycle1Phrase.length * 80 + 100);
      fixture.detectChanges();

      const keys = instantSpy.mock.calls.map(([k]) => k);
      expect(keys).toContain('hero.cycle.0');
      expect(keys).toContain('hero.cycle.1');
    }, 20000);
  });
});
