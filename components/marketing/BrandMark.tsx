import type { CSSProperties } from "react";

/**
 * Underwriter AI geometric mark: three ascending columns (a credit "build")
 * with a cut corner, echoing an underwriting ledger. Uses currentColor so it
 * inherits navy, gold, or stone from context.
 */
export function BrandGlyph({
  size = 28,
  className = "",
  title,
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <path d="M5 27V11.5L11 7v20H5Z" fill="currentColor" opacity="0.55" />
      <path d="M13.5 27V7l6-4.5V27h-6Z" fill="currentColor" opacity="0.8" />
      <path d="M22 27V2.5l5 3.75V27h-5Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Full lockup: mark + wordmark. When wrapped in a link, the wordmark text
 * provides the accessible name; the glyph stays decorative.
 */
export function BrandLockup({
  glyphSize = 26,
  className = "",
  wordmarkClassName = "",
  glyphStyle,
}: {
  glyphSize?: number;
  className?: string;
  wordmarkClassName?: string;
  glyphStyle?: CSSProperties;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span style={glyphStyle} className="inline-flex">
        <BrandGlyph size={glyphSize} />
      </span>
      <span
        className={`text-[1.05rem] font-medium tracking-tight ${wordmarkClassName}`}
        style={{ letterSpacing: "0.01em" }}
      >
        Underwriter <span style={{ opacity: 0.62 }}>AI</span>
      </span>
    </span>
  );
}
