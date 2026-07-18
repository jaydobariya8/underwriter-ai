// JSON Schemas for Anthropic tool-forcing. These ARE the output contract.

export const AGENT_OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    askNow: {
      type: "string",
      description: "One question, natural spoken English, collaborative register, max 15 words.",
    },
    internalCalculation: {
      type: ["string", "null"],
      description: "The granular arithmetic done internally. Null if nothing to calculate.",
    },
    flags: {
      type: "array",
      items: {
        type: "object",
        properties: {
          category: { type: "string" },
          severity: { type: "string", enum: ["red", "yellow", "blue"] },
          text: { type: "string", description: "The observation — what was said or detected." },
          rationale: {
            type: "string",
            description: "Why it matters to the credit — the 'so what' for the analyst.",
          },
          suggestedQuestion: {
            type: "string",
            description: "One specific question the analyst can ask to resolve this flag.",
          },
          rule: { type: "number", description: "Analytical rule number that fired, if applicable." },
        },
        required: ["category", "severity", "text", "rationale", "suggestedQuestion"],
      },
    },
    open: {
      type: "object",
      properties: {
        count: { type: "number" },
        items: { type: "array", items: { type: "string" } },
      },
      required: ["count", "items"],
    },
    covered: {
      type: "object",
      properties: {
        count: { type: "number" },
        items: { type: "array", items: { type: "string" } },
      },
      required: ["count", "items"],
    },
    evasion: {
      type: ["object", "null"],
      properties: {
        detected: { type: "boolean" },
        originalQuestion: { type: "string" },
        pushback: { type: "string" },
      },
    },
    questionQueue: {
      type: "array",
      items: { type: "string" },
      description: "3-5 conversational follow-up questions.",
    },
    rulesFired: {
      type: "array",
      items: {
        type: "object",
        properties: {
          rule: { type: "number" },
          label: { type: "string" },
        },
        required: ["rule", "label"],
      },
    },
  },
  required: ["askNow", "flags", "open", "covered", "questionQueue", "rulesFired"],
} as const;

export const PRECALL_SCHEMA = {
  type: "object",
  properties: {
    docRequestEmail: {
      type: "object",
      properties: {
        subject: { type: "string" },
        body: { type: "string" },
      },
      required: ["subject", "body"],
    },
    questionList: {
      type: "array",
      items: {
        type: "object",
        properties: {
          priority: { type: "string", enum: ["red", "yellow", "blue"] },
          category: { type: "string" },
          question: { type: "string" },
          source: { type: "string" },
          recipient: { type: "string" },
        },
        required: ["priority", "category", "question", "source", "recipient"],
      },
    },
  },
  required: ["docRequestEmail", "questionList"],
} as const;

export const DEBRIEF_SCHEMA = {
  type: "object",
  properties: {
    mdSummary: { type: "string", description: "Exactly four sentences." },
    icBriefing: {
      type: "object",
      properties: {
        minute1: { type: "string" },
        minute2: { type: "string" },
        minute3: { type: "string" },
        minute4: { type: "string" },
        minute5: { type: "string" },
      },
      required: ["minute1", "minute2", "minute3", "minute4", "minute5"],
    },
    scorecard: {
      type: "object",
      properties: {
        dimensions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              score: { type: "number" },
              threshold: { type: "number" },
            },
            required: ["name", "score", "threshold"],
          },
        },
        total: { type: "number" },
        verdict: { type: "string", enum: ["PROCEEDS", "DOES NOT PROCEED"] },
      },
      required: ["dimensions", "total", "verdict"],
    },
    metrics: {
      type: "object",
      properties: {
        ebitdaQuality: { type: "string" },
        financingLeverage: { type: "string" },
        creditLeverage: { type: "string" },
        repaymentTest: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["PASS", "FAIL", "INSUFFICIENT DATA"],
            },
            detail: { type: "string" },
          },
          required: ["status", "detail"],
        },
        forecastHaircut: { type: "string" },
      },
      required: [
        "ebitdaQuality",
        "financingLeverage",
        "creditLeverage",
        "repaymentTest",
        "forecastHaircut",
      ],
    },
    topUnresolvedRed: { type: "array", items: { type: "string" } },
    monitoringYellow: { type: "array", items: { type: "string" } },
    escalation: {
      type: "object",
      properties: {
        tier: { type: "string" },
        toVP: { type: "array", items: { type: "string" } },
        toILAMD: { type: "array", items: { type: "string" } },
        mdAwareness: { type: "string" },
        capitalMarketsFlags: { type: "array", items: { type: "string" } },
      },
      required: ["tier", "toVP", "toILAMD", "mdAwareness", "capitalMarketsFlags"],
    },
    followUpEmail: {
      type: "object",
      properties: {
        subject: { type: "string" },
        body: { type: "string" },
      },
      required: ["subject", "body"],
    },
    evasionLog: {
      type: "array",
      items: {
        type: "object",
        properties: {
          originalQuestion: { type: "string" },
          deflection: { type: "string" },
          pushback: { type: "string" },
        },
        required: ["originalQuestion", "deflection", "pushback"],
      },
    },
    equityCreditNote: { type: "string", description: "Three sentences max." },
  },
  required: [
    "mdSummary",
    "icBriefing",
    "scorecard",
    "metrics",
    "topUnresolvedRed",
    "monitoringYellow",
    "escalation",
    "followUpEmail",
    "evasionLog",
    "equityCreditNote",
  ],
} as const;
