# Underwriter.AI — Master Index
Last updated: June 2026
Built from Arya Chudasama's Goldman Sachs TMT Leveraged Finance experience


---


## WHAT THIS IS

A live credit analyst agent that sits alongside an analyst during leveraged finance diligence calls. Three phases: pre-call document scan and question list, live call real-time guidance, post-call debrief and IC preparation.

The core IP is 40+ transactions of Goldman Sachs TMT leveraged finance experience encoded as 35 analytical rules.


---


## THE THREE FILES

### File 1 — underwriter_ai_system_prompt_v1_1.md
**What it is:** The agent brain. 2,309 lines. 35 rules.
**How to use it:** Paste into Claude Project instructions. This activates the agent for every conversation in the project.
**Status:** Complete and current.

### File 2 — underwriter_ai_transcript_repository_v1.md
**What it is:** The training dataset. 2,582 lines. Synthetic lender call transcripts with live agent outputs, corrections, and rule applications.
**How to use it:** Reference document for validating agent outputs. Each transcript tests specific rules.
**Status:** 4 complete, 1 in progress, 5 pending.

### File 3 — underwriter_ai_master_index.md (this file)
**What it is:** Navigation document. Where everything is, what has been done, what is next.
**Status:** Current.


---


## THE 35 RULES — QUICK REFERENCE

| Rule | Name | Core Principle |
|---|---|---|
| 1 | LTM Date Verification | Always ask LTM as of what date before accepting any leverage number |
| 2 | Credit Leverage Never Asked on Lev Fin Call | Credit EBITDA built internally — never asked of lev fin |
| 3 | NRR to Revenue Growth Bridge | NRR is the software revenue proxy — gap requires named bridge |
| 4 | Two Language Modes | Live call = conversational. Email = formal and structured. Never mixed. |
| 5 | Acquisition Triggers Three Questions | Entry multiple, strategic rationale, prior track record — all three required |
| 6 | Boilerplate Margin Expansion is a Flag | "Workforce optimisation" is not an answer — push for quantum and timeline |
| 7 | Integration Cost Roll-Off Requires Evidence | "Rolls off by year two" is an assumption not a fact |
| 8 | Never Ask What Documents Already Answer | Read documents pre-call. Surface findings not questions. |
| 9 | WC Universal Pressure Test | WC source on a growing business requires specific named mechanism — all sectors |
| 10 | Collaborative Language Register | "We" not "you". Curious not challenging. Never demanding. |
| 11 | EBITDA Bridge Ask — Direct and Specific | "Can we get the full adjustment schedule with roll-off timeline for each line item" |
| 12 | QoE Always Asked Never Assumed | Always ask. If refused — flag as monitoring item and apply higher scrutiny. |
| 13 | Lev Fin Won't Always Have the Answer | Push anyway. Every unanswered question becomes a follow-up email item. |
| 14 | Repayment Always Cumulative Never Point-in-Time | 50% test = cumulative 7-year FCF ÷ closing debt. Never single-year comparison. |
| 15 | Syndication Risk on LBO Calls | Close more than 3 months away with regulatory review = syndication risk flag |
| 16 | Always Build Blended Arithmetic Internally | Revenue-weighted blended metric before accepting any combined company figure |
| 17 | M&A Rationale Must Be Genuinely Explained | Three questions: why seller selling, why this buyer, why now. Playbook claims need evidence. |
| 18 | Cash Interest from Paydown Model | SOFR read from model. Never asked on call. Stress at +100bps and +200bps. |
| 19 | Paydown Model is the Single Working Document | IB builds from sponsor model. All assumptions read from here. Never reconstructed from call inputs. |
| 20 | OID, Flex Pricing, Debt Syndication | OID signal, flex direction, MFN calculation, net proceeds vs face value |
| 21 | Tier-Based Escalation and Capital Markets Handoffs | Tier 0/1/2 determines approval chain. OID/flex goes to syndication desk separately. |
| 22 | Operating with Limited Information + Iceberg Principle | Mode 1 (model received) vs Mode 2 (limited info). 90% internal. 10% surfaced. |
| 23 | Covenants, Structural Protections, Transfer Restrictions | Triggered when back-weighting 60%+ AND sponsor recap risk present. Five questions. |
| 24 | ARPU and Recurring Revenue % | Mandatory on every software transaction. Cross-sell TAM sizing. Software quality threshold 80% ARR. |
| 25 | Two-Segment Transition Business Framework | Crossover point analysis. Blended declining despite one segment growing. Five-step analysis. |
| 26 | Mode B Liquidity with Known Settlement | Settlement as waterfall line item. Runway = cash + RCF - settlement - burn. 50% test inclusive. |
| 27 | Target Standalone EBITDA Quality on Add-Ons | PLG margin sustainability. CAC payback. LTV/CAC. S&M investment adequacy. |
| 28 | Integration Risk Triangulation | Three dimensions: technical, commercial, people. Correlated risks flagged. |
| 29 | The IC Story Filter | Think like analyst presenting to MD. Identify single most concerning item. Centre discussion there. |
| 30 | The IC Verbal Briefing — 5 Minutes | Five sections. Spoken English. Specific numbers. Confident tone. Produced in every debrief. |
| 31 | Call vs Email Question Split | Major add-backs and flash numbers on call. Full schedules and granular detail in email. |
| 32 | Flash Numbers Request | When prior misses exist — always request flash numbers on call. Deal-specific items inferred. |
| 33 | Historical Financials — Correct Request | 8 quarters quarterly financials + 2-year audits. Two separate documents. Both required. |
| 34 | Revolver Availability Under Covenant | Internal calculation. Agent asks analyst for covenant threshold if not in documents. |
| 35 | Standard Opening Document Request | Eight items: paydown model, 8Q quarterly financials, 2yr audits, PF cap table, LP, transaction materials, PF EBITDA bridge, adjustment details |


---


## TRANSCRIPT REPOSITORY STATUS

| # | Transaction | Sector | Call Type | Status | Primary Rules Tested |
|---|---|---|---|---|---|
| 1 | Straight refi | Software — Kaseya | Lev fin relay | ✅ Complete — 7 exchanges + debrief | 1, 2, 3, 6, 7, 8, 9, 11, 12, 13, 14 |
| 2 | LBO | Software | Lender call | ✅ Complete — 7 exchanges + debrief | 1, 2, 3, 5, 6, 15, 16, 17, 18, 19 |
| 3 | Dividend recap | Software | Lev fin relay | ✅ Complete — 7 exchanges + debrief | 14, 17, 20, 21, 23 |
| 4 | Add-on acquisition | Software | Direct sponsor | ✅ Complete — 7 exchanges + debrief | 16, 22, 24, 27, 28, 29, 30, 31 |
| 5 | LBO + settlement | Software — CDK type | Direct sponsor | ⏳ Exchange 4 done, 5-7 + debrief pending | 22, 25, 26, 29, 30, 31, 32 |
| 6 | LBO | Industrials | Lender call | ⏸ Pending | Destocking, capex intensity, inventory |
| 7 | Straight refi | Media | Lev fin relay | ⏸ Pending | Event-driven revenue, disintermediation |
| 8 | Revolver extension | Software | Direct sponsor | ⏸ Pending | Mode B burn analysis, liquidity runway |
| 9 | LBO evasion-heavy | Software | Direct sponsor | ⏸ Pending | Evasion interrupt — every evasion pattern |
| 10 | Add-on | Healthcare | Lender call | ⏸ Pending | Post-bankruptcy, predecessor vs successor |


---


## CURRENT IC STORY — TRANSCRIPT 5

"The story has improved significantly from the opening. Segment A Q3 margin was entirely restructuring costs — normalised margin is 50%+, above model. Segment B Q4 recovering strongly at $32mm. Settlement funded via $80mm unconditional sponsor equity commitment. Credit leverage on normalised EBITDA may be as low as 5.9x — well below the 7x+ from the opening. Before IC: verify normalised Segment A margins against quarterly financials and confirm year one model reflects post-restructuring cost base."


---


## PRODUCT ARCHITECTURE — FOR REFERENCE

**Phase 1 — Generic intelligence (built):**
35 rules, sector layer, transcript repository. Works on any deal from day one.

**Phase 2 — Client-specific intelligence (post-onboarding):**
Client feeds their paydown models, question lists, IC memos. Agent learns their preferences. Data flywheel compounds.

**Tech stack when ready to build:**
MVP: Bubble (frontend) + Claude API + AssemblyAI (transcription) + Supabase
Production: Next.js + Node.js + Supabase + AssemblyAI streaming + Vercel/Railway

**Cursor:** Relevant when a developer starts writing code. Not yet.


---


## NEXT STEPS — IN ORDER

1. **Complete Transcript 5** — exchanges 5-7 plus post-call debrief. 1 session.
2. **Build Transcripts 6-10** — 5 remaining scenarios. 3-4 sessions.
3. **Find pilot user** — one person from Goldman network. Give them Claude Project access. Get feedback on one real call.
4. **Decide build path** — Bubble no-code MVP or hire Next.js developer with Cursor.
5. **Build UI** — around the agent that is already working.


---


## STANDARD OPENING DOCUMENT REQUEST — TEMPLATE

Subject: [Company Name] — Initial Document Request

"Following our conversation, please provide the following materials at your earliest convenience so we can begin our review:

1. Paydown model
2. Last 8 quarters of quarterly financials
3. Minimum 2 years of audited financial statements
4. PF cap table
5. Most recent lender presentation
6. Transaction materials (CIM, management presentation)
7. PF EBITDA bridge
8. Adjustment details with roll-off schedule

We would appreciate receiving the paydown model and PF cap table first as priority items so we can start our initial leverage and capital structure assessment. Please let us know if any of these materials are not yet available."


---

*Underwriter.AI — Master Index v1.0*
*Built June 2026*
*Next update: after Transcript 5 complete*
