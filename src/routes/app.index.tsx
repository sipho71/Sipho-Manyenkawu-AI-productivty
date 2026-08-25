import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  Mic,
  ListChecks,
  BookOpen,
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles,
  CalendarCheck,
  Clock,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AiNotice } from "@/components/page-header";

const title = "Dashboard — WorkMate AI";
const description =
  "Your WorkMate AI workspace overview: AI tools, recent activity, today's tasks and productivity summary.";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Dashboard,
});

const featureCards = [
  {
    icon: Mail,
    name: "Smart Email",
    text: "Generate professional emails based on context, audience and tone.",
    to: "/app/smart-email" as const,
    action: "Draft email",
  },
  {
    icon: Mic,
    name: "Meeting Intelligence",
    text: "Turn meeting notes into summaries, decisions and actionable tasks.",
    to: "/app/meetings" as const,
    action: "Analyze meeting",
  },
  {
    icon: ListChecks,
    name: "Task Planner",
    text: "Turn goals into structured and prioritized plans.",
    to: "/app/tasks" as const,
    action: "Build a plan",
  },
  {
    icon: BookOpen,
    name: "Research Assistant",
    text: "Understand complex information faster with AI-powered research.",
    to: "/app/research" as const,
    action: "Start research",
  },
  {
    icon: MessageSquare,
    name: "WorkMate Chat",
    text: "Ask an AI workplace assistant for help with professional tasks.",
    to: "/app/chat" as const,
    action: "Open chat",
  },
];

const activity = [
  { icon: Mail, title: "Follow-up email to client — draft", meta: "Smart Email · 2 hours ago" },
  { icon: Mic, title: "Weekly product sync — summary", meta: "Meeting Intelligence · Yesterday" },
  { icon: ListChecks, title: "Q3 onboarding plan", meta: "Task Planner · Yesterday" },
  { icon: BookOpen, title: "Market overview: fintech SMEs", meta: "Research Assistant · 2 days ago" },
];

const tasks = [
  { label: "Send updated proposal to Nandi", due: "Today · 14:00", priority: "High", done: false },
  { label: "Review meeting action items", due: "Today · 16:30", priority: "Medium", done: false },
  { label: "Prepare interview answers", due: "Today", priority: "Medium", done: true },
  { label: "Update CV summary section", due: "Today", priority: "Low", done: false },
];

const stats = [
  { icon: CheckCircle2, label: "Tasks completed", value: "18", sub: "this week" },
  { icon: Sparkles, label: "AI interactions", value: "64", sub: "this week" },
  { icon: CalendarCheck, label: "Meetings processed", value: "7", sub: "this week" },
  { icon: Clock, label: "Time saved", value: "5h 20m", sub: "estimated" },
];

const priorityVariant = (p: string) =>
  p === "High" ? "destructive" : p === "Medium" ? "default" : "secondary";

function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Good afternoon 👋</h1>
        <p className="mt-2 text-muted-foreground">What would you like to accomplish today?</p>
      </div>

      {/* AI assistant input */}
      <Card className="border-primary/20 shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Sparkles className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
              <Input
                aria-label="Ask WorkMate anything"
                placeholder="Ask WorkMate anything..."
                className="h-12 pl-9 text-base"
              />
            </div>
            <Button asChild size="lg" className="sm:w-auto">
              <Link to="/app/chat">
                <Send className="size-4" /> Ask WorkMate
              </Link>
            </Button>
          </div>
          <div className="mt-4">
            <AiNotice />
          </div>
        </CardContent>
      </Card>

      {/* Feature cards */}
      <section>
        <h2 className="text-lg font-semibold">Your AI tools</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((f) => (
            <Card
              key={f.name}
              className="flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <CardHeader>
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft">
                  <f.icon className="size-5 text-primary" />
                </span>
                <CardTitle className="mt-3 text-base">{f.name}</CardTitle>
                <CardDescription className="leading-relaxed">{f.text}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="secondary" className="w-full">
                  <Link to={f.to}>
                    {f.action} <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Your latest work across WorkMate AI.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activity.map((a) => (
              <div
                key={a.title}
                className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <a.icon className="size-4 text-secondary-foreground" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.meta}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today&apos;s Tasks</CardTitle>
            <CardDescription>Example tasks — planning data connects later.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((t, i) => (
              <div
                key={t.label}
                className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
              >
                <Checkbox id={`task-${i}`} defaultChecked={t.done} />
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor={`task-${i}`}
                    className={`block truncate text-sm font-medium ${t.done ? "text-muted-foreground line-through" : ""}`}
                  >
                    {t.label}
                  </label>
                  <p className="text-xs text-muted-foreground">{t.due}</p>
                </div>
                <Badge variant={priorityVariant(t.priority)}>{t.priority}</Badge>
              </div>
            ))}
            <Button asChild variant="ghost" className="w-full">
              <Link to="/app/tasks">Open Task Planner</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-lg font-semibold">Productivity summary</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <s.icon className="size-4 text-primary" />
                </div>
                <p className="mt-3 font-display text-2xl font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
