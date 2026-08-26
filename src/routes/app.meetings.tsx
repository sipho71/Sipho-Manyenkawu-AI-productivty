import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mic, Sparkles, ClipboardList, Loader2 } from "lucide-react";

import { AiNotice, EmptyState, PageHeader } from "@/components/page-header";
import { AiError } from "@/components/ai-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAiAction } from "@/hooks/use-ai-action";

const title = "Meeting Intelligence — WorkMate AI";
const description =
  "Turn meeting notes into summaries, key decisions, action items, deadlines and unresolved issues.";

export const Route = createFileRoute("/app/meetings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: MeetingsPage,
});

function List({ items }: { items: string[] }) {
  if (!items?.length) return <p className="mt-2 text-sm text-muted-foreground">None recorded.</p>;
  return (
    <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
      {items.map((it) => (
        <li key={it} className="flex gap-2">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
          {it}
        </li>
      ))}
    </ul>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <div className="flex items-center gap-2">
        <ClipboardList className="size-4 text-primary" />
        <h3 className="text-sm font-semibold">{label}</h3>
      </div>
      {children}
    </div>
  );
}

function MeetingsPage() {
  const { run, data, error, isLoading } = useAiAction("meeting-intelligence");
  const [form, setForm] = useState({
    meeting_title: "",
    date: "",
    participants: "",
    notes: "",
  });

  const canSubmit = form.notes.trim().length > 20;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    void run(form);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Mic}
        title="Meeting Intelligence"
        description="Turn meeting notes into summaries, decisions and actionable tasks."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Meeting details</CardTitle>
            <CardDescription>Paste your raw notes — WorkMate adds the structure.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="meeting-title">Meeting title</Label>
                  <Input
                    id="meeting-title"
                    placeholder="e.g. Weekly product sync"
                    value={form.meeting_title}
                    onChange={(e) => setForm((f) => ({ ...f, meeting_title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-date">Date</Label>
                  <Input
                    id="meeting-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="participants">Participants</Label>
                <Input
                  id="participants"
                  placeholder="e.g. Sipho, Nandi, Thabo"
                  value={form.participants}
                  onChange={(e) => setForm((f) => ({ ...f, participants: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Meeting notes</Label>
                <Textarea
                  id="notes"
                  rows={14}
                  maxLength={20000}
                  placeholder="Paste the full meeting notes or transcript here..."
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={!canSubmit || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" /> Analyze Meeting
                  </>
                )}
              </Button>
              {!canSubmit ? (
                <p className="text-center text-xs text-muted-foreground">
                  Paste your meeting notes to run an analysis.
                </p>
              ) : null}
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Analysis</CardTitle>
            <CardDescription>Only what your notes actually state.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? <AiError message={error} /> : null}

            {isLoading && !data ? (
              <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-14 text-sm text-muted-foreground">
                <Loader2 className="mr-2 size-4 animate-spin" /> Reading your notes...
              </div>
            ) : null}

            {data ? (
              <div className="space-y-4">
                <Section label="Summary">
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {data.summary}
                  </p>
                </Section>
                <Section label="Key decisions">
                  <List items={data.key_decisions ?? []} />
                </Section>
                <Section label="Action items">
                  {data.action_items?.length ? (
                    <ul className="mt-2 space-y-2 text-sm">
                      {data.action_items.map((a, i) => (
                        <li key={`${a.task}-${i}`} className="rounded-lg border border-border bg-card p-3">
                          <p className="font-medium">{a.task}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Owner: {a.owner} · Deadline: {a.deadline}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">None recorded.</p>
                  )}
                </Section>
                <Section label="Unresolved issues">
                  <List items={data.unresolved_issues ?? []} />
                </Section>
              </div>
            ) : null}

            {!data && !isLoading && !error ? (
              <EmptyState
                icon={ClipboardList}
                title="No analysis yet"
                description="Add your meeting notes and run an analysis to see summary, decisions and action items."
              />
            ) : null}

            <AiNotice />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
