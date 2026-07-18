import { customers } from "@/data/customers";
import { deals } from "@/data/deals";
import { tasks } from "@/data/tasks";

export type DashboardStatIcon = "customers" | "deals" | "revenue" | "tasks";
export type DashboardStatTrend = "positive" | "negative" | "neutral";

export interface DashboardStat {
  id: string;
  title: string;
  value: string;
  change: string;
  comparison: string;
  trend: DashboardStatTrend;
  icon: DashboardStatIcon;
}

const formatStatValue = (value: number) => value.toLocaleString("en-US");
const formatCurrencyValue = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const activeDealsCount = deals.filter(
  (deal) => deal.stage !== "won" && deal.stage !== "lost",
).length;

const totalRevenue = deals.reduce((sum, deal) => {
  if (deal.stage === "won") {
    return sum + deal.value;
  }

  return sum;
}, 0);

export const dashboardStats: DashboardStat[] = [
  {
    id: "customers",
    title: "Total Customers",
    value: formatStatValue(customers.length),
    change: "12%",
    comparison: "from last month",
    trend: "positive",
    icon: "customers",
  },
  {
    id: "deals",
    title: "Active Deals",
    value: formatStatValue(activeDealsCount),
    change: "8.2%",
    comparison: "from last month",
    trend: "positive",
    icon: "deals",
  },
  {
    id: "revenue",
    title: "Revenue",
    value: formatCurrencyValue(totalRevenue),
    change: "18.6%",
    comparison: "from last month",
    trend: "positive",
    icon: "revenue",
  },
  {
    id: "tasks",
    title: "Tasks",
    value: formatStatValue(tasks.length),
    change: "3.1%",
    comparison: "from last month",
    trend: "negative",
    icon: "tasks",
  },
];
