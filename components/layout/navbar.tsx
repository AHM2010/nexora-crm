"use client";

import { Bell, LogOut, Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { navigationItems } from "@/components/layout/nav-links";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useAuth } from "@/components/auth/auth-provider";
import { UserAvatar } from "@/components/shared/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type NavbarProps = {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
};

const iconButtonClass =
  "inline-flex size-9 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring";

export function Navbar({ isMobileMenuOpen, onMobileMenuToggle }: NavbarProps) {
  const pathname = usePathname();
  const t = useTranslations("Navbar");
  const navT = useTranslations("Navigation");
  const router = useRouter();
  const { user, logout, isReady } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const pageTitle =
    navigationItems.find((item) => pathname.startsWith(item.href))?.label ??
    "dashboard";

  const profileName = isReady ? (user?.name ?? "Ahmed Ashraf") : "";
  const profileEmail = isReady ? (user?.email ?? "admin@nexora.com") : "";

  function handleLogout() {
    logout();
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80 sm:px-6 lg:px-8">
      <button
        type="button"
        aria-label={navT("openMenu")}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-sidebar"
        onClick={onMobileMenuToggle}
        className={`${iconButtonClass} lg:hidden`}
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <div className="min-w-0 shrink-0">
        <span className="font-semibold lg:hidden">{navT(pageTitle)}</span>
        <div className="hidden items-center gap-2 text-sm lg:flex">
          <span className="text-muted-foreground">{navT("workspace")}</span>
          <span aria-hidden="true" className="text-muted-foreground/50">
            /
          </span>
          <span className="font-medium">{navT(pageTitle)}</span>
        </div>
      </div>

      <form role="search" className="ms-auto hidden w-full max-w-sm sm:block">
        <label htmlFor="dashboard-search" className="sr-only">
          {t("searchLabel")}
        </label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="dashboard-search"
            name="search"
            type="search"
            placeholder={t("search")}
            className="h-9 w-full rounded-lg border bg-background ps-9 pe-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          />
        </div>
      </form>

      <div className="ms-auto flex shrink-0 items-center gap-1 sm:ms-0">
        <LanguageSwitcher />
        <button
          type="button"
          aria-label={t("notifications")}
          className={`${iconButtonClass} relative`}
        >
          <Bell aria-hidden="true" className="size-4" />
          <span
            aria-hidden="true"
            className="absolute inset-e-2 top-2 size-1.5 rounded-full bg-accent"
          />
        </button>
        <button
          type="button"
          aria-label={t("theme")}
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className={iconButtonClass}
        >
          <Sun aria-hidden="true" className="size-4 dark:hidden" />
          <Moon aria-hidden="true" className="hidden size-4 dark:block" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                aria-label={t("profile")}
                className="ms-1 rounded-full outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              />
            }
          >
            <UserAvatar name={profileName || "A"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <span className="block truncate">{profileName}</span>
                <span className="block truncate text-xs font-normal text-muted-foreground">
                  {profileEmail}
                </span>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut aria-hidden="true" />
              {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
