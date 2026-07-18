"use client";

import { useMemo } from "react";
import Link from "next/link";
import { computeModel, defaultCreditIds, type ModelBundle } from "@/lib/model";

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;
const x = (n: number) => `${n.toFixed(1)}x`;
const pct0 = (n: number) => `${(n * 100).toFixed(0)}%`;

export function ICOnePager({
  bundle,
  dealId,
  dealName,
}: {
  bundle: ModelBundle;
  dealId: string;
  dealName: string;
}) {
  const sponsor = useMemo(() => computeModel(bundle, []), [bundle]);
  const credit = useMemo(() => computeModel(bundle, defaultCreditIds(bundle)), [bundle]);

  const sponsorProceed = sponsor.repaymentPass && sponsor.entryCoverage >= 1.5;
  const creditProceed = credit.repaymentPass && credit.entryCoverage >= 1.5;

  const rows: { label: string; s: string; c: string; flag: boolean }[] = [
    { label: "Adjusted EBITDA (FY1)", s: money(sponsor.leverageEbitda[0]), c: money(credit.leverageEbitda[0]), flag: credit.leverageEbitda[0] < sponsor.leverageEbitda[0] },
    { label: "Entry leverage", s: x(sponsor.entryLeverage), c: x(credit.entryLeverage), flag: credit.entryLeverage > sponsor.entryLeverage },
    { label: "FY1 cash interest", s: money(sponsor.interest[0]), c: money(credit.interest[0]), flag: credit.interest[0] > sponsor.interest[0] },
    { label: "FY1 interest coverage", s: x(sponsor.entryCoverage), c: x(credit.entryCoverage), flag: credit.entryCoverage < 1.5 },
    { label: "Cumulative 7-yr FCF", s: money(sponsor.cumFcf), c: money(credit.cumFcf), flag: credit.cumFcf < sponsor.cumFcf },
    { label: "50% repayment test", s: `${pct0(sponsor.repaymentCapacity)} ${sponsor.repaymentPass ? "PASS" : "FAIL"}`, c: `${pct0(credit.repaymentCapacity)} ${credit.repaymentPass ? "PASS" : "FAIL"}`, flag: !credit.repaymentPass },
    { label: "Back-weighting (yrs 4-7)", s: pct0(sponsor.backWeightPct), c: pct0(credit.backWeightPct), flag: credit.backWeightFlag },
    { label: "EBITDA quality (adj. ratio)", s: pct0(sponsor.adjustmentRatio), c: pct0(credit.adjustmentRatio), flag: credit.adjustmentRatio > 0.2 },
    { label: "Equity cushion", s: pct0(sponsor.equityCushionPct), c: pct0(credit.equityCushionPct), flag: credit.equityCushionPct < 0.2 },
  ];

  const topFlags = credit.flags
    .filter((f) => f.severity === "red" || f.severity === "yellow")
    .sort((a, b) => (a.severity === "red" ? -1 : 1) - (b.severity === "red" ? -1 : 1));

  return (
    <div className="mx-auto max-w-[900px]">
      {/* controls (not printed) */}
      <div className="print-hide mb-4 flex items-center justify-between">
        <Link href={`/deals/${dealId}/model`} className="text-sm text-text-2 hover:text-text">
          ← Back to model
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md border border-gold/50 px-4 py-2 text-sm text-gold hover:bg-gold/10"
        >
          Print / Save PDF
        </button>
      </div>

      <div className="print-sheet panel p-8">
        {/* header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <div className="mb-2 h-px w-8" style={{ background: "var(--gold)" }} />
            <div className="label text-gold">Investment Committee — one-pager</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">{dealName}</h1>
            <p className="mt-1 text-[13px] text-text-2">
              {bundle.meta.txnType} · {bundle.meta.sector} · {bundle.meta.rating} · {bundle.meta.currency}
            </p>
          </div>
          <div className="text-right">
            <div className="label text-text-2">Credit recommendation</div>
            <div className={`mt-1 text-lg font-semibold ${creditProceed ? "text-green" : "text-red"}`}>
              {creditProceed ? "PROCEED" : "DOES NOT PROCEED"}
            </div>
            <div className="text-[11px] text-text-2">
              Sponsor case: {sponsorProceed ? "proceeds" : "does not proceed"}
            </div>
          </div>
        </div>

        {/* deltas table */}
        <div className="mt-5">
          <div className="label mb-2 text-text-2">Sponsor case vs credit case</div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-wide text-text-2">
                <th className="py-1.5 text-left font-normal">Metric</th>
                <th className="py-1.5 text-right font-normal">Sponsor</th>
                <th className="py-1.5 text-right font-normal text-gold">Credit</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-border/50">
                  <td className="py-1.5 text-text-2">{r.label}</td>
                  <td className="mono py-1.5 text-right text-text">{r.s}</td>
                  <td className={`mono py-1.5 text-right font-semibold ${r.flag ? "text-red" : "text-text"}`}>{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* call-outs */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <CallOut
            title="The 50% test decides it"
            body={`On the credit case, cumulative 7-year FCF of ${money(credit.cumFcf)} repays only ${pct0(
              credit.repaymentCapacity,
            )} of the ${money(credit.totalDebtAtClose)} raised. Lenders are dependent on a refinancing or exit — the deal does not de-lever from cash.`}
            tone={credit.repaymentPass ? "ok" : "bad"}
          />
          <CallOut
            title="Coverage is the near-term risk"
            body={`FY1 interest coverage falls to ${x(credit.entryCoverage)} once EBITDA and interest are corrected — ${
              credit.entryCoverage < 1.5 ? "below the 1.5x comfort line" : "within tolerance"
            }. Entry leverage restates from ${x(sponsor.entryLeverage)} to ${x(credit.entryLeverage)}.`}
            tone={credit.entryCoverage < 1.5 ? "bad" : "ok"}
          />
        </div>

        {/* top flags */}
        <div className="mt-5">
          <div className="label mb-2 text-text-2">Top flags &amp; numeric impact</div>
          <div className="space-y-2">
            {topFlags.map((f) => (
              <div key={f.id} className="flex items-start gap-3 rounded-md border border-border p-2.5">
                <span
                  className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                    f.severity === "red" ? "bg-red" : "bg-amber"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">{f.label}</span>
                    <span className={`mono text-sm font-semibold ${f.severity === "red" ? "text-red" : "text-amber"}`}>
                      {f.value}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-text-2">{f.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 border-t border-border pt-3 text-[10px] text-text-2">
          Generated by Underwriter.AI from the reconciled paydown model. Credit case = analyst adjustments applied
          to the sponsor case. Analyst-inferred inputs are documented in the model workbench.
        </p>
      </div>
    </div>
  );
}

function CallOut({ title, body, tone }: { title: string; body: string; tone: "ok" | "bad" }) {
  return (
    <div className={`rounded-lg border p-3 ${tone === "bad" ? "tint-red" : "tint-blue"}`}>
      <div className={`label ${tone === "bad" ? "text-red" : "text-green"}`}>{title}</div>
      <p className="mt-1 text-[12px] leading-relaxed text-text">{body}</p>
    </div>
  );
}
