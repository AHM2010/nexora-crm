import type {Metadata} from "next";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {Geist, Geist_Mono} from "next/font/google";
import Script from "next/script";
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

  return (
    <html lang={locale} dir={getDirection(locale)} data-scroll-behavior="smooth" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <Script id="theme-initializer" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';document.cookie='nexora_theme='+t+'; path=/; max-age=31536000; SameSite=Lax';document.cookie='nexora_resolved_theme='+(d?'dark':'light')+'; path=/; max-age=31536000; SameSite=Lax'}catch(e){}})();`}
        </Script>
        <NextIntlClientProvider>
          <ThemeProvider>
            <AuthProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
