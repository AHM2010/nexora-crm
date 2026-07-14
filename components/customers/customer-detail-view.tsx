import type { CustomerDetails } from "@/data/customer-details";
import { CustomerActivityTimeline } from "@/components/customers/details/customer-activity-timeline";
import { CustomerBreadcrumbs } from "@/components/customers/details/customer-breadcrumbs";
import { CustomerDealsSection } from "@/components/customers/details/customer-deals-section";
import { CustomerInformationCard } from "@/components/customers/details/customer-information-card";
import { CustomerNotesSection } from "@/components/customers/details/customer-notes-section";
import { CustomerProfileHeader } from "@/components/customers/details/customer-profile-header";
import { CustomerStats } from "@/components/customers/details/customer-stats";

export function CustomerDetailView({
  customer,
}: {
  customer: CustomerDetails;
}) {
  return (
    <div className="section-stack motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-500">
      <CustomerBreadcrumbs customerName={customer.name} />
      <CustomerProfileHeader customer={customer} />
      <CustomerStats customer={customer} />
      <CustomerInformationCard customer={customer} />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <div className="space-y-6">
          <CustomerDealsSection customer={customer} />
          <CustomerNotesSection customer={customer} />
        </div>
        <aside aria-label="Customer activity">
          <CustomerActivityTimeline customer={customer} />
        </aside>
      </div>
    </div>
  );
}
