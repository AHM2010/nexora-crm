import { Skeleton } from "@/components/ui/skeleton";

export function DealsSkeleton() {
  return (
    <div
      className="section-stack motion-safe:animate-in motion-safe:fade-in"
      aria-label="Loading deals pipeline"
      aria-busy="true"
      role="status"
    >
      <div className="space-y-2">
        <Skeleton className="h-9 w-52" />
        <Skeleton className="h-4 w-80 max-w-[75vw]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="space-y-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
          >
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-9" />
            </div>
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 w-full sm:w-36" />
        <Skeleton className="h-8 w-full sm:w-36" />
        <Skeleton className="h-8 w-full sm:w-40" />
      </div>
      <div className="-mx-6 overflow-hidden px-6 lg:-mx-8 lg:px-8">
        <div className="grid grid-flow-col auto-cols-[82vw] gap-4 sm:auto-cols-68 lg:auto-cols-60">
          {Array.from({ length: 6 }, (_, column) => (
            <div
              key={column}
              className="min-h-112 space-y-3 rounded-xl border bg-muted/35 p-3"
            >
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="size-7 rounded-full" />
              </div>
              {Array.from({ length: 2 }, (_, card) => (
                <Skeleton key={card} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading deals pipeline…</span>
    </div>
  );
}
