import { Injectable, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

type Lang = 'en' | 'pl';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);
  readonly activeLang = signal<Lang>('en');

  init(): void {
    // Apply language immediately for the current URL before any navigation events
    const initialLang = this.extractLang();
    this.activeLang.set(initialLang);
    this.translate.use(initialLang);

    // React to subsequent navigation changes
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      const lang = this.extractLang();
      this.activeLang.set(lang);
      this.translate.use(lang);
    });
  }

  switchLang(lang: Lang): void {
    this.router.navigate(['/', lang]);
  }

  extractLang(): Lang {
    const segments = this.router.url.split('/');
    return segments[1] === 'pl' ? 'pl' : 'en';
  }
}
