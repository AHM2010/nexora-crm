import { TasksWorkspace } from "@/components/tasks/tasks-workspace";
import { tasks } from "@/data/tasks";

export default function TasksPage() {
  return <TasksWorkspace initialTasks={tasks} />;
}
