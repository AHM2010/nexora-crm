import type { Metadata } from "next";
import { BarChart3, CheckCircle2, Users } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { MOCK_ACCOUNTS } from "@/lib/auth/constants";
import { BrandMark } from "@/components/brand/brand-mark";

export const metadata: Metadata = {
  title: "Sign in | Nexora CRM",
  description: "Sign in to your Nexora CRM workspace.",
};

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <section className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:p-14">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 size-96 rounded-full bg-primary-foreground/5 blur-3xl"
        />
        <div className="relative flex items-center gap-3">
          <BrandMark className="size-10 rounded-xl" inverted priority />
          <span className="text-xl font-semibold tracking-tight">Nexora</span>
        </div>
        <div className="relative max-w-xl space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-medium text-primary-foreground/70">
              CUSTOMER RELATIONSHIPS, SIMPLIFIED
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
              Keep your team focused on relationships that grow revenue.
            </h1>
            <p className="max-w-lg text-base leading-7 text-primary-foreground/70">
              Manage customers, deals, and tasks from one calm, connected
              workspace built for modern teams.
            </p>
          </div>
          <ul className="grid gap-4 text-sm text-primary-foreground/85 sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Users className="size-4" />
              Customer context
            </li>
            <li className="flex items-center gap-2">
              <BarChart3 className="size-4" />
              Pipeline clarity
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Focused execution
            </li>
          </ul>
        </div>
        <p className="relative text-xs text-primary-foreground/50">
          © 2026 Nexora CRM
        </p>
      </section>

      <section className="flex min-h-dvh items-center justify-center bg-background px-4 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-center gap-2 lg:hidden">
            <BrandMark className="size-9" priority />
            <span className="text-lg font-semibold tracking-tight">Nexora</span>
          </div>
          <LoginForm />
          <div className="space-y-2 text-center text-xs text-muted-foreground">
            <p>Demo accounts:</p>
            <ul className="space-y-1">
              {MOCK_ACCOUNTS.map((account) => (
                <li key={account.email}>
                  {account.email} / {account.password}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
