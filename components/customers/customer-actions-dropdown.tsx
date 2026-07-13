"use client";

import type { Customer } from "@/data/customers";
import {
  createStandardRowActions,
  RowActionsMenu,
} from "@/components/shared/row-actions-menu";

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
  return (
    <RowActionsMenu
      label={`Actions for ${customer.name}`}
      actions={createStandardRowActions({ onView, onEdit, onDelete })}
    />
  );
}
