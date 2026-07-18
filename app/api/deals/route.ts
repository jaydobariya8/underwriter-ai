import { NextResponse } from "next/server";
import { z } from "zod";
import { runPrecall } from "@/lib/agent";
import { createDeal, getDeal, listDeals, setPrecall } from "@/lib/db";
import { getFixture } from "@/lib/fixtures";
import type { DealConfig, DocChecklist, ScenarioKey } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const createSchema = z.object({
  name: z.string().min(1),
  sector: z.string().min(1),
  callType: z.string().min(1),
  txnType: z.string().min(1),
  rating: z.string().min(1),
  scenarioKey: z.enum(["kaseya", "lbo"]).nullish(),
});

export async function GET() {
  const deals = await listDeals();
  return NextResponse.json({ deals });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const config: DealConfig = parsed.data;
  const scenario = parsed.data.scenarioKey as ScenarioKey | null | undefined;

  // Seed the document checklist from the fixture when a scenario is chosen.
  let checklist: DocChecklist | undefined;
  if (scenario) checklist = getFixture(scenario).docChecklist;

  const deal = await createDeal(config, checklist);
  const precall = await runPrecall(config, deal.doc_checklist);
  await setPrecall(deal.id, precall);

  const full = await getDeal(deal.id);
  return NextResponse.json({ deal: full }, { status: 201 });
}
