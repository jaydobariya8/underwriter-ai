import Exa from "exa-js";
import { hasExa } from "./config";
import type { MarketIntel } from "@/types";

let client: Exa | null = null;
function getExa(): Exa {
  if (!client) client = new Exa(process.env.EXA_API_KEY as string);
  return client;
}

/**
 * Pre-call market intelligence. Pulls recent web signal on the company + sponsor
 * (news, sector moves, sponsor deal track record) and returns a cited summary that
 * gets folded into the pre-call Claude analysis. Returns null if Exa is not configured.
 */
export async function marketIntel(
  company: string,
  sector: string,
  txnType: string,
): Promise<MarketIntel | null> {
  if (!hasExa) return null;
  try {
    const exa = getExa();
    const query = `${company} ${sector} ${txnType} credit risk leverage recent news`;
    const res = await exa.searchAndContents(query, {
      type: "auto",
      numResults: 5,
      text: { maxCharacters: 600 },
      category: "news",
    });

    const sources = (res.results ?? []).slice(0, 5).map((r) => ({
      title: r.title ?? "Untitled",
      url: r.url,
      snippet: (r.text ?? "").slice(0, 280).replace(/\s+/g, " ").trim(),
    }));

    const summary = sources.length
      ? sources.map((s, i) => `[${i + 1}] ${s.title}: ${s.snippet}`).join("\n")
      : "No material recent market signal found.";

    return { summary, sources };
  } catch {
    // Exa is best-effort enrichment — never block deal creation on it.
    return null;
  }
}
