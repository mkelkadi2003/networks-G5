import { useEffect, useRef } from "react";

type NodeT = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 0 | 1 | 2; // 0 = computer, 1 = server, 2 = router
  color: string;
};

const COLORS = ["#22d3ee", "#60a5fa", "#a855f7"];

function drawGlyph(ctx: CanvasRenderingContext2D, n: NodeT) {
  ctx.save();
  ctx.translate(n.x, n.y);
  ctx.strokeStyle = n.color;
  ctx.fillStyle = n.color;
  ctx.lineWidth = 1.6;
  ctx.shadowColor = n.color;
  ctx.shadowBlur = 10;
  ctx.globalAlpha = 0.6;

  if (n.type === 0) {
    // computer — monitor + stand
    ctx.strokeRect(-7, -6, 14, 10);
    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.lineTo(0, 8);
    ctx.moveTo(-5, 8);
    ctx.lineTo(5, 8);
    ctx.stroke();
  } else if (n.type === 1) {
    // server — rack with slots + LEDs
    ctx.strokeRect(-6, -9, 12, 18);
    ctx.beginPath();
    ctx.moveTo(-6, -3);
    ctx.lineTo(6, -3);
    ctx.moveTo(-6, 3);
    ctx.lineTo(6, 3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(3, -6, 1.2, 0, Math.PI * 2);
    ctx.arc(3, 0, 1.2, 0, Math.PI * 2);
    ctx.arc(3, 6, 1.2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // router — hexagon node
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      const px = Math.cos(a) * 8;
      const py = Math.sin(a) * 8;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export default function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let nodes: NodeT[] = [];
    type Packet = { a: number; b: number; t: number; speed: number; color: string };
    let packets: Packet[] = [];
    type Ring = { x: number; y: number; r: number; color: string };
    let rings: Ring[] = [];

    const build = () => {
      const count = Math.max(18, Math.min(42, Math.floor((w * h) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        type: (Math.floor(Math.random() * 3) as 0 | 1 | 2),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
      packets = [];
      rings = [];
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0) build();
    };

    const linkDist = () => Math.max(130, Math.min(210, w / 9));

    const spawnPacket = () => {
      // find a valid edge
      for (let tries = 0; tries < 12; tries++) {
        const a = Math.floor(Math.random() * nodes.length);
        const b = Math.floor(Math.random() * nodes.length);
        if (a === b) continue;
        const dx = nodes[a].x - nodes[b].x;
        const dy = nodes[a].y - nodes[b].y;
        if (Math.hypot(dx, dy) < linkDist()) {
          packets.push({
            a,
            b,
            t: 0,
            speed: 0.006 + Math.random() * 0.01,
            color: Math.random() > 0.5 ? "#22d3ee" : "#c084fc",
          });
          return;
        }
      }
    };

    let lastRing = 0;

    const tick = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const ld = linkDist();

      // drift
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // edges
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < ld) {
            const alpha = (1 - d / ld) * 0.16;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) drawGlyph(ctx, n);

      // packets
      if (packets.length < 9 && Math.random() < 0.06) spawnPacket();
      packets = packets.filter((p) => p.t <= 1);
      for (const p of packets) {
        p.t += p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // expanding radar rings
      if (now - lastRing > 2100) {
        lastRing = now;
        const n = nodes[Math.floor(Math.random() * nodes.length)];
        if (n) rings.push({ x: n.x, y: n.y, r: 4, color: n.color });
      }
      rings = rings.filter((r) => r.r < 70);
      for (const r of rings) {
        r.r += 0.7;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 0.5 - r.r / 140);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-0 opacity-80" aria-hidden="true" />;
}
