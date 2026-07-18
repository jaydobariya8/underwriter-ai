import { NextResponse } from "next/server";
import { MOCK_MODE, PROVIDER, hasAnthropic, hasExa, hasGemini, hasSupabase } from "@/lib/config";

export const runtime = "nodejs";

// Health + capability probe. Also used to warm the Render instance before a demo.
export async function GET() {
  return NextResponse.json({
    ok: true,
    mode: MOCK_MODE ? "mock" : "live",
    provider: PROVIDER,
    capabilities: {
      gemini: hasGemini,
      anthropic: hasAnthropic,
      supabase: hasSupabase,
      exa: hasExa,
    },
    time: new Date().toISOString(),
  });
}
