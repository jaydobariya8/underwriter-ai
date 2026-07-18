import { ProductMockup } from "@/components/marketing/ProductMockup";

const MAILTO = "mailto:arya@underwriter.ai?subject=Underwriter%20AI%20inquiry";

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

const METHOD = [
  {
    step: "Step 1",
    title: "Ingest the deal",
    body: "Configure the transaction and bring the lender presentation, paydown model, historicals, EBITDA bridge, and capital structure into one working context.",
  },
  {
    step: "Step 2",
    title: "Analyze against encoded rules",
    body: "Track what is covered, calculate what should stay internal, detect evasion, and surface the single best question while the call is still live.",
  },
  {
    step: "Step 3",
    title: "Prepare the institution",
    body: "Convert the call record into an MD summary, IC briefing, scorecard, follow-up list, and escalation routing.",
  },
];

const PROOF = [
  { stat: "10+", label: "years of hands-on underwriting experience shaping the system" },
  { stat: "35", label: "encoded analytical rules" },
  { stat: "3", label: "connected workflow stages: pre-call, live call, post-call" },
];

export default function MarketingHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mk-eyebrow">AI credit analyst for leveraged finance</p>
            <h1
              className="mk-display mt-5 text-[2.6rem] sm:text-[3.4rem] lg:text-[3.9rem]"
              style={{ color: "var(--navy)" }}
            >
              Credit judgment,{" "}
              <br className="hidden sm:block" />
              built into your diligence process.
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "var(--slate)" }}>
              Underwriter AI helps analysts ingest deal data, surface the questions that matter, test whether the
              transaction works, and prepare committee-ready credit materials through MD review.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={MAILTO}
                className="rounded-md px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: "var(--navy)", color: "var(--stone)" }}
              >
                Discuss a pilot
              </a>
              <a
                href="#method"
                className="rounded-md border px-5 py-3 text-sm font-medium transition-colors"
                style={{ borderColor: "var(--divider-strong)", color: "var(--navy)" }}
              >
                See how it works
              </a>
            </div>
          </div>
          <div className="lg:pl-4">
            <ProductMockup />
          </div>
        </div>
      </section>

      {/* Positioning strip */}
      <section aria-label="Positioning" style={{ background: "var(--navy)" }}>
        <div className="mx-auto max-w-[1200px] px-5 py-10">
          <p
            className="mk-display text-center text-[1.3rem] leading-snug sm:text-[1.6rem]"
            style={{ color: "var(--stone)" }}
          >
            <span style={{ color: "var(--gold)" }}>Institutional credit judgment</span> shaped by more than a
            decade of hands-on underwriting experience and encoded into{" "}
            <span style={{ color: "var(--gold)" }}>35 analytical rules</span>.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section aria-labelledby="problem-h">
        <div className="mx-auto max-w-[900px] px-5 py-20 md:py-24">
          <h2 id="problem-h" className="mk-display text-[2rem] sm:text-[2.5rem]" style={{ color: "var(--navy)" }}>
            Credit work breaks at the handoffs.
          </h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed" style={{ color: "var(--slate)" }}>
            Documents arrive in fragments. Assumptions drift between models and calls. The most important
            follow-up is often obvious only after the meeting ends. Underwriter AI keeps the credit case, open
            questions, and analytical rules connected from first document to final committee discussion.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section id="product" aria-labelledby="product-h" style={{ background: "var(--white)" }}>
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:py-24">
          <p className="mk-eyebrow">Product</p>
          <h2 id="product-h" className="mk-display mt-4 text-[2rem] sm:text-[2.5rem]" style={{ color: "var(--navy)" }}>
            One analyst&rsquo;s workflow, end to end.
          </h2>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <li key={c.title}>
                <div className="h-px w-10" style={{ background: "var(--gold)" }} />
                <h3 className="mt-4 text-[1.05rem] font-medium" style={{ color: "var(--navy)" }}>
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--slate)" }}>
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Method */}
      <section id="method" aria-labelledby="method-h">
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:py-24">
          <p className="mk-eyebrow">Method</p>
          <h2 id="method-h" className="mk-display mt-4 text-[2rem] sm:text-[2.5rem]" style={{ color: "var(--navy)" }}>
            From raw deal to committee-ready.
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {METHOD.map((m) => (
              <li
                key={m.step}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--divider)", background: "var(--white)" }}
              >
                <div
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--gold)" }}
                >
                  {m.step}
                </div>
                <h3 className="mt-3 text-[1.15rem] font-medium" style={{ color: "var(--navy)" }}>
                  {m.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--slate)" }}>
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Proof */}
      <section aria-label="By the numbers" style={{ background: "var(--navy)" }}>
        <div className="mx-auto max-w-[1200px] px-5 py-16">
          <dl className="grid gap-10 sm:grid-cols-3">
            {PROOF.map((p) => (
              <div key={p.stat} className="text-center">
                <dt className="sr-only">{p.label}</dt>
                <dd>
                  <div className="mk-display text-[3rem]" style={{ color: "var(--gold)" }}>
                    {p.stat}
                  </div>
                  <p
                    className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed"
                    style={{ color: "color-mix(in srgb, var(--stone) 78%, transparent)" }}
                  >
                    {p.label}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" aria-labelledby="trust-h">
        <div className="mx-auto max-w-[900px] px-5 py-20 md:py-24">
          <p className="mk-eyebrow">Trust</p>
          <h2 id="trust-h" className="mk-display mt-4 text-[2rem] sm:text-[2.5rem]" style={{ color: "var(--navy)" }}>
            Trust starts with clear boundaries.
          </h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed" style={{ color: "var(--slate)" }}>
            The current MVP uses synthetic deal transcripts and is not approved for confidential client data. A
            production institutional deployment requires authenticated access, tenant isolation, retention
            controls, encryption validation, and independent security review before client information is
            accepted.
          </p>
        </div>
      </section>

      {/* Team */}
      <section id="team" aria-labelledby="team-h" style={{ background: "var(--white)" }}>
        <div className="mx-auto max-w-[900px] px-5 py-20 md:py-24">
          <p className="mk-eyebrow">Team</p>
          <h2 id="team-h" className="sr-only">
            Leadership team
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-12">
            <article>
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
              <h3
                className="mk-display mt-4 text-[2rem] sm:text-[2.35rem]"
                style={{ color: "var(--navy)" }}
              >
                Arya Chudasama
              </h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-widest" style={{ color: "var(--gold)" }}>
                Founder &amp; CEO
              </p>
              <p className="mt-5 text-[1.05rem] leading-relaxed" style={{ color: "var(--slate)" }}>
                Arya spent nearly five years at Goldman Sachs and brings hands-on leveraged-finance underwriting
                judgment to the decisions, calculations, and follow-ups encoded in Underwriter AI.
              </p>
            </article>
            <article>
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
              <h3 className="mk-display mt-4 text-[2rem] sm:text-[2.35rem]" style={{ color: "var(--navy)" }}>
                Jay Dobariya
              </h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-widest" style={{ color: "var(--gold)" }}>
                Co-founder &amp; CTO
              </p>
              <p className="mt-5 text-[1.05rem] leading-relaxed" style={{ color: "var(--slate)" }}>
                Jay built the technical stack that turns the underwriting methodology into a working product for
                connected, institutional-quality diligence.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Final CTA + contact */}
      <section id="contact" aria-labelledby="contact-h" style={{ background: "var(--navy)" }}>
        <div className="mx-auto max-w-[1200px] px-5 pt-20 md:pt-24">
          <h2 id="contact-h" className="mk-display text-[2rem] sm:text-[2.6rem]" style={{ color: "var(--stone)" }}>
            Give analysts their time back.
          </h2>
          <p
            className="mt-5 max-w-xl text-[1.05rem] leading-relaxed"
            style={{ color: "color-mix(in srgb, var(--stone) 78%, transparent)" }}
          >
            Underwriter AI is built to reduce the 16&ndash;20-hour underwriting grinds that pull analysts away from
            the judgment, diligence, and deal work that matter most.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={MAILTO}
              className="rounded-md px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: "var(--gold)", color: "var(--navy)" }}
            >
              Contact Underwriter AI
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
