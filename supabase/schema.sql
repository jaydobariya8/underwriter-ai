-- Underwriter.AI — Supabase schema. Run once in the Supabase SQL editor.
-- No RLS / no auth: single-demo-user MVP. Service-role key is server-side only.

create table if not exists deals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sector text not null,
  call_type text not null,
  txn_type text not null,
  target_rating text not null,
  scenario_key text,
  stage text not null default 'precall',
  doc_checklist jsonb not null default '{}'::jsonb,
  precall jsonb,
  created_at timestamptz default now()
);

create table if not exists exchanges (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid references deals(id) on delete cascade,
  seq int not null,
  speaker text not null,
  speaker_text text not null,
  agent_output jsonb,
  rules_fired text[],
  created_at timestamptz default now()
);

create table if not exists debriefs (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid references deals(id) on delete cascade,
  payload jsonb not null,
  created_at timestamptz default now()
);

create index if not exists exchanges_deal_seq on exchanges (deal_id, seq);
create index if not exists debriefs_deal on debriefs (deal_id);
