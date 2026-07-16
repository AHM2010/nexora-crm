import {
  BadgeDollarSign,
  BriefcaseBusiness,
  ListChecks,
  UsersRound,
} from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { dashboardStats, type DashboardStatIcon } from "@/data/dashboard-stats";

const statIcons = {
  customers: UsersRound,
  deals: BriefcaseBusiness,
  revenue: BadgeDollarSign,
  tasks: ListChecks,
} satisfies Record<DashboardStatIcon, typeof UsersRound>;

export function DashboardStats() {
  return (
    <section
      aria-label="Business summary"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {dashboardStats.map((stat) => (
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
