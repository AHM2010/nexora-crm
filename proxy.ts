import createMiddleware from 'next-intl/middleware';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE} from '@/lib/auth/constants';
import {routing} from '@/src/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  const segments = request.nextUrl.pathname.split('/').filter(Boolean);
  const locale = routing.locales.includes(segments[0] as 'en' | 'ar')
    ? segments[0]
    : request.cookies.get('NEXT_LOCALE')?.value ?? routing.defaultLocale;
  const path = routing.locales.includes(segments[0] as 'en' | 'ar')
    ? `/${segments.slice(1).join('/')}`
    : request.nextUrl.pathname;
  const isAuthenticated =
    request.cookies.get(AUTH_COOKIE_NAME)?.value === AUTH_COOKIE_VALUE;

  if (path === '/') {
    return NextResponse.redirect(
      new URL(`/${locale}/${isAuthenticated ? 'dashboard' : 'login'}`, request.url)
    );
  }
  if (!isAuthenticated && path !== '/login') {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
  if (isAuthenticated && path === '/login') {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }
  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
