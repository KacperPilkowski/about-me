import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { LanguageService } from './core/language.service';
import { LanguageSwitcher } from './shared/language-switcher/language-switcher';
import { NetworkBackground } from './shared/network-background/network-background';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, LanguageSwitcher, NetworkBackground],
  templateUrl: './app.html',
})
export class App {
  constructor() {
    inject(LanguageService).init();
  }
}
