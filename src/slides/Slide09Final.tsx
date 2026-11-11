import { motion } from "framer-motion";
import { Flag, Swords, Trophy } from "lucide-react";
import { Chip, NavButton } from "../components/Chrome";
import LinkButton from "../components/LinkButton";
import type { GameAPI } from "../types";

export default function Slide09Final({ game }: { game: GameAPI }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Chip icon={Swords} tone="rose">
          FINAL BATTLE · BOSS LEVEL
        </Chip>
      </motion.div>

      {/* trophy arena */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.2 }}
        className="relative mt-8 flex h-52 w-52 items-center justify-center md:h-64 md:w-64"
      >
        <div className="rays absolute inset-0" />
        <div className="rays violet absolute inset-0 opacity-60" style={{ animationDirection: "reverse" }} />
        <span className="ping-ring gold" />
        <span className="ping-ring gold" style={{ animationDelay: "1.3s" }} />
        <div className="floaty glow-pulse-gold relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-amber-300/70 bg-[#221302] md:h-40 md:w-40">
          <Trophy className="h-16 w-16 text-amber-300 md:h-20 md:w-20" strokeWidth={1.5} />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-8 font-display text-4xl font-black leading-tight tracking-wide md:text-6xl"
      >
        <span className="text-white drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]">INTERNET AGENT</span>
        <br />
        <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]">
          CHAMPIONSHIP
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.62 }}
        className="mt-9 flex w-full flex-col items-center gap-4"
      >
        <LinkButton
          k="finalQuiz"
          label="START FINAL QUIZ"
          icon={Swords}
          color="amber"
          onLaunch={(k) => game.markLaunched(k)}
        />
        <NavButton icon={Flag} label="CLAIM VICTORY" onClick={() => game.go(9)} ghost />
      </motion.div>
    </div>
  );
}
