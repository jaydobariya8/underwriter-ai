import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, hasSupabase } from "./config";
import type {
  AgentOutput,
  Deal,
  DealConfig,
  DealWithRelations,
  DebriefPayload,
  DocChecklist,
  Exchange,
  PrecallOutput,
  Speaker,
} from "@/types";

// ── Data access layer ──
// Uses Supabase when configured; otherwise an in-memory store (resets on restart).
// Same async API either way, so routes never branch on storage.

let supabase: SupabaseClient | null = null;
function sb(): SupabaseClient {
  if (!supabase) {
    supabase = createClient(
      SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    );
  }
  return supabase;
}

// ── in-memory store ──
interface MemDB {
  deals: Map<string, Deal>;
  exchanges: Map<string, Exchange[]>;
  debriefs: Map<string, DebriefPayload>;
}
const g = globalThis as unknown as { __memdb?: MemDB };
function mem(): MemDB {
  if (!g.__memdb) {
    g.__memdb = { deals: new Map(), exchanges: new Map(), debriefs: new Map() };
  }
  return g.__memdb;
}

function uuid(): string {
  return globalThis.crypto.randomUUID();
}

const DEFAULT_CHECKLIST: DocChecklist = {
  lenderPresentation: false,
  paydownModel: false,
  historicals: false,
  ebitdaBridgeQoe: false,
  pfCapTable: false,
};

export async function createDeal(
  config: DealConfig,
  checklist: DocChecklist = DEFAULT_CHECKLIST,
): Promise<Deal> {
  const deal: Deal = {
    id: uuid(),
    name: config.name,
    sector: config.sector,
    call_type: config.callType,
    txn_type: config.txnType,
    target_rating: config.rating,
    scenario_key: config.scenarioKey ?? null,
    stage: "precall",
    doc_checklist: checklist,
    precall: null,
    created_at: new Date().toISOString(),
  };
  if (hasSupabase) {
    const { data, error } = await sb()
      .from("deals")
      .insert({
        id: deal.id,
        name: deal.name,
        sector: deal.sector,
        call_type: deal.call_type,
        txn_type: deal.txn_type,
        target_rating: deal.target_rating,
        scenario_key: deal.scenario_key,
        stage: deal.stage,
        doc_checklist: deal.doc_checklist,
      })
      .select()
      .single();
    if (error) throw error;
    return data as Deal;
  }
  mem().deals.set(deal.id, deal);
  mem().exchanges.set(deal.id, []);
  return deal;
}

export async function setPrecall(dealId: string, precall: PrecallOutput): Promise<void> {
  if (hasSupabase) {
    const { error } = await sb().from("deals").update({ precall }).eq("id", dealId);
    if (error) throw error;
    return;
  }
  const deal = mem().deals.get(dealId);
  if (deal) deal.precall = precall;
}

export async function setStage(dealId: string, stage: Deal["stage"]): Promise<void> {
  if (hasSupabase) {
    const { error } = await sb().from("deals").update({ stage }).eq("id", dealId);
    if (error) throw error;
    return;
  }
  const deal = mem().deals.get(dealId);
  if (deal) deal.stage = stage;
}

export async function getDeal(dealId: string): Promise<DealWithRelations | null> {
  if (hasSupabase) {
    const { data: deal } = await sb().from("deals").select().eq("id", dealId).single();
    if (!deal) return null;
    const { data: exchanges } = await sb()
      .from("exchanges")
      .select()
      .eq("deal_id", dealId)
      .order("seq");
    const { data: debrief } = await sb()
      .from("debriefs")
      .select()
      .eq("deal_id", dealId)
      .maybeSingle();
    return {
      ...(deal as Deal),
      exchanges: (exchanges ?? []) as Exchange[],
      debrief: debrief
        ? { id: debrief.id, deal_id: dealId, payload: debrief.payload, created_at: debrief.created_at }
        : null,
    };
  }
  const deal = mem().deals.get(dealId);
  if (!deal) return null;
  const exchanges = mem().exchanges.get(dealId) ?? [];
  const payload = mem().debriefs.get(dealId);
  return {
    ...deal,
    exchanges,
    debrief: payload
      ? { id: `mem-${dealId}`, deal_id: dealId, payload, created_at: new Date().toISOString() }
      : null,
  };
}

export async function listDeals(): Promise<DealWithRelations[]> {
  if (hasSupabase) {
    const { data: deals } = await sb().from("deals").select().order("created_at", { ascending: false });
    const out: DealWithRelations[] = [];
    for (const d of (deals ?? []) as Deal[]) {
      const full = await getDeal(d.id);
      if (full) out.push(full);
    }
    return out;
  }
  const ids = [...mem().deals.values()]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map((d) => d.id);
  const out: DealWithRelations[] = [];
  for (const id of ids) {
    const full = await getDeal(id);
    if (full) out.push(full);
  }
  return out;
}

export async function addExchange(
  dealId: string,
  seq: number,
  speaker: Speaker,
  text: string,
  output: AgentOutput,
  createdAt?: string,
): Promise<Exchange> {
  const rulesFired = output.rulesFired.map((r) => `R${r.rule} ${r.label}`);
  const ts = createdAt ?? new Date().toISOString();
  const exchange: Exchange = {
    id: uuid(),
    deal_id: dealId,
    seq,
    speaker,
    speaker_text: text,
    agent_output: output,
    rules_fired: rulesFired,
    created_at: ts,
  };
  if (hasSupabase) {
    const { data, error } = await sb()
      .from("exchanges")
      .insert({
        id: exchange.id,
        deal_id: dealId,
        seq,
        speaker,
        speaker_text: text,
        agent_output: output,
        rules_fired: rulesFired,
        created_at: ts,
      })
      .select()
      .single();
    if (error) throw error;
    return data as Exchange;
  }
  const list = mem().exchanges.get(dealId) ?? [];
  list.push(exchange);
  mem().exchanges.set(dealId, list);
  return exchange;
}

export async function saveDebrief(dealId: string, payload: DebriefPayload): Promise<void> {
  if (hasSupabase) {
    const { error } = await sb().from("debriefs").insert({ deal_id: dealId, payload });
    if (error) throw error;
    await setStage(dealId, "debrief");
    return;
  }
  mem().debriefs.set(dealId, payload);
  await setStage(dealId, "debrief");
}
