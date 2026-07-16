"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Something went wrong
        </p>
        <h1 className="type-page-title">We couldn’t load this page</h1>
        <p className="text-sm text-muted-foreground">
          Try again. If the problem continues, return to the dashboard.
        </p>
        <div className="flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button
            variant="outline"
            onClick={() => window.location.assign("/dashboard")}
          >
            Go to dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}
