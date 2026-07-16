"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  CheckCircle2,
  CircleUserRound,
  Info,
  MonitorCog,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AppearanceSettings,
  NotificationSettings,
  SecuritySettings,
  ThemeSettings,
} from "./preference-sections";
import { ProfileForm } from "./profile-form";
import { SettingsCard } from "./settings-card";

const sections = [
  { id: "profile", label: "Profile", icon: CircleUserRound },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "theme", label: "Theme", icon: Palette },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "appearance", label: "Appearance", icon: SlidersHorizontal },
  { id: "account", label: "Account", icon: Info },
];
type Toast = { id: number; kind: "success" | "error"; message: string };

function AccountInformation() {
  const { user, lastLoginAt } = useAuth();
  const lastLogin = lastLoginAt
    ? new Date(lastLoginAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Not available";
  const items = [
    ["User ID", user?.userId ?? "Not available"],
    ["Account created", "January 12, 2024"],
    ["Last login", lastLogin],
    ["Subscription plan", "Business Pro"],
    ["Role", user?.email?.toLowerCase() === "admin@nexora.com" ? "Admin" : "Member"],
  ];
  return (
    <dl className="grid gap-x-8 sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="border-b py-4 last:border-b-0 sm:nth-last-2:border-b-0"
        >
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </dt>
          <dd className="mt-1 text-sm font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SettingsWorkspace() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const notify = useCallback((kind: Toast["kind"], message: string) => {
    const id = Date.now();
    setToasts((items) => [...items, { id, kind, message }]);
    window.setTimeout(
      () => setToasts((items) => items.filter((item) => item.id !== id)),
      3500,
    );
  }, []);
  return (
    <div className="section-stack">
      <PageHeader
        title="Settings"
        description="Manage your profile, preferences, security, and account details."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[210px_minmax(0,1fr)]">
        <nav
          aria-label="Settings sections"
          className="sticky top-20 z-10 -mx-6 overflow-x-auto border-y bg-background/95 px-6 py-2 backdrop-blur lg:mx-0 lg:rounded-xl lg:border lg:p-2"
        >
          <div className="flex min-w-max gap-1 lg:min-w-0 lg:flex-col">
            {sections.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon aria-hidden className="size-4" />
                {label}
              </a>
            ))}
          </div>
        </nav>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-w-0 space-y-6"
        >
          <SettingsCard
            id="profile"
            title="Profile settings"
            description="Update your personal and work information."
            icon={CircleUserRound}
          >
            <ProfileForm notify={notify} />
          </SettingsCard>
          <SettingsCard
            id="notifications"
            title="Notification settings"
            description="Choose how and when you want to be notified."
            icon={Bell}
          >
            <NotificationSettings />
          </SettingsCard>
          <SettingsCard
            id="theme"
            title="Theme"
            description="Choose how Nexora looks on this device."
            icon={MonitorCog}
          >
            <ThemeSettings />
          </SettingsCard>
          <SettingsCard
            id="security"
            title="Security"
            description="Protect your account and manage active sessions."
            icon={ShieldCheck}
          >
            <SecuritySettings notify={notify} />
          </SettingsCard>
          <SettingsCard
            id="appearance"
            title="Appearance preferences"
            description="Fine-tune your dashboard experience."
            icon={SlidersHorizontal}
          >
            <AppearanceSettings />
          </SettingsCard>
          <SettingsCard
            id="account"
            title="Account information"
            description="Read-only details associated with your account."
            icon={Info}
          >
            <AccountInformation />
          </SettingsCard>
        </motion.div>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24 }}
              className={cn(
                "pointer-events-auto flex items-center gap-3 rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg",
                toast.kind === "error" && "border-destructive/40",
              )}
              role={toast.kind === "error" ? "alert" : "status"}
            >
              {toast.kind === "success" ? (
                <CheckCircle2 className="size-5 text-success" />
              ) : (
                <XCircle className="size-5 text-destructive" />
              )}
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Dismiss notification"
                onClick={() =>
                  setToasts((items) =>
                    items.filter((item) => item.id !== toast.id),
                  )
                }
              >
                <X />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
