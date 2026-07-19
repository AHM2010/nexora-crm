"use client";

import { CalendarDays } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import {useFormatter, useTranslations} from "next-intl";

export function DashboardHeader() {
  const { user, isReady } = useAuth();
  const t = useTranslations("Dashboard");
  const format = useFormatter();
  const displayName = isReady ? (user?.name?.split(" ")[0] ?? "Ahmed") : "";

  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-1 text-sm font-medium text-muted-foreground">
          {t("overview")}
        </p>
        <h1 className="type-page-title">
          {isReady ? t("welcome", {name: displayName}) : t("loadingProfile")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("intro")}
        </p>
      </div>
      <div className="inline-flex w-fit items-center gap-2 rounded-lg border bg-card px-3 py-2 text-xs font-medium text-muted-foreground shadow-xs">
        <CalendarDays aria-hidden="true" className="size-4" />
        <time dateTime={new Date().toISOString().split("T")[0]}>
          {format.dateTime(new Date(), {dateStyle: "medium"})}
        </time>
      </div>
    </header>
  );
}
