import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type LoadingListProps = {
  items?: number;
  showAvatar?: boolean;
  className?: string;
};

export function LoadingList({
  items = 4,
  showAvatar = true,
  className,
}: LoadingListProps) {
  return (
    <div
      className={cn("divide-y rounded-xl border bg-card", className)}
      aria-label="Loading list"
      aria-busy="true"
    >
      {Array.from({ length: items }, (_, index) => (
        <div key={index} className="flex items-center gap-3 p-4">
          {showAvatar ? (
            <Skeleton className="size-9 shrink-0 rounded-full" />
          ) : null}
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
          <Skeleton className="hidden h-7 w-16 sm:block" />
        </div>
      ))}
    </div>
  );
}
