"use client";

import type { CustomerStatus } from "@/data/customers";
import type { CustomerSortSelectValue } from "@/components/customers/use-customer-directory";
import {useTranslations} from "next-intl";
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
        <Select
          value={status}
          onValueChange={(value) =>
            onStatusChange((value ?? "all") as CustomerStatus | "all")
          }
        >
          <SelectTrigger
            className="w-full sm:w-32"
            aria-label={t("status")}
          >
            <SelectValue>
              {status === "all" ? t("allStatuses") : statusT(status)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStatuses")}</SelectItem>
            <SelectItem value="active">{statusT("active")}</SelectItem>
            <SelectItem value="inactive">{statusT("inactive")}</SelectItem>
            <SelectItem value="lead">{statusT("lead")}</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={company}
          onValueChange={(value) => onCompanyChange(value ?? "all")}
        >
          <SelectTrigger
            className="w-full sm:w-44"
            aria-label={t("company")}
          >
            <SelectValue>{company === "all" ? t("allCompanies") : company}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCompanies")}</SelectItem>
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
            aria-label={t("sortCustomers")}
          >
            <SelectValue>
              {sort === "newest" ? t("newest") : sort === "oldest" ? t("oldest") : sort === "name-asc" ? t("nameAZ") : sort === "name-desc" ? t("nameZA") : t("customSort")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {sort === "custom" ? (
              <SelectItem value="custom" disabled>
                {t("customSort")}
              </SelectItem>
            ) : null}
            <SelectItem value="newest">{t("newest")}</SelectItem>
            <SelectItem value="oldest">{t("oldest")}</SelectItem>
            <SelectItem value="name-asc">{t("nameAZ")}</SelectItem>
            <SelectItem value="name-desc">{t("nameZA")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
