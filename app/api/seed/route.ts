import { NextResponse } from "next/server";
import { runDebrief, runExchange } from "@/lib/agent";
import { addExchange, createDeal, getDeal, saveDebrief, setPrecall, setStage } from "@/lib/db";
import { getFixture } from "@/lib/fixtures";
import type { ScenarioKey } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 120;

// Seeds a fully-completed deal (all exchanges + debrief) so the dashboard and debrief
// screens are demo-able without replaying. POST /api/seed  (optionally { scenario: "lbo" }).
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const scenario = (body?.scenario ?? "kaseya") as ScenarioKey;
  const fx = getFixture(scenario);

  const deal = await createDeal(
    {
      name: fx.config.name,
      sector: fx.config.sector,
      callType: fx.config.callType,
      txnType: fx.config.txnType,
      rating: fx.config.rating,
      scenarioKey: scenario,
    },
    fx.docChecklist,
  );
  await setPrecall(deal.id, fx.precall);
  await setStage(deal.id, "live");

  // Spread seeded exchanges across the current week so the activity chart fills out.
  const now = Date.now();
  const shift = scenario === "lbo" ? 1 : 0;
  for (const line of fx.exchanges) {
    const current = await getDeal(deal.id);
    if (!current) break;
    const output = await runExchange(current, line.speaker, line.text);
    const daysAgo = Math.min(6, Math.max(0, fx.exchanges.length - line.seq + shift));
    const createdAt = new Date(now - daysAgo * 86_400_000).toISOString();
    await addExchange(deal.id, line.seq, line.speaker, line.text, output, createdAt);
  }

  const withExchanges = await getDeal(deal.id);
  if (withExchanges) {
    const payload = await runDebrief(withExchanges);
    await saveDebrief(deal.id, payload);
  }

  return NextResponse.json({ ok: true, dealId: deal.id });
}
