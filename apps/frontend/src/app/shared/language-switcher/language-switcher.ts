import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';

type Lang = 'en' | 'pl';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [],
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcher {
  private readonly langService = inject(LanguageService);
  protected readonly activeLang = this.langService.activeLang;

  setLang(lang: Lang): void {
    this.langService.switchLang(lang);
  }

  isActive(lang: Lang): boolean {
    return this.activeLang() === lang;
  }
}
