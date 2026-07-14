import { Building2, CalendarDays } from "lucide-react";
import type { Deal, DealStage } from "@/data/deals";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";

const stageBorder: Record<DealStage, string> = {
  lead: "border-l-slate-400",
  contacted: "border-l-sky-500",
  proposal: "border-l-violet-500",
  negotiation: "border-l-amber-500",
  won: "border-l-success",
  lost: "border-l-destructive",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const date = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function DealCard({
  deal,
  onOpen,
}: {
  deal: Deal;
  onOpen: (deal: Deal) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(deal)}
      className={cn(
        "group w-full rounded-xl border border-l-4 bg-card p-4 text-left shadow-xs outline-none transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring",
        stageBorder[deal.stage],
      )}
      aria-label={`Open ${deal.title} deal`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-2 font-semibold leading-snug text-foreground">
            {deal.title}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <UserAvatar
              name={deal.customerName}
              src={deal.customerAvatar}
              size="sm"
            />
            <p className="truncate text-sm text-muted-foreground">
              {deal.customerName}
            </p>
          </div>
        </div>
        <PriorityBadge
          priority={deal.priority}
          className="shrink-0 text-[10px]"
        />
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Building2 className="size-3.5" aria-hidden="true" />
        <span className="truncate">{deal.company}</span>
      </div>
      <div className="my-3 h-px bg-border" />
      <div className="flex items-center justify-between gap-3">
        <span className="text-base font-semibold tracking-tight">
          {currency.format(deal.value)}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {date.format(new Date(deal.closingDate))}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t pt-3">
        <UserAvatar name={deal.assignedTo} size="sm" />
        <span className="truncate text-xs text-muted-foreground">
          {deal.assignedTo}
        </span>
      </div>
    </button>
  );
}
