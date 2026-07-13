import { Skeleton } from "@/components/ui/skeleton";

export function CustomersSkeleton() {
  return (
    <div className="section-stack" aria-label="Loading customers" role="status">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-4 w-80 max-w-[70vw]" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 w-full sm:w-32" />
        <Skeleton className="h-8 w-full sm:w-40" />
        <Skeleton className="h-8 w-full sm:w-32" />
      </div>
      <div className="overflow-hidden rounded-xl border bg-card">
        <Skeleton className="h-10 rounded-none" />
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="flex items-center gap-4 border-t p-3">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="hidden h-4 flex-1 sm:block" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-56" />
      </div>
      <span className="sr-only">Loading customer directory…</span>
    </div>
  );
}
