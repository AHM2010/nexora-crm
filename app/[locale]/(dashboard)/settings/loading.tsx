import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="space-y-8" aria-label="Loading settings">
      <div className="space-y-2">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)]">
        <Skeleton className="hidden h-72 rounded-xl lg:block" />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-xl border bg-card p-5">
              <div className="flex gap-3">
                <Skeleton className="size-9 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-64 max-w-full" />
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-9" />
                <Skeleton className="h-9" />
                <Skeleton className="h-9" />
                <Skeleton className="h-9" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
