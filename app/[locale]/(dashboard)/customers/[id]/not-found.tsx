import { Link } from "@/src/i18n/navigation";
import { SearchX } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function CustomerNotFound() {
  return (
    <EmptyState
      icon={SearchX}
      title="Customer not found"
      description="This customer ID does not match a record in your directory. The customer may have been removed or the link may be incorrect."
      action={
        <Button nativeButton={false} render={<Link href="/customers" />}>
          Back to customers
        </Button>
      }
    />
  );
}
