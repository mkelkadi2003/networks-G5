import type { LinkKey } from "./config";

/** Shared game-state API handed down to every slide + HUD/chrome component. */
export interface GameAPI {
  slide: number;
  go: (n: number) => void;
  next: () => void;
  xp: number;
  visited: Set<number>;
  unlocked: string[];
  launched: Set<LinkKey>;
  addXp: (n: number, msg: string) => void;
  markLaunched: (k: LinkKey) => void;
  collectIntel: (id: string) => void;
}
