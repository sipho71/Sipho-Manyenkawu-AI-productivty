import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Send, Plus, Sparkles } from "lucide-react";

import { AiNotice, PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const title = "WorkMate Chat — WorkMate AI";
const description =
  "Ask an AI workplace assistant for help with professional tasks in a focused chat workspace.";

export const Route = createFileRoute("/app/chat")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ChatPage,
});

const messages = [
  { role: "user", text: "I need to ask my manager for a deadline extension. How should I frame it?" },
  {
    role: "assistant",
    text: "Placeholder response: lead with ownership, state the new realistic date, explain the cause briefly, and offer what you will deliver in the meantime.",
  },
  { role: "user", text: "Can you make it sound confident rather than apologetic?" },
  {
    role: "assistant",
    text: "Placeholder response: replace hedging phrases with direct commitments and keep the message to three short paragraphs.",
  },
];

function ChatPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={MessageSquare}
        title="WorkMate Chat"
        description="Ask an AI workplace assistant for help with professional tasks."
        actions={
          <Button variant="outline">
            <Plus className="size-4" /> New conversation
          </Button>
        }
      />

      <Card className="flex h-[62vh] min-h-[420px] flex-col overflow-hidden">
        <CardContent className="flex-1 space-y-4 overflow-y-auto pt-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" ? (
                <span className="bg-accent-gradient mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <Sparkles className="size-4 text-primary-foreground" />
                </span>
              ) : null}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-card ${
                  m.role === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md border border-border bg-card"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </CardContent>

        <div className="space-y-3 border-t border-border bg-muted/30 p-4">
          <div className="flex gap-2">
            <Input
              aria-label="Message WorkMate"
              placeholder="Ask WorkMate anything..."
              className="h-11"
            />
            <Button size="lg" disabled>
              <Send className="size-4" />
              <span className="sr-only sm:not-sr-only">Send</span>
            </Button>
          </div>
          <AiNotice>
            Placeholder conversation. AI responses connect in a later stage — always review AI output
            before professional use.
          </AiNotice>
        </div>
      </Card>
    </div>
  );
}
