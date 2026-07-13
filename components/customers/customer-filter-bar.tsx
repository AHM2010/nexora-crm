"use client";

import type { CustomerStatus } from "@/data/customers";
import type { CustomerSortSelectValue } from "@/components/customers/use-customer-directory";
import { SearchInput } from "@/components/shared/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CustomerFilterBarProps = {
  search: string;
  status: CustomerStatus | "all";
  company: string;
  sort: CustomerSortSelectValue;
  companies: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CustomerStatus | "all") => void;
  onCompanyChange: (value: string) => void;
  onSortChange: (value: CustomerSortSelectValue) => void;
};

export function CustomerFilterBar({
  search,
  status,
  company,
  sort,
  companies,
  onSearchChange,
  onStatusChange,
  onCompanyChange,
  onSortChange,
}: CustomerFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-xs lg:flex-row lg:items-center">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search name, company, email, or phone…"
        label="Search customers"
        containerClassName="sm:max-w-none lg:max-w-md lg:flex-1"
      />
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <Select
          value={status}
          onValueChange={(value) =>
            onStatusChange((value ?? "all") as CustomerStatus | "all")
          }
        >
          <SelectTrigger
            className="w-full sm:w-32"
            aria-label="Filter by status"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={company}
          onValueChange={(value) => onCompanyChange(value ?? "all")}
        >
          <SelectTrigger
            className="w-full sm:w-44"
            aria-label="Filter by company"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All companies</SelectItem>
            {companies.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={sort}
          onValueChange={(value) =>
            onSortChange((value ?? "newest") as CustomerSortSelectValue)
          }
        >
          <SelectTrigger
            className="col-span-2 w-full sm:w-36"
            aria-label="Sort customers"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sort === "custom" ? (
              <SelectItem value="custom" disabled>
                Custom sort
              </SelectItem>
            ) : null}
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="name-asc">Name A–Z</SelectItem>
            <SelectItem value="name-desc">Name Z–A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
