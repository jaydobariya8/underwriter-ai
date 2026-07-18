import Anthropic from "@anthropic-ai/sdk";
import { MODEL } from "./config";

let client: Anthropic | null = null;

export function getAnthropic(): Anthropic {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export interface ToolCallOptions {
  systemPrompt: string;
  taskInstruction: string;
  toolName: string;
  toolSchema: Record<string, unknown>;
  messages?: Anthropic.MessageParam[];
  maxTokens?: number;
}

/**
 * Single tool-forced call. Returns the validated tool input as `T`.
 * - System prompt (block A) is cached (ephemeral) — the ~50k-token IP prompt is
 *   billed once per 5-min window, then read from cache. Keeps live latency low.
 * - tool_choice forces the model to emit our exact JSON schema — no markdown parsing.
 */
export async function toolCall<T>(opts: ToolCallOptions): Promise<T> {
  const anthropic = getAnthropic();

  const messages: Anthropic.MessageParam[] = [
    ...(opts.messages ?? []),
    { role: "user", content: opts.taskInstruction },
  ];

  const res = await anthropic.messages.create({
    model: MODEL,
    max_tokens: opts.maxTokens ?? 3000,
    temperature: 0.2,
    system: [
      {
        type: "text",
        text: opts.systemPrompt,
        cache_control: { type: "ephemeral" },
      },
    ],
    tools: [
      {
        name: opts.toolName,
        description: `Emit the structured output. You MUST call ${opts.toolName}.`,
        input_schema: opts.toolSchema as Anthropic.Tool.InputSchema,
      },
    ],
    tool_choice: { type: "tool", name: opts.toolName },
    messages,
  });

  const block = res.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
  );
  if (!block) {
    throw new Error(`Model did not call tool ${opts.toolName}`);
  }
  return block.input as T;
}
