import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
  DestroyRef,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NetworkBackgroundService } from './network-background.service';

@Component({
  selector: 'app-network-background',
  standalone: true,
  imports: [],
  templateUrl: './network-background.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NetworkBackgroundService],
  host: { style: 'display: contents' },
})
export class NetworkBackground {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly service = inject(NetworkBackgroundService);
  private readonly destroyRef = inject(DestroyRef);

  readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.service.init(this.canvasRef.nativeElement);
      }
    });

    this.destroyRef.onDestroy(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.service.destroy();
      }
    });
  }
}
