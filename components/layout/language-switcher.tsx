"use client";

import {Check, Languages} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {useTransition} from "react";
import {usePathname, useRouter} from "@/src/i18n/navigation";
import type {AppLocale} from "@/src/i18n/routing";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const t = useTranslations("Language");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (nextLocale: AppLocale) => {
    if (nextLocale === locale) return;
    startTransition(() => router.replace(pathname, {locale: nextLocale}));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={t("switchLabel")} disabled={isPending} />}>
        <Languages aria-hidden="true" className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {(["en", "ar"] as const).map((item) => (
          <DropdownMenuItem key={item} onClick={() => switchLocale(item)} lang={item} dir={item === "ar" ? "rtl" : "ltr"}>
            <span className="flex-1 text-start">{item === "en" ? t("english") : t("arabic")}</span>
            {locale === item ? <Check aria-hidden="true" className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
