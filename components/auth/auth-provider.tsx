"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_VALUE,
  AUTH_STORAGE_KEY,
  MOCK_ACCOUNTS,
  REMEMBERED_SESSION_SECONDS,
  TEMPORARY_SESSION_SECONDS,
} from "@/lib/auth/constants";

export type AuthUser = { name: string; email: string };
export type LoginResult = { success: true } | { success: false; error: string };
export type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (
    email: string,
    password: string,
    remember: boolean,
  ) => Promise<LoginResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const listeners = new Set<() => void>();
let cachedUser: AuthUser | null | undefined;
let cachedExpiresAt: number | null = null;
let hasInitializedAuth = false;

type StoredAuthSession = {
  user: AuthUser;
  expiresAt: number;
};

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readStoredUser(): AuthUser | null {
  const stored =
    localStorage.getItem(AUTH_STORAGE_KEY) ??
    sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;
  try {
    const session = JSON.parse(stored) as Partial<StoredAuthSession>;
    const user = session.user;
    if (
      !user ||
      typeof user.name !== "string" ||
      typeof user.email !== "string" ||
      typeof session.expiresAt !== "number" ||
      session.expiresAt <= Date.now()
    ) {
      clearStoredSession();
      return null;
    }
    cachedExpiresAt = session.expiresAt;
    return { name: user.name, email: user.email };
  } catch {
    clearStoredSession();
    return null;
  }
}

function clearStoredSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  cachedExpiresAt = null;
  hasInitializedAuth = true;
}

function getUserSnapshot() {
  if (!hasInitializedAuth) {
    cachedUser = readStoredUser();
    hasInitializedAuth = true;
  } else if (cachedUser === undefined) {
    cachedUser = readStoredUser();
  }
  return cachedUser;
}

function getAuthReadySnapshot() {
  if (!hasInitializedAuth) {
    cachedUser = readStoredUser();
    hasInitializedAuth = true;
  }
  return hasInitializedAuth;
}

function setAuthUser(user: AuthUser | null) {
  cachedUser = user;
  hasInitializedAuth = true;
  listeners.forEach((listener) => listener());
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(subscribe, getUserSnapshot, () => null);
  const isReady = useSyncExternalStore(
    subscribe,
    getAuthReadySnapshot,
    () => false,
  );

  useEffect(() => {
    if (!user || !cachedExpiresAt) return;
    let timeout: number;

    const scheduleExpiration = () => {
      const remainingTime = (cachedExpiresAt ?? 0) - Date.now();
      if (remainingTime <= 0) {
        clearStoredSession();
        setAuthUser(null);
        window.location.replace("/login");
        return;
      }
      timeout = window.setTimeout(
        scheduleExpiration,
        Math.min(remainingTime, 2_147_000_000),
      );
    };

    scheduleExpiration();
    return () => window.clearTimeout(timeout);
  }, [user]);

  const login = useCallback(
    async (
      email: string,
      password: string,
      remember: boolean,
    ): Promise<LoginResult> => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const matchedAccount = MOCK_ACCOUNTS.find(
        (account) =>
          email.toLowerCase() === account.email &&
          password === account.password,
      );

      if (!matchedAccount) {
        return {
          success: false,
          error: "The email or password you entered is incorrect.",
        };
      }

      const authenticatedUser = {
        name: matchedAccount.name,
        email: matchedAccount.email,
      };
      const sessionSeconds = remember
        ? REMEMBERED_SESSION_SECONDS
        : TEMPORARY_SESSION_SECONDS;
      const session: StoredAuthSession = {
        user: authenticatedUser,
        expiresAt: Date.now() + sessionSeconds * 1000,
      };
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      (remember ? localStorage : sessionStorage).setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(session),
      );
      cachedExpiresAt = session.expiresAt;
      document.cookie = `${AUTH_COOKIE_NAME}=${AUTH_COOKIE_VALUE}; path=/; SameSite=Lax; max-age=${sessionSeconds}`;
      setAuthUser(authenticatedUser);
      return { success: true };
    },
    [],
  );

  const logout = useCallback(() => {
    clearStoredSession();
    setAuthUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: Boolean(user), isReady, login, logout }),
    [user, isReady, login, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
