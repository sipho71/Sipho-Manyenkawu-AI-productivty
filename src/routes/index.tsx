import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  Mic,
  ListChecks,
  BookOpen,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Eye,
  Brain,
  CalendarClock,
  Rocket,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const title = "WorkMate AI — Work Smarter. Get More Done.";
const description =
  "WorkMate AI brings powerful AI productivity tools into one intelligent workspace: email drafting, meeting intelligence, planning, research and chat.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Mail,
    name: "Smart Email",
    text: "Generate professional emails based on context, audience and tone.",
  },
  {
    icon: Mic,
    name: "Meeting Intelligence",
    text: "Turn meeting notes into summaries, decisions and actionable tasks.",
  },
  { icon: ListChecks, name: "Task Planner", text: "Turn goals into structured and prioritized plans." },
  {
    icon: BookOpen,
    name: "Research Assistant",
    text: "Understand complex information faster with AI-powered research assistance.",
  },
  {
    icon: MessageSquare,
    name: "WorkMate Chat",
    text: "Ask an AI workplace assistant for help with professional tasks.",
  },
];

const workflow = [
  { icon: Eye, step: "Capture", text: "Bring in notes, goals, questions and context." },
  { icon: Brain, step: "Understand", text: "AI structures the messy detail into clarity." },
  { icon: CalendarClock, step: "Plan", text: "Get prioritized steps with realistic timing." },
  { icon: Rocket, step: "Act", text: "Send, share and execute with confidence." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="bg-accent-gradient flex size-8 items-center justify-center rounded-lg">
              <Sparkles className="size-4 text-primary-foreground" />
            </span>
            <span className="font-display text-base font-semibold">WorkMate AI</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#workflow" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#responsible-ai" className="transition-colors hover:text-foreground">
              Responsible AI
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-hero-gradient relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
            <div className="text-primary-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium">
                <Sparkles className="size-3.5" /> One intelligent workspace
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
                Work Smarter.
                <br />
                Get More Done.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
                WorkMate AI brings powerful AI productivity tools into one intelligent workspace.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/signup">
                    Get Started <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <a href="#features">Explore Features</a>
                </Button>
              </div>
              <p className="mt-6 text-sm text-primary-foreground/60">
                Built for students, job seekers, employees, professionals and small-business owners.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-primary-foreground/15 bg-background/95 p-5 shadow-lift">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  <span className="size-2.5 rounded-full bg-destructive/70" />
                  <span className="size-2.5 rounded-full bg-warning" />
                  <span className="size-2.5 rounded-full bg-success" />
                  <span className="ml-2 text-xs text-muted-foreground">WorkMate workspace</span>
                </div>
                <div className="mt-4 rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                  Ask WorkMate anything...
                </div>
                <div className="mt-4 space-y-3">
                  {features.slice(0, 3).map((f) => (
                    <div
                      key={f.name}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 shadow-card"
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft">
                        <f.icon className="size-4 text-primary" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">{f.name}</p>
                        <p className="text-xs text-muted-foreground">{f.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Five core capabilities, one workspace
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every tool is designed around real professional work — not novelty.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.name}
                className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <CardHeader>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft">
                    <f.icon className="size-5 text-primary" />
                  </span>
                  <CardTitle className="mt-4 text-lg">{f.name}</CardTitle>
                  <CardDescription className="leading-relaxed">{f.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section id="workflow" className="scroll-mt-20 border-y border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Capture → Understand → Plan → Act
              </h2>
              <p className="mt-4 text-muted-foreground">
                A repeatable loop that turns scattered inputs into finished work.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {workflow.map((w, i) => (
                <div
                  key={w.step}
                  className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lift"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary-soft">
                      <w.icon className="size-5 text-primary" />
                    </span>
                    <span className="font-display text-sm font-semibold text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{w.step}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Responsible AI */}
        <section id="responsible-ai" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <div className="grid items-center gap-10 rounded-2xl border border-border bg-card p-8 shadow-card sm:p-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary-soft">
                <ShieldCheck className="size-6 text-primary" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">Responsible AI</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                WorkMate AI assists your judgement — it does not replace it. AI-generated content can
                be incomplete, outdated or subtly wrong.
              </p>
              <p>
                Always review, verify and edit AI output before using it in professional
                communication, hiring decisions, client work or anything with real consequences. You
                remain the author and the accountable party.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-hero-gradient">
          <div className="mx-auto max-w-3xl px-4 py-20 text-center text-primary-foreground sm:px-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Bring your whole workday into one workspace
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Draft faster, plan clearer, decide better — starting today.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link to="/signup">
                  Get Started <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/login">I already have an account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="font-medium text-foreground">WorkMate AI</span>
          </div>
          <p>Review AI output before professional use.</p>
        </div>
      </footer>
    </div>
  );
}
