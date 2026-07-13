"use client";

import { SearchInput } from "@/components/shared/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CustomerFiltersProps = {
  search: string;
  status: string;
  company: string;
  sort: string;
  companies: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export function CustomerFilters(props: CustomerFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-xs lg:flex-row lg:items-center">
      <SearchInput
        value={props.search}
        onChange={props.onSearchChange}
        placeholder="Search name, company, email, or phone…"
        label="Search customers"
        containerClassName="sm:max-w-none lg:max-w-md lg:flex-1"
      />
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <Select
          value={props.status}
          onValueChange={(value) => props.onStatusChange(value ?? "all")}
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
          value={props.company}
          onValueChange={(value) => props.onCompanyChange(value ?? "all")}
        >
          <SelectTrigger
            className="w-full sm:w-44"
            aria-label="Filter by company"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All companies</SelectItem>
            {props.companies.map((company) => (
              <SelectItem key={company} value={company}>
                {company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={props.sort}
          onValueChange={(value) => props.onSortChange(value ?? "newest")}
        >
          <SelectTrigger
            className="col-span-2 w-full sm:w-36"
            aria-label="Sort customers"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
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
