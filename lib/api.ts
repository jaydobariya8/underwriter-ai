import type { AgentOutput, DealConfig, DealWithRelations, DebriefPayload, Exchange, Speaker } from "@/types";

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) },
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail?.error ? JSON.stringify(detail.error) : `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function createDeal(config: DealConfig): Promise<{ deal: DealWithRelations }> {
  return apiFetch("/api/deals", { method: "POST", body: JSON.stringify(config) });
}

export function listDeals(): Promise<{ deals: DealWithRelations[] }> {
  return apiFetch("/api/deals", { cache: "no-store" });
}

export function getDeal(id: string): Promise<{ deal: DealWithRelations }> {
  return apiFetch(`/api/deals/${id}`, { cache: "no-store" });
}

export function postExchange(
  id: string,
  speaker: Speaker,
  text: string,
): Promise<{ exchange: Exchange }> {
  return apiFetch(`/api/deals/${id}/exchange`, {
    method: "POST",
    body: JSON.stringify({ speaker, text }),
  });
}

export function postDebrief(id: string): Promise<{ debrief: DebriefPayload }> {
  return apiFetch(`/api/deals/${id}/debrief`, { method: "POST" });
}

export type { AgentOutput };
