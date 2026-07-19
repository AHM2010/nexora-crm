"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
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
import { DealCard } from "@/components/deals/deal-card";
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
import { readStoredDeals, storeDeals } from "@/lib/deals-storage";
import {useFormatter, useTranslations} from "next-intl";

type SortOption = "manual" | "closingDate" | "value" | "customerName";
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

function reorderDeals(deals: Deal[], activeId: string, overId: string) {
  const activeIndex = deals.findIndex((deal) => deal.id === activeId);
  if (activeIndex < 0 || activeId === overId) return deals;

  const activeDeal = deals[activeIndex];
  const overDeal = deals.find((deal) => deal.id === overId);
  const columnStage = overId.startsWith("column-")
    ? overId.slice("column-".length)
    : null;
  const nextStage =
    columnStage && dealStages.includes(columnStage as DealStage)
      ? (columnStage as DealStage)
      : (overDeal?.stage ?? activeDeal.stage);
  const next = [...deals];
  next.splice(activeIndex, 1);

  const overIndex = next.findIndex((deal) => deal.id === overId);
  const insertionIndex =
    overIndex >= 0
      ? overIndex
      : next.reduce(
          (last, deal, index) =>
            deal.stage === nextStage ? index + 1 : last,
          0,
        );
  next.splice(insertionIndex, 0, { ...activeDeal, stage: nextStage });
  return next;
}

export function DealsWorkspace({ initialDeals }: { initialDeals: Deal[] }) {
  const t = useTranslations("Crm");
  const filtersT = useTranslations("Filters");
  const statusT = useTranslations("Status");
  const format = useFormatter();
  const initialDealsRef = useRef(initialDeals);
  const [boardDeals, setBoardDeals] = useState(initialDeals);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<DealStage | "all">("all");
  const [priority, setPriority] = useState<DealPriority | "all">("all");
  const [sort, setSort] = useState<SortOption>("manual");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setBoardDeals(readStoredDeals(initialDealsRef.current));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const visibleDeals = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = boardDeals.filter(
      (deal) =>
        (stage === "all" || deal.stage === stage) &&
        (priority === "all" || deal.priority === priority) &&
        (!term ||
          `${deal.title} ${deal.customerName} ${deal.company}`
            .toLowerCase()
            .includes(term)),
    );
    return sort === "manual"
      ? filtered
      : filtered.toSorted((a, b) =>
          sort === "value"
            ? b.value - a.value
            : sort === "customerName"
              ? a.customerName.localeCompare(b.customerName)
              : a.closingDate.localeCompare(b.closingDate),
        );
  }, [boardDeals, priority, search, sort, stage]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const totalValue = boardDeals.reduce((sum, deal) => sum + deal.value, 0);
  const won = boardDeals.filter((deal) => deal.stage === "won");
  const lost = boardDeals.filter((deal) => deal.stage === "lost");
  const hasFilters =
    Boolean(search.trim()) || stage !== "all" || priority !== "all";

  function handleDragStart(event: DragStartEvent) {
    const id = String(event.active.id);
    setActiveId(id);
    setAnnouncement(
      `Picked up ${boardDeals.find((deal) => deal.id === id)?.title ?? "deal"}.`,
    );
  }
  function handleDragEnd(event: DragEndEvent) {
    const active = String(event.active.id);
    setActiveId(null);
    if (!event.over) {
      setAnnouncement("Move cancelled. The board was not changed.");
      return;
    }

    const next = reorderDeals(boardDeals, active, String(event.over.id));
    setSort("manual");
    setBoardDeals(next);
    const persisted = storeDeals(next);
    const moved = next.find((deal) => deal.id === active);
    setAnnouncement(
      moved
        ? `${moved.title} moved to ${stageNames[moved.stage]}.${persisted ? "" : " The move could not be saved for the next visit."}`
        : "Deal moved.",
    );
  }
  function clearFilters() {
    setSearch("");
    setStage("all");
    setPriority("all");
  }
  const activeDeal = activeId
    ? (boardDeals.find((deal) => deal.id === activeId) ?? null)
    : null;

  return (
    <div className="section-stack motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
      <PageHeader
        title={t("dealsTitle")}
        description={t("dealsDescription", {count: boardDeals.length, value: format.number(totalValue, {style: "currency", currency: "USD", maximumFractionDigits: 0})})}
      />
      <section
        aria-label={t("pipelineSummary")}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          title={t("totalDeals")}
          value={boardDeals.length}
          icon={Handshake}
          description={t("allStagesDescription")}
        />
        <StatCard
          className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          title={t("pipelineValue")}
          value={currency.format(totalValue)}
          icon={CircleDollarSign}
          description={t("potentialRevenue")}
        />
        <StatCard
          className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          title={t("wonDeals")}
          value={won.length}
          icon={Trophy}
          description={currency.format(
            won.reduce((sum, deal) => sum + deal.value, 0),
          )}
        />
        <StatCard
          className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          title={t("lostDeals")}
          value={lost.length}
          icon={XCircle}
          description={currency.format(
            lost.reduce((sum, deal) => sum + deal.value, 0),
          )}
        />
      </section>

      <section
        aria-label={t("dealFilters")}
        className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-xs lg:flex-row lg:items-center"
      >
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={filtersT("dealSearch")}
          label={filtersT("searchDeals")}
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
              aria-label={filtersT("stage")}
            >
              <SelectValue>{stage === "all" ? filtersT("allStages") : statusT(stage)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{filtersT("allStages")}</SelectItem>
              {dealStages.map((item) => (
                <SelectItem key={item} value={item}>
                  {statusT(item)}
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
              aria-label={filtersT("priority")}
            >
              <SelectValue>{priority === "all" ? filtersT("allPriorities") : filtersT(priority)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{filtersT("allPriorities")}</SelectItem>
              <SelectItem value="low">{filtersT("low")}</SelectItem>
              <SelectItem value="medium">{filtersT("medium")}</SelectItem>
              <SelectItem value="high">{filtersT("high")}</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sort}
            onValueChange={(value) =>
              setSort((value ?? "manual") as SortOption)
            }
          >
            <SelectTrigger
              className="col-span-2 w-full sm:w-44"
              aria-label={filtersT("sortDeals")}
            >
              <SelectValue>{sort === "manual" ? filtersT("manual") : sort === "closingDate" ? filtersT("closingDate") : sort === "value" ? filtersT("dealValue") : filtersT("customerName")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">{filtersT("manual")}</SelectItem>
              <SelectItem value="closingDate">{filtersT("closingDate")}</SelectItem>
              <SelectItem value="value">{filtersT("dealValue")}</SelectItem>
              <SelectItem value="customerName">{filtersT("customerName")}</SelectItem>
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
          {t("dealCount", {count: visibleDeals.length}).replace(/^\d+\s*/, "")}
        </p>
        {hasFilters ? (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <RotateCcw />
            {t("resetFilters")}
          </Button>
        ) : null}
      </div>

      {boardDeals.length === 0 ? (
        <EmptyState
          icon={Handshake}
          title={t("emptyPipeline")}
          description={t("emptyPipelineDescription")}
        />
      ) : visibleDeals.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={t("noDeals")}
          description={t("noDealsDescription")}
          action={
            <Button variant="outline" onClick={clearFilters}>
              {t("clearFilters")}
            </Button>
          }
        />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          autoScroll={{ threshold: { x: 0.15, y: 0.15 }, acceleration: 10 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <section
            aria-label={t("kanban")}
            className="-mx-6 overflow-x-auto overscroll-x-contain scroll-smooth px-6 pb-3 lg:-mx-8 lg:px-8"
          >
            <p className="sr-only">
              Use each deal card&apos;s move handle with a pointer, touch, or
              keyboard. Press Space to pick up a focused handle and use arrow
              keys to move it.
            </p>
            <div className="grid snap-x snap-proximity grid-flow-col auto-cols-[82vw] gap-4 sm:auto-cols-68 lg:auto-cols-60">
              {dealStages.map((columnStage) => (
                <DealColumn
                  key={columnStage}
                  stage={columnStage}
                  title={statusT(columnStage)}
                  deals={visibleDeals.filter(
                    (deal) => deal.stage === columnStage,
                  )}
                  onOpen={setSelectedDeal}
                />
              ))}
            </div>
          </section>
          <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
            {activeDeal ? (
              <div className="w-[min(19rem,82vw)] rotate-1 cursor-grabbing opacity-95 shadow-2xl">
                <DealCard deal={activeDeal} onOpen={() => undefined} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
      <p className="sr-only" aria-live="assertive" aria-atomic="true">
        {announcement}
      </p>

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
