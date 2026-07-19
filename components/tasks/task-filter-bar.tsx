"use client";

import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import {useTranslations} from "next-intl";
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
        <Select
          value={props.priority}
          onValueChange={(value) =>
            props.onPriorityChange((value ?? "all") as TaskPriority | "all")
          }
        >
          <SelectTrigger
            className="w-full sm:w-36"
            aria-label={t("priority")}
          >
            <SelectValue>
              {props.priority === "all" ? t("allPriorities") : statusT(props.priority)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allPriorities")}</SelectItem>
            <SelectItem value="low">{statusT("low")}</SelectItem>
            <SelectItem value="medium">{statusT("medium")}</SelectItem>
            <SelectItem value="high">{statusT("high")}</SelectItem>
            <SelectItem value="urgent">{statusT("urgent")}</SelectItem>
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
            aria-label={t("status")}
          >
            <SelectValue>
              {props.status === "all" ? t("allStatuses") : props.status === "todo" ? statusT("pending") : props.status === "in-progress" ? statusT("inProgress") : statusT("completed")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStatuses")}</SelectItem>
            <SelectItem value="todo">{statusT("pending")}</SelectItem>
            <SelectItem value="in-progress">{statusT("inProgress")}</SelectItem>
            <SelectItem value="completed">{statusT("completed")}</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={props.sortField}
          onValueChange={(value) =>
            props.onSortFieldChange((value ?? "dueDate") as TaskSortField)
          }
        >
          <SelectTrigger className="w-full sm:w-36" aria-label={t("sortTasks")}>
            <SelectValue>
              {props.sortField === "dueDate" ? t("dueDate") : props.sortField === "priority" ? t("taskPriority") : t("taskTitle")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">{t("dueDate")}</SelectItem>
            <SelectItem value="priority">{t("taskPriority")}</SelectItem>
            <SelectItem value="title">{t("taskTitle")}</SelectItem>
          </SelectContent>
        </Select>
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
