import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionHeading } from '../shared/section-heading/section-heading';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, SectionHeading],
  templateUrl: './home.html',
})
export class Home {
  activeIndex = signal(-1);
  allTyped    = signal(false);

  readonly cycleTextKeys = ['hero.cycle.0', 'hero.cycle.1', 'hero.cycle.2', 'section.about'];

  readonly sections = viewChildren<ElementRef<HTMLElement>>('headingSection');

  private visibleIndices = new Set<number>();
  private pendingIndex: number | null = null;
  private observer: IntersectionObserver | null = null;
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver((entries) => {
        for (const e of entries) {
          const idx = Number(e.target.getAttribute('data-heading-index'));
          if (e.isIntersecting) {
            this.visibleIndices.add(idx);
            if (this.pendingIndex === idx) {
              this.pendingIndex = null;
              this.activeIndex.set(idx);
            }
          } else {
            this.visibleIndices.delete(idx);
          }
        }
      }, { threshold: 0.1 });

      this.observer = observer;

      this.sections().forEach((el, i) => {
        el.nativeElement.setAttribute('data-heading-index', String(i));
        observer.observe(el.nativeElement);
      });

      this.destroyRef.onDestroy(() => this.observer?.disconnect());
      this.advanceTo(0);
    });
  }

  advanceTo(index: number): void {
    if (this.visibleIndices.has(index)) {
      this.activeIndex.set(index);
    } else {
      this.pendingIndex = index;
    }
  }

  onHeadingTyped(index: number): void {
    if (index < this.sections().length - 1) {
      this.advanceTo(index + 1);
    } else {
      this.activeIndex.set(0);
      this.allTyped.set(true);
    }
  }
}
