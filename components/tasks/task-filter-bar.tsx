"use client";

import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import {useTranslations} from "next-intl";
import type { TaskPriority, TaskStatus } from "@/data/tasks";
import type {
  TaskSortDirection,
  TaskSortField,
} from "@/components/tasks/use-task-directory";
import { SearchInput } from "@/components/shared/search-input";
import {SortDropdown} from "@/components/shared/sort-dropdown";
import { Button } from "@/components/ui/button";

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
  const t = useTranslations("Filters");
  const statusT = useTranslations("Status");
  return (
    <section
      aria-label={t("sortTasks")}
      className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-xs lg:flex-row lg:items-center"
    >
      <SearchInput
        value={props.search}
        onChange={props.onSearchChange}
        placeholder={t("taskSearch")}
        label={t("taskSearch")}
        containerClassName="sm:max-w-none lg:max-w-md lg:flex-1"
      />
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <SortDropdown
          value={props.priority}
          label={t("priority")}
          className="w-full sm:w-36"
          options={[
            {value: "all", label: t("allPriorities")},
            {value: "low", label: statusT("low")},
            {value: "medium", label: statusT("medium")},
            {value: "high", label: statusT("high")},
            {value: "urgent", label: statusT("urgent")},
          ]}
          onValueChange={(value) =>
            props.onPriorityChange(value as TaskPriority | "all")
          }
        />
        <SortDropdown
          value={props.status}
          label={t("status")}
          className="w-full sm:w-36"
          options={[
            {value: "all", label: t("allStatuses")},
            {value: "todo", label: statusT("pending")},
            {value: "in-progress", label: statusT("inProgress")},
            {value: "completed", label: statusT("completed")},
          ]}
          onValueChange={(value) =>
            props.onStatusChange(value as TaskStatus | "all")
          }
        />
        <SortDropdown
          value={props.sortField}
          label={t("sortTasks")}
          className="w-full sm:w-36"
          options={[
            {value: "dueDate", label: t("dueDate")},
            {value: "priority", label: t("taskPriority")},
            {value: "title", label: t("taskTitle")},
          ]}
          onValueChange={(value) =>
            props.onSortFieldChange(value as TaskSortField)
          }
        />
        <Button
          variant="outline"
          onClick={props.onSortDirectionToggle}
          aria-label={props.sortDirection === "asc" ? t("sortDescending") : t("sortAscending")}
          aria-pressed={props.sortDirection === "desc"}
        >
          {props.sortDirection === "asc" ? (
            <ArrowUpAZ aria-hidden="true" />
          ) : (
            <ArrowDownAZ aria-hidden="true" />
          )}
          <span className="sm:sr-only">
            {props.sortDirection === "asc" ? t("ascending") : t("descending")}
          </span>
        </Button>
      </div>
    </section>
  );
}
