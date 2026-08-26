import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Sparkles, FileText, Loader2, Copy } from "lucide-react";

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

const title = "Smart Email — WorkMate AI";
const description =
  "Generate professional emails based on recipient, purpose, context, tone and length with WorkMate AI.";

export const Route = createFileRoute("/app/smart-email")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SmartEmailPage,
});

function SmartEmailPage() {
  const { run, data, error, isLoading } = useAiAction("smart-email");
  const [form, setForm] = useState({
    recipient: "",
    purpose: "",
    context: "",
    tone: "professional",
    length: "medium",
  });

  const canSubmit = form.recipient.trim() !== "" && form.purpose.trim() !== "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    void run(form);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Mail}
        title="Smart Email"
        description="Generate professional emails based on context, audience and tone."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Email brief</CardTitle>
            <CardDescription>
              Tell WorkMate who it&apos;s for and what it must achieve.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient / audience</Label>
                <Input
                  id="recipient"
                  placeholder="e.g. Hiring manager at a design agency"
                  value={form.recipient}
                  onChange={(e) => setForm((f) => ({ ...f, recipient: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input
                  id="purpose"
                  placeholder="e.g. Follow up after an interview"
                  value={form.purpose}
                  onChange={(e) => setForm((f) => ({ ...f, purpose: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="context">Context</Label>
                <Textarea
                  id="context"
                  rows={6}
                  maxLength={5000}
                  placeholder="Background details, names, dates, key points to include..."
                  value={form.context}
                  onChange={(e) => setForm((f) => ({ ...f, context: e.target.value }))}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select
                    value={form.tone}
                    onValueChange={(v) => setForm((f) => ({ ...f, tone: v }))}
                  >
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Professional",
                        "Friendly",
                        "Formal",
                        "Persuasive",
                        "Apologetic",
                        "Direct",
                      ].map((t) => (
                        <SelectItem key={t} value={t.toLowerCase()}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length</Label>
                  <Select
                    value={form.length}
                    onValueChange={(v) => setForm((f) => ({ ...f, length: v }))}
                  >
                    <SelectTrigger id="length">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Short", "Medium", "Detailed"].map((l) => (
                        <SelectItem key={l} value={l.toLowerCase()}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={!canSubmit || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" /> Generate Email
                  </>
                )}
              </Button>
              {!canSubmit ? (
                <p className="text-center text-xs text-muted-foreground">
                  Add a recipient and a purpose to generate an email.
                </p>
              ) : null}
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preview</CardTitle>
            <CardDescription>Your generated email appears here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? <AiError message={error} /> : null}

            {isLoading && !data ? (
              <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-14 text-sm text-muted-foreground">
                <Loader2 className="mr-2 size-4 animate-spin" /> Writing your email...
              </div>
            ) : null}

            {data ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Subject
                  </p>
                  <p className="mt-1 font-medium">{data.subject}</p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{data.body}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    void navigator.clipboard.writeText(`${data.subject}\n\n${data.body}`)
                  }
                >
                  <Copy className="size-4" /> Copy email
                </Button>
              </div>
            ) : null}

            {!data && !isLoading && !error ? (
              <EmptyState
                icon={FileText}
                title="No email generated yet"
                description="Fill in the brief and generate an email to see the draft preview here."
              />
            ) : null}

            <AiNotice />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
