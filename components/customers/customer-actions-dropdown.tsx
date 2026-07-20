"use client";

import type { Customer } from "@/data/customers";
import {
  createStandardRowActions,
  RowActionsMenu,
} from "@/components/shared/row-actions-menu";
import {useTranslations} from "next-intl";

export function CustomerActionsDropdown({
  customer,
  onView,
  onEdit,
  onDelete,
}: {
  customer: Customer;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const t = useTranslations("Crm");
  return (
    <RowActionsMenu
      label={t("actionsFor", {name: customer.name})}
      actions={createStandardRowActions(
        {onView, onEdit, onDelete},
        {view: t("view"), edit: t("edit"), delete: t("delete")},
      )}
    />
  );
}
