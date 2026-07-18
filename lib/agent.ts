import { structuredCall, type LlmMessage } from "./llm";
import { MOCK_MODE } from "./config";
import { marketIntel } from "./exa";
import {
  fallbackDebrief,
  fallbackOutput,
  genericFallback,
  getFixture,
} from "./fixtures";
import {
  DEBRIEF_INSTRUCTION,
  exchangeInstruction,
  precallInstruction,
  systemPrompt,
} from "./prompts";
import { AGENT_OUTPUT_SCHEMA, DEBRIEF_SCHEMA, PRECALL_SCHEMA } from "./schemas";
import type {
  AgentOutput,
  DealConfig,
  DealWithRelations,
  DebriefPayload,
  DocChecklist,
  Exchange,
  PrecallOutput,
  ScenarioKey,
  Speaker,
} from "@/types";

// ── PRE-CALL ──
export async function runPrecall(
  config: DealConfig,
  checklist: DocChecklist,
): Promise<PrecallOutput> {
  const intel = await marketIntel(config.name, config.sector, config.txnType);

  if (MOCK_MODE) {
    if (config.scenarioKey) {
      const fx = getFixture(config.scenarioKey);
      return { ...fx.precall, marketIntel: intel };
    }
    // No scenario, no API — return a minimal but valid precall.
    return {
      docRequestEmail: {
        subject: `${config.name} — Initial Document Request`,
        body: "Following our conversation, please provide: paydown model, 8 quarters of quarterly financials, 2 years of audited statements, PF cap table, lender presentation, transaction materials, PF EBITDA bridge, and adjustment details. Paydown model and PF cap table first as priority.",
      },
      questionList: [],
      marketIntel: intel,
    };
  }

  try {
    const out = await structuredCall<PrecallOutput>({
      systemPrompt: systemPrompt(),
      taskInstruction: precallInstruction(config, checklist, intel),
      toolName: "emit_precall",
      schema: PRECALL_SCHEMA,
      maxTokens: 3000,
    });
    return { ...out, marketIntel: intel };
  } catch (err) {
    // Never hard-fail deal creation on an LLM error. Fall back to the fixture precall
    // (if a scenario) or a minimal standard document request.
    console.error("runPrecall failed, using fallback:", err);
    if (config.scenarioKey) {
      const fx = getFixture(config.scenarioKey);
      return { ...fx.precall, marketIntel: intel };
    }
    return {
      docRequestEmail: {
        subject: `${config.name} — Initial Document Request`,
        body: "Following our conversation, please provide the following materials at your earliest convenience so we can begin our review:\n\n1. Paydown model\n2. Last 8 quarters of quarterly financials\n3. Minimum 2 years of audited financial statements\n4. PF cap table\n5. Most recent lender presentation\n6. Transaction materials (CIM, management presentation)\n7. PF EBITDA bridge\n8. Adjustment details with roll-off schedule\n\nWe would appreciate receiving the paydown model and PF cap table first as priority items. Please let us know if any of these materials are not yet available.",
      },
      questionList: [],
      marketIntel: intel,
    };
  }
}

// ── LIVE EXCHANGE ──
function buildHistory(prior: Exchange[]): LlmMessage[] {
  const msgs: LlmMessage[] = [];
  for (const ex of prior) {
    msgs.push({ role: "user", content: `${ex.speaker}: "${ex.speaker_text}"` });
    if (ex.agent_output) {
      msgs.push({ role: "assistant", content: JSON.stringify(ex.agent_output) });
    }
  }
  return msgs;
}

export async function runExchange(
  deal: DealWithRelations,
  speaker: Speaker,
  text: string,
): Promise<AgentOutput> {
  const seq = deal.exchanges.length + 1;
  const scenario = deal.scenario_key as ScenarioKey | null;

  // Mock mode: a genuine scripted play (exact fixture text) returns ground-truth;
  // any custom free-text runs the live evasion detector — so the judge-participation
  // moment behaves like the real API even with no key.
  if (MOCK_MODE) {
    if (scenario) {
      const scripted = getFixture(scenario).exchanges.find((e) => e.seq === seq);
      if (scripted && scripted.text === text) return scripted.fallbackOutput;
    }
    return genericFallback(text);
  }

  const coveredSoFar = deal.exchanges
    .flatMap((e) => e.agent_output?.covered.items ?? [])
    .slice(-12);

  try {
    return await structuredCall<AgentOutput>({
      systemPrompt: systemPrompt(),
      taskInstruction: exchangeInstruction(speaker, text, coveredSoFar),
      toolName: "emit_agent_output",
      schema: AGENT_OUTPUT_SCHEMA,
      messages: buildHistory(deal.exchanges),
      maxTokens: 3000,
    });
  } catch (err) {
    // On-stage insurance: never crash the HUD. Fall back to ground truth if canned.
    console.error("runExchange failed, using fallback:", err);
    if (scenario) {
      const fb = fallbackOutput(scenario, seq);
      if (fb) return fb;
    }
    return genericFallback(text);
  }
}

// ── DEBRIEF ──
export async function runDebrief(deal: DealWithRelations): Promise<DebriefPayload> {
  const scenario = deal.scenario_key as ScenarioKey | null;

  if (MOCK_MODE) {
    if (scenario) {
      const fb = fallbackDebrief(scenario);
      if (fb) return fb;
    }
    return buildGenericDebrief(deal);
  }

  try {
    return await structuredCall<DebriefPayload>({
      systemPrompt: systemPrompt(),
      taskInstruction: DEBRIEF_INSTRUCTION,
      toolName: "emit_debrief",
      schema: DEBRIEF_SCHEMA,
      messages: buildHistory(deal.exchanges),
      maxTokens: 8000,
    });
  } catch (err) {
    console.error("runDebrief failed, using fallback:", err);
    if (scenario) {
      const fb = fallbackDebrief(scenario);
      if (fb) return fb;
    }
    return buildGenericDebrief(deal);
  }
}

// Synthesises a plausible debrief from the call's own flags/evasions. Used when there's
// no scripted fixture and no live API — keeps every deal debrief-able in mock mode.
function buildGenericDebrief(deal: DealWithRelations): DebriefPayload {
  const flags = deal.exchanges.flatMap((e) => e.agent_output?.flags ?? []);
  const reds = flags.filter((f) => f.severity === "red");
  const ambers = flags.filter((f) => f.severity === "yellow");
  const evasions = deal.exchanges
    .map((e) => e.agent_output?.evasion)
    .filter((v): v is NonNullable<typeof v> => Boolean(v?.detected));

  const base = 24 - reds.length * 3 - ambers.length;
  const total = Math.max(7, Math.min(30, base));
  const passes = total >= 21;
  const dims = [
    "Business quality",
    "Sector tailwind",
    "EBITDA quality",
    "Repayment capacity",
    "Leverage and coverage",
    "Structural protections",
    "Forecast credibility",
  ];
  const per = Math.max(1, Math.min(5, Math.round(total / 7)));
  const dimensions = dims.map((name, i) => ({
    name,
    score: i < reds.length ? Math.max(1, per - 1) : per,
    threshold: name === "Forecast credibility" ? 2 : 3,
  }));

  return {
    mdSummary: `${deal.name} is a ${deal.txn_type} in ${deal.sector}. The call surfaced ${reds.length} deal-level and ${ambers.length} monitoring flags across ${deal.exchanges.length} exchanges. ${evasions.length ? `${evasions.length} evasion${evasions.length === 1 ? "" : "s"} were detected and pushed back on.` : "No evasions were detected."} Before IC, resolve the open red items and complete the credit case from the full sponsor model.`,
    icBriefing: {
      minute1: `This is a ${deal.txn_type} in ${deal.sector}, rated ${deal.target_rating} at close. The credit case is being built from the diligence call and the documents received to date.`,
      minute2: `The counterparty was ${evasions.length ? "guarded on key figures" : "responsive"}; ${flags.length} flags were logged in total, with the analytical rules firing as expected on leverage, EBITDA quality, and repayment.`,
      minute3: reds.length
        ? `The thing that concerns me most is ${reds[0].text}`
        : "No single deal-level concern dominates yet — the work is completing verification across EBITDA, repayment, and structure.",
      minute4: ambers.length
        ? `Beyond that we're watching: ${ambers.slice(0, 3).map((a) => a.text).join("; ")}.`
        : "Monitoring items are limited at this stage.",
      minute5: "Before IC we need the full sponsor model FCF build, the EBITDA adjustment schedule with roll-off, and a QoE where one is not yet commissioned.",
    },
    scorecard: { dimensions, total, verdict: passes ? "PROCEEDS" : "DOES NOT PROCEED" },
    metrics: {
      ebitdaQuality: reds.some((f) => /ebitda/i.test(f.category)) ? "Level 3-4 — aggressive add-backs flagged" : "Level 2 — verification pending",
      financingLeverage: "Per sponsor deck (to verify)",
      creditLeverage: "To be finalised from the sponsor model",
      repaymentTest: {
        status: reds.some((f) => /repay/i.test(f.category)) ? "FAIL" : "INSUFFICIENT DATA",
        detail: "Cumulative 7-year levered FCF test pending the full paydown model.",
      },
      forecastHaircut: "Apply once miss history and organic baseline are established",
    },
    topUnresolvedRed: reds.slice(0, 5).map((f) => f.text),
    monitoringYellow: ambers.slice(0, 5).map((f) => f.text),
    escalation: {
      tier: "Tier 1 — mid-size PF hold. VP is primary approver.",
      toVP: ambers.slice(0, 3).map((f) => f.text),
      toILAMD: reds.slice(0, 3).map((f) => f.text),
      mdAwareness: `${deal.txn_type} in ${deal.sector} with ${reds.length} deal-level flags. Credit case in progress.`,
      capitalMarketsFlags: [],
    },
    followUpEmail: {
      subject: `${deal.name} — Follow-Up Items Before IC`,
      body: "Thank you for the call today. To finalise our credit assessment ahead of committee, please provide: the full sponsor model FCF build; the EBITDA adjustment schedule with roll-off per line item; a QoE report or the plan to commission one; and the year-by-year FCF schedule for back-weighting. As priority, the sponsor model and EBITDA bridge are the gating items.",
    },
    evasionLog: evasions.map((e) => ({
      originalQuestion: e.originalQuestion,
      deflection: "Qualitative comfort given where a specific figure was requested.",
      pushback: e.pushback,
    })),
    equityCreditNote: "Sponsor alignment to be assessed once the equity contribution and cushion are confirmed from the PF cap table. Recommend standard structural protections pending the completed credit case.",
  };
}
