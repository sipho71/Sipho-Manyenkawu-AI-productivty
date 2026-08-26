import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Sparkles, Loader2 } from "lucide-react";

import { AiNotice, EmptyState, PageHeader } from "@/components/page-header";
import { AiError } from "@/components/ai-error";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAiAction } from "@/hooks/use-ai-action";

const title = "Task Planner — WorkMate AI";
const description =
  "Turn goals into structured, prioritized plans with deadlines, effort and clear status tracking.";

export const Route = createFileRoute("/app/tasks")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: TasksPage,
});

const priorityVariant = (p: string) => {
  const v = p.toLowerCase();
  return v === "high" ? "destructive" : v === "medium" ? "default" : "secondary";
};

function TasksPage() {
  const { run, data, error, isLoading } = useAiAction("task-planner");
  const [form, setForm] = useState({
    goal: "",
    available_hours_per_week: "",
    deadline: "",
    priority: "high",
  });

  const canSubmit = form.goal.trim().length > 5;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    void run(form);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={ListChecks}
        title="Task Planner"
        description="Turn goals into structured and prioritized plans."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Plan setup</CardTitle>
            <CardDescription>Describe the goal and your real constraints.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="goal">Goal</Label>
                <Textarea
                  id="goal"
                  rows={4}
                  maxLength={2000}
                  placeholder="e.g. Land a junior data analyst role"
                  value={form.goal}
                  onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hours">Available hours / week</Label>
                  <Input
                    id="hours"
                    type="number"
                    min={1}
                    max={80}
                    placeholder="e.g. 10"
                    value={form.available_hours_per_week}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, available_hours_per_week: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={form.priority}
                  onValueChange={(v) => setForm((f) => ({ ...f, priority: v }))}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {["High", "Medium", "Low"].map((p) => (
                      <SelectItem key={p} value={p.toLowerCase()}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={!canSubmit || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" /> Generate Plan
                  </>
                )}
              </Button>
              {!canSubmit ? (
                <p className="text-center text-xs text-muted-foreground">
                  Describe your goal to generate a plan.
                </p>
              ) : null}
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Task list</CardTitle>
            <CardDescription>Your generated plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? <AiError message={error} /> : null}

            {isLoading && !data ? (
              <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-14 text-sm text-muted-foreground">
                <Loader2 className="mr-2 size-4 animate-spin" /> Building your plan...
              </div>
            ) : null}

            {data?.tasks?.length ? (
              <div className="overflow-x-auto rounded-xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.tasks.map((t, i) => (
                      <TableRow key={`${t.task}-${i}`}>
                        <TableCell className="font-medium">{t.task}</TableCell>
                        <TableCell>
                          <Badge variant={priorityVariant(t.priority)}>{t.priority}</Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {t.deadline}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {t.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : null}

            {!data && !isLoading && !error ? (
              <EmptyState
                icon={ListChecks}
                title="No plan yet"
                description="Add a goal, hours and deadline, then generate a prioritized plan."
              />
            ) : null}

            <AiNotice />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
