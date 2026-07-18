import type { ScenarioKey } from "@/types";
import { KASEYA_MODEL } from "./data/kaseya";
import { LBO_MODEL } from "./data/lbo";
import type { ModelBundle } from "./types";

const REGISTRY: Record<ScenarioKey, ModelBundle> = {
  kaseya: KASEYA_MODEL,
  lbo: LBO_MODEL,
};

/** The reconciled sponsor/credit model for a scenario deal, or null for custom deals. */
export function getModelBundle(key: ScenarioKey | null | undefined): ModelBundle | null {
  if (!key) return null;
  return REGISTRY[key] ?? null;
}

export * from "./types";
export * from "./compute";
export * from "./state";
