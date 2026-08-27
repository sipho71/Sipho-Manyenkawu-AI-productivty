import type { AiAction } from "./ai-types";

const GEMINI_MODEL = "gemini-3.6-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const JSON_RULE =
  "Return ONLY valid minified JSON matching the described shape. No markdown, no code fences, no commentary.";

const SYSTEM_INSTRUCTIONS: Record<AiAction, string> = {
  "smart-email": [
    "You are a professional workplace writing assistant.",
    "Write a clear, well-structured email using the provided recipient/audience, purpose, context, tone and length.",
    "Respect the requested tone and length exactly. Never invent facts, names, dates or commitments that are not in the context; omit them or use a neutral placeholder like [detail] instead.",
    JSON_RULE,
    'Shape: {"subject": string, "body": string}. The body must be plain text with line breaks between paragraphs and include a greeting and sign-off.',
  ].join(" "),
  "meeting-intelligence": [
    "You are a meeting analyst. Read the meeting notes and extract only what the notes actually state.",
    'Never invent an owner or deadline that is not stated: use "unassigned" for a missing owner and "not specified" for a missing deadline.',
    "If something is unclear or unfinished, list it under unresolved issues rather than guessing.",
    JSON_RULE,
    'Shape: {"summary": string, "key_decisions": string[], "action_items": [{"task": string, "owner": string, "deadline": string}], "unresolved_issues": string[]}.',
  ].join(" "),
  "task-planner": [
    "You are a pragmatic planning assistant. Turn the goal into a realistic, ordered and prioritized task list that fits the stated available hours per week and deadline.",
    'Priority must be one of "High", "Medium" or "Low". Deadlines must fall on or before the stated deadline when one is given; otherwise use "not specified".',
    'Every task status must be exactly "not started".',
    JSON_RULE,
    'Shape: {"tasks": [{"task": string, "priority": string, "deadline": string, "status": string}]}. Produce between 4 and 12 tasks.',
  ].join(" "),
  "research-assistant": [
    "You are a research assistant helping a professional understand a topic quickly, at the requested depth level.",
    "Be balanced and explicit about uncertainty. You have no live web access, so never fabricate citations, links, statistics or sources.",
    "The sources array MUST be empty.",
    JSON_RULE,
    'Shape: {"summary": string, "key_insights": string[], "recommendations": string[], "sources": []}.',
  ].join(" "),
  "workmate-chat": [
    "You are WorkMate, a helpful, concise and practical workplace assistant for students, job seekers, employees, professionals and small-business owners.",
    "Answer conversationally in plain text. Be specific and actionable, use short paragraphs or short lists, and say clearly when you are unsure.",
    "Do not invent facts about the user's company, colleagues or data.",
  ].join(" "),
};

function buildUserPrompt(action: AiAction, payload: Record<string, unknown>): string {
  if (action === "workmate-chat") {
    const history = Array.isArray(payload["history"]) ? payload["history"] : [];
    const transcript = history
      .map((m) => {
        const msg = m as { role?: string; text?: string };
        return `${msg.role === "assistant" ? "WorkMate" : "User"}: ${msg.text ?? ""}`;
      })
      .join("\n");
    const message = String(payload["message"] ?? "");
    return transcript
      ? `Conversation so far:\n${transcript}\n\nUser: ${message}`
      : `User: ${message}`;
  }

  const lines = Object.entries(payload)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(([k, v]) => `${k.replace(/_/g, " ")}: ${String(v).trim()}`);

  return lines.length ? lines.join("\n") : "No details provided.";
}

function extractJson(text: string): unknown {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error("Model returned unparsable JSON");
  }
}

export async function runGemini(action: AiAction, payload: Record<string, unknown>) {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");

  const wantsJson = action !== "workmate-chat";

  const response = await fetch(GEMINI_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_INSTRUCTIONS[action] }] },
      contents: [{ role: "user", parts: [{ text: buildUserPrompt(action, payload) }] }],
      generationConfig: {
        temperature: action === "workmate-chat" ? 0.7 : 0.4,
        ...(wantsJson ? { responseMimeType: "application/json" } : {}),
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error(`Gemini request failed (${response.status}): ${detail.slice(0, 500)}`);
    throw new Error(`Gemini request failed with status ${response.status}`);
  }

  const json = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  if (!text.trim()) throw new Error("Gemini returned an empty response");

  if (!wantsJson) return { reply: text.trim() };
  return extractJson(text) as Record<string, unknown>;
}
