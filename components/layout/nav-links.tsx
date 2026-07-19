"use client";

import type { LucideIcon } from "lucide-react";
import {
  Handshake,
  LayoutDashboard,
  Settings,
  SquareCheckBig,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/src/i18n/navigation";
import { cn } from "@/lib/utils";

export type NavigationItem = {
  label: "dashboard" | "customers" | "deals" | "tasks" | "settings";
  href: string;
  icon: LucideIcon;
};

export const navigationItems: NavigationItem[] = [
  { label: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "customers", href: "/customers", icon: Users },
  { label: "deals", href: "/deals", icon: Handshake },
  { label: "tasks", href: "/tasks", icon: SquareCheckBig },
  { label: "settings", href: "/settings", icon: Settings },
];

export type NavLinksProps = {
  onNavigate?: () => void;
};

export function NavLinks({ onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  return (
    <nav aria-label={t("navigation")} className="flex-1 space-y-1 overflow-y-auto p-4">
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
            {t(item.label)}
          </Link>
        );
      })}
    </nav>
  );
}
