// Shared domain types for Underwriter.AI

export type Severity = "red" | "yellow" | "blue";
export type DealStage = "precall" | "live" | "debrief";
export type Speaker = "LEV FIN" | "SPONSOR" | "CEO" | "ANALYST" | "MANAGEMENT";
export type RepaymentStatus = "PASS" | "FAIL" | "INSUFFICIENT DATA";
export type Verdict = "PROCEEDS" | "DOES NOT PROCEED";

export interface DealConfig {
  name: string;
  sector: string;
  callType: string;
  txnType: string;
  rating: string;
  scenarioKey?: ScenarioKey | null;
}

export type ScenarioKey = "kaseya" | "lbo";

export interface DocChecklist {
  lenderPresentation: boolean;
  paydownModel: boolean;
  historicals: boolean;
  ebitdaBridgeQoe: boolean;
  pfCapTable: boolean;
}

export interface Flag {
  category: string;
  severity: Severity;
  text: string;
  /** Why this matters to the credit — the "so what" for the analyst. */
  rationale?: string;
  /** A specific question the analyst can ask to resolve the flag. */
  suggestedQuestion?: string;
  /** The analytical rule number that fired, if applicable. */
  rule?: number;
}

export interface RuleFired {
  rule: number;
  label: string;
}

// emit_agent_output — per live-call exchange
export interface AgentOutput {
  askNow: string;
  internalCalculation: string | null;
  flags: Flag[];
  open: { count: number; items: string[] };
  covered: { count: number; items: string[] };
  evasion: {
    detected: boolean;
    originalQuestion: string;
    pushback: string;
  } | null;
  questionQueue: string[];
  rulesFired: RuleFired[];
}

// emit_precall
export interface PrecallQuestion {
  priority: Severity;
  category: string;
  question: string;
  source: string;
  recipient: string;
}

export interface PrecallOutput {
  docRequestEmail: { subject: string; body: string };
  questionList: PrecallQuestion[];
  marketIntel?: MarketIntel | null;
}

export interface MarketIntelSource {
  title: string;
  url: string;
  snippet: string;
}

export interface MarketIntel {
  summary: string;
  sources: MarketIntelSource[];
}

// emit_debrief
export interface ScorecardDimension {
  name: string;
  score: number;
  threshold: number;
}

export interface DebriefPayload {
  mdSummary: string;
  icBriefing: {
    minute1: string;
    minute2: string;
    minute3: string;
    minute4: string;
    minute5: string;
  };
  scorecard: {
    dimensions: ScorecardDimension[];
    total: number;
    verdict: Verdict;
  };
  metrics: {
    ebitdaQuality: string;
    financingLeverage: string;
    creditLeverage: string;
    repaymentTest: { status: RepaymentStatus; detail: string };
    forecastHaircut: string;
  };
  topUnresolvedRed: string[];
  monitoringYellow: string[];
  escalation: {
    tier: string;
    toVP: string[];
    toILAMD: string[];
    mdAwareness: string;
    capitalMarketsFlags: string[];
  };
  followUpEmail: { subject: string; body: string };
  evasionLog: {
    originalQuestion: string;
    deflection: string;
    pushback: string;
  }[];
  equityCreditNote: string;
}

export interface Exchange {
  id: string;
  deal_id: string;
  seq: number;
  speaker: Speaker;
  speaker_text: string;
  agent_output: AgentOutput | null;
  rules_fired: string[] | null;
  created_at: string;
}

export interface Deal {
  id: string;
  name: string;
  sector: string;
  call_type: string;
  txn_type: string;
  target_rating: string;
  scenario_key: ScenarioKey | null;
  stage: DealStage;
  doc_checklist: DocChecklist;
  precall: PrecallOutput | null;
  created_at: string;
}

export interface Debrief {
  id: string;
  deal_id: string;
  payload: DebriefPayload;
  created_at: string;
}

export interface DealWithRelations extends Deal {
  exchanges: Exchange[];
  debrief: Debrief | null;
}

// Fixture shape for canned scenarios
export interface FixtureExchange {
  seq: number;
  speaker: Speaker;
  text: string;
  fallbackOutput: AgentOutput;
}

export interface Fixture {
  key: ScenarioKey;
  config: { name: string; sector: string; callType: string; txnType: string; rating: string };
  docChecklist: DocChecklist;
  precall: PrecallOutput;
  exchanges: FixtureExchange[];
  fallbackDebrief: DebriefPayload;
}
