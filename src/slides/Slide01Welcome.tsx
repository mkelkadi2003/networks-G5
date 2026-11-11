import { motion } from "framer-motion";
import { Globe, Play } from "lucide-react";
import { Chip } from "../components/Chrome";
import BassamEmblem from "../components/BassamEmblem";
import type { GameAPI } from "../types";

export default function Slide01Welcome({ game }: { game: GameAPI }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <span className="rounded-full bg-white p-1 shadow-[0_0_16px_rgba(34,211,238,0.3)]">
          <BassamEmblem size={30} className="block h-[30px] w-[30px]" />
        </span>
        <Chip icon={Globe} tone="cyan">
          AL-BASSAM SCHOOLS · GRADE 5 ICT · THE INTERNET & THE WEB
        </Chip>
      </motion.div>

      {/* orbiting network globe */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.15 }}
        className="relative mt-8 h-40 w-40 md:h-48 md:w-48"
      >
        <span className="ping-ring" style={{ animationDelay: "0.2s" }} />
        <span className="ping-ring violet" style={{ animationDelay: "1.2s" }} />
        <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow">
          <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]" />
          <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300/70 shadow-[0_0_10px_#22d3ee]" />
        </div>
        <div className="absolute -inset-4 rounded-full border border-violet-400/30 animate-spin-rev">
          <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-violet-400 shadow-[0_0_12px_#a855f7]" />
        </div>
        <div className="glow-pulse absolute inset-6 flex items-center justify-center rounded-full border border-cyan-300/40 bg-[#0a1430]">
          <Globe className="h-14 w-14 text-cyan-300 md:h-16 md:w-16" strokeWidth={1.4} />
        </div>
      </motion.div>

      {/* glitch title */}
      <motion.h1
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        data-text="THE INVISIBLE WEB"
        className="glitch mt-8 font-display text-4xl font-black tracking-wide text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.45)] sm:text-5xl md:text-7xl"
      >
        THE INVISIBLE WEB
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mt-5 flex items-center gap-3 rounded-xl border border-cyan-400/40 bg-cyan-400/5 px-6 py-2.5"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />
        <p className="font-display text-sm font-bold tracking-[0.35em] text-cyan-300 md:text-lg">
          INTERNET RESCUE MISSION
        </p>
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />
      </motion.div>



      {/* start button */}
      <motion.button
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.75 }}
        onClick={() => game.go(1)}
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.94 }}
        className="group relative mt-10 flex items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-10 py-5 font-display text-lg font-black tracking-[0.2em] text-[#03101f] ring-1 ring-white/30 glow-pulse md:px-14 md:py-6 md:text-2xl"
      >
        <span className="shine" />
        <Play className="h-6 w-6 md:h-8 md:w-8" strokeWidth={2.6} />
        START MISSION
      </motion.button>


    </div>
  );
}
