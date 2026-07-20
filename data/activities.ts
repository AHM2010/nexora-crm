export type ActivityKind = "deal" | "call" | "email" | "task";
export type ActivityDescriptionKey =
  | "movedToNegotiation"
  | "completedDiscoveryCall"
  | "repliedToProposal"
  | "createdFollowUpTask"
  | "wonRenewalDeal";

export interface Activity {
  id: string;
  customerName: string;
  descriptionKey: ActivityDescriptionKey;
  timeAgo: {value: number; unit: Intl.RelativeTimeFormatUnit};
  avatarUrl?: string;
  kind: ActivityKind;
}

export const recentActivities: Activity[] = [
  {
    id: "activity-1",
    customerName: "Olivia Martin",
    descriptionKey: "movedToNegotiation",
    timeAgo: {value: -8, unit: "minute"},
    kind: "deal",
  },
  {
    id: "activity-2",
    customerName: "Jackson Lee",
    descriptionKey: "completedDiscoveryCall",
    timeAgo: {value: -24, unit: "minute"},
    kind: "call",
  },
  {
    id: "activity-3",
    customerName: "Sophia Brown",
    descriptionKey: "repliedToProposal",
    timeAgo: {value: -1, unit: "hour"},
    kind: "email",
  },
  {
    id: "activity-4",
    customerName: "Noah Williams",
    descriptionKey: "createdFollowUpTask",
    timeAgo: {value: -2, unit: "hour"},
    kind: "task",
  },
  {
    id: "activity-5",
    customerName: "Emma Davis",
    descriptionKey: "wonRenewalDeal",
    timeAgo: {value: -3, unit: "hour"},
    kind: "deal",
  },
];
