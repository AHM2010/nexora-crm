import { Building2, CalendarDays, GripVertical } from "lucide-react";
import { memo } from "react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
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

export const DealCard = memo(function DealCard({
  deal,
  onOpen,
  dragAttributes,
  dragListeners,
  isDragging = false,
}: {
  deal: Deal;
  onOpen: (deal: Deal) => void;
  dragAttributes?: DraggableAttributes;
  dragListeners?: SyntheticListenerMap;
  isDragging?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(deal)}
      className={cn(
        "group w-full rounded-xl border border-l-4 bg-card p-4 text-left shadow-xs outline-none transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring",
        stageBorder[deal.stage],
        isDragging && "opacity-40 shadow-none",
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
        <div className="flex shrink-0 items-center gap-1">
          <PriorityBadge priority={deal.priority} className="text-[10px]" />
          {dragAttributes ? (
            <span
              {...dragAttributes}
              {...dragListeners}
              className="touch-none cursor-grab rounded-md p-1 text-muted-foreground opacity-70 outline-none hover:bg-muted hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
              aria-label={`Move ${deal.title}. Press Space to pick up, then use arrow keys to move.`}
              onClick={(event) => event.stopPropagation()}
            >
              <GripVertical className="size-4" aria-hidden="true" />
            </span>
          ) : null}
        </div>
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
});

DealCard.displayName = "DealCard";
