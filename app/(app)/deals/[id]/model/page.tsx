import Link from "next/link";
import { notFound } from "next/navigation";
import { getDeal } from "@/lib/db";
import { getModelBundle } from "@/lib/model";
import { DealSubNav } from "@/components/DealSubNav";
import { ModelWorkbench } from "@/components/model/ModelWorkbench";
import { Panel } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function ModelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = await getDeal(id);
  if (!deal) notFound();

  const bundle = getModelBundle(deal.scenario_key);

  return (
    <div className="space-y-4">
      <DealSubNav dealId={deal.id} />
      {bundle ? (
        <ModelWorkbench bundle={bundle} dealId={deal.id} dealName={deal.name} />
      ) : (
        <Panel className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="label text-gold">Paydown model</div>
          <p className="max-w-md text-sm text-text-2">
            No reconciled model is attached to this deal. The interactive sponsor-vs-credit workbench is
            available for the seeded scenario deals (Kaseya refinancing and the B2B software LBO). Start from
            one of those to see the transcript flow into leverage, the 50% test, and the verdict.
          </p>
          <Link
            href={`/deals/${deal.id}`}
            className="rounded-md border border-gold/50 px-4 py-2 text-sm text-gold hover:bg-gold/10"
          >
            ← Back to pre-call
          </Link>
        </Panel>
      )}
    </div>
  );
}
