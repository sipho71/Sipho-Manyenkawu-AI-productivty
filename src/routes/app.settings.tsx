import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings as SettingsIcon, ShieldCheck, LogOut } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const title = "Settings — WorkMate AI";
const description =
  "Manage your WorkMate AI profile, default AI tone and response length, and account preferences.";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={SettingsIcon}
        title="Settings"
        description="Control your profile, defaults and account."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
            <CardDescription>How you appear inside your workspace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Sipho Ndlovu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="sipho@workmate.ai" />
            </div>
            <Button disabled>Save profile</Button>
            <p className="text-xs text-muted-foreground">Saving connects in a later stage.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preferences</CardTitle>
            <CardDescription>Defaults applied across AI tools.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="default-tone">Default AI tone</Label>
              <Select defaultValue="professional">
                <SelectTrigger id="default-tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {["Professional", "Friendly", "Formal", "Direct"].map((t) => (
                    <SelectItem key={t} value={t.toLowerCase()}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-length">Default response length</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="default-length">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="size-4 text-primary" /> Responsible AI
            </CardTitle>
            <CardDescription>Your accountability, our assistance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              WorkMate AI produces drafts and suggestions. Output can be incomplete, outdated or
              incorrect, and it may not reflect your organisation&apos;s policies.
            </p>
            <p>
              Review, verify and edit all AI-generated content before using it in professional
              communication or decisions. You remain the author and the responsible party.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account</CardTitle>
            <CardDescription>Session and access.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Signed in as <span className="font-medium text-foreground">sipho@workmate.ai</span>
            </p>
            <Separator />
            <Button asChild variant="destructive">
              <Link to="/login">
                <LogOut className="size-4" /> Log out
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
