import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../shared/language-switcher/language-switcher';
import { CtaButton } from '../../shared/cta-button/cta-button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LanguageSwitcher, TranslatePipe, CtaButton],
  templateUrl: './sidebar.html',
})
export class Sidebar {}
