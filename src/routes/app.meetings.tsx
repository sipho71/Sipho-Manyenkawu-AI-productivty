import { createFileRoute } from "@tanstack/react-router";
import { Mic, Sparkles, ClipboardList } from "lucide-react";

import { AiNotice, PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

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

const resultSections = [
  {
    label: "Summary",
    items: ["Placeholder: a concise recap of what the meeting covered and concluded."],
  },
  {
    label: "Key decisions",
    items: [
      "Placeholder: decision 1 recorded from the notes.",
      "Placeholder: decision 2 recorded from the notes.",
    ],
  },
  {
    label: "Action items",
    items: ["Placeholder: owner — task to complete.", "Placeholder: owner — task to complete."],
  },
  { label: "Deadlines", items: ["Placeholder: milestone and target date."] },
  { label: "Unresolved issues", items: ["Placeholder: open question needing follow-up."] },
];

function MeetingsPage() {
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
            <CardDescription>Paste your raw notes — structure comes later.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="meeting-title">Meeting title</Label>
                <Input id="meeting-title" placeholder="e.g. Weekly product sync" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meeting-date">Date</Label>
                <Input id="meeting-date" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="participants">Participants</Label>
              <Input id="participants" placeholder="e.g. Sipho, Nandi, Thabo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Meeting notes</Label>
              <Textarea
                id="notes"
                rows={14}
                placeholder="Paste the full meeting notes or transcript here..."
              />
            </div>
            <Button size="lg" className="w-full" disabled>
              <Sparkles className="size-4" /> Analyze Meeting
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              AI analysis connects in a later stage.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base">Analysis</CardTitle>
              <CardDescription>Example output structure.</CardDescription>
            </div>
            <Badge variant="secondary">Placeholder</Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            {resultSections.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2">
                  <ClipboardList className="size-4 text-primary" />
                  <h3 className="text-sm font-semibold">{s.label}</h3>
                </div>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <AiNotice />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
