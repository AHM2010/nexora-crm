import { ClipboardCheck } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import type { DashboardTask } from "@/data/tasks";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function TaskWidget({ tasks }: { tasks: DashboardTask[] }) {
  if (!tasks.length)
    return (
      <EmptyState
        title="You’re all caught up"
        description="New tasks will appear here when they’re assigned."
        icon={ClipboardCheck}
      />
    );
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
  );
  return (
    <ul
      className="max-h-96 divide-y overflow-y-auto"
      aria-label="Upcoming tasks"
    >
      {sortedTasks.map((task) => (
        <li
          key={task.id}
          className="px-4 py-3.5 transition-colors hover:bg-muted/45 sm:px-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{task.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Due{" "}
                <time dateTime={task.dueDate}>
                  {dateFormatter.format(new Date(task.dueDate))}
                </time>
              </p>
            </div>
            <PriorityBadge
              priority={task.priority}
              className="shrink-0 transition-colors"
            />
          </div>
          <div className="mt-2.5">
            <StatusBadge status={task.status} className="transition-colors" />
          </div>
        </li>
      ))}
    </ul>
  );
}
