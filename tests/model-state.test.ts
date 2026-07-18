import assert from "node:assert/strict";
import test from "node:test";

import { computeModel } from "../lib/model/compute";
import { LBO_MODEL } from "../lib/model/data/lbo";
import {
  encodeModelState,
  parseModelState,
  scaleModelBundle,
} from "../lib/model/state";

test("LBO EBITDA quality reflects the transcript-reported $95mm EBITDA", () => {
  const sponsor = computeModel(LBO_MODEL, []);

  assert.equal(LBO_MODEL.sponsor.reportedEbitda[0], 95);
  assert.ok(sponsor.adjustmentRatio > 1);
  assert.match(sponsor.ebitdaQualityLevel, /^Level 4/);
  assert.match(LBO_MODEL.notes[0], /Level 4/);
});

test("model state round-trips enabled adjustments and non-default scales", () => {
  const enabled = new Set(["correct-sofr", "strip-deferred-wc"]);
  const scales = { "correct-sofr": 1.25, "strip-deferred-wc": 0.5 };

  const query = encodeModelState(enabled, scales);
  const parsed = parseModelState(new URLSearchParams(query), LBO_MODEL);

  assert.deepEqual(parsed.enabledIds, [...enabled]);
  assert.deepEqual(parsed.scales, scales);
});

test("an explicit empty model state does not restore default adjustments", () => {
  const query = encodeModelState(new Set(), {});
  const parsed = parseModelState(new URLSearchParams(query), LBO_MODEL);

  assert.deepEqual(parsed.enabledIds, []);
});

test("scaled bundle applies only valid finite adjustment scales", () => {
  const scaled = scaleModelBundle(LBO_MODEL, {
    "correct-sofr": 1.5,
    unknown: 100,
  });
  const sofr = scaled.adjustments.find((adjustment) => adjustment.id === "correct-sofr");

  assert.equal(sofr?.fcf?.[0], -45);
  assert.equal(scaled.adjustments.length, LBO_MODEL.adjustments.length);
});
