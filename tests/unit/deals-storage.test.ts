import { deals } from "@/data/deals";
import { describe, expect, it, vi } from "vitest";
import { reorderDeals } from "@/components/deals/deals-workspace";
import {
  DEALS_STORAGE_KEY,
  readStoredDeals,
  storeDeals,
} from "@/lib/deals-storage";

describe("deal board persistence", () => {
  it("moves a deal to an empty stage without duplication or data loss", () => {
    const source = deals.filter((deal) => deal.stage !== "lost");
    const active = source[0];
    const moved = reorderDeals(source, active.id, "column-lost");
    expect(moved.find((deal) => deal.id === active.id)?.stage).toBe("lost");
    expect(new Set(moved.map((deal) => deal.id)).size).toBe(source.length);
  });

  it("reorders cards within a stage", () => {
    const sameStage = deals.filter((deal) => deal.stage === deals[0].stage);
    expect(sameStage.length).toBeGreaterThan(1);
    const reordered = reorderDeals(deals, sameStage[0].id, sameStage[1].id);
    expect(
      reordered.indexOf(reordered.find((deal) => deal.id === sameStage[0].id)!),
    ).toBe(
      reordered.indexOf(
        reordered.find((deal) => deal.id === sameStage[1].id)!,
      ) + 1,
    );
  });

  it("falls back safely for malformed saved JSON", () => {
    localStorage.setItem(DEALS_STORAGE_KEY, "{broken");
    expect(readStoredDeals(deals)).toEqual(deals);
  });

  it("restores valid stage/order changes without duplicates", () => {
    const moved = [
      { ...deals[2], stage: "won" as const },
      { ...deals[0], stage: "proposal" as const },
      deals[2],
    ];
    localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(moved));
    const restored = readStoredDeals(deals);

    expect(restored[0]).toMatchObject({ id: deals[2].id, stage: "won" });
    expect(restored[1]).toMatchObject({ id: deals[0].id, stage: "proposal" });
    expect(new Set(restored.map((deal) => deal.id)).size).toBe(deals.length);
  });

  it("reports unavailable storage without throwing", () => {
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new DOMException("blocked");
      });
    expect(storeDeals(deals)).toBe(false);
    spy.mockRestore();
  });
});
