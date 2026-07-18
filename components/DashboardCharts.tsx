"use client";

import { useEffect, useState } from "react";

// Reference CSS custom properties (defined in globals.css) so every chart
// re-colors instantly when the product theme flips between dark and light.
const C = {
  gold: "var(--gold)",
  red: "var(--red)",
  amber: "var(--amber)",
  blue: "var(--blue)",
  green: "var(--green)",
  border: "var(--border)",
  grid: "var(--chart-grid)",
  text2: "var(--chart-axis)",
  track: "var(--chart-track)",
  text: "var(--text)",
};

// Flip to true one frame after mount so CSS transitions animate from 0 → target.
function useReveal() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return on;
}

// ── Bar chart: exchanges per weekday ──
export function BarByDay({ data }: { data: { day: string; count: number }[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const on = useReveal();
  const max = Math.max(1, ...data.map((d) => d.count));
  const W = 640;
  const H = 240;
  const padL = 28;
  const padB = 26;
  const padT = 18;
  const PH = H - padB - padT; // plot height
  const bw = (W - padL) / data.length;
  const ticks = 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Exchanges per weekday">
      {Array.from({ length: ticks + 1 }, (_, i) => {
        const y = padT + PH * (1 - i / ticks);
        const val = Math.round((max * i) / ticks);
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={W} y2={y} stroke={C.grid} strokeWidth={1} />
            <text x={0} y={y + 4} fill={C.text2} fontSize={10} fontFamily="var(--font-mono-jb)">
              {val}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = (d.count / max) * PH;
        const x = padL + i * bw + bw * 0.2;
        const w = bw * 0.6;
        const y = padT + PH - h;
        const active = hover === i;
        return (
          <g key={d.day} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <rect x={padL + i * bw} y={0} width={bw} height={H - padB} fill="transparent" />
            <rect
              x={x}
              y={h > 0 ? y : H - padB - 2}
              width={w}
              height={h > 0 ? h : 2}
              rx={4}
              fill={C.gold}
              opacity={active ? 1 : 0.55}
              style={{
                transform: on ? "scaleY(1)" : "scaleY(0)",
                transformBox: "fill-box",
                transformOrigin: "bottom",
                transition: `transform 0.6s cubic-bezier(0.16,0.84,0.44,1) ${i * 45}ms`,
              }}
            />
            {active && d.count > 0 ? (
              <text x={x + w / 2} y={y - 6} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="var(--font-mono-jb)">
                {d.count}
              </text>
            ) : null}
            <text x={x + w / 2} y={H - 8} fill={C.text2} fontSize={10} textAnchor="middle">
              {d.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Donut ──
export function Donut({
  segments,
  centerLabel,
  centerSub,
}: {
  segments: { label: string; value: number; color: string }[];
  centerLabel: string;
  centerSub?: string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const R = 52;
  const cx = 70;
  const cy = 70;
  const circ = 2 * Math.PI * R;
  const on = useReveal();
  const dashes = segments.map((s) => (s.value / total) * circ);
  const offsets = dashes.reduce<number[]>((acc, dash, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + dashes[i - 1]);
    return acc;
  }, []);

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 140 140" className="h-32 w-32 shrink-0 -rotate-90">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.track} strokeWidth={14} />
        {segments.map((s, i) => {
          const dash = dashes[i];
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={14}
              strokeDasharray={`${on ? dash : 0} ${circ}`}
              strokeDashoffset={-offsets[i]}
              strokeLinecap="butt"
              style={{ transition: `stroke-dasharray 0.85s ease ${i * 140}ms` }}
            />
          );
        })}
      </svg>
      <div className="min-w-0">
        <div className="mono text-2xl font-semibold text-text">{centerLabel}</div>
        {centerSub ? <div className="text-xs text-text-2">{centerSub}</div> : null}
        <div className="mt-2 space-y-1">
          {segments.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              <span className="text-text-2">{s.label}</span>
              <span className="mono ml-auto text-text">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Funnel (horizontal, sequential gold) ──
export function Funnel({ rows }: { rows: { label: string; count: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  const shades = ["#8a7444", "#a68d52", "#c9a96a", "#ddc48c"];
  const on = useReveal();
  return (
    <div className="space-y-2.5">
      {rows.map((r, i) => (
        <div key={r.label} className="flex items-center gap-3">
          <div className="w-24 shrink-0 text-right text-xs text-text-2">{r.label}</div>
          <div className="h-7 flex-1 overflow-hidden rounded bg-[color:var(--panel-2)]">
            <div
              className="flex h-full items-center justify-end rounded pr-2"
              style={{
                width: on ? `${Math.max((r.count / max) * 100, 6)}%` : "0%",
                background: shades[i % shades.length],
                transition: `width 0.8s cubic-bezier(0.16,0.84,0.44,1) ${i * 80}ms`,
              }}
              title={`${r.label}: ${r.count}`}
            >
              <span className="mono text-xs font-semibold text-[#1a140a]">{r.count}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Rule performance bars ──
export function RuleBars({ rows }: { rows: { rule: number; label: string; count: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  const on = useReveal();
  if (rows.length === 0) {
    return <div className="text-sm text-text-2">No rules fired yet.</div>;
  }
  return (
    <div className="space-y-2.5">
      {rows.map((r, i) => (
        <div key={r.rule} className="flex items-center gap-3">
          <span className="mono w-9 shrink-0 rounded border border-border bg-[color:var(--panel-2)] px-1 py-0.5 text-center text-[11px] text-gold">
            R{r.rule}
          </span>
          <span className="w-40 shrink-0 truncate text-sm text-text">{r.label}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[color:var(--panel-2)]">
            <div
              className="h-full rounded-full bg-gold"
              style={{
                width: on ? `${(r.count / max) * 100}%` : "0%",
                transition: `width 0.8s cubic-bezier(0.16,0.84,0.44,1) ${i * 60}ms`,
              }}
            />
          </div>
          <span className="mono w-10 text-right text-sm text-text-2">{r.count}×</span>
        </div>
      ))}
    </div>
  );
}

// ── Severity outcome bars ──
export function SeverityBars({ red, amber, blue }: { red: number; amber: number; blue: number }) {
  const total = red + amber + blue || 1;
  const on = useReveal();
  const rows = [
    { label: "Deal-level 🔴", value: red, color: C.red },
    { label: "Monitoring 🟡", value: amber, color: C.amber },
    { label: "Information 🔵", value: blue, color: C.blue },
  ];
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <div key={r.label} className="flex items-center gap-3 text-sm">
          <span className="w-28 shrink-0 text-text-2">{r.label}</span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[color:var(--panel-2)]">
            <div
              className="h-full rounded-full"
              style={{
                width: on ? `${(r.value / total) * 100}%` : "0%",
                background: r.color,
                transition: `width 0.8s cubic-bezier(0.16,0.84,0.44,1) ${i * 80}ms`,
              }}
            />
          </div>
          <span className="mono w-16 text-right text-text">
            {r.value} <span className="text-text-2">({Math.round((r.value / total) * 100)}%)</span>
          </span>
        </div>
      ))}
    </div>
  );
}
