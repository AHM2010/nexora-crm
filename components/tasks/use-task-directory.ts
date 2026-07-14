"use client";

import { useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "@/data/tasks";

export type TaskSortField = "dueDate" | "priority" | "title";
export type TaskSortDirection = "asc" | "desc";

const priorityWeight: Record<TaskPriority, number> = {
  low: 0,
  medium: 1,
  high: 2,
  urgent: 3,
};

export function isTaskOverdue(task: Task, referenceTime: number) {
  return (
    task.status !== "completed" &&
    new Date(task.dueDate).getTime() < referenceTime
  );
}

export function useTaskDirectory(initialTasks: Task[]) {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<TaskPriority | "all">("all");
  const [status, setStatus] = useState<TaskStatus | "all">("all");
  const [sortField, setSortField] = useState<TaskSortField>("dueDate");
  const [sortDirection, setSortDirection] = useState<TaskSortDirection>("asc");
  const [referenceTime] = useState(() => Date.now());

  const term = search.trim().toLocaleLowerCase();
  const direction = sortDirection === "asc" ? 1 : -1;
  const filteredTasks = initialTasks
    .filter((task) => {
      const matchesSearch =
        !term ||
        `${task.title} ${task.description} ${task.assignedTo}`
          .toLocaleLowerCase()
          .includes(term);

      return (
        matchesSearch &&
        (priority === "all" || task.priority === priority) &&
        (status === "all" || task.status === status)
      );
    })
    .sort((first, second) => {
      if (sortField === "priority") {
        return (
          (priorityWeight[first.priority] - priorityWeight[second.priority]) *
          direction
        );
      }
      if (sortField === "title") {
        return first.title.localeCompare(second.title) * direction;
      }
      return (
        (new Date(first.dueDate).getTime() -
          new Date(second.dueDate).getTime()) *
        direction
      );
    });

  const statistics = {
    total: filteredTasks.length,
    completed: filteredTasks.filter((task) => task.status === "completed")
      .length,
    inProgress: filteredTasks.filter((task) => task.status === "in-progress")
      .length,
    overdue: filteredTasks.filter((task) => isTaskOverdue(task, referenceTime))
      .length,
  };
  const hasFilters = Boolean(term) || priority !== "all" || status !== "all";
  const resultsKey = `${term}-${priority}-${status}-${sortField}-${sortDirection}`;

  function clearFilters() {
    setSearch("");
    setPriority("all");
    setStatus("all");
  }

  function toggleSortDirection() {
    setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
  }

  return {
    search,
    priority,
    status,
    sortField,
    sortDirection,
    filteredTasks,
    statistics,
    referenceTime,
    hasFilters,
    resultsKey,
    setSearch,
    setPriority,
    setStatus,
    setSortField,
    toggleSortDirection,
    clearFilters,
  };
}
