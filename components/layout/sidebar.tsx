"use client";

import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { NavLinks } from "@/components/layout/nav-links";
import { BrandMark } from "@/components/brand/brand-mark";
import { useAuth } from "@/components/auth/auth-provider";

export type SidebarContentProps = {
  onNavigate?: () => void;
};

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  const { user, isReady } = useAuth();
  const displayName = isReady ? (user?.name ?? "Ahmed Ashraf") : "";
  const displayEmail = isReady ? (user?.email ?? "admin@nexora.com") : "";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <>
      <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-5">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <BrandMark className="size-8" priority />
          <span className="text-lg font-semibold tracking-tight">Nexora</span>
        </Link>
      </div>

      <NavLinks onNavigate={onNavigate} />

      <div className="border-t border-sidebar-border p-4">
        <button
          type="button"
          aria-label="Open user menu"
          className="flex w-full items-center gap-3 rounded-lg p-2 text-left outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/90 text-xs font-semibold text-sidebar-primary-foreground shadow-sm ring-1 ring-black/10">
            {initials || "AU"}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">
              {displayName}
            </span>
            <span className="block truncate text-xs text-sidebar-foreground/60">
              {displayEmail}
            </span>
          </span>
          <ChevronsUpDown
            aria-hidden="true"
            className="size-4 text-sidebar-foreground/50"
          />
        </button>
      </div>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <SidebarContent />
    </aside>
  );
}
