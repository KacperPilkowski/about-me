import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Sidebar } from './layout/sidebar/sidebar';
import { LanguageService } from './core/language.service';
import { LanguageSwitcher } from './shared/language-switcher/language-switcher';
import { NetworkBackground } from './shared/network-background/network-background';
import { CtaButton } from './shared/cta-button/cta-button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, LanguageSwitcher, NetworkBackground, CtaButton, TranslatePipe],
  templateUrl: './app.html',
})
export class App {
  constructor() {
    inject(LanguageService).init();
  }
}
