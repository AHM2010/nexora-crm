"use client";

import { Laptop, Moon, Smartphone, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { SettingRow } from "./settings-card";

function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState(initial);
  const hydrated = useRef(false);
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) setValue(JSON.parse(saved) as T);
      } catch {
        /* use defaults */
      } finally {
        hydrated.current = true;
      }
    });
  }, [key]);
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

type NotificationKey =
  | "email"
  | "push"
  | "deals"
  | "tasks"
  | "weekly"
  | "marketing";
const notificationCopy: Record<NotificationKey, [string, string]> = {
  email: ["Email notifications", "Receive important activity by email."],
  push: ["Push notifications", "Show alerts on your registered devices."],
  deals: ["Deal updates", "Get notified when deal stages or values change."],
  tasks: ["Task reminders", "Receive reminders before tasks are due."],
  weekly: ["Weekly reports", "Get a performance summary every Monday."],
  marketing: ["Marketing emails", "Receive product news and helpful CRM tips."],
};
export function NotificationSettings() {
  const [settings, setSettings] = useStoredState<
    Record<NotificationKey, boolean>
  >("nexora-notifications", {
    email: true,
    push: true,
    deals: true,
    tasks: true,
    weekly: false,
    marketing: false,
  });
  return (
    <div className="divide-y">
      {(Object.keys(notificationCopy) as NotificationKey[]).map((key) => (
        <SettingRow
          key={key}
          label={notificationCopy[key][0]}
          description={notificationCopy[key][1]}
        >
          <Switch
            aria-label={notificationCopy[key][0]}
            checked={settings[key]}
            onCheckedChange={(checked) =>
              setSettings((current) => ({ ...current, [key]: checked }))
            }
          />
        </SettingRow>
      ))}
    </div>
  );
}

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Laptop },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="grid gap-3 sm:grid-cols-3"
    >
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={mounted && theme === value}
          onClick={() => setTheme(value)}
          className={cn(
            "rounded-xl border p-4 text-left outline-none transition-all hover:border-foreground/30 hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50",
            mounted &&
              theme === value &&
              "border-foreground bg-muted ring-1 ring-foreground",
          )}
        >
          <Icon aria-hidden className="mb-5 size-5" />
          <span className="block text-sm font-medium">{label} mode</span>
          <span className="mt-1 block text-xs text-muted-foreground">
            {value === "system" ? "Match your device" : `Always use ${value}`}
          </span>
        </button>
      ))}
    </div>
  );
}

type Appearance = {
  compact: boolean;
  animations: boolean;
  sidebarCollapsed: boolean;
  language: "en";
};
export function AppearanceSettings() {
  const [settings, setSettings] = useStoredState<Appearance>(
    "nexora-appearance",
    {
      compact: false,
      animations: true,
      sidebarCollapsed: false,
      language: "en",
    },
  );
  const toggles: Array<[keyof Omit<Appearance, "language">, string, string]> = [
    ["compact", "Compact mode", "Reduce spacing to show more information."],
    [
      "animations",
      "Interface animations",
      "Use motion and transitions throughout the dashboard.",
    ],
    [
      "sidebarCollapsed",
      "Collapse sidebar by default",
      "Start with a smaller navigation sidebar on desktop.",
    ],
  ];
  return (
    <div className="divide-y">
      {toggles.map(([key, label, description]) => (
        <SettingRow key={key} label={label} description={description}>
          <Switch
            aria-label={label}
            checked={settings[key]}
            onCheckedChange={(checked) =>
              setSettings((current) => ({ ...current, [key]: checked }))
            }
          />
        </SettingRow>
      ))}
      <SettingRow
        label="Language"
        description="Choose the language used across Nexora."
      >
        <Select
          value={settings.language}
          onValueChange={(language) =>
            setSettings((current) => ({
              ...current,
              language: language as "en",
            }))
          }
        >
          <SelectTrigger aria-label="Language" className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </SettingRow>
    </div>
  );
}

export function SecuritySettings({
  notify,
}: {
  notify: (kind: "success" | "error", message: string) => void;
}) {
  const [twoFactor, setTwoFactor] = useStoredState("nexora-two-factor", false);
  return (
    <div className="divide-y">
      <SettingRow label="Password" description="Last changed 3 months ago.">
        <Button
          variant="outline"
          onClick={() => notify("success", "Password flow opened (demo).")}
        >
          Change password
        </Button>
      </SettingRow>
      <SettingRow
        label="Two-factor authentication"
        description="Add an extra layer of security to your account."
      >
        <Switch
          aria-label="Two-factor authentication"
          checked={twoFactor}
          onCheckedChange={setTwoFactor}
        />
      </SettingRow>
      <div className="py-4">
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-background">
              <Smartphone aria-hidden className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Chrome on Windows</p>
              <p className="text-xs text-muted-foreground">
                Riyadh, Saudi Arabia · Current session
              </p>
            </div>
            <span
              className="size-2 rounded-full bg-success"
              aria-label="Active"
            />
          </div>
        </div>
        <Button
          variant="destructive"
          className="mt-4"
          onClick={() =>
            notify("success", "Other devices have been signed out.")
          }
        >
          Sign out other devices
        </Button>
      </div>
    </div>
  );
}
