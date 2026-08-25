import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="bg-hero-gradient hidden flex-col justify-between p-12 text-primary-foreground lg:flex">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary-foreground/15">
            <Sparkles className="size-4" />
          </span>
          <span className="font-display text-base font-semibold">WorkMate AI</span>
        </Link>
        <div>
          <h2 className="max-w-sm text-3xl font-semibold leading-tight">
            Work Smarter. Get More Done.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/75">
            Email drafting, meeting intelligence, planning, research and chat — in one intelligent
            workspace.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/60">
          AI-generated content should always be reviewed before professional use.
        </p>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="bg-accent-gradient flex size-8 items-center justify-center rounded-lg">
              <Sparkles className="size-4 text-primary-foreground" />
            </span>
            <span className="font-display text-base font-semibold">WorkMate AI</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  );
}
