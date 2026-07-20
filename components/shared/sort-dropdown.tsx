"use client";

import {Check, ChevronDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";

type SortOption = {
  value: string;
  label: string;
  disabled?: boolean;
  lang?: string;
  dir?: "ltr" | "rtl";
};

export function SortDropdown({
  value,
  label,
  options,
  onValueChange,
  className,
  disabled = false,
}: {
  value: string;
  label: string;
  options: SortOption[];
  onValueChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}) {
  const selected = options.find((option) => option.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            aria-label={label}
            disabled={disabled}
            className={cn("h-8 justify-between px-2.5 font-normal", className)}
          />
        }
      >
        <span className="truncate">{selected?.label ?? value}</span>
        <ChevronDown aria-hidden="true" className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            disabled={option.disabled}
            lang={option.lang}
            dir={option.dir}
            onClick={() => onValueChange(option.value)}
          >
            <span className="flex-1 text-start">{option.label}</span>
            {option.value === value ? (
              <Check aria-hidden="true" className="size-4" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
