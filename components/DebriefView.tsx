"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { DebriefPayload } from "@/types";
import { AnimatedNumber } from "./AnimatedNumber";
import { CopyButton } from "./CopyButton";
import { Panel } from "./ui";

// Flip on one frame after mount so width/opacity transitions animate from 0.
function useReveal() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return on;
}

const GAUGE_MAX = 5;

// Single scorecard dimension: a monochrome track that fills to score, with a
// hairline tick marking the pass threshold. Colour is reserved for the verdict.
function AnimatedGauge({
  name,
  score,
  threshold,
  delay = 0,
}: {
  name: string;
  score: number;
  threshold: number;
  delay?: number;
}) {
  const on = useReveal();
  const pct = Math.max(0, Math.min(100, (score / GAUGE_MAX) * 100));
  const pass = score >= threshold;
  const color = score === 1 ? "var(--red)" : pass ? "var(--green)" : "var(--amber)";
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="w-52 shrink-0 truncate text-sm text-text-2">{name}</div>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-panel-2">
        <div
          className="h-full rounded-full"
          style={{
            width: on ? `${pct}%` : "0%",
            background: color,
            transition: `width 0.75s cubic-bezier(0.16,0.84,0.44,1) ${delay}ms`,
          }}
        />
        <div
          className="absolute top-0 h-full w-px"
          style={{ left: `${(threshold / GAUGE_MAX) * 100}%`, background: "color-mix(in srgb, var(--text) 22%, transparent)" }}
          aria-hidden="true"
        />
      </div>
      <div className="mono w-10 text-right text-sm" style={{ color }}>
        {score}/{GAUGE_MAX}
      </div>
    </div>
  );
}

// KPI tile. Numeric-leading values count up in a large mono figure; free-text
// values (PASS / INSUFFICIENT DATA / notes) render smaller so they never clip.
function MetricTile({
  label,
  value,
  sub,
  tone = "text",
  delay = 0,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "text" | "red" | "amber" | "green" | "gold";
  delay?: number;
}) {
  const isNumeric = /\d/.test(value);
  const toneClass = {
    text: "text-text",
    red: "text-red",
    amber: "text-amber",
    green: "text-green",
    gold: "text-gold",
  }[tone];
  return (
    <div className="panel lift reveal-up p-4" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between">
        <div className="label">{label}</div>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)" }} aria-hidden="true" />
      </div>
      <div
        className={`mono mt-2 font-semibold ${toneClass} ${
          isNumeric ? "text-[30px] leading-none" : "text-lg leading-snug"
        }`}
      >
        {isNumeric ? <AnimatedNumber value={value} /> : value}
      </div>
      <div className="mt-2 h-px w-full" style={{ background: "color-mix(in srgb, var(--gold) 30%, transparent)" }} />
      {sub ? <div className="mt-2 text-xs leading-relaxed text-text-2">{sub}</div> : null}
    </div>
  );
}

const MINUTE_LABELS = [
  "Minute 1 — What is the deal",
  "Minute 2 — What makes this work",
  "Minute 3 — What keeps you up at night",
  "Minute 4 — What else you're watching",
  "Minute 5 — What you need before IC",
];

export function DebriefView({
  payload,
  dealName,
  dealId,
  hasModel,
}: {
  payload: DebriefPayload;
  dealName: string;
  dealId: string;
  hasModel: boolean;
}) {
  const [rehearse, setRehearse] = useState(false);
  const [slide, setSlide] = useState(0);
  const minutes = [
    payload.icBriefing.minute1,
    payload.icBriefing.minute2,
    payload.icBriefing.minute3,
    payload.icBriefing.minute4,
    payload.icBriefing.minute5,
  ];
  const pass = payload.scorecard.verdict === "PROCEEDS";
  const dealBreaker = payload.scorecard.dimensions.some((d) => d.score === 1);
  const scoreReveal = useReveal();

  if (rehearse) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg p-10">
        <div className="label mb-4 text-gold">{MINUTE_LABELS[slide]}</div>
        <p className="max-w-3xl text-center text-2xl leading-relaxed text-text">{minutes[slide]}</p>
        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSlide((s) => Math.max(0, s - 1))}
            disabled={slide === 0}
            className="rounded border border-border px-4 py-2 text-sm disabled:opacity-30"
          >
            ← Prev
          </button>
          <span className="mono text-sm text-text-2">
            {slide + 1} / {minutes.length}
          </span>
          {slide < minutes.length - 1 ? (
            <button
              type="button"
              onClick={() => setSlide((s) => s + 1)}
              className="rounded bg-gold/90 px-4 py-2 text-sm font-medium text-[#1a140a]"
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setRehearse(false)}
              className="rounded border border-border px-4 py-2 text-sm"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{dealName} — Post-Call Debrief</h1>
        <span className="label">Underwriter.AI</span>
      </div>

      {/* MD SUMMARY */}
      <div className="rounded-lg border border-gold/40 bg-panel p-5" style={{ borderLeftWidth: 3 }}>
        <div className="label text-gold">MD summary</div>
        <p className="mt-2 text-lg leading-relaxed text-text">{payload.mdSummary}</p>
      </div>

      {/* IC BRIEFING */}
      <Panel>
        <div className="flex items-center justify-between">
          <div className="label">5-minute IC verbal briefing</div>
          <button
            type="button"
            onClick={() => {
              setSlide(0);
              setRehearse(true);
            }}
            className="rounded border border-gold/50 px-3 py-1 text-xs text-gold hover:bg-gold/10"
          >
            ▶ Rehearse mode
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {minutes.map((m, i) => (
            <div key={i}>
              <div className="label text-text-2">{MINUTE_LABELS[i]}</div>
              <p className="mt-1 text-sm leading-relaxed text-text">{m}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* SCORECARD */}
      <Panel className="reveal-up">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="label">Credit underwriting scorecard</div>
            <div className="mt-2 flex items-baseline gap-2">
              <AnimatedNumber
                value={String(payload.scorecard.total)}
                className={`mono text-5xl font-semibold tracking-tight ${pass ? "text-green" : "text-red"}`}
              />
              <span className="mono text-2xl font-medium text-text-2">/ 35</span>
            </div>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${
              pass ? "tint-blue text-green" : "tint-red text-red"
            }`}
          >
            {pass ? "PROCEEDS TO IC" : "BELOW 21 — DOES NOT PROCEED"}
          </span>
        </div>

        {/* Total vs. IC threshold meter (threshold = 21 / 35). */}
        <div className="mt-4">
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-panel-2">
            <div
              className="h-full rounded-full"
              style={{
                width: scoreReveal ? `${Math.min(100, (payload.scorecard.total / 35) * 100)}%` : "0%",
                background: pass ? "var(--green)" : "var(--red)",
                transition: "width 0.9s cubic-bezier(0.16,0.84,0.44,1)",
              }}
            />
            <div
              className="absolute top-1/2 h-3.5 w-px -translate-y-1/2"
              style={{ left: `${(21 / 35) * 100}%`, background: "var(--gold)" }}
              aria-hidden="true"
            />
          </div>
          <div className="mono mt-1 flex justify-between text-[10px] text-text-2">
            <span>0</span>
            <span className="text-gold">IC threshold · 21</span>
            <span>35</span>
          </div>
        </div>

        <div className="mt-4 space-y-0.5">
          {payload.scorecard.dimensions.map((d, i) => (
            <AnimatedGauge key={d.name} name={d.name} score={d.score} threshold={d.threshold} delay={i * 70} />
          ))}
        </div>

        {dealBreaker ? (
          <div className="mt-3 rounded tint-red p-2 text-xs text-red">
            One or more dimensions scored 1 — deal-level concern regardless of total.
          </div>
        ) : null}
      </Panel>

      {/* MODEL DEEP-LINK */}
      {hasModel ? (
        <div
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gold/40 bg-panel p-4"
          style={{ borderLeftWidth: 3 }}
        >
          <div>
            <div className="label text-gold">Underlying model</div>
            <p className="mt-1 text-sm text-text-2">
              See how these numbers were derived — sponsor vs credit leverage, the 50% repayment test, and every
              flag traced to the line it moves.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/deals/${dealId}/model#flag-leverage`}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-text-2 hover:text-text"
            >
              Financing vs credit leverage →
            </Link>
            <Link
              href={`/deals/${dealId}/model#flag-repayment`}
              className="rounded-md border border-gold/50 px-3 py-1.5 text-sm text-gold hover:bg-gold/10"
            >
              Open 50% test in model →
            </Link>
          </div>
        </div>
      ) : null}

      {/* METRICS */}
      <div className="grid gap-3 md:grid-cols-4">
        <MetricTile
          label="EBITDA quality"
          value={payload.metrics.ebitdaQuality.split("—")[0].trim()}
          sub={payload.metrics.ebitdaQuality}
          delay={0}
        />
        <MetricTile
          label="Leverage (fin / credit)"
          value={payload.metrics.creditLeverage.split(" ")[0]}
          tone="amber"
          sub={`Financing: ${payload.metrics.financingLeverage}`}
          delay={70}
        />
        <MetricTile
          label="50% repayment test"
          value={payload.metrics.repaymentTest.status}
          tone={payload.metrics.repaymentTest.status === "PASS" ? "green" : "red"}
          sub={payload.metrics.repaymentTest.detail}
          delay={140}
        />
        <MetricTile
          label="Forecast haircut"
          value={payload.metrics.forecastHaircut.match(/-?\d+(\.\d+)?%?/)?.[0] ?? payload.metrics.forecastHaircut}
          sub={payload.metrics.forecastHaircut}
          delay={210}
        />
      </div>

      {/* UNRESOLVED / MONITORING */}
      <div className="grid gap-3 md:grid-cols-2">
        <Panel>
          <div className="label text-red">Top unresolved 🔴</div>
          <ul className="mt-2 space-y-1.5 text-sm text-text">
            {payload.topUnresolvedRed.map((x, i) => (
              <li key={i}>— {x}</li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <div className="label text-amber">Monitoring 🟡</div>
          <ul className="mt-2 space-y-1.5 text-sm text-text">
            {payload.monitoringYellow.map((x, i) => (
              <li key={i}>— {x}</li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* ESCALATION */}
      <Panel>
        <div className="flex items-center justify-between">
          <div className="label">Escalation</div>
          <span className="mono rounded border border-border bg-panel-2 px-2 py-0.5 text-[11px] text-gold">
            {payload.escalation.tier}
          </span>
        </div>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div>
            <div className="label text-text-2">To VP</div>
            <ul className="mt-1 space-y-1 text-sm text-text">
              {payload.escalation.toVP.map((x, i) => (
                <li key={i}>— {x}</li>
              ))}
            </ul>
            <div className="label mt-3 text-text-2">To ILA / MD</div>
            <ul className="mt-1 space-y-1 text-sm text-text">
              {payload.escalation.toILAMD.map((x, i) => (
                <li key={i}>— {x}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label text-blue">📡 Capital markets (separate channel)</div>
            {payload.escalation.capitalMarketsFlags.length ? (
              <ul className="mt-1 space-y-1 text-sm text-blue">
                {payload.escalation.capitalMarketsFlags.map((x, i) => (
                  <li key={i}>— {x}</li>
                ))}
              </ul>
            ) : (
              <div className="mt-1 text-sm text-text-2">None</div>
            )}
            <div className="label mt-3 text-text-2">MD awareness</div>
            <p className="mt-1 text-sm text-text">{payload.escalation.mdAwareness}</p>
          </div>
        </div>
      </Panel>

      {/* FOLLOW-UP EMAIL */}
      <Panel>
        <div className="flex items-center justify-between">
          <div className="label">Follow-up email (formal register)</div>
          <CopyButton text={`${payload.followUpEmail.subject}\n\n${payload.followUpEmail.body}`} />
        </div>
        <div className="mono mt-3 rounded bg-panel-2 p-3 text-[13px] text-text-2">
          <div className="text-text">Subject: {payload.followUpEmail.subject}</div>
          <div className="mt-2 whitespace-pre-wrap">{payload.followUpEmail.body}</div>
        </div>
      </Panel>

      {/* EVASION LOG */}
      {payload.evasionLog.length > 0 ? (
        <Panel>
          <div className="label">Evasion log · {payload.evasionLog.length}</div>
          <div className="mt-3 space-y-3">
            {payload.evasionLog.map((e, i) => (
              <div key={i} className="rounded border border-border p-3 text-sm">
                <div className="text-text-2">Q: {e.originalQuestion}</div>
                <div className="mt-1 text-amber">Deflection: {e.deflection}</div>
                <div className="mono mt-1 text-text">Push back: “{e.pushback}”</div>
              </div>
            ))}
          </div>
        </Panel>
      ) : null}

      {/* EQUITY CREDIT NOTE */}
      <Panel>
        <div className="label">Equity-informed credit note</div>
        <p className="mt-2 text-sm leading-relaxed text-text-2">{payload.equityCreditNote}</p>
      </Panel>
    </div>
  );
}
