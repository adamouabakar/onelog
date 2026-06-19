"use client";

import { useActionState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { sendContact, type ContactState } from "@/app/actions/contact";
import { SECTOR_KEYS } from "@/lib/sectors";
import { cn } from "@/lib/utils";

const initial: ContactState = { ok: false };

const inputCls =
  "w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground/90">{label}</span>
      {children}
    </label>
  );
}

function trackPlausible(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const plausible = (window as Window & { plausible?: (e: string, o?: { props: Record<string, string> }) => void }).plausible;
  plausible?.(event, props ? { props } : undefined);
}

export function ContactForm() {
  const locale = useLocale();
  const t = useTranslations("ContactForm");
  const d = useTranslations("Dashboard");
  const [state, formAction, pending] = useActionState(sendContact, initial);

  useEffect(() => {
    if (state.ok && state.tracked) {
      trackPlausible("Contact Submit", { locale });
    }
  }, [state.ok, state.tracked, locale]);

  if (state.ok) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-primary/40 bg-primary/5 p-8 text-center">
        <CheckCircle2 className="size-10 text-primary" />
        <p className="font-medium">{t("success")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4 text-left">
      <input type="hidden" name="locale" value={locale} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-px w-px opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("name")}>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className={inputCls}
          />
        </Field>
        <Field label={t("email")}>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label={t("sector")}>
        <select name="sector" defaultValue="" className={inputCls}>
          <option value="" disabled>
            {t("sectorPlaceholder")}
          </option>
          {SECTOR_KEYS.map((s) => (
            <option key={s} value={s}>
              {d(`${s}.name`)}
            </option>
          ))}
          <option value="other">{t("other")}</option>
        </select>
      </Field>

      <Field label={t("message")}>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder={t("messagePlaceholder")}
          className={cn(inputCls, "resize-y")}
        />
      </Field>

      {state.error && (
        <p className="text-sm text-destructive" role="alert">
          {t(`errors.${state.error}`)}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-7 text-base font-medium text-primary-foreground shadow-glow transition-all hover:bg-primary/90 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> {t("sending")}
          </>
        ) : (
          <>
            {t("send")} <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}