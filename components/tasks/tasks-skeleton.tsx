import { Skeleton } from "@/components/ui/skeleton";

export function TasksSkeleton() {
  return (
    <div
      className="section-stack"
      aria-label="Loading tasks"
      aria-busy="true"
      role="status"
    >
      <div className="space-y-2">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-4 w-80 max-w-[75vw]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-36 rounded-xl" />
        ))}
      </div>
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 w-full sm:w-36" />
        <Skeleton className="h-8 w-full sm:w-36" />
        <Skeleton className="h-8 w-full sm:w-40" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-48 rounded-xl" />
        ))}
      </div>
      <span className="sr-only">Loading tasks…</span>
    </div>
  );
}
