import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Sparkles, Lightbulb, Target, Link2 } from "lucide-react";

import { AiNotice, PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

function ResearchPage() {
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
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="question">Research question</Label>
              <Textarea
                id="question"
                rows={4}
                placeholder="e.g. What skills matter most for entry-level data roles in 2026?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic / context</Label>
              <Input id="topic" placeholder="e.g. South African job market, career switchers" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="depth">Research depth</Label>
              <Select>
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
            <Button size="lg" className="w-full" disabled>
              <Sparkles className="size-4" /> Generate Research
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              AI research connects in a later stage. Live web research is not enabled.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base">Research output</CardTitle>
              <CardDescription>Example output structure.</CardDescription>
            </div>
            <Badge variant="secondary">Placeholder</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <section className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-primary" />
                <h3 className="text-sm font-semibold">Summary</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Placeholder: a plain-language overview of the topic, scoped to your question and
                context.
              </p>
            </section>

            <section className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="size-4 text-primary" />
                <h3 className="text-sm font-semibold">Key insights</h3>
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {["Placeholder insight one.", "Placeholder insight two.", "Placeholder insight three."].map(
                  (i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
                      {i}
                    </li>
                  ),
                )}
              </ul>
            </section>

            <section className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-2">
                <Target className="size-4 text-primary" />
                <h3 className="text-sm font-semibold">Recommendations</h3>
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {["Placeholder recommended next step.", "Placeholder recommended next step."].map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
                    {i}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-dashed border-border p-4">
              <div className="flex items-center gap-2">
                <Link2 className="size-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Sources</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Sources will be listed here once research is connected.
              </p>
            </section>

            <AiNotice />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
