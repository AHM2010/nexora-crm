import type { Priority } from "@/components/shared/priority-badge";
import type { CrmStatus } from "@/components/shared/status-badge";

export const taskStatuses = ["todo", "in-progress", "completed"] as const;
export type TaskStatus = (typeof taskStatuses)[number];
export type TaskPriority = Priority;

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  customer?: string;
  createdAt: string;
}

export const tasks: Task[] = [
  {
    id: "task-001",
    title: "Prepare Q3 pipeline review",
    description:
      "Consolidate forecasts and highlight at-risk opportunities for the leadership review.",
    assignedTo: "Maya Brooks",
    priority: "urgent",
    status: "todo",
    dueDate: "2026-07-13T09:00:00+03:00",
    createdAt: "2026-07-06T10:15:00+03:00",
  },
  {
    id: "task-002",
    title: "Follow up on enterprise proposal",
    description:
      "Confirm the implementation timeline and answer the procurement team’s questions.",
    assignedTo: "Alex Morgan",
    priority: "high",
    status: "in-progress",
    dueDate: "2026-07-14T11:30:00+03:00",
    customer: "Northstar Labs",
    createdAt: "2026-07-07T14:20:00+03:00",
  },
  {
    id: "task-003",
    title: "Send renewal contract",
    description:
      "Share the final renewal agreement and confirm the authorized signatory.",
    assignedTo: "Jordan Lee",
    priority: "medium",
    status: "completed",
    dueDate: "2026-07-15T15:00:00+03:00",
    customer: "Vertex Systems",
    createdAt: "2026-07-04T09:10:00+03:00",
  },
  {
    id: "task-004",
    title: "Update customer health scores",
    description:
      "Review product usage and support history before updating account health scores.",
    assignedTo: "Maya Brooks",
    priority: "low",
    status: "todo",
    dueDate: "2026-07-18T10:00:00+03:00",
    createdAt: "2026-07-10T13:45:00+03:00",
  },
  {
    id: "task-005",
    title: "Schedule onboarding workshop",
    description:
      "Coordinate calendars and prepare the agenda for the first onboarding session.",
    assignedTo: "Alex Morgan",
    priority: "medium",
    status: "in-progress",
    dueDate: "2026-07-21T13:00:00+03:00",
    customer: "Helio Energy",
    createdAt: "2026-07-11T08:30:00+03:00",
  },
  {
    id: "task-006",
    title: "Resolve billing escalation",
    description:
      "Work with finance to reconcile the disputed invoice and send an account update.",
    assignedTo: "Jordan Lee",
    priority: "urgent",
    status: "in-progress",
    dueDate: "2026-07-12T16:00:00+03:00",
    customer: "Luma Finance",
    createdAt: "2026-07-09T12:05:00+03:00",
  },
  {
    id: "task-007",
    title: "Draft quarterly business review",
    description:
      "Build a results summary with adoption trends, outcomes, and next-quarter goals.",
    assignedTo: "Maya Brooks",
    priority: "high",
    status: "todo",
    dueDate: "2026-07-25T09:30:00+03:00",
    customer: "Aperture Studio",
    createdAt: "2026-07-12T11:25:00+03:00",
  },
  {
    id: "task-008",
    title: "Confirm security questionnaire",
    description:
      "Validate the technical responses with engineering before returning the document.",
    assignedTo: "Alex Morgan",
    priority: "high",
    status: "completed",
    dueDate: "2026-07-10T17:00:00+03:00",
    customer: "Beacon Health",
    createdAt: "2026-07-02T15:40:00+03:00",
  },
  {
    id: "task-009",
    title: "Clean duplicate account records",
    description:
      "Review the flagged records and merge verified duplicate customer profiles.",
    assignedTo: "Jordan Lee",
    priority: "low",
    status: "todo",
    dueDate: "2026-07-30T14:00:00+03:00",
    createdAt: "2026-07-13T09:50:00+03:00",
  },
];

export interface DashboardTask {
  id: string;
  title: string;
  dueDate: string;
  priority: Priority;
  status: Extract<CrmStatus, "pending" | "active" | "completed">;
}

const dashboardStatus: Record<TaskStatus, DashboardTask["status"]> = {
  todo: "pending",
  "in-progress": "active",
  completed: "completed",
};

export const upcomingTasks: DashboardTask[] = tasks.slice(0, 4).map((task) => ({
  id: task.id,
  title: task.title,
  dueDate: task.dueDate,
  priority: task.priority,
  status: dashboardStatus[task.status],
}));
