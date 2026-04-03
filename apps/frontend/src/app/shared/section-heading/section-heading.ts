import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { typeText } from '../typewriter/typewriter';
import { cycleTexts } from '../typewriter/cycle-texts';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  templateUrl: './section-heading.html',
})
export class SectionHeading {
  title         = input.required<string>();
  level         = input<1 | 2 | 3 | 4>(2);
  active        = input(false);
  startTyping   = input(false);
  cycleTextKeys = input<string[]>([]);

  typingComplete = output<void>();

  // linkedSignal: SSR/prerender gets full title for crawlers.
  // Browser resets to '' in afterNextRender before animation.
  displayedText = linkedSignal(() => this.title());
  typingDone    = signal(false);
  readonly isBrowser = signal(false);

  protected headingClass = computed(() => {
    const sizeByLevel: Record<1 | 2 | 3 | 4, string> = {
      1: 'text-3xl',
      2: 'text-xl',
      3: 'text-lg',
      4: 'text-base',
    };
    return `font-mono ${sizeByLevel[this.level()]} text-primary flex items-baseline gap-1`;
  });

  private injector   = inject(Injector);
  private ts         = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.displayedText.set('');
      this.isBrowser.set(true);

      // Typewriter: fires once when startTyping becomes true
      toObservable(this.startTyping, { injector: this.injector })
        .pipe(
          filter(Boolean),
          take(1),
          switchMap(() => typeText(this.title(), 80, 300) as Observable<string>),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: t => this.displayedText.set(t),
          complete: () => {
            this.typingDone.set(true);
            this.typingComplete.emit();
          },
        });

      // Cycling: fires once when both typingDone is true AND cycleTextKeys is non-empty.
      combineLatest([
        toObservable(this.typingDone, { injector: this.injector }),
        toObservable(this.cycleTextKeys, { injector: this.injector }),
      ])
        .pipe(
          filter(([done, keys]) => done && keys.length > 0),
          take(1),
          switchMap(() =>
            cycleTexts(
              i => {
                const keys = this.cycleTextKeys();
                return this.ts.instant(keys[i % keys.length]);
              },
              () => this.displayedText()
            )
          ),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(t => this.displayedText.set(t));
    });
  }
}
