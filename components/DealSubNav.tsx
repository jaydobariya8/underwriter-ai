"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STEPS = [
  { seg: "", label: "Pre-call" },
  { seg: "call", label: "Live call" },
  { seg: "model", label: "Model" },
  { seg: "debrief", label: "Debrief" },
];

export function DealSubNav({ dealId }: { dealId: string }) {
  const pathname = usePathname();
  const base = `/deals/${dealId}`;
  return (
    <nav className="flex items-center gap-1 overflow-x-auto border-b border-border pb-px">
      {STEPS.map((s) => {
        const href = s.seg ? `${base}/${s.seg}` : base;
        const active = s.seg ? pathname.startsWith(href) : pathname === base;
        return (
          <Link
            key={s.label}
            href={href}
            className={`relative px-3 py-2 text-sm transition-colors ${
              active ? "text-gold" : "text-text-2 hover:text-text"
            }`}
          >
            {s.label}
            {active ? (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full" style={{ background: "var(--gold)" }} />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
