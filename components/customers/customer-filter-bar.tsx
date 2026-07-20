"use client";

import type { CustomerStatus } from "@/data/customers";
import type { CustomerSortSelectValue } from "@/components/customers/use-customer-directory";
import {useTranslations} from "next-intl";
import { SearchInput } from "@/components/shared/search-input";
import {SortDropdown} from "@/components/shared/sort-dropdown";

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
  const t = useTranslations("Filters");
  const statusT = useTranslations("Status");
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-xs lg:flex-row lg:items-center">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder={t("customerSearch")}
        label={t("customerSearch")}
        containerClassName="sm:max-w-none lg:max-w-md lg:flex-1"
      />
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <SortDropdown
          value={status}
          label={t("status")}
          className="w-full sm:w-32"
          options={[
            {value: "all", label: t("allStatuses")},
            {value: "active", label: statusT("active")},
            {value: "inactive", label: statusT("inactive")},
            {value: "lead", label: statusT("lead")},
          ]}
          onValueChange={(value) =>
            onStatusChange(value as CustomerStatus | "all")
          }
        />
        <SortDropdown
          value={company}
          label={t("company")}
          className="w-full sm:w-44"
          options={[
            {value: "all", label: t("allCompanies")},
            ...companies.map((item) => ({value: item, label: item})),
          ]}
          onValueChange={onCompanyChange}
        />
        <SortDropdown
          value={sort}
          label={t("sortCustomers")}
          className="col-span-2 w-full sm:w-36"
          options={[
            ...(sort === "custom"
              ? [{value: "custom", label: t("customSort"), disabled: true}]
              : []),
            {value: "newest", label: t("newest")},
            {value: "oldest", label: t("oldest")},
            {value: "name-asc", label: t("nameAZ")},
            {value: "name-desc", label: t("nameZA")},
          ]}
          onValueChange={(value) =>
            onSortChange(value as CustomerSortSelectValue)
          }
        />
      </div>
    </div>
  );
}
