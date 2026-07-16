export const AUTH_COOKIE_NAME = "nexora_session";
export const AUTH_COOKIE_VALUE = "authenticated";
export const AUTH_STORAGE_KEY = "nexora_user";
export const REMEMBERED_SESSION_SECONDS = 60 * 60 * 24 * 30;
export const TEMPORARY_SESSION_SECONDS = 60 * 30;

export const MOCK_ACCOUNTS = [
  {
    userId: "usr_9c72a184",
    email: "admin@nexora.com",
    password: "password123",
    name: "Ahmed Ashraf",
    jobTitle: "CRM Administrator",
    company: "Nexora Inc.",
    phone: "+966 50 123 4567",
  },
  {
    userId: "usr_b3f2c9d1",
    email: "manager@nexora.com",
    password: "password123",
    name: "Mina Hassan",
    jobTitle: "Sales Manager",
    company: "Nexora Inc.",
    phone: "+966 50 234 5678",
  },
  {
    userId: "usr_7a1e4f8c",
    email: "sales@nexora.com",
    password: "password123",
    name: "Sara El-Sayed",
    jobTitle: "Account Executive",
    company: "Nexora Inc.",
    phone: "+966 50 345 6789",
  },
] as const;

export const DEFAULT_MOCK_ACCOUNT = MOCK_ACCOUNTS[0];
