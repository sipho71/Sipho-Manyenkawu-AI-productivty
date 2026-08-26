import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  action: z.enum([
    "smart-email",
    "meeting-intelligence",
    "task-planner",
    "research-assistant",
    "workmate-chat",
  ]),
  payload: z.record(z.unknown()),
});

export const aiPipeline = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const { runGemini } = await import("./ai.server");
    const result = await runGemini(data.action, data.payload as Record<string, unknown>);
    // Serialized as JSON so the RPC boundary stays strictly serializable.
    return { action: data.action, json: JSON.stringify(result) };
  });
