import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Zap } from "lucide-react";

import NetworkBackground from "./components/NetworkBackground";
import HUD from "./components/HUD";
import NavBar from "./components/NavBar";

import Slide01Welcome from "./slides/Slide01Welcome";
import Slide02Map from "./slides/Slide02Map";
import Slide03M1 from "./slides/Slide03M1";
import Slide04M1Q from "./slides/Slide04M1Q";
import Slide05M2 from "./slides/Slide05M2";
import Slide06M2T from "./slides/Slide06M2T";
import Slide07M3 from "./slides/Slide07M3";
import Slide08M3R from "./slides/Slide08M3R";
import Slide09Final from "./slides/Slide09Final";
import Slide10Complete from "./slides/Slide10Complete";

import { BADGES, SECTORS, type LinkKey } from "./config";
import type { GameAPI } from "./types";

const SLIDES = [
  Slide01Welcome,
  Slide02Map,
  Slide03M1,
  Slide04M1Q,
  Slide05M2,
  Slide06M2T,
  Slide07M3,
  Slide08M3R,
  Slide09Final,
  Slide10Complete,
];

type Toast = { id: number; msg: string; tone: "xp" | "badge" | "info" };

const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [slide, setSlide] = useState<number>(() => load("iw_slide", 0));
  const [xp, setXp] = useState<number>(() => load("iw_xp", 0));
  const [visited, setVisited] = useState<Set<number>>(() => new Set(load<number[]>("iw_visited", [0])));
  const [intel, setIntel] = useState<Set<string>>(() => new Set(load<string[]>("iw_intel", [])));
  const [launched, setLaunched] = useState<Set<LinkKey>>(() => new Set(load<LinkKey[]>("iw_launched", [])));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const addToast = useCallback((msg: string, tone: Toast["tone"] = "xp") => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, msg, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const addXp = useCallback(
    (n: number, msg: string) => {
      setXp((x) => x + n);
      addToast(`+${n} XP — ${msg}`, "xp");
    },
    [addToast]
  );

  const go = useCallback(
    (n: number) => {
      const total = SECTORS.length;
      const target = ((n % total) + total) % total;
      setSlide(target);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    },
    []
  );

  const next = useCallback(() => go(slide + 1), [go, slide]);

  // discover a new sector -> +50 XP
  useEffect(() => {
    if (!visited.has(slide)) {
      setVisited((v) => new Set(v).add(slide));
      if (slide !== 0 || xp > 0) addXp(50, "NEW SECTOR DISCOVERED");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  // badge engine
  const unlocked = useMemo(
    () => BADGES.filter((b) => b.needs.every((s) => visited.has(s))).map((b) => b.id),
    [visited]
  );
  const prevUnlocked = useRef<string[]>(unlocked);
  useEffect(() => {
    const fresh = unlocked.filter((id) => !prevUnlocked.current.includes(id));
    fresh.forEach((id) => {
      const b = BADGES.find((x) => x.id === id);
      if (!b) return;
      setXp((x) => x + 150);
      addToast(`BADGE UNLOCKED — ${b.name}`, "badge");
    });
    prevUnlocked.current = unlocked;
  }, [unlocked, addToast]);

  // persistence
  useEffect(() => {
    localStorage.setItem("iw_slide", JSON.stringify(slide));
    localStorage.setItem("iw_xp", JSON.stringify(xp));
    localStorage.setItem("iw_visited", JSON.stringify([...visited]));
    localStorage.setItem("iw_intel", JSON.stringify([...intel]));
    localStorage.setItem("iw_launched", JSON.stringify([...launched]));
  }, [slide, xp, visited, intel, launched]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft" && slide > 0) go(slide - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, go, slide]);

  const collectIntel = useCallback(
    (id: string) => {
      if (intel.has(id)) return;
      setIntel((s) => new Set(s).add(id));
      addXp(25, "INTEL DECODED");
    },
    [intel, addXp]
  );

  const markLaunched = useCallback(
    (k: LinkKey) => {
      if (launched.has(k)) return;
      setLaunched((s) => new Set(s).add(k));
      addXp(100, "ACTIVITY LAUNCHED");
    },
    [launched, addXp]
  );

  const reset = useCallback(() => {
    ["iw_slide", "iw_xp", "iw_visited", "iw_intel", "iw_launched"].forEach((k) => localStorage.removeItem(k));
    setSlide(0);
    setXp(0);
    setVisited(new Set([0]));
    setIntel(new Set());
    setLaunched(new Set());
    prevUnlocked.current = [];
    addToast("PROGRESS RESET — MISSION RESTARTED", "info");
  }, [addToast]);

  const game: GameAPI = useMemo(
    () => ({ slide, go, next, xp, visited, unlocked, launched, addXp, markLaunched, collectIntel }),
    [slide, go, next, xp, visited, unlocked, launched, addXp, markLaunched, collectIntel]
  );

  const Current = SLIDES[slide];

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink font-body">
      {/* atmosphere layers */}
      <div className="pointer-events-none fixed -left-44 top-[-12%] z-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none fixed -right-44 top-[15%] z-0 h-[36rem] w-[36rem] rounded-full bg-violet-600/10 blur-[130px]" />
      <div className="pointer-events-none fixed bottom-[-20%] left-1/3 z-0 h-[30rem] w-[30rem] rounded-full bg-blue-600/10 blur-[130px]" />
      <NetworkBackground />
      <div className="fx-grid pointer-events-none fixed inset-0 z-0" />
      <div className="fx-scanlines pointer-events-none fixed inset-0 z-30" />
      <div className="fx-vignette pointer-events-none fixed inset-0 z-30" />

      <HUD xp={xp} slide={slide} visited={visited} unlocked={unlocked} go={go} reset={reset} />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-1 pb-36 pt-24 md:pb-40 md:pt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 30, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.985 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full justify-center"
          >
            <Current game={game} />
          </motion.div>
        </AnimatePresence>
      </main>

      <NavBar slide={slide} go={go} />

      {/* toasts */}
      <div className="pointer-events-none fixed bottom-28 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-32">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 18, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className={
                t.tone === "badge"
                  ? "flex items-center gap-2 rounded-full border border-amber-300/60 bg-[#221302]/95 px-5 py-2.5 font-display text-xs font-black tracking-widest text-amber-200 shadow-[0_0_30px_rgba(251,191,36,0.4)]"
                  : t.tone === "xp"
                    ? "flex items-center gap-2 rounded-full border border-cyan-300/60 bg-[#04182a]/95 px-5 py-2.5 font-display text-xs font-black tracking-widest text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                    : "flex items-center gap-2 rounded-full border border-slate-500/60 bg-[#0a1230]/95 px-5 py-2.5 font-display text-xs font-black tracking-widest text-slate-200"
              }
            >
              {t.tone === "badge" ? <Award className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
