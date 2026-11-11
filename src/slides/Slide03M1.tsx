import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCheck,
  Cloud,
  Monitor,
  MonitorPlay,
  Network,
  Package,
  Router,
  Server,
} from "lucide-react";
import { SlideShell } from "../components/Chrome";
import Simulator from "../components/Simulator";
import { cn } from "../utils/cn";
import type { GameAPI } from "../types";

const GLYPHS = "▓▒░<>/\\|01#*@~$%";
const TARGET = "HELLO WORLD";

function useBrokenMessage(target: string) {
  const [txt, setTxt] = useState(target);
  useEffect(() => {
    const id = setInterval(() => {
      setTxt(
        target
          .split("")
          .map((c) => (c === " " ? " " : Math.random() < 0.2 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : c))
          .join("")
      );
    }, 110);
    return () => clearInterval(id);
  }, [target]);
  return txt;
}

const PATH = [
  { icon: Monitor, label: "YOU", tone: "text-cyan-300 border-cyan-300/50 bg-cyan-400/10" },
  { icon: Network, label: "SWITCH", tone: "text-sky-300 border-sky-300/50 bg-sky-400/10" },
  { icon: Router, label: "ROUTER", tone: "text-violet-300 border-violet-300/50 bg-violet-400/10" },
  { icon: Cloud, label: "INTERNET", tone: "text-fuchsia-300 border-fuchsia-300/50 bg-fuchsia-400/10" },
  { icon: Server, label: "SERVER", tone: "text-violet-300 border-violet-300/50 bg-violet-400/10" },
  { icon: Monitor, label: "FRIEND", tone: "text-cyan-300 border-cyan-300/50 bg-cyan-400/10" },
];

function PacketChip({ label, lost, delay, className }: { label: string; lost?: boolean; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 14 }}
      className={cn("absolute", className)}
    >
      <div
        className={cn(
          "floaty flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-display text-[9px] font-bold tracking-widest",
          lost
            ? "border-rose-400/60 bg-rose-500/15 text-rose-300 shadow-[0_0_14px_rgba(251,113,133,0.35)]"
            : "border-cyan-300/50 bg-cyan-400/10 text-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.3)]"
        )}
        style={{ animationDelay: `${delay * 0.8}s`, animationDuration: `${3 + delay}s` }}
      >
        <Package className="h-3 w-3" />
        {label}
        {lost && <AlertTriangle className="h-3 w-3" />}
      </div>
    </motion.div>
  );
}

export default function Slide03M1({ game }: { game: GameAPI }) {
  const broken = useBrokenMessage(TARGET);
  const [simOpen, setSimOpen] = useState(false);

  return (
    <SlideShell mission="MISSION 1" title="SAVE THE LOST MESSAGE" tone="cyan">
      {/* broken transmission terminal */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-cyan-400/30 bg-[#070f2a]/85 shadow-[0_0_50px_rgba(34,211,238,0.12)] backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-cyan-400/20 bg-[#050b22]/80 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-[10px] tracking-[0.25em] text-slate-500 md:text-xs">
            INCOMING_TRANSMISSION.LOG
          </span>
        </div>

        <div className="relative flex min-h-[150px] items-center justify-center px-6 py-8 md:min-h-[170px]">
          <p className="caret font-display text-3xl font-black tracking-[0.2em] md:text-5xl">
            {broken.split("").map((c, i) => (
              <span key={i} className={c !== TARGET[i] ? "text-rose-400" : "text-cyan-200"}>
                {c}
              </span>
            ))}
          </p>
          <div className="absolute right-4 top-4 -rotate-6 rounded border-2 border-rose-500/70 px-2.5 py-1 font-display text-[9px] font-black tracking-[0.25em] text-rose-400 shadow-[0_0_18px_rgba(251,113,133,0.3)] animate-pulse md:right-6 md:top-5">
            PACKET LOSS DETECTED
          </div>
        </div>

        <PacketChip label="PKT-01 · OK" delay={0.2} className="left-3 top-14 md:left-8" />
        <PacketChip label="PKT-02 · OK" delay={0.4} className="bottom-3 left-6 md:left-16" />
        <PacketChip label="PKT-03 · LOST" lost delay={0.6} className="bottom-4 right-4 md:right-10" />
      </div>

      {/* journey map */}
      <div className="mt-9 w-full max-w-4xl">
        <div className="relative px-1">
          {/* travelling packet dot */}
          <motion.div
            className="absolute top-[19px] z-10 h-3 w-3 rounded-full bg-white shadow-[0_0_14px_#22d3ee,0_0_30px_#22d3ee]"
            animate={{ left: ["3%", "72%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.12, 0.85, 1], ease: "linear" }}
          />
          <div className="flex items-start justify-between">
            {PATH.map((n, i) => {
              const Icon = n.icon;
              const last = i === PATH.length - 1;
              return (
                <div key={i} className="flex flex-1 items-start last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.12 }}
                      className={cn("flex h-10 w-10 items-center justify-center rounded-xl border md:h-12 md:w-12", n.tone)}
                    >
                      <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.9} />
                    </motion.div>
                    <span className="font-display text-[7px] font-bold tracking-widest text-slate-500 md:text-[9px]">
                      {n.label}
                    </span>
                  </div>
                  {!last && (
                    <div className="relative mx-1 mt-[19px] h-0.5 flex-1 md:mx-2">
                      {i < PATH.length - 2 ? (
                        <div className="ants-h absolute inset-0 opacity-80" />
                      ) : (
                        <>
                          <div className="absolute inset-0 border-t-2 border-dashed border-rose-500/60" />
                          <AlertTriangle className="absolute -top-3.5 left-1/2 h-4 w-4 -translate-x-1/2 animate-pulse text-rose-400" />
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-9 font-display text-sm font-bold tracking-[0.2em] text-cyan-200 md:text-lg">
        HOW DO MESSAGES TRAVEL ACROSS NETWORKS?
      </p>

      <div className="mt-6 flex w-full flex-col items-center gap-2.5">
        <motion.button
          onClick={() => setSimOpen(true)}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex w-full max-w-2xl items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-5 font-display text-base font-black tracking-widest text-[#03101f] ring-1 ring-white/30 shadow-[0_0_35px_rgba(34,211,238,0.45)] transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(34,211,238,0.7)] md:px-10 md:py-6 md:text-2xl"
        >
          <span className="shine" />
          <MonitorPlay className="h-6 w-6 shrink-0 md:h-8 md:w-8" strokeWidth={2.4} />
          <span className="leading-none">OPEN NETWORK SIMULATOR</span>
        </motion.button>
        <div className="flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3.5 py-1 font-body text-[10px] font-semibold tracking-wider text-emerald-300 md:text-[11px]">
          <CheckCheck className="h-3.5 w-3.5" />
          BUILT-IN SIMULATOR — RUNS RIGHT HERE, NO LINK NEEDED
        </div>
      </div>

      <Simulator open={simOpen} onClose={() => setSimOpen(false)} onComplete={() => game.addXp(100, "MESSAGE DELIVERED")} />
    </SlideShell>
  );
}
