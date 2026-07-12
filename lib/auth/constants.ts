export const AUTH_COOKIE_NAME = "nexora_session";
export const AUTH_COOKIE_VALUE = "authenticated";
export const AUTH_STORAGE_KEY = "nexora_user";
export const REMEMBERED_SESSION_SECONDS = 60 * 60 * 24 * 30;
export const TEMPORARY_SESSION_SECONDS = 60 * 30;

export const MOCK_ACCOUNTS = [
  {
    email: "admin@nexora.com",
    password: "password123",
    name: "Ahmed Ashraf",
  },
  {
    email: "manager@nexora.com",
    password: "password123",
    name: "Mina Hassan",
  },
  {
    email: "sales@nexora.com",
    password: "password123",
    name: "Sara El-Sayed",
  },
] as const;

export const DEFAULT_MOCK_ACCOUNT = MOCK_ACCOUNTS[0];
