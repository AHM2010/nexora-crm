import type { Deal } from "@/data/deals";
import { dealStages } from "@/data/deals";

export const DEALS_STORAGE_KEY = "nexora:deals-board:v1";

export function readStoredDeals(fallback: Deal[]): Deal[] {
  if (typeof window === "undefined") return fallback;

  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(DEALS_STORAGE_KEY) ?? "null",
    );
    if (!Array.isArray(parsed)) return fallback;

    const fallbackById = new Map(fallback.map((deal) => [deal.id, deal]));
    const restored = parsed.flatMap((item) => {
      if (!item || typeof item !== "object" || !("id" in item)) return [];
      const original = fallbackById.get(String(item.id));
      if (!original) return [];
      const stage = "stage" in item ? String(item.stage) : original.stage;
      fallbackById.delete(original.id);
      return [
        {
          ...original,
          stage: dealStages.includes(stage as Deal["stage"])
            ? (stage as Deal["stage"])
            : original.stage,
        },
      ];
    });

    return [...restored, ...fallbackById.values()];
  } catch {
    return fallback;
  }
}

export function storeDeals(deals: Deal[]): boolean {
  try {
    window.localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(deals));
    window.dispatchEvent(new Event("nexora:deals-updated"));
    return true;
  } catch {
    return false;
  }
}
