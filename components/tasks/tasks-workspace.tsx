"use client";

import {
  CircleCheckBig,
  Clock3,
  ListTodo,
  RotateCcw,
  SearchX,
  TriangleAlert,
} from "lucide-react";
import type { Task } from "@/data/tasks";
import { TaskFilterBar } from "@/components/tasks/task-filter-bar";
import { TaskCard } from "@/components/tasks/task-card";
import {
  isTaskOverdue,
  useTaskDirectory,
} from "@/components/tasks/use-task-directory";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";

export function TasksWorkspace({ initialTasks }: { initialTasks: Task[] }) {
  const directory = useTaskDirectory(initialTasks);

  return (
    <div className="section-stack motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
      <PageHeader
        title="Tasks"
        description="Track assignments, deadlines, and progress across your customer relationships."
      />

      <section
        aria-label="Task summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          className="shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
          title="Total Tasks"
          value={directory.statistics.total}
          icon={ListTodo}
          description="Matching current filters"
        />
        <StatCard
          className="shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
          title="Completed Tasks"
          value={directory.statistics.completed}
          icon={CircleCheckBig}
          description="Finished assignments"
        />
        <StatCard
          className="shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
          title="In Progress Tasks"
          value={directory.statistics.inProgress}
          icon={Clock3}
          description="Currently being worked"
        />
        <StatCard
          className="shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
          title="Overdue Tasks"
          value={directory.statistics.overdue}
          icon={TriangleAlert}
          description="Open tasks past due"
        />
      </section>

      <TaskFilterBar
        search={directory.search}
        priority={directory.priority}
        status={directory.status}
        sortField={directory.sortField}
        sortDirection={directory.sortDirection}
        onSearchChange={directory.setSearch}
        onPriorityChange={directory.setPriority}
        onStatusChange={directory.setStatus}
        onSortFieldChange={directory.setSortField}
        onSortDirectionToggle={directory.toggleSortDirection}
      />

      <div
        className="flex items-center justify-between gap-4 text-sm text-muted-foreground"
        aria-live="polite"
      >
        <p>
          <span className="font-medium text-foreground">
            {directory.filteredTasks.length}
          </span>{" "}
          {directory.filteredTasks.length === 1 ? "task" : "tasks"} shown
        </p>
        {directory.hasFilters ? (
          <Button variant="ghost" size="sm" onClick={directory.clearFilters}>
            <RotateCcw />
            Reset filters
          </Button>
        ) : null}
      </div>

      {directory.filteredTasks.length ? (
        <section
          key={directory.resultsKey}
          aria-label="Task list"
          className="grid gap-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-200 lg:grid-cols-2"
        >
          {directory.filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isOverdue={isTaskOverdue(task, directory.referenceTime)}
            />
          ))}
        </section>
      ) : (
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
          <EmptyState
            icon={SearchX}
            title="No tasks found"
            description="No tasks match your search and filters. Try clearing a filter or using a broader search."
            action={
              directory.hasFilters ? (
                <Button variant="outline" onClick={directory.clearFilters}>
                  Clear filters
                </Button>
              ) : undefined
            }
          />
        </div>
      )}
    </div>
  );
}
