# Underwriter.AI — Synthetic Transcript Repository
Version 1.0 — Built May 2026
This document is a living repository of synthetic lender call transcripts built to train the Underwriter.AI agent across all major transaction types, sectors, and call types.


---


## SCENARIO MATRIX

| # | Transaction | Sector | Call Type | Primary Issue | Status |
|---|-------------|--------|-----------|---------------|--------|
| 1 | Straight refi | Software | Lev fin relay | Margin expansion rule, NRR bridge | IN PROGRESS |
| 2 | LBO | Software | Lender call | Back-weighted repayment, adjustment ratio 140%+ | PENDING |
| 3 | Dividend recap | Software | Lev fin relay | Sponsor equity residual, equity cushion | PENDING |
| 4 | Add-on acquisition | Software | Direct sponsor | Integration risk, evasion detection | PENDING |
| 5 | Straight refi | Healthcare | Lev fin relay | Reimbursement rates, payer mix | PENDING |
| 6 | LBO | Industrials | Lender call | Destocking vs structural decline, capex | PENDING |
| 7 | Straight refi | Media | Lev fin relay | Event-driven revenue, disintermediation | PENDING |
| 8 | Revolver extension | Software | Direct sponsor | Liquidity stress, Mode B burn analysis | PENDING |
| 9 | LBO | Software | Direct sponsor | Management evasion — evasion interrupt | PENDING |
| 10 | Add-on acquisition | Healthcare | Lender call | Post-bankruptcy treatment | PENDING |


---


## TRANSCRIPT 1 — KASEYA STRAIGHT REFINANCING

**Transaction:** Straight refinancing of existing private credit debt into broadly syndicated market
**Sector:** Software / IT management
**Call type:** Lev fin relay
**Target rating:** B / B2
**Sponsor:** Insight Partners
**Key context:** Kaseya acquired Datto in FY23. FY23 EBITDA was 148% adjusted due to acquisition and integration costs. FY24 normalised to 34% adjusted as integration costs rolled off. This refi is the story of that normalisation.
**Deal parameters:** LTM adjusted EBITDA ~$600mm. Total debt ~$4bn. Financing leverage ~7x. NRR 108-110%. Revenue growth projected 10-12%. Margin expansion projected 400-500bps over forecast period.

**Rules being tested:** 1, 2, 3, 6, 7, 8, 9, 10, 11, 12


---


### EXCHANGE 1

**Lev fin says:**
"So Kaseya is looking to refinance its existing private credit debt. The deal is coming at approximately 7x on LTM adjusted EBITDA of around $600mm — so call it $4bn of total debt. The company has seen strong operational improvement since the Datto acquisition — EBITDA quality has normalised significantly, adjustment ratio is now around 34% versus where it was at close. NRR is tracking around 108-110% and management is projecting revenue growth of around 10-12% going forward with approximately 400-500bps of margin expansion over the forecast period. This is a straight refi — no new money, no acquisition. Just refinancing the existing private credit stack into the broadly syndicated market."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the LTM EBITDA — that $600mm, as of what date is that?"

🔢 INTERNAL CALCULATION
7x on $600mm = $4.2bn debt. Straight refi — full credit case required (above 4x). Adjustment ratio at 34% — Level 2 quality, acceptable but roll-off schedule needed to verify normalisation is complete. FY23 at 148% → FY24 at 34% — dramatic reduction requiring line-by-line verification pre-call from EBITDA bridge documents. Margin expansion at 400-500bps on straight refi — automatic flag, above 100bps/year threshold with no named catalyst yet.

🚩 FLAG [MARGINS] 🟡
400-500bps margin expansion on straight refi — no M&A, nothing changing structurally. Above 100bps/year threshold. Named catalyst required.

🚩 FLAG [EBITDA] 🟡
Dramatic adjustment ratio reduction FY23 148% → FY24 34%. Requires line-by-line bridge comparison pre-call to verify genuine roll-off not reclassification.

📋 OPEN
7 unanswered — LTM date unverified; margin expansion drivers unnamed; NRR to revenue growth bridge not given; add-back schedule not received; QoE status unknown; repayment capacity not calculable; revolver draw status unknown

✅ COVERED
Transaction type confirmed — straight refi, no new money. Normalisation story given FY23 → FY24.

---

**QUESTION QUEUE — conversational language:**

1. "On the LTM EBITDA — that $600mm, as of what date is that?"
2. "Can we get the full EBITDA adjustment schedule with the roll-off timeline for each line item — and is there a QoE report available that we could review alongside it?"
3. "On the 400-500bps of margin expansion — this is a straight refi, nothing's changing structurally. Do we have colour on what's actually driving that? What are the specific line items?"
4. "On NRR at 108-110% — if management is projecting 10-12% revenue growth, do we have a bridge for what's driving the incremental above what NRR implies?"
5. "Post the transaction — is the company planning to have anything drawn on the revolver?"

---

**RULES FIRED THIS EXCHANGE:**
- Rule 1 — LTM date verification (ASK NOW)
- Rule 2 — Credit leverage not asked (internal only)
- Rule 3 — NRR to revenue growth bridge flagged (OPEN)
- Rule 6 — Boilerplate margin expansion flagged (FLAG)
- Rule 8 — Adjustment ratio calculated internally not asked on call (INTERNAL CALCULATION)
- Rule 10 — Collaborative language used throughout question queue
- Rule 11 — EBITDA bridge ask queued
- Rule 12 — QoE ask queued

---

**CORRECTIONS FROM ARYA — Exchange 1:**

1. LTM date question is correct as first question ✓
2. "Do we have actuals for all 12 months" is not the right framing — the right framing is: do we have a complete EBITDA bridge from net income to adjusted EBITDA with all adjustments and the roll-off timeline for each line item
3. Credit leverage is never asked on a lev fin call — it is built internally ✓
4. NRR to revenue growth bridge question should ask for the specific named bridge, not just flag the gap ✓
5. Fully funded leverage is calculated internally — the live call question is only: "post the transaction, is the company planning to have anything drawn on the revolver?"
6. Adjustment ratio is calculated internally — never asked on the call ✓


---


### EXCHANGE 2

**Lev fin says:**
"On the LTM date — that's as of December 2024, so full year actuals. On the EBITDA bridge — we can get you the full adjustment schedule, the major items are integration costs related to the Datto acquisition, some restructuring charges, and stock based compensation. The integration costs were the big driver in FY23 but those have largely rolled off now. We don't have a QoE report on this one — it wasn't commissioned for the refi. On the margin expansion — Thoma Bravo's operational playbook is driving it, workforce optimisation, S&M efficiency, some infrastructure cost reduction. Management is confident in the 400-500bps over the forecast period. On revenue — NRR is 108% and management is projecting 10-12% growth, the incremental is coming from new logo additions and some upsell into the existing base."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the integration costs that have largely rolled off — can we get the full adjustment schedule with the roll-off timeline for each line item? And are the restructuring charges still running in FY24 or just FY23?"

🔢 INTERNAL CALCULATION
LTM December 2024 — full year actuals confirmed ✓. SBC — accepted, no challenge required. Integration costs — "largely rolled off" is not fully rolled off. Quantum of remaining integration costs unknown. Restructuring charges — if appearing in both FY23 and FY24, treat as recurring not non-recurring. No QoE — credit team carries full verification burden independently, higher scrutiny required on every add-back. NRR 108% → upsell at 108% is borderline — NRR needs to be above 110% for upsell thesis to be credible. New logo adds require pipeline evidence.

🚩 FLAG [EBITDA] 🟡
No QoE commissioned for this refi. Credit team carries full add-back verification burden. Higher scrutiny required on every line item — particularly integration costs and restructuring charges.

🚩 FLAG [MARGINS] 🟡
Workforce optimisation, S&M efficiency, infrastructure cost reduction — all boilerplate. No quantum per line item given. Rule 6 applies. Push for specifics.

📋 OPEN
6 unanswered — integration cost schedule not yet received; restructuring charge recurrence unverified; margin expansion quantum per driver unknown; new logo pipeline not evidenced; upsell capacity borderline at 108% NRR; repayment capacity still not calculable

✅ COVERED
LTM date confirmed — December 2024 full year actuals ✓
SBC accepted internally ✓
Revenue growth bridge given — new logos plus upsell
No QoE on this transaction — noted

---

**QUESTION QUEUE — conversational language:**

1. "Can we get the full EBITDA adjustment schedule with the roll-off timeline for each line item — particularly the integration costs and restructuring charges?"
2. "On the restructuring charges — were those running in both FY23 and FY24 or just FY23?"
3. "On the margin expansion — the 400-500bps, do we have a breakdown of what each driver contributes? What's the quantum on workforce optimisation versus S&M versus infrastructure separately?"
4. "On new logos — do we have any data on new logo adds over the last few quarters and what the pipeline looks like going forward?"
5. "On upsell — NRR is at 108%, do we have a sense of what's driving that and whether there's capacity to push it higher into the existing base?"

---

**RULES FIRED THIS EXCHANGE:**
- Rule 6 — Boilerplate margin expansion language flagged again
- Rule 7 — "Largely rolled off" challenged — evidence required
- Rule 10 — Collaborative language throughout
- Rule 11 — EBITDA bridge ask specific and direct
- Rule 12 — No QoE noted as open item, higher scrutiny applied

---

**CORRECTIONS FROM ARYA — Exchange 2:**
- Exchange 2 validated as correct ✓
- No corrections required


---


### EXCHANGE 3

**Lev fin says:**
"On the adjustment schedule — we'll get that over to you, the main items beyond SBC are about $25mm of remaining integration costs in FY25 and then that's largely it, restructuring was a FY23 item only. On the margin expansion — workforce optimisation is the biggest driver, call it 200bps, S&M efficiency another 150bps, and infrastructure cost reduction the remaining 100-150bps. On new logos — we've been adding roughly 500-600 new logos per quarter over the last three quarters, pipeline looks strong going into FY25. On upsell — NRR has been improving, it was 105% eighteen months ago and it's now at 108%, management expects to push that to 112% over the forecast period."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the $25mm of integration costs remaining in FY25 — what specifically is in there and what gives us confidence that's the last of it?"

🔢 INTERNAL CALCULATION
Restructuring — FY23 only confirmed. Not recurring ✓. Integration costs — $25mm remaining in FY25. Need to verify this is in the sponsor model not a management estimate. Margin expansion breakdown received: workforce optimisation 200bps, S&M 150bps, infrastructure 100-150bps. Total 450-500bps. All three still boilerplate — no dollar quantum per line item, no named headcount reduction plan, no specific S&M programme named. New logos — 500-600 per quarter. Need ASP of new logos vs existing base to assess revenue contribution. NRR trajectory — 105% → 108% → projected 112%. Trajectory positive and directionally credible. At 112% NRR the upsell thesis becomes more credible. Flag moves from 🔴 to 🟡.

🚩 FLAG [EBITDA] 🟡
$25mm integration costs remaining in FY25 — "largely it" is not confirmed zero. Need to verify this is in the sponsor model. If management estimate only — treat as unverified.

🚩 FLAG [MARGINS] 🟡
Margin expansion drivers quantified by bps but no operational mechanism named per driver. 200bps workforce optimisation — how many roles, which functions, what timeline? 150bps S&M — what specifically is changing in the go-to-market model?

📋 OPEN
5 unanswered — $25mm integration cost composition unknown; margin expansion operational mechanisms unnamed; new logo ASP vs existing base unknown; NRR 112% projection credibility unverified; repayment capacity still not calculable

✅ COVERED
Restructuring confirmed FY23 only — not recurring ✓
Margin expansion quantified by driver — workforce 200bps, S&M 150bps, infrastructure 100-150bps
New logo velocity — 500-600 per quarter, three quarter trend ✓
NRR trajectory confirmed — 105% → 108% → 112% projected

---

**QUESTION QUEUE — conversational language:**

1. "On the $25mm remaining in FY25 — what's actually in there and is that number in the sponsor model or is that more of a management estimate at this stage?"
2. "On the workforce optimisation driving 200bps — do we have a sense of how many roles, in which functions, and over what period that comes through?"
3. "On the S&M efficiency driving 150bps — what's specifically changing in the go-to-market model to drive that?"
4. "On new logos — do we have a sense of the average contract value on new logo wins versus the existing base? Just to understand the revenue contribution."
5. "On NRR getting to 112% — what's the specific mechanism driving that improvement from where we are today?"

---

**RULES FIRED THIS EXCHANGE:**
- Rule 6 — Margin expansion mechanisms still boilerplate, pushed for operational specifics
- Rule 7 — $25mm "largely it" challenged — sponsor model verification required
- Rule 10 — Collaborative language throughout
- Rule 8 — NRR trajectory assessed internally, flag severity adjusted

---

**CORRECTIONS FROM ARYA — Exchange 3:**
- Exchange 3 validated as correct ✓
- No corrections required


---


### EXCHANGE 4

**Lev fin says:**
"On the $25mm — that is in the sponsor model, it's primarily severance related to the final wave of Datto headcount rationalisation, should be fully done by end of Q2 FY25. On workforce optimisation — Thoma Bravo has identified roughly 8% of the combined headcount as redundant, primarily in G&A and customer support functions, that's being executed over the next 18 months. On S&M — the efficiency is coming from shifting the sales motion more toward channel partners rather than direct sales, which carries a lower cost to serve. On new logo ASP — new logos are coming in at roughly 60% of the ARPU of the existing base, so they are dilutive on a per unit basis but management expects them to expand over time through upsell. On NRR getting to 112% — management is expecting the higher tier product migrations to drive that, they launched a new enterprise tier six months ago and early adoption has been encouraging."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the new logo ASP being at 60% of existing ARPU — do we have data on how quickly prior cohorts have expanded toward the existing base ARPU level?"

🔢 INTERNAL CALCULATION
$25mm severance — in sponsor model ✓. Accepted per add-back hierarchy ✓. Workforce optimisation — 8% headcount, G&A and support, 18 months. Named and specific ✓. S&M channel shift — directionally credible but execution risk present. New logo ASP at 60% of existing ARPU — dilutive. Revenue growth depends on cohort expansion. NRR 105% → 108% → 112% projected. Enterprise tier "encouraging" is not a metric — specific data needed.

🚩 FLAG [REVENUE] 🟡
New logo ASP at 60% of existing base ARPU. Revenue growth assumption depends on cohort expansion toward existing ARPU. Data not yet provided.

🚩 FLAG [MARGINS] 🔵
S&M channel shift execution risk not yet assessed. Channel shifts historically take longer than modelled.

📋 OPEN
4 unanswered — cohort expansion data not provided; enterprise tier metrics not quantified; channel shift execution risk not assessed; repayment capacity not calculable

✅ COVERED
$25mm severance in sponsor model — Datto rationalisation, Q2 FY25 ✓
Workforce optimisation — 8% headcount, G&A and support, 18 months ✓
S&M mechanism — channel shift to partner model ✓
New logo ASP at 60% of existing ARPU ✓
Enterprise tier launched 6 months ago

---

**QUESTION QUEUE — conversational language:**
1. "On the new logo cohort expansion — do we have data on how quickly prior cohorts have moved toward the existing base ARPU?"
2. "On the enterprise tier — do we have any early metrics? How many customers have migrated and what's the revenue contribution so far?"
3. "On the channel shift — what percentage of new bookings are coming through channel today versus direct?"
4. "On repayment — do we have access to the sponsor model FCF build? We'd want to run through the seven year levered FCF."

---

**RULES FIRED:** Rules 5, 6, 8, 10, 13
**CORRECTIONS FROM ARYA:** Exchange 4 validated ✓


---


### EXCHANGE 5

**Lev fin says:**
"On the year by year FCF — year one $180mm, year two $210mm, year three $230mm, year four $250mm, year five $270mm, year six $300mm, year seven $380mm. Cumulative $1.82bn. On the exit — management and Insight are expecting a dual track process, either IPO or strategic sale, targeting year five or six. On the channel economics — a channel sale carries roughly 15-20% lower gross margin versus direct but the volume more than offsets it in management's view. On the cohort data — we'll have that for you by end of week."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the de-leveraging — can you help us understand what's driving the leverage reduction over the hold period? What does net leverage look like at year three and year five in the sponsor model?"

🔢 INTERNAL CALCULATION
Repayment capacity — cumulative:
Y1 $180mm + Y2 $210mm + Y3 $230mm + Y4 $250mm + Y5 $270mm + Y6 $300mm + Y7 $380mm = $1.82bn
$1.82bn ÷ $4.2bn = 43% — FAILS 50% Goldman standard 🔴

Back-weighting:
Years 1-3 = $620mm = 34% of total
Years 4-7 = $1.2bn = 66% of total
66% in years 4-7 — above 60% threshold — back-weighting flag FIRES 🔴

Channel economics — 15-20% gross margin dilution on channel vs direct. Mix shift 30% → 50% compresses blended gross margin. May partially offset 150bps S&M efficiency. Net margin expansion arithmetic needs stress testing once sponsor model received.

Exit dependency — dual track IPO or strategic sale year 5-6. At 43% cumulative repayment this is an exit story not an organic deleveraging story.

🚩 FLAG [REPAYMENT] 🔴
50% repayment test FAILS. $1.82bn ÷ $4.2bn = 43%. Structural problem — lenders dependent on exit event for liquidity.

🚩 FLAG [REPAYMENT] 🔴
Back-weighting confirmed. Years 4-7 = 66% of cumulative FCF. Flag fires independently.

🚩 FLAG [STRUCTURE] 🟡
Channel gross margin dilution not netted out of S&M efficiency gain. Net margin expansion overstated. Stress test required.

📋 OPEN
3 unanswered — cohort data pending; de-leveraging story not explained; net margin expansion not stress tested

✅ COVERED
Year by year FCF confirmed ✓
Cumulative 7-year FCF = $1.82bn ✓
Repayment = 43% — FAILS 🔴
Back-weighting — 66% years 4-7 🔴
Exit — dual track IPO or strategic sale year 5-6
Channel gross margin differential — 15-20% lower than direct ✓

---

**QUESTION QUEUE — conversational language:**
1. "On the de-leveraging — can you help us understand what's driving the leverage reduction? What does net leverage look like at year three and year five?"
2. "On the channel gross margin — has the dilution from the mix shift been netted out of the 150bps S&M efficiency gain in the model or are those presented gross?"
3. "On the cohort data — end of week works. And when you get a chance can you also send the full sponsor model?"

---

**RULES FIRED:** Rules 8, 10, 13, 14
**CORRECTIONS FROM ARYA:**
- Repayment always cumulative sum of all 7 years — never compare single years in isolation ✓
- Maturity profile read from cap table pre-call — never ask on call ✓
- De-leveraging story always asked regardless of repayment % ✓


---


### EXCHANGE 6

**Lev fin says:**
"On the de-leveraging — net leverage goes from 7x at close to approximately 5.2x by year three and 3.8x by year five. The primary driver is EBITDA growth rather than debt paydown — mandatory amortisation is 1% per year on the term loan. On the channel gross margin — yes those are presented gross, the margin dilution from the channel mix shift has not been explicitly netted out of the S&M efficiency gain in the model. On the sponsor model — we'll get that over to you this week along with the cohort data."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the debt paydown — what does the excess cash flow sweep look like in the structure? Is there a meaningful ECF mechanism or is it primarily the 1% mandatory amort?"

🔢 INTERNAL CALCULATION
De-leveraging — 7x → 5.2x year 3 → 3.8x year 5. Primary driver EBITDA growth not debt paydown. Mandatory amortisation 1% per year on $4.2bn = $42mm per year. Over 7 years = $294mm mandatory paydown. Remaining repayment must come from ECF sweep or exit. De-leveraging story is almost entirely EBITDA growth and exit — not debt repayment. Confirms exit dependency.

Channel gross margin dilution — confirmed not netted out. 150bps S&M efficiency overstated on net basis. Internal recalculation required once sponsor model received.

Sponsor model and cohort data — both arriving this week. Priority review items.

🚩 FLAG [STRUCTURE] 🔴
De-leveraging primarily EBITDA growth not debt repayment. Mandatory amort only 1% per year — $42mm on $4.2bn. ECF sweep unknown. Combined with 43% cumulative repayment and 66% back-weighting — lender exit almost entirely dependent on successful IPO or strategic sale years 5-6. Significant exit risk being taken.

🚩 FLAG [MARGINS] 🟡
Channel gross margin dilution confirmed not netted out of S&M efficiency. 150bps S&M efficiency overstated on net basis. Recalculation pending sponsor model.

📋 OPEN
2 unanswered — ECF sweep mechanism unknown; net margin expansion pending sponsor model

✅ COVERED
De-leveraging path — 7x → 5.2x year 3 → 3.8x year 5 ✓
Primary driver — EBITDA growth not debt paydown ✓
Mandatory amortisation — 1% per year ✓
Channel gross margin dilution not netted out — confirmed ✓
Sponsor model and cohort data — arriving this week ✓

---

**QUESTION QUEUE — conversational language:**
1. "On the debt paydown — what does the excess cash flow sweep look like? Is there a meaningful ECF mechanism or is it primarily the 1% mandatory amort?"
2. "On the margin model — once we get the sponsor model we'll want to net out the channel gross margin dilution from the S&M efficiency. Just flagging that as something we'll follow up on when we review it."

---

**RULES FIRED:** Rules 2, 8, 10, 13, 14
**CORRECTIONS FROM ARYA:**
- Maturity question removed entirely — read from cap table pre-call, never asked on call ✓
- De-leveraging question always asked regardless of repayment % ✓
- Three clean questions reduced to two after maturity question eliminated ✓


---


### EXCHANGE 7

**Lev fin says:**
"On the ECF sweep — there is a 50% excess cash flow sweep with step-downs to 25% at 4.5x and 0% at 4.0x net leverage. On the margin model — we'll flag that to the modelling team and get you a revised schedule that nets out the channel dilution from the S&M efficiency gain. We're coming up on time — any final questions from your side before we wrap?"

---

**AGENT OUTPUT:**

⚡ ASK NOW
"Just before we wrap — on the PF ratings, do we have a sense of where Moody's and S&P are landing and whether those are formal or still indicative at this stage?"

🔢 INTERNAL CALCULATION
ECF sweep — 50% stepping down to 25% at 4.5x and 0% at 4.0x. De-leveraging path: 7x → 5.2x year 3 → 3.8x year 5. Step-down to 25% kicks in around year 3-4. Step-down to 0% kicks in around year 5. Meaningful ECF sweep only applies years 1-3 when leverage above 4.5x.

Estimated debt repayment with ECF sweep:
- Mandatory amort years 1-7 = $294mm
- ECF sweep years 1-3 estimated = ~$195mm
- Total estimated cash debt repayment = ~$489mm
- $489mm ÷ $4.2bn = ~12% actual cash repayment
- Rest of de-leveraging is EBITDA growth
- Exit dependency confirmed and deepened 🔴

🚩 FLAG [STRUCTURE] 🔴
ECF sweep steps to 0% at 4.0x — projected year 5. Meaningful sweep only years 1-3. Actual cash debt repayment ~12% of closing debt. De-leveraging almost entirely EBITDA growth and exit. Lender protection from ECF sweep limited and time-bound.

📋 OPEN
2 unanswered — PF ratings not yet given; revised margin schedule netting channel dilution pending

✅ COVERED
ECF sweep confirmed — 50% with step-downs to 25% at 4.5x and 0% at 4.0x ✓
Revised margin schedule — modelling team to provide ✓

---

**QUESTION QUEUE — conversational language:**
1. "Just on PF ratings — do we have a sense of where Moody's and S&P are landing and are those formal or still indicative at this stage?"
2. "On the revised margin schedule — when do you think you'd be able to get that over? We'd want it alongside the sponsor model."
3. "Just to confirm the open items — we're expecting the sponsor model, cohort expansion data, full EBITDA adjustment schedule, and revised margin schedule all this week. Does that sound right?"

---

**RULES FIRED:** Rules 2, 8, 10, 13, 14
**CORRECTIONS FROM ARYA:** Exchange 7 validated as comprehensive ✓ — transcript complete


---


## KASEYA TRANSCRIPT — POST-CALL DEBRIEF

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UNDERWRITER.AI — CALL DEBRIEF
Kaseya — Straight Refinancing — Lev Fin Relay
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EBITDA QUALITY      Level 2 — adjustment ratio 34%, normalised from 148% in FY23. Roll-off schedule pending. No QoE commissioned — credit team carries full verification burden.

FINANCING LEVERAGE  7x on LTM December 2024 actuals — $4.2bn debt on $600mm adjusted EBITDA.

CREDIT LEVERAGE     To be calculated internally once sponsor model received and add-backs independently assessed.

50% REPAYMENT TEST  FAIL — cumulative 7-year levered FCF $1.82bn ÷ $4.2bn = 43%. Below 50% Goldman standard.

BACK-WEIGHTING      FIRED — years 4-7 = 66% of total cumulative FCF. Above 60% threshold. Fires independently.

EXIT DEPENDENCY     🔴 — de-leveraging primarily EBITDA growth not debt repayment. Mandatory amort 1%/year. ECF sweep steps to 0% at 4.0x by year 5. Estimated actual cash debt repayment ~12% of closing debt. Lenders taking exit risk — dual track IPO or strategic sale years 5-6.

TOP UNRESOLVED 🔴
1. 50% repayment test fails at 43% — structural problem. Needs resolution before IC.
2. Back-weighting confirmed 66% years 4-7 — reliance on outer-year assumptions.
3. Exit dependency — de-leveraging almost entirely EBITDA growth and exit event. ECF sweep protection limited and time-bound.

MONITORING ITEMS 🟡
1. Margin expansion 400-500bps on straight refi — channel gross margin dilution not netted out. Revised schedule pending.
2. New logo ASP at 60% of existing ARPU — revenue growth dependent on cohort expansion. Data pending.
3. NRR 112% projection — enterprise tier early stage, 150 customers, $8mm ARR. Not yet meaningful.
4. Channel shift 30% → 50% in 24 months — execution risk not assessed.
5. No QoE commissioned — higher scrutiny on every add-back required.

FOLLOW-UP BEFORE IC
1. Full sponsor model — FCF build, revenue assumptions, margin walk, debt schedule. [Recipient: lev fin]
2. Full EBITDA adjustment schedule with roll-off timeline per line item. [Recipient: lev fin]
3. Cohort expansion data — how quickly prior new logo cohorts expanded toward existing base ARPU. [Recipient: lev fin]
4. Revised margin schedule netting channel gross margin dilution against S&M efficiency gain. [Recipient: lev fin modelling team]
5. PF ratings — Moody's and S&P, formal or indicative. [Recipient: lev fin]

EVASION LOG
0 evasions detected — lev fin responsive throughout. Several items deferred to follow-up materials — logged as open items not evasions.

CREDIT CASE ADJUSTMENTS — to be finalised once sponsor model received
- Haircut management EBITDA for remaining add-back risk — quantum TBD pending adjustment schedule
- Strip deferred revenue from NWC — assess ex-deferred revenue WC position
- Net channel gross margin dilution against S&M efficiency — 150bps S&M gain likely overstated
- Apply back-weighted FCF haircut to outer-year assumptions — years 4-7 carry highest uncertainty
- Implied credit leverage likely above 7x once add-backs independently assessed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


---


## TRANSCRIPT 2 — PENDING

*Software LBO, lender call. Primary issue: back-weighted repayment flag, adjustment ratio 140%+.*
*To be built after Transcript 1 is complete.*


---


## TRANSCRIPT 3 — PENDING

*Software dividend recap, lev fin relay. Primary issue: sponsor equity residual, equity cushion below 20%.*
*To be built after Transcript 2 is complete.*


---


## TRANSCRIPT 4 — PENDING

*Software add-on acquisition, direct sponsor call. Primary issue: integration risk, evasion detection.*
*To be built after Transcript 3 is complete.*


---


## TRANSCRIPT 5 — PENDING

*Healthcare straight refi, lev fin relay. Primary issue: reimbursement rates, payer mix.*
*To be built after Transcript 4 is complete.*


---


## TRANSCRIPT 6 — PENDING

*Industrials LBO, lender call. Primary issue: destocking vs structural decline, capex intensity.*
*To be built after Transcript 5 is complete.*


---


## TRANSCRIPT 7 — PENDING

*Media straight refi, lev fin relay. Primary issue: event-driven revenue, disintermediation risk.*
*To be built after Transcript 6 is complete.*


---


## TRANSCRIPT 8 — PENDING

*Software revolver extension, direct sponsor call. Primary issue: liquidity stress, Mode B burn analysis.*
*To be built after Transcript 7 is complete.*


---


## TRANSCRIPT 9 — PENDING

*Software LBO, direct sponsor call. Primary issue: management evasion — evasion interrupt firing in real time.*
*To be built after Transcript 8 is complete.*


---


## TRANSCRIPT 10 — PENDING

*Healthcare add-on acquisition, lender call. Primary issue: post-bankruptcy treatment, predecessor vs successor periods.*
*To be built after Transcript 9 is complete.*


---

*Underwriter.AI Synthetic Transcript Repository — Version 1.0*
*Built May 2026*
*To be updated as each transcript is completed and validated*


---


## TRANSCRIPT 2 — SOFTWARE LBO / LENDER CALL

**Transaction:** LBO — new take-private of B2B SaaS company
**Sector:** Software / B2B SaaS — mix of on-premise and cloud
**Call type:** Lender call — credit team on call with sponsor and management present
**Target rating:** B / B2
**Sponsor:** [Redacted PE Firm]
**Key context:** PE sponsor acquiring a B2B enterprise software company with 2,000+ customers. Business is mid-transition from on-premise to cloud. Heavy add-backs — capitalised R&D plus acquisition-related costs. Adjustment ratio above 140%. Repayment back-weighted to years 4-7. Regulatory review expected — close timeline 4-6 months from signing.
**Deal parameters:** LTM adjusted EBITDA ~$200mm. Total debt ~$1.4bn. Financing leverage ~7x. Equity contribution 40%. NRR 103%. Revenue growth projected 12%. Margin expansion projected 600bps over forecast period.

**Operating mode: Lender call — most aggressive mode. Sponsor and management present. Evasion detection active. Follow-up probes surface immediately when answer is insufficient.**

**Rules being tested:** 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

**Language reference:** Microsoft-Activision, Twitter LBO, Broadcom-VMware investor presentations — sponsor language patterns encoded from SEC filings.


---


### EXCHANGE 1

**Sponsor says:**
"Thank you all for joining today. We're very excited to present this opportunity. [Target] is the clear market leader in B2B enterprise workflow software with over 2,000 enterprise customers across 40 countries. We see this as a highly compelling transaction for three reasons. First, the business has an exceptionally sticky recurring revenue base — customers have been with the platform for an average of seven years and switching costs are extremely high given deep workflow integration. Second, we see a significant margin expansion opportunity as we complete the transition of the remaining on-premise customers to cloud — this is a well-understood playbook we have executed successfully on prior investments. Third, the combination of our operational expertise and management's deep domain knowledge creates a platform with real long-term competitive advantages. The deal is coming at 7x on LTM adjusted EBITDA of $200mm — $1.4bn of total debt with 40% equity from us. The EBITDA bridge reflects the investment we've been making in the platform — some capitalised R&D and acquisition-related costs that we view as clearly non-recurring. Management is projecting 12% revenue growth and approximately 600bps of margin expansion over the forecast period as the cloud transition completes and the operational improvements come through. We're expecting to close in the next four to six months subject to customary regulatory approvals. I'll now hand over to [CEO] to walk through the business."

---

**AGENT OUTPUT — Lender call mode, evasion detection active:**

⚡ ASK NOW
"On the LTM EBITDA in the deck — is that as of transaction close and when exactly are we expecting to close?"

🔢 INTERNAL CALCULATION
7x on $200mm = $1.4bn debt. Above 4x — full credit case required, all frameworks activated.
Equity cushion — 40% contribution = $933mm equity on $2.33bn total capitalisation. Acceptable.
Close timeline — 4-6 months flagged by sponsor. Syndication risk monitoring item triggered — Rule 15.
Capitalised R&D add-back — "investment we've been making in the platform" is sponsor framing for a recurring operating cost. In any software business, product development is necessary to maintain competitive position. Must calculate fully expensed EBITDA equivalent immediately.
NRR not stated — sponsor said "exceptionally sticky recurring revenue base" and "customers for average of seven years." Did not cite NRR. From deal parameters NRR is 103% — implies ~3% organic growth. Management projecting 12%. Nine percentage point gap — no bridge given.
"Well-understood playbook we have executed successfully on prior investments" — sponsor claiming integration track record. Specific prior deal and synergy realisation data required. Rule 5 applies.
"Clearly non-recurring" — sponsor language for add-backs that may not be non-recurring. Capitalised R&D is definitionally recurring in a software business. Flag immediately.
Adjustment ratio — "some capitalised R&D and acquisition-related costs." At 140%+ this is Level 3-4 EBITDA quality. Maximum scrutiny. No QoE mentioned yet.

🚩 FLAG [EBITDA] 🔴
Capitalised R&D described as "clearly non-recurring investment" — sponsor smoothing language. Product development is a recurring operating cost in any software business. Must calculate fully expensed EBITDA. Until that number is given, adjusted EBITDA is materially overstated and leverage is understated.

🚩 FLAG [REVENUE] 🔴
NRR not explicitly cited despite sponsor emphasising "exceptionally sticky recurring revenue base." At 103% NRR, organic growth implied is ~3%. Management projecting 12%. Nine percentage point gap with no bridge given. Largest credibility gap in opening statement.

🚩 FLAG [EVASION] 🟡
"Exceptionally sticky recurring revenue base" used without citing NRR. Sponsor has the number — this is omission not absence. Lender call mode — flag as soft evasion. Surface NRR question immediately.

🚩 FLAG [STRUCTURE] 🟡
Close timeline 4-6 months with regulatory approval required. Syndication risk monitoring item — Rule 15. Company fundamentals must be stress tested at close date not just at signing. Any revenue or EBITDA deterioration in intervening period changes debt syndication picture materially.

📋 OPEN
9 unanswered — closing date not confirmed; LTM date unverified; NRR not cited; capitalised R&D quantum unknown; fully expensed EBITDA not given; revenue growth bridge not given; margin expansion mechanisms unnamed; prior deal synergy track record not evidenced; repayment capacity not calculable

✅ COVERED
Transaction type — LBO confirmed. Equity contribution 40% ✓. 2,000+ enterprise customers, 40 countries ✓. Average customer tenure 7 years noted. Close timeline — 4-6 months, regulatory approval required ✓. Cloud transition named as primary margin and growth driver.

---

**QUESTION QUEUE — conversational language, lender call mode:**

1. "On the LTM EBITDA in the deck — is that as of transaction close and when exactly are we expecting to close?"
2. "On NRR — do we have the latest figure and how has that been trending over the last few quarters?"
3. "On the capitalised R&D add-back — can you help us understand the quantum and what does EBITDA look like if we expense that fully?"
4. "On the prior cloud transition playbook — which specific prior investment are you referencing and what were the synergies projected versus what was actually delivered?"
5. "On the revenue growth — can you walk us through the bridge from the organic baseline to the 12% projection? What are the specific drivers?"
6. "Can we get the full EBITDA adjustment schedule with the roll-off timeline for each line item — and is there a QoE report available?"

---

**RULES FIRED THIS EXCHANGE:**
- Rule 1 — LTM date verification — is it as of transaction close ✓
- Rule 2 — Credit leverage calculated internally, never asked ✓
- Rule 3 — NRR to revenue growth bridge flagged 🔴
- Rule 5 — Prior deal track record queued ✓
- Rule 6 — Boilerplate margin expansion and "clearly non-recurring" language flagged ✓
- Rule 8 — Adjustment ratio calculated internally ✓
- Rule 10 — Collaborative language throughout ✓
- Rule 11 — EBITDA bridge ask specific and direct ✓
- Rule 12 — QoE ask queued ✓
- Rule 15 — Syndication risk flagged — 4-6 month close timeline 🟡

---

**KEY DIFFERENCE FROM TRANSCRIPT 1 — LEV FIN RELAY:**
Evasion detection is active in lender call mode. "Exceptionally sticky recurring revenue base" without citing NRR is flagged as a soft evasion — the sponsor has the number and chose not to give it. On a lev fin relay call this would be logged as an information gap. On a lender call with the sponsor present it is flagged as evasion and the question surfaces immediately.


---


### EXCHANGE 2 — IN PROGRESS

*To be completed in next session.*


---

### EXCHANGE 2

**CEO says:**
"Thanks for having us. I've been with the business for eleven years and built this from an on-premise product into what is now a hybrid cloud platform. On NRR — we're currently at 103% and that's been stable over the last few quarters. We see a clear path to getting that above 110% as we migrate customers to cloud because cloud customers historically show 115% NRR versus 95% for on-premise. On the revenue growth — the 12% is driven by three things: the cloud migration upsell, net new logo additions of around 400 per quarter, and geographic expansion into APAC which we're just beginning. On the capitalised R&D — that's approximately $35mm annually and it relates to new product development for the cloud platform. We view this as investment spend not operating spend because once the platform is built the ongoing maintenance cost drops materially. We're very comfortable with the quality of earnings here."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the $35mm of capitalised R&D — once the cloud platform is built and maintenance costs drop, what does that timeline look like and is there a specific point in the model where that spend steps down?"

🔢 INTERNAL CALCULATION
NRR confirmed — 103% blended, 95% on-premise, 115% cloud.
Blended arithmetic — Rule 16:
Cloud mix implied = (103% - 95%) ÷ (115% - 95%) = 40% cloud, 60% on-premise today.
Revenue growth thesis is entirely a cloud migration execution thesis:
- If mix stays 40/60 → blended NRR ~103% → revenue growth ~3%
- To hit 12% growth → cloud must reach ~75-80% of revenue over forecast period
- Entire 9 percentage point gap between NRR-implied growth and projected growth depends on migration executing on schedule
- If migration stalls → revenue growth collapses to ~3% → leverage stays at 7x → repayment fails

Capitalised R&D — $35mm annually. CEO rationale: "once the platform is built maintenance costs drop." This assumption is not credible in a competitive software market. Continuous development is an operating reality. Fully expensed calculation:
Reported adjusted EBITDA = $200mm
Less: $35mm capitalised R&D expensed
Fully expensed EBITDA = $165mm
Fully expensed leverage = $1.4bn ÷ $165mm = 8.5x vs stated 7x
Gap of 1.5 turns on a single add-back. 🔴

"Very comfortable with the quality of earnings" — repeated twice. No QoE cited. No third party validation. Evasion pattern — Rule 5 evasion detection.

APAC — "just beginning." No revenue yet. Being used as outer-year growth driver. Least credible driver in the bridge.

🚩 FLAG [EBITDA] 🔴
Capitalised R&D $35mm. Fully expensed EBITDA = $165mm. Fully expensed leverage = 8.5x vs stated 7x. "Once the platform is built" not credible — continuous software development is an operating cost not a one-time investment.

🚩 FLAG [REVENUE] 🔴
Cloud migration execution thesis — Rule 16. Cloud ~40% of revenue today. To hit 12% growth, cloud must reach ~75-80% of revenue over forecast. If migration stalls, revenue growth collapses to ~3%. Entire revenue thesis is execution dependent.

🚩 FLAG [REVENUE] 🟡
APAC "just beginning" — no revenue yet. Being used as outer-year growth driver. Least validated driver in the 12% bridge.

⚠️ EVASION ALERT
"Very comfortable with the quality of earnings" repeated twice — no substance given.
Original Q was: what does EBITDA look like if R&D is fully expensed?
Push back: "Just to make sure we have the right number — if we expense the full $35mm, what does that bring adjusted EBITDA to and what does leverage look like on that basis?"

📋 OPEN
7 unanswered — fully expensed EBITDA not confirmed; cloud migration timeline and current mix not given; new logo ASP vs existing base unknown; APAC revenue contribution and timeline unknown; QoE not mentioned; repayment capacity not calculable; prior deal synergy track record not evidenced

✅ COVERED
NRR confirmed — 103% blended, 95% on-premise, 115% cloud ✓
Revenue bridge given — cloud upsell, 400 new logos/quarter, APAC ✓
Capitalised R&D quantum — $35mm annually ✓
CEO tenure — 11 years ✓

---

**QUESTION QUEUE — conversational language:**
1. "Just to make sure we have the right number — if we expense the full $35mm, what does that bring adjusted EBITDA to and what does leverage look like on that basis?"
2. "On the cloud migration — what percentage of the customer base is on cloud today versus on-premise and what's the expected timeline for full migration?"
3. "On new logos at 400 per quarter — do we have a sense of the average contract value on new logos versus the existing base?"
4. "On APAC — when do we expect that to start contributing meaningfully to revenue and what's the investment required to get there?"
5. "On the quality of earnings — is there a QoE report available or is this based on internal analysis?"

---

**RULES FIRED THIS EXCHANGE:**
- Rule 3 — NRR to revenue bridge — blended arithmetic calculated internally ✓
- Rule 6 — Boilerplate quality of earnings language flagged ✓
- Rule 8 — Fully expensed EBITDA calculated internally ✓
- Rule 10 — Collaborative language throughout ✓
- Rule 11 — EBITDA bridge push — specific and direct ✓
- Rule 12 — QoE queued ✓
- Rule 16 — Blended arithmetic calculated — cloud 40% of revenue today, 75-80% required to hit 12% growth ✓
- Evasion detection — "very comfortable with quality of earnings" fired ✓

---

**CORRECTIONS FROM ARYA — Exchange 2:**
- Blended NRR arithmetic and migration execution thesis correctly identified ✓
- Agent going about it the right way — these are the inferences analysts need to make and ask questions on ✓
- No corrections required


---


### EXCHANGE 3 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 3

**Sponsor says:**
"On the fully expensed EBITDA — look, we've modelled this carefully and we're comfortable that the R&D capitalisation is appropriate under GAAP. If you were to expense it fully, adjusted EBITDA would be approximately $165mm, implying leverage of around 8.5x on that basis. But we don't think that's the right way to look at it because this spend is genuinely building a new asset — the cloud platform — that will generate returns for the next fifteen years. On the cloud migration — we're currently at about 38% cloud, 62% on-premise. We expect to reach 75% cloud within three years and full migration within five. On new logo ASP — new logos are coming in at about 55-60% of existing ARPU but our data shows they expand to 85-90% of existing ARPU within 24 months. On APAC — we've signed our first two distribution partnerships in Singapore and Australia, early pipeline is encouraging, we expect meaningful revenue contribution from year three. On the QoE — we don't have one for this transaction, we're relying on management accounts which have been reviewed by our finance team."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the cloud migration timeline — 38% to 75% in three years is a significant shift. Do we have historical migration data from prior quarters showing what the actual run rate has been?"

🔢 INTERNAL CALCULATION
Fully expensed EBITDA confirmed — $165mm. Fully expensed leverage confirmed — 8.5x.
Sponsor challenged framing but gave the number. Credit case uses $165mm and 8.5x regardless of sponsor framing.

Cloud migration arithmetic — Rule 16:
Year 0: 38% × 115% + 62% × 95% = 103% — matches stated NRR ✓
Year 3 at 75% cloud: 75% × 115% + 25% × 95% = 110% → supports ~10% revenue growth
Year 5 at 100% cloud: 100% × 115% = 115% → supports ~15% revenue growth
Migration timeline arithmetically consistent with 12% growth IF executed on schedule.
Migration pace: 37 percentage points in 36 months = ~1pp per month. No historical velocity data.

New logo ASP cohort expansion — 55-60% expanding to 85-90% in 24 months. Management claim, unverified.
APAC — two partnerships signed. Revenue from year three. Unquantified.
No QoE — management accounts reviewed by sponsor finance team only. Weakest verification standard for 7x LBO.

🚩 FLAG [EBITDA] 🔴
No QoE on a 7x LBO — management accounts reviewed by sponsor only. Credit team carries full verification burden. Every add-back requires independent challenge. EBITDA quality score remains 1.

🚩 FLAG [EBITDA] 🔴
"Building a new asset generating returns for 15 years" — standard capitalised R&D justification. Not accepted. Cloud platform requires continuous development post-migration. $35mm does not stop at migration completion. Credit case uses $165mm and 8.5x. Non-negotiable.

🚩 FLAG [REVENUE] 🟡
Migration pace 37pp in 36 months — no historical velocity data. Cohort expansion management-provided, unverified. Both require actual data before revenue thesis accepted.

🚩 FLAG [REVENUE] 🔵
APAC — two partnerships signed, revenue from year three, unquantified. Least credible component of 12% bridge.

⚠️ EVASION ALERT
Sponsor deflected by challenging framing — "we don't think that's the right way to look at it." Number was given but conclusion disputed. Standard sponsor technique to avoid anchoring. Agent records $165mm and 8.5x as credit case inputs regardless.

📋 OPEN
5 unanswered — historical migration velocity not provided; cohort expansion data unverified; APAC revenue quantum unquantified; reported EBITDA not given; repayment capacity not calculable

✅ COVERED
Fully expensed EBITDA — $165mm ✓
Fully expensed leverage — 8.5x ✓
Cloud mix — 38% cloud, 62% on-premise ✓
Migration target — 75% in 3 years, 100% in 5 years ✓
New logo cohort expansion — 55-60% to 85-90% in 24 months — management claim unverified
APAC — two partnerships, Singapore and Australia ✓
No QoE confirmed — management accounts only ✓

---

**QUESTION QUEUE — conversational language:**
1. "On the migration pace — do we have historical data on how quickly customers have been migrating over the last few quarters? What's the actual run rate?"
2. "On the cohort expansion — do we have a vintage analysis showing how prior new logo cohorts have actually tracked toward existing ARPU?"
3. "On APAC from year three — do we have a sense of the revenue quantum being modelled and what assumptions underpin it?"
4. "On the reported EBITDA — what is the unadjusted figure before any add-backs? We'd want to see the full bridge from reported to the $200mm adjusted."
5. "On the QoE — just to confirm, there's no plan to commission one before close?"

---

**RULES FIRED:** Rules 8, 10, 12, 13, 16, 17. Evasion detection — framing challenge noted, number given so not classified as full evasion.

**SCORECARD UPDATE:**
Business quality 3, Sector tailwind 3, EBITDA quality 1 🔴, Repayment TBD, Leverage 2, Structural protections 1, Forecast credibility 2. Total 15+TBD/35 — well below threshold.

**CORRECTIONS FROM ARYA — Exchange 3:**
- Exchange 3 validated ✓
- No corrections required


---


### EXCHANGE 4 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 5

**Sponsor says:**
"On the working capital breakdown — of the $22mm annual source, approximately $15mm is from deferred revenue growth as ARR expands, and the remaining $7mm is from payables optimisation as we consolidate vendor contracts post-acquisition. On the FCF gap — you're right, we missed a line. There is $30mm of growth capex in year one related to the cloud infrastructure buildout, stepping down to $15mm in year two and $8mm in year three as the migration completes. On the PF debt table — the structure is a $1.1bn first lien term loan at SOFR plus 450bps, a $150mm RCF undrawn at close, and $150mm of second lien at SOFR plus 800bps. No PIK, no hedging programme in place. On the NOLs — we have approximately $280mm of NOLs. Our counsel has reviewed the Section 382 analysis and we're comfortable the annual limitation is sufficient to utilise the NOLs over the first four years. After year four the tax rate normalises to approximately 24%. On the year by year FCF — year one $53mm, year two $78mm, year three $105mm, year four $130mm, year five $155mm, year six $168mm, year seven $180mm. Cumulative $869mm."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the interest rate assumption in the model — we're seeing the first lien at SOFR plus 450 and second lien at SOFR plus 800. At current SOFR that moves cash interest meaningfully above the $85mm in the model. Has the model been updated for the current rate environment or is there a hedging programme in place?"

🔢 INTERNAL CALCULATION
WC breakdown confirmed — $15mm deferred revenue, $7mm payables optimisation.
Rule 9 universal pressure test:
- Deferred revenue $15mm — strips out per Rule 9. Growth-dependent. Reverses if ARR slows.
- Payables optimisation $7mm — likely one-time year one benefit. If non-recurring, WC source from year two = $15mm deferred revenue only.
- Ex-deferred revenue WC: $7mm year one, flat to zero thereafter.
- Historical WC trend not provided — unverified.

WC three-scenario stress:
- Base: $22mm × 7 = $154mm cumulative
- Conservative ex-deferred: ~$28mm cumulative
- Stress use of cash: -$70mm cumulative

Growth capex disclosed — $30mm Y1, $15mm Y2, $8mm Y3. Migration-dependent step-down. If migration stalls — growth capex extends.

PF debt table — from paydown model:
$1.1bn 1L TL at SOFR + 450bps
$150mm 2L at SOFR + 800bps
$150mm RCF undrawn
No PIK, no hedging.

SOFR assumption check — Rule 18:
Current SOFR ~4.3% (May 2026)
1L: 4.3% + 4.5% = 8.8% → $1.1bn × 8.8% = $96.8mm
2L: 4.3% + 8.0% = 12.3% → $150mm × 12.3% = $18.5mm
Total at current SOFR: $115.3mm vs sponsor stated $85mm
Delta: $30.3mm annually — model SOFR assumption materially stale 🔴

Revised interest coverage at current SOFR:
Adjusted EBITDA: $200mm ÷ $115mm = 1.74x 🔴
Fully expensed EBITDA: $165mm ÷ $115mm = 1.43x — dangerously thin 🔴

NOL analysis:
$280mm NOLs, Section 382 reviewed, 4-year utilisation confirmed.
Tax normalises to 24% from year 5.
Year 5-7 additional cash taxes: ~$40mm annually — outer-year FCF materially lower.

Back-weighting confirmed:
Years 1-3: $53mm + $78mm + $105mm = $236mm = 27% of $869mm
Years 4-7: $130mm + $155mm + $168mm + $180mm = $633mm = 73% of $869mm
73% in years 4-7 — well above 60% threshold 🔴

Revised repayment at current SOFR:
$869mm - ($30mm × 7 years) = $659mm ÷ $1.4bn = 47% — FAILS 🔴
With NOL normalisation years 5-7: ~$539mm ÷ $1.4bn = 39% — FAILS badly 🔴

🚩 FLAG [INTEREST] 🔴
Model SOFR assumption stale. Corrected cash interest ~$115mm vs $85mm stated — $30mm annual gap. Interest coverage on fully expensed EBITDA 1.43x — dangerously thin. Year one FCF near breakeven on fully expensed basis at current rates.

🚩 FLAG [REPAYMENT] 🔴
50% repayment test FAILS at current SOFR. $659mm ÷ $1.4bn = 47%. Further deterioration with NOL normalisation years 5-7 → ~39%.

🚩 FLAG [REPAYMENT] 🔴
Back-weighting severe — 73% in years 4-7. Fires independently. NOL tax normalisation makes back-weighting worse.

🚩 FLAG [CAPEX] 🟡
Growth capex step-down migration-dependent. If cloud migration stalls — $30mm extends beyond year three. FCF in years 2-3 worse than modelled.

🚩 FLAG [WC] 🟡
Payables optimisation $7mm likely one-time. WC source from year two = deferred revenue only. Historical WC trend not provided — unverified.

📋 OPEN
4 unanswered — model SOFR assumption not confirmed; residual $14mm FCF gap unexplained; historical WC trend not provided; payables optimisation recurring or one-time unknown

✅ COVERED
WC breakdown — $15mm deferred revenue, $7mm payables optimisation ✓
Growth capex — $30mm Y1, $15mm Y2, $8mm Y3 ✓
Debt structure — $1.1bn 1L SOFR+450, $150mm 2L SOFR+800, $150mm RCF undrawn ✓
No PIK, no hedging ✓
NOL — $280mm, Section 382 reviewed, 4-year utilisation ✓
Tax normalisation — 24% from year five ✓
Year by year FCF schedule confirmed ✓
Back-weighting — 73% years 4-7 🔴

---

**QUESTION QUEUE — conversational language:**
1. "On the interest rate assumption in the model — at current SOFR the cash interest looks closer to $115mm versus $85mm in the model. Has the model been updated for the current rate environment or is there a hedging programme in place?"
2. "On the payables optimisation — is the $7mm a recurring annual benefit or more of a year one benefit as you consolidate vendors post-acquisition?"
3. "On the FCF waterfall — can we get a complete line by line build from EBITDA to levered FCF so we can make sure we're capturing every cash use?"
4. "On the historical WC — do we have the last eight quarters of NWC movement? We'd want to see whether WC has historically been a source or use before accepting the forecast assumption."

---

**RULES FIRED:** Rules 9 universal, 14, 18, 19. Back-weighting 73% fired independently 🔴. NOL normalisation outer years modelled.

**CORRECTIONS FROM ARYA — Exchange 5:**
- SOFR is read from the paydown model pre-call — not asked on the call as a question ✓
- The paydown model is the single working document — IB team inserts sponsor assumptions into Goldman paydown model used by IB, lev fin, and credit simultaneously ✓
- If model is in hand — surface rate delta as a finding not a question ✓
- Rules 18 and 19 updated accordingly ✓

**SCORECARD UPDATE:**
Business quality 3, Sector tailwind 3, EBITDA quality 1 🔴, Repayment 1 🔴, Leverage/coverage 1 🔴, Structural protections 1 🔴, Forecast credibility 2. Total 12/35 — well below 21 threshold. Four dimensions at 1 — each independently a deal-level concern.


---


### EXCHANGE 6 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 6

**Sponsor says:**
"On the interest rate — you're right, the model was built six months ago when SOFR was at 2.8%. We haven't updated it for the current rate environment. We can refresh that. On the payables optimisation — that is a year one benefit only, it does taper off from year two. On the FCF waterfall — the residual gap is a $14mm earn-out payment to the founders in year one only, related to a prior acquisition the company made. It's a one-time item. On the historical WC — we can get you eight quarters of NWC movement from the management accounts, we'll send that over. On the broader deal — look, we're committed to this transaction. We understand the leverage looks high at current rates but we believe in the management team and the cloud transition story. We're open to discussing the structure if that helps get you comfortable."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On being open to discussing the structure — what specifically are you thinking? Are you considering an equity top-up, a rate hedge, a tighter ECF sweep, or a combination?"

🔢 INTERNAL CALCULATION
SOFR gap confirmed — model at 2.8%, current 4.3%, delta 150bps.
Revised cash interest: $115.3mm vs $85mm stated — $30.3mm annual gap confirmed.

Revised FCF waterfall at corrected SOFR and NOL normalisation:
Y1: $23mm | Y2: $48mm | Y3: $75mm | Y4: $100mm | Y5: $85mm | Y6: $98mm | Y7: $110mm
Revised cumulative: $539mm ÷ $1.4bn = 38.5% — FAILS 🔴

Conservative WC (payables one-time confirmed): $497mm ÷ $1.4bn = 35.5% — FAILS 🔴

Fully expensed EBITDA year one FCF: NEGATIVE $12mm 🔴

Earn-out — $14mm year one only. One-time. Prior acquisition. Accepted as non-recurring. Explains residual gap.

Structural options modelled:
Option 1 — Equity top-up $200mm: debt → $1.2bn, coverage → 2.03x. Marginal improvement.
Option 2 — Rate hedge: eliminates SOFR risk, no immediate FCF benefit at current rates.
Option 3 — Tighter ECF sweep: 75% years 1-3. Year one additional paydown ~$17mm. Meaningful but not transformative.
Option 4 — Combination equity top-up plus tighter ECF sweep. Most lender-friendly.

Structural protections recommended from protections menu:
1. QoE commissioned before close — non-negotiable
2. Interest rate cap or swap
3. ECF sweep 75% years 1-3, step-downs tied to leverage milestones
4. Equity top-up $150-200mm

🚩 FLAG [STRUCTURE] 🔴
Revised cumulative FCF 38.5% at corrected rates. Conservative WC 35.5%. Year one fully expensed FCF negative. Deal as currently structured fails credit threshold on multiple dimensions simultaneously.

🚩 FLAG [STRUCTURE] 🟡
"Open to discussing structure" — positive signal but vague. Must be pressed for specific proposals.

📋 OPEN
3 unanswered — specific structural proposal not yet given; QoE commissioning timeline unknown; refreshed paydown model not yet received

✅ COVERED
SOFR gap confirmed — model at 2.8%, refresh committed ✓
Payables optimisation — year one only confirmed ✓
Earn-out — $14mm year one, one-time ✓
Historical WC — eight quarters coming ✓
Sponsor open to structural discussion ✓

---

**QUESTION QUEUE — conversational language:**
1. "On the structure — what specifically are you thinking? Equity top-up, rate hedge, tighter ECF sweep, or a combination?"
2. "On the QoE — given the adjustment ratio and complexity of add-backs, we'd want to see an independent QoE commissioned before close. Is that something you'd be willing to do?"
3. "On the refreshed model — when can we expect the updated paydown model at current SOFR?"
4. "Just to confirm open items — refreshed paydown model, eight quarters NWC data, and a specific structural proposal. Does that sound right?"

---

**RULES FIRED:** Rules 9, 14, 18, 19. Structural protections menu activated. Four protections recommended.

**SCORECARD:** Business 3, Sector 3, EBITDA 1 🔴, Repayment 1 🔴, Leverage 1 🔴, Structural 2, Forecast 2. Total 13/35 — below threshold, conditional on structural resolution.

**STATUS:** Paused at exchange 6. Post-call debrief to be completed next session.


### EXCHANGE 7

**Sponsor says:**
"We've spoken internally and we're prepared to do three things. First — we'll top up equity by $150mm, reducing total debt to $1.25bn. Second — we'll put in place an interest rate cap at 5% SOFR for the first three years. Third — we'll agree to a 75% ECF sweep in years one through three, stepping down to 50% at 5.5x net leverage and 25% at 4.5x. We think that addresses the main concerns. We're not prepared to commission a QoE — the management accounts have been reviewed thoroughly by our finance team and we're comfortable with the quality."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the QoE — given the adjustment ratio is above 100% and there's no independent verification, that's something we'd need to get comfortable with before IC. Can you help us understand what the objection is to commissioning one?"

🔢 INTERNAL CALCULATION
Equity top-up $150mm: revised debt $1.25bn. Revised financing leverage 6.25x adjusted, 7.6x fully expensed.

Rate cap at 5% SOFR years 1-3:
Current SOFR 4.3% — cap out of the money. No current FCF relief.
Only activates if SOFR rises above 5%. Future protection only.

ECF sweep 75% years 1-3:
Y1: $23mm × 75% = $17mm | Y2: $48mm × 75% = $36mm | Y3: $75mm × 75% = $56mm
Total additional paydown years 1-3: ~$109mm — improves early debt reduction materially.

Revised repayment:
$539mm ÷ $1.25bn = 43.1% — FAILS 50% standard 🔴
Conservative WC: $497mm ÷ $1.25bn = 39.8% — FAILS 🔴

QoE refusal — 110% adjustment ratio, no independent verification. Sponsor finance team reviewing own assumptions is not independent verification. Sponsors who are confident in add-backs commission QoEs. Refusal signals lack of confidence in adjustments surviving independent scrutiny.

🚩 FLAG [EBITDA] 🔴
QoE refused on 110% adjustment ratio. Hard gating condition before IC. Cannot accept add-backs at full value without third-party validation.

🚩 FLAG [REPAYMENT] 🔴
43.1% revised repayment — still fails 50% standard even with equity top-up.

🚩 FLAG [STRUCTURE] 🟡
Rate cap out of the money at current SOFR — no current relief. Future protection only.

📋 OPEN
2 unanswered — QoE refusal not resolved; repayment still below 50%

✅ COVERED
Equity top-up $150mm — debt $1.25bn ✓
Rate cap 5% SOFR years 1-3 ✓
ECF sweep 75% years 1-3, step-downs at 5.5x and 4.5x ✓
QoE refused — confirmed ✓

---

**QUESTION QUEUE:**
1. "On the QoE — given the adjustment ratio above 100% and no independent verification, that's something we'd need before IC. Can you help us understand the objection?"
2. "On repayment — even with the equity top-up we're still below our threshold. Is there anything else on the equity side you'd consider?"
3. "On the rate cap — just to confirm the cap is at 5% which at current rates is out of the money. Is the intention to also address the current rate environment in the refreshed model?"

---

**RULES FIRED:** Rules 10, 12, 14. Structural protections menu assessed.
**CORRECTIONS FROM ARYA:** Exchange 7 validated ✓


---


## TRANSCRIPT 2 — POST-CALL DEBRIEF

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UNDERWRITER.AI — CALL DEBRIEF
Software LBO — Lender Call — Sponsor and Management Present
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EBITDA QUALITY      Level 3-4 — adjustment ratio 110%, add-backs exceed reported EBITDA $95mm. No QoE — sponsor refused. Capitalised R&D $35mm not accepted. Credit case uses fully expensed EBITDA $165mm.

FINANCING LEVERAGE  7x at signing → 6.25x post equity top-up on $1.25bn revised debt.

CREDIT LEVERAGE     7.6x fully expensed on $1.25bn — structurally concerning for software.

50% REPAYMENT TEST  FAIL — $539mm ÷ $1.25bn = 43.1% at corrected SOFR. Conservative WC 39.8%. Both below Goldman standard.

BACK-WEIGHTING      FIRED — 73% in years 4-7. Fires independently. NOL normalisation worsens years 5-7.

INTEREST COVERAGE   STRUCTURALLY STRESSED — 1.74x adjusted EBITDA, 1.43x fully expensed. Year one FCF fully expensed: negative $12mm.

SYNDICATION RISK    🟡 — 4-6 month close, regulatory approval required.

TOP UNRESOLVED 🔴
1. QoE refused — hard gating condition before IC
2. 50% repayment fails — 43.1% corrected SOFR, 39.8% conservative WC
3. Back-weighting 73% years 4-7
4. Fully expensed leverage 7.6x, coverage 1.43x
5. Cloud migration execution thesis unproven

MONITORING ITEMS 🟡
1. Rate cap out of the money at current SOFR
2. APAC — no revenue, year three unquantified
3. New logo cohort expansion — management claim unverified
4. Growth capex step-down migration-dependent
5. Payables optimisation year one only — confirmed

FOLLOW-UP BEFORE IC
1. Refreshed paydown model at current SOFR 4.3% [Recipient: lev fin]
2. Eight quarters NWC movement [Recipient: lev fin]
3. QoE — push again in writing, flag to IC if refused [Recipient: sponsor]
4. Full EBITDA adjustment schedule with roll-off [Recipient: lev fin]
5. Cloud migration historical velocity data [Recipient: management]
6. New logo vintage analysis [Recipient: management]
7. APAC revenue quantum and assumptions [Recipient: management]
8. Section 382 annual limitation quantum [Recipient: sponsor counsel]
9. Structural proposal in writing [Recipient: sponsor]

EVASION LOG
2 instances — "very comfortable with quality of earnings" repeated twice without substance; QoE refusal functioning as deliberate withholding of transparency.

CREDIT CASE ADJUSTMENTS
- Use fully expensed EBITDA $165mm as credit case base
- Apply current SOFR 4.3% — cash interest $115mm
- Strip deferred revenue from WC — flat to modest use from year two
- Remove payables optimisation from year two onward
- Normalise tax rate to 24% from year five
- Apply 50% credit to cloud migration upsell — execution unproven
- Remove APAC from base case
- Revised credit case repayment: below 35% — well below Goldman standard

CREDIT SCORECARD — FINAL
Business quality 3 | Sector tailwind 3 | EBITDA quality 1 🔴 | Repayment 1 🔴 | Leverage/coverage 1 🔴 | Structural protections 2 | Forecast credibility 2
TOTAL: 13/35 — below 21 threshold. Does not proceed to IC as structured.

EQUITY-INFORMED CREDIT NOTE
Equity cushion ~37% post top-up — meaningful skin in the game. Sponsor playbook signals deleverage then dividend recap — lenders will not benefit from full deleveraging. QoE refusal is the most telling signal — sponsors confident in add-backs commission QoEs. Recommend QoE as contractual condition precedent to close before IC approval.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**TRANSCRIPT 2 — COMPLETE ✅**


---


## TRANSCRIPT 3 — SOFTWARE DIVIDEND RECAP / LEV FIN RELAY

**Transaction:** Dividend recapitalisation
**Sector:** Software / B2B SaaS
**Call type:** Lev fin relay
**Target rating:** B / B2
**Sponsor:** [Redacted PE Firm]
**Key context:** PE sponsor acquired this B2B SaaS business three years ago at entry. Business has performed well — leverage has delevered from 6x at entry to 3.8x today. Sponsor wants to extract capital via a dividend recap, adding approximately $400mm of incremental debt and returning it to LPs. Post-recap leverage moves back to approximately 5.5x.
**Deal parameters:** LTM adjusted EBITDA ~$180mm. Existing debt ~$685mm at 3.8x. New incremental debt ~$400mm. Post-recap total debt ~$1.085bn at 6.0x. NRR 112%. Revenue growing at 11%. Sponsor original equity contribution $350mm at entry.

**Operating mode: Lev fin relay — information coming second-hand. Collaborative language. Evasion detection active but less aggressive than lender call mode.**

**Rules being tested:** 1, 2, 3, 6, 8, 9, 10, 11, 12, 13, 14, 16, 17 — specifically the dividend recap sponsor equity question from Section 1C

**Primary issues:**
- Sponsor equity residual after recap
- Equity cushion falling toward 20% threshold
- De-leveraging story re-levering after recap
- Whether lender protection weakens post-recap


---


### EXCHANGE 1 — IN PROGRESS

*To be built next.*


### EXCHANGE 1

**Lev fin says:**
"Good morning — thanks for joining. So we're coming to you on a dividend recapitalisation for [Target]. The business has performed really well since the sponsor acquired it three years ago — delevered from 6x at entry to 3.8x today, NRR sitting at 112%, revenue growing at 11%. The sponsor wants to take some chips off the table. They're raising $400mm of incremental first lien term loan debt — bringing total debt to approximately $1.085bn and post-recap leverage to around 6x on LTM adjusted EBITDA of $180mm. Price talk on the incremental is SOFR plus 425 with OID of 98. The existing term loan is at SOFR plus 375 with an original OID of 99.5. Soft call protection of 101 for six months on the incremental. The dividend to LPs is approximately $400mm. We think this is a clean story — strong business, proven management, sponsor just monetising some of the value creation."

---

**AGENT OUTPUT — Lev fin relay mode:**

⚡ ASK NOW
"On the $400mm dividend to LPs — is that the face value of the incremental or the net proceeds after OID and fees? We'd want to understand the actual cash distributed."

🔢 INTERNAL CALCULATION

**OID and pricing analysis — Rule 20:**

Incremental facility: $400mm face at SOFR + 425, OID 98
Net cash proceeds: $400mm × 98% = $392mm
Less estimated transaction fees: ~$8mm (2% of face — standard for leveraged recap)
Net cash to sponsor: ~$384mm — not $400mm as stated

Existing term loan: SOFR + 375, original OID 99.5
All-in yield existing: 4.3% + 3.75% + (0.5% OID ÷ ~5yr remaining) = ~8.15%
All-in yield incremental: 4.3% + 4.25% + (2% OID ÷ 7yr) = ~8.84%
Differential: 8.84% - 8.15% = 69bps — above 50bps MFN threshold 🔴
MFN provision likely triggered — existing term loan spread may need to step up

OID signal assessment:
Incremental OID at 98 — market cautious. Not distressed but requires discount to clear.
Combined with SOFR + 425 on a 6x business — market pricing in recap risk.
This is not a ringing endorsement from the market on this structure.

**Flex assessment:**
Price talk is SOFR + 425 at 98 OID. Need to know if this is original price talk or already flexed.
If already flexed from SOFR + 375 — significant market pushback on the recap.
If original price talk — book still building, flex risk remains.

**Leverage assessment:**
Post-recap leverage: $1.085bn ÷ $180mm = 6.03x financing leverage
Business delevered from 6x to 3.8x over 3 years — genuine value creation
Sponsor now re-levering back to 6x — erasing 3 years of deleveraging in one transaction
De-leveraging story resets to zero 🔴

**Sponsor equity assessment — Section 1C dividend recap rules:**
Original sponsor equity contribution: need to calculate
Post-recap equity cushion: $1.085bn debt on what total EV?
At 6x EBITDA $180mm = $1.08bn EBITDA value
Typical software EV at 10-12x EBITDA = $1.8-2.16bn EV
Equity value = EV - debt = $1.8bn - $1.085bn = $715mm to $1.075bn
Equity cushion as % of total capitalisation: $715mm ÷ ($1.085bn + $715mm) = 40% at low end

Original equity contribution: need from lev fin — not provided
Has sponsor's effective cost basis gone negative? Need original equity contribution to calculate.
If sponsor put in $350mm and is now taking out $384mm net — cost basis has gone negative 🔴
Sponsor has already returned more than their original investment.
Lender alignment materially weakened.

**50% repayment test — preliminary:**
Need paydown model to calculate. Not yet received.
At 6x leverage on a software business — repayment will be heavily dependent on EBITDA growth.
Back-weighting risk elevated given re-levering event.

🚩 FLAG [STRUCTURE] 🔴
MFN likely triggered — incremental all-in yield 69bps above existing term loan, above 50bps threshold. Existing term loan may need to step up. Increases cash interest across entire debt stack. Must be verified against existing credit agreement.

🚩 FLAG [STRUCTURE] 🟡
OID at 98 on incremental — market cautious on recap structure. Not distressed but discount required to clear. Price talk needs to be verified — is this original or already flexed?

🚩 FLAG [SPONSOR] 🔴
Sponsor original equity contribution not given. If $350mm contributed at entry and $384mm net proceeds from recap — sponsor cost basis has gone negative. Original investment fully returned. Lender alignment materially weakened — sponsor has less incentive to support the business in a downside scenario.

🚩 FLAG [LEVERAGE] 🟡
Business delevered from 6x to 3.8x over three years — genuine value creation. Sponsor now re-levering back to 6x in one transaction. De-leveraging story resets. Lenders being asked to fund a return of capital not a business investment.

📋 OPEN
8 unanswered — net dividend vs face value unconfirmed; original sponsor equity contribution not given; sponsor cost basis unknown; MFN provision status unverified; flex status unknown — original or already flexed; paydown model not yet received; repayment capacity not calculable; equity cushion as % of total capitalisation not confirmed

✅ COVERED
Transaction type — dividend recap confirmed ✓
Post-recap leverage — 6.03x on $180mm EBITDA ✓
Incremental pricing — SOFR + 425, OID 98 ✓
Existing debt — SOFR + 375, original OID 99.5 ✓
Soft call — 101 for six months on incremental ✓
NRR — 112% ✓
Revenue growth — 11% ✓
Business delevered from 6x to 3.8x over three years ✓

---

**QUESTION QUEUE — conversational language:**

1. "On the $400mm dividend — is that the face value of the incremental or the net proceeds after OID and fees? We'd want to understand the actual cash being distributed to LPs."

2. "On the incremental pricing — is SOFR plus 425 at 98 the original price talk or has there been any flex already? Just want to understand where the book is."

3. "On the MFN — has anyone checked whether the incremental pricing triggers the MFN on the existing term loan? The all-in yield differential looks like it could be above the 50bps threshold."

4. "On the sponsor equity — what was the original equity contribution at entry and how much has the sponsor returned to LPs in total including this dividend? We'd want to understand the residual equity position."

5. "Can we get the paydown model? We'd want to run through the seven year levered FCF before we get too far into the diligence."

---

**RULES FIRED THIS EXCHANGE:**
- Rule 20 — OID and pricing analysis, MFN calculation, net proceeds vs face value ✓
- Rule 1 — LTM date not yet verified — queue
- Rule 2 — Credit leverage calculated internally ✓
- Section 1C dividend recap rules — sponsor equity residual questions queued ✓
- Rule 10 — Collaborative language throughout ✓
- Rule 13 — Push for paydown model immediately ✓

---

**CORRECTIONS FROM ARYA — Exchange 1:**
*To be completed after review*


---


### EXCHANGE 2 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 2

**Lev fin says:**
"Good catch on the net proceeds — you're right, the $400mm is the face value of the incremental. Net proceeds after OID and fees are approximately $384mm — so the actual dividend to LPs is $384mm not $400mm. On the flex — the SOFR plus 425 at 98 is original price talk, book is still building, no flex yet. On the MFN — good question, we checked and the existing credit agreement has a 50bps MFN. The all-in yield differential is approximately 55bps so the MFN is technically triggered. We're working with legal to see whether we can get a waiver from the existing lenders or whether we need to step up the existing term loan by approximately 5bps. On the sponsor equity — original equity contribution at entry was $350mm three years ago. Post-dividend the sponsor will have received $384mm in total distributions including this recap — so yes, the cost basis has gone negative. Residual equity value at current enterprise value is approximately $750mm. On the paydown model — we'll send it over today."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the MFN — what's the timeline on getting that resolved and is there a risk existing lenders push back? If the step-up goes through, what does that do to total cash interest across the stack?"

🔢 INTERNAL CALCULATION
Net proceeds confirmed — $384mm ✓. OID cost $8mm + fees $8mm = $16mm friction cost.
Flex status — original price talk, no flex yet. Upward flex risk remains while book building.

MFN triggered — 55bps differential confirmed above 50bps threshold 🔴
Path 1 — waiver from existing lenders. May require compensation.
Path 2 — 5bps step-up on existing TL. $685mm × 5bps = $342,500 annually — immaterial but precedent-setting.

Sponsor cost basis:
Original equity $350mm. Total distributed $384mm (this dividend).
Cost basis: -$34mm — negative confirmed 🔴
Need to confirm prior distributions — total capital returned may exceed $384mm.

Residual equity $750mm on $1.835bn total capitalisation = 40.9% equity cushion — above 20-25% threshold ✓
However cost basis negative — $750mm is pure sponsor upside, zero downside. Lenders bear full economic risk.

De-leveraging arithmetic at 11% EBITDA growth, no debt paydown:
Y1: $199.8mm → 5.43x | Y2: $221.8mm → 4.89x | Y3: $246.2mm → 4.41x
Arithmetically credible IF 11% holds. But Rule 17 — at 4-4.5x sponsor likely to recap again.

📡 CAPITAL MARKETS FLAG
Book still building. Flex risk active. OID 98 — market cautious. Surface to syndication desk.

🚩 FLAG [SPONSOR] 🔴
Cost basis negative $34mm minimum. Prior distributions unknown — may be higher. Lender alignment materially weakened.

🚩 FLAG [STRUCTURE] 🟡
MFN triggered — resolution path unclear. Execution risk before close.

🚩 FLAG [STRUCTURE] 🟡
Flex risk active — book still building at original price talk.

🚩 FLAG [SPONSOR] 🟡
Rule 17 — deleverage to 3.8x then immediate re-lever to 6x. Pattern consistent with recap playbook. High probability of another recap at 4-4.5x.

📋 OPEN
6 unanswered — MFN resolution timeline; prior distributions unknown; flex risk unresolved; paydown model not received; ECF sweep terms unknown; LTM date not verified

✅ COVERED
Net proceeds $384mm ✓ | Flex — original price talk ✓ | MFN triggered 55bps ✓ | Sponsor equity $350mm entry ✓ | Cost basis negative ✓ | Residual equity $750mm ✓ | Paydown model arriving today ✓

---

**QUESTION QUEUE:**
1. "On the MFN — what's the timeline on resolution and is there a risk existing lenders push back on the waiver?"
2. "On the sponsor equity — are there any prior distributions or management fees during the hold beyond this dividend?"
3. "On the book — are you seeing strong CLO and credit fund interest or is it still early stage?"
4. "On the ECF sweep — what are the sweep terms on both the existing TL and the incremental?"
5. "When the model comes through — can you flag if the SOFR assumption has been updated to current rates?"

---

**RULES FIRED:** Rules 10, 13, 20, 21. Section 1C dividend recap rules. Rule 17 playbook flag.
**CORRECTIONS FROM ARYA:** Exchange 2 validated ✓


---


### EXCHANGE 3

**Lev fin says:**
"On the MFN — existing lenders agreed waiver with 10bps step-up. Existing debt moves from SOFR plus 375 to SOFR plus 385. On prior distributions — sponsor received $50mm management fee acceleration eighteen months ago. Total capital returned: $384mm plus $50mm = $434mm against $350mm invested. Cost basis negative by $84mm. On the book — CLO demand strong, 1.5x covered at current price talk. No flex expected. On the ECF sweep — existing TL 50% sweep stepping to 25% at 4.5x and 0% at 4.0x. Incremental same mechanics. Paydown model sending in the next hour."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On total capital returned — $434mm against $350mm invested, cost basis negative $84mm. Just to make sure we have the full picture — are there any other distributions, monitoring fees, or transaction charges during the hold beyond the management fee acceleration and this dividend?"

🔢 INTERNAL CALCULATION
MFN resolved — 10bps step-up agreed ✓
Revised cash interest:
Existing TL: $685mm × 8.15% = $55.8mm
Incremental: $400mm × 8.55% = $34.2mm
Total: ~$90mm annually ✓

Book 1.5x covered — strong demand, no flex expected.
📡 Capital markets flag RESOLVED — surface to syndication desk as resolved ✓

Sponsor cost basis update:
Original equity: $350mm
Management fee acceleration: $50mm
This dividend: $384mm
Total returned: $434mm → cost basis -$84mm 🔴
If monitoring fees $3-5mm/year × 3 years = additional $9-15mm → total could reach $443-449mm

ECF sweep confirmed — 50%/25%/0% both tranches.
Sweep steps to 0% at 4.0x — at 11% EBITDA growth reached year 4-5.
Meaningful sweep years 1-3 only. De-leveraging from year 4 = EBITDA growth only.

Paydown model review checklist prepared — Rule 19:
Revenue → EBITDA → cash interest ($90mm verify) → cash taxes → capex split → WC (deferred revenue strip) → ECF sweep → FCF years 1-7 → cumulative repayment → back-weighting

🚩 FLAG [SPONSOR] 🔴
Total capital returned $434mm vs $350mm invested — cost basis -$84mm. Additional fees may push higher. Sponsor has zero effective downside. Lenders bear full economic risk. Escalation per Rule 21 — VP / ILA depending on deal tier.

📡 CAPITAL MARKETS FLAG RESOLVED
Book 1.5x covered, no flex. Resolved — no further action.

🚩 FLAG [STRUCTURE] 🟡
ECF sweep to 0% at 4.0x — meaningful sweep years 1-3 only. Rule 17 — at 4.0-4.5x another recap highly probable.

📋 OPEN
3 unanswered — additional fees beyond $434mm unknown; paydown model not yet received; repayment capacity not calculable

✅ COVERED
MFN resolved — 10bps step-up, execution risk cleared ✓
Cash interest ~$90mm confirmed ✓
Book 1.5x covered, no flex ✓
Total capital returned $434mm ✓
Cost basis -$84mm ✓
ECF sweep 50%/25%/0% both tranches ✓
Paydown model arriving in one hour ✓

---

**QUESTION QUEUE:**
1. "On total capital returned — any other distributions, monitoring fees, or transaction charges during the hold beyond what we've discussed?"
2. "On the ECF sweep stepping to 0% at 4.0x — at 11% EBITDA growth that's roughly year four to five. What's the de-leveraging story from that point — purely EBITDA growth?"
3. "When the model arrives — can you flag if SOFR is at current rates and confirm WC is broken out by line item including deferred revenue separately?"

---

**RULES FIRED:** Rules 9, 10, 13, 17, 19, 20, 21. Section 1C dividend recap rules.
**CORRECTIONS FROM ARYA:** Exchange 3 validated ✓


---


### EXCHANGE 4 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 4

**Lev fin says:**
"Model is in your inbox. Let me walk you through the key assumptions. Revenue growing at 11% throughout — management comfortable given NRR at 112% and new logo pipeline. EBITDA margins stable at approximately 42% — no meaningful expansion, mature business. Cash interest at $88mm — updated SOFR to 4.1%. Cash taxes at 18% effective rate — no NOL. Maintenance capex $12mm per year, no growth capex. Working capital modelled as a source of $18mm annually — billing cycle driven. No other cash uses. Mandatory amortisation 1% per year on both tranches. Year one levered FCF $52mm growing to $148mm by year seven. Cumulative seven year FCF $700mm."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the working capital — $18mm annual source on a business growing at 11%. Can we get the full WC breakdown by line item — we'd want to understand how much of that is deferred revenue versus genuine operational improvement."

🔢 INTERNAL CALCULATION
SOFR delta: model 4.1% vs current 4.3% = 20bps. $1.085bn × 20bps = $2.17mm. Below 100bps threshold — monitoring only ✓
Revenue 11% vs NRR 112% → NRR supports ~12% growth. Model conservative relative to NRR ✓
Margins stable 42% — no margin expansion, clean ✓

WC pressure test — Rule 9 universal:
NRR 112% → ARR growing ~12% → deferred revenue growing ~12%
At $150mm deferred revenue base: 12% growth = $18mm annual increase
Entire $18mm WC source potentially deferred revenue growth alone
Ex-deferred WC = zero or negative

Three scenarios:
Base: $18mm × 7 = $126mm cumulative
Conservative ex-deferred: $0mm cumulative
Stress use: -$12mm × 7 = -$84mm cumulative

Repayment three scenarios:
Base: $700mm ÷ $1.085bn = 64.5% — PASSES ✓
Conservative: $574mm ÷ $1.085bn = 52.9% — marginal pass ✓
Stress: $490mm ÷ $1.085bn = 45.2% — FAILS 🔴

Paydown waterfall reconciliation — Rule 19:
$180mm - $88mm - $32.4mm - $12mm + $18mm - $10.85mm = $54.75mm
Sponsor stated: $52mm. Gap $2.75mm — immaterial, rounding ✓ Waterfall reconciles cleanly.

Capex concern: maintenance only $12mm on growing business with 112% NRR. No growth capex aggressive — information gap.

🚩 FLAG [CASH FLOW] 🟡
WC $18mm may be entirely deferred revenue growth. Ex-deferred WC flat to zero. Stress repayment 45.2% — fails 50% test. WC breakdown required before credit case finalised.

🚩 FLAG [CAPEX] 🔵
Maintenance-only capex on growing software business — information gap. Growth capex may be understated.

📋 OPEN
3 unanswered — WC breakdown not received; full year by year FCF schedule not given; additional sponsor fees still open

✅ COVERED
SOFR 4.1% — 20bps delta, monitoring only ✓ | Revenue 11%, margins 42% stable ✓ | Cash interest $88mm ✓ | Capex $12mm maintenance ✓ | Cash taxes 18%, no NOL ✓ | Mandatory amort 1% ✓ | Y1 FCF $52mm, Y7 $148mm ✓ | Cumulative $700mm, 64.5% repayment base ✓ | Waterfall reconciles ✓

---

**QUESTION QUEUE:**
1. "On the working capital — can we get the full breakdown by line item? We'd want to understand how much is deferred revenue versus genuine operational improvement."
2. "On capex — maintenance only on a business growing at 11% with NRR 112%. Is there no growth or product investment capex required to sustain that?"
3. "Can we get the full year by year FCF schedule — years one through seven?"
4. "On additional sponsor fees during the hold — monitoring fees, board fees, transaction charges — do we have a complete total?"

---

**RULES FIRED:** Rules 9, 14, 18, 19, 10.
**CORRECTIONS FROM ARYA:** Exchange 4 validated ✓


---


### EXCHANGE 5 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 5 — REALISTIC LIMITED INFORMATION VERSION

**Lev fin says:**
"On the WC — look, the $18mm is driven by the billing model, customers pay annually upfront, that's just how the business works. On capex — management has run this platform for eleven years, they know what it needs, $12mm is sufficient. On the year by year FCF — we can get you that in the follow-up. On the additional fees — I'd have to check with the sponsor on that, not something I have in front of me."

---

**AGENT OUTPUT — Mode 2 Limited Information:**

⚡ ASK NOW
"On the WC — just to make sure we model this correctly, can you give us the split between deferred revenue and operational working capital? We want to strip those out separately in our analysis."

NOTE: This question only valid if historical financials NOT yet received. If financials received pre-call — agent reads balance sheet independently and presents finding internally. Never asks lev fin if financials already in hand.

🔢 INTERNAL CALCULATION — MODE 2
WC: "billing model" deflection — confirms deferred revenue present, no breakdown given.
Rule 22: assume worst case — entire $18mm deferred revenue. WC flat in credit case.

Shadow credit case range:
Best case: $700mm ÷ $1.085bn = 64.5% — passes ✓
Conservative (WC flat): $574mm ÷ $1.085bn = 52.9% — marginal pass ✓
Stress (WC use): $490mm ÷ $1.085bn = 45.2% — FAILS 🔴

Capex: "management knows what it needs" — confidence assertion not evidence. Open item.
FCF schedule: deflected to follow-up. Log with deadline — before next call.
Additional fees: checking with sponsor. Conservative assumption $12mm applied.

⚠️ EVASION BORDERLINE — confidence assertions on WC and capex. Monitor next exchange.

🚩 FLAG [CASH FLOW] 🟡
WC deflected. Conservative case repayment range 45-65%. Lower end fails.

📋 OPEN — Mode 2
WC breakdown not provided | FCF schedule pending follow-up | Additional fees pending sponsor | Capitalised software unknown | Back-weighting incalculable

✅ COVERED
WC mechanism — annual upfront billing confirmed (deferred revenue inferred) | Capex $12mm management assertion | FCF schedule — lev fin to provide before next call | Additional fees — lev fin checking with sponsor

---

**QUESTION QUEUE:**
1. "On the WC — can you give us the split between deferred revenue and operational WC?" (only if financials not received)
2. "On capex — what does the capitalised software balance look like on the balance sheet?"
3. "On the year by year FCF — when can we get that? We need it before the next call for back-weighting."
4. "On sponsor fees — when you speak to the sponsor can you get a complete picture of all fees and distributions during the hold?"

---

**RULES FIRED:** Rules 8, 9, 13, 14, 22. Mode 2 activated.
**KEY LEARNING:** Agent builds repayment range not single number in limited information mode. Presents range to IC.
**CORRECTIONS FROM ARYA:**
- WC breakdown comes from historical financials balance sheet — not asked on call if financials received pre-call ✓
- If financials not yet received — ask for the financials, not the specific WC split ✓
- Rules 8 and 22 updated accordingly ✓


---


### EXCHANGE 6

**Lev fin says:**
"On the WC — look I hear you but this is a clean business, the working capital story is straightforward, management has explained it clearly in the lender presentation. On the capex — I'll get you the capitalised software balance from the balance sheet, that's in the financials we're sending over. On the year by year FCF — sending that now, give me two minutes. On the sponsor fees — spoke to the sponsor, total fees during the hold including monitoring, transaction, and board fees were $11mm over three years. Total capital returned $434mm plus $11mm — $445mm."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the WC in the lender presentation — we've had a look and the breakdown by line item isn't there. Can we get the historical financials — specifically the balance sheet with deferred revenue shown separately — so we can run the NWC analysis ourselves?"

🔢 INTERNAL CALCULATION
WC — "it's in the lender presentation" deflection:
Rule 8 applied — agent checks lender presentation. WC breakdown not there.
Lev fin deflecting to document that doesn't contain the answer.
Third deflection on WC across three exchanges — evasion pattern confirmed.

Document receipt updating:
Paydown model — received ✓
Year by year FCF — incoming now
Historical financials — incoming (confirmed by lev fin)
Lender presentation — received, WC breakdown NOT in it

Sponsor fees confirmed: $11mm total
Total capital returned: $445mm → cost basis -$95mm 🔴 ✓

⚠️ EVASION DETECTED
WC breakdown deflected three times:
Exchange 3: "billing cycle driven"
Exchange 5: "billing model, annual upfront billing"
Exchange 6: "it's in the lender presentation" — not true
Original Q: split between deferred revenue and operational WC
Push back: "We've had a look at the lender presentation and the WC breakdown isn't there. Can we get the historical financials with the balance sheet showing deferred revenue separately?"

🚩 FLAG [CASH FLOW] 🟡
Three WC deflections — evasion pattern confirmed. Credit case maintains WC flat until financials received and reviewed independently.

📋 OPEN
3 unanswered — WC breakdown pending financials; back-weighting pending FCF schedule (incoming); capitalised software balance pending financials (incoming)

✅ COVERED
Sponsor fees $11mm confirmed ✓ | Total capital returned $445mm ✓ | Cost basis -$95mm ✓ | FCF schedule incoming ✓ | Financials incoming ✓

---

**QUESTION QUEUE:**
1. "On the WC — we've looked at the lender presentation and the line item breakdown isn't there. Can we get the historical financials with the balance sheet showing deferred revenue separately?"
2. "On the FCF schedule — once we have it we'll run the back-weighting analysis and come back with questions on the outer year assumptions."
3. "On the PF cap table — do we have the latest post-recap version? Want to confirm equity cushion and tranche ranking."

---

**RULES FIRED:** Rules 5, 8, 10, 21, 22. Evasion alert fired — three WC deflections.
**KEY LEARNING:** Agent checks lender presentation before accepting "it's in the materials" deflection. Catches that WC breakdown is not there. Evasion pattern fires.
**CORRECTIONS FROM ARYA:** Exchange 6 validated ✓


---


### EXCHANGE 7 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 7

**Lev fin says:**
"FCF schedule is in your inbox now. Year one $52mm, year two $67mm, year three $83mm, year four $99mm, year five $116mm, year six $132mm, year seven $148mm. Financials also sent — balance sheet is on tab three. We're coming up on time, any final questions before we wrap?"

---

**AGENT OUTPUT:**

⚡ ASK NOW
"Just before we wrap — on PF ratings, do we have a sense of where Moody's and S&P are landing on the post-recap structure and are those formal or still indicative?"

🔢 INTERNAL CALCULATION
FCF schedule received — back-weighting — Rule 14:
Y1: $52mm | Y2: $67mm | Y3: $83mm | Y4: $99mm | Y5: $116mm | Y6: $132mm | Y7: $148mm
Total: $697mm ≈ $700mm ✓
Years 1-3: $202mm = 29% | Years 4-7: $495mm = 71% — FIRES 🔴

Financials received — NWC analysis — Rules 8 and 9:
Balance sheet tab three — extract deferred revenue balance and year on year change
If deferred revenue growth = $16mm → confirms $16mm of $18mm WC source is deferred revenue
Ex-deferred operational WC = $2mm — flat
Credit case WC: $2mm annual source

Conservative repayment updated:
Cumulative FCF $700mm - $126mm WC base + $14mm ex-deferred = $588mm
$588mm ÷ $1.085bn = 54.2% — passes ✓ but marginal

Capitalised software — balance sheet priority review:
Extract intangible asset additions per year
If annual additions > $12mm — EBITDA overstated, true development spend understated
Post-call priority item

Sponsor playbook interaction with back-weighting:
71% years 4-7. ECF sweep to 0% at 4.0x — year 4.
Rule 17 — sponsor likely to recap at year 4. Years 4-7 FCF may never accrue to debt repayment.
Rule 23 triggered — back-weighting 71% + cost basis -$95mm = covenant and structural protection questions required.

🚩 FLAG [REPAYMENT] 🔴
Back-weighting 71% years 4-7. Fires independently. Compounded by Rule 17 — sponsor likely to recap at year 4. Lenders may never see years 4-7 repayment.

🚩 FLAG [REPAYMENT] 🟡
Conservative repayment 54.2% — marginal pass. No room for error.

📋 OPEN
2 unanswered — PF ratings not given; capitalised software additions to extract post-call

✅ COVERED
FCF schedule confirmed ✓ | Back-weighting 71% years 4-7 🔴 | Waterfall reconciles ✓ | Financials received ✓ | WC ex-deferred $2mm confirmed ✓ | Conservative repayment 54.2% ✓

---

**QUESTION QUEUE:**
1. "On PF ratings — do we have a sense of where Moody's and S&P are landing and are those formal or still indicative?"
2. "On the financials — we've got them, thank you. We'll run the balance sheet analysis on our side and come back if we have questions."
3. "Just to confirm — we'll follow up on PF ratings and any balance sheet questions after review. Does that sound right?"

---

**RULES FIRED:** Rules 8, 9, 10, 14, 17, 19, 23.
**CORRECTIONS FROM ARYA:** Exchange 7 validated ✓


---


## TRANSCRIPT 3 — POST-CALL DEBRIEF

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UNDERWRITER.AI — CALL DEBRIEF
Software Dividend Recap — Lev Fin Relay
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EBITDA QUALITY      Level 2 — stable margins 42%, no expansion. Clean add-back profile. Capitalised software balance pending — may affect quality level.

FINANCING LEVERAGE  6.03x post-recap on $1.085bn debt and $180mm LTM EBITDA.

CREDIT LEVERAGE     To be calculated once capitalised software balance reviewed. If material capitalised additions — EBITDA overstated and credit leverage higher than 6x.

50% REPAYMENT TEST  CONDITIONAL PASS
Base case: $700mm ÷ $1.085bn = 64.5% — passes ✓
Conservative (ex-deferred WC $2mm): $588mm ÷ $1.085bn = 54.2% — marginal pass ✓
Stress (WC use): $490mm ÷ $1.085bn = 45.2% — FAILS 🔴
Range presented to IC: 45-65% depending on WC scenario.

BACK-WEIGHTING      FIRED 🔴 — years 4-7 account for 71% of total cumulative FCF. Above 60% threshold. Fires independently.

SPONSOR ALIGNMENT   🔴 MATERIALLY WEAKENED
Original equity $350mm. Total capital returned $445mm. Cost basis -$95mm.
Residual equity $750mm — pure upside, zero sponsor downside.
ECF sweep to 0% at 4.0x in year 4. Rule 17 — second recap highly probable.
Lenders underwriting years 4-7 FCF that may never materialise for debt repayment.

OID AND PRICING     📡 RESOLVED
Book 1.5x covered, no flex. OID 98 cleared with strong CLO demand. MFN resolved — 10bps step-up agreed.

TOP UNRESOLVED 🔴
1. Back-weighting 71% — compounded by sponsor recap probability at year 4
2. Sponsor cost basis -$95mm — zero effective downside, lender alignment broken
3. Stress repayment 45.2% — fails 50% if WC reverts to use of cash
4. Rule 23 triggered — covenant and structural protection questions unanswered

MONITORING ITEMS 🟡
1. Conservative repayment 54.2% — marginal, no room for error
2. Capitalised software balance — pending balance sheet review
3. PF ratings — not yet given
4. Maintenance-only capex $12mm — platform stability assertion unverified
5. WC evasion pattern — three deflections, resolved via financials

FOLLOW-UP BEFORE IC
1. Covenant package — tightest leverage covenant, current headroom, EBITDA deterioration capacity. [Recipient: lev fin / legal]
2. Incremental basket — conditions for additional debt incurrence, leverage-based test. [Recipient: lev fin / legal]
3. Restricted payments basket — distribution limits until leverage threshold. [Recipient: lev fin / legal]
4. Transfer restrictions — assignment rights, borrower consent, disqualified institution list, minimum hold. [Recipient: lev fin / legal]
5. Open market purchases — conditions under which borrower can repurchase own debt. [Recipient: lev fin / legal]
6. PF ratings — Moody's and S&P, formal or indicative. [Recipient: lev fin]
7. Capitalised software additions — annual additions from balance sheet. [Recipient: internal — balance sheet review]
8. WC confirmed from financials — deferred revenue $16mm, operational $2mm. [Recipient: internal — closed]

EVASION LOG
1 evasion detected — WC breakdown deflected three times across three exchanges. Lev fin referenced lender presentation as containing WC breakdown — agent verified it did not. Evasion alert fired exchange 6.

CREDIT CASE ADJUSTMENTS
- WC: model as $2mm annual source (ex-deferred revenue confirmed from balance sheet)
- Cash interest: $90mm at current SOFR — verified against debt table
- Conservative repayment: 54.2% — marginal pass, present range to IC
- Stress repayment: 45.2% — fails, present alongside base case
- Capitalised software: adjust EBITDA once balance sheet additions reviewed
- Back-weighting: years 4-7 = 71% — flag as structural concern with recap probability overlay

CREDIT SCORECARD — FINAL
Business quality 4 | Sector tailwind 3 | EBITDA quality 3 | Repayment 2 | Leverage/coverage 2 | Structural protections 2 | Forecast credibility 3
TOTAL: 19/35 — below 21 threshold. Conditional — covenant and structural protection package must be reviewed before IC. Back-weighting and sponsor alignment are the primary concerns.

EQUITY-INFORMED CREDIT NOTE
Equity cushion 40.9% of total capitalisation — adequate at close but sponsor cost basis -$95mm means residual equity is pure upside not protection. ECF sweep steps to 0% at 4.0x — year 4 — at which point sponsor has full discretion to recap again with zero cost basis. Recommend restricted payments basket gating distributions until leverage below 4.5x as condition before IC. Without this protection lenders are underwriting a perpetual re-levering machine not a deleveraging story.

ESCALATION FLAGS
📡 Capital markets: MFN resolved, book covered, no flex — no further action
Tier [per deal configuration] — VP / ILA per standard escalation
To VP: capitalised software review, PF ratings follow-up
To ILA / MD: back-weighting 71% + sponsor cost basis negative — sponsor alignment concern requires senior sign-off before IC
Rule 23 items: covenant and structural protection package — legal review required, all five items to IC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**TRANSCRIPT 3 — COMPLETE ✅**


### TRANSCRIPT 4 — SOFTWARE ADD-ON ACQUISITION / DIRECT SPONSOR CALL

**Transaction:** Add-on acquisition — PE-backed platform acquiring smaller software target
**Sector:** Software / B2B SaaS
**Call type:** Direct sponsor call — most aggressive mode, evasion detection fully active
**Target rating:** B / B2
**Key context:** PE sponsor acquired platform two years ago at 7x. Delevered to 5.8x. Now acquiring bolt-on target at 12x revenue. Different tech stacks, geographies, customer profiles. High integration risk.
**Deal parameters:** Platform EBITDA $150mm. Target EBITDA $20mm. Synergies $15mm ($10mm cost, $5mm revenue). PF combined EBITDA $185mm. PF debt $1.335bn. Financing leverage 7.2x. Zero synergy leverage 7.85x. Platform NRR 108%. Target NRR 118%. Target revenue growth 22%.

**Operating mode: Direct sponsor — most aggressive. Evasion detection fully active. Sponsor in room — no deflection to "I'll check with the sponsor."**

**Rules being tested:** 2, 3, 5, 6, 7, 10, 12, 14, 16, 17, 19, 22, 23


---


### EXCHANGE 1

**Sponsor says:**
"Thank you all for joining. We're excited to share this add-on opportunity. We acquired [Platform] two years ago and the business has performed extremely well — delevered from 7x to 5.8x, NRR stable at 108%, revenue growing at 9%. We're now adding [Target] — a high-growth SaaS business with $80mm of revenue growing at 22% annually and $20mm of EBITDA. The combination creates a highly complementary platform with significant cross-sell opportunities and meaningful cost synergies. We're acquiring [Target] at 12x revenue — $960mm — funded with $240mm of incremental debt and the rest from platform cash and equity. PF combined leverage is 7.2x on $185mm of combined EBITDA including $15mm of synergies. We've done this type of integration before and we're very confident in the execution."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the combined EBITDA of $185mm — that includes $15mm of synergies. What does PF leverage look like if we give zero synergy credit and use standalone EBITDA only?"

🔢 INTERNAL CALCULATION
Financing leverage: $1.335bn ÷ $185mm = 7.2x — sponsor number ✓
Credit leverage (50% synergy): $1.335bn ÷ $177.5mm = 7.52x
Zero synergy leverage: $1.335bn ÷ $170mm = 7.85x 🔴
Floor leverage (platform only): $1.335bn ÷ $150mm = 8.9x

Synergies = 75% of target standalone EBITDA — maximum scrutiny required.
"Highly complementary" and "very confident in execution" — boilerplate. Rule 17 fires.
Target NRR unknown — critical gap for software credit assessment.
Entry multiple: $960mm ÷ $20mm = 48x EBITDA — requires specific justification.

Blended arithmetic — Rule 16:
Platform revenue implied ~$428mm. Target $80mm. Combined $508mm.
Revenue-weighted growth: (84% × 9%) + (16% × 22%) = 11.1% combined

🚩 FLAG [LEVERAGE] 🔴 — zero synergy leverage 7.85x
🚩 FLAG [EBITDA] 🔴 — $15mm synergies = 75% of target EBITDA, maximum scrutiny
🚩 FLAG [REVENUE] 🔴 — target NRR unknown, 22% growth unverifiable
🚩 FLAG [STRUCTURE] 🟡 — entry multiple 48x EBITDA requires justification

📋 OPEN — 8 items
✅ COVERED — transaction type, platform performance, target metrics, acquisition price, incremental debt, financing leverage

---

**QUESTION QUEUE:**
1. "On the combined EBITDA — what does leverage look like on standalone combined EBITDA without synergy credit?"
2. "On the target — what is NRR and how has it trended over the last four quarters?"
3. "On the $15mm of synergies — what's the split between cost and revenue, costs-to-achieve, and timeline?"
4. "On prior integrations — which specific acquisition are you referencing and what were synergies projected versus delivered?"
5. "On the entry multiple — 12x revenue implies 48x EBITDA. Can you walk us through the strategic rationale?"

---

**RULES FIRED:** Rules 2, 3, 5, 6, 7, 16, 17.
**CORRECTIONS FROM ARYA:** Exchange 1 validated ✓


---


### EXCHANGE 2

**Sponsor says:**
"On leverage without synergies — standalone combined EBITDA is $170mm, so leverage is approximately 7.85x. We're comfortable with that because the synergies are highly visible and largely cost-driven. On target NRR — it's 118%, growing from 112% eighteen months ago. Strong expansion revenue. On the $15mm synergies — approximately $10mm cost synergies from consolidating engineering teams and rationalising vendor contracts. $5mm revenue synergies from cross-selling target's product into platform's existing customer base. Costs-to-achieve approximately $8mm in year one — severance and integration costs. On prior integrations — Company X eighteen months ago. Projected $12mm synergies, delivered $10mm within 24 months. On the entry multiple — 12x revenue reflects the target's growth trajectory. At 22% growth and 118% NRR this is a high quality asset that commands a premium."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the $5mm of revenue synergies — cross-selling target's product into platform's customer base. What percentage of platform customers have already been approached and what's the early conversion data showing?"

🔢 INTERNAL CALCULATION
Zero synergy leverage confirmed: 7.85x 🔴
Credit leverage 50% synergy: 7.52x
Prior track record: Company X — 83% realisation ($10mm of $12mm delivered)
Apply 83% to current: $15mm × 83% = $12.5mm expected
Credit leverage at 83% realisation: $1.335bn ÷ $182.5mm = 7.32x — still above 7x

Target NRR 118% — strong ✓. Supports ~18% organic growth. 22% growth implies 4% new logo gap — manageable.
Entry multiple partially justified by 118% NRR and 22% growth — downgrade from 🔴 to 🟡.

Revenue synergies $5mm — cross-sell claim without pipeline evidence. Highest scrutiny.
Credit case: apply zero credit to revenue synergies.
Credit EBITDA: $170mm + $10mm cost × 83% = $178.3mm
Credit leverage: $1.335bn ÷ $178.3mm = 7.49x

Cost synergies $10mm — engineering consolidation and vendor rationalisation.
Named and specific ✓. Roll-off schedule for $8mm costs-to-achieve needed.

Blended arithmetic — Rule 16:
Platform 108% NRR → 8% organic | Target 118% NRR → 18% organic
Revenue-weighted: (84% × 8%) + (16% × 18%) = 9.6% combined organic ✓

Tech stack integration — not yet discussed. High risk item. Queue.

🚩 FLAG [LEVERAGE] 🔴 — zero synergy 7.85x, credit leverage 7.49x
🚩 FLAG [EBITDA] 🟡 — revenue synergies $5mm, no pipeline evidence
🚩 FLAG [INTEGRATION] 🟡 — tech stack integration roadmap unknown

📋 OPEN — 6 items
✅ COVERED — zero synergy leverage 7.85x ✓ | Target NRR 118% ✓ | Synergy split confirmed ✓ | Costs-to-achieve $8mm Y1 ✓ | Prior track record 83% ✓ | Entry multiple partially justified ✓

---

**QUESTION QUEUE:**
1. "On revenue synergies — have you approached any platform customers yet and what's the early conversion data?"
2. "On the tech stack — different platforms. What's the integration roadmap and timeline to unified stack?"
3. "On target's 25% EBITDA margin at 22% growth — most SaaS at that rate run much thinner margins. Is target underinvesting in growth or is there a structural reason the margin is sustainable?"
4. "On the paydown model — can we get the combined entity FCF build with synergy realisation timeline flowing through to levered FCF year by year?"

---

**RULES FIRED:** Rules 2, 3, 7, 10, 16, 17.
**CORRECTIONS FROM ARYA:** Exchange 2 validated ✓


---


### EXCHANGE 3 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 3

**Sponsor says:**
"On revenue synergies — we've had preliminary conversations with approximately 30 platform customers representing about $45mm of ARR. Of those, 8 have expressed strong interest in the target's product — that's a 27% conversion signal which we think is very encouraging. We haven't booked any revenue yet but the pipeline is real. On the tech stack — the target runs on a different infrastructure stack. Our plan is to maintain both stacks for the first 18 months while we migrate target customers to the platform's stack. Full migration target is 36 months. On the target's margin — the 25% EBITDA margin is real. The target has a very efficient product-led growth motion — low S&M spend relative to revenue because the product sells itself through usage expansion. CAC is low, LTV is high. On the paydown model — we can send that over after the call."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the 8 customers expressing strong interest out of 30 approached — what does strong interest mean specifically? Have any signed LOIs, expanded contracts, or committed to a pilot?"

🔢 INTERNAL CALCULATION
Revenue synergy pipeline — assessed:
30 approached, 8 "strong interest" — no LOIs, no pilots, no revenue booked.
Typical SaaS interest-to-close conversion: 20-40%
Expected closed revenue from 8 interested: 1.6-3.2 customers likely
Revenue synergy credit: zero until contracted — Rule 7
Credit EBITDA remains: $178.3mm ($170mm + $10mm cost × 83% realisation)

Cross-sell TAM — Rule 24:
Need target ARPU and platform customer count to calculate
$45mm ARR approached represents unknown % of platform base
TAM = platform customer count × target ARPU — cannot calculate without both inputs
Revenue synergy as % of TAM must be below 15% to be plausible without pipeline — cannot verify yet

Tech stack integration — Rule 28 Dimension 1:
Two stacks maintained 18 months — acceptable
36 months full migration — within range but extension risk real
Correlation risk: cross-sell requires unified platform — migration delay = synergy delay 🔴
Integration budget: $8mm costs-to-achieve — does this include engineering cost of dual stack maintenance?
Estimated dual stack cost: if 5 engineers × $150k fully loaded × 1.5 years = $1.1mm minimum — likely understated

Target margin — Rule 27:
25% EBITDA margin via PLG — plausible ✓
PLG moving to enterprise? If yes — S&M spend increases, margin compresses
CAC and LTV mentioned but not quantified — queue
ARPU for target — not yet given — Rule 24 applies 🔵

Recurring revenue % — not yet given — Rule 24 applies 🔵
Critical for assessing whether $80mm revenue is truly SaaS quality

🚩 FLAG [EBITDA] 🟡
Revenue synergy pipeline earliest stage — no LOIs or pilots. Zero credit in credit case.

🚩 FLAG [INTEGRATION] 🔴
Tech stack and revenue synergy risks correlated — Rule 28. Cross-sell requires successful migration. If migration extends — synergies delayed. Combined risk greater than each independently.

🚩 FLAG [REVENUE] 🔵
Target ARPU unknown — cannot size cross-sell TAM or verify revenue synergy credibility. Rule 24.

🚩 FLAG [REVENUE] 🔵
Target recurring revenue % unknown — cannot confirm software-quality revenue profile. Rule 24.

⚠️ EVASION BORDERLINE
"Strong interest" used where commercial commitments asked for. Push back immediately in direct sponsor mode.

📋 OPEN
8 unanswered — LOIs/pilots unknown; total platform customer count unknown; target ARPU unknown; target recurring revenue % unknown; platform ARPU unknown; platform recurring revenue % unknown; target NRR during migration unknown; integration budget full scope unknown

✅ COVERED
Revenue synergy pipeline — 30 approached, 8 interested, no revenue booked ✓
Tech stack — 18 months dual, 36 months full migration ✓
Target margin — 25% PLG, low CAC, high LTV — credible ✓
Paydown model — arriving post-call ✓

---

**QUESTION QUEUE — UPDATED WITH RULE 24 AND RULE 28:**
1. "On the 8 customers expressing strong interest — have any signed LOIs, expanded contracts, or committed to a pilot? We want to understand whether this is commercial intent or early-stage interest."
2. "On ARPU — what's the average contract value per customer for both the platform and the target and how has that trended over the last four to six quarters?" — Rule 24
3. "On the revenue mix — of the target's $80mm revenue, what percentage is truly recurring ARR versus professional services, usage-based, or other?" — Rule 24
4. "On the platform revenue mix — same question. What percentage of platform revenue is ARR versus non-recurring?" — Rule 24
5. "On the total platform customer base — how many customers does the platform have in total? We want to understand what 30 approached represents as a percentage of the addressable cross-sell opportunity."
6. "On the tech migration — is the $8mm costs-to-achieve the full budget including engineering costs of running two stacks for 18 months or does it exclude those?" — Rule 28
7. "On the target NRR during migration — customers being asked to migrate platforms sometimes churn or pause expansion. Have you modelled a migration churn scenario?"
8. "On the PLG motion — what is the CAC payback period and LTV/CAC ratio and has the payback period been stable or lengthening?" — Rule 27

---

**RULES FIRED:** Rules 7, 10, 22, 24, 27, 28. Correlation risk flagged.
**CORRECTIONS FROM ARYA:**
- ARPU for standalone business is critical — add to every software add-on ✓
- Recurring revenue % is critical — determines whether software multiples are justified ✓
- Rules 24, 27, 28 encoded and questions added to exchange 3 queue ✓


---


### EXCHANGE 4 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 4

**Sponsor says:**
"On the LOIs — none signed yet, but two of the eight customers have agreed to pilot programmes starting next quarter. The other six are in active discussions. On ARPU — target ARPU is approximately $180k per customer annually. Platform ARPU is approximately $320k. On the revenue mix — target is approximately 85% ARR, 15% professional services. Platform is 92% ARR, 8% professional services. On the total platform customer base — the platform has 480 customers. So 30 approached is about 6% of the base. On the integration budget — the $8mm costs-to-achieve covers severance and consulting fees. The ongoing engineering cost of maintaining two stacks is approximately $3mm per year — that is in the model as an operating cost, not in the costs-to-achieve. On the CAC payback period — target is approximately 18 months. LTV/CAC is approximately 4.2x. On the platform's NRR during migration — we've modelled a 5% churn assumption on target customers during the migration period."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the 5% churn assumption on target customers during migration — how did you arrive at that number and do you have data from Company X's migration to benchmark against?"

🔢 INTERNAL CALCULATION
ARPU — Rule 24:
Target ARPU $180k | Platform ARPU $320k
Cross-sell TAM: 480 × $180k = $86.4mm
$5mm revenue synergy ÷ $86.4mm TAM = 5.8% — plausible ✓
Revenue synergy credit upgraded from 0% to 25% — two pilots confirmed
Revised credit EBITDA: $170mm + $8.3mm cost + $1.25mm rev syn = $179.55mm
Revised credit leverage: $1.335bn ÷ $179.55mm = 7.43x

Recurring revenue — Rule 24:
Target 85% ARR ✓ above 80% threshold | Platform 92% ARR ✓
Software quality confirmed on both entities

Integration budget — Rule 28:
Stated costs-to-achieve: $8mm (severance + consulting)
Dual stack engineering: $3mm/year × 1.5 years = $4.5mm
Full integration cost: $12.5mm — 56% above stated
$3mm annual dual stack cost reduces credit EBITDA during migration
Migration period credit leverage: $1.335bn ÷ $176.55mm = 7.56x

CAC payback 18 months ✓ | LTV/CAC 4.2x ✓ — PLG thesis validated — Rule 27

Revenue synergy year 1 reality check:
$5mm year 1 requires ~28 customers to adopt target product
Only 30 approached, 2 in pilot — year 1 ambitious, year 2-3 more realistic
Credit case defers revenue synergy to year 2

Revised leverage scenarios:
Financing: 7.2x | Credit: 7.43x | Zero synergy: 7.85x | Migration period: 7.56x

🚩 FLAG [LEVERAGE] 🔴 — credit leverage 7.43x, migration period 7.56x — above 7x threshold
🚩 FLAG [INTEGRATION] 🟡 — full budget $12.5mm vs stated $8mm, $3mm annual EBITDA drag
🚩 FLAG [REVENUE] 🟡 — year 1 revenue synergy ambitious, credit case defers to year 2
🚩 FLAG [INTEGRATION] 🟡 — 5% migration churn management estimate, not benchmarked

📋 OPEN — 5 items
✅ COVERED — 2 pilots confirmed ✓ | ARPU both entities ✓ | ARR% both entities ✓ | 480 platform customers ✓ | Full integration budget ✓ | CAC/LTV ✓ | 5% churn assumption ✓

---

**QUESTION QUEUE:**
1. "On the 5% migration churn — how did you arrive at that and do you have Company X data to benchmark against?"
2. "On revenue synergy timing — $5mm year one requires ~28 customers. With 2 pilots just starting — is this a year 2-3 story rather than year 1?"
3. "On target customer count — total number of target customers?"
4. "On the combined paydown model — when can we expect it?"

---

**RULES FIRED:** Rules 7, 10, 16, 24, 27, 28.
**CORRECTIONS FROM ARYA:** Exchange 4 validated ✓


---


### EXCHANGE 5 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 5

**Sponsor says:**
"On the migration churn — we don't have empirical data from Company X because that integration didn't involve a tech migration, it was the same stack. The 5% is our best estimate based on customer conversations — we've spoken to the top 20 target customers who represent about 60% of ARR and none have flagged migration as a concern. On the revenue synergy timing — you're right, it's more of a year 2-3 story. Year one revenue synergy in the model is approximately $1mm, ramping to $3mm in year two and $5mm run rate from year three. On the target customer count — the target has 72 customers total. On the paydown model — we're sending it now, you should have it in the next ten minutes."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the combined model arriving now — once we have it, the priority items we'll be looking at are the year by year FCF build, the synergy realisation timeline flowing through the waterfall, and the WC assumptions. Can you flag when it's in our inbox?"

🔢 INTERNAL CALCULATION
Migration churn — no benchmark:
Company X same stack — no migration precedent.
5% based on top 20 only. Bottom 52 (40% ARR) not assessed.
Conservative adjustment: top 20 at 5%, bottom 52 at 10%
Blended: (60% × 5%) + (40% × 10%) = 7% blended churn — Rule 22
Revenue impact: 72 × $180k × 7% = $907k ARR loss vs $648k at 5%
Credit case applies 7% not 5%.

Revenue synergy timeline confirmed:
Y1: $1mm ✓ | Y2: $3mm ✓ | Y3+: $5mm run rate ✓
Probability-weighted credit case:
Y1: $1mm × 75% = $750k | Y2: $3mm × 60% = $1.8mm | Y3+: $5mm × 50% = $2.5mm

Target: 72 customers. Top 20 = 28% of customers, 60% ARR.
Average ARR top 20: $2.04mm | Average ARR bottom 52: $523k
Concentration risk: 1-2 top customer churn = $4mm ARR loss = eliminates year 1 synergy

Credit leverage by year:
Y1: $1.335bn ÷ $176.05mm = 7.58x (dual stack drag, minimal rev syn)
Y2: $1.335bn ÷ $177.1mm = 7.54x
Y3+: $1.335bn ÷ $180.8mm = 7.38x (dual stack ends, rev syn ramping)

Paydown model pre-flight checklist prepared — Rule 19:
Revenue blend | Synergy timeline | SOFR rate | Cash taxes | Capex split | WC deferred revenue | Dual stack $3mm | Migration churn 5% | FCF Y1-7 | Cumulative repayment | Back-weighting

🚩 FLAG [INTEGRATION] 🟡 — 7% blended churn applied, bottom 52 unassessed
🚩 FLAG [CONCENTRATION] 🟡 — top 20 = 60% ARR, 1-2 churn eliminates Y1 synergy

📋 OPEN — 2 items: paydown model arriving; bottom 52 migration readiness unknown
✅ COVERED — churn 5% top 20 confirmed ✓ | Y1 $1mm, Y2 $3mm, Y3+ $5mm ✓ | 72 customers ✓ | Model arriving ✓

---

**QUESTION QUEUE:**
1. "On the model — priority items are FCF waterfall, synergy timeline, and WC assumptions. Flag when in our inbox."
2. "On the top 20 target customers — what's the migration sequencing plan and who is managing those relationships personally?"
3. "On the bottom 52 — is there a plan to assess migration readiness across the full base before committing to the 36-month timeline?"

---

**RULES FIRED:** Rules 9, 10, 16, 19, 22, 24, 28.
**CORRECTIONS FROM ARYA:** Exchange 5 validated ✓


---


### EXCHANGE 6 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 6

**Sponsor says:**
"Model is in your inbox. Let me walk through the key lines. Combined revenue year one $508mm growing at approximately 14% blended — platform at 9%, target at 22%. Combined adjusted EBITDA year one $178mm. Cash interest $96mm — SOFR at 4.0% in the model. Cash taxes $28mm at 16% effective rate — we have some NOL carry from the platform. Maintenance capex $22mm — platform $12mm, target $10mm. Working capital source of $24mm — both businesses bill annually upfront. No growth capex. Mandatory amortisation $13.35mm. Year one levered FCF $44mm. Cumulative seven year FCF $980mm."

---

**AGENT OUTPUT — IC story filter active — Rule 29:**

IC story scan — four areas:
Most concerning item: WC story — $24mm source on combined entity. Historical comparison required before accepting.
Second: Revenue growth — 14% blended, verify against NRR and segment mix.
Third: EBITDA margin — $178mm on $508mm revenue = 35% margin. Consistent with platform profile.
Fourth: Cash flow conversion — $44mm FCF on $178mm EBITDA = 24.7% conversion. Low — driven by cash interest burden.

MD SUMMARY DRAFT:
"The deal is a software add-on at 7.4x credit leverage. The credit story depends on $10mm of cost synergies at 83% realisation and WC not being worse than historical trend. The biggest risk is the WC assumption — if the $24mm projected source reverts to historical the deal fails the 50% repayment test. Before IC we need the WC reconciliation against historical financials and the model stress-tested at zero WC source."

⚡ ASK NOW
"On the working capital — the model shows $24mm annual source. Looking at the historical financials, WC has been running differently over the last eight quarters. Can you help us understand what's driving the change from historical — specifically how much is deferred revenue and how much is operational improvement?"

🔢 INTERNAL CALCULATION
Waterfall reconciliation — Rule 19:
$178mm - $96mm - $28mm - $22mm + $24mm - $13.35mm = $42.65mm
Sponsor stated $44mm. Gap $1.35mm — rounding ✓ Waterfall reconciles.

SOFR: model 4.0% vs current 4.3% — 30bps delta. $1.335bn × 30bps = $4mm annually.
Below 100bps threshold — monitoring item not IC flag. ✓

WC — IC-relevant concern:
Combined ARR: platform ~$394mm growing 9% → ~$35mm deferred revenue growth
Target ARR: $68mm growing 22% → ~$15mm deferred revenue growth
Combined deferred revenue growth: ~$50mm vs $24mm stated WC source
Gap: $26mm — if operational WC is $26mm USE of cash, ex-deferred WC is negative
Stress scenario: WC as $26mm use → cumulative FCF drops from $980mm to ~$630mm
$630mm ÷ $1.335bn = 47.2% — FAILS 50% test 🔴
This is the IC story. Everything else is secondary.

Revenue growth: 14% blended = (84% × 9%) + (16% × 22%) = 7.6% + 3.5% = 11.1% organic
14% includes synergy revenue contribution — consistent ✓

Repayment — Rule 14:
Base: $980mm ÷ $1.335bn = 73.4% — passes ✓
WC stress: $630mm ÷ $1.335bn = 47.2% — FAILS 🔴
SOFR stress: $952mm ÷ $1.335bn = 71.3% — passes ✓
Combined stress: 45.1% — FAILS 🔴

🚩 FLAG [CASH FLOW] 🔴
WC $24mm source — deferred revenue growth implies $50mm. Operational WC may be $26mm USE. Stress repayment 47.2% — fails 50% test. IC-level concern. This is the deal.

🚩 FLAG [TAX] 🟡
16% effective rate with NOL carry. Section 382 risk on LBO. NOL expiry schedule needed.

🚩 FLAG [CAPEX] 🟡
Target capex $10mm — 12.5% of revenue. May include growth component at 22% growth rate.

📋 OPEN — IC-relevant items only:
WC breakdown vs historicals — critical; NOL Section 382 analysis; year by year FCF schedule; target capex maintenance vs growth split

✅ COVERED
Combined EBITDA Y1 $178mm ✓ | Cash interest $96mm SOFR 4.0% ✓ | Capex $22mm ✓ | WC $24mm — flagged 🔴 | Y1 FCF $44mm, waterfall reconciles ✓ | Repayment base 73.4% passes, stress 47.2% fails

---

**QUESTION QUEUE — IC story centred on WC:**
1. "On the WC — the model shows $24mm source. Looking at the historicals, WC has been tracking differently. Can you help us understand what's driving the change from historical — specifically how much is deferred revenue and how much is operational improvement?"
2. "On the NOL carry — what's the quantum and expiry schedule? And has the team run a Section 382 analysis given the LBO is a change of control?"
3. "On target capex — $10mm on $80mm revenue growing at 22%. Can you split maintenance from growth?"
4. "Can we get the year by year FCF schedule — years one through seven?"

---

**RULES FIRED:** Rules 9, 10, 14, 18, 19, 29. IC story filter active — WC as primary concern ✓
**CORRECTIONS FROM ARYA:**
- Lev fin talks about repayment capacity not cumulative FCF ✓
- SOFR delta calculated internally, not flagged unless above 100bps ✓
- WC verified against historical financials first — divergence from historicals is the IC flag ✓
- IC story filter: identify the single most concerning item and centre discussion there ✓
- MD summary added as primary output of post-call debrief ✓
- Rule 29 encoded ✓


---


### EXCHANGE 7 — IN PROGRESS

*To be completed in next session.*


### EXCHANGE 7

**Sponsor says:**
"On the working capital — platform operational WC is approximately $5mm use annually. Platform deferred revenue growth $11mm. Target deferred revenue growth $18mm. Net $24mm source. Ex-deferred revenue the combined operational WC is a $5mm use of cash annually. On the NOL — $85mm, $18mm annual limitation, years one through four coverage. Tax normalises to 22% from year five. On target capex — $7mm maintenance, $3mm growth tied to cloud infrastructure scaling. On the year by year FCF — year one $44mm, year two $58mm, year three $74mm, year four $89mm, year five $105mm, year six $122mm, year seven $138mm. On PF ratings — Moody's indicative B2, S&P indicative B."

---

**AGENT OUTPUT — Iceberg principle active — Rule 22:**

⚡ ASK NOW
"On the PF ratings — are those formal or still indicative and has either agency flagged any specific concerns on the add-on structure or leverage level?"

🔢 INTERNAL CALCULATION — below surface, full granularity:

WC resolved:
Ex-deferred operational WC: -$5mm annually confirmed
Credit case WC: -$5mm use
Model WC contribution: $24mm × 7 = $168mm
Credit case WC contribution: -$5mm × 7 = -$35mm
Adjustment: -$203mm from model
Revised credit case FCF: $980mm - $203mm = $777mm ÷ $1.335bn = 58.2% — PASSES ✓
WC primary concern resolved.

Back-weighting — Rule 14:
Y1-Y7: $44 + $58 + $74 + $89 + $105 + $122 + $138 = $630mm
Stated cumulative $980mm — gap $350mm — likely ECF sweep inclusion
Years 1-3: $176mm = 27.9% | Years 4-7: $454mm = 72.1% — FIRES 🔴

NOL: $85mm, $18mm annual limit, years 1-4. Tax to 22% from year 5.
Additional cash taxes years 5-7: ~$10.7mm annually
Revised credit case FCF after tax normalisation: reduce years 5-7 by $10.7mm each

Target capex: $7mm maintenance + $3mm growth. Credit case uses $19mm maintenance only ($12mm platform + $7mm target). Growth capex excluded.

Comprehensive credit case repayment:
Base model: $980mm ÷ $1.335bn = 73.4%
Credit case (ex-deferred WC + tax normalisation + growth capex excluded): ~$879mm ÷ $1.335bn = 65.9% — PASSES ✓
Back-weighting 72% years 4-7 — fires independently regardless of repayment level 🔴

MD SUMMARY UPDATED:
"The deal is a software add-on at 7.4x credit leverage. WC is resolved — credit case repayment is 65.9% which passes our threshold. The primary remaining concern is back-weighting — 72% of cumulative FCF falls in years 4-7, compounded by tax normalisation from year five. Before IC we need the FCF reconciliation gap explained and formal PF ratings confirmed."

🚩 FLAG [REPAYMENT] 🔴 — back-weighting 72% years 4-7, fires independently
🚩 FLAG [FCF] 🟡 — $350mm gap between year by year sum and stated cumulative — likely ECF sweep
🚩 FLAG [TAX] 🟡 — 22% tax from year 5, $10.7mm additional annually, worsens back-weighting
Rule 23 triggered — back-weighting + re-levering add-on = covenant package required

📋 OPEN — 3 items: PF ratings formal vs indicative + agency concerns; FCF reconciliation gap; covenant package
✅ COVERED — WC resolved ex-deferred -$5mm ✓ | NOL $85mm year 5 normalisation ✓ | Capex split confirmed ✓ | FCF Y1-7 confirmed ✓ | Back-weighting 72% 🔴 | Credit case repayment 65.9% ✓ | PF ratings B2/B indicative ✓

---

**QUESTION QUEUE — iceberg principle applied, maximum 20 words each:**
1. "On the PF ratings — are those formal or indicative and has either agency flagged specific concerns?"
2. "On the FCF build — does the $980mm cumulative include ECF sweep or is that pure levered FCF before sweep?"
3. "On the covenant package — can we get the term sheet before IC? We'd want to look at the tightest covenant, incremental basket, and restricted payments."

---

**RULES FIRED:** Rules 9, 10, 14, 22 (iceberg), 23, 29, 30.
**KEY LEARNING:** Internal calculations are always granular. Questions surface on the call are always brief — minimum information request to complete the analysis. The finding surfaces, never the methodology.
**CORRECTIONS FROM ARYA:**
- Lev fin will not go to this granularity unprompted ✓
- Questions lead the conversation to the point where the analysis can be done ✓
- Internal depth, surface brevity — the iceberg principle ✓
- Rule 22 updated with iceberg principle ✓


---


## TRANSCRIPT 4 — POST-CALL DEBRIEF

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UNDERWRITER.AI — CALL DEBRIEF
Software Add-On Acquisition — Direct Sponsor Call
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IC VERBAL BRIEFING — 5 MINUTES

"This is a software add-on acquisition. [Sponsor] is acquiring [Target] — a high-growth B2B SaaS business — and bolting it onto an existing platform that has delevered from 7x to 5.8x over two years. The deal adds $240mm of incremental debt. Post-acquisition credit leverage is 7.4x on our numbers.

What makes this work: the platform has 108% NRR, revenue growing at 9%, and has delevered ahead of schedule. The target has 118% NRR, 85% ARR, and healthy unit economics — 18-month CAC payback, 4.2x LTV/CAC. Cost synergies of $10mm are grounded in a prior acquisition where the sponsor delivered 83% of projected synergies. Our credit case repayment is 65.9% which passes our 50% threshold comfortably.

The thing that concerns me most is back-weighting — 72% of cumulative FCF falls in years four through seven. Tax normalisation from year five adds further pressure on the outer years. If the sponsor recaps at year four when leverage reaches 4x — which their playbook suggests — lenders may never see the years four through seven repayment they are underwriting.

Beyond that we're watching three things. Integration risk is real — different tech stacks, no migration benchmark from prior deals, and top 20 target customers representing 60% of ARR. Revenue synergies are early stage — two pilots, no LOIs, we're giving 25% credit in our model. And the NOL Section 382 is preliminary — tax normalises to 22% from year five which we've built into our credit case.

Before we can recommend approval we need three things. The FCF reconciliation — we need to confirm whether the $980mm cumulative includes ECF sweep. Formal PF ratings from both agencies with any flagged concerns. And the full covenant package — tightest leverage covenant, incremental basket, and restricted payments terms. If those come back clean we're comfortable recommending conditional approval."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MD SUMMARY
"The deal is a software add-on at 7.4x credit leverage. Credit case repayment is 65.9% — passes. Primary concern is back-weighting at 72% in years 4-7, compounded by tax normalisation from year 5 and sponsor recap probability at year 4. Before IC: FCF reconciliation, formal PF ratings, covenant package."

EBITDA QUALITY      Level 2 — cost synergies 83% realisation applied, revenue synergies 25% credit only. No QoE on target — higher scrutiny applied.

FINANCING LEVERAGE  7.2x on $185mm combined EBITDA including full synergies.

CREDIT LEVERAGE     7.4x — $10mm cost synergies at 83% realisation, $5mm revenue synergies at 25% credit, $5mm use ex-deferred WC applied.

50% REPAYMENT TEST  PASS — credit case 65.9%. Base model 73.4%. Both above Goldman standard.

BACK-WEIGHTING      FIRED 🔴 — 72% in years 4-7. Fires independently. Tax normalisation years 5-7 worsens. Sponsor recap probability at year 4 compounds.

TOP UNRESOLVED 🔴
1. Back-weighting 72% years 4-7 — compounded by tax normalisation and Rule 17 recap risk
2. FCF reconciliation — $350mm gap between year by year sum and stated cumulative
3. Covenant package — Rule 23 triggered, not yet received

MONITORING ITEMS 🟡
1. Integration risk — different tech stacks, no migration benchmark, top 20 = 60% target ARR
2. Revenue synergies — two pilots only, 25% credit applied, year 2-3 delivery more realistic
3. NOL Section 382 preliminary — tax to 22% from year 5 built into credit case
4. Target capex $3mm growth excluded from credit case — confirm post-migration reduction
5. PF ratings indicative only — formal confirmation pending

FOLLOW-UP BEFORE IC
1. FCF reconciliation — does $980mm include ECF sweep? [Recipient: sponsor / lev fin]
2. Formal PF ratings — Moody's and S&P, any flagged concerns [Recipient: lev fin]
3. Full covenant package — tightest covenant, incremental basket, restricted payments, transfer restrictions [Recipient: lev fin / legal] — Rule 23
4. WC historical financials — 8 quarters NWC movement to verify ex-deferred trend [Recipient: lev fin]
5. Target QoE or independent verification of $20mm EBITDA [Recipient: sponsor]
6. Bottom 52 target customer migration readiness assessment [Recipient: sponsor]

EVASION LOG
0 evasions detected — sponsor was responsive throughout. Technical deflection on revenue synergy pipeline (two pilots vs LOIs) noted but resolved.

CREDIT CASE ADJUSTMENTS
- Cost synergies: $10mm × 83% = $8.3mm accepted
- Revenue synergies: $5mm × 25% = $1.25mm, deferred to year 2-3
- WC: ex-deferred -$5mm annually, not +$24mm as modelled
- Target capex: $7mm maintenance only, $3mm growth excluded
- Tax: 22% from year 5, $10.7mm additional annually years 5-7
- Credit EBITDA: $179.55mm
- Credit leverage: 7.4x
- Repayment: 65.9% — passes

ESCALATION FLAGS
📡 Capital markets: N/A — no new debt issuance pricing concern
Tier [per deal configuration] — VP / ILA per standard
To VP: integration risk monitoring, revenue synergy timeline, NOL formal analysis
To ILA / MD: back-weighting 72% + Rule 17 recap risk — requires senior sign-off
Rule 23 items: covenant package — legal review required before IC
MD awareness: all findings per standard

CREDIT SCORECARD
Business quality 4 | Sector tailwind 3 | EBITDA quality 3 | Repayment 3 | Leverage/coverage 2 | Structural protections 2 | Forecast credibility 3
TOTAL: 20/35 — just below 21 threshold. Conditional on covenant package, FCF reconciliation, and formal ratings. Structural protections score upgrades to 3 once covenant package received and reviewed — deal clears threshold.

EQUITY-INFORMED CREDIT NOTE
Equity cushion adequate at entry but add-on re-levers platform from 5.8x to 7.4x — erasing two years of organic deleveraging. Sponsor at year 4 will reach ~4x leverage and Rule 17 suggests high recap probability. Recommend restricted payments basket gating distributions until leverage below 5x as condition before IC.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**TRANSCRIPT 4 — COMPLETE ✅**


### EXCHANGE 2

**Sponsor says:**
"On the EBITDA bridge — $135.6mm reported. Add-backs: $28mm breach-related costs (incident response, forensic investigation, legal fees, regulatory fines), $12mm restructuring for Segment A right-sizing, $4.4mm SBC. On settlement funding — tranche one $200mm from $150mm cash and $50mm RCF draw. Tranche two $140mm at month twelve from year one operational FCF plus $80mm unconditional sponsor equity commitment documented in commitment letter. On the two misses — 23% entirely breach-driven, 11% residual breach dynamics. Both now behind us. On Segment A decline — 6% stable for six quarters. On flash numbers — Q3 revenue $98mm, EBITDA $32mm, CFO $18mm, capex $4mm, cash $142mm, RCF undrawn. Segment A revenue $71mm, Segment B revenue $27mm."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the breach costs — are any of the regulatory fines or compliance remediation costs recurring? And is the $340mm the only legal exposure or are there other claims still open?"

🔢 INTERNAL CALCULATION — below surface:
EBITDA bridge: $28mm breach + $12mm restructuring + $4.4mm SBC = $44.4mm add-backs
Adjustment ratio: $44.4mm ÷ $135.6mm = 32.7% — Level 2, acceptable if genuinely non-recurring

Settlement funding gap resolved:
Tranche 2 = year 1 FCF + $80mm equity backstop ✓
Year 1 FCF required: $140mm - $80mm = $60mm — plausible from operations ✓

Flash numbers — Rule 32 — immediately analysed:
Revenue Q3 $98mm annualised: $392mm vs $400mm LTM — slight decline ✓
EBITDA Q3 $32mm annualised: $128mm vs $135.6mm LTM — declining 🟡
Cash $142mm vs $150mm — some Q3 consumption noted
RCF undrawn ✓ — full $50mm available at close

SEGMENT B FLASH — CRITICAL:
Q3 Segment B $27mm — annualised $108mm vs $120mm LTM 🔴
Expected quarterly run rate: $120mm ÷ 4 = $30mm
Actual Q3: $27mm — $3mm below expected = 10% below quarterly trend
35% growth thesis at risk — Segment B running below its own LTM base

Forecast credibility: prior misses 23% + 11% = 17% average haircut applied
Haircut credit leverage: $950mm ÷ ($135.6mm × 83%) = $950mm ÷ $112.5mm = 8.44x 🔴

IC story — Rule 29: Settlement gap resolved. PRIMARY CONCERN: Segment B flash underperformance.

MD SUMMARY: "Settlement funded via $80mm unconditional equity commitment. Primary concern is Segment B Q3 at $27mm — annualises to $108mm, below $120mm LTM base. 35% growth thesis needs explanation against a quarter running 10% below trend. Before IC: Segment B Q3 explained and regulatory exposure confirmed fully resolved."

🚩 FLAG [REVENUE] 🔴 — Segment B Q3 below run rate, growth thesis at risk
🚩 FLAG [EBITDA] 🟡 — breach costs $28mm, regulatory resolution needs independent confirmation
🚩 FLAG [EBITDA] 🟡 — restructuring $12mm, Segment A declining 6% annually, further rounds likely

📋 OPEN — 6 items
✅ COVERED — EBITDA bridge ✓ | Settlement $80mm equity backstop ✓ | Breach misses plausible ✓ | Segment A 6% stable ✓ | Flash numbers received 🔴

---

**QUESTION QUEUE:**
On call: 1) Breach costs recurring or one-time? Other claims? 2) Segment B Q3 $27mm — timing or structural? 3) Equity commitment unconditional?
In email: Full EBITDA adjustment schedule with roll-off | Q3 EBITDA by segment | Regulatory resolution documentation | Outstanding claims | Commitment letter | Covenant definitions

---

**RULES FIRED:** Rules 7, 11, 16, 22, 25, 26, 29, 31, 32, 34.
**CORRECTIONS FROM ARYA:** Exchange 2 validated ✓


---


### EXCHANGE 3

**Sponsor says:**
"On breach costs — regulatory fines $8mm fully paid and resolved. $20mm incident response and legal one-time. No ongoing compliance remediation. New security framework implementation in the $20mm. No other legal claims beyond the $340mm. On Segment B Q3 — two large enterprise deals slipped from Q3 to Q4, combined ACV $6mm, both closed early Q4. Timing not structural. On equity commitment — fully unconditional, can share commitment letter. On Q3 EBITDA by segment — Segment A $24mm, Segment B $8mm, combined $32mm."

---

**AGENT OUTPUT:**

⚡ ASK NOW
"On the two Q3 deals that slipped — both now closed in Q4. What is the current Q4 Segment B run rate showing?"

🔢 INTERNAL CALCULATION — below surface:
Breach costs: $8mm regulatory fines paid ✓ | $20mm incident response ✓ | No other claims ✓
Security framework: "implementation costs in the $20mm" — ongoing maintenance costs post-implementation?
Annual security maintenance likely $3-5mm — are these in forward model? Flag for email.

Q3 deal slippage: $6mm ACV = ~$1.5mm quarterly revenue recognition
Explains $1.5mm of $3mm Q3 shortfall. $1.5mm gap still unexplained.

SEGMENT A MARGIN — CRITICAL FINDING:
Segment A Q3: $24mm EBITDA on $71mm revenue = 33.8% margin vs 45% LTM 🔴
11.2 percentage point compression — NOT volunteered by sponsor
If structural: Year 1 Segment A EBITDA = $263mm revenue × 37% = $97.3mm vs $118.4mm modelled
Combined EBITDA gap: ~$25-30mm reduction
Credit leverage at compressed Segment A margins: $950mm ÷ $129.7mm = 7.33x 🔴

Segment B margin: $8mm on $27mm = 29.6% vs 8% LTM — IMPROVING ✓
Segment B scaling toward profitability faster than modelled — positive signal

Evasion assessment: Segment A margin compression not volunteered. Omission noted — not classified as evasion but agent caught from arithmetic. Responsible sponsor should have flagged proactively.

IC story update — Rule 29: Settlement funded ✓. Segment B timing explained ✓. NEW PRIMARY CONCERN: Segment A margin compression.

MD SUMMARY UPDATED: "Settlement funded. Segment B Q3 timing explained. Critical new finding: Segment A Q3 margin 34% vs 45% modelled — if structural, combined EBITDA drops $25-30mm and credit leverage rises to 7.3x+. Before IC: Segment A margin explained and forward model stress-tested at 35-38% Segment A margins."

🚩 FLAG [EBITDA] 🔴 — Segment A margin 33.8% vs 45% modelled, structural or restructuring costs?
🚩 FLAG [EBITDA] 🟡 — security framework ongoing costs not confirmed in forward model
🚩 FLAG [REVENUE] 🟡 — $1.5mm Segment B Q3 gap unexplained by deal slippage alone

⚠️ OMISSION NOTED — Segment A margin compression not volunteered by sponsor despite being material

📋 OPEN — 5 items: Segment A margin explanation; Q4 Segment B run rate; ongoing security costs in model; restructuring roll-off schedule; equity commitment letter
✅ COVERED — breach fully resolved ✓ | no other claims ✓ | Q3 deals both closed Q4 ✓ | equity unconditional ✓ | Segment A margin compression identified 🔴 | Segment B margin improving ✓

---

**QUESTION QUEUE:**
On call:
1. "On Segment A Q3 margin — $24mm on $71mm revenue is about 34% versus the 45% in the model. Is that restructuring costs flowing through Q3 or is there something structural happening to Segment A margins?"
2. "On Q4 Segment B — with the two deals now closed, what is the current Q4 run rate showing?"
3. "On the security framework — are there ongoing annual maintenance costs post-implementation and are those in the forward model?"

In email:
1. Full restructuring schedule — line items, quantum, roll-off by quarter
2. Segment A forward margin assumption in model
3. Ongoing security costs annual run rate
4. Q4 flash numbers when available
5. Equity commitment letter

---

**RULES FIRED:** Rules 16, 22, 25, 29, 30, 31. Omission noted — not evasion. Segment A margin caught from arithmetic.
**KEY LEARNING:** Agent caught Segment A margin compression from segment EBITDA numbers sponsor gave. Sponsor did not volunteer it. Iceberg principle — one question surfaced, full arithmetic internal.
**CORRECTIONS FROM ARYA:** Exchange 3 validated ✓


---


### EXCHANGE 4 — IN PROGRESS

*To be completed in next session.*

