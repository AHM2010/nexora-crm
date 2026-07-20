import { expect, test } from "@playwright/test";

const credentials = { email: "admin@nexora.com", password: "password123" };

async function login(page: import("@playwright/test").Page) {
  await page.goto("/en/login");
  await page.getByLabel("Email", { exact: true }).fill(credentials.email);
  await page.getByLabel("Password", { exact: true }).fill(credentials.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/en\/dashboard$/, { timeout: 15_000 });
}

test.beforeEach(async ({ context }) => {
  await context.clearCookies();
});

test("validates login and protects dashboard routes", async ({ page }) => {
  await page.goto("/en/dashboard");
  await expect(page).toHaveURL(/\/en\/login$/);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Email is required")).toBeVisible();
  await expect(page.getByText("Password is required")).toBeVisible();
  await page.reload();
  await page.getByLabel("Email", { exact: true }).fill("nobody@example.com");
  await page.getByLabel("Password", { exact: true }).fill("bad-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(
    page.getByText("The email or password you entered is incorrect."),
  ).toBeVisible();
  await login(page);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Welcome back",
  );
});

test("opens every primary route and handles missing customer records", async ({
  page,
}) => {
  await login(page);
  for (const route of [
    "dashboard",
    "customers",
    "deals",
    "tasks",
    "settings",
  ]) {
    await page.goto(`/en/${route}`);
    await expect(page.locator("main")).toBeVisible();
  }
  await page.goto("/en/customers/does-not-exist");
  await expect(page.getByRole("heading")).toContainText("Customer not found");
});

test("searches customers and persists theme selection", async ({ page }) => {
  await login(page);
  await page.goto("/en/customers");
  const directory = page.getByRole("region", { name: "Customer directory" });
  const search = directory.getByRole("searchbox");
  await search.fill("  OLIVIA  ");
  await expect(directory).toContainText("olivia@northstarlabs.com");
  await page.goto("/en/settings");
  await page.getByRole("radio", { name: /Dark mode/ }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("switches to Arabic RTL and keeps navigation usable on mobile", async ({
  page,
}) => {
  await login(page);
  await page.goto("/ar/dashboard");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.setViewportSize({ width: 320, height: 700 });
  await page.locator('button[aria-controls="mobile-sidebar"]').click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});
