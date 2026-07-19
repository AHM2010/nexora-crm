import {
  ChartSkeleton,
  ListSkeleton,
  StatsSkeleton,
} from "@/components/dashboard/dashboard-skeletons";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded-md bg-muted" />
      </div>
      <StatsSkeleton />
      <ChartSkeleton />
      <div className="grid gap-6 lg:grid-cols-2">
        <ListSkeleton />
        <ListSkeleton />
      </div>
    </div>
  );
}
