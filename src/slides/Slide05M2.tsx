import { motion } from "framer-motion";
import { Gamepad2, Globe, Monitor, Network, School, Server } from "lucide-react";
import { Chip, SlideShell } from "../components/Chrome";
import LinkButton from "../components/LinkButton";
import { cn } from "../utils/cn";
import type { GameAPI } from "../types";

function Node({
  icon: Icon,
  x,
  y,
  tone,
  big = false,
  delay = 0,
}: {
  icon: typeof Monitor;
  x: number;
  y: number;
  tone: string;
  big?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 220, damping: 15 }}
      className={cn(
        "absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border backdrop-blur-sm",
        big ? "h-14 w-14 md:h-16 md:w-16" : "h-10 w-10 md:h-11 md:w-11",
        tone
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <Icon className={big ? "h-7 w-7 md:h-8 md:w-8" : "h-5 w-5"} strokeWidth={1.8} />
    </motion.div>
  );
}

export default function Slide05M2({ game }: { game: GameAPI }) {
  return (
    <SlideShell mission="MISSION 2" title="NETWORK DETECTIVE" tone="violet">
      <div className="relative grid w-full gap-5 md:grid-cols-2 md:gap-8">
        {/* VS emblem (desktop) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
          <div
            className="flex h-14 w-14 items-center justify-center border border-violet-300/60 bg-gradient-to-br from-violet-500 to-fuchsia-600 font-display text-sm font-black text-white shadow-[0_0_30px_rgba(168,85,247,0.55)]"
            style={{ clipPath: "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)" }}
          >
            VS
          </div>
        </div>

        {/* LAN panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="overflow-hidden rounded-3xl border border-cyan-400/30 bg-[#0a1430]/80 backdrop-blur-sm transition-shadow hover:shadow-[0_0_45px_rgba(34,211,238,0.2)]"
        >
          <div className="flex items-center justify-between border-b border-cyan-400/20 px-5 py-4">
            <div className="flex items-center gap-3">
              <School className="h-6 w-6 text-cyan-300" />
              <div className="text-left">
                <p className="font-display text-2xl font-black text-white md:text-3xl">LAN</p>
                <p className="font-display text-[8px] font-bold tracking-[0.28em] text-cyan-300 md:text-[9px]">
                  LOCAL AREA NETWORK
                </p>
              </div>
            </div>
            <Chip tone="cyan">ONE SMALL PLACE</Chip>
          </div>
          <div className="relative h-52 md:h-56">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="50" y1="52" x2="50" y2="13" className="dash-line" stroke="#22d3ee" strokeWidth="0.6" opacity="0.7" />
              <line x1="50" y1="52" x2="16" y2="88" className="dash-line" stroke="#22d3ee" strokeWidth="0.6" opacity="0.7" />
              <line x1="50" y1="52" x2="50" y2="88" className="dash-line" stroke="#22d3ee" strokeWidth="0.6" opacity="0.7" />
              <line x1="50" y1="52" x2="84" y2="88" className="dash-line" stroke="#22d3ee" strokeWidth="0.6" opacity="0.7" />
              <circle r="1.3" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 4px #22d3ee)" }}>
                <animateMotion dur="2.6s" repeatCount="indefinite" path="M50 52 L16 88" />
              </circle>
              <circle r="1.3" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 4px #22d3ee)" }}>
                <animateMotion dur="2.6s" begin="1.1s" repeatCount="indefinite" path="M50 52 L84 88" />
              </circle>
            </svg>
            <Node icon={School} x={50} y={13} tone="border-cyan-300/50 bg-cyan-400/10 text-cyan-300" delay={0.25} />
            <Node icon={Network} x={50} y={52} tone="border-cyan-200/70 bg-cyan-400/15 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.45)]" big delay={0.35} />
            <Node icon={Monitor} x={16} y={88} tone="border-cyan-300/50 bg-cyan-400/10 text-cyan-300" delay={0.45} />
            <Node icon={Monitor} x={50} y={88} tone="border-cyan-300/50 bg-cyan-400/10 text-cyan-300" delay={0.55} />
            <Node icon={Monitor} x={84} y={88} tone="border-cyan-300/50 bg-cyan-400/10 text-cyan-300" delay={0.65} />
          </div>
        </motion.div>

        {/* WAN panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="overflow-hidden rounded-3xl border border-violet-400/30 bg-[#0d0a2e]/80 backdrop-blur-sm transition-shadow hover:shadow-[0_0_45px_rgba(168,85,247,0.2)]"
        >
          <div className="flex items-center justify-between border-b border-violet-400/20 px-5 py-4">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-violet-300" />
              <div className="text-left">
                <p className="font-display text-2xl font-black text-white md:text-3xl">WAN</p>
                <p className="font-display text-[8px] font-bold tracking-[0.28em] text-violet-300 md:text-[9px]">
                  WIDE AREA NETWORK
                </p>
              </div>
            </div>
            <Chip tone="violet">THE WHOLE WORLD</Chip>
          </div>
          <div className="relative h-52 md:h-56">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M12 15 Q4 50 50 50" fill="none" className="dash-line" stroke="#a855f7" strokeWidth="0.6" opacity="0.7" />
              <path d="M88 15 Q96 50 50 50" fill="none" className="dash-line" stroke="#a855f7" strokeWidth="0.6" opacity="0.7" />
              <path d="M12 85 Q4 50 50 50" fill="none" className="dash-line" stroke="#a855f7" strokeWidth="0.6" opacity="0.7" />
              <path d="M88 85 Q96 50 50 50" fill="none" className="dash-line" stroke="#a855f7" strokeWidth="0.6" opacity="0.7" />
              <circle r="1.3" fill="#c084fc" style={{ filter: "drop-shadow(0 0 4px #c084fc)" }}>
                <animateMotion dur="3.2s" repeatCount="indefinite" path="M12 15 Q4 50 50 50" />
              </circle>
              <circle r="1.3" fill="#c084fc" style={{ filter: "drop-shadow(0 0 4px #c084fc)" }}>
                <animateMotion dur="3.6s" begin="1.4s" repeatCount="indefinite" path="M88 85 Q96 50 50 50" />
              </circle>
            </svg>
            <Node icon={Server} x={12} y={15} tone="border-violet-300/50 bg-violet-400/10 text-violet-300" delay={0.35} />
            <Node icon={Server} x={88} y={15} tone="border-violet-300/50 bg-violet-400/10 text-violet-300" delay={0.45} />
            <Node icon={Server} x={12} y={85} tone="border-violet-300/50 bg-violet-400/10 text-violet-300" delay={0.55} />
            <Node icon={Server} x={88} y={85} tone="border-violet-300/50 bg-violet-400/10 text-violet-300" delay={0.65} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="ping-ring violet" />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 15 }}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-200/70 bg-violet-400/15 text-violet-100 shadow-[0_0_25px_rgba(168,85,247,0.5)] md:h-16 md:w-16"
              >
                <Globe className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.6} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <p className="mt-9 font-display text-sm font-bold tracking-[0.2em] text-slate-200 md:text-lg">
        WHICH NETWORK IS <span className="text-violet-300">BIGGER</span>?
      </p>

      <div className="mt-6 flex w-full flex-col items-center gap-4">
        <LinkButton
          k="lanWanGame"
          label="PLAY LAN VS WAN GAME"
          icon={Gamepad2}
          color="violet"
          onLaunch={(k) => game.markLaunched(k)}
        />
      </div>
    </SlideShell>
  );
}
