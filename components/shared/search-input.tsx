"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  showClearButton?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  id?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  label = "Search",
  showClearButton = true,
  disabled = false,
  className,
  containerClassName,
  id,
}: SearchInputProps) {
  const canClear = showClearButton && value.length > 0 && !disabled;

  return (
    <div className={cn("relative w-full sm:max-w-sm", containerClassName)}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        id={id}
        type="search"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={label}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "appearance-none ps-9 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
          canClear && "pe-9",
          className,
        )}
      />
      {canClear ? (
        <button
          type="button"
          aria-label={`Clear ${label.toLowerCase()}`}
          onClick={() => onChange("")}
          className="absolute end-1 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X aria-hidden="true" className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}
