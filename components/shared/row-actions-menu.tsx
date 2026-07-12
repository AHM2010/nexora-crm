"use client";

import type { LucideIcon } from "lucide-react";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type RowActionItem = { label: string; onSelect: () => void; icon?: LucideIcon; disabled?: boolean; destructive?: boolean };
export type RowActionsMenuProps = { actions: RowActionItem[]; label?: string; align?: "start" | "center" | "end" };
export type StandardRowActionHandlers = { onView?: () => void; onEdit?: () => void; onDelete?: () => void };

export function createStandardRowActions({ onView, onEdit, onDelete }: StandardRowActionHandlers): RowActionItem[] {
  return [
    ...(onView ? [{ label: "View", icon: Eye, onSelect: onView }] : []),
    ...(onEdit ? [{ label: "Edit", icon: Pencil, onSelect: onEdit }] : []),
    ...(onDelete ? [{ label: "Delete", icon: Trash2, onSelect: onDelete, destructive: true }] : []),
  ];
}

export function RowActionsMenu({ actions, label = "Open row actions", align = "end" }: RowActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={label} />}><MoreHorizontal aria-hidden="true" /></DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-36">
        {actions.map((action) => { const Icon = action.icon; return <DropdownMenuItem key={action.label} disabled={action.disabled} variant={action.destructive ? "destructive" : "default"} onClick={action.onSelect}>{Icon ? <Icon aria-hidden="true" /> : null}{action.label}</DropdownMenuItem>; })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
