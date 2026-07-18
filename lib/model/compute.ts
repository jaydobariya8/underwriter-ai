import { MODEL_YEARS, type CreditAdjustment, type ModelBundle } from "./types";

const zeros = () => Array(MODEL_YEARS).fill(0) as number[];
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const addVec = (a: number[], b: number[]) => a.map((x, i) => x + (b[i] ?? 0));

export interface ModelFlag {
  id: string;
  label: string;
  severity: "red" | "yellow" | "blue" | "green";
  value: string; // the number that fired it
  detail: string;
}

export interface ResolvedModel {
  caseLabel: "Sponsor" | "Credit";
  // resolved lines
  revenue: number[];
  leverageEbitda: number[];
  interest: number[];
  leveredFcf: number[];
  // debt
  totalDebtAtClose: number;
  openingDebt: number[];
  mandatoryAmort: number[];
  ecfSweep: number[];
  closingDebt: number[];
  annualRepaid: number[];
  leverageByYear: number[];
  entryLeverage: number;
  exitLeverage: number;
  // tests
  cumFcf: number;
  repaymentCapacity: number; // cumFcf / totalDebtAtClose
  repaymentPass: boolean;
  fcf13: number;
  fcf47: number;
  backWeightPct: number;
  backWeightFlag: boolean;
  // coverage / quality
  coverage: number[];
  entryCoverage: number;
  adjustmentRatio: number;
  ebitdaQualityLevel: string;
  // equity / margin
  equityCushionPct: number;
  marginPct: number[];
  // meta
  appliedAdjustmentIds: string[];
  flags: ModelFlag[];
}

export function totalDebt(bundle: ModelBundle): number {
  return sum(bundle.capital.tranches.map((t) => t.amount));
}

export function ebitdaQualityLevel(adjRatio: number): string {
  if (adjRatio > 1) return "Level 4 — >100% adjusted. Maximum challenge.";
  if (adjRatio > 0.5) return "Level 3 — 50-100% adjusted. Deep scrutiny.";
  if (adjRatio > 0.2) return "Level 2 — 20-50% adjusted. Require roll-off.";
  if (adjRatio > 0) return "Level 1 — <20% adjusted. Limited challenge.";
  return "Not yet quantified.";
}

/** Default credit-case adjustment ids (those flagged enabledByDefault). */
export function defaultCreditIds(bundle: ModelBundle): string[] {
  return bundle.adjustments.filter((a) => a.enabledByDefault).map((a) => a.id);
}

function pick(adjustments: CreditAdjustment[], enabled: Set<string>) {
  return adjustments.filter((a) => enabled.has(a.id));
}

/**
 * Resolve a case. With no enabled adjustments this is the sponsor case; with the
 * default set it is the credit case; with an arbitrary subset it is whatever the
 * analyst is exploring. All deltas layer additively onto the sponsor inputs.
 */
export function computeModel(bundle: ModelBundle, enabledIds: Iterable<string>): ResolvedModel {
  const enabled = new Set(enabledIds);
  const applied = pick(bundle.adjustments, enabled);
  const s = bundle.sponsor;

  let leveredFcf = [...s.leveredFcf];
  let leverageEbitda = [...s.adjEbitda];
  let interest = [...s.interest];
  for (const a of applied) {
    if (a.fcf) leveredFcf = addVec(leveredFcf, a.fcf);
    if (a.leverageEbitda) leverageEbitda = addVec(leverageEbitda, a.leverageEbitda);
    if (a.coverageInterest) interest = addVec(interest, a.coverageInterest);
  }

  const td = totalDebt(bundle);

  // Debt schedule: mandatory amort + ECF sweep reduce the balance each year.
  const mandatoryAmort = [...s.mandatoryAmort];
  const ecfSweep = [...s.ecfSweep];
  const openingDebt = zeros();
  const closingDebt = zeros();
  const annualRepaid = zeros();
  let bal = td;
  for (let i = 0; i < MODEL_YEARS; i++) {
    openingDebt[i] = bal;
    const repaid = mandatoryAmort[i] + ecfSweep[i];
    annualRepaid[i] = repaid;
    bal = Math.max(0, bal - repaid);
    closingDebt[i] = bal;
  }

  const leverageByYear = closingDebt.map((d, i) =>
    leverageEbitda[i] > 0 ? d / leverageEbitda[i] : 0,
  );
  const entryLeverage = leverageEbitda[0] > 0 ? td / leverageEbitda[0] : 0;
  const exitLeverage = leverageByYear[MODEL_YEARS - 1];

  const cumFcf = sum(leveredFcf);
  const repaymentCapacity = td > 0 ? cumFcf / td : 0;
  const fcf13 = sum(leveredFcf.slice(0, 3));
  const fcf47 = sum(leveredFcf.slice(3));
  const backWeightPct = cumFcf !== 0 ? fcf47 / cumFcf : 0;

  const coverage = leverageEbitda.map((e, i) => (interest[i] > 0 ? e / interest[i] : 0));

  const adjustmentRatio =
    s.reportedEbitda[0] > 0 ? (s.adjEbitda[0] - s.reportedEbitda[0]) / s.reportedEbitda[0] : 0;

  const equity = bundle.capital.sponsorEquity;
  const equityCushionPct = equity + td > 0 ? equity / (equity + td) : 0;

  const marginPct = leverageEbitda.map((e, i) => (s.revenue[i] > 0 ? e / s.revenue[i] : 0));

  const caseLabel: "Sponsor" | "Credit" = applied.length === 0 ? "Sponsor" : "Credit";

  const flags = computeFlags({
    bundle,
    entryLeverage,
    repaymentCapacity,
    backWeightPct,
    adjustmentRatio,
    equityCushionPct,
    entryCoverage: coverage[0],
    marginExpansionBps: s.marginExpansionBps,
    nrr: s.nrr,
    revGrowth: s.revenueGrowthFy1,
  });

  return {
    caseLabel,
    revenue: s.revenue,
    leverageEbitda,
    interest,
    leveredFcf,
    totalDebtAtClose: td,
    openingDebt,
    mandatoryAmort,
    ecfSweep,
    closingDebt,
    annualRepaid,
    leverageByYear,
    entryLeverage,
    exitLeverage,
    cumFcf,
    repaymentCapacity,
    repaymentPass: repaymentCapacity >= 0.5,
    fcf13,
    fcf47,
    backWeightPct,
    backWeightFlag: backWeightPct > 0.6,
    coverage,
    entryCoverage: coverage[0],
    adjustmentRatio,
    ebitdaQualityLevel: ebitdaQualityLevel(adjustmentRatio),
    equityCushionPct,
    marginPct,
    appliedAdjustmentIds: applied.map((a) => a.id),
    flags,
  };
}

function pct(x: number): string {
  return `${(x * 100).toFixed(0)}%`;
}

function computeFlags(args: {
  bundle: ModelBundle;
  entryLeverage: number;
  repaymentCapacity: number;
  backWeightPct: number;
  adjustmentRatio: number;
  equityCushionPct: number;
  entryCoverage: number;
  marginExpansionBps: number;
  nrr: number;
  revGrowth: number;
}): ModelFlag[] {
  const flags: ModelFlag[] = [];
  const isRefi = /refi/i.test(args.bundle.meta.txnType);

  flags.push({
    id: "leverage",
    label: "Leverage branch",
    severity: args.entryLeverage >= 4 ? "yellow" : "green",
    value: `${args.entryLeverage.toFixed(1)}x`,
    detail:
      args.entryLeverage >= 4
        ? "Above 4x — full credit case required. All frameworks activated."
        : "Below 4x — lighter touch. No full credit case required.",
  });

  flags.push({
    id: "repayment",
    label: "50% repayment test",
    severity: args.repaymentCapacity >= 0.5 ? "green" : "red",
    value: pct(args.repaymentCapacity),
    detail:
      args.repaymentCapacity >= 0.5
        ? "Cumulative 7-yr FCF repays >50% of close debt."
        : "Below 50% — lenders dependent on a refinancing or exit for repayment.",
  });

  flags.push({
    id: "backweight",
    label: "Back-weighting",
    severity: args.backWeightPct > 0.6 ? "yellow" : "green",
    value: pct(args.backWeightPct),
    detail:
      args.backWeightPct > 0.6
        ? ">60% of repayment falls in years 4-7 — thin near-term cushion."
        : "Repayment not excessively back-weighted.",
  });

  flags.push({
    id: "coverage",
    label: "Interest coverage (FY1)",
    severity: args.entryCoverage < 1.5 ? "red" : args.entryCoverage < 2 ? "yellow" : "green",
    value: `${args.entryCoverage.toFixed(2)}x`,
    detail:
      args.entryCoverage < 1.5
        ? "Coverage below 1.5x — dangerously thin; FY1 FCF near breakeven."
        : args.entryCoverage < 2
          ? "Coverage 1.5-2.0x — monitor closely."
          : "Coverage above 2.0x.",
  });

  flags.push({
    id: "ebitda-quality",
    label: "EBITDA quality",
    severity:
      args.adjustmentRatio > 1
        ? "red"
        : args.adjustmentRatio > 0.2
          ? "yellow"
          : "green",
    value: pct(args.adjustmentRatio),
    detail: ebitdaQualityLevel(args.adjustmentRatio),
  });

  if (isRefi) {
    flags.push({
      id: "margin",
      label: "Margin expansion",
      severity: args.marginExpansionBps > 100 ? "yellow" : "green",
      value: `${args.marginExpansionBps}bps`,
      detail:
        args.marginExpansionBps > 100
          ? ">100bps in a straight refi with no structural change — named catalyst required."
          : "Within expected range.",
    });
  }

  if (args.nrr > 0) {
    const gap = args.revGrowth - args.nrr;
    flags.push({
      id: "nrr",
      label: "NRR vs revenue growth",
      severity: gap > 0.03 ? "yellow" : "green",
      value: `${pct(args.revGrowth)} vs ${pct(args.nrr)}`,
      detail:
        gap > 0.03
          ? "Revenue growth exceeds NRR by >3% — demand the bridge for the incremental growth."
          : "Revenue growth consistent with NRR.",
    });
  }

  flags.push({
    id: "equity-cushion",
    label: "Equity cushion",
    severity: args.equityCushionPct < 0.2 ? "red" : "green",
    value: pct(args.equityCushionPct),
    detail:
      args.equityCushionPct < 0.2
        ? "Below 20% — sponsor alignment materially weakened."
        : "Adequate equity cushion.",
  });

  return flags;
}
