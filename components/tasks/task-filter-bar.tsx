"use client";

import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import type { TaskPriority, TaskStatus } from "@/data/tasks";
import type {
  TaskSortDirection,
  TaskSortField,
} from "@/components/tasks/use-task-directory";
import { SearchInput } from "@/components/shared/search-input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TaskFilterBarProps = {
  search: string;
  priority: TaskPriority | "all";
  status: TaskStatus | "all";
  sortField: TaskSortField;
  sortDirection: TaskSortDirection;
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: TaskPriority | "all") => void;
  onStatusChange: (value: TaskStatus | "all") => void;
  onSortFieldChange: (value: TaskSortField) => void;
  onSortDirectionToggle: () => void;
};

export function TaskFilterBar(props: TaskFilterBarProps) {
  return (
    <section
      aria-label="Task filters"
      className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-xs lg:flex-row lg:items-center"
    >
      <SearchInput
        value={props.search}
        onChange={props.onSearchChange}
        placeholder="Search title, description, or assignee…"
        label="Search tasks"
        containerClassName="sm:max-w-none lg:max-w-md lg:flex-1"
      />
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <Select
          value={props.priority}
          onValueChange={(value) =>
            props.onPriorityChange((value ?? "all") as TaskPriority | "all")
          }
        >
          <SelectTrigger
            className="w-full sm:w-36"
            aria-label="Filter by priority"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={props.status}
          onValueChange={(value) =>
            props.onStatusChange((value ?? "all") as TaskStatus | "all")
          }
        >
          <SelectTrigger
            className="w-full sm:w-36"
            aria-label="Filter by status"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={props.sortField}
          onValueChange={(value) =>
            props.onSortFieldChange((value ?? "dueDate") as TaskSortField)
          }
        >
          <SelectTrigger className="w-full sm:w-36" aria-label="Sort tasks by">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Due date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="title">Task title</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={props.onSortDirectionToggle}
          aria-label={`Sort ${props.sortDirection === "asc" ? "descending" : "ascending"}`}
          aria-pressed={props.sortDirection === "desc"}
        >
          {props.sortDirection === "asc" ? (
            <ArrowUpAZ aria-hidden="true" />
          ) : (
            <ArrowDownAZ aria-hidden="true" />
          )}
          <span className="sm:sr-only">
            {props.sortDirection === "asc" ? "Ascending" : "Descending"}
          </span>
        </Button>
      </div>
    </section>
  );
}
