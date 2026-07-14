import { BriefcaseBusiness, Clock3 } from "lucide-react";
import type { CustomerDeal, CustomerDetails } from "@/data/customer-details";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CustomerSectionEmptyState } from "@/components/customers/details/customer-section-empty-state";
import {
  customerCurrencyFormatter,
  formatCustomerDate,
} from "@/components/customers/details/customer-detail-formatters";

function CustomerDealCard({ deal }: { deal: CustomerDeal }) {
  return (
    <article className="rounded-lg border bg-background p-4 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-muted/30 hover:shadow-sm motion-reduce:transform-none">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="wrap-break-words font-medium">{deal.title}</h3>
          <p className="mt-1 text-lg font-semibold">
            {customerCurrencyFormatter.format(deal.value)}
          </p>
        </div>
        <StatusBadge status={deal.status} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <Badge variant="secondary">{deal.stage}</Badge>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 aria-hidden="true" className="size-3.5" />
          Closes {formatCustomerDate(deal.expectedCloseDate)}
        </span>
      </div>
    </article>
  );
}

export function CustomerDealsSection({
  customer,
}: {
  customer: CustomerDetails;
}) {
  return (
    <Card className="shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader>
        <SectionHeader
          title="Deals"
          description={`${customer.deals.length} ${customer.deals.length === 1 ? "opportunity" : "opportunities"} linked to this customer`}
        />
      </CardHeader>
      <CardContent>
        {customer.deals.length === 0 ? (
          <CustomerSectionEmptyState
            icon={BriefcaseBusiness}
            title="No deals yet"
            description="New opportunities linked to this customer will appear here."
          />
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {customer.deals.map((deal) => (
              <CustomerDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
