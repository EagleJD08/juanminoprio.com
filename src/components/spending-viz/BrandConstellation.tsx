import { useEffect, useRef, useCallback } from "react";
import type { Brand } from "@lib/persona-data";

interface BrandConstellationProps {
  brands: Brand[];
  accentColor?: string;
  faceImageSrc?: string;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function generateLayout(count: number): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + seededRandom(i * 7) * 0.5;
    const radius = 0.22 + seededRandom(i * 13 + 3) * 0.15;
    points.push({
      x: 0.5 + Math.cos(angle) * radius,
      y: 0.5 + Math.sin(angle) * radius,
    });
  }
  return points;
}

interface ParticleState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  phase: number;
  brandName: string;
  category: string;
  description: string;
  logo: HTMLImageElement | null;
  logoLoaded: boolean;
}

const INK_R = 26, INK_G = 26, INK_B = 26;

export default function BrandConstellation({
  brands,
  accentColor = "#6B4226",
  faceImageSrc,
}: BrandConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    particles: [] as ParticleState[],
    mouse: { x: -9999, y: -9999, active: false },
    formed: false,
    w: 0,
    h: 0,
    raf: 0,
  });
  const brandsRef = useRef(brands);
  brandsRef.current = brands;

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
      const layout = generateLayout(s.particles.length);
      s.particles.forEach((p, i) => {
        if (layout[i]) {
          p.targetX = layout[i].x * s.w;
          p.targetY = layout[i].y * s.h;
        }
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
    const layout = generateLayout(brands.length);

    const scattered = brands.map((_, i) => ({
      x: 0.1 + seededRandom(i * 7 + 1) * 0.8,
      y: 0.1 + seededRandom(i * 13 + 5) * 0.8,
    }));

    let faceImg: HTMLImageElement | null = null;
    let faceLoaded = false;
    if (faceImageSrc) {
      const img = new Image();
      img.onload = () => {
        faceImg = img;
        faceLoaded = true;
      };
      img.onerror = () => {
        faceLoaded = false;
      };
      img.src = faceImageSrc;
    }

    const LOGO_SIZE = 28;
    const FACE_DIAMETER = 52;
    const FACE_RADIUS = FACE_DIAMETER / 2;
    const particles: ParticleState[] = brands.map((brand, i) => {
      const sx = prefersReducedMotion ? layout[i].x : scattered[i].x;
      const sy = prefersReducedMotion ? layout[i].y : scattered[i].y;
      const img = new Image();
      const p: ParticleState = {
        x: sx * s.w,
        y: sy * s.h,
        targetX: sx * s.w,
        targetY: sy * s.h,
        vx: 0,
        vy: 0,
        baseSize: 6,
        size: 6,
        phase: seededRandom(i * 11) * Math.PI * 2,
        brandName: brand.name,
        category: brand.category,
        description: brand.description,
        logo: null,
        logoLoaded: false,
      };
      img.onload = () => { p.logo = img; p.logoLoaded = true; };
      img.onerror = () => { p.logoLoaded = false; };
      img.src = `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`;
      return p;
    });
    s.particles = particles;

    if (prefersReducedMotion) {
      s.formed = true;
    }

    const formTimer = prefersReducedMotion
      ? null
      : setTimeout(() => {
          s.formed = true;
          particles.forEach((p, i) => {
            p.targetX = layout[i].x * s.w;
            p.targetY = layout[i].y * s.h;
          });
        }, 400);

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    const accent = hexToRgb(accentColor);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      s.mouse = {
        x: mx, y: my,
        active: mx >= -60 && mx <= s.w + 60 && my >= -60 && my <= s.h + 60,
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

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", resize);

    let hoveredIndex = -1;

    function computeNearestNeighborPairs(
      pts: ParticleState[],
      k: number,
    ): Set<string> {
      const pairs = new Set<string>();
      for (let i = 0; i < pts.length; i++) {
        const dists: { idx: number; dist: number }[] = [];
        for (let j = 0; j < pts.length; j++) {
          if (i === j) continue;
          const ddx = pts[i].x - pts[j].x;
          const ddy = pts[i].y - pts[j].y;
          dists.push({ idx: j, dist: Math.sqrt(ddx * ddx + ddy * ddy) });
        }
        dists.sort((a, b) => a.dist - b.dist);
        const neighbors = Math.min(k, dists.length);
        for (let n = 0; n < neighbors; n++) {
          const j = dists[n].idx;
          const lo = Math.min(i, j);
          const hi = Math.max(i, j);
          pairs.add(`${lo}-${hi}`);
        }
      }
      return pairs;
    }

    function animate() {
      if (!ctx) return;
      const time = Date.now();
      const { w, h, mouse, formed } = s;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      hoveredIndex = -1;
      let closestDist = 80;

      for (let idx = 0; idx < particles.length; idx++) {
        const p = particles[idx];
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
          if (mDist < 120 && mDist > 0.5) {
            const force = (1 - mDist / 120) * 6;
            p.vx += (mdx / mDist) * force;
            p.vy += (mdy / mDist) * force;
          }
          if (mDist < closestDist) {
            closestDist = mDist;
            hoveredIndex = idx;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.size = p.baseSize + Math.sin(time * 0.002 + p.phase) * 0.5;
      }

      const maxSpokeDist = Math.max(w, h);
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const ddx = p.x - cx;
        const ddy = p.y - cy;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        const alpha = Math.max(0.04, (1 - dist / maxSpokeDist) * 0.3);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${alpha})`;
        ctx.stroke();
      }

      const neighborPairs = computeNearestNeighborPairs(particles, 3);
      ctx.lineWidth = 1;
      for (const key of neighborPairs) {
        const [iStr, jStr] = key.split("-");
        const i = parseInt(iStr, 10);
        const j = parseInt(jStr, 10);
        const pi = particles[i];
        const pj = particles[j];
        const ddx = pi.x - pj.x;
        const ddy = pi.y - pj.y;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        const maxDist = Math.min(w * 0.6, h * 0.6);
        const alpha = Math.max(0.03, (1 - dist / maxDist) * 0.25);
        ctx.beginPath();
        ctx.moveTo(pi.x, pi.y);
        ctx.lineTo(pj.x, pj.y);
        ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${alpha})`;
        ctx.stroke();
      }

      for (let idx = 0; idx < particles.length; idx++) {
        const p = particles[idx];
        const isHovered = idx === hoveredIndex;
        const logoDrawSize = isHovered ? LOGO_SIZE * 1.3 : LOGO_SIZE;
        const half = logoDrawSize / 2;

        if (p.logo && p.logoLoaded) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, half, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(p.logo, p.x - half, p.y - half, logoDrawSize, logoDrawSize);
          ctx.restore();

          ctx.beginPath();
          ctx.arc(p.x, p.y, half, 0, Math.PI * 2);
          ctx.strokeStyle = isHovered
            ? accentColor
            : `rgba(${INK_R},${INK_G},${INK_B},0.2)`;
          ctx.lineWidth = isHovered ? 2.5 : 1.5;
          ctx.stroke();
        } else {
          const dotSize = isHovered ? p.size * 1.6 : p.size;
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = isHovered
            ? accentColor
            : `rgba(${INK_R},${INK_G},${INK_B},0.85)`;
          ctx.fill();
        }

        const glowR = half * 2.5;
        const grad = ctx.createRadialGradient(
          p.x, p.y, half * 0.5,
          p.x, p.y, glowR
        );
        grad.addColorStop(0, `rgba(${accent.r},${accent.g},${accent.b},0.06)`);
        grad.addColorStop(1, "rgba(26,26,26,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        const fontSize = isHovered ? 15 : 12;
        ctx.font = `${isHovered ? "600" : "500"} ${fontSize}px Inter, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = isHovered
          ? accentColor
          : `rgba(${INK_R},${INK_G},${INK_B},0.75)`;
        ctx.fillText(p.brandName, p.x, p.y + half + fontSize + 2);
      }

      if (faceImg && faceLoaded) {
        const faceGlowR = FACE_RADIUS * 2.5;
        const faceGrad = ctx.createRadialGradient(
          cx, cy, FACE_RADIUS * 0.5,
          cx, cy, faceGlowR
        );
        faceGrad.addColorStop(0, `rgba(${accent.r},${accent.g},${accent.b},0.10)`);
        faceGrad.addColorStop(1, "rgba(26,26,26,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, faceGlowR, 0, Math.PI * 2);
        ctx.fillStyle = faceGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, FACE_RADIUS + 2, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, FACE_RADIUS, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          faceImg,
          cx - FACE_RADIUS,
          cy - FACE_RADIUS,
          FACE_DIAMETER,
          FACE_DIAMETER,
        );
        ctx.restore();

        ctx.beginPath();
        ctx.arc(cx, cy, FACE_RADIUS + 1, 0, Math.PI * 2);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, FACE_RADIUS + 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},0.15)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const tooltip = tooltipRef.current;
      if (tooltip) {
        if (hoveredIndex >= 0) {
          const hp = particles[hoveredIndex];
          tooltip.style.opacity = "1";
          const tooltipWidth = 200;
          const tooltipHeight = tooltip.offsetHeight || 70;
          let tx = hp.x - tooltipWidth / 2;
          let ty = hp.y - LOGO_SIZE / 2 - tooltipHeight - 12;
          if (ty < 0) {
            ty = hp.y + LOGO_SIZE / 2 + 24;
          }
          if (tx < 4) tx = 4;
          if (tx + tooltipWidth > w - 4) tx = w - tooltipWidth - 4;
          tooltip.style.transform = `translate(${tx}px, ${ty}px)`;
          tooltip.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg border border-mushroom/60 px-3 py-2 max-w-[200px]">
              <p class="font-heading font-semibold text-rich-black text-sm">${hp.brandName}</p>
              <p class="text-[11px] text-charcoal uppercase tracking-wider mt-0.5">${hp.category}</p>
              <p class="text-xs text-rich-black/70 mt-1 leading-snug">${hp.description}</p>
            </div>`;
        } else {
          tooltip.style.opacity = "0";
        }
      }

      s.raf = requestAnimationFrame(animate);
    }

    s.raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(s.raf);
      if (formTimer) clearTimeout(formTimer);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", resize);
    };
  }, [brands, accentColor, faceImageSrc, resize]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] max-w-[560px] mx-auto cursor-crosshair"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
      <div
        ref={tooltipRef}
        className="pointer-events-none absolute top-0 left-0 z-10 opacity-0 transition-opacity duration-150"
      />
    </div>
  );
}
