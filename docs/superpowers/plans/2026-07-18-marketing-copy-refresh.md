# Marketing Copy Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the marketing homepage around analyst diligence, institutional-quality output, and time savings while adding both founders to the team section.

**Architecture:** Keep the existing server-rendered Next.js marketing route and visual system. Update static content in the homepage data arrays and JSX, make the team section a responsive two-column grid using existing Tailwind utilities, and align route metadata with the new positioning.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4

## Global Constraints

- Preserve the stone, navy, and muted-gold marketing design system.
- Leave “Trust starts with clear boundaries” and the MVP disclosure unchanged.
- Remove the demo phone and environment condition entirely.
- Add no dependencies, client-side state, routes, imagery, animation, fonts, or colors.
- Do not create a git commit unless the user explicitly requests one.

---

### Task 1: Refresh Homepage Positioning and Product Copy

**Files:**
- Modify: `app/(marketing)/page.tsx:3-270`

**Interfaces:**
- Consumes: Existing `ProductMockup`, `CAPABILITIES`, `METHOD`, and `PROOF` rendering patterns.
- Produces: The same `MarketingHome(): JSX.Element` server component with updated static content and no environment-dependent phone rendering.

- [ ] **Step 1: Establish the current-copy failure condition**

Run:

```bash
rg -n "Precision analysis|Institutional trust|40\\+|showDemoPhone|555-0188" "app/(marketing)/page.tsx"
```

Expected: matches for the old hero, transaction count, demo-phone variable, and demo number.

- [ ] **Step 2: Replace the capability and proof data**

Use these capability values:

```tsx
const CAPABILITIES = [
  {
    title: "Ingest and structure deal data",
    body: "Bring presentations, models, historicals, EBITDA bridges, and capital structures into one working credit context.",
  },
  {
    title: "Surface the right questions",
    body: "Identify what is missing, challenge weak assumptions, and prioritize the diligence questions that can change the credit view.",
  },
  {
    title: "Test whether the transaction works",
    body: "Pressure-test leverage, earnings quality, repayment capacity, downside resilience, and the path to a sustainable capital structure.",
  },
  {
    title: "Pressure-test structural protection",
    body: "Assess covenants, headroom, debt capacity, transfer restrictions, and other protections against the transaction's actual risk profile.",
  },
  {
    title: "Draft the credit memo",
    body: "Turn the evidence and diligence record into an institutional-quality credit memo, including concise versions prepared for MD review.",
  },
  {
    title: "Prepare the institution",
    body: "Produce the IC briefing, scorecard, unresolved risks, follow-up list, and escalation path from the same analytical record.",
  },
];

const PROOF = [
  { stat: "10+", label: "years of hands-on underwriting experience shaping the system" },
  { stat: "35", label: "encoded analytical rules" },
  { stat: "3", label: "connected workflow stages: pre-call, live call, post-call" },
];
```

- [ ] **Step 3: Replace the hero and positioning strip**

Use:

```tsx
<h1
  className="mk-display mt-5 text-[2.6rem] sm:text-[3.4rem] lg:text-[3.9rem]"
  style={{ color: "var(--navy)" }}
>
  Institutional-grade credit judgment,
  <br />
  built into your diligence process.
</h1>
<p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "var(--slate)" }}>
  Underwriter AI helps analysts ingest deal data, surface the questions that matter, test whether the
  transaction works, and prepare committee-ready credit materials through MD review.
</p>
```

Use this positioning statement while retaining the existing navy strip and gold emphasis:

```tsx
Institutional credit judgment shaped by{" "}
<span style={{ color: "var(--gold)" }}>more than a decade of hands-on underwriting experience</span> and
encoded into <span style={{ color: "var(--gold)" }}>35 analytical rules</span>.
```

- [ ] **Step 4: Replace the team section with a two-founder grid**

Keep the existing Team eyebrow and use:

```tsx
<div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-12">
  <article>
    <div className="h-px w-10" style={{ background: "var(--gold)" }} />
    <h2 id="team-h" className="mk-display mt-4 text-[2rem] sm:text-[2.35rem]" style={{ color: "var(--navy)" }}>
      Arya Chudasama
    </h2>
    <p className="mt-2 text-sm font-medium uppercase tracking-widest" style={{ color: "var(--gold)" }}>
      Founder &amp; CEO &middot; Former Goldman Sachs
    </p>
    <p className="mt-5 text-[1.05rem] leading-relaxed" style={{ color: "var(--slate)" }}>
      Arya spent nearly five years at Goldman Sachs and brings hands-on leveraged-finance underwriting
      judgment to the decisions, calculations, and follow-ups encoded in Underwriter AI.
    </p>
  </article>
  <article>
    <div className="h-px w-10" style={{ background: "var(--gold)" }} />
    <h2 className="mk-display mt-4 text-[2rem] sm:text-[2.35rem]" style={{ color: "var(--navy)" }}>
      Jay Dobariya
    </h2>
    <p className="mt-2 text-sm font-medium uppercase tracking-widest" style={{ color: "var(--gold)" }}>
      Co-founder &amp; CTO
    </p>
    <p className="mt-5 text-[1.05rem] leading-relaxed" style={{ color: "var(--slate)" }}>
      Jay built the technical stack that turns the underwriting methodology into a working product for
      connected, institutional-quality diligence.
    </p>
  </article>
</div>
```

- [ ] **Step 5: Reframe the final call to action and remove the demo phone**

Remove `showDemoPhone` and its conditional JSX. Replace the final heading and paragraph with:

```tsx
<h2 id="contact-h" className="mk-display text-[2rem] sm:text-[2.6rem]" style={{ color: "var(--stone)" }}>
  Give analysts their time back.
</h2>
<p
  className="mt-5 max-w-xl text-[1.05rem] leading-relaxed"
  style={{ color: "color-mix(in srgb, var(--stone) 78%, transparent)" }}
>
  Underwriter AI is built to reduce the 16–20-hour underwriting grinds that pull analysts away from the
  judgment, diligence, and deal work that matter most.
</p>
```

- [ ] **Step 6: Verify old claims and placeholders are gone**

Run:

```bash
rg -n "Precision analysis|Institutional trust|40\\+|showDemoPhone|555-0188|demo number" "app/(marketing)/page.tsx"
```

Expected: no matches.

### Task 2: Align Marketing Metadata

**Files:**
- Modify: `app/(marketing)/layout.tsx:5-6`

**Interfaces:**
- Consumes: Existing Next.js `Metadata` object.
- Produces: Updated shared `DESCRIPTION` used by standard, Open Graph, and Twitter metadata.

- [ ] **Step 1: Confirm the old description**

Run:

```bash
rg -n "live, auditable guidance" "app/(marketing)/layout.tsx"
```

Expected: one match in `DESCRIPTION`.

- [ ] **Step 2: Replace the metadata description**

Use:

```tsx
const DESCRIPTION =
  "Underwriter AI helps leveraged-finance analysts ingest deal data, surface critical diligence questions, test transactions, and prepare institutional-quality credit materials.";
```

- [ ] **Step 3: Confirm every metadata surface consumes the shared value**

Run:

```bash
rg -n "description: DESCRIPTION" "app/(marketing)/layout.tsx"
```

Expected: three matches covering standard metadata, Open Graph, and Twitter.

### Task 3: Validate Code and Responsive Presentation

**Files:**
- Verify: `app/(marketing)/page.tsx`
- Verify: `app/(marketing)/layout.tsx`

**Interfaces:**
- Consumes: The completed homepage and metadata edits.
- Produces: A lint-clean, production-buildable, visually checked marketing page.

- [ ] **Step 1: Run lint**

Run:

```bash
npm run lint
```

Expected: exit code 0 with no new errors.

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: exit code 0 and successful generation of the `/` route.

- [ ] **Step 3: Inspect desktop and mobile layouts**

Use the running development server to inspect `/` at approximately 1440px and 390px widths. Confirm:

- The hero wraps intentionally and does not collide with the product mockup.
- All six capability items remain balanced.
- Team bios render in two columns on larger screens and one column on mobile.
- The final CTA contains only the email action and New York label.
- The trust heading and MVP paragraph are unchanged.

- [ ] **Step 4: Review the final diff**

Run:

```bash
git diff --check && git diff -- "app/(marketing)/page.tsx" "app/(marketing)/layout.tsx"
```

Expected: no whitespace errors; diff is limited to approved copy, team layout, proof metric, metadata, and phone removal.
