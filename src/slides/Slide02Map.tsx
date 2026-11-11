import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Lock,
  Mail,
  Radar,
  ScanSearch,
  Trophy,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SlideShell } from "../components/Chrome";
import { cn } from "../utils/cn";
import type { GameAPI } from "../types";

interface MissionCardProps {
  num: string;
  name: string;
  tag: string;
  icon: LucideIcon;
  accent: "cyan" | "violet" | "fuchsia";
  complete: boolean;
  prog: [boolean, boolean];
  onClick: () => void;
  delay: number;
}

const ACCENTS = {
  cyan: {
    border: "border-cyan-400/35 hover:border-cyan-300/80",
    iconBox: "border-cyan-300/50 bg-cyan-400/10 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.3)]",
    bar: "bg-cyan-300",
    glow: "hover:shadow-[0_0_45px_rgba(34,211,238,0.25)]",
    arrow: "text-cyan-300",
  },
  violet: {
    border: "border-violet-400/35 hover:border-violet-300/80",
    iconBox: "border-violet-300/50 bg-violet-400/10 text-violet-300 shadow-[0_0_18px_rgba(168,85,247,0.3)]",
    bar: "bg-violet-400",
    glow: "hover:shadow-[0_0_45px_rgba(168,85,247,0.25)]",
    arrow: "text-violet-300",
  },
  fuchsia: {
    border: "border-fuchsia-400/35 hover:border-fuchsia-300/80",
    iconBox: "border-fuchsia-300/50 bg-fuchsia-400/10 text-fuchsia-300 shadow-[0_0_18px_rgba(232,121,249,0.3)]",
    bar: "bg-fuchsia-400",
    glow: "hover:shadow-[0_0_45px_rgba(217,70,239,0.25)]",
    arrow: "text-fuchsia-300",
  },
};

function MissionCard({ num, name, tag, icon: Icon, accent, complete, prog, onClick, delay }: MissionCardProps) {
  const a = ACCENTS[accent];
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-start overflow-hidden rounded-3xl border bg-[#0a1430]/75 p-5 text-left backdrop-blur-sm transition-shadow duration-300 md:p-6",
        a.border,
        a.glow
      )}
    >
      <span className="pointer-events-none absolute -right-2 -top-6 font-display text-8xl font-black text-stroke-ghost select-none">
        {num}
      </span>
      <div className="flex w-full items-start justify-between">
        <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl border", a.iconBox)}>
          <Icon className="h-7 w-7" strokeWidth={2} />
        </div>
        {complete ? (
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-300/50 bg-emerald-400/15 px-3 py-1 font-display text-[9px] font-bold tracking-widest text-emerald-300">
            <Check className="h-3 w-3" /> COMPLETE
          </span>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 font-display text-[9px] font-bold tracking-widest text-amber-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" /> READY
          </span>
        )}
      </div>

      <p className="mt-5 font-display text-[10px] font-bold tracking-[0.3em] text-slate-400">MISSION {num.slice(1)}</p>
      <h3 className="mt-1 font-display text-lg font-black leading-tight text-white md:text-xl">{name}</h3>
      <p className="mt-1.5 text-xs font-medium tracking-wide text-slate-400">{tag}</p>

      <div className="mt-4 flex w-full items-center justify-between gap-3">
        <div className="flex gap-1.5">
          {prog.map((p, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-8 rounded-full transition-colors",
                p ? a.bar : "bg-slate-700"
              )}
            />
          ))}
        </div>
        <span className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-1 font-display text-[9px] font-bold tracking-widest text-slate-300">
          <Zap className="h-3 w-3 text-cyan-300" /> +100 XP
        </span>
      </div>

      <div className={cn("mt-4 flex w-full items-center justify-between border-t border-slate-700/60 pt-3.5", a.arrow)}>
        <span className="font-display text-[11px] font-bold tracking-[0.25em]">ENTER MISSION</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </div>
    </motion.button>
  );
}

export default function Slide02Map({ game }: { game: GameAPI }) {
  const { visited, unlocked, go } = game;
  const done = (id: string) => unlocked.includes(id);

  return (
    <SlideShell mission="AGENT HQ" title="MISSION MAP" tone="cyan">
      {/* mission control hub */}
      <div className="relative mb-7 flex flex-col items-center">
        <div className="relative flex items-center gap-2.5 rounded-2xl border border-cyan-300/40 bg-[#0a1430] px-5 py-2.5 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
          <span className="ping-ring" style={{ animationDelay: "0.6s" }} />
          <Radar className="h-5 w-5 animate-pulse text-cyan-300" />
          <span className="font-display text-xs font-black tracking-[0.3em] text-cyan-200">MISSION CONTROL</span>
        </div>
        <div className="ants-v mt-0 h-5 w-0.5 opacity-70" />
        <div className="ants-h h-0.5 w-[70%] opacity-70" />
        <div className="hidden w-[70%] justify-between md:flex">
          <span className="ants-v h-5 w-0.5 opacity-70" />
          <span className="ants-v h-5 w-0.5 opacity-70" />
          <span className="ants-v h-5 w-0.5 opacity-70" />
        </div>
      </div>

      <div className="grid w-full gap-4 md:grid-cols-3 md:gap-5">
        <MissionCard
          num="01"
          name="SAVE THE LOST MESSAGE"
          tag="Track how messages travel the network"
          icon={Mail}
          accent="cyan"
          complete={done("packet")}
          prog={[visited.has(2), visited.has(3)]}
          onClick={() => go(2)}
          delay={0.15}
        />
        <MissionCard
          num="02"
          name="NETWORK DETECTIVE"
          tag="Crack the code: LAN vs WAN"
          icon={Radar}
          accent="violet"
          complete={done("detective")}
          prog={[visited.has(4), visited.has(5)]}
          onClick={() => go(4)}
          delay={0.25}
        />
        <MissionCard
          num="03"
          name="SECRET SEARCH AGENTS"
          tag="Unmask the browser & the search engine"
          icon={ScanSearch}
          accent="fuchsia"
          complete={done("agent")}
          prog={[visited.has(6), visited.has(7)]}
          onClick={() => go(6)}
          delay={0.35}
        />
      </div>

      {/* final battle card */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.45 }}
        whileHover={{ y: -5, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => go(8)}
        className="group relative mt-5 flex w-full flex-col items-center gap-4 overflow-hidden rounded-3xl border border-amber-300/40 bg-gradient-to-r from-[#1a0f2e] via-[#241235] to-[#1a0f2e] p-5 backdrop-blur-sm transition-shadow duration-300 hover:border-amber-300/80 hover:shadow-[0_0_55px_rgba(251,191,36,0.28)] md:flex-row md:p-6"
      >
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="rays absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-amber-300/60 bg-amber-400/15 shadow-[0_0_25px_rgba(251,191,36,0.45)]">
          <Trophy className="h-8 w-8 text-amber-300" />
        </div>
        <div className="relative flex-1 text-center md:text-left">
          <p className="font-display text-[10px] font-bold tracking-[0.35em] text-amber-400/90">FINAL BATTLE</p>
          <h3 className="mt-0.5 font-display text-xl font-black text-white md:text-2xl">
            INTERNET AGENT CHAMPIONSHIP
          </h3>
          <p className="mt-1 text-xs tracking-wide text-slate-400">
            {unlocked.length < 3
              ? `Power up first — badges collected: ${unlocked.filter((b) => b !== "champion").length} / 3`
              : "All systems ready. The arena awaits, agent!"}
          </p>
        </div>
        <div className="relative flex shrink-0 items-center gap-2 rounded-xl border border-amber-300/50 bg-amber-400/10 px-5 py-3 font-display text-xs font-black tracking-widest text-amber-200 transition-transform duration-300 group-hover:scale-105">
          {unlocked.length < 3 ? <Lock className="h-4 w-4" /> : null}
          ENTER ARENA
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </motion.button>

    </SlideShell>
  );
}
