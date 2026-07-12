"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc";
export type DataTableSort = { columnId: string; direction: SortDirection };

export type DataTableColumn<T> = {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
};

export type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey: (row: T, index: number) => React.Key;
  emptyState?: ReactNode;
  caption?: string;
  sort?: DataTableSort;
  onSortChange?: (sort: DataTableSort) => void;
  renderRowActions?: (row: T) => ReactNode;
  rowActionsLabel?: string;
  loading?: boolean;
  loadingRows?: number;
  onRowClick?: (row: T) => void;
  getRowLabel?: (row: T) => string;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  getRowKey,
  emptyState = "No results found.",
  caption = "Data table",
  sort,
  onSortChange,
  renderRowActions,
  rowActionsLabel = "Actions",
  loading = false,
  loadingRows = 5,
  onRowClick,
  getRowLabel,
  className,
}: DataTableProps<T>) {
  const columnCount = columns.length + (renderRowActions ? 1 : 0);

  function handleSort(column: DataTableColumn<T>) {
    if (!column.sortable || !onSortChange) return;
    onSortChange({
      columnId: column.id,
      direction:
        sort?.columnId === column.id && sort.direction === "asc"
          ? "desc"
          : "asc",
    });
  }

  function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, row: T) {
    if (
      event.target !== event.currentTarget ||
      !onRowClick ||
      (event.key !== "Enter" && event.key !== " ")
    )
      return;
    event.preventDefault();
    onRowClick(row);
  }

  return (
    <div
      className={cn("overflow-hidden rounded-xl border bg-card", className)}
      aria-busy={loading}
    >
      <Table>
        <caption className="sr-only">{caption}</caption>
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              const activeSort =
                sort?.columnId === column.id ? sort.direction : undefined;
              const SortIcon =
                activeSort === "asc"
                  ? ArrowUp
                  : activeSort === "desc"
                    ? ArrowDown
                    : ArrowUpDown;
              return (
                <TableHead
                  key={column.id}
                  className={cn(column.headerClassName, column.className)}
                  aria-sort={
                    activeSort === "asc"
                      ? "ascending"
                      : activeSort === "desc"
                        ? "descending"
                        : column.sortable
                          ? "none"
                          : undefined
                  }
                >
                  {column.sortable && onSortChange ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column)}
                      className="-ml-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {column.header}
                      <SortIcon
                        aria-hidden="true"
                        className="size-3.5 text-muted-foreground"
                      />
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
            {renderRowActions ? (
              <TableHead className="w-12 text-right">
                <span className="sr-only">{rowActionsLabel}</span>
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: loadingRows }, (_, rowIndex) => (
              <TableRow key={`loading-${rowIndex}`}>
                {columns.map((column) => (
                  <TableCell key={column.id} className={column.className}>
                    <Skeleton className="h-4 w-full max-w-32" />
                  </TableCell>
                ))}
                {renderRowActions ? (
                  <TableCell>
                    <Skeleton className="ml-auto size-8" />
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          ) : data.length ? (
            data.map((row, rowIndex) => (
              <TableRow
                key={getRowKey(row, rowIndex)}
                tabIndex={onRowClick ? 0 : undefined}
                aria-label={getRowLabel?.(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                onKeyDown={(event) => handleRowKeyDown(event, row)}
                className={cn(
                  onRowClick &&
                    "cursor-pointer outline-none focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                )}
              >
                {columns.map((column) => (
                  <TableCell key={column.id} className={column.className}>
                    {column.cell(row)}
                  </TableCell>
                ))}
                {renderRowActions ? (
                  <TableCell
                    className="text-right"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {renderRowActions(row)}
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columnCount}
                className="h-28 text-center text-muted-foreground"
              >
                {emptyState}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
