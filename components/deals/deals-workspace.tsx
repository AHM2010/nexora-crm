"use client";

import { useMemo, useState } from "react";
import {
  CircleDollarSign,
  Handshake,
  RotateCcw,
  SearchX,
  Trophy,
  XCircle,
} from "lucide-react";
import type { Deal, DealPriority, DealStage } from "@/data/deals";
import { dealStages } from "@/data/deals";
import { DealColumn } from "@/components/deals/deal-column";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { StatCard } from "@/components/shared/stat-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "closingDate" | "value" | "customerName";
const stageNames: Record<DealStage, string> = {
  lead: "Lead",
  contacted: "Contacted",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function DealsWorkspace({ initialDeals }: { initialDeals: Deal[] }) {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<DealStage | "all">("all");
  const [priority, setPriority] = useState<DealPriority | "all">("all");
  const [sort, setSort] = useState<SortOption>("closingDate");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const visibleDeals = useMemo(() => {
    const term = search.trim().toLowerCase();
    return initialDeals
      .filter(
        (deal) =>
          (stage === "all" || deal.stage === stage) &&
          (priority === "all" || deal.priority === priority) &&
          (!term ||
            `${deal.title} ${deal.customerName} ${deal.company}`
              .toLowerCase()
              .includes(term)),
      )
      .sort((a, b) =>
        sort === "value"
          ? b.value - a.value
          : sort === "customerName"
            ? a.customerName.localeCompare(b.customerName)
            : a.closingDate.localeCompare(b.closingDate),
      );
  }, [initialDeals, priority, search, sort, stage]);

  const totalValue = initialDeals.reduce((sum, deal) => sum + deal.value, 0);
  const won = initialDeals.filter((deal) => deal.stage === "won");
  const lost = initialDeals.filter((deal) => deal.stage === "lost");
  const hasFilters =
    Boolean(search.trim()) || stage !== "all" || priority !== "all";

  function clearFilters() {
    setSearch("");
    setStage("all");
    setPriority("all");
  }

  return (
    <div className="section-stack motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
      <PageHeader
        title="Deals Pipeline"
        description={`${initialDeals.length} deals · ${currency.format(totalValue)} total pipeline value`}
      />

      <section
        aria-label="Pipeline summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          title="Total Deals"
          value={initialDeals.length}
          icon={Handshake}
          description="Across all pipeline stages"
        />
        <StatCard
          className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          title="Pipeline Value"
          value={currency.format(totalValue)}
          icon={CircleDollarSign}
          description="Total potential revenue"
        />
        <StatCard
          className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          title="Won Deals"
          value={won.length}
          icon={Trophy}
          description={currency.format(
            won.reduce((sum, deal) => sum + deal.value, 0),
          )}
        />
        <StatCard
          className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          title="Lost Deals"
          value={lost.length}
          icon={XCircle}
          description={currency.format(
            lost.reduce((sum, deal) => sum + deal.value, 0),
          )}
        />
      </section>

      <section
        aria-label="Deal filters"
        className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-xs lg:flex-row lg:items-center"
      >
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search deals, customers, or companies…"
          label="Search deals"
          containerClassName="sm:max-w-none lg:max-w-md lg:flex-1"
        />
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Select
            value={stage}
            onValueChange={(value) =>
              setStage((value ?? "all") as DealStage | "all")
            }
          >
            <SelectTrigger
              className="w-full sm:w-36"
              aria-label="Filter by stage"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stages</SelectItem>
              {dealStages.map((item) => (
                <SelectItem key={item} value={item}>
                  {stageNames[item]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={priority}
            onValueChange={(value) =>
              setPriority((value ?? "all") as DealPriority | "all")
            }
          >
            <SelectTrigger
              className="w-full sm:w-36"
              aria-label="Filter by priority"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="low">Low priority</SelectItem>
              <SelectItem value="medium">Medium priority</SelectItem>
              <SelectItem value="high">High priority</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sort}
            onValueChange={(value) =>
              setSort((value ?? "closingDate") as SortOption)
            }
          >
            <SelectTrigger
              className="col-span-2 w-full sm:w-40"
              aria-label="Sort deals"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="closingDate">Closing date</SelectItem>
              <SelectItem value="value">Deal value</SelectItem>
              <SelectItem value="customerName">Customer name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <div
        className="flex items-center justify-between gap-4 text-sm text-muted-foreground"
        aria-live="polite"
      >
        <p>
          <span className="font-medium text-foreground">
            {visibleDeals.length}
          </span>{" "}
          {visibleDeals.length === 1 ? "deal" : "deals"} shown
        </p>
        {hasFilters ? (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <RotateCcw />
            Reset filters
          </Button>
        ) : null}
      </div>

      {initialDeals.length === 0 ? (
        <EmptyState
          icon={Handshake}
          title="Your pipeline is empty"
          description="Create your first deal to start tracking opportunities across the sales process."
        />
      ) : visibleDeals.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No deals found"
          description="No deals match your current search and filters. Try broadening your criteria."
          action={
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <section
          aria-label="Deals kanban board"
          className="-mx-6 overflow-x-auto overscroll-x-contain scroll-smooth px-6 pb-3 lg:-mx-8 lg:px-8"
        >
          <div className="grid snap-x snap-proximity grid-flow-col auto-cols-[82vw] gap-4 sm:auto-cols-68 lg:auto-cols-60">
            {dealStages.map((columnStage) => {
              const columnDeals = visibleDeals.filter(
                (deal) => deal.stage === columnStage,
              );
              return (
                <DealColumn
                  key={columnStage}
                  stage={columnStage}
                  title={stageNames[columnStage]}
                  deals={columnDeals}
                  onOpen={setSelectedDeal}
                />
              );
            })}
          </div>
        </section>
      )}

      <Dialog
        open={selectedDeal !== null}
        onOpenChange={(open) => !open && setSelectedDeal(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDeal?.title}</DialogTitle>
            <DialogDescription>
              {selectedDeal?.customerName} · {selectedDeal?.company}
            </DialogDescription>
          </DialogHeader>
          {selectedDeal ? (
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Deal value</p>
                <p className="font-semibold">
                  {currency.format(selectedDeal.value)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Assigned to</p>
                <p className="font-semibold">{selectedDeal.assignedTo}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">Notes</p>
                <p className="mt-1 text-muted-foreground">
                  {selectedDeal.notes}
                </p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
