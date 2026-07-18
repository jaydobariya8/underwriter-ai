import Link from "next/link";
import { notFound } from "next/navigation";
import { getDeal } from "@/lib/db";
import { getModelBundle, parseModelState } from "@/lib/model";
import { ICOnePager } from "@/components/model/ICOnePager";
import { Panel } from "@/components/ui";

export const dynamic = "force-dynamic";

type PageSearchParams = Record<string, string | string[] | undefined>;

export default async function OnePagerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<PageSearchParams>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
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

  const stateParams = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      value.forEach((item) => stateParams.append(key, item));
    } else if (value !== undefined) {
      stateParams.set(key, value);
    }
  }
  const state = parseModelState(stateParams, bundle);

  return (
    <ICOnePager
      bundle={bundle}
      dealId={deal.id}
      dealName={deal.name}
      enabledIds={state.enabledIds}
      scales={state.scales}
    />
  );
}
