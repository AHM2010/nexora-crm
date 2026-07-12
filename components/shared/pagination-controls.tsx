"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

export type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number;
};

function getVisiblePages(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 5 + siblingCount * 2)
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  const start = Math.max(2, currentPage - siblingCount);
  const end = Math.min(totalPages - 1, currentPage + siblingCount);
  const pages: Array<number | "ellipsis"> = [1];
  if (start > 2) pages.push("ellipsis");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < totalPages - 1) pages.push("ellipsis");
  pages.push(totalPages);
  return pages;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  siblingCount = 1,
}: PaginationControlsProps) {
  const safeTotal = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(1, currentPage), safeTotal);
  const pages = getVisiblePages(safePage, safeTotal, Math.max(0, siblingCount));

  return (
    <Pagination className="justify-between gap-3" aria-label="Table pagination">
      <span className="hidden text-sm text-muted-foreground sm:block">
        Page {safePage} of {safeTotal}
      </span>
      <PaginationContent className="mx-auto sm:mx-0">
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            aria-label="Go to previous page"
            disabled={disabled || safePage <= 1}
            onClick={() => onPageChange(safePage - 1)}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <span className="flex size-8 items-center justify-center text-muted-foreground">
                <MoreHorizontal aria-hidden="true" className="size-4" />
                <span className="sr-only">More pages</span>
              </span>
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <Button
                variant={page === safePage ? "outline" : "ghost"}
                size="icon"
                aria-label={`Go to page ${page}`}
                aria-current={page === safePage ? "page" : undefined}
                disabled={disabled || page === safePage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            aria-label="Go to next page"
            disabled={disabled || safePage >= safeTotal}
            onClick={() => onPageChange(safePage + 1)}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
