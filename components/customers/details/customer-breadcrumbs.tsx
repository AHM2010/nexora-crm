import Link from "next/link";
import { ChevronRight } from "lucide-react";

const linkStyles =
  "rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function CustomerBreadcrumbs({ customerName }: { customerName: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/dashboard" className={linkStyles}>
            Dashboard
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5" />
        </li>
        <li>
          <Link href="/customers" className={linkStyles}>
            Customers
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5" />
        </li>
        <li className="max-w-52 truncate font-medium text-foreground" aria-current="page">
          {customerName}
        </li>
      </ol>
    </nav>
  );
}
