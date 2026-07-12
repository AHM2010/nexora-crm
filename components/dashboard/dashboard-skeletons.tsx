import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <Card key={index}>
          <CardHeader className="flex-row items-center justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="size-9 rounded-lg" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3.5 w-36" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
export function ChartSkeleton() {
  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-3 w-44" />
        </div>
        <Skeleton className="h-8 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-72 w-full sm:h-80" />
      </CardContent>
    </Card>
  );
}
export function ListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-44" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-4/5" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
