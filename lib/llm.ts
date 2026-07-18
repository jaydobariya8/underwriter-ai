import { PROVIDER } from "./config";
import { geminiCall } from "./gemini";
import { toolCall } from "./anthropic";

export interface LlmMessage {
  role: "user" | "assistant";
  content: string;
}

export interface StructuredCallOptions {
  systemPrompt: string;
  taskInstruction: string;
  toolName: string;
  schema: Record<string, unknown>;
  messages?: LlmMessage[];
  maxTokens?: number;
}

/**
 * Provider-agnostic structured call. Returns validated JSON as `T`.
 * Gemini uses responseSchema (free, AI Studio); Anthropic uses tool-forcing.
 */
export async function structuredCall<T>(opts: StructuredCallOptions): Promise<T> {
  if (PROVIDER === "gemini") {
    return geminiCall<T>({
      systemPrompt: opts.systemPrompt,
      taskInstruction: opts.taskInstruction,
      schema: opts.schema,
      messages: opts.messages?.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        content: m.content,
      })),
      maxTokens: opts.maxTokens,
    });
  }

  return toolCall<T>({
    systemPrompt: opts.systemPrompt,
    taskInstruction: opts.taskInstruction,
    toolName: opts.toolName,
    toolSchema: opts.schema,
    messages: opts.messages,
    maxTokens: opts.maxTokens,
  });
}
