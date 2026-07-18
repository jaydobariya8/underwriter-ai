import { GEMINI_MODEL } from "./config";

// Converts an Anthropic-style JSON Schema to a Gemini responseSchema:
// - union types like ["string","null"] → { type: "STRING", nullable: true }
// - JSON Schema type names → OpenAPI upper-case type names
// - drops keys Gemini doesn't accept (additionalProperties, etc.)
type AnySchema = Record<string, unknown>;

const TYPE_MAP: Record<string, string> = {
  string: "STRING",
  number: "NUMBER",
  integer: "INTEGER",
  boolean: "BOOLEAN",
  object: "OBJECT",
  array: "ARRAY",
};

function toGeminiSchema(schema: AnySchema): AnySchema {
  const out: AnySchema = {};
  let type = schema.type;
  let nullable = false;

  if (Array.isArray(type)) {
    nullable = type.includes("null");
    type = type.find((t) => t !== "null");
  }
  if (typeof type === "string") out.type = TYPE_MAP[type] ?? type.toUpperCase();
  if (nullable) out.nullable = true;

  if (schema.description) out.description = schema.description;
  if (schema.enum) out.enum = schema.enum;

  if (schema.properties && typeof schema.properties === "object") {
    const props: AnySchema = {};
    for (const [k, v] of Object.entries(schema.properties as AnySchema)) {
      props[k] = toGeminiSchema(v as AnySchema);
    }
    out.properties = props;
  }
  if (schema.required) out.required = schema.required;
  if (schema.items) out.items = toGeminiSchema(schema.items as AnySchema);

  return out;
}

export interface GeminiMessage {
  role: "user" | "model";
  content: string;
}

export interface GeminiCallOptions {
  systemPrompt: string;
  taskInstruction: string;
  schema: AnySchema;
  messages?: GeminiMessage[];
  maxTokens?: number;
}

/** Single structured call. Returns the validated JSON as `T`. */
export async function geminiCall<T>(opts: GeminiCallOptions): Promise<T> {
  const key = process.env.GEMINI_API_KEY as string;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`;

  const contents = [
    ...(opts.messages ?? []).map((m) => ({ role: m.role, parts: [{ text: m.content }] })),
    { role: "user" as const, parts: [{ text: opts.taskInstruction }] },
  ];

  const body = {
    systemInstruction: { parts: [{ text: opts.systemPrompt }] },
    contents,
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: opts.maxTokens ?? 4000,
      responseMimeType: "application/json",
      responseSchema: toGeminiSchema(opts.schema),
      // 2.5-flash is a thinking model; reasoning tokens would eat the output budget
      // and truncate the JSON. We want fast structured output, so disable thinking.
      thinkingConfig: { thinkingBudget: 0 },
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Gemini ${res.status}: ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Gemini returned no content");
  }
  return JSON.parse(text) as T;
}
