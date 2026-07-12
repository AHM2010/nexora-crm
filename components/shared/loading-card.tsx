import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingCard() {
  return (
    <Card aria-label="Loading content" aria-busy="true">
      <CardHeader>
        <Skeleton className="h-4 w-28" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );
}
