import { TestBed, ComponentFixture } from '@angular/core/testing';
import { signal } from '@angular/core';
import { LanguageSwitcher } from './language-switcher';
import { LanguageService } from '../../core/language.service';

describe('LanguageSwitcher', () => {
  let fixture: ComponentFixture<LanguageSwitcher>;
  let component: LanguageSwitcher;
  let activeLangSignal: ReturnType<typeof signal<'en' | 'pl'>>;
  let switchLangSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    activeLangSignal = signal<'en' | 'pl'>('en');
    switchLangSpy = vi.fn();

    const mockLanguageService = {
      activeLang: activeLangSignal,
      switchLang: switchLangSpy,
    };

    await TestBed.configureTestingModule({
      imports: [LanguageSwitcher],
      providers: [
        { provide: LanguageService, useValue: mockLanguageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('isActive()', () => {
    it('returns true for "en" when activeLang signal is "en"', () => {
      activeLangSignal.set('en');

      expect(component.isActive('en')).toBe(true);
    });

    it('returns false for "pl" when activeLang signal is "en"', () => {
      activeLangSignal.set('en');

      expect(component.isActive('pl')).toBe(false);
    });

    it('returns true for "pl" when activeLang signal is "pl"', () => {
      activeLangSignal.set('pl');

      expect(component.isActive('pl')).toBe(true);
    });

    it('returns false for "en" when activeLang signal is "pl"', () => {
      activeLangSignal.set('pl');

      expect(component.isActive('en')).toBe(false);
    });
  });

  describe('button clicks', () => {
    it('calls langService.switchLang("pl") when the PL button is clicked', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('[role="button"]');
      const plButton = Array.from(buttons).find(el => el.textContent?.trim() === 'PL') as HTMLElement;

      plButton.click();

      expect(switchLangSpy).toHaveBeenCalledWith('pl');
    });

    it('calls langService.switchLang("en") when the EN button is clicked', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('[role="button"]');
      const enButton = Array.from(buttons).find(el => el.textContent?.trim() === 'EN') as HTMLElement;

      enButton.click();

      expect(switchLangSpy).toHaveBeenCalledWith('en');
    });
  });

  describe('active/inactive CSS classes', () => {
    it('applies text-primary class to the active lang element', () => {
      activeLangSignal.set('en');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('[role="button"]');
      const enButton = Array.from(buttons).find(el => el.textContent?.trim() === 'EN') as HTMLElement;

      expect(enButton.className).toContain('text-primary');
    });

    it('applies text-muted class to the inactive lang element', () => {
      activeLangSignal.set('en');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('[role="button"]');
      const plButton = Array.from(buttons).find(el => el.textContent?.trim() === 'PL') as HTMLElement;

      expect(plButton.className).toContain('text-muted');
    });

    it('switches text-primary to PL button when activeLang changes to "pl"', () => {
      activeLangSignal.set('pl');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('[role="button"]');
      const plButton = Array.from(buttons).find(el => el.textContent?.trim() === 'PL') as HTMLElement;
      const enButton = Array.from(buttons).find(el => el.textContent?.trim() === 'EN') as HTMLElement;

      expect(plButton.className).toContain('text-primary');
      expect(enButton.className).toContain('text-muted');
    });
  });
});
