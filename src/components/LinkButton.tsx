import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Link2, X, Server, CheckCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LINKS, LINK_LABELS, isPlaceholder, type LinkKey } from "../config";
import { cn } from "../utils/cn";

type ColorKey = "cyan" | "blue" | "violet" | "emerald" | "amber" | "rose";

const COLORS: Record<
  ColorKey,
  { btn: string; glow: string; chip: string }
> = {
  cyan: {
    btn: "from-cyan-400 to-sky-500 text-[#03101f]",
    glow: "shadow-[0_0_35px_rgba(34,211,238,0.45)] hover:shadow-[0_0_60px_rgba(34,211,238,0.7)]",
    chip: "border-cyan-300/40 bg-cyan-400/10 text-cyan-300",
  },
  blue: {
    btn: "from-sky-400 to-blue-600 text-[#020c22]",
    glow: "shadow-[0_0_35px_rgba(59,130,246,0.45)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7)]",
    chip: "border-sky-300/40 bg-sky-400/10 text-sky-300",
  },
  violet: {
    btn: "from-fuchsia-400 to-violet-600 text-[#160524]",
    glow: "shadow-[0_0_35px_rgba(168,85,247,0.45)] hover:shadow-[0_0_60px_rgba(168,85,247,0.7)]",
    chip: "border-fuchsia-300/40 bg-fuchsia-400/10 text-fuchsia-300",
  },
  emerald: {
    btn: "from-emerald-300 to-teal-500 text-[#02281c]",
    glow: "shadow-[0_0_35px_rgba(52,211,153,0.45)] hover:shadow-[0_0_60px_rgba(52,211,153,0.7)]",
    chip: "border-emerald-300/40 bg-emerald-400/10 text-emerald-300",
  },
  amber: {
    btn: "from-amber-300 to-orange-500 text-[#2a1502]",
    glow: "shadow-[0_0_35px_rgba(251,191,36,0.5)] hover:shadow-[0_0_60px_rgba(251,191,36,0.75)]",
    chip: "border-amber-300/40 bg-amber-400/10 text-amber-300",
  },
  rose: {
    btn: "from-rose-400 to-red-500 text-[#2b040d]",
    glow: "shadow-[0_0_35px_rgba(251,113,133,0.45)] hover:shadow-[0_0_60px_rgba(251,113,133,0.7)]",
    chip: "border-rose-300/40 bg-rose-400/10 text-rose-300",
  },
};

interface LinkButtonProps {
  k: LinkKey;
  label: string;
  icon: LucideIcon;
  color?: ColorKey;
  onLaunch?: (k: LinkKey) => void;
}

/**
 * The giant neon "activity launcher" used on every mission slide.
 * - If the URL in src/config.ts is still a PASTE_ placeholder, the button
 *   opens a clearly labelled teacher info panel instead of a dead link.
 * - If it is a real URL, it launches the activity in a new tab.
 */
export default function LinkButton({ k, label, icon: Icon, color = "cyan", onLaunch }: LinkButtonProps) {
  const [open, setOpen] = useState(false);
  const url = LINKS[k];
  const placeholder = isPlaceholder(url);
  const c = COLORS[color];

  const host = (() => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return null;
    }
  })();

  const handle = () => {
    if (placeholder) {
      setOpen(true);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
      onLaunch?.(k);
    }
  };

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-2.5">
      <motion.button
        onClick={handle}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl",
          "bg-gradient-to-r px-6 py-5 md:px-10 md:py-6",
          "font-display text-base font-black tracking-widest md:text-2xl",
          "ring-1 ring-white/30 transition-shadow duration-300",
          c.btn,
          c.glow
        )}
      >
        <span className="shine" />
        <Icon className="h-6 w-6 shrink-0 md:h-8 md:w-8" strokeWidth={2.4} />
        <span className="leading-none">{label}</span>
        <ExternalLink className="h-4 w-4 shrink-0 opacity-70 md:h-6 md:w-6" />
        <span className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white/20" />
      </motion.button>

      {/* hyperlink slot status — always clearly labelled */}
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border px-3.5 py-1 font-body text-[10px] font-semibold tracking-wider md:text-[11px]",
          placeholder ? "border-amber-300/40 bg-amber-400/10 text-amber-300" : "border-emerald-300/40 bg-emerald-400/10 text-emerald-300"
        )}
      >
        {placeholder ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            LINK PLACEHOLDER — teacher pastes the {LINK_LABELS[k]} URL in src/config.ts
          </>
        ) : (
          <>
            <CheckCheck className="h-3.5 w-3.5" />
            LIVE LINK — opens {host ?? "activity"} in a new tab
          </>
        )}
      </div>

      {/* placeholder info panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#02040f]/80 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border border-amber-300/40 bg-[#0a1230] p-7 text-center shadow-[0_0_70px_rgba(251,191,36,0.25)]"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-lg border border-slate-700 p-1.5 text-slate-400 hover:border-rose-400/50 hover:text-rose-300"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/50 bg-amber-400/10">
                <Link2 className="h-8 w-8 text-amber-300" />
              </div>
              <p className="font-display text-lg font-black tracking-widest text-amber-300">TEACHER LINK SLOT</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                This big button is fully wired for{" "}
                <span className="font-bold text-white">{LINK_LABELS[k]}</span>. Paste the real activity
                address here:
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-cyan-400/25 bg-[#050b22] px-4 py-3">
                <Server className="h-4 w-4 shrink-0 text-cyan-300" />
                <code className="font-mono text-xs text-cyan-200 md:text-sm">
                  src/config.ts → LINKS.{k}
                </code>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-300 to-orange-500 py-3.5 font-display text-sm font-black tracking-widest text-[#2a1502] transition-transform hover:scale-[1.02] active:scale-95"
              >
                GOT IT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
