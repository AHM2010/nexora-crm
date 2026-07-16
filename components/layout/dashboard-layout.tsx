"use client";

import { useCallback, useState } from "react";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

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
