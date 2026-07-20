"use client";

import {createContext, useContext, useLayoutEffect, useMemo, useState} from "react";

export type Theme = "light" | "dark" | "system";
type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "theme";
const THEME_COOKIE = "nexora_theme";
const RESOLVED_THEME_COOKIE = "nexora_resolved_theme";

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : "system";
  } catch {
    return "system";
  }
}

function readSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({
  children,
  initialTheme = "system",
  initialResolvedTheme = "light",
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
  initialResolvedTheme?: "light" | "dark";
}) {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === "undefined" ? initialTheme : readStoredTheme(),
  );
  const [system, setSystem] = useState<"light" | "dark">(() =>
    typeof window === "undefined" ? initialResolvedTheme : readSystemTheme(),
  );

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystem = () => setSystem(media.matches ? "dark" : "light");
    media.addEventListener("change", updateSystem);
    return () => media.removeEventListener("change", updateSystem);
  }, []);

  const resolvedTheme = theme === "system" ? system : theme;
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.style.colorScheme = resolvedTheme;
    document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `${RESOLVED_THEME_COOKIE}=${resolvedTheme}; path=/; max-age=31536000; SameSite=Lax`;
  }, [resolvedTheme, theme]);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    resolvedTheme,
    setTheme(next) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
        document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      } catch {
        // The theme still applies for this session when persistence is blocked.
      }
      setThemeState(next);
    },
  }), [resolvedTheme, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
