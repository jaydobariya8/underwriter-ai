import { NextResponse } from "next/server";
import { getDeal } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const deal = await getDeal(id);
  if (!deal) return NextResponse.json({ error: "Deal not found" }, { status: 404 });
  return NextResponse.json({ deal });
}
