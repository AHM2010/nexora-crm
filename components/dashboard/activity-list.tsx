import {
  CircleDollarSign,
  Mail,
  MessagesSquare,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { UserAvatar } from "@/components/shared/user-avatar";
import type { Activity, ActivityKind } from "@/data/activities";
import {useTranslations} from "next-intl";

const activityIcons = {
  deal: CircleDollarSign,
  call: Phone,
  email: Mail,
  task: MessagesSquare,
} satisfies Record<ActivityKind, LucideIcon>;

export function ActivityList({ activities }: { activities: Activity[] }) {
  const t = useTranslations("Dashboard");
  if (!activities.length)
    return (
      <EmptyState
        title="No recent activity"
        description="Customer updates and team actions will appear here."
        icon={MessagesSquare}
      />
    );
  return (
    <ul
      className="max-h-96 divide-y overflow-y-auto"
      aria-label={t("activityLabel")}
    >
      {activities.map((activity) => {
        const Icon = activityIcons[activity.kind];
        return (
          <li
            key={activity.id}
            className="group flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/45 sm:px-5"
          >
            <UserAvatar
              name={activity.customerName}
              src={activity.avatarUrl}
              size="sm"
              className="mt-0.5"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-5">
                <span className="font-medium">{activity.customerName}</span>{" "}
                <span className="text-muted-foreground">
                  {activity.description}
                </span>
              </p>
              <time className="mt-1 block text-xs text-muted-foreground">
                {activity.timestamp}
              </time>
            </div>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-card group-hover:text-foreground">
              <Icon aria-hidden="true" className="size-3.5" />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
