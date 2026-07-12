import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
};

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
}: EmptyStateProps) {
  return (
    <Card className="border-dashed shadow-none">
      <CardContent className="flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center sm:px-10">
        {Icon ? (
          <span className="mb-4 flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Icon aria-hidden="true" className="size-5" />
          </span>
        ) : null}
        <h3 className="type-card-title">{title}</h3>
        {description ? (
          <p className="type-small mt-1 max-w-sm">{description}</p>
        ) : null}
        {action ? <div className="mt-5">{action}</div> : null}
      </CardContent>
    </Card>
  );
}
