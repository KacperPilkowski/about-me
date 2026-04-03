import { TestBed, ComponentFixture } from '@angular/core/testing';
import { signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Sidebar } from './sidebar';
import { LanguageService } from '../../core/language.service';

describe('Sidebar', () => {
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    const activeLangSignal = signal<'en' | 'pl'>('en');

    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        {
          provide: LanguageService,
          useValue: { activeLang: activeLangSignal, switchLang: vi.fn() },
        },
        {
          provide: TranslateService,
          useValue: {
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
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the profile photo with correct src', () => {
    const img = fixture.nativeElement.querySelector('img[alt="Kacper Piłkowski"]') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('/assets/profile-photo-320x320.webp');
  });

  it('renders the name "Kacper Piłkowski"', () => {
    const h1 = fixture.nativeElement.querySelector('h1') as HTMLElement;
    expect(h1?.textContent?.trim()).toBe('Kacper Piłkowski');
  });

  it('renders the LinkedIn anchor with correct href', () => {
    const anchors = Array.from(fixture.nativeElement.querySelectorAll('a[target="_blank"]')) as HTMLAnchorElement[];
    const linkedin = anchors.find(a => a.getAttribute('aria-label') === 'LinkedIn profile');
    expect(linkedin).toBeTruthy();
    expect(linkedin?.href).toContain('linkedin.com/in/pilkowski');
  });

  it('renders the GitHub anchor with correct href', () => {
    const anchors = Array.from(fixture.nativeElement.querySelectorAll('a[target="_blank"]')) as HTMLAnchorElement[];
    const github = anchors.find(a => a.getAttribute('aria-label') === 'GitHub profile');
    expect(github).toBeTruthy();
    expect(github?.href).toContain('github.com/KacperPilkowski');
  });

  it('renders the app-cta-button element', () => {
    const cta = fixture.nativeElement.querySelector('app-cta-button');
    expect(cta).toBeTruthy();
  });
});
