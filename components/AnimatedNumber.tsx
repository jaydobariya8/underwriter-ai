"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up animation for a KPI value string. Extracts the first numeric token
 * (e.g. "83%", "8.5x", "12"), animates 0 → value on mount, and preserves the
 * surrounding prefix/suffix and decimal precision. Falls back to the raw string
 * when no number is present ("—") or when reduced motion is requested.
 */
export function AnimatedNumber({
  value,
  durationMs = 900,
  className = "",
}: {
  value: string;
  durationMs?: number;
  className?: string;
}) {
  const match = value.match(/-?\d+(\.\d+)?/);
  const target = match ? parseFloat(match[0]) : null;
  const decimals = match && match[0].includes(".") ? match[0].split(".")[1].length : 0;
  const prefix = match ? value.slice(0, match.index) : "";
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : "";

  // Initial value equals the target so SSR and reduced-motion render the final
  // number (and hydration matches). The count-up only runs inside the rAF
  // callback below, so no state is set synchronously during the effect.
  const [display, setDisplay] = useState<number>(target ?? 0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (target === null || startedRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    startedRef.current = true;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  if (target === null) return <span className={className}>{value}</span>;

  return (
    <span className={className}>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
