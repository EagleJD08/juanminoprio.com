"use client";
import { useEffect, useRef, useCallback } from "react";

// ============================
// JDM Letter Points (0-1 normalized space)
// ============================

const jdmPointsRaw = [
  // J (22 points, indices 0-21)
  {x:0.02,y:0.18},{x:0.055,y:0.18},{x:0.09,y:0.18},{x:0.125,y:0.18},
  {x:0.16,y:0.18},{x:0.195,y:0.18},{x:0.23,y:0.18},{x:0.26,y:0.18},
  {x:0.155,y:0.24},{x:0.155,y:0.30},{x:0.155,y:0.36},{x:0.155,y:0.42},
  {x:0.155,y:0.48},{x:0.155,y:0.54},{x:0.155,y:0.60},{x:0.155,y:0.66},
  {x:0.145,y:0.72},{x:0.12,y:0.77},{x:0.08,y:0.81},
  {x:0.04,y:0.82},{x:0.02,y:0.78},{x:0.02,y:0.72},

  // D / Play Triangle (28 points, indices 22-49)
  {x:0.34,y:0.12},{x:0.34,y:0.19},{x:0.34,y:0.255},{x:0.34,y:0.32},
  {x:0.34,y:0.39},{x:0.34,y:0.455},{x:0.34,y:0.52},{x:0.34,y:0.585},
  {x:0.34,y:0.65},{x:0.34,y:0.72},{x:0.34,y:0.79},{x:0.34,y:0.86},
  {x:0.39,y:0.17},{x:0.43,y:0.22},{x:0.48,y:0.27},
  {x:0.52,y:0.32},{x:0.57,y:0.37},{x:0.61,y:0.42},{x:0.65,y:0.46},
  {x:0.67,y:0.49},{x:0.66,y:0.50},
  {x:0.39,y:0.81},{x:0.43,y:0.76},{x:0.48,y:0.71},
  {x:0.52,y:0.66},{x:0.57,y:0.60},{x:0.61,y:0.55},{x:0.65,y:0.51},

  // M (30 points, indices 50-79)
  {x:0.76,y:0.18},{x:0.76,y:0.25},{x:0.76,y:0.33},{x:0.76,y:0.40},
  {x:0.76,y:0.47},{x:0.76,y:0.55},{x:0.76,y:0.62},{x:0.76,y:0.69},
  {x:0.76,y:0.77},{x:0.76,y:0.84},
  {x:0.78,y:0.26},{x:0.80,y:0.33},{x:0.82,y:0.40},
  {x:0.84,y:0.47},{x:0.855,y:0.55},
  {x:0.87,y:0.48},{x:0.89,y:0.41},{x:0.91,y:0.34},
  {x:0.93,y:0.27},{x:0.955,y:0.19},
  {x:0.96,y:0.18},{x:0.96,y:0.25},{x:0.96,y:0.33},{x:0.96,y:0.40},
  {x:0.96,y:0.47},{x:0.96,y:0.55},{x:0.96,y:0.62},{x:0.96,y:0.69},
  {x:0.96,y:0.77},{x:0.96,y:0.84},
];

// Scale 10% smaller, centered on design midpoint
const SCALE = 0.90;
const CX = 0.49, CY = 0.49;
const jdmPoints = jdmPointsRaw.map(p => ({
  x: CX + (p.x - CX) * SCALE,
  y: CY + (p.y - CY) * SCALE,
}));

// Letter group boundaries for connection drawing
const GROUPS: [number, number][] = [[0, 22], [22, 50], [50, 80]];

function sameGroup(i: number, j: number): boolean {
  for (const [start, end] of GROUPS) {
    if (i >= start && i < end && j >= start && j < end) return true;
  }
  return false;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const NUM_PARTICLES = jdmPoints.length;
const INK_R = 26, INK_G = 26, INK_B = 26;

const scatteredPoints = jdmPoints.map((_, i) => ({
  x: 0.1 + seededRandom(i * 7 + 1) * 0.8,
  y: 0.1 + seededRandom(i * 13 + 5) * 0.8,
}));

interface ParticleState {
  x: number; y: number;
  targetX: number; targetY: number;
  vx: number; vy: number;
  baseSize: number; size: number;
  phase: number;
}

export default function HeroCollage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    particles: [] as ParticleState[],
    mouse: { x: -9999, y: -9999, active: false },
    formed: false,
    w: 0,
    h: 0,
    raf: 0,
  });

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const s = stateRef.current;
    s.w = rect.width;
    s.h = rect.height;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (s.formed) {
      s.particles.forEach((p, i) => {
        p.targetX = jdmPoints[i].x * s.w;
        p.targetY = jdmPoints[i].y * s.h;
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    resize();
    const s = stateRef.current;

    // Create particles
    const particles: ParticleState[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const sx = prefersReducedMotion ? jdmPoints[i].x : scatteredPoints[i].x;
      const sy = prefersReducedMotion ? jdmPoints[i].y : scatteredPoints[i].y;
      particles.push({
        x: sx * s.w, y: sy * s.h,
        targetX: sx * s.w, targetY: sy * s.h,
        vx: 0, vy: 0,
        baseSize: 3.2 + seededRandom(i * 3 + 99) * 1.0,
        size: 3.2,
        phase: seededRandom(i * 11) * Math.PI * 2,
      });
    }
    s.particles = particles;

    if (prefersReducedMotion) {
      s.formed = true;
    }

    // Form letters after delay
    const formTimer = prefersReducedMotion
      ? null
      : setTimeout(() => {
          s.formed = true;
          particles.forEach((p, i) => {
            p.targetX = jdmPoints[i].x * s.w;
            p.targetY = jdmPoints[i].y * s.h;
          });
        }, 800);

    // Event handlers
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      s.mouse = {
        x: mx, y: my,
        active: mx >= -80 && mx <= s.w + 80 && my >= -80 && my <= s.h + 80,
      };
    };
    const onMouseLeave = () => { s.mouse.active = false; };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      s.mouse = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        active: true,
      };
    };
    const onTouchEnd = () => { s.mouse.active = false; };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", resize);

    // Animation loop
    function animate() {
      const time = Date.now();
      const { w, h, mouse, formed } = s;
      ctx.clearRect(0, 0, w, h);

      // Update particles
      for (const p of particles) {
        let bx = 0, by = 0;
        if (formed && !prefersReducedMotion) {
          bx = Math.sin(time * 0.0008 + p.phase) * 1.2;
          by = Math.cos(time * 0.0006 + p.phase * 1.3) * 1.2;
        }
        const dx = p.targetX + bx - p.x;
        const dy = p.targetY + by - p.y;
        p.vx += dx * 0.06;
        p.vy += dy * 0.06;
        p.vx *= 0.82;
        p.vy *= 0.82;

        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 160 && mDist > 0.5) {
            const force = (1 - mDist / 160) * 14;
            p.vx += (mdx / mDist) * force;
            p.vy += (mdy / mDist) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.size = p.baseSize + Math.sin(time * 0.002 + p.phase) * 0.3;
      }

      // Connections
      const maxDist = Math.min(w * 0.10, h * 0.18);
      const maxDistSq = maxDist * maxDist;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          if (!sameGroup(i, j)) continue;
          const ddx = particles[i].x - particles[j].x;
          const ddy = particles[i].y - particles[j].y;
          const distSq = ddx * ddx + ddy * ddy;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${INK_R},${INK_G},${INK_B},${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${INK_R},${INK_G},${INK_B},0.9)`;
        ctx.fill();

        const grad = ctx.createRadialGradient(
          p.x, p.y, p.size * 0.5,
          p.x, p.y, p.size * 4
        );
        grad.addColorStop(0, `rgba(${INK_R},${INK_G},${INK_B},0.10)`);
        grad.addColorStop(1, "rgba(26,26,26,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      s.raf = requestAnimationFrame(animate);
    }

    s.raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(s.raf);
      if (formTimer) clearTimeout(formTimer);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[640/420] cursor-crosshair md:w-[520px] lg:w-[600px]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
