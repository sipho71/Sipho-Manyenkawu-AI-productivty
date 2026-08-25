import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const title = "Sign up — WorkMate AI";
const description =
  "Create your WorkMate AI account and bring email, meetings, planning and research into one workspace.";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SignupPage,
});

const schema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name").max(100),
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email address").max(255),
    password: z.string().min(8, "Password must be at least 8 characters").max(128),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const fields = [
  { key: "name", label: "Full name", type: "text", placeholder: "Sipho Ndlovu", autoComplete: "name" },
  { key: "email", label: "Email", type: "email", placeholder: "you@company.com", autoComplete: "email" },
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "At least 8 characters",
    autoComplete: "new-password",
  },
  {
    key: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Re-enter your password",
    autoComplete: "new-password",
  },
] as const;

function SignupPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    navigate({ to: "/app" });
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start working smarter with WorkMate AI."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        {fields.map((f) => (
          <div key={f.key} className="space-y-2">
            <Label htmlFor={f.key}>{f.label}</Label>
            <Input
              id={f.key}
              type={f.type}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              value={values[f.key]}
              aria-invalid={!!errors[f.key]}
              aria-describedby={errors[f.key] ? `${f.key}-error` : undefined}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
            />
            {errors[f.key] ? (
              <p id={`${f.key}-error`} className="text-xs text-destructive">
                {errors[f.key]}
              </p>
            ) : null}
          </div>
        ))}

        <Button type="submit" className="w-full" size="lg">
          Create account
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Secure account creation will be connected in a later stage.
        </p>
      </form>
    </AuthShell>
  );
}
