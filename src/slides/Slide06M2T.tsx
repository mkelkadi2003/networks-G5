import { motion } from "framer-motion";
import { Send, Users, UsersRound } from "lucide-react";
import { SlideShell } from "../components/Chrome";
import LinkButton from "../components/LinkButton";
import type { GameAPI } from "../types";

const TEAMS = ["ALPHA", "BRAVO", "CHARLIE", "DELTA"];

export default function Slide06M2T({ game }: { game: GameAPI }) {
  return (
    <SlideShell mission="MISSION 2 · TEAM OPS" title="TEAM CHALLENGE" tone="violet">
      {/* squad radar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 15, delay: 0.15 }}
        className="relative mb-8 h-36 w-36 md:h-40 md:w-40"
      >
        <span className="ping-ring" style={{ borderColor: "rgba(52,211,153,0.55)" }} />
        <span className="ping-ring" style={{ animationDelay: "1.2s", borderColor: "rgba(52,211,153,0.55)" }} />
        <div className="absolute inset-0 overflow-hidden rounded-full border border-emerald-400/50 bg-emerald-400/5">
          <div
            className="absolute inset-0 animate-spin"
            style={{
              animationDuration: "3.6s",
              background: "conic-gradient(from 0deg, rgba(52,211,153,0.4), transparent 70deg, transparent 360deg)",
            }}
          />
        </div>
        <div className="absolute inset-5 flex items-center justify-center rounded-full border border-emerald-300/40 bg-[#06281f]/90 shadow-[0_0_30px_rgba(52,211,153,0.35)]">
          <UsersRound className="h-9 w-9 text-emerald-300" strokeWidth={1.8} />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text font-display text-3xl font-black tracking-wide text-transparent md:text-5xl"
      >
        WORK WITH YOUR TEAM!
      </motion.h2>
      <div className="beam mt-4 w-52 md:w-72" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-5 max-w-lg text-sm font-medium tracking-wide text-slate-300 md:text-base"
      >
        Classify the network situations and submit your answers.
      </motion.p>

      {/* team chips */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {TEAMS.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.12 }}
            className="flex items-center gap-2 border border-emerald-300/40 bg-emerald-400/10 px-4 py-2 font-display text-[10px] font-black tracking-[0.25em] text-emerald-200"
            style={{
              clipPath: "polygon(14% 0, 86% 0, 100% 50%, 86% 100%, 14% 100%, 0 50%)",
              animation: `glow-pulse 2.6s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <Users className="h-3.5 w-3.5" />
            TEAM {t}
          </motion.div>
        ))}
      </div>

      <div className="mt-9 flex w-full flex-col items-center gap-4">
        <LinkButton
          k="teamResults"
          label="SUBMIT TEAM RESULTS"
          icon={Send}
          color="emerald"
          onLaunch={(k) => game.markLaunched(k)}
        />
      </div>
    </SlideShell>
  );
}
