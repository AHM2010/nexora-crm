export type ActivityKind = "deal" | "call" | "email" | "task";

export interface Activity {
  id: string;
  customerName: string;
  description: string;
  timestamp: string;
  avatarUrl?: string;
  kind: ActivityKind;
}

export const recentActivities: Activity[] = [
  {
    id: "activity-1",
    customerName: "Olivia Martin",
    description: "moved Acme Corp to Negotiation",
    timestamp: "8 minutes ago",
    kind: "deal",
  },
  {
    id: "activity-2",
    customerName: "Jackson Lee",
    description: "completed a discovery call",
    timestamp: "24 minutes ago",
    kind: "call",
  },
  {
    id: "activity-3",
    customerName: "Sophia Brown",
    description: "replied to the proposal email",
    timestamp: "1 hour ago",
    kind: "email",
  },
  {
    id: "activity-4",
    customerName: "Noah Williams",
    description: "created a follow-up task",
    timestamp: "2 hours ago",
    kind: "task",
  },
  {
    id: "activity-5",
    customerName: "Emma Davis",
    description: "won the Northstar renewal deal",
    timestamp: "3 hours ago",
    kind: "deal",
  },
];
