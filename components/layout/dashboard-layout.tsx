"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, isReady, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    if (!isReady || isAuthenticated) return;
    logout();
    window.location.replace("/login");
  }, [isAuthenticated, isReady, logout]);

  if (!isReady || !isAuthenticated) {
    return (
      <main
        className="flex min-h-dvh items-center justify-center bg-background"
        aria-busy="true"
        aria-label="Verifying session"
      >
        <p className="text-sm text-muted-foreground">Verifying session…</p>
      </main>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <Sidebar />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <div className="min-h-dvh lg:pl-64">
        <Navbar
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen((open) => !open)}
        />
        <main className="page-shell">{children}</main>
      </div>
    </div>
  );
}
