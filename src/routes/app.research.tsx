import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Sparkles, Lightbulb, Target, Link2, Loader2 } from "lucide-react";

import { AiNotice, EmptyState, PageHeader } from "@/components/page-header";
import { AiError } from "@/components/ai-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAiAction } from "@/hooks/use-ai-action";

const title = "Research Assistant — WorkMate AI";
const description =
  "Understand complex information faster with structured AI research summaries, insights and recommendations.";

export const Route = createFileRoute("/app/research")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ResearchPage,
});

function Bullets({ items }: { items: string[] }) {
  if (!items?.length) return <p className="mt-2 text-sm text-muted-foreground">None provided.</p>;
  return (
    <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
      {items.map((i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function ResearchPage() {
  const { run, data, error, isLoading } = useAiAction("research-assistant");
  const [form, setForm] = useState({
    research_question: "",
    topic_context: "",
    depth: "balanced",
  });

  const canSubmit = form.research_question.trim().length > 8;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    void run(form);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={BookOpen}
        title="Research Assistant"
        description="Understand complex information faster with AI-powered research assistance."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Research brief</CardTitle>
            <CardDescription>Be specific — sharper questions get sharper answers.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="question">Research question</Label>
                <Textarea
                  id="question"
                  rows={4}
                  maxLength={2000}
                  placeholder="e.g. What skills matter most for entry-level data roles?"
                  value={form.research_question}
                  onChange={(e) => setForm((f) => ({ ...f, research_question: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic / context</Label>
                <Input
                  id="topic"
                  placeholder="e.g. South African job market, career switchers"
                  value={form.topic_context}
                  onChange={(e) => setForm((f) => ({ ...f, topic_context: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="depth">Research depth</Label>
                <Select
                  value={form.depth}
                  onValueChange={(v) => setForm((f) => ({ ...f, depth: v }))}
                >
                  <SelectTrigger id="depth">
                    <SelectValue placeholder="Select depth" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Quick overview", "Balanced", "In-depth"].map((d) => (
                      <SelectItem key={d} value={d.toLowerCase().replace(/\s+/g, "-")}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={!canSubmit || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Researching...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" /> Generate Research
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Live web research isn&apos;t connected, so no sources are cited.
              </p>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Research output</CardTitle>
            <CardDescription>Summary, insights and recommendations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? <AiError message={error} /> : null}

            {isLoading && !data ? (
              <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-14 text-sm text-muted-foreground">
                <Loader2 className="mr-2 size-4 animate-spin" /> Working through your question...
              </div>
            ) : null}

            {data ? (
              <>
                <section className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-4 text-primary" />
                    <h3 className="text-sm font-semibold">Summary</h3>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {data.summary}
                  </p>
                </section>

                <section className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="size-4 text-primary" />
                    <h3 className="text-sm font-semibold">Key insights</h3>
                  </div>
                  <Bullets items={data.key_insights ?? []} />
                </section>

                <section className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-2">
                    <Target className="size-4 text-primary" />
                    <h3 className="text-sm font-semibold">Recommendations</h3>
                  </div>
                  <Bullets items={data.recommendations ?? []} />
                </section>

                <section className="rounded-xl border border-dashed border-border p-4">
                  <div className="flex items-center gap-2">
                    <Link2 className="size-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Sources</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No sources — live web research isn&apos;t connected yet, so nothing is cited.
                  </p>
                </section>
              </>
            ) : null}

            {!data && !isLoading && !error ? (
              <EmptyState
                icon={BookOpen}
                title="No research yet"
                description="Ask a research question and generate a structured briefing."
              />
            ) : null}

            <AiNotice />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
