import type { Deal, DealStage } from "@/data/deals";
import { DealCard } from "@/components/deals/deal-card";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function DealColumn({
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
  const total = deals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <section
      aria-labelledby={`stage-${stage}`}
      className="flex min-h-112 snap-start flex-col rounded-xl border bg-muted/35 p-3"
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
      <div className="max-h-144 space-y-3 overflow-y-auto overscroll-contain pr-1">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onOpen={onOpen} />
        ))}
        {deals.length === 0 ? (
          <div className="rounded-xl border border-dashed p-6 text-center text-xs text-muted-foreground">
            No deals in this stage
          </div>
        ) : null}
      </div>
    </section>
  );
}
