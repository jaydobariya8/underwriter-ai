import type { AgentOutput } from "@/types";
import { SeverityBadge } from "./ui";

export function AgentOutputPanel({ output }: { output: AgentOutput }) {
  const ev = output.evasion?.detected ? output.evasion : null;

  return (
    <div className="animate-fadeUp space-y-3">
      {ev ? (
        <div className="animate-pulseRed animate-shake rounded-lg border tint-red p-4">
          <div className="label text-red">⚠ Evasion detected</div>
          <div className="mt-2 text-sm text-text">
            They redirected. Original question was:{" "}
            <span className="text-text-2">{ev.originalQuestion}</span>
          </div>
          <div className="mono mt-2 rounded bg-panel-2 p-2 text-sm text-text">
            Push back: “{ev.pushback}”
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-gold/40 bg-panel p-4" style={{ borderLeftWidth: 3 }}>
          <div className="label text-gold">⚡ Ask now</div>
          <div className="mt-2 text-lg leading-snug text-text">“{output.askNow}”</div>
        </div>
      )}

      {output.internalCalculation ? (
        <div className="panel p-4">
          <div className="label">🔢 Internal calculation</div>
          <div className="mono mt-2 text-[13px] leading-relaxed text-text-2">
            {output.internalCalculation}
          </div>
        </div>
      ) : null}

      {output.flags.length > 0 ? (
        <div className="space-y-2">
          {output.flags.map((f, i) => (
            <div
              key={`${f.category}-${i}`}
              className={`rounded-lg border p-3 ${
                f.severity === "red" ? "tint-red" : f.severity === "yellow" ? "tint-amber" : "tint-blue"
              }`}
            >
              <div className="flex items-center gap-2">
                <SeverityBadge severity={f.severity} />
                <span className="label text-text-2">🚩 {f.category}</span>
              </div>
              <div className="mt-1.5 text-sm text-text">{f.text}</div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        <details className="panel p-3">
          <summary className="label cursor-pointer text-amber">
            📋 Open · {output.open.count}
          </summary>
          <ul className="mt-2 space-y-1 text-[13px] text-text-2">
            {output.open.items.map((it, i) => (
              <li key={i}>— {it}</li>
            ))}
          </ul>
        </details>
        <details className="panel p-3">
          <summary className="label cursor-pointer text-green">
            ✅ Covered · {output.covered.count}
          </summary>
          <ul className="mt-2 space-y-1 text-[13px] text-text-2">
            {output.covered.items.map((it, i) => (
              <li key={i}>— {it}</li>
            ))}
          </ul>
        </details>
      </div>

      {output.questionQueue.length > 0 ? (
        <details className="panel p-3">
          <summary className="label cursor-pointer">Question queue · {output.questionQueue.length}</summary>
          <ol className="mono mt-2 list-decimal space-y-1 pl-5 text-[13px] text-text-2">
            {output.questionQueue.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ol>
        </details>
      ) : null}
    </div>
  );
}
