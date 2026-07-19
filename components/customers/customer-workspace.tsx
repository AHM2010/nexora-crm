"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, RotateCcw, SearchX, Users } from "lucide-react";
import type { Customer } from "@/data/customers";
import { CustomerFilterBar } from "@/components/customers/customer-filter-bar";
import { CustomerPagination } from "@/components/customers/customer-pagination";
import { CustomerTable } from "@/components/customers/customer-table";
import { useCustomerDirectory } from "@/components/customers/use-customer-directory";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import {useTranslations} from "next-intl";

export function CustomerWorkspace({
  initialCustomers,
}: {
  initialCustomers: Customer[];
}) {
  const directory = useCustomerDirectory(initialCustomers);
  const t = useTranslations("Crm");
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    },
    [],
  );

  function flash(message: string) {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    setNotice(message);
    noticeTimer.current = setTimeout(() => setNotice(""), 2600);
  }

  function addCustomer() {
    flash(t("customerReady"));
  }
  function deleteCustomer(customer: Customer) {
    directory.deleteCustomer(customer.id);
    flash(t("customerRemoved", {name: customer.name}));
  }

  const emptyState =
    directory.customers.length === 0
      ? {
          icon: Users,
          title: t("noCustomers"), description: t("noCustomersDescription"), action: t("addCustomer"),
          onAction: addCustomer,
        }
      : directory.search
        ? {
            icon: SearchX,
            title: t("noSearch"), description: t("noSearchDescription", {search: directory.search}), action: t("clearSearch"),
            onAction: () => directory.updateSearch(""),
          }
        : {
            icon: SearchX,
            title: t("noMatchingCustomers"), description: t("noMatchingCustomersDescription"), action: t("clearFilters"),
            onAction: directory.clearFilters,
          };

  const resultsKey = `${directory.search}-${directory.status}-${directory.company}-${directory.sort.key}-${directory.sort.direction}-${directory.currentPage}-${directory.pageSize}`;

  return (
    <div className="section-stack">
      <PageHeader
        title={t("customersTitle")}
        description={t("customersDescription")}
        action={
          <Button size="lg" onClick={addCustomer}>
            <Plus />
            {t("addCustomer")}
          </Button>
        }
      />
      <div aria-live="polite" aria-atomic="true">
        {notice ? (
          <div
            role="status"
            className="rounded-lg border border-success/20 bg-success/10 px-4 py-2.5 text-sm text-foreground animate-in fade-in slide-in-from-top-1 duration-200 motion-reduce:animate-none"
          >
            {notice}
          </div>
        ) : null}
      </div>
      <section aria-label={t("customerDirectory")} className="space-y-4">
        <CustomerFilterBar
          search={directory.search}
          status={directory.status}
          company={directory.company}
          sort={directory.sortOption}
          companies={directory.companies}
          onSearchChange={directory.updateSearch}
          onStatusChange={directory.updateStatus}
          onCompanyChange={directory.updateCompany}
          onSortChange={directory.updateSort}
        />
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            <span className="font-medium text-foreground">
              {directory.filteredCustomers.length}
            </span>{" "}
            {t("customerCount", {count: directory.filteredCustomers.length}).replace(/^\d+\s*/, "")}
          </p>
          {directory.hasFilters ? (
            <Button variant="ghost" size="sm" onClick={directory.clearFilters}>
              <RotateCcw />
              {t("resetFilters")}
            </Button>
          ) : null}
        </div>
        <CustomerTable
          customers={directory.visibleCustomers}
          sort={directory.sort}
          onSort={directory.updateTableSort}
          onAction={flash}
          onDelete={deleteCustomer}
          resultsKey={resultsKey}
          emptyState={
            <EmptyState
              icon={emptyState.icon}
              title={emptyState.title}
              description={emptyState.description}
              action={
                <Button variant="outline" onClick={emptyState.onAction}>
                  {emptyState.action}
                </Button>
              }
            />
          }
        />
        {directory.filteredCustomers.length > 0 ? (
          <CustomerPagination
            currentPage={directory.currentPage}
            totalPages={directory.totalPages}
            pageSize={directory.pageSize}
            onPageChange={directory.setPage}
            onPageSizeChange={directory.updatePageSize}
          />
        ) : null}
      </section>
    </div>
  );
}
