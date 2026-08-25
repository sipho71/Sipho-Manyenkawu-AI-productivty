import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Sparkles } from "lucide-react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const planTasks = [
  { task: "Define target roles and companies", priority: "High", deadline: "26 Aug", status: "In progress" },
  { task: "Rewrite CV summary and skills", priority: "High", deadline: "27 Aug", status: "Not started" },
  { task: "Prepare 5 interview stories", priority: "Medium", deadline: "29 Aug", status: "Not started" },
  { task: "Reach out to 10 contacts", priority: "Medium", deadline: "31 Aug", status: "Not started" },
  { task: "Review and refine portfolio", priority: "Low", deadline: "2 Sep", status: "Done" },
];

const priorityVariant = (p: string) =>
  p === "High" ? "destructive" : p === "Medium" ? "default" : "secondary";

function TasksPage() {
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
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="goal">Goal</Label>
              <Textarea id="goal" rows={4} placeholder="e.g. Land a junior data analyst role" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hours">Available hours / week</Label>
                <Input id="hours" type="number" min={1} max={80} placeholder="e.g. 10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
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
            <Button size="lg" className="w-full" disabled>
              <Sparkles className="size-4" /> Generate Plan
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              AI planning connects in a later stage.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base">Task list</CardTitle>
              <CardDescription>Example plan output.</CardDescription>
            </div>
            <Badge variant="secondary">Placeholder</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
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
                  {planTasks.map((t) => (
                    <TableRow key={t.task}>
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
            <AiNotice />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
