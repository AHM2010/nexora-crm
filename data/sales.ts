export type SalesPeriod = "week" | "month" | "year";

export interface SalesDataPoint {
  label: string;
  revenue: number;
}

export const salesData: Record<SalesPeriod, SalesDataPoint[]> = {
  week: [
    { label: "Mon", revenue: 4800 },
    { label: "Tue", revenue: 7200 },
    { label: "Wed", revenue: 6100 },
    { label: "Thu", revenue: 9800 },
    { label: "Fri", revenue: 11200 },
    { label: "Sat", revenue: 8900 },
    { label: "Sun", revenue: 12400 },
  ],
  month: [
    { label: "Jul 1", revenue: 18200 },
    { label: "Jul 5", revenue: 24800 },
    { label: "Jul 9", revenue: 22100 },
    { label: "Jul 13", revenue: 31800 },
    { label: "Jul 17", revenue: 28600 },
    { label: "Jul 21", revenue: 39400 },
    { label: "Jul 25", revenue: 35800 },
    { label: "Jul 29", revenue: 46200 },
  ],
  year: [
    { label: "Jan", revenue: 42000 },
    { label: "Feb", revenue: 51000 },
    { label: "Mar", revenue: 47000 },
    { label: "Apr", revenue: 63000 },
    { label: "May", revenue: 59000 },
    { label: "Jun", revenue: 72000 },
    { label: "Jul", revenue: 84000 },
    { label: "Aug", revenue: 79000 },
    { label: "Sep", revenue: 91000 },
    { label: "Oct", revenue: 98000 },
    { label: "Nov", revenue: 106000 },
    { label: "Dec", revenue: 118000 },
  ],
};
