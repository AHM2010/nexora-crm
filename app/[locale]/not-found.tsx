import { Link } from "@/src/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="type-page-title">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The page you requested doesn’t exist or may have moved.
        </p>
        <Button render={<Link href="/dashboard" />}>Go to dashboard</Button>
      </div>
    </main>
  );
}
