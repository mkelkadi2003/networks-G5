import { motion, AnimatePresence } from "framer-motion";
import { Package, Radar, Search, Trophy, Zap, RotateCcw, Lock } from "lucide-react";
import { BADGES, SECTORS } from "../config";
import { cn } from "../utils/cn";
import BassamEmblem from "./BassamEmblem";

const BADGE_ICONS = { packet: Package, detective: Radar, agent: Search, champion: Trophy } as const;

interface HUDProps {
  xp: number;
  slide: number;
  visited: Set<number>;
  unlocked: string[];
  go: (n: number) => void;
  reset: () => void;
}

export default function HUD({ xp, slide, visited, unlocked, go, reset }: HUDProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-cyan-400/15 bg-[#050b22]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-3 py-2.5 md:px-6">
        {/* school identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-1.5 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
            <BassamEmblem size={32} className="h-8 w-8 shrink-0" />
            <div className="leading-none">
              <p className="font-body text-[11px] font-bold tracking-tight text-[#17245e]">
                Al-Bassam <span className="whitespace-nowrap">Schools</span>
              </p>
              <p className="font-arabic text-[10px] font-semibold text-[#17245e]/70">مدارس البسام</p>
            </div>
          </div>
          <p className="hidden font-display text-[10px] font-bold tracking-[0.3em] text-cyan-300/80 lg:block">
            THE INVISIBLE WEB
          </p>
        </div>

        {/* sector progress */}
        <div className="hidden items-center gap-1.5 md:flex" role="navigation" aria-label="Slide progress">
          {SECTORS.map((s, i) => {
            const isCurrent = i === slide;
            const isVisited = visited.has(i);
            return (
              <button
                key={s.short}
                onClick={() => go(i)}
                title={s.label}
                aria-label={`Go to ${s.label}`}
                className={cn(
                  "group relative h-7 w-7 rounded-md border font-display text-[8px] font-bold transition-all duration-300",
                  isCurrent
                    ? "border-cyan-300 bg-cyan-400/25 text-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
                    : isVisited
                      ? "border-violet-400/50 bg-violet-500/20 text-violet-300 hover:bg-violet-500/35"
                      : "border-slate-600/60 bg-slate-800/40 text-slate-500 hover:border-cyan-400/40 hover:text-cyan-300"
                )}
              >
                {s.short}
              </button>
            );
          })}
        </div>

        {/* XP + badges */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-label="Badges">
            {BADGES.map((b) => {
              const Icon = BADGE_ICONS[b.id];
              const got = unlocked.includes(b.id);
              return (
                <motion.div
                  key={b.id}
                  initial={false}
                  animate={got ? { scale: [1, 1.35, 1] } : {}}
                  transition={{ duration: 0.5 }}
                  title={got ? `${b.name} — ${b.blurb}` : `Locked badge: ${b.name}`}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
                    got
                      ? "border-amber-300/70 bg-amber-400/15 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
                      : "border-slate-700 bg-slate-800/50 text-slate-600"
                  )}
                >
                  {got ? <Icon className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1.5 shadow-[0_0_16px_rgba(34,211,238,0.25)]">
            <Zap className="h-4 w-4 text-cyan-300" />
            <AnimatePresence mode="popLayout">
              <motion.span
                key={xp}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-display text-sm font-bold tabular-nums text-cyan-200"
              >
                {xp}
              </motion.span>
            </AnimatePresence>
            <span className="font-display text-[9px] font-bold tracking-widest text-cyan-400/70">XP</span>
          </div>

          <button
            onClick={reset}
            title="Reset mission progress"
            aria-label="Reset mission progress"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 text-slate-500 transition-colors hover:border-rose-400/50 hover:text-rose-300"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
