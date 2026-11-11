import { motion } from "framer-motion";
import { Check, ClipboardCheck, ClipboardList, SatelliteDish } from "lucide-react";
import { SlideShell } from "../components/Chrome";
import LinkButton from "../components/LinkButton";
import type { GameAPI } from "../types";

const LINES = ["BROWSER = ?", "SEARCH ENGINE = ?", "THE DIFFERENCE IS…"];

export default function Slide08M3R({ game }: { game: GameAPI }) {
  return (
    <SlideShell mission="MISSION 3 · DEBRIEF" title="REPORT YOUR DISCOVERY" tone="rose">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text font-display text-3xl font-black tracking-wide text-transparent md:text-5xl"
      >
        REPORT YOUR FINDINGS!
      </motion.h2>

      {/* report transmission visual */}
      <div className="relative mt-9 flex w-full max-w-xl flex-col items-center">
        {/* HQ receiver */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-2 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/50 bg-cyan-400/10 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.35)]"
        >
          <span className="ping-ring" />
          <SatelliteDish className="h-7 w-7" strokeWidth={1.8} />
        </motion.div>
        <div className="ants-v h-8 w-0.5 opacity-80" />

        {/* clipboard report */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 150, damping: 16 }}
          className="w-full overflow-hidden rounded-3xl border border-fuchsia-400/35 bg-[#12082b]/85 shadow-[0_0_45px_rgba(217,70,239,0.15)] backdrop-blur-sm"
        >
          <div className="flex items-center gap-2.5 border-b border-fuchsia-400/20 bg-[#0b0520]/70 px-5 py-3">
            <ClipboardList className="h-5 w-5 text-fuchsia-300" />
            <span className="font-display text-[10px] font-bold tracking-[0.3em] text-fuchsia-200">
              AGENT FIELD REPORT
            </span>
            <span className="ml-auto flex items-center gap-1.5 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2.5 py-0.5 font-display text-[8px] font-bold tracking-widest text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> LIVE
            </span>
          </div>
          <div className="flex flex-col gap-3 px-6 py-6">
            {LINES.map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.2 }}
                className="flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/30 px-4 py-3"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-emerald-300/60 bg-emerald-400/15">
                  <Check className="h-3 w-3 text-emerald-300" strokeWidth={3.5} />
                </span>
                <span className="font-display text-xs font-bold tracking-[0.2em] text-slate-300 md:text-sm">{l}</span>
                <span className="caret ml-auto text-fuchsia-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-9 flex w-full flex-col items-center gap-4">
        <LinkButton
          k="discoveryForm"
          label="SUBMIT YOUR ANSWERS"
          icon={ClipboardCheck}
          color="violet"
          onLaunch={(k) => game.markLaunched(k)}
        />
      </div>
    </SlideShell>
  );
}
