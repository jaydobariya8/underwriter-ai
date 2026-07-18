import type { DealWithRelations } from "@/types";

export interface RulePerf {
  rule: number;
  label: string;
  count: number;
}

export interface DashboardStats {
  dealCount: number;
  byStage: { precall: number; live: number; debrief: number };
  pending: number;
  exchanges: number;
  flags: { red: number; amber: number; blue: number; total: number };
  evasions: number;
  debriefCount: number;
  repayment: { pass: number; fail: number; insufficient: number };
  verdict: { proceeds: number; notProceed: number };
  avgScore: number;
  avgCreditLeverage: number | null;
  rulePerf: RulePerf[];
  byDay: { day: string; count: number }[];
  funnel: { label: string; count: number }[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function parseLeadingNumber(s: string): number | null {
  const m = s.match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

export function computeDashboardStats(deals: DealWithRelations[]): DashboardStats {
  const byStage = { precall: 0, live: 0, debrief: 0 };
  const flags = { red: 0, amber: 0, blue: 0, total: 0 };
  const repayment = { pass: 0, fail: 0, insufficient: 0 };
  const verdict = { proceeds: 0, notProceed: 0 };
  const byDay = DAYS.map((day) => ({ day, count: 0 }));
  const ruleMap = new Map<number, RulePerf>();

  let exchanges = 0;
  let evasions = 0;
  let scoreSum = 0;
  let debriefCount = 0;
  const leverages: number[] = [];

  for (const d of deals) {
    byStage[d.stage] = (byStage[d.stage] ?? 0) + 1;

    for (const ex of d.exchanges) {
      exchanges += 1;
      const dayIdx = (new Date(ex.created_at).getDay() + 6) % 7; // Mon=0
      if (byDay[dayIdx]) byDay[dayIdx].count += 1;

      const out = ex.agent_output;
      if (out) {
        for (const f of out.flags) {
          flags.total += 1;
          if (f.severity === "red") flags.red += 1;
          else if (f.severity === "yellow") flags.amber += 1;
          else flags.blue += 1;
        }
        if (out.evasion?.detected) evasions += 1;
      }

      for (const r of ex.rules_fired ?? []) {
        // "R16 blended arithmetic" → { rule: 16, label: "blended arithmetic" }
        const m = r.match(/^R(\d+)\s+(.*)$/);
        if (!m) continue;
        const rule = Number(m[1]);
        const existing = ruleMap.get(rule);
        if (existing) existing.count += 1;
        else ruleMap.set(rule, { rule, label: m[2], count: 1 });
      }
    }

    if (d.debrief) {
      debriefCount += 1;
      const p = d.debrief.payload;
      scoreSum += p.scorecard.total;
      if (p.scorecard.verdict === "PROCEEDS") verdict.proceeds += 1;
      else verdict.notProceed += 1;

      const rt = p.metrics.repaymentTest.status;
      if (rt === "PASS") repayment.pass += 1;
      else if (rt === "FAIL") repayment.fail += 1;
      else repayment.insufficient += 1;

      const lev = parseLeadingNumber(p.metrics.creditLeverage);
      if (lev !== null) leverages.push(lev);
    }
  }

  const rulePerf = [...ruleMap.values()].sort((a, b) => b.count - a.count).slice(0, 7);
  const avgCreditLeverage = leverages.length
    ? Math.round((leverages.reduce((a, b) => a + b, 0) / leverages.length) * 10) / 10
    : null;

  const funnel = [
    { label: "Pre-call", count: deals.length },
    { label: "Live call", count: byStage.live + byStage.debrief },
    { label: "Debrief", count: byStage.debrief },
    { label: "Proceeds to IC", count: verdict.proceeds },
  ];

  return {
    dealCount: deals.length,
    byStage,
    pending: byStage.precall + byStage.live,
    exchanges,
    flags,
    evasions,
    debriefCount,
    repayment,
    verdict,
    avgScore: debriefCount ? Math.round(scoreSum / debriefCount) : 0,
    avgCreditLeverage,
    rulePerf,
    byDay,
    funnel,
  };
}
