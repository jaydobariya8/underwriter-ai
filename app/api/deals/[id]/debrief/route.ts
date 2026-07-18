import { NextResponse } from "next/server";
import { runDebrief } from "@/lib/agent";
import { getDeal, saveDebrief } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const deal = await getDeal(id);
  if (!deal) return NextResponse.json({ error: "Deal not found" }, { status: 404 });
  if (deal.exchanges.length === 0) {
    return NextResponse.json({ error: "No exchanges to debrief" }, { status: 400 });
  }

  const payload = await runDebrief(deal);
  await saveDebrief(id, payload);
  return NextResponse.json({ debrief: payload });
}
