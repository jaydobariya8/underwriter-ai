import Link from "next/link";
import { BrandLockup } from "./BrandMark";

const MAILTO = "mailto:arya@underwriter.ai?subject=Underwriter%20AI%20inquiry";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "var(--navy)", color: "var(--stone)" }}>
      <div className="mx-auto max-w-[1200px] px-5 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Link href="/" aria-label="Underwriter AI home" className="inline-flex" style={{ color: "var(--stone)" }}>
              <BrandLockup glyphStyle={{ color: "var(--gold)" }} />
            </Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--stone) 72%, transparent)" }}>
              Precision analysis. Institutional trust.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Product">
              <div className="mk-eyebrow" style={{ color: "var(--gold)" }}>Product</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="#product" style={{ color: "var(--stone)" }}>Capabilities</a></li>
                <li><a href="#method" style={{ color: "var(--stone)" }}>Method</a></li>
                <li><Link href="/dashboard" style={{ color: "var(--stone)" }}>Dashboard</Link></li>
              </ul>
            </nav>
            <nav aria-label="Company">
              <div className="mk-eyebrow" style={{ color: "var(--gold)" }}>Company</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="#team" style={{ color: "var(--stone)" }}>Team</a></li>
                <li><a href="#trust" style={{ color: "var(--stone)" }}>Trust</a></li>
                <li><a href="#contact" style={{ color: "var(--stone)" }}>Contact</a></li>
              </ul>
            </nav>
            <div>
              <div className="mk-eyebrow" style={{ color: "var(--gold)" }}>Contact</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href={MAILTO} style={{ color: "var(--stone)" }}>arya@underwriter.ai</a></li>
                <li style={{ color: "color-mix(in srgb, var(--stone) 72%, transparent)" }}>New York</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-10" style={{ border: 0, borderTop: "1px solid color-mix(in srgb, var(--stone) 16%, transparent)" }} />

        <div className="flex flex-col gap-2 text-xs" style={{ color: "color-mix(in srgb, var(--stone) 62%, transparent)" }}>
          <p>
            Underwriter AI is an independent product and is not affiliated with or endorsed by Goldman Sachs.
          </p>
          <p>© {year} Underwriter AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
