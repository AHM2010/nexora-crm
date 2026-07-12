"use client";

import { useState } from "react";
import { Inbox, Plus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import {
  DataTable,
  type DataTableColumn,
  type DataTableSort,
} from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingCard } from "@/components/shared/loading-card";
import { LoadingList } from "@/components/shared/loading-list";
import { LoadingTable } from "@/components/shared/loading-table";
import { PageHeader } from "@/components/shared/page-header";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { PriorityBadge } from "@/components/shared/priority-badge";
import {
  RowActionsMenu,
  createStandardRowActions,
} from "@/components/shared/row-actions-menu";
import { SearchInput } from "@/components/shared/search-input";
import { StatusBadge } from "@/components/shared/status-badge";
import { UserAvatar } from "@/components/shared/user-avatar";

type DemoCustomer = {
  id: number;
  name: string;
  email: string;
  status: "active" | "lead";
};
const customers: DemoCustomer[] = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia@example.com",
    status: "active",
  },
  { id: 2, name: "Noah Williams", email: "noah@example.com", status: "lead" },
];
const columns: DataTableColumn<DemoCustomer>[] = [
  {
    id: "name",
    header: "Customer",
    sortable: true,
    cell: (customer) => (
      <div className="flex items-center gap-3">
        <UserAvatar name={customer.name} presence="online" />
        <span className="font-medium">{customer.name}</span>
      </div>
    ),
  },
  { id: "email", header: "Email", cell: (customer) => customer.email },
  {
    id: "status",
    header: "Status",
    cell: (customer) => <StatusBadge status={customer.status} />,
  },
];

export default function ComponentsShowcasePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(2);
  const [sort, setSort] = useState<DataTableSort>({
    columnId: "name",
    direction: "asc",
  });

  return (
    <div className="section-stack">
      <PageHeader
        title="Component Showcase"
        description="Temporary internal reference for shared CRM components and responsive states."
        action={
          <Button>
            <Plus />
            Action
          </Button>
        }
      />

      <section className="space-y-4">
        <h2 className="type-section-title">Controls</h2>
        <Card>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Input
              aria-label="Example input"
              placeholder="Input example"
              className="w-full sm:w-56"
            />
            <Badge>Badge</Badge>
            <StatusBadge status="negotiation" />
            <PriorityBadge priority="urgent" />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="type-section-title">Search and overlays</h2>
        <Card>
          <CardContent className="flex flex-wrap items-center gap-3">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search customers..."
              label="Search customers"
            />
            <RowActionsMenu
              actions={createStandardRowActions({
                onView: () => undefined,
                onEdit: () => undefined,
                onDelete: () => undefined,
              })}
            />
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Open modal
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>General modal</DialogTitle>
                  <DialogDescription>
                    Use this pattern for non-destructive workflows.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton />
              </DialogContent>
            </Dialog>
            <ConfirmDialog
              title="Delete customer?"
              description="This showcase does not perform an actual deletion."
              confirmLabel="Delete"
              destructive
              onConfirm={() => undefined}
              trigger={<Button variant="destructive">Confirm action</Button>}
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="type-section-title">Cards and avatars</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer card</CardTitle>
              <CardDescription>
                A standard shadcn card composition.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <UserAvatar name="Ahmed Nexora" size="lg" presence="online" />
              <div>
                <p className="font-medium">Ahmed Nexora</p>
                <p className="type-small">Workspace administrator</p>
              </div>
            </CardContent>
          </Card>
          <EmptyState
            icon={Users}
            title="No customers found"
            description="Customers matching your current filters will appear here."
            action={
              <Button variant="outline">
                <Plus />
                Add customer
              </Button>
            }
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="type-section-title">Data table</h2>
        <DataTable
          columns={columns}
          data={customers}
          getRowKey={(customer) => customer.id}
          caption="Example customers"
          sort={sort}
          onSortChange={setSort}
          renderRowActions={() => (
            <RowActionsMenu
              actions={createStandardRowActions({
                onView: () => undefined,
                onEdit: () => undefined,
                onDelete: () => undefined,
              })}
            />
          )}
        />
        <PaginationControls
          currentPage={page}
          totalPages={8}
          onPageChange={setPage}
        />
      </section>

      <section className="space-y-4">
        <h2 className="type-section-title">Loading states</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <LoadingCard />
          <LoadingList items={3} />
        </div>
        <LoadingTable rows={3} columns={4} />
      </section>

      <section className="space-y-4">
        <h2 className="type-section-title">Empty variants</h2>
        <EmptyState
          icon={Inbox}
          title="No tasks available"
          description="New tasks will show up here when they are assigned."
        />
      </section>
    </div>
  );
}
