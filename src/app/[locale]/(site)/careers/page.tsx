import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Careers" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/careers`,
      languages: { fr: "/fr/careers", en: "/en/careers" },
    },
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Careers");

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 starfield opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-glow" />

      <div className="container relative max-w-3xl py-16 md:py-24">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> {t("badge")}
          </Link>
          <h1 className="mt-8 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-silver sm:text-lg">
            {t("intro")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 className="font-display text-lg font-semibold">{t("openTitle")}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{t("openBody")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-card p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gold-sheen blur-3xl"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  <Sparkles className="size-3.5" /> Stay Hungry
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold">
                  {t("spontaneousTitle")}
                </h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {t("spontaneousBody")}
                </p>
                <div className="mt-5">
                  <Button asChild size="lg" variant="gold">
                    <a href="mailto:contact@onelog.io?subject=Candidature%20%5BOne%5DLog">
                      <Mail /> {t("cta")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
