export const AI_ACTIONS = [
  "smart-email",
  "meeting-intelligence",
  "task-planner",
  "research-assistant",
  "workmate-chat",
] as const;

export type AiAction = (typeof AI_ACTIONS)[number];

export const GENERIC_AI_ERROR = "Something went wrong — try again";

export type SmartEmailResult = { subject: string; body: string };

export type MeetingActionItem = { task: string; owner: string; deadline: string };

export type MeetingResult = {
  summary: string;
  key_decisions: string[];
  action_items: MeetingActionItem[];
  unresolved_issues: string[];
};

export type PlannedTask = {
  task: string;
  priority: string;
  deadline: string;
  status: string;
};

export type TaskPlanResult = { tasks: PlannedTask[] };

export type ResearchResult = {
  summary: string;
  key_insights: string[];
  recommendations: string[];
  sources: string[];
};

export type ChatResult = { reply: string };

export type AiResultMap = {
  "smart-email": SmartEmailResult;
  "meeting-intelligence": MeetingResult;
  "task-planner": TaskPlanResult;
  "research-assistant": ResearchResult;
  "workmate-chat": ChatResult;
};
