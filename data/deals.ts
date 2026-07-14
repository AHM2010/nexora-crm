export const dealStages = [
  "lead",
  "contacted",
  "proposal",
  "negotiation",
  "won",
  "lost",
] as const;

export type DealStage = (typeof dealStages)[number];
export type DealPriority = "low" | "medium" | "high";

export interface Deal {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  company: string;
  customerAvatar: string;
  value: number;
  stage: DealStage;
  priority: DealPriority;
  closingDate: string;
  assignedTo: string;
  notes: string;
}

type DealSeed = Omit<Deal, "customerName" | "company" | "customerAvatar">;

const dealSeeds: DealSeed[] = [
  {
    id: "deal_001",
    title: "Enterprise analytics rollout",
    customerId: "cus_001",
    value: 86000,
    stage: "lead",
    priority: "high",
    closingDate: "2026-08-28",
    assignedTo: "Maya Brooks",
    notes: "Initial discovery call requested by the operations team.",
  },
  {
    id: "deal_002",
    title: "Creative team workspace",
    customerId: "cus_002",
    value: 18500,
    stage: "lead",
    priority: "medium",
    closingDate: "2026-09-12",
    assignedTo: "Alex Morgan",
    notes: "Looking to consolidate three separate tools.",
  },
  {
    id: "deal_003",
    title: "Patient engagement suite",
    customerId: "cus_004",
    value: 124000,
    stage: "contacted",
    priority: "high",
    closingDate: "2026-08-18",
    assignedTo: "Maya Brooks",
    notes: "Security review is the next milestone.",
  },
  {
    id: "deal_004",
    title: "Operations automation",
    customerId: "cus_006",
    value: 42000,
    stage: "contacted",
    priority: "medium",
    closingDate: "2026-09-04",
    assignedTo: "Jordan Lee",
    notes: "Customer asked for an ROI model.",
  },
  {
    id: "deal_005",
    title: "Global CRM migration",
    customerId: "cus_003",
    value: 156000,
    stage: "proposal",
    priority: "high",
    closingDate: "2026-08-07",
    assignedTo: "Alex Morgan",
    notes: "Proposal includes onboarding for five regional teams.",
  },
  {
    id: "deal_006",
    title: "Retail growth platform",
    customerId: "cus_008",
    value: 67500,
    stage: "proposal",
    priority: "medium",
    closingDate: "2026-08-30",
    assignedTo: "Jordan Lee",
    notes: "Awaiting feedback on the annual plan.",
  },
  {
    id: "deal_007",
    title: "Finance data modernization",
    customerId: "cus_005",
    value: 98000,
    stage: "negotiation",
    priority: "high",
    closingDate: "2026-07-29",
    assignedTo: "Maya Brooks",
    notes: "Legal is reviewing the data processing addendum.",
  },
  {
    id: "deal_008",
    title: "Digital campaign hub",
    customerId: "cus_009",
    value: 31500,
    stage: "negotiation",
    priority: "low",
    closingDate: "2026-08-15",
    assignedTo: "Alex Morgan",
    notes: "Final pricing approval is pending.",
  },
  {
    id: "deal_009",
    title: "Renewable operations cloud",
    customerId: "cus_011",
    value: 142000,
    stage: "won",
    priority: "high",
    closingDate: "2026-07-09",
    assignedTo: "Jordan Lee",
    notes: "Signed. Implementation begins next month.",
  },
  {
    id: "deal_010",
    title: "Logistics visibility pilot",
    customerId: "cus_021",
    value: 28000,
    stage: "won",
    priority: "medium",
    closingDate: "2026-07-03",
    assignedTo: "Maya Brooks",
    notes: "Pilot signed for two distribution centers.",
  },
  {
    id: "deal_011",
    title: "Food service expansion",
    customerId: "cus_013",
    value: 54000,
    stage: "lost",
    priority: "medium",
    closingDate: "2026-06-24",
    assignedTo: "Alex Morgan",
    notes: "Budget was redirected to a warehouse project.",
  },
  {
    id: "deal_012",
    title: "Customer insights program",
    customerId: "cus_007",
    value: 73500,
    stage: "lead",
    priority: "low",
    closingDate: "2026-10-02",
    assignedTo: "Jordan Lee",
    notes: "Early-stage opportunity from a customer referral.",
  },
];

const customersById = new Map(customers.map((customer) => [customer.id, customer]));

export const deals: Deal[] = dealSeeds.map((deal) => {
  const customer = customersById.get(deal.customerId);

  if (!customer) {
    throw new Error(`Deal ${deal.id} references missing customer ${deal.customerId}`);
  }

  return {
    ...deal,
    customerName: customer.name,
    company: customer.company,
    customerAvatar: customer.avatar,
  };
});
import { customers } from "@/data/customers";
