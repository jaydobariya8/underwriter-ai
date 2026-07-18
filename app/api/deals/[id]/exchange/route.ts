import { NextResponse } from "next/server";
import { z } from "zod";
import { runExchange } from "@/lib/agent";
import { addExchange, getDeal, setStage } from "@/lib/db";
import type { Speaker } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const schema = z.object({
  speaker: z.enum(["LEV FIN", "SPONSOR", "CEO", "ANALYST", "MANAGEMENT"]),
  text: z.string().min(1),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const deal = await getDeal(id);
  if (!deal) return NextResponse.json({ error: "Deal not found" }, { status: 404 });

  if (deal.stage === "precall") await setStage(id, "live");

  const output = await runExchange(deal, parsed.data.speaker as Speaker, parsed.data.text);
  const exchange = await addExchange(
    id,
    deal.exchanges.length + 1,
    parsed.data.speaker as Speaker,
    parsed.data.text,
    output,
  );

  return NextResponse.json({ exchange });
}
