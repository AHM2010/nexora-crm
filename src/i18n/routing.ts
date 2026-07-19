import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeCookie: {name: 'NEXT_LOCALE', maxAge: 60 * 60 * 24 * 365}
});

export type AppLocale = (typeof routing.locales)[number];

export function getDirection(locale: AppLocale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
