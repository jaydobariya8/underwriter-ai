import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { listDeals } from "@/lib/db";
import { MOCK_MODE } from "@/lib/config";
import { computeDashboardStats } from "@/lib/stats";
import { BarByDay, Donut, Funnel, RuleBars, SeverityBars } from "@/components/DashboardCharts";
import { DashboardControls } from "@/components/DashboardControls";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { BrandGlyph } from "@/components/marketing/BrandMark";
import { IconAlert, IconBriefcase, IconFlag, IconRepeat, IconScale } from "@/components/Icons";
import { Panel } from "@/components/ui";

// Consistent premium section heading: a short gold hairline, title, and eyebrow —
// the same restrained language as the marketing site.
function PanelHead({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <div className="mb-2.5 h-px w-8" style={{ background: "var(--gold)" }} />
        <div className="font-semibold tracking-tight">{title}</div>
        {sub ? <div className="label mt-1">{sub}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export const dynamic = "force-dynamic";

const STAGE_DOT: Record<string, string> = {
  precall: "bg-amber",
  live: "bg-red animate-livePulse",
  debrief: "bg-green",
};

function KpiCard({
  icon,
  label,
  value,
  sub,
  tone = "default",
  accent,
  index = 0,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub: string;
  tone?: "default" | "primary";
  accent?: "red" | "amber" | "green" | "blue" | "gold";
  index?: number;
}) {
  const valueTone = accent
    ? { red: "text-red", amber: "text-amber", green: "text-green", blue: "text-blue", gold: "text-gold" }[accent]
    : "text-text";
  return (
    <div
      className="reveal-up lift sheen-host relative overflow-hidden rounded-xl border border-border bg-panel p-4"
      style={{ animationDelay: `${index * 70}ms` } as CSSProperties}
    >
      {tone === "primary" ? (
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }}
          aria-hidden="true"
        />
      ) : null}
      <div
        className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-border ${
          tone === "primary" ? "text-gold" : "text-text-2"
        }`}
        style={{ background: "var(--panel-2)" }}
      >
        {icon}
      </div>
      <div className="label">{label}</div>
      <div className={`mono mt-1.5 text-3xl font-semibold leading-none ${tone === "primary" ? "text-gold" : valueTone}`}>
        <AnimatedNumber value={value} />
      </div>
      <div className="mt-1.5 text-xs text-text-2">{sub}</div>
    </div>
  );
}

export default async function DashboardPage() {
  const deals = await listDeals();
  const s = computeDashboardStats(deals);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const repayPct = s.debriefCount ? Math.round((s.repayment.pass / s.debriefCount) * 100) : 0;
  const recent = [...deals]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 8);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2 h-px w-10" style={{ background: "var(--gold)" }} />
          <p className="label text-gold">Credit desk</p>
          <h1 className="mt-1 text-[1.9rem] font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-0.5 text-sm text-text-2">{today}</p>
        </div>
        <DashboardControls showSeed={deals.length === 0} />
      </div>

      {deals.length === 0 ? (
        <Panel className="reveal-up flex flex-col items-center justify-center gap-4 py-24 text-center">
          <div className="text-gold"><BrandGlyph size={40} /></div>
          <div>
            <div className="text-lg font-semibold">Your credit desk is quiet</div>
            <p className="mt-1 max-w-md text-sm text-text-2">
              Configure a deal to start a diligence call, or generate two worked scenarios to see the
              full pipeline — pre-call, live flags, and IC-ready debriefs.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/deals/new"
              className="rounded-md bg-gold/90 px-4 py-2 text-sm font-medium text-[#1a140a] hover:bg-gold"
            >
              New Deal +
            </Link>
            <DashboardControls showSeed />
          </div>
          {MOCK_MODE ? (
            <div className="label">Mock mode — no API key required</div>
          ) : null}
        </Panel>
      ) : (
        <>
          {/* KPI row */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            <KpiCard
              index={0}
              tone="primary"
              icon={<IconBriefcase width={16} height={16} />}
              label="Active deals"
              value={String(s.dealCount)}
              sub={`${s.byStage.debrief} closed · ${s.pending} in progress`}
            />
            <KpiCard
              index={1}
              icon={<IconFlag width={16} height={16} />}
              label="Flags raised"
              value={String(s.flags.total)}
              sub={`${s.flags.red} deal-level · ${s.flags.amber} monitoring`}
              accent={s.flags.red ? "red" : "amber"}
            />
            <KpiCard
              index={2}
              icon={<IconRepeat width={16} height={16} />}
              label="Repayment pass rate"
              value={`${repayPct}%`}
              sub="vs 50% Goldman standard"
              accent={repayPct >= 50 ? "green" : "red"}
            />
            <KpiCard
              index={3}
              icon={<IconScale width={16} height={16} />}
              label="Credit leverage"
              value={s.avgCreditLeverage ? `${s.avgCreditLeverage}x` : "—"}
              sub={`across ${s.debriefCount} debrief${s.debriefCount === 1 ? "" : "s"}`}
              accent="amber"
            />
            <KpiCard
              index={4}
              icon={<IconAlert width={16} height={16} />}
              label="Evasions caught"
              value={String(s.evasions)}
              sub={`from ${s.exchanges} exchanges`}
              accent={s.evasions ? "amber" : "green"}
            />
          </div>

          {/* Row 2: bar chart + schedule */}
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <Panel className="reveal-up lift">
              <PanelHead
                title="Agent activity this week"
                sub="Exchanges analysed per day"
                action={
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs text-gold">
                    {s.exchanges} total
                  </span>
                }
              />
              <BarByDay data={s.byDay} />
            </Panel>

            <Panel className="reveal-up lift p-0">
              <div className="hairline flex items-center justify-between px-4 py-2.5">
                <div className="font-semibold">Deal rooms</div>
                <Link href="/deals/new" className="text-xs text-gold hover:underline">
                  New +
                </Link>
              </div>
              <div className="max-h-[300px] divide-y divide-border overflow-y-auto">
                {recent.map((d) => {
                  const target = d.debrief
                    ? `/deals/${d.id}/debrief`
                    : d.stage === "live"
                      ? `/deals/${d.id}/call`
                      : `/deals/${d.id}`;
                  const score = d.debrief?.payload.scorecard.total;
                  return (
                    <Link key={d.id} href={target} className="flex items-center gap-3 px-4 py-2.5 hover:bg-panel-2">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${STAGE_DOT[d.stage] ?? "bg-border"}`} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{d.name}</div>
                        <div className="truncate text-[11px] text-text-2">
                          {d.txn_type} · {d.sector}
                        </div>
                      </div>
                      {score ? (
                        <span className={`mono text-xs ${score >= 21 ? "text-green" : "text-red"}`}>{score}/35</span>
                      ) : (
                        <span className="label">{d.stage}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </Panel>
          </div>

          {/* Row 3: funnel + rule performance */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel className="reveal-up lift">
              <PanelHead title="Deal pipeline" sub="Conversion through the diligence workflow" />
              <Funnel rows={s.funnel} />
            </Panel>
            <Panel className="reveal-up lift">
              <PanelHead title="Rule performance" sub="Most-fired analytical rules across all calls" />
              <RuleBars rows={s.rulePerf} />
            </Panel>
          </div>

          {/* Row 4: donuts + severity */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Panel className="reveal-up lift">
              <PanelHead title="50% Repayment test" sub="Across closed debriefs" />
              <Donut
                segments={[
                  { label: "Pass", value: s.repayment.pass, color: "#2ECC71" },
                  { label: "Fail", value: s.repayment.fail, color: "#F0433C" },
                  { label: "Insufficient", value: s.repayment.insufficient, color: "#8A94A6" },
                ]}
                centerLabel={`${repayPct}%`}
                centerSub="pass rate"
              />
            </Panel>
            <Panel className="reveal-up lift">
              <PanelHead title="IC verdict" sub="Scorecard outcome (≥21/35)" />
              <Donut
                segments={[
                  { label: "Proceeds", value: s.verdict.proceeds, color: "#2ECC71" },
                  { label: "Does not proceed", value: s.verdict.notProceed, color: "#F0433C" },
                ]}
                centerLabel={`${s.avgScore}`}
                centerSub="avg score /35"
              />
            </Panel>
            <Panel className="reveal-up lift">
              <PanelHead title="Flag severity mix" sub={`${s.flags.total} flags logged`} />
              <SeverityBars red={s.flags.red} amber={s.flags.amber} blue={s.flags.blue} />
            </Panel>
          </div>
        </>
      )}

      {/* Phase-2 moat */}
      <Panel className="reveal-up lift">
        <div className="label text-gold">Phase 2 — the moat (roadmap)</div>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-text-2">
          Every call generates training data. Clients feed their own paydown models, question lists,
          and IC memos into a per-institution knowledge base. Month 1: a generic Goldman-trained
          agent. Month 6: it behaves like a senior member of that specific team, producing IC memos in
          their exact format. A competitor with identical rules starts six months behind — the moat
          compounds with every call.
        </p>
      </Panel>
    </div>
  );
}
