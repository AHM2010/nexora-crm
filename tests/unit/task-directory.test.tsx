import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { tasks } from "@/data/tasks";
import {
  isTaskOverdue,
  useTaskDirectory,
} from "@/components/tasks/use-task-directory";

describe("task directory", () => {
  it("does not classify completed tasks as overdue", () => {
    const completed = { ...tasks[0], status: "completed" as const };
    expect(isTaskOverdue(completed, Date.now() + 10_000_000)).toBe(false);
  });

  it("combines case-insensitive search and status filters", () => {
    const { result } = renderHook(() => useTaskDirectory(tasks));
    const target = tasks.find((task) => task.status === "completed")!;
    act(() => result.current.setSearch(`  ${target.title.toUpperCase()}  `));
    act(() => result.current.setStatus("completed"));
    expect(result.current.filteredTasks).toEqual([target]);
    expect(result.current.statistics.completed).toBe(1);
  });
});
