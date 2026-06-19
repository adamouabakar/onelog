import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Flame,
  Gauge,
  HeartHandshake,
  type LucideIcon,
  Rocket,
  Target,
} from "lucide-react";

import { DeckLink } from "@/components/site/deck-link";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { fr: "/fr/about", en: "/en/about" },
    },
  };
}

const VALUE_ICONS: LucideIcon[] = [Flame, HeartHandshake, Gauge];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const deck = await getTranslations("Deck");
  const values = t.raw("values") as { title: string; description: string }[];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 starfield opacity-50" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-glow" />
        <div className="container relative py-16 md:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <Flame className="size-3.5" /> {t("badge")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-silver sm:text-lg">
              {t("intro")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="pb-4">
        <div className="container grid gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Target className="size-5" />
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold">{t("missionTitle")}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{t("missionBody")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
              <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <Rocket className="size-5" />
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold">{t("visionTitle")}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{t("visionBody")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DECK */}
      <section className="py-10 md:py-14">
        <div className="container max-w-2xl">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-10">
              <h2 className="font-display text-2xl font-bold tracking-tight">{deck("title")}</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">{deck("description")}</p>
              <p className="mt-2 text-xs text-muted-foreground/80">{deck("trust")}</p>
              <div className="mt-6">
                <DeckLink namespace="Deck" variant="button" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {t("valuesTitle")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {values.map((v, i) => {
              const Icon = VALUE_ICONS[i] ?? Flame;
              return (
                <Reveal key={v.title} delay={i * 0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                    <Icon className="size-5 text-accent" />
                    <h3 className="mt-3 font-display text-base font-semibold">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {v.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-12 flex justify-center">
              <Button asChild size="lg" variant="gold">
                <Link href="/#contact">
                  {t("cta")} <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
