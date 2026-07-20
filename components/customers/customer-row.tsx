"use client";

import { Link, useRouter } from "@/src/i18n/navigation";
import type { Customer } from "@/data/customers";
import { CustomerActionsDropdown } from "@/components/customers/customer-actions-dropdown";
import { CustomerAvatar } from "@/components/customers/customer-avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { TableCell, TableRow } from "@/components/ui/table";
import {useTranslations} from "next-intl";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function CustomerRow({
  customer,
  onAction,
  onDelete,
}: {
  customer: Customer;
  onAction: (message: string) => void;
  onDelete: (customer: Customer) => void;
}) {
  const router = useRouter();
  const t = useTranslations("Crm");

  return (
    <TableRow className="odd:bg-muted/20 transition-[background-color,opacity] duration-150 hover:bg-muted/55 motion-reduce:transition-none">
      <TableCell className="min-w-56 px-4">
        <div className="flex items-center gap-3">
          <CustomerAvatar name={customer.name} src={customer.avatar} />
          <div>
            <Link href={`/customers/${customer.id}`} className="rounded-sm font-medium text-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring">{customer.name}</Link>
            <div className="text-xs text-muted-foreground lg:hidden">
              {customer.email}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="min-w-40 text-foreground/80">
        {customer.company}
      </TableCell>
      <TableCell className="min-w-56">
        <a
          className="rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          href={`mailto:${customer.email}`}
        >
          {customer.email}
        </a>
      </TableCell>
      <TableCell className="min-w-40">
        <a
          className="rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          href={`tel:${customer.phone}`}
        >
          {customer.phone}
        </a>
      </TableCell>
      <TableCell className="w-28">
        <StatusBadge status={customer.status} />
      </TableCell>
      <TableCell className="min-w-32">
        <time className="text-muted-foreground" dateTime={customer.createdAt}>
          {dateFormatter.format(new Date(`${customer.createdAt}T00:00:00`))}
        </time>
      </TableCell>
      <TableCell className="w-12 text-right">
        <CustomerActionsDropdown
          customer={customer}
          onView={() => router.push(`/customers/${customer.id}`)}
          onEdit={() => onAction(t("customerEditing", {name: customer.name}))}
          onDelete={() => onDelete(customer)}
        />
      </TableCell>
    </TableRow>
  );
}
