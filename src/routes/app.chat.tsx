import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Send, Plus, Sparkles, Loader2 } from "lucide-react";

import { AiNotice, PageHeader } from "@/components/page-header";
import { AiError } from "@/components/ai-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAiAction } from "@/hooks/use-ai-action";

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

type Message = { role: "user" | "assistant"; text: string };

function ChatPage() {
  const { run, error, isLoading, reset } = useAiAction("workmate-chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = input.trim();
    if (!message || isLoading) return;

    const history = messages.slice(-10);
    setMessages((m) => [...m, { role: "user", text: message }]);
    setInput("");

    const result = await run({ message, history });
    if (result?.reply) {
      setMessages((m) => [...m, { role: "assistant", text: result.reply }]);
    }
  };

  const newConversation = () => {
    setMessages([]);
    setInput("");
    reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={MessageSquare}
        title="WorkMate Chat"
        description="Ask an AI workplace assistant for help with professional tasks."
        actions={
          <Button variant="outline" onClick={newConversation}>
            <Plus className="size-4" /> New conversation
          </Button>
        }
      />

      <Card className="flex h-[62vh] min-h-[420px] flex-col overflow-hidden">
        <CardContent className="flex-1 space-y-4 overflow-y-auto pt-6">
          {messages.length === 0 && !isLoading ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="bg-accent-gradient mb-3 flex size-11 items-center justify-center rounded-xl">
                <Sparkles className="size-5 text-primary-foreground" />
              </span>
              <p className="font-medium">Ask WorkMate anything</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Draft a message, prepare for a meeting, or think through a work problem.
              </p>
            </div>
          ) : null}

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
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-card ${
                  m.role === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md border border-border bg-card"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> WorkMate is thinking...
            </div>
          ) : null}
        </CardContent>

        <div className="space-y-3 border-t border-border bg-muted/30 p-4">
          {error ? <AiError message={error} /> : null}
          <form onSubmit={send} className="flex gap-2">
            <Input
              aria-label="Message WorkMate"
              placeholder="Ask WorkMate anything..."
              className="h-11"
              maxLength={4000}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" size="lg" disabled={isLoading || input.trim() === ""}>
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              <span className="sr-only sm:not-sr-only">Send</span>
            </Button>
          </form>
          <AiNotice />
        </div>
      </Card>
    </div>
  );
}
