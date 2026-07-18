import Link from "next/link";
import { notFound } from "next/navigation";
import { getDeal } from "@/lib/db";
import { DebriefView } from "@/components/DebriefView";
import { Panel } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function DebriefPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = await getDeal(id);
  if (!deal) notFound();

  if (!deal.debrief) {
    return (
      <Panel className="flex flex-col items-center gap-3 py-16 text-center">
        <div className="label">No debrief yet</div>
        <p className="text-sm text-text-2">End the live call to generate the post-call debrief.</p>
        <Link
          href={`/deals/${deal.id}/call`}
          className="rounded-md border border-gold/50 px-4 py-2 text-sm text-gold hover:bg-gold/10"
        >
          Go to live call →
        </Link>
      </Panel>
    );
  }

  return <DebriefView payload={deal.debrief.payload} dealName={deal.name} />;
}
