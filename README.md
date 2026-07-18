# Underwriter.AI

A live credit-analyst co-pilot for leveraged-finance diligence calls. 40+ Goldman Sachs TMT
leveraged-finance transactions encoded as 35 analytical rules, driving three phases of the
analyst's workflow: **pre-call** (document request + priority question list), **live call**
(real-time ASK NOW / flags / evasion detection), and **post-call** (MD summary, 5-minute IC
briefing, 7-dimension scorecard, follow-up email).

Built for a one-day hackathon. Next.js + Claude + Supabase + Exa, deployed on Render.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # leave keys blank to run in MOCK MODE
npm run dev                    # http://localhost:3000
```

**Mock mode** (no `ANTHROPIC_API_KEY`): the app serves canned ground-truth outputs from the
transcript fixtures — full demo works with zero keys and zero network. This is also the on-stage
insurance: if the live API fails, canned scenarios still play perfectly.

**Live mode**: set `ANTHROPIC_API_KEY`. The full 2,309-line IP system prompt
(`prompts/system_prompt.md`) is sent as a **prompt-cached** system block, and every endpoint uses
Anthropic **tool-forcing** so the model returns exact JSON — no markdown parsing.

## Environment

| Var | Required | Effect |
|-----|----------|--------|
| `ANTHROPIC_API_KEY` | for live mode | Unset → mock mode (canned outputs) |
| `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | optional | Unset → in-memory store (resets on restart) |
| `EXA_API_KEY` | optional | Enables pre-call market intelligence (cited web search) |
| `ANTHROPIC_MODEL` | optional | Defaults to `claude-sonnet-5` |
| `ELEVENLABS_API_KEY` | optional | Enables live-call voice (transcript spoken aloud). Unset → text-only call |
| `ELEVENLABS_MODEL` / `ELEVENLABS_VOICE_ID` / `ELEVENLABS_VOICE_MAP` | optional | Override TTS model and per-speaker voices |

## Supabase (optional persistence)

Create a project, open the SQL editor, run `supabase/schema.sql`. No RLS / no auth — single-demo-user
MVP; the service-role key is server-side only. Without Supabase the app uses an in-memory store.

## Deploy (Render)

`render.yaml` is a blueprint. In Render: New → Blueprint → connect the repo. Set the secret env vars
(`ANTHROPIC_API_KEY`, Supabase, Exa) in the dashboard. Uses the **Starter** instance (the free tier
cold-sleeps mid-demo). Health check: `/api/health`.

## Demo flow

1. **Dashboard** (`/dashboard`) — pipeline, aggregate flags, scores. Seed a completed deal with
   `POST /api/seed {"scenario":"kaseya"}` so it's never empty.
2. **New Deal** (`/deals/new`) — pick a demo scenario (Kaseya refi / Project Atlas LBO) to pre-fill,
   then Open Deal Room.
3. **Pre-call** (`/deals/[id]`) — generated document request, priority question list, Exa intel.
4. **Live call** (`/deals/[id]/call`) — ▶ Next exchange to play scripted lines; or type any line the
   counterparty says and the agent responds live (evasion detection fires on custom text too).
5. **Debrief** (`/deals/[id]/debrief`) — MD summary, IC briefing (with Rehearse mode), scorecard,
   escalation, follow-up email, evasion log.

The two scenarios come from the synthetic transcript repository — **Project Atlas** shows the
fireworks: soft evasion, fully-expensed leverage 8.5x vs the stated 7x, and a stale-SOFR $30mm/yr
interest gap.

## Architecture

```
app/
  (marketing)/page.tsx        public landing page (/)
  (app)/dashboard/page.tsx    dashboard (/dashboard)
  (app)/deals/new             deal config
  deals/[id]                  pre-call room
  deals/[id]/call             live HUD (client)
  deals/[id]/debrief          debrief
  api/deals[/[id][/exchange|/debrief]], api/health, api/intel, api/seed
lib/
  agent.ts        orchestration (precall/exchange/debrief, mock + fallback)
  anthropic.ts    tool-forced, prompt-cached Claude calls
  prompts.ts      system-prompt loader + task instructions
  schemas.ts      JSON schemas = the output contract
  db.ts           Supabase or in-memory data access
  exa.ts          pre-call market intelligence
  fixtures/       kaseya.json, lbo.json (scripted lines + ground-truth outputs)
prompts/system_prompt.md      the 35-rule IP brain, sent verbatim
```

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build (type-checked)
npm start        # production server
```
