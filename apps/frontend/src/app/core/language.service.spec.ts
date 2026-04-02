import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let routerEvents$: Subject<RouterEvent>;
  let mockRouter: { url: string; events: Subject<RouterEvent>; navigate: ReturnType<typeof vi.fn> };
  let translateUseSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    routerEvents$ = new Subject<RouterEvent>();
    mockRouter = {
      url: '/',
      events: routerEvents$,
      navigate: vi.fn(),
    };
    translateUseSpy = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: Router, useValue: mockRouter },
        { provide: TranslateService, useValue: { use: translateUseSpy } },
      ],
    });

    service = TestBed.inject(LanguageService);
  });

  describe('init()', () => {
    it('sets activeLang to "en" and calls TranslateService.use("en") on NavigationEnd with URL /en', () => {
      mockRouter.url = '/en';
      service.init();

      routerEvents$.next(new NavigationEnd(1, '/en', '/en'));

      expect(service.activeLang()).toBe('en');
      expect(translateUseSpy).toHaveBeenCalledWith('en');
    });

    it('sets activeLang to "pl" and calls TranslateService.use("pl") on NavigationEnd with URL /pl', () => {
      mockRouter.url = '/pl';
      service.init();

      routerEvents$.next(new NavigationEnd(1, '/pl', '/pl'));

      expect(service.activeLang()).toBe('pl');
      expect(translateUseSpy).toHaveBeenCalledWith('pl');
    });

    it('applies language immediately for the initial URL before any navigation events', () => {
      mockRouter.url = '/pl';
      service.init();

      expect(service.activeLang()).toBe('pl');
      expect(translateUseSpy).toHaveBeenCalledWith('pl');
    });
  });

  describe('switchLang()', () => {
    it("navigates to ['/', 'pl'] when called with 'pl'", () => {
      service.switchLang('pl');

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'pl']);
    });

    it("navigates to ['/', 'en'] when called with 'en'", () => {
      service.switchLang('en');

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'en']);
    });
  });

  describe('extractLang()', () => {
    it('returns "pl" when router.url is /pl', () => {
      mockRouter.url = '/pl';

      expect(service.extractLang()).toBe('pl');
    });

    it('returns "en" when router.url is /en', () => {
      mockRouter.url = '/en';

      expect(service.extractLang()).toBe('en');
    });

    it('returns "en" for unknown prefix /', () => {
      mockRouter.url = '/';

      expect(service.extractLang()).toBe('en');
    });
  });
});
