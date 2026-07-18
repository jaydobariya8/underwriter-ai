import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { DealConfig, DocChecklist, MarketIntel } from "@/types";

let cachedPrompt: string | null = null;

/** The full 2,309-line IP system prompt, read once and memoised. */
export function systemPrompt(): string {
  if (cachedPrompt) return cachedPrompt;
  const path = join(process.cwd(), "prompts", "system_prompt.md");
  cachedPrompt = readFileSync(path, "utf8");
  return cachedPrompt;
}

function checklistLines(c: DocChecklist): string {
  return [
    `Lender presentation: ${c.lenderPresentation ? "Received" : "Pending"}`,
    `Paydown model: ${c.paydownModel ? "Received" : "Pending"}`,
    `Historicals (8Q + 2yr audits): ${c.historicals ? "Received" : "Pending"}`,
    `EBITDA bridge & QoE: ${c.ebitdaBridgeQoe ? "Received" : "Pending"}`,
    `PF cap table: ${c.pfCapTable ? "Received" : "Pending"}`,
  ].join("\n");
}

export function precallInstruction(
  config: DealConfig,
  checklist: DocChecklist,
  intel?: MarketIntel | null,
): string {
  const intelBlock = intel
    ? `\n\nMARKET INTELLIGENCE (from live web search — cite where relevant):\n${intel.summary}`
    : "";
  return `A new transaction has been configured. Prepare the pre-call materials.

Deal configuration:
- Sector: ${config.sector}
- Call type: ${config.callType}
- Transaction type: ${config.txnType}
- Target rating at close: ${config.rating}

Document receipt status:
${checklistLines(checklist)}${intelBlock}

Produce two things and call the emit_precall tool:
1. The Rule 35 standard opening document request email (formal register, subject + body, the eight standard items with paydown model and PF cap table flagged as priority).
2. The pre-call priority question list per the PRE-CALL DOCUMENT INTAKE SEQUENCE Step 6 — each question tagged priority (red = blocks underwriting, yellow = required before IC, blue = standard diligence), category, source document, and intended recipient. Order by priority. Never ask on the call what a received document already answers.`;
}

export function exchangeInstruction(
  speaker: string,
  text: string,
  coveredSoFar: string[],
): string {
  const coveredBlock = coveredSoFar.length
    ? `\n\nAlready covered credibly (do NOT re-ask these):\n- ${coveredSoFar.join("\n- ")}`
    : "";
  return `You are live on the call. New statement from ${speaker}:

"${text}"

Produce your live output per the OUTPUT FORMAT — LIVE AGENT DESIGN section and call the emit_agent_output tool. Maintain cumulative state across the whole call: keep the open list, covered list, and evasion tracking consistent with everything said earlier. ASK NOW is always exactly one question in natural spoken English, collaborative register ("we" not "you"), max 15 words. INTERNAL CALCULATION carries the granular arithmetic (the iceberg — depth internally, brevity on the call). For EACH flag provide four things so a junior analyst can act without extra context: (1) text — the specific observation; (2) rationale — the "so what", i.e. why it matters to the credit and what it distorts if left unresolved; (3) suggestedQuestion — one precise question the analyst could ask to resolve it; (4) rule — the analytical rule number behind it when one applies. Return rulesFired as the rule numbers that fired this exchange, each with a 3-word label.${coveredBlock}`;
}

export const DEBRIEF_INSTRUCTION = `The call has ended. Produce the full post-call debrief and call the emit_debrief tool.

Include, in this priority order: the four-sentence MD summary (Rule 29), the five-minute IC verbal briefing (Rule 30, five fixed sections, spoken English, specific numbers), the seven-dimension credit underwriting scorecard scored 1-5 with thresholds and the /35 total plus PROCEEDS / DOES NOT PROCEED verdict (≥21 to proceed; any single dimension at 1 is a deal-level concern), the key metrics (EBITDA quality level, financing vs credit leverage, 50% repayment test PASS/FAIL/INSUFFICIENT with detail, forecast haircut), top unresolved red items and monitoring yellow items, the escalation block (tier routing per Rule 21 with capital-markets flags kept separate), the follow-up email (formal register, per-item recipient and deadline, Rule 31), the evasion log, and the three-sentence lightweight equity-informed credit note. Ground everything in what was actually said on this call.`;
