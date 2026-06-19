"use client";

import { useActionState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { sendWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import type { SectorKey } from "@/lib/sectors";
import { cn } from "@/lib/utils";

const initial: WaitlistState = { ok: false };

const inputCls =
  "w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

function trackPlausible(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const plausible = (window as Window & { plausible?: (e: string, o?: { props: Record<string, string> }) => void }).plausible;
  plausible?.(event, props ? { props } : undefined);
}

type WaitlistFormProps = {
  sector: SectorKey;
  borderClass: string;
};

export function WaitlistForm({ sector, borderClass }: WaitlistFormProps) {
  const locale = useLocale();
  const t = useTranslations("WaitlistForm");
  const d = useTranslations("Dashboard");
  const [state, formAction, pending] = useActionState(sendWaitlist, initial);

  useEffect(() => {
    if (state.ok && state.tracked) {
      trackPlausible("Waitlist Submit", { locale, sector });
    }
  }, [state.ok, state.tracked, locale, sector]);

  if (state.ok) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-3 rounded-2xl border bg-primary/5 p-8 text-center",
          borderClass,
        )}
      >
        <CheckCircle2 className="size-10 text-primary" />
        <p className="font-medium">{t("success")}</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl border bg-card p-6 md:p-8", borderClass)}>
      <h2 className="font-display text-xl font-bold tracking-tight">{t("title")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {t("subtitle", { sector: d(`${sector}.name`) })}
      </p>

      <form action={formAction} className="mt-6 space-y-4 text-left">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="sector" value={sector} />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute left-[-9999px] h-px w-px opacity-0"
        />

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground/90">{t("name")}</span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground/90">{t("email")}</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className={inputCls}
          />
        </label>

        {state.error && (
          <p className="text-sm text-destructive" role="alert">
            {t(`errors.${state.error}`)}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" /> {t("sending")}
            </>
          ) : (
            <>
              {t("submit")} <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}