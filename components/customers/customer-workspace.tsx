"use client";

import { useMemo, useState } from "react";
import { Plus, RotateCcw, SearchX, Users } from "lucide-react";
import type { Customer } from "@/data/customers";
import { CustomerFilters } from "@/components/customers/customer-filters";
import {
  DataTable,
  type DataTableColumn,
  type DataTableSort,
} from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { PaginationControls } from "@/components/shared/pagination-controls";
import {
  createStandardRowActions,
  RowActionsMenu,
} from "@/components/shared/row-actions-menu";
import { StatusBadge } from "@/components/shared/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "newest" | "oldest" | "name-asc" | "name-desc";
const formatDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export function CustomerWorkspace({
  initialCustomers,
}: {
  initialCustomers: Customer[];
}) {
  const [items, setItems] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [company, setCompany] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [notice, setNotice] = useState("");

  const companies = useMemo(
    () =>
      [...new Set(initialCustomers.map((customer) => customer.company))].sort(),
    [initialCustomers],
  );
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return items
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
      .sort((a, b) => {
        if (sort === "name-asc" || sort === "name-desc")
          return a.name.localeCompare(b.name) * (sort === "name-asc" ? 1 : -1);
        return (
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          (sort === "oldest" ? 1 : -1)
        );
      });
  }, [company, items, search, sort, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );
  const resetPage =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };
  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setCompany("all");
    setSort("newest");
    setPage(1);
  };
  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const columns: DataTableColumn<Customer>[] = [
    {
      id: "name",
      header: "Customer",
      sortable: true,
      className: "min-w-56 px-4",
      cell: (customer) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={customer.avatar} alt="" />
            <AvatarFallback>{initials(customer.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-foreground">{customer.name}</div>
            <div className="text-xs text-muted-foreground lg:hidden">
              {customer.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "company",
      header: "Company",
      sortable: true,
      className: "min-w-40",
      cell: (customer) => (
        <span className="text-foreground/80">{customer.company}</span>
      ),
    },
    {
      id: "email",
      header: "Email",
      sortable: true,
      className: "min-w-56",
      cell: (customer) => (
        <a
          className="text-muted-foreground hover:text-foreground hover:underline"
          href={`mailto:${customer.email}`}
        >
          {customer.email}
        </a>
      ),
    },
    {
      id: "phone",
      header: "Phone",
      sortable: true,
      className: "min-w-40",
      cell: (customer) => (
        <a
          className="text-muted-foreground hover:text-foreground"
          href={`tel:${customer.phone}`}
        >
          {customer.phone}
        </a>
      ),
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      className: "w-28",
      cell: (customer) => <StatusBadge status={customer.status} />,
    },
    {
      id: "createdAt",
      header: "Created",
      sortable: true,
      className: "min-w-32",
      cell: (customer) => (
        <time className="text-muted-foreground" dateTime={customer.createdAt}>
          {formatDate.format(new Date(`${customer.createdAt}T00:00:00`))}
        </time>
      ),
    },
  ];

  const handleColumnSort = ({ columnId, direction }: DataTableSort) => {
    if (columnId === "name")
      setSort(direction === "asc" ? "name-asc" : "name-desc");
    else if (columnId === "createdAt")
      setSort(direction === "asc" ? "oldest" : "newest");
    else {
      const directionValue = direction === "asc" ? 1 : -1;
      setItems((current) =>
        [...current].sort(
          (a, b) =>
            String(a[columnId as keyof Customer]).localeCompare(
              String(b[columnId as keyof Customer]),
            ) * directionValue,
        ),
      );
    }
    setPage(1);
  };

  const activeTableSort: DataTableSort | undefined = sort.startsWith("name")
    ? { columnId: "name", direction: sort === "name-asc" ? "asc" : "desc" }
    : { columnId: "createdAt", direction: sort === "oldest" ? "asc" : "desc" };
  const hasFilters = Boolean(search || status !== "all" || company !== "all");
  const empty =
    items.length === 0
      ? {
          icon: Users,
          title: "No customers yet",
          description:
            "Add your first customer to start building meaningful relationships.",
          action: "Add customer",
        }
      : search
        ? {
            icon: SearchX,
            title: "No search results",
            description: `We couldn't find anyone matching “${search}”. Try a different name, company, email, or phone.`,
            action: "Clear search",
          }
        : {
            icon: SearchX,
            title: "No matching customers",
            description:
              "No customers match the selected filters. Clear them to see your full customer list.",
            action: "Clear filters",
          };

  return (
    <div className="section-stack">
      <PageHeader
        title="Customers"
        description="Manage customer relationships, contact details, and lifecycle status in one place."
        action={
          <Button
            size="lg"
            onClick={() =>
              flash("Customer creation is ready to connect to your backend.")
            }
          >
            <Plus />
            Add Customer
          </Button>
        }
      />
      {notice ? (
        <div
          role="status"
          className="rounded-lg border border-success/20 bg-success/10 px-4 py-2.5 text-sm text-foreground"
        >
          {notice}
        </div>
      ) : null}
      <section aria-label="Customer directory" className="space-y-4">
        <CustomerFilters
          search={search}
          status={status}
          company={company}
          sort={sort}
          companies={companies}
          onSearchChange={resetPage(setSearch)}
          onStatusChange={resetPage(setStatus)}
          onCompanyChange={resetPage(setCompany)}
          onSortChange={resetPage((value: string) =>
            setSort(value as SortOption),
          )}
        />
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "customer" : "customers"}
          </p>
          {hasFilters ? (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <RotateCcw />
              Reset filters
            </Button>
          ) : null}
        </div>
        <DataTable
          columns={columns}
          data={visible}
          getRowKey={(customer) => customer.id}
          caption="Customer directory"
          sort={activeTableSort}
          onSortChange={handleColumnSort}
          renderRowActions={(customer) => (
            <RowActionsMenu
              label={`Actions for ${customer.name}`}
              actions={createStandardRowActions({
                onView: () =>
                  flash(`Viewing ${customer.name} is a demo action.`),
                onEdit: () =>
                  flash(`Editing ${customer.name} is a demo action.`),
                onDelete: () => {
                  setItems((current) =>
                    current.filter((item) => item.id !== customer.id),
                  );
                  flash(`${customer.name} was removed from this demo.`);
                },
              })}
            />
          )}
          emptyState={
            <div className="py-5">
              <EmptyState
                icon={empty.icon}
                title={empty.title}
                description={empty.description}
                action={
                  <Button
                    variant="outline"
                    onClick={
                      items.length === 0
                        ? () =>
                            flash(
                              "Customer creation is ready to connect to your backend.",
                            )
                        : search
                          ? () => setSearch("")
                          : clearFilters
                    }
                  >
                    {empty.action}
                  </Button>
                }
              />
            </div>
          }
        />
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows per page</span>
              <Select
                value={String(pageSize)}
                onValueChange={(value) => {
                  setPageSize(Number(value ?? 10));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-18" aria-label="Rows per page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <PaginationControls
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}
