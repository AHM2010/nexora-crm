"use client";

import type { LucideIcon } from "lucide-react";
import {
  Handshake,
  LayoutDashboard,
  Settings,
  SquareCheckBig,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navigationItems: NavigationItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Deals", href: "/deals", icon: Handshake },
  { label: "Tasks", href: "/tasks", icon: SquareCheckBig },
  { label: "Settings", href: "/settings", icon: Settings },
];

export type NavLinksProps = {
  onNavigate?: () => void;
};

export function NavLinks({ onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard navigation" className="flex-1 space-y-1 overflow-y-auto p-4">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-sidebar-ring",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon aria-hidden="true" className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
