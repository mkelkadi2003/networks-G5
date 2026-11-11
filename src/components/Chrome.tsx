import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Target } from "lucide-react";
import { cn } from "../utils/cn";

/* Small neon chip tag */
export function Chip({
  icon: Icon,
  children,
  tone = "violet",
  className,
}: {
  icon?: LucideIcon;
  children: ReactNode;
  tone?: "violet" | "cyan" | "amber" | "emerald" | "rose";
  className?: string;
}) {
  const tones = {
    violet: "border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-300",
    cyan: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
    amber: "border-amber-300/40 bg-amber-400/10 text-amber-300",
    emerald: "border-emerald-300/40 bg-emerald-400/10 text-emerald-300",
    rose: "border-rose-400/40 bg-rose-400/10 text-rose-300",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-display text-[10px] font-bold tracking-[0.28em] md:text-xs",
        tones[tone],
        className
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

/* Consistent slide header — mission tag + big display title + scan beam */
export function SlideShell({
  mission,
  title,
  tone = "cyan",
  children,
  className,
}: {
  mission: string;
  title: ReactNode;
  tone?: "cyan" | "violet" | "amber" | "emerald" | "rose";
  children: ReactNode;
  className?: string;
}) {
  const titleTone = {
    cyan: "text-white",
    violet: "text-white",
    amber: "text-white",
    emerald: "text-white",
    rose: "text-white",
  };
  return (
    <div className={cn("mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center md:px-8", className)}>
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-col items-center"
      >
        <Chip icon={Target} tone={tone}>
          {mission}
        </Chip>
        <h1
          className={cn(
            "mt-4 font-display text-3xl font-black leading-tight tracking-wide md:text-5xl",
            titleTone[tone],
            "drop-shadow-[0_0_24px_rgba(34,211,238,0.35)]"
          )}
        >
          {title}
        </h1>
        <div className="beam mt-4 w-44 md:w-56" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12 }}
        className="mt-8 flex w-full flex-col items-center md:mt-10"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* Large internal-navigation button (e.g. RETURN TO MISSION MAP) */
export function NavButton({
  icon: Icon,
  label,
  onClick,
  ghost = false,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  ghost?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl px-7 py-4 md:px-9 md:py-5",
        "font-display text-sm font-black tracking-widest md:text-lg",
        "transition-shadow duration-300",
        ghost
          ? "border-2 border-violet-400/50 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]"
          : "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]"
      )}
    >
      <span className="shine" />
      <Icon className="h-5 w-5 md:h-6 md:w-6" />
      {label}
    </motion.button>
  );
}
