import type { ReactNode } from "react";
import type { Severity } from "@/types";

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`panel p-4 ${className}`}>{children}</div>;
}

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`label ${className}`}>{children}</div>;
}

const SEV_DOT: Record<Severity, string> = {
  red: "bg-red",
  yellow: "bg-amber",
  blue: "bg-blue",
};
const SEV_TINT: Record<Severity, string> = {
  red: "tint-red text-red",
  yellow: "tint-amber text-amber",
  blue: "tint-blue text-blue",
};

export function SeverityBadge({ severity, label }: { severity: Severity; label?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${SEV_TINT[severity]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${SEV_DOT[severity]}`} />
      {label ?? severity}
    </span>
  );
}

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded border border-border bg-panel-2 px-2 py-0.5 text-[11px] text-text-2 ${className}`}
    >
      {children}
    </span>
  );
}

export function StatTile({
  label,
  value,
  tone = "text",
  sub,
}: {
  label: string;
  value: ReactNode;
  tone?: "text" | "red" | "amber" | "green" | "gold";
  sub?: string;
}) {
  const toneClass = {
    text: "text-text",
    red: "text-red",
    amber: "text-amber",
    green: "text-green",
    gold: "text-gold",
  }[tone];
  return (
    <div className="panel p-4">
      <Label>{label}</Label>
      <div className={`mono mt-1 text-[28px] leading-none font-semibold ${toneClass}`}>{value}</div>
      {sub ? <div className="mt-1 text-xs text-text-2">{sub}</div> : null}
    </div>
  );
}

export function GaugeBar({
  name,
  score,
  threshold,
  max = 5,
}: {
  name: string;
  score: number;
  threshold: number;
  max?: number;
}) {
  const pct = Math.max(0, Math.min(100, (score / max) * 100));
  const pass = score >= threshold;
  const barColor = score === 1 ? "bg-red" : pass ? "bg-green" : "bg-amber";
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="w-52 shrink-0 text-sm text-text-2">{name}</div>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-panel-2">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <div className={`mono w-10 text-right text-sm ${pass ? "text-green" : "text-amber"}`}>
        {score}/{max}
      </div>
    </div>
  );
}

export function PulseDot({ tone = "red" }: { tone?: "red" | "green" | "amber" }) {
  const c = { red: "bg-red", green: "bg-green", amber: "bg-amber" }[tone];
  return <span className={`inline-block h-2 w-2 rounded-full ${c} animate-livePulse`} />;
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}
