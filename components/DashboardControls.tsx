"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const RANGES = ["Today", "This Week", "This Month"] as const;

export function DashboardControls({ showSeed }: { showSeed: boolean }) {
  const router = useRouter();
  const [range, setRange] = useState<string>("This Month");
  const [pending, startTransition] = useTransition();
  const [seeding, setSeeding] = useState(false);

  async function seed() {
    setSeeding(true);
    try {
      await fetch("/api/seed", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scenario: "kaseya" }),
      });
      await fetch("/api/seed", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scenario: "lbo" }),
      });
      startTransition(() => router.refresh());
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex rounded-lg border border-border bg-panel p-0.5">
        {RANGES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              range === r ? "bg-panel-2 text-text" : "text-text-2 hover:text-text"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => startTransition(() => router.refresh())}
        className="rounded-lg border border-border bg-panel p-2 text-text-2 hover:text-text"
        aria-label="Refresh"
        title="Refresh"
      >
        <span className={pending ? "inline-block animate-spin" : "inline-block"}>↻</span>
      </button>
      {showSeed ? (
        <button
          type="button"
          onClick={seed}
          disabled={seeding}
          className="rounded-lg border border-gold/50 bg-gold/10 px-3 py-2 text-xs font-medium text-gold hover:bg-gold/20 disabled:opacity-50"
        >
          {seeding ? "Generating…" : "Generate demo data"}
        </button>
      ) : null}
    </div>
  );
}
