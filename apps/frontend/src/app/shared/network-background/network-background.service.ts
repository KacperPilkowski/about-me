import { Injectable } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

@Injectable()
export class NetworkBackgroundService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private rafId: number | null = null;
  private resizeTimer: ReturnType<typeof setTimeout> | null = null;
  private visibilityHandler: (() => void) | null = null;
  private resizeHandler: (() => void) | null = null;

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.particles = this.createParticles();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      this.drawFrame();
      return;
    }

    this.visibilityHandler = () => {
      if (document.hidden) {
        this.cancelRaf();
      } else {
        this.startLoop();
      }
    };
    document.addEventListener('visibilitychange', this.visibilityHandler);

    this.resizeHandler = () => {
      if (this.resizeTimer !== null) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles = this.createParticles();
      }, 200);
    };
    window.addEventListener('resize', this.resizeHandler);

    this.startLoop();
  }

  destroy(): void {
    this.cancelRaf();

    if (this.resizeTimer !== null) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = null;
    }

    if (this.visibilityHandler) {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
      this.visibilityHandler = null;
    }

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }

    this.canvas = null;
    this.ctx = null;
    this.particles = [];
  }

  private createParticles(): Particle[] {
    if (!this.canvas) return [];

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 40 : Math.floor(Math.random() * 41) + 80;

    return Array.from({ length: count }, () => {
      const speed = Math.random() * 0.15 + 0.05;
      return {
        x: Math.random() * this.canvas!.width,
        y: Math.random() * this.canvas!.height,
        vx: -(speed * (0.7 + Math.random() * 0.6)),
        vy: -(speed * (0.7 + Math.random() * 0.6)),
        radius: Math.random() * 2 + 2,
      };
    });
  }

  private startLoop(): void {
    const loop = () => {
      this.drawFrame();
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  private cancelRaf(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private drawFrame(): void {
    if (!this.canvas || !this.ctx) return;

    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.y < 0) {
        if (Math.random() < 0.5) {
          p.x = Math.random() * width;
          p.y = height + Math.random() * 50;
        } else {
          p.x = width + Math.random() * 50;
          p.y = Math.random() * height;
        }
      }

      const edgeDist = Math.min(p.x, width - p.x, p.y, height - p.y);
      const edgeFactor = Math.max(0, 1 - edgeDist / 250);
      const dotOpacity = 0.10 + edgeFactor * 0.70;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(233, 30, 140, ${dotOpacity})`;
      this.ctx.fill();
    }

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const edgeDist = Math.min(midX, width - midX, midY, height - midY);
          const edgeFactor = Math.max(0, 1 - edgeDist / 250);
          const opacity = (1 - distance / 200) * (0.10 + edgeFactor * 0.70);
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }
}
