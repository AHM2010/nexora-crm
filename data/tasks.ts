import type { Priority } from "@/components/shared/priority-badge";
import type { CrmStatus } from "@/components/shared/status-badge";

export interface DashboardTask {
  id: string;
  title: string;
  dueDate: string;
  priority: Priority;
  status: Extract<CrmStatus, "pending" | "active" | "completed">;
}

export const upcomingTasks: DashboardTask[] = [
  {
    id: "task-1",
    title: "Prepare Q3 pipeline review",
    dueDate: "2026-07-13T09:00:00+03:00",
    priority: "urgent",
    status: "pending",
  },
  {
    id: "task-2",
    title: "Follow up with Acme Corp",
    dueDate: "2026-07-14T11:30:00+03:00",
    priority: "high",
    status: "active",
  },
  {
    id: "task-3",
    title: "Send Northstar renewal contract",
    dueDate: "2026-07-15T15:00:00+03:00",
    priority: "medium",
    status: "completed",
  },
  {
    id: "task-4",
    title: "Update customer health scores",
    dueDate: "2026-07-18T10:00:00+03:00",
    priority: "low",
    status: "pending",
  },
];
