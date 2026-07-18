// Call-configuration option lists (from the system prompt's "CALL CONFIGURATION" section)
// and the two canned demo scenarios.

export const SECTORS = [
  "Software / SaaS",
  "TMT",
  "Healthcare",
  "Industrials",
  "Financial services",
  "Infrastructure",
] as const;

export const CALL_TYPES = [
  "Internal relay (lev fin)",
  "Lender call (sponsor + management)",
  "Direct sponsor conversation",
] as const;

export const TXN_TYPES = [
  "LBO (new)",
  "Refinancing",
  "Dividend recapitalisation",
  "Add-on acquisition",
  "Revolver extension",
] as const;

export const RATINGS = [
  "Investment grade",
  "BB / Ba",
  "B+ / B1",
  "B / B2",
  "B- / B3",
  "CCC / Caa",
] as const;

export interface ScenarioMeta {
  key: "kaseya" | "lbo";
  label: string;
  blurb: string;
  name: string;
  sector: string;
  callType: string;
  txnType: string;
  rating: string;
}

export const SCENARIOS: ScenarioMeta[] = [
  {
    key: "kaseya",
    label: "Kaseya — Straight Refi",
    blurb: "Lev fin relay. Clean normalisation story that fails the 50% repayment test at 43%.",
    name: "Kaseya",
    sector: "Software / SaaS",
    callType: "Internal relay (lev fin)",
    txnType: "Refinancing",
    rating: "B / B2",
  },
  {
    key: "lbo",
    label: "Project Atlas — Software LBO",
    blurb: "Lender call. Evasion, fully-expensed 8.5x vs 7x, and a stale SOFR $30mm/yr gap.",
    name: "Project Atlas",
    sector: "Software / SaaS",
    callType: "Lender call (sponsor + management)",
    txnType: "LBO (new)",
    rating: "B / B2",
  },
];
