import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCheck,
  Cloud,
  Monitor,
  Network,
  RotateCcw,
  Router,
  Send,
  X,
  Zap,
} from "lucide-react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ */
/* network geometry (percent coordinates)                               */
/* ------------------------------------------------------------------ */
const PC1: [number, number] = [6, 55];
const SW1: [number, number] = [19, 55];
const R1: [number, number] = [33, 55];
const R2: [number, number] = [67, 55];
const SW2: [number, number] = [81, 55];
const PC2: [number, number] = [94, 55];
const CLOUD: [number, number] = [50, 51];

const ROUTES = {
  top: [
    [41, 26],
    [50, 21],
    [59, 26],
    [67, 55],
  ] as [number, number][],
  bottom: [
    [41, 84],
    [50, 89],
    [59, 84],
    [67, 55],
  ] as [number, number][],
};

const STRAIGHT = 0.5; // seconds per straight segment
const ARC_SEG = { top: 0.42, bottom: 0.62 };
const STAGGER = 0.65;
const STORM_MS = 3200;

const COLORS = ["#22d3ee", "#a78bfa", "#f472b6", "#fbbf24"];

type Route = keyof typeof ROUTES;
type Status = "flying" | "delivered" | "lost";

interface Packet {
  id: number;
  text: string;
  color: string;
  route: Route;
  status: Status;
}

const waypoints = (route: Route): [number, number][] => [PC1, SW1, R1, ...ROUTES[route], SW2, PC2];

const totalTime = (route: Route) => 2 * STRAIGHT + 4 * ARC_SEG[route] + 2 * STRAIGHT;

const keyTimes = (route: Route) => {
  const segs = [STRAIGHT, STRAIGHT, ARC_SEG[route], ARC_SEG[route], ARC_SEG[route], ARC_SEG[route], STRAIGHT, STRAIGHT];
  const total = segs.reduce((a, b) => a + b, 0);
  let acc = 0;
  const times = [0];
  for (const s of segs) {
    acc += s;
    times.push(acc / total);
  }
  return times;
};

interface SimulatorProps {
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export default function Simulator({ open, onClose, onComplete }: SimulatorProps) {
  const [message, setMessage] = useState("HELLO");
  const [packets, setPackets] = useState<Packet[]>([]);
  const [phase, setPhase] = useState<"idle" | "flying" | "done">("idle");
  const [storm, setStorm] = useState(false);
  const [runId, setRunId] = useState(0);
  const timers = useRef<number[]>([]);
  const stormRef = useRef(false);
  const firedRef = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  // keyboard: let the sim own Escape + arrows while open
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", " "].includes(e.key)) e.stopPropagation();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [open, onClose]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const schedulePacket = useCallback(
    (p: Packet, delay: number) => {
      const arcTotal = 4 * ARC_SEG[p.route];
      const midCloud = (delay + 2 * STRAIGHT + arcTotal / 2) * 1000;
      const arrive = (delay + totalTime(p.route)) * 1000;

      timers.current.push(
        window.setTimeout(() => {
          if (stormRef.current) {
            setPackets((prev) => prev.map((x) => (x.id === p.id && x.status === "flying" ? { ...x, status: "lost" } : x)));
          }
        }, midCloud)
      );
      timers.current.push(
        window.setTimeout(() => {
          setPackets((prev) => prev.map((x) => (x.id === p.id && x.status === "flying" ? { ...x, status: "delivered" } : x)));
        }, arrive)
      );
    },
    []
  );

  const send = useCallback(() => {
    const clean = message.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || "HELLO";
    setMessage(clean);
    const chunks = clean.match(/.{1,2}/g) ?? ["HE"];
    const pkts: Packet[] = chunks.map((t, i) => ({
      id: i,
      text: t,
      color: COLORS[i % COLORS.length],
      route: i % 2 === 0 ? "top" : "bottom",
      status: "flying",
    }));
    clearTimers();
    setStorm(false);
    stormRef.current = false;
    setPackets(pkts);
    setRunId((r) => r + 1);
    setPhase("flying");
    pkts.forEach((p, i) => schedulePacket(p, i * STAGGER));
  }, [message, clearTimers, schedulePacket]);

  const causeStorm = useCallback(() => {
    if (phase !== "flying") return;
    setStorm(true);
    stormRef.current = true;
    timers.current.push(
      window.setTimeout(() => {
        setStorm(false);
        stormRef.current = false;
      }, STORM_MS)
    );
  }, [phase]);

  const resendLost = useCallback(() => {
    setStorm(false);
    stormRef.current = false;
    setPackets((prev) => prev.map((p) => (p.status === "lost" ? { ...p, status: "flying", route: "top" } : p)));
    setRunId((r) => r + 1);
    setPhase("flying");
    packets
      .filter((p) => p.status === "lost")
      .forEach((p) => schedulePacket({ ...p, route: "top" }, 0));
  }, [packets, schedulePacket]);

  const reset = useCallback(() => {
    clearTimers();
    setPackets([]);
    setPhase("idle");
    setStorm(false);
    stormRef.current = false;
  }, [clearTimers]);

  // phase resolution + completion reward
  const anyLost = packets.some((p) => p.status === "lost");
  const allResolved = packets.length > 0 && packets.every((p) => p.status !== "flying");
  const allDelivered = packets.length > 0 && packets.every((p) => p.status === "delivered");
  useEffect(() => {
    if (phase === "flying" && allResolved) setPhase("done");
  }, [phase, allResolved]);
  useEffect(() => {
    if (allDelivered && !firedRef.current) {
      firedRef.current = true;
      onComplete?.();
    }
  }, [allDelivered, onComplete]);

  const busy = phase === "flying";

  const caption = storm
    ? { text: "STORM OVER THE INTERNET!", tone: "rose" as const }
    : phase === "idle"
      ? { text: "TYPE A MESSAGE · PRESS SEND", tone: "cyan" as const }
      : phase === "flying"
        ? { text: "PACKETS RACE ACROSS THE NETWORK — WATCH THE TWO ROUTES!", tone: "cyan" as const }
        : anyLost
          ? { text: "A PACKET WAS LOST IN THE STORM — PRESS RESEND!", tone: "rose" as const }
          : { text: "ALL PACKETS ARRIVED — MESSAGE REASSEMBLED!", tone: "emerald" as const };

  const node = (
    Icon: typeof Monitor,
    x: number,
    y: number,
    label: string,
    tone: string,
    key_: string
  ) => (
    <div key={key_} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-sm", tone)}>
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </div>
      <p className="mt-1 text-center font-display text-[7px] font-bold tracking-[0.2em] text-slate-500">{label}</p>
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#02040f]/85 p-3 backdrop-blur-sm md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.88, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-y-auto rounded-3xl border border-cyan-400/30 bg-[#070f28]/95 shadow-[0_0_80px_rgba(34,211,238,0.2)]"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-cyan-400/20 px-5 py-4">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <p className="ml-2 font-display text-sm font-black tracking-[0.25em] text-cyan-200 md:text-base">
                NETWORK SIMULATOR
              </p>
              <span className="ml-2 hidden rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 font-display text-[9px] font-bold tracking-widest text-cyan-300 md:inline">
                MISSION 1 · PACKET PATH
              </span>
              <button
                onClick={onClose}
                aria-label="Close simulator"
                className="ml-auto rounded-lg border border-slate-700 p-2 text-slate-400 transition-colors hover:border-rose-400/60 hover:text-rose-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-4 md:p-6">
              {/* network canvas */}
              <div className="overflow-x-auto rounded-2xl border border-slate-700/70 bg-[#040a1e]">
                <div className="relative h-[290px] min-w-[720px] md:h-[320px]">
                  {/* lines */}
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="6" y1="55" x2="33" y2="55" className="dash-line" stroke="#38bdf8" strokeWidth="0.5" opacity="0.55" />
                    <line x1="67" y1="55" x2="94" y2="55" className="dash-line" stroke="#38bdf8" strokeWidth="0.5" opacity="0.55" />
                    <path d="M33 55 C 38 24 62 24 67 55" fill="none" className="dash-line" stroke="#22d3ee" strokeWidth="0.55" opacity="0.8" />
                    <path d="M33 55 C 38 86 62 86 67 55" fill="none" className="dash-line" stroke="#c084fc" strokeWidth="0.55" opacity="0.8" />
                  </svg>

                  {/* storm flash */}
                  <AnimatePresence>
                    {storm && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: [1, 1.15, 1] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${CLOUD[0]}%`, top: "12%" }}
                      >
                        <Zap className="h-9 w-9 text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.9)]" fill="#fbbf24" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* nodes */}
                  {node(Monitor, PC1[0], PC1[1], "YOU", "border-cyan-300/60 bg-cyan-400/10 text-cyan-300", "pc1")}
                  {node(Network, SW1[0], SW1[1], "SWITCH", "border-sky-300/50 bg-sky-400/10 text-sky-300", "sw1")}
                  {node(Router, R1[0], R1[1], "ROUTER", "border-violet-300/50 bg-violet-400/10 text-violet-300", "r1")}
                  <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${CLOUD[0]}%`, top: `${CLOUD[1]}%` }}>
                    <motion.div
                      animate={storm ? { scale: [1, 1.12, 1] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className={cn(
                        "flex h-14 w-16 items-center justify-center rounded-full border backdrop-blur-sm transition-colors",
                        storm
                          ? "border-amber-300 bg-amber-400/20 text-amber-200 shadow-[0_0_35px_rgba(251,191,36,0.6)]"
                          : "border-fuchsia-300/60 bg-fuchsia-400/10 text-fuchsia-300 shadow-[0_0_25px_rgba(217,70,239,0.35)]"
                      )}
                    >
                      <Cloud className="h-8 w-8" strokeWidth={1.7} />
                    </motion.div>
                    <p className="mt-1 text-center font-display text-[7px] font-bold tracking-[0.2em] text-slate-500">INTERNET</p>
                  </div>
                  {node(Router, R2[0], R2[1], "ROUTER", "border-violet-300/50 bg-violet-400/10 text-violet-300", "r2")}
                  {node(Network, SW2[0], SW2[1], "SWITCH", "border-sky-300/50 bg-sky-400/10 text-sky-300", "sw2")}
                  {node(Monitor, PC2[0], PC2[1], "FRIEND", "border-emerald-300/60 bg-emerald-400/10 text-emerald-300", "pc2")}

                  {/* flying packets */}
                  {packets
                    .filter((p) => p.status === "flying")
                    .map((p) => {
                      const pts = waypoints(p.route);
                      const delay = runId === 0 ? 0 : p.id * STAGGER;
                      return (
                        <motion.div
                          key={`${runId}-${p.id}`}
                          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                          initial={{ left: `${pts[0][0]}%`, top: `${pts[0][1]}%`, opacity: 0 }}
                          animate={{
                            left: pts.map((q) => `${q[0]}%`),
                            top: pts.map((q) => `${q[1]}%`),
                            opacity: [0, 1, 1],
                          }}
                          transition={{
                            duration: totalTime(p.route),
                            times: [0, ...keyTimes(p.route).slice(1)],
                            delay,
                            ease: "linear",
                          }}
                        >
                          <div
                            className="rounded-md border px-2 py-1 font-display text-[9px] font-black tracking-widest"
                            style={{
                              color: p.color,
                              borderColor: p.color,
                              background: "rgba(4,10,30,0.9)",
                              boxShadow: `0 0 14px ${p.color}`,
                            }}
                          >
                            {p.text}
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>

              {/* destination screen */}
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/5 px-4 py-3">
                <p className="font-display text-[9px] font-bold tracking-[0.3em] text-emerald-300">FRIEND'S SCREEN</p>
                <div className="flex gap-2">
                  {packets.length === 0 && (
                    <span className="font-display text-[10px] tracking-[0.3em] text-slate-600">— WAITING FOR PACKETS —</span>
                  )}
                  {packets.map((p) => (
                    <div
                      key={`slot-${p.id}`}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg border font-display text-xs font-black",
                        p.status === "delivered" && "border-emerald-300/70 bg-emerald-400/15 text-emerald-200",
                        p.status === "lost" && "border-rose-400/70 bg-rose-500/15 text-rose-300",
                        p.status === "flying" && "animate-pulse border-dashed border-slate-600 text-slate-600"
                      )}
                    >
                      {p.status === "delivered" ? p.text : p.status === "lost" ? <X className="h-4 w-4" /> : "?"}
                    </div>
                  ))}
                </div>
              </div>

              {/* controls */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8))}
                  disabled={busy}
                  placeholder="HELLO"
                  aria-label="Message to send"
                  className="w-36 rounded-xl border border-cyan-400/40 bg-[#050b22] px-4 py-3 text-center font-display text-lg font-black tracking-[0.25em] text-cyan-200 outline-none transition-shadow placeholder:text-slate-600 focus:shadow-[0_0_20px_rgba(34,211,238,0.35)] disabled:opacity-50"
                />
                <motion.button
                  onClick={send}
                  disabled={busy}
                  whileHover={{ scale: busy ? 1 : 1.05 }}
                  whileTap={{ scale: busy ? 1 : 0.94 }}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3 font-display text-sm font-black tracking-widest text-[#03101f] shadow-[0_0_25px_rgba(34,211,238,0.4)] disabled:opacity-40"
                >
                  <Send className="h-4 w-4" /> SEND
                </motion.button>
                <motion.button
                  onClick={causeStorm}
                  disabled={!busy}
                  whileHover={{ scale: busy ? 1.05 : 1 }}
                  whileTap={{ scale: busy ? 0.94 : 1 }}
                  className="flex items-center gap-2 rounded-xl border-2 border-amber-300/60 bg-amber-400/10 px-6 py-3 font-display text-sm font-black tracking-widest text-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.25)] disabled:opacity-40"
                >
                  <Zap className="h-4 w-4" /> STORM
                </motion.button>
                {anyLost && !busy && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={resendLost}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-400 to-red-500 px-6 py-3 font-display text-sm font-black tracking-widest text-[#2b040d] shadow-[0_0_25px_rgba(251,113,133,0.45)]"
                  >
                    <RotateCcw className="h-4 w-4" /> RESEND LOST
                  </motion.button>
                )}
                <button
                  onClick={reset}
                  className="flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-display text-xs font-bold tracking-widest text-slate-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> RESET
                </button>
              </div>

              {/* caption bar */}
              <div
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-center font-display text-[10px] font-bold tracking-[0.2em] md:text-xs",
                  caption.tone === "rose" && "border-rose-400/40 bg-rose-500/10 text-rose-300",
                  caption.tone === "cyan" && "border-cyan-400/30 bg-cyan-400/8 text-cyan-300",
                  caption.tone === "emerald" && "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                )}
              >
                {caption.tone === "emerald" && <CheckCheck className="h-4 w-4 shrink-0" />}
                {caption.text}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
