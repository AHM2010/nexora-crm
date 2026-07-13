import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type CrmStatus =
  | "active"
  | "inactive"
  | "lead"
  | "contacted"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost"
  | "pending"
  | "completed";

const statusStyles: Record<CrmStatus, string> = {
  active: "bg-success/15 text-success dark:bg-success/20",
  inactive: "bg-muted text-muted-foreground",
  lead: "bg-accent/15 text-accent dark:bg-accent/20",
  contacted: "bg-secondary text-secondary-foreground",
  proposal: "bg-primary/10 text-foreground dark:bg-primary/15",
  negotiation:
    "bg-warning/15 text-warning-foreground dark:bg-warning/20 dark:text-warning",
  won: "bg-success/15 text-success dark:bg-success/20",
  lost: "bg-destructive/10 text-destructive dark:bg-destructive/20",
  pending:
    "bg-warning/15 text-warning-foreground dark:bg-warning/20 dark:text-warning",
  completed: "bg-success/15 text-success dark:bg-success/20",
};

export type StatusBadgeProps = { status: CrmStatus; className?: string };

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-transparent capitalize transition-colors duration-150 hover:brightness-95 dark:hover:brightness-110",
        statusStyles[status],
        className,
      )}
    >
      {status}
    </Badge>
  );
}
