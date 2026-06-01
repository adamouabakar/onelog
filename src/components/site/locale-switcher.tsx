"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Bascule FR / EN en conservant le chemin courant. */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-card/60 p-0.5"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            disabled={isPending || active}
            aria-current={active ? "true" : undefined}
            onClick={() =>
              startTransition(() => router.replace(pathname, { locale: loc }))
            }
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
