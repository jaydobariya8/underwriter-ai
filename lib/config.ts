// Central config + provider selection. Everything degrades gracefully when a key is absent.
// Provider precedence: Gemini (free, AI Studio) → Anthropic → mock (canned outputs).

export const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
export const MODEL = ANTHROPIC_MODEL; // back-compat for anthropic.ts
export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export const hasGemini = Boolean(process.env.GEMINI_API_KEY);
export const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY);
export const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const hasSupabase = Boolean(SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
export const hasExa = Boolean(process.env.EXA_API_KEY);

export type Provider = "gemini" | "anthropic" | "mock";
export const PROVIDER: Provider = hasGemini ? "gemini" : hasAnthropic ? "anthropic" : "mock";

// MOCK MODE: no LLM key → serve canned fixture outputs. Demo insurance + keyless dev.
export const MOCK_MODE = PROVIDER === "mock";

// ── ElevenLabs — live-call voice synthesis ──
// The transcript is spoken aloud on the live call so it feels like a real call.
// The key never leaves the server; the browser hits /api/tts, which proxies here.
export const hasElevenLabs = Boolean(process.env.ELEVENLABS_API_KEY);
// Turbo/flash are the low-latency models — best for a live, conversational feel.
export const ELEVENLABS_MODEL = process.env.ELEVENLABS_MODEL || "eleven_turbo_v2_5";
export const ELEVENLABS_DEFAULT_VOICE =
  process.env.ELEVENLABS_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb"; // "George" — British male

// Reading pace. ElevenLabs `speed` is pitch-preserving; valid range 0.7–1.2.
// Slightly above 1.0 makes the call read a touch faster without sounding rushed.
export const ELEVENLABS_SPEED = (() => {
  const v = Number.parseFloat(process.env.ELEVENLABS_SPEED || "1.12");
  if (Number.isNaN(v)) return 1.12;
  return Math.min(1.2, Math.max(0.7, v));
})();

// British-accented voices per counterparty so the call sounds like several
// British people on the line. All are ElevenLabs default public voice IDs;
// override any of them via ELEVENLABS_VOICE_MAP (JSON keyed by speaker).
const DEFAULT_VOICE_MAP: Record<string, string> = {
  "LEV FIN": "onwK4e9ZLuTAKqWW03F9", // Daniel — British, authoritative
  SPONSOR: "JBFqnCBsd6RMkjVDRZzb", // George — British, warm
  CEO: "onwK4e9ZLuTAKqWW03F9", // Daniel — British, confident
  MANAGEMENT: "JBFqnCBsd6RMkjVDRZzb", // George — British
  ANALYST: "onwK4e9ZLuTAKqWW03F9", // Daniel — British
};

export const ELEVENLABS_VOICES: Record<string, string> = (() => {
  const raw = process.env.ELEVENLABS_VOICE_MAP;
  if (!raw) return DEFAULT_VOICE_MAP;
  try {
    return { ...DEFAULT_VOICE_MAP, ...(JSON.parse(raw) as Record<string, string>) };
  } catch {
    return DEFAULT_VOICE_MAP;
  }
})();

export function voiceForSpeaker(speaker: string): string {
  return ELEVENLABS_VOICES[speaker] ?? ELEVENLABS_DEFAULT_VOICE;
}
