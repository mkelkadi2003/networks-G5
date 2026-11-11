/* ════════════════════════════════════════════════════════════════════
   TEACHER CONTROL PANEL — ACTIVITY LINKS
   ────────────────────────────────────────────────────────────────────
   Paste your real activity URLs between the quotes below.

   Any value that still starts with "PASTE_" is treated as a labelled
   placeholder: the button stays fully visible on the slide and opens an
   info panel instead of a broken link, so the lesson never crashes.
   ════════════════════════════════════════════════════════════════════ */

// NOTE: The Mission 1 Network Simulator is BUILT IN to the dashboard
// (opens inside the presentation — no link needed).

export const LINKS = {
  // SLIDE 5 — Mission 2 Wordwall "LAN vs WAN" game
  lanWanGame: "PASTE_YOUR_WORDWALL_GAME_LINK_HERE",

  // SLIDE 6 — Mission 2 team results submission
  teamResults: "PASTE_YOUR_TEAM_SUBMISSION_LINK_HERE",

  // SLIDE 7 — Mission 3 Google search (ready to go, edit if needed)
  googleSearch: "https://www.google.com",

  // SLIDE 8 — Mission 3 Google Form for discovery reports
  discoveryForm: "PASTE_YOUR_GOOGLE_FORM_LINK_HERE",

  // SLIDE 9 — Final battle Wayground (Quizizz) quiz
  finalQuiz: "PASTE_YOUR_WAYGROUND_QUIZ_LINK_HERE",
} as const;

export type LinkKey = keyof typeof LINKS;

export const LINK_LABELS: Record<LinkKey, string> = {
  lanWanGame: "Wordwall LAN vs WAN Game",
  teamResults: "Team Results Submission",
  googleSearch: "Google Search",
  discoveryForm: "Google Forms Discovery Report",
  finalQuiz: "Wayground Final Quiz",
};

export const isPlaceholder = (url: string): boolean => url.startsWith("PASTE_");

/* ------------------------------ slide registry ------------------------------ */

export const SECTORS: { label: string; short: string }[] = [
  { label: "WELCOME", short: "START" },
  { label: "MISSION MAP", short: "MAP" },
  { label: "MISSION 1", short: "M1" },
  { label: "MISSION 1 · INTEL", short: "M1+" },
  { label: "MISSION 2", short: "M2" },
  { label: "MISSION 2 · TEAM OPS", short: "M2+" },
  { label: "MISSION 3", short: "M3" },
  { label: "MISSION 3 · REPORT", short: "M3+" },
  { label: "FINAL BATTLE", short: "BOSS" },
  { label: "MISSION COMPLETE", short: "WIN" },
];

/* ------------------------------ badges ------------------------------ */

export const BADGES = [
  { id: "packet", name: "PACKET PILOT", blurb: "Rescued the lost message", needs: [2, 3] },
  { id: "detective", name: "NET DETECTIVE", blurb: "Solved LAN vs WAN", needs: [4, 5] },
  { id: "agent", name: "SEARCH AGENT", blurb: "Investigated the web", needs: [6, 7] },
  { id: "champion", name: "WEB CHAMPION", blurb: "Finished the mission", needs: [9] },
] as const;

export type BadgeId = (typeof BADGES)[number]["id"];
