import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function PageHeader({
  icon: Icon,
  title,
  description,
  actions,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        {Icon ? (
          <span className="bg-accent-gradient hidden size-11 shrink-0 items-center justify-center rounded-xl sm:flex">
            <Icon className="size-5 text-primary-foreground" />
          </span>
        ) : null}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 py-14 text-center">
      <span className="mb-3 flex size-11 items-center justify-center rounded-full bg-background shadow-card">
        <Icon className="size-5 text-muted-foreground" />
      </span>
      <p className="font-medium">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function AiNotice({ children }: { children?: ReactNode }) {
  return (
    <p className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
      {children ??
        "AI-generated content can be inaccurate. Review and edit before using it professionally."}
    </p>
  );
}
