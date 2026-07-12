import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from "@/lib/auth/constants";

export function proxy(request: NextRequest) {
  const isAuthenticated =
    request.cookies.get(AUTH_COOKIE_NAME)?.value === AUTH_COOKIE_VALUE;
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (!isAuthenticated && !isLoginPage)
    return NextResponse.redirect(new URL("/login", request.url));
  if (isAuthenticated && isLoginPage)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/customers/:path*",
    "/deals/:path*",
    "/tasks/:path*",
    "/settings/:path*",
    "/components/:path*",
  ],
};
