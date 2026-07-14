import { customers, type Customer } from "@/data/customers";

export type CustomerActivityKind =
  | "account"
  | "purchase"
  | "meeting"
  | "call"
  | "email";

export interface CustomerActivity {
  id: string;
  kind: CustomerActivityKind;
  title: string;
  description: string;
  date: string;
}

export interface CustomerDeal {
  id: string;
  title: string;
  value: number;
  stage: "Discovery" | "Proposal" | "Negotiation" | "Closed";
  expectedCloseDate: string;
  status: "active" | "won" | "lost";
}

export interface CustomerNote {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface CustomerDetails extends Customer {
  jobTitle: string;
  address: string;
  city: string;
  country: string;
  activities: CustomerActivity[];
  deals: CustomerDeal[];
  notes: CustomerNote[];
}

const locations = [
  ["548 Market Street", "San Francisco", "United States"],
  ["110 Greene Street", "New York", "United States"],
  ["72 King Street", "London", "United Kingdom"],
  ["18 Collins Street", "Melbourne", "Australia"],
  ["24 Gran Via", "Madrid", "Spain"],
] as const;

const jobTitles = [
  "Head of Operations",
  "Creative Director",
  "VP of Technology",
  "Procurement Manager",
  "Finance Director",
] as const;

function buildDetails(customer: Customer, index: number): CustomerDetails {
  const [address, city, country] = locations[index % locations.length];
  const dealCount = (index % 3) + 1;
  const deals: CustomerDeal[] = Array.from(
    { length: dealCount },
    (_, dealIndex) => {
      const statuses = ["active", "won", "lost"] as const;
      const stages = [
        "Discovery",
        "Proposal",
        "Negotiation",
        "Closed",
      ] as const;
      const status = statuses[(index + dealIndex) % statuses.length];

      return {
        id: `${customer.id}_deal_${dealIndex + 1}`,
        title: [
          "Growth platform rollout",
          "Annual service renewal",
          "Team enablement package",
        ][dealIndex],
        value: 12000 + index * 1750 + dealIndex * 8400,
        stage:
          status === "won" || status === "lost"
            ? "Closed"
            : stages[(index + dealIndex) % 3],
        expectedCloseDate: `2026-${String(8 + dealIndex).padStart(2, "0")}-${String(12 + (index % 12)).padStart(2, "0")}`,
        status,
      };
    },
  );

  return {
    ...customer,
    jobTitle: jobTitles[index % jobTitles.length],
    address,
    city,
    country,
    deals,
    activities: [
      {
        id: `${customer.id}_activity_1`,
        kind: "email",
        title: "Email sent",
        description: "Shared the latest proposal and next-step summary.",
        date: "2026-07-12T09:30:00",
      },
      {
        id: `${customer.id}_activity_2`,
        kind: "call",
        title: "Phone call",
        description: "Discussed priorities, timeline, and key stakeholders.",
        date: "2026-07-09T14:00:00",
      },
      {
        id: `${customer.id}_activity_3`,
        kind: "meeting",
        title: "Meeting scheduled",
        description: "Booked a product review with the solutions team.",
        date: "2026-07-03T11:15:00",
      },
      {
        id: `${customer.id}_activity_4`,
        kind: "account",
        title: "Created account",
        description: `${customer.name} joined as a ${customer.status} customer.`,
        date: `${customer.createdAt}T10:00:00`,
      },
    ],
    notes: [
      {
        id: `${customer.id}_note_1`,
        title: "Meeting summary",
        content:
          "The team is focused on faster reporting and a simple rollout. Include the operations lead in the next review.",
        author: "Alex Morgan",
        createdAt: "2026-07-09",
      },
      {
        id: `${customer.id}_note_2`,
        title: "Follow-up reminder",
        content:
          "Send the implementation timeline and confirm the decision meeting before the end of the week.",
        author: "Jamie Lee",
        createdAt: "2026-07-10",
      },
    ],
  };
}

export const customerDetails: CustomerDetails[] = customers.map((customer, index) => {
  const details = buildDetails(customer, index);

  return {
    ...details,
    deals: index === 3 ? [] : details.deals,
    notes: index === 4 ? [] : details.notes,
    activities: index === 5 ? [] : details.activities,
  };
});

export function getCustomerDetails(id: string) {
  return customerDetails.find((customer) => customer.id === id);
}
