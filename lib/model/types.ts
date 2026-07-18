// Domain types for the live paydown model.
//
// A deal carries a ModelBundle: the sponsor case (numbers as presented) plus a set
// of analyst "credit adjustments" that, when applied, produce the credit case. The
// compute engine (compute.ts) resolves a case by layering enabled adjustments onto
// the sponsor inputs, so the UI can toggle/edit adjustments and recompute live.

export const MODEL_YEARS = 7;

/** Length-7 vector, FY1..FY7 ($mm unless noted). */
export type YearVector = number[];

export interface DebtTranche {
  name: string;
  amount: number; // $mm at close
  rate: number; // all-in rate, decimal (e.g. 0.095)
}

export interface CapitalStructure {
  tranches: DebtTranche[];
  sponsorEquity: number; // $mm
}

/** One add-back row for the EBITDA Quality tab. */
export interface AddBack {
  item: string;
  quantumFy1: number;
  quantumFy2: number;
  classification: string;
  rollOff: string;
  verdict: string; // e.g. "Accept", "Demand roll-off", "Reject"
  severity: "red" | "yellow" | "blue" | "green";
  note: string;
}

export interface HistoricalActuals {
  quarters: string[]; // labels, length 8
  revenue: number[];
  adjEbitda: number[];
  mgmtForecastEbitda: number[];
  /** Actual vs forecast, %, decimal (negative = miss). */
  missPct: number[];
}

/** The sponsor case: numbers exactly as the sponsor presented them. */
export interface CaseInputs {
  revenue: YearVector;
  /** Sponsor adjusted EBITDA (used for leverage, coverage, margin). */
  adjEbitda: YearVector;
  /** Reported EBITDA (before add-backs) — for the adjustment ratio. */
  reportedEbitda: YearVector;
  /** Interest used for the coverage ratio ($mm). */
  interest: YearVector;
  /** Levered free cash flow available to service/repay debt ($mm). Source of truth. */
  leveredFcf: YearVector;
  /** Mandatory amortisation applied to debt each year ($mm). */
  mandatoryAmort: YearVector;
  /** Excess-cash-flow sweep applied to debt each year ($mm). */
  ecfSweep: YearVector;
  /** Informational FCF-build memo shown on the Paydown tab. */
  build: {
    cashInterest: YearVector;
    cashTaxes: YearVector;
    totalCapex: YearVector;
    nwcChange: YearVector;
  };
  /** FY1 net revenue retention (software proxy), decimal. */
  nrr: number;
  /** FY1 revenue growth, decimal. */
  revenueGrowthFy1: number;
  /** Sponsor-claimed margin expansion over the plan, bps. */
  marginExpansionBps: number;
}

/**
 * An analyst adjustment turning the sponsor case into the credit case. Each effect is
 * a signed delta layered onto the sponsor line. Any subset may be present.
 */
export interface CreditAdjustment {
  id: string;
  label: string;
  rule?: number;
  rationale: string;
  severity: "red" | "yellow" | "blue";
  /** Delta to levered FCF each year ($mm). Negative reduces cash. */
  fcf?: YearVector;
  /** Delta to the EBITDA used for leverage & coverage ($mm). Negative reduces EBITDA. */
  leverageEbitda?: YearVector;
  /** Delta to the interest used in the coverage ratio ($mm). Positive increases interest. */
  coverageInterest?: YearVector;
  /** Whether this adjustment is part of the default credit case. */
  enabledByDefault: boolean;
  /** The transcript flag category this ties back to. */
  flagCategory?: string;
}

export interface ModelBundle {
  meta: {
    company: string;
    txnType: string;
    rating: string;
    sector: string;
    closeFY: string;
    currency: string; // "$mm"
  };
  capital: CapitalStructure;
  sponsor: CaseInputs;
  adjustments: CreditAdjustment[];
  addBacks: AddBack[];
  historicals: HistoricalActuals;
  /** Analyst-inferred cells / methodology notes surfaced in the UI. */
  notes: string[];
}
