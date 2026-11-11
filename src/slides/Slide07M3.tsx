import { motion } from "framer-motion";
import { AppWindow, Search, Globe2, FileQuestion } from "lucide-react";
import { Chip, SlideShell } from "../components/Chrome";
import LinkButton from "../components/LinkButton";
import { cn } from "../utils/cn";
import type { GameAPI } from "../types";

function Dossier({
  icon: Icon,
  name,
  file,
  rotate,
  delay,
}: {
  icon: typeof AppWindow;
  name: string;
  file: string;
  rotate: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 140, damping: 14 }}
      whileHover={{ scale: 1.04, rotate: 0 }}
      className={cn(
        "relative w-44 overflow-hidden rounded-2xl border border-fuchsia-400/35 bg-[#12082b]/85 p-5 backdrop-blur-sm md:w-56 md:p-6",
        "shadow-[0_0_35px_rgba(217,70,239,0.15)]",
        rotate
      )}
    >
      <span className="pointer-events-none absolute -bottom-3 -right-2 select-none font-display text-8xl font-black text-stroke-ghost">
        ?
      </span>
      <div className="rounded border border-rose-400/40 bg-rose-500/10 px-2 py-1 text-center font-display text-[8px] font-black tracking-[0.3em] text-rose-300">
        {file} · CLASSIFIED
      </div>
      <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-xl border border-fuchsia-300/50 bg-fuchsia-400/10 text-fuchsia-300 md:h-16 md:w-16">
        <Icon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.8} />
      </div>
      <p className="mt-4 font-display text-sm font-black tracking-widest text-white md:text-base">{name}</p>
      <p className="mt-1 font-display text-[8px] font-bold tracking-[0.3em] text-fuchsia-300/70">IDENTITY UNKNOWN</p>
    </motion.div>
  );
}

export default function Slide07M3({ game }: { game: GameAPI }) {
  return (
    <SlideShell mission="MISSION 3" title="SECRET SEARCH AGENTS" tone="rose">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-gradient-to-r from-fuchsia-300 via-white to-cyan-300 bg-clip-text font-display text-3xl font-black tracking-wide text-transparent md:text-5xl"
      >
        INVESTIGATE THE WEB!
      </motion.h2>

      {/* classified dossiers */}
      <div className="mt-9 flex flex-wrap items-center justify-center gap-5 md:gap-8">
        <Dossier icon={AppWindow} name="BROWSER" file="FILE 01" rotate="-rotate-3" delay={0.25} />
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-fuchsia-300/60 bg-gradient-to-br from-fuchsia-500 to-violet-600 font-display text-xs font-black text-white shadow-[0_0_25px_rgba(217,70,239,0.5)]"
          style={{ clipPath: "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)" }}
        >
          VS
        </div>
        <Dossier icon={Search} name="SEARCH ENGINE" file="FILE 02" rotate="rotate-3" delay={0.35} />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-9 font-display text-sm font-bold tracking-[0.2em] text-slate-200 md:text-lg"
      >
        DISCOVER THE DIFFERENCE — <span className="text-fuchsia-300">WHO DOES WHAT?</span>
      </motion.p>

      <div className="mt-6 flex w-full flex-col items-center gap-4">
        <LinkButton
          k="googleSearch"
          label="OPEN GOOGLE SEARCH"
          icon={Globe2}
          color="blue"
          onLaunch={(k) => game.markLaunched(k)}
        />
        <Chip icon={FileQuestion} tone="rose" className="opacity-80">
          SEARCH: BROWSER VS SEARCH ENGINE
        </Chip>
      </div>
    </SlideShell>
  );
}
