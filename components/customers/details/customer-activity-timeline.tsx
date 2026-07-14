import {
  History,
  Mail,
  PhoneCall,
  Presentation,
  ShoppingBag,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import type {
  CustomerActivityKind,
  CustomerDetails,
} from "@/data/customer-details";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CustomerSectionEmptyState } from "@/components/customers/details/customer-section-empty-state";
import { formatCustomerDate } from "@/components/customers/details/customer-detail-formatters";
import { RelativeActivityTime } from "@/components/customers/details/relative-activity-time";

const activityIcons = {
  account: UserPlus,
  purchase: ShoppingBag,
  meeting: Presentation,
  call: PhoneCall,
  email: Mail,
} satisfies Record<CustomerActivityKind, LucideIcon>;

export function CustomerActivityTimeline({ customer }: { customer: CustomerDetails }) {
  return (
    <Card className="shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader>
        <SectionHeader
          title="Recent activities"
          description="Latest interactions with this customer"
        />
      </CardHeader>
      <CardContent>
        {customer.activities.length === 0 ? (
          <CustomerSectionEmptyState
            icon={History}
            title="No activity yet"
            description="Calls, meetings, emails, and account updates will appear here."
          />
        ) : (
          <ol aria-label={`Recent activity for ${customer.name}`}>
            {customer.activities.map((activity, index) => {
              const Icon = activityIcons[activity.kind];

              return (
                <li key={activity.id} className="relative flex gap-4 pb-6 last:pb-0">
                  {index < customer.activities.length - 1 ? (
                    <span
                      className="absolute left-4 top-9 h-[calc(100%-2rem)] w-px bg-border"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground">
                    <Icon aria-hidden="true" className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-medium">{activity.title}</h3>
                      <RelativeActivityTime date={activity.date} />
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <time
                      dateTime={activity.date}
                      className="mt-1 block text-xs text-muted-foreground"
                    >
                      {formatCustomerDate(activity.date)}
                    </time>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
