import { Building2, CalendarDays } from "lucide-react";
import type { Task } from "@/data/tasks";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function TaskCard({
  task,
  isOverdue,
}: {
  task: Task;
  isOverdue: boolean;
}) {
  return (
    <Card className="shadow-xs transition duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="gap-3 sm:grid-cols-[1fr_auto]">
        <div className="min-w-0 space-y-1">
          <CardTitle>{task.title}</CardTitle>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {task.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <PriorityBadge priority={task.priority} />
          <StatusBadge status={task.status} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <UserAvatar name={task.assignedTo} size="sm" />
          <span className="truncate text-sm font-medium">
            {task.assignedTo}
          </span>
          {task.customer ? (
            <>
              <span className="text-muted-foreground" aria-hidden="true">
                ·
              </span>
              <span className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                <Building2 className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{task.customer}</span>
              </span>
            </>
          ) : null}
        </div>
        <p
          className={cn(
            "flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground",
            isOverdue && "font-medium text-destructive",
          )}
        >
          <CalendarDays className="size-3.5" aria-hidden="true" />
          <span>{isOverdue ? "Overdue" : "Due"} </span>
          <time dateTime={task.dueDate}>
            {dateFormatter.format(new Date(task.dueDate))}
          </time>
        </p>
      </CardContent>
    </Card>
  );
}
