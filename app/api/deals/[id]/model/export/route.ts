import ExcelJS from "exceljs";
import { getDeal } from "@/lib/db";
import {
  computeModel,
  getModelBundle,
  MODEL_YEARS,
  parseModelState,
  scaleModelBundle,
} from "@/lib/model";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const YEARS = Array.from({ length: MODEL_YEARS }, (_, i) => `FY${i + 1}`);

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = await getDeal(id);
  if (!deal) return new Response("Deal not found", { status: 404 });

  const bundle = getModelBundle(deal.scenario_key);
  if (!bundle) return new Response("No model attached to this deal", { status: 404 });

  const state = parseModelState(new URL(req.url).searchParams, bundle);
  const scaledBundle = scaleModelBundle(bundle, state.scales);
  const sponsor = computeModel(bundle, []);
  const credit = computeModel(scaledBundle, state.enabledIds);

  const wb = new ExcelJS.Workbook();
  wb.creator = "Underwriter.AI";
  wb.created = new Date();
  // Force a full recalc when the file is opened in Excel.
  wb.calcProperties.fullCalcOnLoad = true;

  const gold = "FF9B8B62";
  const header = (row: ExcelJS.Row) => {
    row.font = { bold: true, color: { argb: "FFFFFFFF" } };
    row.eachCell((c) => {
      c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF071B34" } };
    });
  };
  const sectionRow = (ws: ExcelJS.Worksheet, label: string) => {
    const r = ws.addRow([label]);
    r.font = { bold: true, color: { argb: gold } };
    return r;
  };

  // ── Agent Summary ──
  const summary = wb.addWorksheet("Agent Summary");
  summary.columns = [{ width: 34 }, { width: 18 }, { width: 18 }, { width: 40 }];
  summary.addRow([`Underwriter.AI — ${bundle.meta.company}`]).font = { bold: true, size: 14 };
  summary.addRow([`${bundle.meta.txnType} · ${bundle.meta.sector} · ${bundle.meta.rating} · ${bundle.meta.currency}`]);
  summary.addRow([]);
  header(summary.addRow(["Metric", "Sponsor case", "Credit case", "Note"]));
  const sPass = (r: typeof sponsor) => (r.repaymentPass ? "PASS" : "FAIL");
  const rows: (string | number)[][] = [
    [
      "Adjusted EBITDA (FY1)",
      sponsor.leverageEbitda[0],
      credit.leverageEbitda[0],
      credit.leverageEbitda[0] < sponsor.leverageEbitda[0]
        ? "Analyst EBITDA adjustments applied"
        : "No EBITDA adjustment applied",
    ],
    ["Entry leverage (x)", +sponsor.entryLeverage.toFixed(2), +credit.entryLeverage.toFixed(2), "Debt at close / adj. EBITDA"],
    [
      "FY1 cash interest",
      sponsor.interest[0],
      credit.interest[0],
      credit.interest[0] > sponsor.interest[0]
        ? "Analyst interest corrections applied"
        : "No interest correction applied",
    ],
    ["FY1 interest coverage (x)", +sponsor.entryCoverage.toFixed(2), +credit.entryCoverage.toFixed(2), "EBITDA / interest"],
    ["Cumulative 7-yr FCF", sponsor.cumFcf, credit.cumFcf, "Sum of levered FCF"],
    ["50% repayment test (%)", +(sponsor.repaymentCapacity * 100).toFixed(1), +(credit.repaymentCapacity * 100).toFixed(1), `${sPass(sponsor)} vs ${sPass(credit)}`],
    ["Back-weighting yrs 4-7 (%)", +(sponsor.backWeightPct * 100).toFixed(0), +(credit.backWeightPct * 100).toFixed(0), ">60% flags"],
    ["EBITDA adjustment ratio (%)", +(sponsor.adjustmentRatio * 100).toFixed(0), +(credit.adjustmentRatio * 100).toFixed(0), credit.ebitdaQualityLevel],
    ["Equity cushion (%)", +(sponsor.equityCushionPct * 100).toFixed(0), +(credit.equityCushionPct * 100).toFixed(0), "<20% flags"],
  ];
  rows.forEach((r) => summary.addRow(r));
  summary.addRow([]);
  const verdict = credit.repaymentPass && credit.entryCoverage >= 1.5 ? "PROCEED" : "DOES NOT PROCEED";
  summary.addRow(["Credit recommendation", verdict]).font = { bold: true };

  // ── Assumptions ──
  const asum = wb.addWorksheet("Assumptions");
  asum.columns = [{ width: 30 }, ...YEARS.map(() => ({ width: 12 }))];
  header(asum.addRow(["Line item ($mm)", ...YEARS]));
  asum.addRow(["Revenue", ...bundle.sponsor.revenue]);
  asum.addRow(["Adjusted EBITDA (sponsor)", ...sponsor.leverageEbitda]);
  asum.addRow(["Adjusted EBITDA (credit)", ...credit.leverageEbitda]);
  asum.addRow(["Reported EBITDA", ...bundle.sponsor.reportedEbitda]);
  asum.addRow(["EBITDA margin (credit, %)", ...credit.marginPct.map((v) => +(v * 100).toFixed(1))]);
  asum.addRow([]);
  sectionRow(asum, "Capital structure at close");
  bundle.capital.tranches.forEach((t) => asum.addRow([t.name, t.amount, t.rate ? `${(t.rate * 100).toFixed(1)}%` : "—"]));
  asum.addRow(["Total debt at close", sponsor.totalDebtAtClose]);
  asum.addRow(["Sponsor equity", bundle.capital.sponsorEquity]);

  // ── Paydown ──
  const buildPaydown = (ws: ExcelJS.Worksheet, r: typeof sponsor, label: string) => {
    sectionRow(ws, `${label} case — levered FCF & debt schedule`);
    header(ws.addRow(["Line item ($mm)", ...YEARS, "Total"]));
    const tot = (a: number[]) => a.reduce((s, v) => s + v, 0);
    ws.addRow(["Levered FCF", ...r.leveredFcf, tot(r.leveredFcf)]);
    ws.addRow(["Opening debt", ...r.openingDebt, ""]);
    ws.addRow(["Mandatory amort", ...r.mandatoryAmort, tot(r.mandatoryAmort)]);
    ws.addRow(["ECF sweep", ...r.ecfSweep, tot(r.ecfSweep)]);
    ws.addRow(["Closing debt", ...r.closingDebt, ""]);
    ws.addRow(["Leverage (x)", ...r.leverageByYear.map((v) => +v.toFixed(2)), ""]);
    ws.addRow(["Interest coverage (x)", ...r.coverage.map((v) => +v.toFixed(2)), ""]);
    ws.addRow([]);
    ws.addRow([`50% repayment test`, `${(r.repaymentCapacity * 100).toFixed(1)}%`, r.repaymentPass ? "PASS" : "FAIL"]);
    ws.addRow([`Back-weighting yrs 4-7`, `${(r.backWeightPct * 100).toFixed(0)}%`, r.backWeightFlag ? "FLAG" : "OK"]);
    ws.addRow([]);
  };
  const paydown = wb.addWorksheet("Paydown Model");
  paydown.columns = [{ width: 26 }, ...YEARS.map(() => ({ width: 11 })), { width: 12 }];
  buildPaydown(paydown, sponsor, "Sponsor");
  buildPaydown(paydown, credit, "Credit");

  // ── EBITDA Quality ──
  const eq = wb.addWorksheet("EBITDA Quality");
  eq.columns = [{ width: 34 }, { width: 10 }, { width: 10 }, { width: 16 }, { width: 22 }, { width: 44 }];
  eq.addRow([`Adjustment ratio (FY1): ${(credit.adjustmentRatio * 100).toFixed(0)}% — ${credit.ebitdaQualityLevel}`]).font = { bold: true };
  eq.addRow([]);
  header(eq.addRow(["Add-back", "FY1", "FY2", "Classification", "Verdict", "Note"]));
  bundle.addBacks.forEach((a) => eq.addRow([a.item, a.quantumFy1, a.quantumFy2, a.classification, a.verdict, a.note]));

  // ── Historical Actuals ──
  const hist = wb.addWorksheet("Historical Actuals");
  const h = bundle.historicals;
  hist.columns = [{ width: 26 }, ...h.quarters.map(() => ({ width: 10 }))];
  header(hist.addRow(["Metric", ...h.quarters]));
  hist.addRow(["Revenue", ...h.revenue]);
  hist.addRow(["Adjusted EBITDA", ...h.adjEbitda]);
  hist.addRow(["Mgmt forecast EBITDA", ...h.mgmtForecastEbitda]);
  hist.addRow(["Actual vs forecast (%)", ...h.missPct.map((v) => +(v * 100).toFixed(1))]);

  // ── Notes ──
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 110 }];
  notes.addRow(["Methodology & analyst-inferred inputs"]).font = { bold: true };
  bundle.notes.forEach((n) => notes.addRow([n]));

  const buffer = await wb.xlsx.writeBuffer();
  const safeName = (deal.name || bundle.meta.company).replace(/[^a-z0-9]+/gi, "_");
  return new Response(buffer as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${safeName}_Paydown_Model.xlsx"`,
      "Cache-Control": "no-store",
    },
  });
}
