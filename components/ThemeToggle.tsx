"use client";

/**
 * Dark / light switch for the product shell.
 *
 * The icon is chosen entirely by CSS keyed off `html[data-theme]`
 * (see globals.css `.theme-ico-*`), so there is no client state to
 * hydrate and therefore no SSR/client mismatch. This handler only
 * flips the attribute and persists the choice; a tiny inline script
 * in the (app) layout applies the stored value before first paint.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("uw-theme", next);
    } catch {
      /* storage may be unavailable (private mode) — theme still applies for the session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark and light mode"
      title="Toggle dark / light mode"
      className="theme-toggle inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-2 transition-colors hover:border-gold/50 hover:text-gold"
    >
      <span className="theme-ico theme-ico-sun" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </span>
      <span className="theme-ico theme-ico-moon" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      </span>
    </button>
  );
}
