import { motion } from "framer-motion";
import { House, Map, ChevronLeft, ChevronRight, Keyboard } from "lucide-react";
import { SECTORS } from "../config";
import { cn } from "../utils/cn";

interface NavBarProps {
  slide: number;
  go: (n: number) => void;
}

const ghost =
  "group flex items-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-400/5 px-4 py-3 font-display text-xs font-bold tracking-widest text-cyan-200 transition-all duration-200 hover:border-cyan-300/60 hover:bg-cyan-400/15 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)] active:scale-95 disabled:pointer-events-none disabled:opacity-30";

export default function NavBar({ slide, go }: NavBarProps) {
  const total = SECTORS.length;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:px-6 md:pb-4" aria-label="Main navigation">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-2xl border border-cyan-400/25 bg-[#060d29]/90 px-3 py-2.5 shadow-[0_0_45px_rgba(34,211,238,0.14)] backdrop-blur-md md:gap-3 md:px-4">
        <div className="flex items-center gap-2">
          <button className={ghost} onClick={() => go(0)} aria-label="Home — Welcome">
            <House className="h-4 w-4" />
            <span className="hidden sm:inline">HOME</span>
          </button>
          <button className={ghost} onClick={() => go(1)} aria-label="Mission Map">
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">MAP</span>
          </button>
        </div>

        <div className="hidden flex-col items-center md:flex">
          <p className="font-display text-[10px] font-bold tracking-[0.3em] text-violet-300">
            SECTOR {String(slide + 1).padStart(2, "0")} / {total}
          </p>
          <p className="text-[11px] font-semibold tracking-wider text-slate-400">{SECTORS[slide].label}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={ghost}
            onClick={() => go(slide - 1)}
            disabled={slide === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">BACK</span>
          </button>
          <motion.button
            onClick={() => go((slide + 1) % total)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className={cn(
              "glow-pulse flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-3",
              "font-display text-sm font-black tracking-widest text-[#03101f] md:px-7"
            )}
            aria-label="Next slide"
          >
            NEXT
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      <p className="mt-1.5 hidden items-center justify-center gap-1.5 text-[10px] tracking-widest text-slate-600 md:flex">
        <Keyboard className="h-3 w-3" /> USE ARROW KEYS TO NAVIGATE
      </p>
    </nav>
  );
}
