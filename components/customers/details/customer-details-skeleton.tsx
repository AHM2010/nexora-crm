import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProfileHeaderSkeleton() {
  return (
    <Card className="relative min-h-52 shadow-sm">
      <Skeleton className="absolute inset-x-0 top-0 h-20 rounded-none" />
      <CardContent className="relative flex flex-col gap-5 pt-12 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Skeleton className="size-20 shrink-0 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-56 max-w-[70vw]" />
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-72 max-w-[70vw]" />
          </div>
        </div>
        <Skeleton className="h-11 w-full sm:w-36" />
      </CardContent>
    </Card>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <Card key={index} className="min-h-32 shadow-sm">
          <CardHeader className="flex-row items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="size-9 rounded-lg" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function InformationSkeleton() {
  return (
    <Card className="min-h-64 shadow-sm">
      <CardHeader>
        <Skeleton className="h-5 w-44" />
      </CardHeader>
      <CardContent className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-36" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function DealsSkeleton() {
  return (
    <Card className="min-h-72 shadow-sm">
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-3 w-52" />
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="space-y-4 rounded-lg border p-4">
            <div className="flex justify-between gap-3">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <Skeleton className="h-7 w-24" />
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function NotesSkeleton() {
  return (
    <Card className="min-h-72 shadow-sm">
      <CardHeader className="flex-row items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-11 w-24" />
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="space-y-3 rounded-lg border p-4">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-3 w-40" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ActivitiesSkeleton() {
  return (
    <Card className="min-h-140 shadow-sm">
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-3 w-52" />
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex gap-4">
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function CustomerDetailsSkeleton() {
  return (
    <div
      className="section-stack"
      role="status"
      aria-label="Loading customer details"
    >
      <Skeleton className="h-5 w-64 max-w-[80vw]" />
      <ProfileHeaderSkeleton />
      <StatsSkeleton />
      <InformationSkeleton />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <div className="space-y-6">
          <DealsSkeleton />
          <NotesSkeleton />
        </div>
        <ActivitiesSkeleton />
      </div>
      <span className="sr-only">Loading customer profile…</span>
    </div>
  );
}
