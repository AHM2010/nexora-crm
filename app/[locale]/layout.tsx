import type {Metadata} from "next";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {cookies} from "next/headers";
import {Geist, Geist_Mono} from "next/font/google";
import {AuthProvider} from "@/components/auth/auth-provider";
import {ThemeProvider} from "@/components/theme-provider";
import {TooltipProvider} from "@/components/ui/tooltip";
import {getDirection, routing} from "@/src/i18n/routing";
import "../globals.css";

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]});
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://nexora-crm.vercel.app"),
  title: {default: "Nexora CRM", template: "%s | Nexora CRM"},
  description: "A modern CRM dashboard for customer and revenue operations.",
  applicationName: "Nexora CRM",
  robots: {index: false, follow: false},
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: LayoutProps<"/[locale]">) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("nexora_theme")?.value;
  const resolvedCookie = cookieStore.get("nexora_resolved_theme")?.value;
  const initialTheme = themeCookie === "light" || themeCookie === "dark" || themeCookie === "system" ? themeCookie : "system";
  const initialResolvedTheme = resolvedCookie === "dark" ? "dark" : "light";

  return (
    <html lang={locale} dir={getDirection(locale)} data-scroll-behavior="smooth" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${initialResolvedTheme === "dark" ? "dark" : ""} h-full antialiased`} style={{colorScheme: initialResolvedTheme, backgroundColor: initialResolvedTheme === "dark" ? "#0a0a0a" : "#ffffff"}}>
      <body className="min-h-full bg-background text-foreground">
        <NextIntlClientProvider>
          <ThemeProvider initialTheme={initialTheme} initialResolvedTheme={initialResolvedTheme}>
            <AuthProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
