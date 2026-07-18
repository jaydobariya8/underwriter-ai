import { notFound } from "next/navigation";
import { getDeal } from "@/lib/db";
import { getFixture } from "@/lib/fixtures";
import { hasElevenLabs } from "@/lib/config";
import { DealSubNav } from "@/components/DealSubNav";
import { LiveHUD } from "@/components/LiveHUD";
import type { ScenarioKey } from "@/types";

export const dynamic = "force-dynamic";

export default async function CallPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = await getDeal(id);
  if (!deal) notFound();

  const scenario = deal.scenario_key as ScenarioKey | null;
  const scriptedLines = scenario
    ? getFixture(scenario).exchanges.map((e) => ({ seq: e.seq, speaker: e.speaker, text: e.text }))
    : [];

  const header = `${deal.name.toUpperCase()} · ${deal.txn_type} · ${deal.sector} · ${deal.target_rating}`;

  return (
    <div className="space-y-4">
      <DealSubNav dealId={deal.id} />
      <LiveHUD
        dealId={deal.id}
        header={header}
        scriptedLines={scriptedLines}
        initialExchanges={deal.exchanges}
        voiceAvailable={hasElevenLabs}
      />
    </div>
  );
}
