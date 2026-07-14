import type { LucideIcon } from "lucide-react";

export function CustomerSectionEmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/15 px-6 py-10 text-center">
      <span className="mb-3 flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
