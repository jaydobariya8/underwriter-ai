import { defaultCreditIds } from "./compute";
import type { ModelBundle } from "./types";

export interface ModelState {
  enabledIds: string[];
  scales: Record<string, number>;
}

const STATE_PARAM = "modelState";
const ADJUSTMENT_PARAM = "adjustment";
const SCALE_PARAM = "scale";

export function encodeModelState(
  enabledIds: Iterable<string>,
  scales: Record<string, number>,
): string {
  const params = new URLSearchParams({ [STATE_PARAM]: "1" });
  for (const id of enabledIds) params.append(ADJUSTMENT_PARAM, id);
  for (const [id, scale] of Object.entries(scales)) {
    if (Number.isFinite(scale) && scale >= 0 && scale <= 1.5 && scale !== 1) {
      params.append(SCALE_PARAM, `${id}:${scale}`);
    }
  }
  return params.toString();
}

export function parseModelState(
  params: URLSearchParams,
  bundle: ModelBundle,
): ModelState {
  if (params.get(STATE_PARAM) !== "1") {
    return { enabledIds: defaultCreditIds(bundle), scales: {} };
  }

  const validIds = new Set(bundle.adjustments.map((adjustment) => adjustment.id));
  const requestedIds = new Set(
    params.getAll(ADJUSTMENT_PARAM).filter((id) => validIds.has(id)),
  );
  const enabledIds = bundle.adjustments
    .map((adjustment) => adjustment.id)
    .filter((id) => requestedIds.has(id));

  const scales: Record<string, number> = {};
  for (const encoded of params.getAll(SCALE_PARAM)) {
    const separator = encoded.lastIndexOf(":");
    if (separator < 1) continue;
    const id = encoded.slice(0, separator);
    const scale = Number(encoded.slice(separator + 1));
    if (validIds.has(id) && Number.isFinite(scale) && scale >= 0 && scale <= 1.5) {
      scales[id] = scale;
    }
  }

  return { enabledIds, scales };
}

export function scaleModelBundle(
  bundle: ModelBundle,
  scales: Record<string, number>,
): ModelBundle {
  return {
    ...bundle,
    adjustments: bundle.adjustments.map((adjustment) => {
      const scale = scales[adjustment.id] ?? 1;
      if (scale === 1 || !Number.isFinite(scale) || scale < 0 || scale > 1.5) {
        return adjustment;
      }
      const multiply = (values?: number[]) =>
        values?.map((value) => value * scale);
      return {
        ...adjustment,
        fcf: multiply(adjustment.fcf),
        leverageEbitda: multiply(adjustment.leverageEbitda),
        coverageInterest: multiply(adjustment.coverageInterest),
      };
    }),
  };
}
