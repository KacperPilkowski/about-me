import { Component, signal } from '@angular/core';

type Lang = 'en' | 'pl';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [],
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcher {
  protected readonly activeLang = signal<Lang>('en');

  setLang(lang: Lang): void {
    this.activeLang.set(lang);
  }

  isActive(lang: Lang): boolean {
    return this.activeLang() === lang;
  }
}
