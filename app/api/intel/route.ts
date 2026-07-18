import { NextResponse } from "next/server";
import { marketIntel } from "@/lib/exa";
import { hasExa } from "@/lib/config";

export const runtime = "nodejs";
export const maxDuration = 30;

// Standalone Exa pre-call market intelligence — lets the UI show live web signal
// on the company + sponsor with citations.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const company = searchParams.get("company") ?? "";
  const sector = searchParams.get("sector") ?? "";
  const txnType = searchParams.get("txnType") ?? "";

  if (!company) {
    return NextResponse.json({ error: "company is required" }, { status: 400 });
  }
  if (!hasExa) {
    return NextResponse.json({ enabled: false, intel: null });
  }

  const intel = await marketIntel(company, sector, txnType);
  return NextResponse.json({ enabled: true, intel });
}
