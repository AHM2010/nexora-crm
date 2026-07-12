"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { SidebarContent } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

export type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const drawer = document.getElementById("mobile-sidebar");
        const focusable = drawer?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={cn("fixed inset-0 z-50 lg:hidden", isOpen ? "visible" : "invisible pointer-events-none")}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-foreground/25 backdrop-blur-[1px] transition-opacity duration-200 dark:bg-background/70",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "relative flex h-full w-72 max-w-[85vw] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-md text-sidebar-foreground/70 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
        <SidebarContent onNavigate={onClose} />
      </aside>
    </div>
  );
}
