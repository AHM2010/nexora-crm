import { DealsWorkspace } from "@/components/deals/deals-workspace";
import { deals } from "@/data/deals";

export const metadata: Metadata = {
  title: "Deals",
  description: "Track opportunities across the Nexora sales pipeline.",
};

export default function DealsPage() {
  return <DealsWorkspace initialDeals={deals} />;
}
import type { Metadata } from "next";
