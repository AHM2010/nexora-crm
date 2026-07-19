"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import {useTranslations} from "next-intl";
import type { Customer } from "@/data/customers";
import type {
  CustomerSort,
  CustomerSortKey,
} from "@/components/customers/use-customer-directory";
import { CustomerRow } from "@/components/customers/customer-row";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const columns: Array<{
  key: CustomerSortKey;
  className: string;
}> = [
  { key: "name", className: "min-w-56 px-4" }, { key: "company", className: "min-w-40" },
  { key: "email", className: "min-w-56" }, { key: "phone", className: "min-w-40" },
  { key: "status", className: "w-28" }, { key: "createdAt", className: "min-w-32" },
];

export type CustomerTableProps = {
  customers: Customer[];
  sort: CustomerSort;
  onSort: (key: CustomerSortKey) => void;
  onAction: (message: string) => void;
  onDelete: (customer: Customer) => void;
  emptyState: React.ReactNode;
  resultsKey: string;
};

export function CustomerTable({
  customers,
  sort,
  onSort,
  onAction,
  onDelete,
  emptyState,
  resultsKey,
}: CustomerTableProps) {
  const t = useTranslations("Table");
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table containerClassName="max-h-[min(65vh,44rem)]">
        <caption className="sr-only">{t("directory")}</caption>
        <TableHeader className="sticky top-0 z-10 bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/85">
          <TableRow>
            {columns.map((column) => {
              const direction =
                sort.key === column.key ? sort.direction : undefined;
              const SortIcon =
                direction === "asc"
                  ? ArrowUp
                  : direction === "desc"
                    ? ArrowDown
                    : ArrowUpDown;
              return (
                <TableHead
                  key={column.key}
                  className={column.className}
                  aria-sort={
                    direction === "asc"
                      ? "ascending"
                      : direction === "desc"
                        ? "descending"
                        : "none"
                  }
                >
                  <button
                    type="button"
                    onClick={() => onSort(column.key)}
                    className="-ms-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {t(column.key)}
                    <SortIcon
                      aria-hidden="true"
                      className="size-3.5 text-muted-foreground"
                    />
                  </button>
                </TableHead>
              );
            })}
            <TableHead className="w-12">
              <span className="sr-only">{t("actions")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          key={resultsKey}
          className="animate-in fade-in duration-200 motion-reduce:animate-none"
        >
          {customers.length ? (
            customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onAction={onAction}
                onDelete={onDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-auto p-5 font-normal">
                {emptyState}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
