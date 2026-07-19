"use client";

import {useTranslations} from "next-intl";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Priority = "low" | "medium" | "high" | "urgent";

const priorityStyles: Record<Priority, string> = {
  low: "bg-secondary text-secondary-foreground",
  medium:
    "bg-warning/15 text-warning-foreground dark:bg-warning/20 dark:text-warning",
  high: "bg-destructive/10 text-destructive dark:bg-destructive/20",
  urgent: "bg-destructive text-destructive-foreground",
};

export type PriorityBadgeProps = { priority: Priority; className?: string };

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const t = useTranslations("Status");
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-transparent capitalize",
        priorityStyles[priority],
        className,
      )}
    >
      {t(priority)}
    </Badge>
  );
}
