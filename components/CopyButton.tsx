"use client";

import { useState } from "react";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className={`rounded border border-border px-2 py-1 text-[11px] text-text-2 transition-colors hover:text-text ${className}`}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}
