"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDeal } from "@/lib/api";
import { CALL_TYPES, RATINGS, SCENARIOS, SECTORS, TXN_TYPES } from "@/lib/scenarios";
import type { ScenarioKey } from "@/types";
import { Panel } from "./ui";

function SegRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="label mb-1.5">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              value === o
                ? "border-gold/60 bg-gold/10 text-gold"
                : "border-border bg-panel-2 text-text-2 hover:text-text"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DealForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sector, setSector] = useState<string>(SECTORS[0]);
  const [callType, setCallType] = useState<string>(CALL_TYPES[0]);
  const [txnType, setTxnType] = useState<string>(TXN_TYPES[0]);
  const [rating, setRating] = useState<string>(RATINGS[3]);
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function loadScenario(key: ScenarioKey) {
    const s = SCENARIOS.find((x) => x.key === key)!;
    setScenarioKey(key);
    setName(s.name);
    setSector(s.sector);
    setCallType(s.callType);
    setTxnType(s.txnType);
    setRating(s.rating);
  }

  async function submit() {
    if (!name.trim()) {
      setError("Deal name is required");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const { deal } = await createDeal({
        name: name.trim(),
        sector,
        callType,
        txnType,
        rating,
        scenarioKey,
      });
      router.push(`/deals/${deal.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create deal");
      setSubmitting(false);
    }
  }

  if (submitting) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-3 py-24">
        <div className="text-gold text-2xl">◆</div>
        <div className="label">Preparing deal room…</div>
        <div className="text-sm text-text-2">
          Reading configuration, pulling market intel, generating the document request and pre-call
          question list.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold">New Deal</h1>
        <p className="mt-1 text-sm text-text-2">
          Configure the call. Or load a demo scenario to pre-fill everything.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => loadScenario(s.key)}
            className={`rounded-md border px-3 py-2 text-left text-sm ${
              scenarioKey === s.key ? "border-gold/60 bg-gold/10" : "border-border bg-panel-2"
            }`}
          >
            <div className="font-medium text-text">{s.label}</div>
            <div className="text-[11px] text-text-2">{s.blurb}</div>
          </button>
        ))}
      </div>

      <Panel className="space-y-4">
        <div>
          <div className="label mb-1.5">Deal name</div>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setScenarioKey(null);
            }}
            placeholder="e.g. Project Atlas"
            className="w-full rounded-md border border-border bg-panel-2 px-3 py-2 text-sm text-text outline-none focus:border-gold/50"
          />
        </div>
        <SegRow label="Sector" options={SECTORS} value={sector} onChange={setSector} />
        <SegRow label="Call type" options={CALL_TYPES} value={callType} onChange={setCallType} />
        <SegRow label="Transaction type" options={TXN_TYPES} value={txnType} onChange={setTxnType} />
        <SegRow label="Target rating at close" options={RATINGS} value={rating} onChange={setRating} />
      </Panel>

      {error ? <div className="text-sm text-red">{error}</div> : null}

      <button
        type="button"
        onClick={submit}
        className="w-full rounded-md bg-gold/90 py-3 font-medium text-[#1a140a] hover:bg-gold"
      >
        Open Deal Room →
      </button>
    </div>
  );
}
