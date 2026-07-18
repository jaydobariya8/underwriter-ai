import type { SVGProps } from "react";

/**
 * Minimal stroked line-icons for the product surface. Monochrome and inheriting
 * `currentColor` so they read cleanly in both dark and light themes and match
 * the restrained, premium feel of the marketing site.
 */
function base(props: SVGProps<SVGSVGElement>) {
  return {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function IconBriefcase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function IconFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4 21V4" />
      <path d="M4 4h11l-1.5 3L15 10H4" />
    </svg>
  );
}

export function IconRepeat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

export function IconScale(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <path d="m5 7 14-2" />
      <path d="M5 7 2 13a3 3 0 0 0 6 0z" />
      <path d="m19 5-3 6a3 3 0 0 0 6 0z" />
    </svg>
  );
}

export function IconAlert(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function IconPulse(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M3 12h4l2 6 4-14 2 8h6" />
    </svg>
  );
}

export function IconDoc(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}
