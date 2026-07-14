import { DealsWorkspace } from "@/components/deals/deals-workspace";
import { deals } from "@/data/deals";

export default function DealsPage() {
  return <DealsWorkspace initialDeals={deals} />;
}
