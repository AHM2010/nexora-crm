import { TasksWorkspace } from "@/components/tasks/tasks-workspace";
import { tasks } from "@/data/tasks";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Prioritize and track customer follow-up work.",
};

export default function TasksPage() {
  return <TasksWorkspace initialTasks={tasks} />;
}
import type { Metadata } from "next";
