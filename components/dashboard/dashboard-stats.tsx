"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  ListChecks,
  UsersRound,
} from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { dashboardStats, type DashboardStatIcon } from "@/data/dashboard-stats";
import { deals, type Deal } from "@/data/deals";
import { DEALS_STORAGE_KEY, readStoredDeals } from "@/lib/deals-storage";
import { useLocale, useTranslations } from "next-intl";

const statIcons = {
  customers: UsersRound,
  deals: BriefcaseBusiness,
  revenue: BadgeDollarSign,
  tasks: ListChecks,
} satisfies Record<DashboardStatIcon, typeof UsersRound>;

export function DashboardStats() {
  const t = useTranslations("Dashboard");
  const locale = useLocale();
  const [currentDeals, setCurrentDeals] = useState<Deal[]>(deals);

  useEffect(() => {
    const syncDeals = () => setCurrentDeals(readStoredDeals(deals));
    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === DEALS_STORAGE_KEY) syncDeals();
    };
    syncDeals();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("nexora:deals-updated", syncDeals);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("nexora:deals-updated", syncDeals);
    };
  }, []);

  const stats = useMemo(
    () =>
      dashboardStats.map((stat) => {
        if (stat.id === "deals") {
          return {
            ...stat,
            value: currentDeals
              .filter((deal) => deal.stage !== "won" && deal.stage !== "lost")
              .length.toLocaleString("en-US"),
          };
        }
        if (stat.id === "revenue") {
          const revenue = currentDeals.reduce(
            (sum, deal) => (deal.stage === "won" ? sum + deal.value : sum),
            0,
          );
          const formattedRevenue = new Intl.NumberFormat(locale, {
            maximumFractionDigits: 0,
          }).format(revenue);

          return {
            ...stat,
            value: `$${formattedRevenue}`,
          };
        }
        return stat;
      }),
    [currentDeals, locale],
  );

  return (
    <section
      aria-label={t("summary")}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={t(stat.id as "customers" | "deals" | "revenue" | "tasks")}
          value={stat.value}
          icon={statIcons[stat.icon]}
          change={stat.change}
          trend={stat.trend}
          description={t("comparison")}
          className="shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
        />
      ))}
    </section>
  );
}
