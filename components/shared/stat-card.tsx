import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type StatTrend = "positive" | "negative" | "neutral";

export type StatCardProps = {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  change?: string | number;
  trend?: StatTrend;
  description?: string;
  loading?: boolean;
  className?: string;
};

const trendStyles: Record<StatTrend, string> = {
  positive: "text-success",
  negative: "text-destructive",
  neutral: "text-muted-foreground",
};

const trendIcons = {
  positive: ArrowUpRight,
  negative: ArrowDownRight,
  neutral: Minus,
};

export function StatCard({
  title,
  value,
  icon: Icon,
  change,
  trend = "neutral",
  description,
  loading = false,
  className,
}: StatCardProps) {
  const TrendIcon = trendIcons[trend];

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="grid grid-cols-[1fr_auto] items-center gap-3">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
        {Icon ? (
          <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon aria-hidden="true" className="size-4" />
          </span>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-2">
        {loading ? (
          <>
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-4 w-40" />
          </>
        ) : (
          <>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
            {change !== undefined || description ? (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                {change !== undefined ? (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 font-medium",
                      trendStyles[trend],
                    )}
                  >
                    <TrendIcon aria-hidden="true" className="size-3.5" />
                    {change}
                  </span>
                ) : null}
                {description ? (
                  <span className="text-muted-foreground">{description}</span>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
}
