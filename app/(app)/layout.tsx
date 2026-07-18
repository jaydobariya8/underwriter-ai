import type { Metadata } from "next";
import Link from "next/link";
import { BrandLockup } from "@/components/marketing/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Credit Desk",
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-shell flex min-h-full flex-col">

      <header
        className="print-hide sticky top-0 z-20 backdrop-blur"
        style={{
          background: "color-mix(in srgb, var(--bg) 82%, transparent)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3">
          <Link
            href="/dashboard"
            aria-label="Underwriter AI dashboard"
            className="flex items-center gap-3"
            style={{ color: "var(--text)" }}
          >
            <BrandLockup glyphStyle={{ color: "var(--gold)" }} />
            <span
              className="ml-1 hidden items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest sm:inline-flex"
              style={{ background: "color-mix(in srgb, var(--gold) 14%, transparent)", color: "var(--gold)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-livePulse" />
              Live desk
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/dashboard" className="nav-underline text-text-2 hover:text-text" data-active="true">
              Deals
            </Link>
            <Link href="/" className="nav-underline text-text-2 hover:text-text">
              Home
            </Link>
            <Link
              href="/deals/new"
              className="rounded-md border border-gold/50 px-3 py-1.5 text-gold transition-colors hover:bg-gold/10"
            >
              New Deal +
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-5 py-6">{children}</main>
    </div>
  );
}
