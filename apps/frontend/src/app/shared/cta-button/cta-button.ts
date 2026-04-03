import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './cta-button.html',
})
export class CtaButton {}
