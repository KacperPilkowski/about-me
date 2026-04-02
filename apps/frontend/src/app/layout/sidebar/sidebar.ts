import { Component } from '@angular/core';
import { LanguageSwitcher } from '../../shared/language-switcher/language-switcher';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LanguageSwitcher],
  templateUrl: './sidebar.html',
})
export class Sidebar {}
