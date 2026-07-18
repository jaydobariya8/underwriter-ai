import type { ModelBundle } from "../types";

// B2B enterprise-software LBO. Reconciled to the live-call transcript:
//  - 7.0x on $200mm sponsor adjusted EBITDA -> $1.4bn debt, ~40% sponsor equity.
//  - Credit case expenses $35mm capitalised R&D (leverage -> 8.5x, coverage -> 1.43x)
//    and corrects the stale SOFR assumption (+$30mm/yr interest -> FCF -$210mm).
//  - Sponsor cum 7-yr FCF $869mm (62% repayment, PASS); credit $659mm (47%, FAIL).
// Where the transcript omitted a figure (revenue base, tax/capex/NWC split), values
// are analyst-inferred to foot to the stated FCF and leverage; see `notes`.
export const LBO_MODEL: ModelBundle = {
  meta: {
    company: "B2B Enterprise Software",
    txnType: "LBO",
    rating: "B3 / B-",
    sector: "Software / SaaS",
    closeFY: "FY1 (close)",
    currency: "$mm",
  },
  capital: {
    tranches: [
      { name: "1L Term Loan B", amount: 1100, rate: 0.09 },
      { name: "1L Term Loan A", amount: 150, rate: 0.085 },
      { name: "2L Term Loan", amount: 150, rate: 0.128 },
      { name: "Revolving Credit Facility (undrawn)", amount: 0, rate: 0 },
    ],
    sponsorEquity: 933,
  },
  sponsor: {
    revenue: [667, 747, 837, 937, 1050, 1176, 1317],
    adjEbitda: [200, 224, 251, 281, 315, 352, 395],
    reportedEbitda: [95, 213, 239, 267, 299, 335, 375],
    interest: [85, 85, 85, 85, 85, 85, 85],
    leveredFcf: [53, 78, 105, 130, 155, 168, 180],
    mandatoryAmort: [11, 11, 11, 11, 11, 11, 11],
    ecfSweep: [0, 0, 0, 10, 20, 30, 40],
    build: {
      cashInterest: [85, 85, 85, 85, 85, 85, 85],
      cashTaxes: [15, 20, 28, 36, 45, 55, 66],
      totalCapex: [43, 30, 27, 29, 31, 34, 36],
      nwcChange: [15, 16, 18, 20, 22, 24, 26],
    },
    nrr: 0.03, // 103% NRR -> ~3% implied organic (software proxy)
    revenueGrowthFy1: 0.12,
    marginExpansionBps: 600,
  },
  adjustments: [
    {
      id: "expense-rnd",
      label: "Expense capitalised R&D",
      rationale:
        "Capitalised R&D of $35mm/yr is a recurring operating cost for a software business. Expensing it takes adjusted EBITDA from $200mm to $165mm — leverage from 7.0x to 8.5x. Cash is unchanged (already in capex), so FCF is not affected.",
      severity: "red",
      leverageEbitda: [-35, -35, -35, -35, -35, -35, -35],
      enabledByDefault: true,
      flagCategory: "EBITDA",
    },
    {
      id: "correct-sofr",
      label: "Correct stale SOFR assumption",
      rationale:
        "The model's SOFR assumption is stale; corrected cash interest is ~$115mm vs $85mm — a $30mm/yr gap. FCF falls $30mm each year and FY1 interest coverage drops to ~1.43x.",
      severity: "red",
      fcf: [-30, -30, -30, -30, -30, -30, -30],
      coverageInterest: [30, 30, 30, 30, 30, 30, 30],
      enabledByDefault: true,
      flagCategory: "INTEREST",
    },
    {
      id: "strip-deferred-wc",
      label: "Strip deferred-revenue working capital",
      rule: 9,
      rationale:
        "$15mm/yr of the working-capital source is deferred revenue, which reverses as growth slows. Ex-deferred, operational WC is flat, so the source is not sustainable.",
      severity: "yellow",
      fcf: [-15, -15, -15, -15, -15, -15, -15],
      enabledByDefault: false,
      flagCategory: "CASHFLOW",
    },
    {
      id: "haircut-cloud-migration",
      label: "Haircut cloud-migration growth",
      rule: 16,
      rationale:
        "12% growth requires cloud mix to reach ~75-80% from ~40% today. If migration stalls, growth collapses toward ~3%. Haircut the out-year margin/growth benefit.",
      severity: "yellow",
      leverageEbitda: [0, -8, -18, -30, -45, -62, -80],
      fcf: [0, -6, -14, -24, -36, -50, -64],
      enabledByDefault: false,
      flagCategory: "REVENUE",
    },
  ],
  addBacks: [
    {
      item: "Capitalised R&D / product dev",
      quantumFy1: 35,
      quantumFy2: 38,
      classification: "Challenge",
      rollOff: "Ongoing",
      verdict: "Reject — recurring opex",
      severity: "red",
      note: "In mature software, treat as recurring operating cost. Drives the 7.0x -> 8.5x restatement.",
    },
    {
      item: "Stock-based compensation",
      quantumFy1: 12,
      quantumFy2: 13,
      classification: "Accepted",
      rollOff: "N/A — non-cash",
      verdict: "Accept",
      severity: "green",
      note: "Standard non-cash add-back.",
    },
    {
      item: "Sponsor / management fees",
      quantumFy1: 6,
      quantumFy2: 6,
      classification: "Accepted",
      rollOff: "At exit",
      verdict: "Accept",
      severity: "green",
      note: "Ceases at sponsor exit.",
    },
    {
      item: "Integration / transaction costs",
      quantumFy1: 8,
      quantumFy2: 4,
      classification: "Scrutinised",
      rollOff: "FY1-FY2",
      verdict: "Demand roll-off schedule",
      severity: "yellow",
      note: "Confirm taper; challenge if flat or growing.",
    },
  ],
  historicals: {
    quarters: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
    revenue: [150, 154, 158, 162, 167, 172, 178, 184],
    adjEbitda: [44, 45, 46, 47, 49, 50, 52, 54],
    mgmtForecastEbitda: [45, 47, 48, 49, 51, 53, 55, 57],
    missPct: [-0.022, -0.043, -0.042, -0.041, -0.039, -0.057, -0.055, -0.053],
  },
  notes: [
    "No QoE on this transaction — management accounts reviewed by the sponsor only. The 110% adjustment ratio is Level 4 and requires maximum challenge until independently verified.",
    "Revenue base, tax, capex and NWC splits are analyst-inferred to foot to the sponsor-stated FCF path and 7.0x entry leverage.",
    "RCF assumed undrawn at close.",
    "Credit case (default) = expense R&D + correct SOFR. Toggle the WC and migration adjustments to stress further.",
  ],
};
