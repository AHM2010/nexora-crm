"use client";

import { useMemo, useState } from "react";
import type { Customer, CustomerStatus } from "@/data/customers";
import type { SortDirection } from "@/components/shared/data-table";

export type CustomerSortKey =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "status"
  | "createdAt";
export type CustomerSort = { key: CustomerSortKey; direction: SortDirection };
export type CustomerSortOption = "newest" | "oldest" | "name-asc" | "name-desc";
export type CustomerSortSelectValue = CustomerSortOption | "custom";

const sortOptionMap: Record<CustomerSortOption, CustomerSort> = {
  newest: { key: "createdAt", direction: "desc" },
  oldest: { key: "createdAt", direction: "asc" },
  "name-asc": { key: "name", direction: "asc" },
  "name-desc": { key: "name", direction: "desc" },
};

export function useCustomerDirectory(initialCustomers: Customer[]) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CustomerStatus | "all">("all");
  const [company, setCompany] = useState("all");
  const [sort, setSort] = useState<CustomerSort>(sortOptionMap.newest);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const companies = useMemo(
    () =>
      [...new Set(initialCustomers.map((customer) => customer.company))].sort(),
    [initialCustomers],
  );

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    const direction = sort.direction === "asc" ? 1 : -1;

    return customers
      .filter((customer) => {
        const matchesSearch =
          !query ||
          [
            customer.name,
            customer.company,
            customer.email,
            customer.phone,
          ].some((value) => value.toLocaleLowerCase().includes(query));
        return (
          matchesSearch &&
          (status === "all" || customer.status === status) &&
          (company === "all" || customer.company === company)
        );
      })
      .sort((a, b) => a[sort.key].localeCompare(b[sort.key]) * direction);
  }, [company, customers, search, sort, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / pageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const hasFilters = Boolean(search || status !== "all" || company !== "all");

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }
  function updateStatus(value: CustomerStatus | "all") {
    setStatus(value);
    setPage(1);
  }
  function updateCompany(value: string) {
    setCompany(value);
    setPage(1);
  }
  function updateSort(value: CustomerSortSelectValue) {
    if (value !== "custom") setSort(sortOptionMap[value]);
    setPage(1);
  }
  function updateTableSort(key: CustomerSortKey) {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  }
  function updatePageSize(value: number) {
    setPageSize(value);
    setPage(1);
  }
  function deleteCustomer(id: string) {
    setCustomers((current) => current.filter((customer) => customer.id !== id));
  }
  function clearFilters() {
    setSearch("");
    setStatus("all");
    setCompany("all");
    setSort(sortOptionMap.newest);
    setPage(1);
  }

  const sortOption: CustomerSortSelectValue =
    sort.key === "name"
      ? sort.direction === "asc"
        ? "name-asc"
        : "name-desc"
      : sort.key === "createdAt"
        ? sort.direction === "asc"
          ? "oldest"
          : "newest"
        : "custom";

  return {
    customers,
    search,
    status,
    company,
    sort,
    sortOption,
    pageSize,
    companies,
    filteredCustomers,
    visibleCustomers,
    currentPage,
    totalPages,
    hasFilters,
    updateSearch,
    updateStatus,
    updateCompany,
    updateSort,
    updateTableSort,
    setPage,
    updatePageSize,
    deleteCustomer,
    clearFilters,
  };
}
