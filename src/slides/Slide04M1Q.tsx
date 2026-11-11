import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Map,
  Package,
  Route,
  Network,
  Router,
  ScanSearch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Chip, NavButton, SlideShell } from "../components/Chrome";
import { cn } from "../utils/cn";
import type { GameAPI } from "../types";

const QUESTIONS: { id: string; q: string; a: string; icon: LucideIcon }[] = [
  {
    id: "i1",
    q: "WHAT IS A DATA PACKET?",
    a: "A tiny package that carries one piece of your message across the network.",
    icon: Package,
  },
  {
    id: "i2",
    q: "HOW DOES A MESSAGE TRAVEL?",
    a: "It splits into packets that race through cables, then rebuilds at the other side.",
    icon: Route,
  },
  {
    id: "i3",
    q: "WHAT DOES A SWITCH DO?",
    a: "It connects devices inside one network and delivers each packet to the right device.",
    icon: Network,
  },
  {
    id: "i4",
    q: "WHAT DOES A ROUTER DO?",
    a: "It guides packets between different networks — the gateway to the internet.",
    icon: Router,
  },
];

function FlipCard({
  data,
  index,
  flipped,
  onFlip,
}: {
  data: (typeof QUESTIONS)[number];
  index: number;
  flipped: boolean;
  onFlip: () => void;
}) {
  const Icon = data.icon;
  return (
    <motion.button
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 + index * 0.09 }}
      onClick={onFlip}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn("persp h-52 w-full text-left md:h-56", flipped && "flipped")}
      aria-label={data.q}
    >
      <div className="flip-inner">
        {/* question face */}
        <div className="flip-face flex flex-col rounded-3xl border border-cyan-400/30 bg-[#0a1430]/85 p-5 shadow-[0_0_30px_rgba(34,211,238,0.1)] backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-400/10 text-cyan-300">
              <Icon className="h-5 w-5" />
            </div>
            <span className="font-display text-[9px] font-bold tracking-[0.3em] text-slate-500">
              FILE 0{index + 1}
            </span>
          </div>
          <p className="mt-4 font-display text-base font-black leading-snug text-white md:text-lg">{data.q}</p>
          <div className="mt-auto flex items-center gap-2 pt-3 text-cyan-300/80">
            <ScanSearch className="h-3.5 w-3.5" />
            <span className="font-display text-[9px] font-bold tracking-[0.28em]">
              {flipped ? "INTEL SECURED" : "TAP TO COLLECT INTEL"}
            </span>
          </div>
        </div>
        {/* answer face */}
        <div className="flip-face flip-back flex flex-col rounded-3xl border border-emerald-400/40 bg-[#06281f]/90 p-5 shadow-[0_0_30px_rgba(52,211,153,0.18)] backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            <span className="font-display text-[9px] font-bold tracking-[0.3em] text-emerald-300">
              INTEL DECODED · +25 XP
            </span>
          </div>
          <p className="mt-4 text-sm font-medium leading-relaxed text-emerald-50 md:text-base">{data.a}</p>
          <span className="mt-auto pt-3 font-display text-[9px] font-bold tracking-[0.28em] text-emerald-300/70">
            TAP TO FLIP BACK
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function Slide04M1Q({ game }: { game: GameAPI }) {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const flip = (id: string) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    game.collectIntel(id);
  };

  const count = QUESTIONS.filter((q) => flipped.has(q.id)).length;

  return (
    <SlideShell mission="MISSION 1 · INTEL FILE" title="DETECTIVE QUESTIONS" tone="cyan">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        <Chip icon={ScanSearch} tone="emerald">
          INTEL DECODED {count} / 4
        </Chip>
        <div className="h-2 w-36 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            animate={{ width: `${(count / 4) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          />
        </div>
        {count === 4 && (
          <Chip icon={CheckCircle2} tone="amber">
            ALL FILES DECODED, DETECTIVE!
          </Chip>
        )}
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2 md:gap-5">
        {QUESTIONS.map((q, i) => (
          <FlipCard key={q.id} data={q} index={i} flipped={flipped.has(q.id)} onFlip={() => flip(q.id)} />
        ))}
      </div>

      <div className="mt-9">
        <NavButton icon={Map} label="RETURN TO MISSION MAP" onClick={() => game.go(1)} />
      </div>
    </SlideShell>
  );
}
