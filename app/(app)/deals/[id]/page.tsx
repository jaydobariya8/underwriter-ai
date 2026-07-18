import Link from "next/link";
import { notFound } from "next/navigation";
import { getDeal } from "@/lib/db";
import type { DocChecklist } from "@/types";
import { CopyButton } from "@/components/CopyButton";
import { DealSubNav } from "@/components/DealSubNav";
import { Chip, Panel, SeverityBadge } from "@/components/ui";

export const dynamic = "force-dynamic";

const DOC_LABELS: { key: keyof DocChecklist; label: string }[] = [
  { key: "lenderPresentation", label: "Lender presentation" },
  { key: "paydownModel", label: "Paydown model" },
  { key: "historicals", label: "Historicals (8Q + 2yr audits)" },
  { key: "ebitdaBridgeQoe", label: "EBITDA bridge & QoE" },
  { key: "pfCapTable", label: "PF cap table" },
];

export default async function PrecallPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = await getDeal(id);
  if (!deal) notFound();

  const precall = deal.precall;
  const intel = precall?.marketIntel;

  return (
    <div className="space-y-4">
      <DealSubNav dealId={deal.id} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mb-2 h-px w-8" style={{ background: "var(--gold)" }} />
          <p className="label text-gold">Pre-call diligence</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{deal.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip>{deal.txn_type}</Chip>
            <Chip>{deal.sector}</Chip>
            <Chip>{deal.call_type}</Chip>
            <Chip>{deal.target_rating}</Chip>
          </div>
        </div>
        <Link
          href={`/deals/${deal.id}/call`}
          className="flex items-center gap-2 rounded-md border border-red/60 px-4 py-2 text-sm text-red hover:bg-red/10"
        >
          <span className="h-2 w-2 rounded-full bg-red animate-livePulse" />
          Start Live Call
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_1fr_1fr]">
        {/* Document checklist */}
        <Panel>
          <div className="label">Document checklist</div>
          <div className="mt-3 space-y-2">
            {DOC_LABELS.map((d) => {
              const received = deal.doc_checklist[d.key];
              return (
                <div key={d.key} className="flex items-center justify-between text-sm">
                  <span className="text-text-2">{d.label}</span>
                  {received ? (
                    <span className="text-green">✓</span>
                  ) : (
                    <span className="rounded tint-amber px-1.5 py-0.5 text-[10px] text-amber">GAP</span>
                  )}
                </div>
              );
            })}
          </div>
        </Panel>

        {/* Doc request email */}
        <Panel>
          <div className="flex items-center justify-between">
            <div className="label">Opening document request</div>
            {precall ? (
              <CopyButton
                text={`${precall.docRequestEmail.subject}\n\n${precall.docRequestEmail.body}`}
              />
            ) : null}
          </div>
          {precall ? (
            <div className="mono mt-3 rounded bg-panel-2 p-3 text-[13px] text-text-2">
              <div className="text-text">Subject: {precall.docRequestEmail.subject}</div>
              <div className="mt-2 whitespace-pre-wrap">{precall.docRequestEmail.body}</div>
            </div>
          ) : (
            <div className="mt-3 text-sm text-text-2">No pre-call output generated.</div>
          )}
        </Panel>

        {/* Question list */}
        <Panel>
          <div className="label">Pre-call question list</div>
          <div className="mt-3 space-y-2.5">
            {precall?.questionList.length ? (
              precall.questionList.map((q, i) => (
                <div key={i} className="rounded border border-border p-2.5">
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={q.priority} />
                    <span className="label text-text-2">{q.category}</span>
                  </div>
                  <div className="mt-1.5 text-sm text-text">{q.question}</div>
                  <div className="mt-1 text-[11px] text-text-2">
                    Source: {q.source} · Recipient: {q.recipient}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-text-2">No questions generated.</div>
            )}
          </div>
        </Panel>
      </div>

      {/* Exa market intel */}
      {intel ? (
        <Panel>
          <div className="label text-blue">📡 Market intelligence (Exa live web search)</div>
          <p className="mono mt-2 whitespace-pre-wrap text-[13px] text-text-2">{intel.summary}</p>
          {intel.sources.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {intel.sources.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-border bg-panel-2 px-2 py-1 text-[11px] text-blue hover:underline"
                >
                  [{i + 1}] {s.title.slice(0, 48)}
                </a>
              ))}
            </div>
          ) : null}
        </Panel>
      ) : null}
    </div>
  );
}
