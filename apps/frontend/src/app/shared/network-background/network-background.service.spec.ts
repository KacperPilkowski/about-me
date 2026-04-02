import { TestBed } from '@angular/core/testing';
import { NetworkBackgroundService } from './network-background.service';

function makeCanvas(width = 1280, height = 800): HTMLCanvasElement {
  const ctx = {
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
  } as unknown as CanvasRenderingContext2D;

  const canvas = {
    width,
    height,
    getContext: vi.fn().mockReturnValue(ctx),
  } as unknown as HTMLCanvasElement;

  return canvas;
}

function setupMatchMedia(reducedMotion: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockReturnValue({ matches: reducedMotion }),
  });
}

describe('NetworkBackgroundService', () => {
  let service: NetworkBackgroundService;

  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', vi.fn().mockReturnValue(1));
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    setupMatchMedia(false);

    TestBed.configureTestingModule({ providers: [NetworkBackgroundService] });
    service = TestBed.inject(NetworkBackgroundService);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('init()', () => {
    it('sets canvas dimensions to window inner size', () => {
      vi.stubGlobal('innerWidth', 1920);
      vi.stubGlobal('innerHeight', 1080);
      const canvas = makeCanvas();

      service.init(canvas);

      expect(canvas.width).toBe(1920);
      expect(canvas.height).toBe(1080);
    });

    it('creates 80–120 particles on desktop (>= 768px)', () => {
      vi.stubGlobal('innerWidth', 1280);
      vi.stubGlobal('innerHeight', 800);
      const canvas = makeCanvas(1280, 800);

      service.init(canvas);

      const count = (service as unknown as { particles: unknown[] }).particles.length;
      expect(count).toBeGreaterThanOrEqual(80);
      expect(count).toBeLessThanOrEqual(120);
    });

    it('creates exactly 40 particles on mobile (< 768px)', () => {
      vi.stubGlobal('innerWidth', 375);
      vi.stubGlobal('innerHeight', 812);
      const canvas = makeCanvas(375, 812);

      service.init(canvas);

      const count = (service as unknown as { particles: unknown[] }).particles.length;
      expect(count).toBe(40);
    });

    it('starts the RAF loop when reduced motion is off', () => {
      setupMatchMedia(false);
      const canvas = makeCanvas();

      service.init(canvas);

      expect(requestAnimationFrame).toHaveBeenCalled();
    });

    it('does not start the RAF loop when prefers-reduced-motion is set', () => {
      setupMatchMedia(true);
      const canvas = makeCanvas();

      service.init(canvas);

      expect(requestAnimationFrame).not.toHaveBeenCalled();
    });

    it('registers visibilitychange and resize listeners', () => {
      const docSpy = vi.spyOn(document, 'addEventListener');
      const winSpy = vi.spyOn(window, 'addEventListener');
      const canvas = makeCanvas();

      service.init(canvas);

      expect(docSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
      expect(winSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });
  });

  describe('particles', () => {
    beforeEach(() => {
      vi.stubGlobal('innerWidth', 1280);
      vi.stubGlobal('innerHeight', 800);
    });

    it('all particles have negative vx and vy (drift toward upper-left)', () => {
      const canvas = makeCanvas(1280, 800);
      service.init(canvas);

      const particles = (service as unknown as { particles: { vx: number; vy: number }[] }).particles;
      for (const p of particles) {
        expect(p.vx).toBeLessThan(0);
        expect(p.vy).toBeLessThan(0);
      }
    });

    it('all particles have radius between 2 and 4', () => {
      const canvas = makeCanvas(1280, 800);
      service.init(canvas);

      const particles = (service as unknown as { particles: { radius: number }[] }).particles;
      for (const p of particles) {
        expect(p.radius).toBeGreaterThanOrEqual(2);
        expect(p.radius).toBeLessThanOrEqual(4);
      }
    });

    it('all particles spawn within canvas bounds', () => {
      const canvas = makeCanvas(1280, 800);
      service.init(canvas);

      const particles = (service as unknown as { particles: { x: number; y: number }[] }).particles;
      for (const p of particles) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThanOrEqual(1280);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThanOrEqual(800);
      }
    });
  });

  describe('destroy()', () => {
    it('cancels the active RAF', () => {
      const canvas = makeCanvas();
      service.init(canvas);

      service.destroy();

      expect(cancelAnimationFrame).toHaveBeenCalledWith(1);
    });

    it('removes visibilitychange and resize listeners', () => {
      const docSpy = vi.spyOn(document, 'removeEventListener');
      const winSpy = vi.spyOn(window, 'removeEventListener');
      const canvas = makeCanvas();
      service.init(canvas);

      service.destroy();

      expect(docSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
      expect(winSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('clears particles after destroy', () => {
      const canvas = makeCanvas();
      service.init(canvas);

      service.destroy();

      const particles = (service as unknown as { particles: unknown[] }).particles;
      expect(particles).toHaveLength(0);
    });

    it('is safe to call destroy without prior init', () => {
      expect(() => service.destroy()).not.toThrow();
    });
  });
});
