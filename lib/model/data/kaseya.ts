import type { ModelBundle } from "../types";

// Kaseya — straight refinancing. Reconciled to the live-call transcript:
//  - 7.0x on $600mm adjusted EBITDA -> ~$4.2bn debt; adjustment ratio ~34% (Level 2).
//  - Sponsor cum 7-yr FCF $1.82bn -> 43% repayment (FAIL); 66% back-weighted to yrs 4-7.
//  - Credit case nets the ~150bps channel-margin dilution out of the S&M efficiency
//    gain and prices unnamed-catalyst risk -> cum FCF ~$1.60bn -> ~38% (still FAIL).
// De-leveraging is driven by EBITDA growth, not debt repayment (1% amort; ECF sweep
// steps to 0% at 4.0x). Equity cushion is analyst-inferred; see `notes`.
export const KASEYA_MODEL: ModelBundle = {
  meta: {
    company: "Kaseya",
    txnType: "Refinancing",
    rating: "B / B2",
    sector: "Software / SaaS",
    closeFY: "Dec-2024",
    currency: "$mm",
  },
  capital: {
    tranches: [
      { name: "1L Term Loan B (BSL refi)", amount: 4200, rate: 0.09 },
      { name: "Revolving Credit Facility (undrawn)", amount: 0, rate: 0 },
    ],
    sponsorEquity: 2260,
  },
  sponsor: {
    revenue: [1500, 1665, 1848, 2051, 2276, 2526, 2803],
    adjEbitda: [600, 672, 752, 842, 943, 1056, 1183],
    reportedEbitda: [448, 501, 561, 628, 704, 788, 883],
    interest: [378, 375, 370, 363, 354, 344, 333],
    leveredFcf: [180, 210, 230, 250, 270, 300, 380],
    mandatoryAmort: [42, 42, 42, 42, 42, 42, 42],
    ecfSweep: [30, 40, 50, 40, 20, 0, 0],
    build: {
      cashInterest: [378, 375, 370, 363, 354, 344, 333],
      cashTaxes: [30, 45, 62, 82, 105, 130, 158],
      totalCapex: [30, 34, 39, 44, 50, 56, 63],
      nwcChange: [20, 22, 25, 28, 32, 36, 40],
    },
    nrr: 0.075, // 108% NRR -> ~7.5% implied organic (software proxy)
    revenueGrowthFy1: 0.11,
    marginExpansionBps: 450,
  },
  adjustments: [
    {
      id: "net-margin-dilution",
      label: "Net channel gross-margin dilution",
      rule: 6,
      rationale:
        "The ~150bps of channel gross-margin dilution is not netted out of the S&M efficiency gain. Net margin expansion — and out-year EBITDA — is overstated; this reduces the FCF path and the repayment capacity.",
      severity: "yellow",
      leverageEbitda: [0, -15, -30, -45, -60, -75, -90],
      fcf: [-10, -20, -30, -35, -40, -40, -45],
      enabledByDefault: true,
      flagCategory: "MARGINS",
    },
    {
      id: "unnamed-catalyst",
      label: "Price unnamed margin catalyst",
      rule: 6,
      rationale:
        "400-500bps of margin expansion on a straight refi with no named, quantified catalyst. Haircut the unsupported portion until the line-item bridge is provided.",
      severity: "yellow",
      leverageEbitda: [0, -10, -20, -30, -40, -50, -60],
      fcf: [0, -10, -20, -25, -30, -35, -40],
      enabledByDefault: false,
      flagCategory: "MARGINS",
    },
    {
      id: "forecast-haircut",
      label: "Apply forecast-miss haircut",
      rationale:
        "Historical actuals show a persistent low-single-digit miss to management forecast. Apply a haircut to the back-weighted out-year cash flows the repayment case depends on.",
      severity: "yellow",
      fcf: [0, 0, -15, -20, -25, -30, -40],
      enabledByDefault: false,
      flagCategory: "REVENUE",
    },
  ],
  addBacks: [
    {
      item: "Integration costs (Datto)",
      quantumFy1: 25,
      quantumFy2: 0,
      classification: "Scrutinised",
      rollOff: "FY1 (severance tail)",
      verdict: "Demand roll-off schedule",
      severity: "yellow",
      note: "$25mm severance tail in FY25; confirm it is the full remaining amount and in the model.",
    },
    {
      item: "Restructuring charges",
      quantumFy1: 0,
      quantumFy2: 0,
      classification: "Scrutinised",
      rollOff: "FY23 only",
      verdict: "Accept if truly FY23-only",
      severity: "yellow",
      note: "Confirm no recurrence across periods.",
    },
    {
      item: "Stock-based compensation",
      quantumFy1: 60,
      quantumFy2: 66,
      classification: "Accepted",
      rollOff: "N/A — non-cash",
      verdict: "Accept",
      severity: "green",
      note: "Standard non-cash add-back.",
    },
    {
      item: "Sponsor / management fees",
      quantumFy1: 40,
      quantumFy2: 42,
      classification: "Accepted",
      rollOff: "At exit",
      verdict: "Accept",
      severity: "green",
      note: "Ceases at sponsor exit.",
    },
  ],
  historicals: {
    quarters: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
    revenue: [330, 342, 351, 360, 370, 381, 393, 405],
    adjEbitda: [128, 133, 137, 141, 146, 150, 155, 160],
    mgmtForecastEbitda: [130, 136, 140, 144, 149, 154, 159, 164],
    missPct: [-0.015, -0.022, -0.021, -0.021, -0.02, -0.026, -0.025, -0.024],
  },
  notes: [
    "Straight refinancing — no new money. De-leveraging is driven by EBITDA growth, not debt repayment (1% mandatory amort; ECF sweep steps to 0% at 4.0x by ~year 5).",
    "Adjustment ratio ~34% (FY24) vs ~148% (FY23) — Level 2. Requires the line-by-line bridge to verify genuine roll-off, not reclassification.",
    "No QoE commissioned for the refi — the credit team carries the full add-back verification burden.",
    "Equity cushion and tax/capex/NWC splits are analyst-inferred; the FCF path is the sponsor-stated year-by-year build ($1.82bn cumulative).",
  ],
};
