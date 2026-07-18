import type { Metadata } from "next";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

const DESCRIPTION =
  "Underwriter AI turns institutional credit judgment into live, auditable guidance across pre-call, live call, and post-call diligence for leveraged finance.";

export const metadata: Metadata = {
  title: "Underwriter AI | AI Credit Analyst for Leveraged Finance",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Underwriter AI | AI Credit Analyst for Leveraged Finance",
    description: DESCRIPTION,
    siteName: "Underwriter AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Underwriter AI | AI Credit Analyst for Leveraged Finance",
    description: DESCRIPTION,
  },
};

export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="marketing-shell flex min-h-full flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
        style={{ background: "var(--navy)", color: "var(--stone)" }}
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
