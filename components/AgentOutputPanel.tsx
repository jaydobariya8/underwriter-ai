import Link from "next/link";
import type { AgentOutput, Flag } from "@/types";
import { SeverityBadge } from "./ui";
import { CopyButton } from "./CopyButton";

// Order risks by severity so the analyst sees the deal-breakers first.
const SEV_RANK: Record<Flag["severity"], number> = { red: 0, yellow: 1, blue: 2 };

// Map a flag's category to the model line/flag it moves, so the analyst can jump
// from "what was said" straight to "here's the number it changes".
function modelAnchorFor(flag: Flag): { anchor: string; label: string } | null {
  if (flag.modelRef) return flag.modelRef;
  const c = flag.category.toUpperCase();
  if (/EBITDA|QUALITY|ADD.?BACK|ADJUST/.test(c)) return { anchor: "flag-ebitda-quality", label: "EBITDA quality" };
  if (/INTEREST|RATE|SOFR|COVERAGE/.test(c)) return { anchor: "flag-coverage", label: "interest coverage" };
  if (/LEVERAGE|DEBT/.test(c)) return { anchor: "flag-leverage", label: "leverage" };
  if (/MARGIN|REVENUE|GROWTH|CASH.?FLOW|FCF|REPAY/.test(c)) return { anchor: "flag-repayment", label: "the 50% test" };
  if (/STRUCTUR|EQUITY|CUSHION/.test(c)) return { anchor: "flag-equity-cushion", label: "equity cushion" };
  return null;
}

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-auto select-none text-text-2 transition-transform duration-200 group-open:rotate-90"
    >
      ›
    </span>
  );
}

/**
 * A single risk. Collapsed it reads as a one-line observation with a severity badge;
 * expanded it explains WHY it matters and gives the exact question to resolve it — so a
 * junior analyst can act without pinging the VP.
 */
function RiskCard({ flag, dealId }: { flag: Flag; dealId?: string }) {
  const tint =
    flag.severity === "red" ? "tint-red" : flag.severity === "yellow" ? "tint-amber" : "tint-blue";
  const ref = dealId ? modelAnchorFor(flag) : null;
  const hasDetail = Boolean(flag.rationale || flag.suggestedQuestion || ref);

  const header = (
    <div className="flex items-start gap-2">
      <SeverityBadge severity={flag.severity} />
      <span className="label mt-0.5 text-text-2">{flag.category}</span>
      {flag.rule ? <span className="mono mt-0.5 text-[11px] text-gold">Rule {flag.rule}</span> : null}
      {hasDetail ? <Caret /> : null}
    </div>
  );

  if (!hasDetail) {
    return (
      <div className={`rounded-lg border p-3 ${tint}`}>
        {header}
        <div className="mt-1.5 text-sm text-text">{flag.text}</div>
      </div>
    );
  }

  return (
    <details className={`group rounded-lg border p-3 ${tint}`}>
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        {header}
        <div className="mt-1.5 text-sm text-text">{flag.text}</div>
      </summary>

      <div className="mt-3 space-y-3 border-t border-border/60 pt-3">
        {flag.rationale ? (
          <div>
            <div className="label text-text-2">Why it matters</div>
            <p className="mt-1 text-[13px] leading-relaxed text-text">{flag.rationale}</p>
          </div>
        ) : null}

        {flag.suggestedQuestion ? (
          <div className="rounded-md border border-gold/40 bg-panel p-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="label text-gold">Ask to resolve</div>
              <CopyButton text={flag.suggestedQuestion} />
            </div>
            <p className="mt-1 text-[13px] leading-snug text-text">“{flag.suggestedQuestion}”</p>
          </div>
        ) : null}

        {ref ? (
          <Link
            href={`/deals/${dealId}/model#${ref.anchor}`}
            className="inline-flex items-center gap-1 text-[12px] text-gold hover:underline"
          >
            See {ref.label} in the model →
          </Link>
        ) : null}
      </div>
    </details>
  );
}

export function AgentOutputPanel({ output, dealId }: { output: AgentOutput; dealId?: string }) {
  const ev = output.evasion?.detected ? output.evasion : null;
  const flags = [...output.flags].sort((a, b) => SEV_RANK[a.severity] - SEV_RANK[b.severity]);
  const redCount = flags.filter((f) => f.severity === "red").length;

  const totalThreads = output.open.count + output.covered.count;
  const coveredPct = totalThreads > 0 ? Math.round((output.covered.count / totalThreads) * 100) : 0;

  return (
    <div className="animate-fadeUp space-y-4">
      {/* ── SAY THIS NOW ── the single live action */}
      {ev ? (
        <div className="animate-pulseRed rounded-lg border tint-red p-4" style={{ borderLeftWidth: 3 }}>
          <div className="flex items-center justify-between gap-2">
            <div className="label text-red">Evasion — push back now</div>
            <CopyButton text={ev.pushback} />
          </div>
          <div className="mt-2 text-lg leading-snug text-text">“{ev.pushback}”</div>
          <div className="mt-2 text-[13px] text-text-2">
            They redirected from: <span className="text-text">{ev.originalQuestion}</span>
          </div>
        </div>
      ) : (
        <div
          className="rounded-lg border border-gold/50 bg-panel p-4"
          style={{ borderLeftWidth: 3, borderLeftColor: "var(--gold)" }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="label text-gold">Ask now · say this</div>
            <CopyButton text={output.askNow} />
          </div>
          <div className="mt-2 text-lg leading-snug text-text">“{output.askNow}”</div>

          {output.internalCalculation || output.rulesFired.length > 0 ? (
            <details className="group mt-3 border-t border-border/60 pt-2">
              <summary className="label flex cursor-pointer items-center text-text-2 [&::-webkit-details-marker]:hidden">
                Why this, now
                <Caret />
              </summary>
              {output.internalCalculation ? (
                <p className="mono mt-2 text-[12px] leading-relaxed text-text-2">
                  {output.internalCalculation}
                </p>
              ) : null}
              {output.rulesFired.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {output.rulesFired.map((r, i) => (
                    <span
                      key={`${r.rule}-${i}`}
                      className="mono rounded border border-border bg-panel-2 px-1.5 py-0.5 text-[11px] text-text-2"
                    >
                      R{r.rule} · {r.label}
                    </span>
                  ))}
                </div>
              ) : null}
            </details>
          ) : null}
        </div>
      )}

      {/* ── RISKS FLAGGED ── what could go wrong; expand for the "so what" + a fix */}
      {flags.length > 0 ? (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="label text-text-2">
              Risks flagged · {flags.length}
              {redCount > 0 ? <span className="ml-1.5 text-red">({redCount} deal-level)</span> : null}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-text-2">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red" />blocks
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />pre-IC
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue" />monitor
              </span>
            </div>
          </div>
          <p className="text-[11px] text-text-2">Tap a risk for why it matters and the question to resolve it.</p>
          <div className="space-y-2">
            {flags.map((f, i) => (
              <RiskCard key={`${f.category}-${i}`} flag={f} dealId={dealId} />
            ))}
          </div>
        </section>
      ) : null}

      {/* ── ASK NEXT ── the backlog, distinct from the single live Ask-now */}
      {output.questionQueue.length > 0 ? (
        <section className="panel p-4">
          <div className="label text-text-2">Ask next · {output.questionQueue.length}</div>
          <p className="mt-0.5 text-[11px] text-text-2">Follow-ups queued for later in the call.</p>
          <ol className="mt-2 space-y-1.5">
            {output.questionQueue.map((q, i) => (
              <li key={i} className="group flex items-start gap-2 text-[13px] text-text">
                <span className="mono mt-0.5 w-4 shrink-0 text-gold">{i + 1}</span>
                <span className="flex-1">{q}</span>
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  <CopyButton text={q} />
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* ── DILIGENCE COVERAGE ── the running scoreboard */}
      <section className="panel p-4">
        <div className="flex items-center justify-between">
          <div className="label text-text-2">Diligence coverage</div>
          <div className="mono text-[13px] text-text">
            <span className="text-green">{output.covered.count}</span>
            <span className="text-text-2"> / {totalThreads} covered</span>
          </div>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-panel-2">
          <div
            className="h-full rounded-full bg-green transition-[width] duration-500"
            style={{ width: `${coveredPct}%` }}
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <details className="group">
            <summary className="label flex cursor-pointer items-center text-amber [&::-webkit-details-marker]:hidden">
              Open · {output.open.count}
              <Caret />
            </summary>
            <ul className="mt-2 space-y-1 text-[12px] text-text-2">
              {output.open.items.map((it, i) => (
                <li key={i}>— {it}</li>
              ))}
            </ul>
          </details>
          <details className="group">
            <summary className="label flex cursor-pointer items-center text-green [&::-webkit-details-marker]:hidden">
              Covered · {output.covered.count}
              <Caret />
            </summary>
            <ul className="mt-2 space-y-1 text-[12px] text-text-2">
              {output.covered.items.map((it, i) => (
                <li key={i}>— {it}</li>
              ))}
            </ul>
          </details>
        </div>
      </section>
    </div>
  );
}
