import kaseya from "./fixtures/kaseya.json";
import lbo from "./fixtures/lbo.json";
import type { AgentOutput, DebriefPayload, Fixture, ScenarioKey } from "@/types";

const FIXTURES: Record<ScenarioKey, Fixture> = {
  kaseya: kaseya as unknown as Fixture,
  lbo: lbo as unknown as Fixture,
};

export function getFixture(key: ScenarioKey): Fixture {
  return FIXTURES[key];
}

export function allFixtures(): Fixture[] {
  return Object.values(FIXTURES);
}

/** Ground-truth output for a canned exchange — used as fallback when the API is down. */
export function fallbackOutput(key: ScenarioKey, seq: number): AgentOutput | null {
  const fx = FIXTURES[key];
  const ex = fx?.exchanges.find((e) => e.seq === seq);
  return ex ? ex.fallbackOutput : null;
}

export function fallbackDebrief(key: ScenarioKey): DebriefPayload | null {
  return FIXTURES[key]?.fallbackDebrief ?? null;
}

/** A generic evasion-detecting fallback for custom free-text when the API is down. */
export function genericFallback(text: string): AgentOutput {
  const evasive =
    /(comfortable|feel good|trust me|as I said|market conditions|generally|broadly|we'll get|follow up|management is comfortable)/i.test(
      text,
    );
  return {
    askNow: evasive
      ? "Just to pin that down — can we get the specific number rather than the qualitative comfort?"
      : "Can we get the specific figure and the source document behind it?",
    internalCalculation: null,
    flags: evasive
      ? [
          {
            category: "EVASION",
            severity: "yellow",
            text: "Qualitative comfort language used where a specific number was requested.",
          },
        ]
      : [],
    open: { count: 1, items: ["Specific figure not yet provided"] },
    covered: { count: 0, items: [] },
    evasion: evasive
      ? {
          detected: true,
          originalQuestion: "The specific number behind the statement",
          pushback:
            "Just to make sure we have the right number — can you give us the specific figure and what it's based on?",
        }
      : null,
    questionQueue: [
      "Can we get the specific number behind that?",
      "Is that in the sponsor model or a management assumption at this stage?",
    ],
    rulesFired: evasive
      ? [{ rule: 22, label: "limited information" }]
      : [{ rule: 13, label: "push anyway" }],
  };
}
