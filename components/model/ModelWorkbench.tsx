"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  computeModel,
  defaultCreditIds,
  MODEL_YEARS,
  type ModelBundle,
  type ResolvedModel,
} from "@/lib/model";

// ── formatting ──
const money = (n: number) => Math.round(n).toLocaleString();
const x = (n: number) => `${n.toFixed(1)}x`;
const pct0 = (n: number) => `${(n * 100).toFixed(0)}%`;
const YEARS = Array.from({ length: MODEL_YEARS }, (_, i) => `FY${i + 1}`);

type View = "compare" | "sponsor" | "credit";

// Scale an adjustment's signed vectors so a slider can stress its magnitude live.
function scaleBundle(bundle: ModelBundle, scales: Record<string, number>): ModelBundle {
  return {
    ...bundle,
    adjustments: bundle.adjustments.map((a) => {
      const s = scales[a.id] ?? 1;
      if (s === 1) return a;
      const mul = (v?: number[]) => (v ? v.map((n) => n * s) : v);
      return { ...a, fcf: mul(a.fcf), leverageEbitda: mul(a.leverageEbitda), coverageInterest: mul(a.coverageInterest) };
    }),
  };
}

const SEV_TEXT: Record<string, string> = {
  red: "text-red",
  yellow: "text-amber",
  blue: "text-blue",
  green: "text-green",
};
const SEV_DOT: Record<string, string> = {
  red: "bg-red",
  yellow: "bg-amber",
  blue: "bg-blue",
  green: "bg-green",
};

export function ModelWorkbench({
  bundle,
  dealId,
  dealName,
}: {
  bundle: ModelBundle;
  dealId: string;
  dealName: string;
}) {
  const [view, setView] = useState<View>("compare");
  const [enabled, setEnabled] = useState<Set<string>>(() => new Set(defaultCreditIds(bundle)));
  const [scales, setScales] = useState<Record<string, number>>({});

  const scaled = useMemo(() => scaleBundle(bundle, scales), [bundle, scales]);
  const sponsor = useMemo(() => computeModel(bundle, []), [bundle]);
  const credit = useMemo(() => computeModel(scaled, enabled), [scaled, enabled]);
  const selected = view === "sponsor" ? sponsor : credit;

  const toggle = (id: string) =>
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="space-y-4">
      {/* toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mb-2 h-px w-8" style={{ background: "var(--gold)" }} />
          <p className="label text-gold">Paydown model · sponsor vs credit</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{dealName}</h1>
          <p className="mt-1 text-[13px] text-text-2">
            {bundle.meta.txnType} · {bundle.meta.sector} · {bundle.meta.rating} · all figures {bundle.meta.currency}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-md border border-border">
            {(["compare", "sponsor", "credit"] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-sm capitalize transition-colors ${
                  view === v ? "bg-gold/15 text-gold" : "text-text-2 hover:text-text"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <Link
            href={`/deals/${dealId}/model/one-pager`}
            className="rounded-md border border-gold/50 px-3 py-1.5 text-sm text-gold hover:bg-gold/10"
          >
            MD one-pager
          </Link>
          <a
            href={`/api/deals/${dealId}/model/export`}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-text-2 hover:text-text"
          >
            Export .xlsx
          </a>
        </div>
      </div>

      {/* KPI strip */}
      <KpiStrip sponsor={sponsor} credit={credit} view={view} />

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        {/* Credit levers */}
        <CreditLevers
          bundle={bundle}
          enabled={enabled}
          scales={scales}
          onToggle={toggle}
          onScale={(id, s) => setScales((p) => ({ ...p, [id]: s }))}
          disabled={view === "sponsor"}
        />

        {/* content */}
        <div className="space-y-4">
          {view === "compare" ? (
            <CompareTable sponsor={sponsor} credit={credit} />
          ) : (
            <Workbook resolved={selected} bundle={bundle} />
          )}
          <FlagsPanel resolved={view === "sponsor" ? sponsor : credit} />
        </div>
      </div>

      {/* notes */}
      <div className="panel p-4">
        <div className="label text-text-2">Methodology &amp; analyst-inferred inputs</div>
        <ul className="mt-2 space-y-1 text-[12px] text-text-2">
          {bundle.notes.map((n, i) => (
            <li key={i}>— {n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── KPI strip ──
function KpiStrip({
  sponsor,
  credit,
  view,
}: {
  sponsor: ResolvedModel;
  credit: ResolvedModel;
  view: View;
}) {
  const items: { label: string; s: string; c: string; sTone?: string; cTone?: string }[] = [
    {
      label: "Entry leverage",
      s: x(sponsor.entryLeverage),
      c: x(credit.entryLeverage),
      cTone: credit.entryLeverage > sponsor.entryLeverage ? "text-red" : "text-text",
    },
    {
      label: "50% repayment test",
      s: `${pct0(sponsor.repaymentCapacity)} ${sponsor.repaymentPass ? "PASS" : "FAIL"}`,
      c: `${pct0(credit.repaymentCapacity)} ${credit.repaymentPass ? "PASS" : "FAIL"}`,
      sTone: sponsor.repaymentPass ? "text-green" : "text-red",
      cTone: credit.repaymentPass ? "text-green" : "text-red",
    },
    {
      label: "Interest coverage (FY1)",
      s: x(sponsor.entryCoverage),
      c: x(credit.entryCoverage),
      sTone: sponsor.entryCoverage < 1.5 ? "text-red" : "text-text",
      cTone: credit.entryCoverage < 1.5 ? "text-red" : "text-text",
    },
    {
      label: "Back-weighting (yrs 4-7)",
      s: pct0(sponsor.backWeightPct),
      c: pct0(credit.backWeightPct),
      sTone: sponsor.backWeightFlag ? "text-amber" : "text-text",
      cTone: credit.backWeightFlag ? "text-amber" : "text-text",
    },
    {
      label: "Cum. 7-yr FCF",
      s: `$${money(sponsor.cumFcf)}`,
      c: `$${money(credit.cumFcf)}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((it) => (
        <div key={it.label} className="panel lift p-4">
          <div className="label text-text-2">{it.label}</div>
          {view === "compare" ? (
            <div className="mt-2 space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-wide text-text-2">Sponsor</span>
                <span className={`mono text-sm ${it.sTone ?? "text-text"}`}>{it.s}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-wide text-gold">Credit</span>
                <span className={`mono text-base font-semibold ${it.cTone ?? "text-text"}`}>{it.c}</span>
              </div>
            </div>
          ) : (
            <div
              className={`mono mt-2 text-xl font-semibold ${
                view === "sponsor" ? (it.sTone ?? "text-text") : (it.cTone ?? "text-text")
              }`}
            >
              {view === "sponsor" ? it.s : it.c}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── credit levers ──
function CreditLevers({
  bundle,
  enabled,
  scales,
  onToggle,
  onScale,
  disabled,
}: {
  bundle: ModelBundle;
  enabled: Set<string>;
  scales: Record<string, number>;
  onToggle: (id: string) => void;
  onScale: (id: string, s: number) => void;
  disabled: boolean;
}) {
  return (
    <div className={`panel p-4 ${disabled ? "opacity-50" : ""}`}>
      <div className="label text-gold">Credit adjustments</div>
      <p className="mt-1 text-[11px] text-text-2">
        {disabled
          ? "Switch to Credit or Compare to apply the analyst case."
          : "Toggle and stress the analyst's adjustments — the model recomputes live."}
      </p>
      <div className="mt-3 space-y-3">
        {bundle.adjustments.map((a) => {
          const on = enabled.has(a.id);
          const scale = scales[a.id] ?? 1;
          return (
            <div key={a.id} id={`adj-${a.id}`} className="rounded-lg border border-border p-3">
              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  checked={on}
                  disabled={disabled}
                  onChange={() => onToggle(a.id)}
                  className="mt-0.5 accent-[color:var(--gold)]"
                />
                <span className="flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${SEV_DOT[a.severity]}`} />
                    <span className="text-sm text-text">{a.label}</span>
                    {a.rule ? <span className="mono text-[10px] text-gold">R{a.rule}</span> : null}
                  </span>
                  {a.flagCategory ? (
                    <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-text-2">
                      from {a.flagCategory} flag
                    </span>
                  ) : null}
                </span>
              </label>
              <p className="mt-2 text-[11px] leading-relaxed text-text-2">{a.rationale}</p>
              {on && !disabled ? (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wide text-text-2">Stress</span>
                  <input
                    type="range"
                    min={0}
                    max={1.5}
                    step={0.1}
                    value={scale}
                    onChange={(e) => onScale(a.id, Number(e.target.value))}
                    className="h-1 flex-1 accent-[color:var(--gold)]"
                  />
                  <span className="mono w-10 text-right text-[11px] text-text">{Math.round(scale * 100)}%</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── compare table ──
function CompareTable({ sponsor, credit }: { sponsor: ResolvedModel; credit: ResolvedModel }) {
  const rows: { label: string; s: string; c: string; flag?: boolean }[] = [
    { label: "Adjusted EBITDA (FY1)", s: `$${money(sponsor.leverageEbitda[0])}`, c: `$${money(credit.leverageEbitda[0])}`, flag: credit.leverageEbitda[0] < sponsor.leverageEbitda[0] },
    { label: "Entry leverage", s: x(sponsor.entryLeverage), c: x(credit.entryLeverage), flag: credit.entryLeverage > sponsor.entryLeverage },
    { label: "FY1 cash interest", s: `$${money(sponsor.interest[0])}`, c: `$${money(credit.interest[0])}`, flag: credit.interest[0] > sponsor.interest[0] },
    { label: "FY1 interest coverage", s: x(sponsor.entryCoverage), c: x(credit.entryCoverage), flag: credit.entryCoverage < 1.5 },
    { label: "Cumulative 7-yr FCF", s: `$${money(sponsor.cumFcf)}`, c: `$${money(credit.cumFcf)}`, flag: credit.cumFcf < sponsor.cumFcf },
    { label: "50% repayment test", s: `${pct0(sponsor.repaymentCapacity)} ${sponsor.repaymentPass ? "PASS" : "FAIL"}`, c: `${pct0(credit.repaymentCapacity)} ${credit.repaymentPass ? "PASS" : "FAIL"}`, flag: !credit.repaymentPass },
    { label: "Back-weighting yrs 4-7", s: pct0(sponsor.backWeightPct), c: pct0(credit.backWeightPct), flag: credit.backWeightFlag },
    { label: "Exit leverage (FY7)", s: x(sponsor.exitLeverage), c: x(credit.exitLeverage) },
    { label: "Equity cushion", s: pct0(sponsor.equityCushionPct), c: pct0(credit.equityCushionPct), flag: credit.equityCushionPct < 0.2 },
  ];
  return (
    <div className="panel overflow-hidden p-0">
      <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-border bg-panel-2 px-4 py-2 text-[11px] uppercase tracking-wide text-text-2">
        <span>Metric</span>
        <span className="text-right">Sponsor case</span>
        <span className="text-right text-gold">Credit case</span>
      </div>
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-border/60 px-4 py-2.5 text-sm last:border-0">
          <span className="text-text-2">{r.label}</span>
          <span className="mono text-right text-text">{r.s}</span>
          <span className={`mono text-right font-semibold ${r.flag ? "text-red" : "text-text"}`}>{r.c}</span>
        </div>
      ))}
    </div>
  );
}

// ── single-case workbook ──
const TABS = ["Paydown", "Assumptions", "EBITDA quality", "Historicals"] as const;
type Tab = (typeof TABS)[number];

function Workbook({ resolved, bundle }: { resolved: ResolvedModel; bundle: ModelBundle }) {
  const [tab, setTab] = useState<Tab>("Paydown");
  return (
    <div className="panel p-0">
      <div className="flex flex-wrap gap-1 border-b border-border px-3 pt-3">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-t-md px-3 py-1.5 text-sm transition-colors ${
              tab === t ? "bg-panel-2 text-gold" : "text-text-2 hover:text-text"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tab === "Paydown" ? <PaydownTab resolved={resolved} bundle={bundle} /> : null}
        {tab === "Assumptions" ? <AssumptionsTab resolved={resolved} bundle={bundle} /> : null}
        {tab === "EBITDA quality" ? <EbitdaQualityTab bundle={bundle} resolved={resolved} /> : null}
        {tab === "Historicals" ? <HistoricalsTab bundle={bundle} /> : null}
      </div>
    </div>
  );
}

function Grid({ rows }: { rows: { label: string; vals: (string | number)[]; strong?: boolean; tone?: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-right text-[13px]">
        <thead>
          <tr className="text-[11px] uppercase tracking-wide text-text-2">
            <th className="py-1.5 text-left font-normal">Line item ($mm)</th>
            {YEARS.map((y) => (
              <th key={y} className="py-1.5 font-normal">{y}</th>
            ))}
            <th className="py-1.5 font-normal text-gold">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-border/50">
              <td className={`py-1.5 text-left ${r.strong ? "font-semibold text-text" : "text-text-2"}`}>{r.label}</td>
              {r.vals.map((v, i) => (
                <td key={i} className={`mono py-1.5 ${r.strong ? "font-semibold" : ""} ${r.tone ?? "text-text"}`}>
                  {typeof v === "number" ? money(v) : v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PaydownTab({ resolved, bundle }: { resolved: ResolvedModel; bundle: ModelBundle }) {
  const s = bundle.sponsor;
  const other = s.adjEbitda.map(
    (e, i) => e - s.build.cashInterest[i] - s.build.cashTaxes[i] - s.build.totalCapex[i] + s.build.nwcChange[i] - s.leveredFcf[i],
  );
  const total = (a: number[]) => a.reduce((x2, y) => x2 + y, 0);
  const isCredit = resolved.caseLabel === "Credit";
  const fcfDelta = resolved.leveredFcf.map((v, i) => v - s.leveredFcf[i]);

  const fcfRows: { label: string; vals: (string | number)[]; strong?: boolean; tone?: string }[] = [
    { label: "Adjusted EBITDA", vals: [...s.adjEbitda, total(s.adjEbitda)] },
    { label: "Less: cash interest", vals: [...s.build.cashInterest.map((v) => -v), -total(s.build.cashInterest)] },
    { label: "Less: cash taxes", vals: [...s.build.cashTaxes.map((v) => -v), -total(s.build.cashTaxes)] },
    { label: "Less: total capex", vals: [...s.build.totalCapex.map((v) => -v), -total(s.build.totalCapex)] },
    { label: "+/- NWC change", vals: [...s.build.nwcChange, total(s.build.nwcChange)] },
    { label: "Less: other cash uses", vals: [...other.map((v) => -v), -total(other)] },
    { label: "Sponsor levered FCF", vals: [...s.leveredFcf, total(s.leveredFcf)], strong: true },
  ];
  if (isCredit) {
    fcfRows.push({ label: "Analyst adjustments (Δ)", vals: [...fcfDelta, total(fcfDelta)], tone: "text-red" });
    fcfRows.push({ label: "Credit levered FCF", vals: [...resolved.leveredFcf, resolved.cumFcf], strong: true, tone: "text-gold" });
  }

  const debtRows: { label: string; vals: (string | number)[]; strong?: boolean; tone?: string }[] = [
    { label: "Opening debt", vals: [...resolved.openingDebt, ""] },
    { label: "Less: mandatory amort", vals: [...resolved.mandatoryAmort.map((v) => -v), -total(resolved.mandatoryAmort)] },
    { label: "Less: ECF sweep", vals: [...resolved.ecfSweep.map((v) => -v), -total(resolved.ecfSweep)] },
    { label: "Closing debt", vals: [...resolved.closingDebt, ""], strong: true },
    { label: "Leverage (x)", vals: [...resolved.leverageByYear.map((v) => `${v.toFixed(1)}x`), ""], tone: "text-amber" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <div className="label mb-2">I. Levered free cash flow</div>
        <Grid rows={fcfRows} />
      </div>
      <div>
        <div className="label mb-2">II. Debt schedule &amp; leverage</div>
        <Grid rows={debtRows} />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <TestCard
          title="50% repayment test"
          value={`${pct0(resolved.repaymentCapacity)}`}
          verdict={resolved.repaymentPass ? "PASS" : "FAIL"}
          pass={resolved.repaymentPass}
          detail={`Cum. 7-yr FCF $${money(resolved.cumFcf)} / debt at close $${money(resolved.totalDebtAtClose)}`}
        />
        <TestCard
          title="Back-weighting"
          value={pct0(resolved.backWeightPct)}
          verdict={resolved.backWeightFlag ? "FLAG" : "OK"}
          pass={!resolved.backWeightFlag}
          detail={`Yrs 4-7 $${money(resolved.fcf47)} of $${money(resolved.cumFcf)} total`}
        />
        <TestCard
          title="Interest coverage (FY1)"
          value={x(resolved.entryCoverage)}
          verdict={resolved.entryCoverage < 1.5 ? "THIN" : "OK"}
          pass={resolved.entryCoverage >= 1.5}
          detail={`EBITDA $${money(resolved.leverageEbitda[0])} / interest $${money(resolved.interest[0])}`}
        />
      </div>
    </div>
  );
}

function TestCard({
  title,
  value,
  verdict,
  pass,
  detail,
}: {
  title: string;
  value: string;
  verdict: string;
  pass: boolean;
  detail: string;
}) {
  return (
    <div className={`rounded-lg border p-3 ${pass ? "tint-blue" : "tint-red"}`}>
      <div className="label text-text-2">{title}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="mono text-2xl font-semibold text-text">{value}</span>
        <span className={`text-xs font-semibold ${pass ? "text-green" : "text-red"}`}>{verdict}</span>
      </div>
      <div className="mt-1 text-[11px] text-text-2">{detail}</div>
    </div>
  );
}

function AssumptionsTab({ resolved, bundle }: { resolved: ResolvedModel; bundle: ModelBundle }) {
  const s = bundle.sponsor;
  const rows: { label: string; vals: (string | number)[]; strong?: boolean; tone?: string }[] = [
    { label: "Revenue", vals: [...s.revenue, ""] },
    { label: "Adjusted EBITDA", vals: [...resolved.leverageEbitda.map((v) => Math.round(v)), ""], strong: true },
    { label: "EBITDA margin", vals: [...resolved.marginPct.map((v) => `${(v * 100).toFixed(0)}%`), ""], tone: "text-amber" },
    { label: "Reported EBITDA", vals: [...s.reportedEbitda, ""] },
  ];
  return (
    <div className="space-y-5">
      <div>
        <div className="label mb-2">Capital structure at close</div>
        <div className="overflow-hidden rounded-lg border border-border">
          {bundle.capital.tranches.map((t) => (
            <div key={t.name} className="flex items-center justify-between border-b border-border/60 px-3 py-2 text-sm last:border-0">
              <span className="text-text-2">{t.name}</span>
              <span className="mono text-text">
                ${money(t.amount)} {t.rate > 0 ? `· ${(t.rate * 100).toFixed(1)}%` : ""}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between bg-panel-2 px-3 py-2 text-sm">
            <span className="font-semibold text-text">Total debt at close</span>
            <span className="mono font-semibold text-text">${money(resolved.totalDebtAtClose)}</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2 text-sm">
            <span className="text-text-2">Sponsor equity</span>
            <span className="mono text-text">${money(bundle.capital.sponsorEquity)} · cushion {pct0(resolved.equityCushionPct)}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="label mb-2">Revenue &amp; EBITDA</div>
        <Grid rows={rows} />
      </div>
    </div>
  );
}

function EbitdaQualityTab({ bundle, resolved }: { bundle: ModelBundle; resolved: ResolvedModel }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border p-3">
        <div className="flex items-center justify-between">
          <span className="label text-text-2">Adjustment ratio (FY1)</span>
          <span className="mono text-lg font-semibold text-text">{pct0(resolved.adjustmentRatio)}</span>
        </div>
        <div className="mt-1 text-[12px] text-text-2">{resolved.ebitdaQualityLevel}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[13px]">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide text-text-2">
              <th className="py-1.5 font-normal">Add-back</th>
              <th className="py-1.5 text-right font-normal">FY1</th>
              <th className="py-1.5 text-right font-normal">FY2</th>
              <th className="py-1.5 font-normal">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {bundle.addBacks.map((a) => (
              <tr key={a.item} className="border-t border-border/50 align-top">
                <td className="py-2 text-text">
                  {a.item}
                  <div className="text-[11px] text-text-2">{a.note}</div>
                </td>
                <td className="mono py-2 text-right text-text">{money(a.quantumFy1)}</td>
                <td className="mono py-2 text-right text-text">{money(a.quantumFy2)}</td>
                <td className={`py-2 ${SEV_TEXT[a.severity]}`}>
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${SEV_DOT[a.severity]}`} />
                    {a.verdict}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HistoricalsTab({ bundle }: { bundle: ModelBundle }) {
  const h = bundle.historicals;
  const avgMiss = h.missPct.reduce((a, b) => a + b, 0) / h.missPct.length;
  const haircut =
    Math.abs(avgMiss) > 0.1
      ? "FLAG — >10% miss. Significant red flag."
      : Math.abs(avgMiss) > 0.05
        ? "SCRUTINISE — >5% miss."
        : "OK — <5% miss. Note and monitor.";
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-right text-[13px]">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide text-text-2">
              <th className="py-1.5 text-left font-normal">Metric</th>
              {h.quarters.map((q) => (
                <th key={q} className="py-1.5 font-normal">{q}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Revenue", vals: h.revenue.map(money) },
              { label: "Adjusted EBITDA", vals: h.adjEbitda.map(money) },
              { label: "Mgmt forecast EBITDA", vals: h.mgmtForecastEbitda.map(money) },
              { label: "Actual vs forecast", vals: h.missPct.map((v) => `${(v * 100).toFixed(1)}%`) },
            ].map((r) => (
              <tr key={r.label} className="border-t border-border/50">
                <td className="py-1.5 text-left text-text-2">{r.label}</td>
                {r.vals.map((v, i) => (
                  <td key={i} className="mono py-1.5 text-text">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-lg border border-border p-3">
        <span className="label text-text-2">Forecast-miss haircut · avg {(avgMiss * 100).toFixed(1)}%</span>
        <div className="mt-1 text-[13px] text-amber">{haircut}</div>
      </div>
    </div>
  );
}

// ── flags ──
function FlagsPanel({ resolved }: { resolved: ResolvedModel }) {
  return (
    <div className="panel p-4">
      <div className="label text-text-2">Model flags · {resolved.caseLabel} case</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {resolved.flags.map((f) => (
          <div key={f.id} id={`flag-${f.id}`} className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm text-text">
                <span className={`h-1.5 w-1.5 rounded-full ${SEV_DOT[f.severity]}`} />
                {f.label}
              </span>
              <span className={`mono text-sm font-semibold ${SEV_TEXT[f.severity]}`}>{f.value}</span>
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-text-2">{f.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
