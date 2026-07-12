"use client";

import { useId, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { salesData, type SalesPeriod } from "@/data/sales";
import { cn } from "@/lib/utils";

const periods: { value: SalesPeriod; label: string }[] = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function SalesChart() {
  const [period, setPeriod] = useState<SalesPeriod>("month");
  const gradientId = useId().replaceAll(":", "");

  const filter = (
    <div
      aria-label="Sales period"
      className="flex rounded-lg bg-muted p-1"
      role="group"
    >
      {periods.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={period === item.value}
          onClick={() => setPeriod(item.value)}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            period === item.value
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <Card className="h-full shadow-sm">
      <CardHeader>
        <SectionHeader
          title="Sales overview"
          description="Revenue performance over time"
          action={filter}
        />
      </CardHeader>
      <CardContent
        className="h-72 pl-0 sm:h-80"
        aria-label={`${period} sales chart`}
        role="img"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesData[period]}
            margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-chart-3)"
                  stopOpacity={0.38}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-3)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--color-border)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={54}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              tickFormatter={(value: number) => `$${Math.round(value / 1000)}k`}
            />
            <Tooltip
              cursor={{ stroke: "var(--color-border)" }}
              formatter={(value) => [currency.format(Number(value)), "Revenue"]}
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: "10px",
                color: "var(--color-popover-foreground)",
                boxShadow: "0 8px 24px rgb(0 0 0 / 0.08)",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-chart-3)"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              activeDot={{ r: 4, strokeWidth: 2, fill: "var(--color-card)" }}
              animationDuration={700}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
