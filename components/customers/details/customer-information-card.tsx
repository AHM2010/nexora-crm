import type { CustomerDetails } from "@/data/customer-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCustomerDate } from "@/components/customers/details/customer-detail-formatters";

export function CustomerInformationCard({
  customer,
}: {
  customer: CustomerDetails;
}) {
  const fields = [
    ["Full name", customer.name],
    ["Company", customer.company],
    ["Job title", customer.jobTitle],
    ["Email", customer.email],
    ["Phone", customer.phone],
    ["Address", customer.address],
    ["City", customer.city],
    ["Country", customer.country],
    ["Customer since", formatCustomerDate(customer.createdAt)],
  ] as const;

  return (
    <Card className="shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle>Customer information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
          {fields.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-1 wrap-break-words font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
