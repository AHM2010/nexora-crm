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

export const dashboardStats: DashboardStat[] = [
  {
    id: "customers",
    title: "Total Customers",
    value: "2,420",
    change: "12%",
    comparison: "from last month",
    trend: "positive",
    icon: "customers",
  },
  {
    id: "deals",
    title: "Active Deals",
    value: "316",
    change: "8.2%",
    comparison: "from last month",
    trend: "positive",
    icon: "deals",
  },
  {
    id: "revenue",
    title: "Revenue",
    value: "$84,230",
    change: "18.6%",
    comparison: "from last month",
    trend: "positive",
    icon: "revenue",
  },
  {
    id: "tasks",
    title: "Tasks",
    value: "48",
    change: "3.1%",
    comparison: "from last month",
    trend: "negative",
    icon: "tasks",
  },
];
