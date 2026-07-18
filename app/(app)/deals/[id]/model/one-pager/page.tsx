import Link from "next/link";
import { notFound } from "next/navigation";
import { getDeal } from "@/lib/db";
import { getModelBundle } from "@/lib/model";
import { ICOnePager } from "@/components/model/ICOnePager";
import { Panel } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function OnePagerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = await getDeal(id);
  if (!deal) notFound();

  const bundle = getModelBundle(deal.scenario_key);
  if (!bundle) {
    return (
      <Panel className="flex flex-col items-center gap-3 py-16 text-center">
        <div className="label text-gold">MD one-pager</div>
        <p className="max-w-md text-sm text-text-2">
          No reconciled model is attached to this deal, so there is no one-pager to render.
        </p>
        <Link
          href={`/deals/${deal.id}/model`}
          className="rounded-md border border-gold/50 px-4 py-2 text-sm text-gold hover:bg-gold/10"
        >
          ← Back to model
        </Link>
      </Panel>
    );
  }

  return <ICOnePager bundle={bundle} dealId={deal.id} dealName={deal.name} />;
}
