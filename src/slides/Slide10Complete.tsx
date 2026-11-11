import { motion } from "framer-motion";
import { Crown, Map, Medal, RotateCcw, Trophy, Zap, Package, Radar, Search } from "lucide-react";
import { Chip, NavButton } from "../components/Chrome";
import Confetti from "../components/Confetti";
import { BADGES } from "../config";
import type { GameAPI } from "../types";

const BADGE_ICONS = { packet: Package, detective: Radar, agent: Search, champion: Trophy } as const;

const PODIUM = [
  {
    rank: "2ND PLACE",
    title: "NETWORK EXPERT",
    h: 100,
    icon: Medal,
    tint: "from-slate-300 to-slate-500",
    ring: "border-slate-300/70 bg-slate-400/15 text-slate-200",
    bar: "from-slate-400/25 to-slate-500/40 border-slate-300/40",
    medal: "text-slate-300",
    delay: 0.6,
  },
  {
    rank: "1ST PLACE",
    title: "INTERNET CHAMPION",
    h: 156,
    icon: Trophy,
    tint: "from-amber-200 to-amber-500",
    ring: "border-amber-300/80 bg-amber-400/15 text-amber-200",
    bar: "from-amber-400/30 to-amber-600/45 border-amber-300/50",
    medal: "text-amber-300",
    delay: 0.45,
  },
  {
    rank: "3RD PLACE",
    title: "DIGITAL DETECTIVE",
    h: 76,
    icon: Medal,
    tint: "from-orange-300 to-orange-600",
    ring: "border-orange-300/70 bg-orange-400/15 text-orange-200",
    bar: "from-orange-400/25 to-orange-600/40 border-orange-300/40",
    medal: "text-orange-300",
    delay: 0.75,
  },
];

export default function Slide10Complete({ game }: { game: GameAPI }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center">
      <Confetti />

      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <Chip icon={Trophy} tone="emerald">
          MISSION COMPLETE
        </Chip>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-5 font-display text-3xl font-black leading-tight tracking-wide md:text-5xl"
      >
        <span className="text-white">CONGRATULATIONS,</span>
        <br />
        <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          INTERNET AGENTS!
        </span>
      </motion.h1>
      <div className="beam mt-5 w-52 md:w-64" />

      {/* podium */}
      <div className="mt-10 flex w-full items-end justify-center gap-3 md:gap-5">
        {PODIUM.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.rank} className="flex w-28 flex-col items-center md:w-40">
              {p.rank === "1ST PLACE" && (
                <motion.div
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 200, damping: 10 }}
                  className="floaty mb-1.5"
                >
                  <Crown className="h-8 w-8 text-amber-300 drop-shadow-[0_0_14px_rgba(251,191,36,0.7)] md:h-10 md:w-10" />
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: p.delay + 0.3, type: "spring", stiffness: 200, damping: 13 }}
                className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 md:h-16 md:w-16 ${p.ring} shadow-[0_0_24px_rgba(251,191,36,0.25)]`}
              >
                <Icon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.7} />
              </motion.div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: p.h }}
                transition={{ delay: p.delay, type: "spring", stiffness: 90, damping: 16 }}
                className={`flex w-full flex-col items-center justify-center rounded-t-2xl border-x border-t bg-gradient-to-b px-2 ${p.bar} backdrop-blur-sm`}
              >
                <p className={`font-display text-[10px] font-black tracking-[0.2em] md:text-xs ${p.medal}`}>{p.rank}</p>
                <p className="mt-1 font-display text-[9px] font-bold leading-snug tracking-widest text-white md:text-[11px]">
                  {p.title}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
      <div className="h-1 w-[21rem] max-w-full rounded-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent md:w-[32rem]" />

      {/* rewards recap */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
      >
        <span className="flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-400/10 px-5 py-2.5 font-display text-sm font-black tracking-widest text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          <Zap className="h-4 w-4" /> TOTAL XP: {game.xp}
        </span>
        {BADGES.filter((b) => game.unlocked.includes(b.id)).map((b) => {
          const BIcon = BADGE_ICONS[b.id];
          return (
            <span
              key={b.id}
              className="flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-400/10 px-4 py-2.5 font-display text-[10px] font-black tracking-widest text-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.25)]"
            >
              <BIcon className="h-4 w-4" /> {b.name}
            </span>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        <NavButton icon={Map} label="BACK TO MISSION MAP" onClick={() => game.go(1)} ghost />
        <NavButton icon={RotateCcw} label="REPLAY MISSION" onClick={() => game.go(0)} />
      </motion.div>
    </div>
  );
}
