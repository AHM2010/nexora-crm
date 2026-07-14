import { CalendarDays, Mail, Pencil, Phone } from "lucide-react";
import type { CustomerDetails } from "@/data/customer-details";
import { CustomerAvatar } from "@/components/customers/customer-avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCustomerDate } from "@/components/customers/details/customer-detail-formatters";

const contactLinkStyles =
  "inline-flex min-h-11 items-center gap-1.5 rounded-md py-2 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-h-0 sm:py-0";

export function CustomerProfileHeader({
  customer,
}: {
  customer: CustomerDetails;
}) {
  return (
    <Card className="relative shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-r from-primary/10 via-accent/10 to-transparent" />
      <CardContent className="relative flex flex-col gap-5 pt-12 md:flex-row md:items-end md:justify-between">
        <div className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:items-center">
          <CustomerAvatar
            name={customer.name}
            src={customer.avatar}
            className="size-20 text-xl ring-4 ring-card"
          />
          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="type-page-title wrap-break-words">
                {customer.name}
              </h1>
              <StatusBadge status={customer.status} />
            </div>
            <p className="font-medium text-muted-foreground">
              {customer.jobTitle} at {customer.company}
            </p>
            <div className="flex flex-col gap-x-4 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-y-1">
              <a
                href={`mailto:${customer.email}`}
                className={contactLinkStyles}
              >
                <Mail aria-hidden="true" className="size-3.5" />
                <span className="break-all">{customer.email}</span>
              </a>
              <a href={`tel:${customer.phone}`} className={contactLinkStyles}>
                <Phone aria-hidden="true" className="size-3.5" />
                {customer.phone}
              </a>
              <span className="inline-flex min-h-11 items-center gap-1.5 sm:min-h-0">
                <CalendarDays aria-hidden="true" className="size-3.5" />
                Joined {formatCustomerDate(customer.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="min-h-11 w-full transition-transform active:scale-[0.98] sm:w-auto"
          aria-label={`Edit ${customer.name}`}
        >
          <Pencil aria-hidden="true" />
          Edit customer
        </Button>
      </CardContent>
    </Card>
  );
}
