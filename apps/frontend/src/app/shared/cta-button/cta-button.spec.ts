import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { CtaButton } from './cta-button';

describe('CtaButton', () => {
  let fixture: ComponentFixture<CtaButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaButton],
      providers: [
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

    fixture = TestBed.createComponent(CtaButton);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders an anchor element', () => {
    const a = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(a).toBeTruthy();
  });

  it('href points to the correct mailto address', () => {
    const a = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(a.getAttribute('href')).toBe('mailto:kacperpilkowski+aboutme@gmail.com');
  });
});
