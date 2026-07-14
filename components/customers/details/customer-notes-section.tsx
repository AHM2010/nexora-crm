import { FileText, NotebookPen, Plus } from "lucide-react";
import type { CustomerDetails } from "@/data/customer-details";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CustomerSectionEmptyState } from "@/components/customers/details/customer-section-empty-state";
import { formatCustomerDate } from "@/components/customers/details/customer-detail-formatters";

export function CustomerNotesSection({ customer }: { customer: CustomerDetails }) {
  return (
    <Card className="shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader>
        <SectionHeader
          title="Notes"
          description="Shared context and follow-up reminders"
          action={
            <Button
              variant="outline"
              size="sm"
              className="min-h-11 transition-transform active:scale-[0.98]"
              aria-label={`Add a note for ${customer.name}`}
            >
              <Plus aria-hidden="true" />
              Add note
            </Button>
          }
        />
      </CardHeader>
      <CardContent>
        {customer.notes.length === 0 ? (
          <CustomerSectionEmptyState
            icon={FileText}
            title="No notes yet"
            description="Add context, preferences, or a reminder for the next follow-up."
          />
        ) : (
          <div className="space-y-3">
            {customer.notes.map((note) => (
              <article
                key={note.id}
                className="rounded-lg border bg-muted/20 p-4 transition-colors duration-200 hover:bg-muted/35"
              >
                <h3 className="font-medium">{note.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {note.content}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <NotebookPen aria-hidden="true" className="size-3.5" />
                  <span>{note.author}</span>
                  <span aria-hidden="true">•</span>
                  <time dateTime={note.createdAt}>{formatCustomerDate(note.createdAt)}</time>
                </div>
              </article>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
