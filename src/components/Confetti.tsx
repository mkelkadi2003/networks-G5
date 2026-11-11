import { useEffect, useRef } from "react";

const COLORS = ["#ffd166", "#22d3ee", "#a855f7", "#f472b6", "#ffffff", "#34d399"];

type Piece = {
  x: number;
  y: number;
  w: number;
  h: number;
  vy: number;
  vx: number;
  rot: number;
  vr: number;
  color: string;
};

export default function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (topOnly = false): Piece => ({
      x: Math.random() * w,
      y: topOnly ? -20 : Math.random() * h,
      w: 5 + Math.random() * 7,
      h: 8 + Math.random() * 6,
      vy: 1.2 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 1.4,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const pieces: Piece[] = Array.from({ length: 120 }, () => spawn(false));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pieces) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y / 40) * 0.5;
        p.rot += p.vr;
        if (p.y > h + 24) Object.assign(p, spawn(true));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-20" aria-hidden="true" />;
}
