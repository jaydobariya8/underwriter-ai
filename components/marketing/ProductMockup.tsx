/**
 * Signature hero visual: a static "rule ledger" showing a deal moving through
 * pre-call, live analysis, and IC debrief. It is decorative/illustrative, so
 * the container carries a descriptive accessible name and the inner detail is
 * hidden from assistive tech to avoid noise.
 */
const STAGES = ["Pre-call", "Live call", "IC debrief"] as const;

const RULES = [
  { id: "01", label: "LTM date verified", note: "as of 31 Mar" },
  { id: "16", label: "Blended arithmetic", note: "cloud mix reconciled" },
  { id: "18", label: "SOFR stress", note: "+200bps applied" },
];

export function ProductMockup() {
  return (
    <div
      role="img"
      aria-label="Underwriter AI live analysis panel: a deal moving through pre-call, live call, and IC debrief, with encoded rules firing including LTM date verification, blended arithmetic, and SOFR stress testing."
      className="w-full overflow-hidden rounded-xl border"
      style={{
        background: "var(--navy)",
        borderColor: "color-mix(in srgb, var(--navy) 60%, #000)",
        boxShadow: "0 24px 60px -32px color-mix(in srgb, var(--navy) 55%, transparent)",
      }}
    >
      <div aria-hidden="true" style={{ color: "var(--stone)" }}>
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderBottom: "1px solid color-mix(in srgb, var(--stone) 14%, transparent)" }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--gold)" }}
            />
            <span className="text-sm font-medium tracking-tight">Project Atlas</span>
            <span
              className="text-[11px]"
              style={{ color: "color-mix(in srgb, var(--stone) 60%, transparent)" }}
            >
              Software LBO · B/B2
            </span>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest"
            style={{ background: "color-mix(in srgb, var(--gold) 20%, transparent)", color: "var(--gold)" }}
          >
            Live
          </span>
        </div>

        {/* Stage progress */}
        <div className="flex items-center gap-2 px-5 pt-4">
          {STAGES.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className="flex-1">
                <div
                  className="h-1 rounded-full"
                  style={{
                    background: i <= 1 ? "var(--gold)" : "color-mix(in srgb, var(--stone) 18%, transparent)",
                  }}
                />
                <div
                  className="mt-1.5 text-[10px] uppercase tracking-wider"
                  style={{ color: i <= 1 ? "var(--stone)" : "color-mix(in srgb, var(--stone) 45%, transparent)" }}
                >
                  {s}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ASK NOW line */}
        <div className="px-5 pt-5">
          <div
            className="rounded-lg p-4"
            style={{
              background: "color-mix(in srgb, var(--stone) 6%, transparent)",
              borderLeft: "2px solid var(--gold)",
            }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--gold)" }}>
              Ask now
            </div>
            <p className="mt-1.5 text-[13px] leading-snug">
              &ldquo;The 7x is on adjusted EBITDA — what does that look like fully expensing the $35mm of
              capitalised R&amp;D?&rdquo;
            </p>
          </div>
        </div>

        {/* Internal calc chip */}
        <div className="px-5 pt-3">
          <div
            className="flex items-center justify-between rounded-lg px-4 py-2.5"
            style={{ background: "color-mix(in srgb, var(--stone) 5%, transparent)" }}
          >
            <span className="text-[11px]" style={{ color: "color-mix(in srgb, var(--stone) 70%, transparent)" }}>
              Fully-expensed leverage
            </span>
            <span
              className="text-[13px] font-semibold"
              style={{ fontFamily: "var(--font-mono-jb), monospace", color: "var(--stone)" }}
            >
              8.5x <span style={{ color: "var(--gold)" }}>vs 7.0x stated</span>
            </span>
          </div>
        </div>

        {/* Rule rail */}
        <div className="px-5 pb-5 pt-4">
          <div
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "color-mix(in srgb, var(--stone) 50%, transparent)" }}
          >
            Rules fired
          </div>
          <ul className="mt-2 space-y-1.5">
            {RULES.map((r) => (
              <li key={r.id} className="flex items-center gap-3">
                <span
                  className="inline-flex h-6 w-8 shrink-0 items-center justify-center rounded text-[11px] font-semibold"
                  style={{
                    fontFamily: "var(--font-mono-jb), monospace",
                    background: "color-mix(in srgb, var(--gold) 16%, transparent)",
                    color: "var(--gold)",
                  }}
                >
                  {r.id}
                </span>
                <span className="text-[12px]" style={{ color: "var(--stone)" }}>{r.label}</span>
                <span
                  className="ml-auto text-[11px]"
                  style={{ color: "color-mix(in srgb, var(--stone) 55%, transparent)" }}
                >
                  {r.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
