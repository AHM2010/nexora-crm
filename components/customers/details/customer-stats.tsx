import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import type { CustomerDetails } from "@/data/customer-details";
import { StatCard } from "@/components/shared/stat-card";
import { customerCurrencyFormatter } from "@/components/customers/details/customer-detail-formatters";

export function CustomerStats({ customer }: { customer: CustomerDetails }) {
  const totalRevenue = customer.deals
    .filter((deal) => deal.status === "won")
    .reduce((total, deal) => total + deal.value, 0);
  const activeDeals = customer.deals.filter(
    (deal) => deal.status === "active",
  ).length;
  const completedDeals = customer.deals.filter(
    (deal) => deal.status === "won",
  ).length;
  const stats = [
    {
      title: "Total deals",
      value: customer.deals.length,
      icon: BriefcaseBusiness,
    },
    {
      title: "Total revenue",
      value: customerCurrencyFormatter.format(totalRevenue),
      icon: BadgeDollarSign,
    },
    { title: "Active deals", value: activeDeals, icon: Clock3 },
    { title: "Completed deals", value: completedDeals, icon: CheckCircle2 },
  ];

  return (
    <section
      aria-label="Customer summary"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
          className="shadow-sm transition duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
        />
      ))}
    </section>
  );
}
