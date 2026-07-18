import Link from "next/link";
import { BrandLockup } from "./BrandMark";

const ANCHORS = [
  { href: "#product", label: "Product" },
  { href: "#method", label: "Method" },
  { href: "#trust", label: "Trust" },
  { href: "#team", label: "Team" },
];

const MAILTO = "mailto:arya@underwriter.ai?subject=Underwriter%20AI%20inquiry";

export function SiteNav() {
  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur"
      style={{
        background: "color-mix(in srgb, var(--stone) 88%, transparent)",
        borderColor: "var(--divider)",
      }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3.5"
      >
        <Link
          href="/"
          aria-label="Underwriter AI home"
          className="inline-flex items-center"
          style={{ color: "var(--navy)" }}
        >
          <BrandLockup glyphStyle={{ color: "var(--gold)" }} />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {ANCHORS.map((a) => (
            <li key={a.href}>
              <a
                href={a.href}
                className="text-sm transition-colors"
                style={{ color: "var(--slate)" }}
              >
                {a.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/dashboard"
            className="text-sm transition-colors"
            style={{ color: "var(--navy)" }}
          >
            Open dashboard
          </Link>
          <a
            href={MAILTO}
            className="rounded-md px-3.5 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--navy)", color: "var(--stone)" }}
          >
            Get in touch
          </a>
        </div>

        {/* Mobile menu — dependency-free disclosure */}
        <details className="relative md:hidden">
          <summary
            aria-label="Open menu"
            className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md border"
            style={{ borderColor: "var(--divider-strong)", color: "var(--navy)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </summary>
          <div
            className="absolute right-0 mt-2 w-56 rounded-lg border p-2 shadow-sm"
            style={{ background: "var(--white)", borderColor: "var(--divider-strong)" }}
          >
            <ul className="flex flex-col">
              {ANCHORS.map((a) => (
                <li key={a.href}>
                  <a
                    href={a.href}
                    className="block rounded-md px-3 py-2 text-sm"
                    style={{ color: "var(--charcoal)" }}
                  >
                    {a.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/dashboard"
                  className="block rounded-md px-3 py-2 text-sm"
                  style={{ color: "var(--charcoal)" }}
                >
                  Open dashboard
                </Link>
              </li>
              <li className="px-1 pt-1">
                <a
                  href={MAILTO}
                  className="block rounded-md px-3 py-2 text-center text-sm font-medium"
                  style={{ background: "var(--navy)", color: "var(--stone)" }}
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </div>
        </details>
      </nav>
    </header>
  );
}
