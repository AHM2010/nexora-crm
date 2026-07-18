"use client";

import { memo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Deal, DealStage } from "@/data/deals";
import { DealCard } from "@/components/deals/deal-card";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function SortableDealCard({ deal, onOpen }: { deal: Deal; onOpen: (deal: Deal) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: deal.id, data: { stage: deal.stage } });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="will-change-transform"
    >
      <DealCard
        deal={deal}
        onOpen={onOpen}
        dragAttributes={attributes}
        dragListeners={listeners}
        isDragging={isDragging}
      />
    </div>
  );
}

export const DealColumn = memo(function DealColumn({
  stage,
  title,
  deals,
  onOpen,
}: {
  stage: DealStage;
  title: string;
  deals: Deal[];
  onOpen: (deal: Deal) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${stage}`,
    data: { stage },
  });
  const total = deals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <section
      aria-labelledby={`stage-${stage}`}
      className={`flex min-h-112 snap-start flex-col rounded-xl border bg-muted/35 p-3 transition-colors ${isOver ? "border-accent bg-accent/8 ring-2 ring-accent/20" : ""}`}
    >
      <header className="mb-3 flex items-start justify-between gap-2 px-1">
        <div>
          <h2 id={`stage-${stage}`} className="font-semibold">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {currency.format(total)}
          </p>
        </div>
        <span
          className="flex size-7 items-center justify-center rounded-full bg-background text-xs font-semibold shadow-xs ring-1 ring-foreground/10"
          aria-label={`${deals.length} ${deals.length === 1 ? "deal" : "deals"}`}
        >
          {deals.length}
        </span>
      </header>
      <div ref={setNodeRef} className="max-h-144 min-h-24 space-y-3 overflow-y-auto overscroll-contain pr-1">
        <SortableContext items={deals.map((deal) => deal.id)} strategy={verticalListSortingStrategy}>
          {deals.map((deal) => (
            <SortableDealCard key={deal.id} deal={deal} onOpen={onOpen} />
          ))}
        </SortableContext>
        {deals.length === 0 ? (
          <div className="rounded-xl border border-dashed p-6 text-center text-xs text-muted-foreground">
            Drop a deal here
          </div>
        ) : null}
      </div>
    </section>
  );
});

DealColumn.displayName = "DealColumn";
