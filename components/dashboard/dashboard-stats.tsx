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

const statIcons = {
  customers: UsersRound,
  deals: BriefcaseBusiness,
  revenue: BadgeDollarSign,
  tasks: ListChecks,
} satisfies Record<DashboardStatIcon, typeof UsersRound>;

export function DashboardStats() {
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
          return {
            ...stat,
            value: new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(revenue),
          };
        }
        return stat;
      }),
    [currentDeals],
  );

  return (
    <section
      aria-label="Business summary"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={statIcons[stat.icon]}
          change={stat.change}
          trend={stat.trend}
          description={stat.comparison}
          className="shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
        />
      ))}
    </section>
  );
}
