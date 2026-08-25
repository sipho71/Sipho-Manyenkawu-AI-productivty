import { createFileRoute } from "@tanstack/react-router";
import { Mail, Sparkles, FileText } from "lucide-react";

import { AiNotice, EmptyState, PageHeader } from "@/components/page-header";
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
            <CardDescription>Tell WorkMate who it&apos;s for and what it must achieve.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient / audience</Label>
              <Input id="recipient" placeholder="e.g. Hiring manager at a design agency" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Input id="purpose" placeholder="e.g. Follow up after an interview" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="context">Context</Label>
              <Textarea
                id="context"
                rows={6}
                placeholder="Background details, names, dates, key points to include..."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Professional", "Friendly", "Formal", "Persuasive", "Apologetic", "Direct"].map(
                      (t) => (
                        <SelectItem key={t} value={t.toLowerCase()}>
                          {t}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Length</Label>
                <Select>
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
            <Button size="lg" className="w-full" disabled>
              <Sparkles className="size-4" /> Generate Email
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              AI generation connects in a later stage.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preview</CardTitle>
            <CardDescription>Your generated email will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <EmptyState
              icon={FileText}
              title="No email generated yet"
              description="Fill in the brief and generate an email to see the draft preview here."
            />
            <AiNotice />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
