import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HeartPulse,
  LineChart,
  type LucideIcon,
  Sprout,
  Truck,
  Wallet,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const SECTORS = ["finance", "health", "agriculture", "transport", "payments"] as const;
type SectorKey = (typeof SECTORS)[number];

type Theme = {
  Icon: LucideIcon;
  text: string;
  bg: string;
  border: string;
  glow: string;
  hoverBorder: string;
};

const THEME: Record<SectorKey, Theme> = {
  finance: {
    Icon: LineChart,
    text: "text-sector-finance",
    bg: "bg-sector-finance/10",
    border: "border-sector-finance/40",
    glow: "shadow-glow-gold",
    hoverBorder: "hover:border-sector-finance/50",
  },
  health: {
    Icon: HeartPulse,
    text: "text-sector-health",
    bg: "bg-sector-health/10",
    border: "border-sector-health/40",
    glow: "shadow-glow",
    hoverBorder: "hover:border-sector-health/50",
  },
  agriculture: {
    Icon: Sprout,
    text: "text-sector-agri",
    bg: "bg-sector-agri/10",
    border: "border-sector-agri/40",
    glow: "shadow-glow",
    hoverBorder: "hover:border-sector-agri/50",
  },
  transport: {
    Icon: Truck,
    text: "text-sector-transport",
    bg: "bg-sector-transport/10",
    border: "border-sector-transport/40",
    glow: "shadow-glow",
    hoverBorder: "hover:border-sector-transport/50",
  },
  payments: {
    Icon: Wallet,
    text: "text-sector-pay",
    bg: "bg-sector-pay/10",
    border: "border-sector-pay/40",
    glow: "shadow-glow",
    hoverBorder: "hover:border-sector-pay/50",
  },
};

function isSector(value: string): value is SectorKey {
  return (SECTORS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return SECTORS.map((sector) => ({ sector }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}): Promise<Metadata> {
  const { locale, sector } = await params;
  if (!isSector(sector)) return {};

  const d = await getTranslations({ locale, namespace: "Dashboard" });
  const s = await getTranslations({ locale, namespace: "Solutions" });
  const name = d(`${sector}.name`);

  return {
    title: name,
    description: s(`${sector}.intro`),
    alternates: {
      canonical: `/${locale}/solutions/${sector}`,
      languages: {
        fr: `/fr/solutions/${sector}`,
        en: `/en/solutions/${sector}`,
      },
    },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}) {
  const { locale, sector } = await params;
  if (!isSector(sector)) notFound();
  setRequestLocale(locale);

  const d = await getTranslations("Dashboard");
  const s = await getTranslations("Solutions");
  const theme = THEME[sector];
  const { Icon } = theme;

  const name = d(`${sector}.name`);
  const features = s.raw(`${sector}.features`) as {
    title: string;
    description: string;
  }[];
  const others = SECTORS.filter((x) => x !== sector);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 starfield opacity-50" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-glow" />

        <div className="container relative py-14 md:py-20">
          <Reveal>
            <Link
              href="/#dashboard"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> {s("backToHome")}
            </Link>
          </Reveal>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
                    theme.border,
                    theme.bg,
                    theme.text,
                  )}
                >
                  <Icon className="size-3.5" /> {name}
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl">
                  {s(`${sector}.tagline`)}
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-silver sm:text-lg">
                  {s(`${sector}.intro`)}
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/#contact">
                      {s("ctaButton")} <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="#features">{d(`${sector}.cta`)}</a>
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Orbe sectoriel */}
            <Reveal delay={0.1} className="flex justify-center lg:justify-end">
              <div className="relative grid size-64 place-items-center sm:size-72">
                <div
                  aria-hidden
                  className={cn(
                    "absolute size-56 animate-spin-slow rounded-full border border-dashed",
                    theme.border,
                  )}
                />
                <div
                  aria-hidden
                  className={cn("absolute size-44 animate-glow rounded-full blur-2xl", theme.bg)}
                />
                <div
                  className={cn(
                    "relative grid size-32 place-items-center rounded-full border bg-background/70",
                    theme.border,
                    theme.glow,
                  )}
                >
                  <Icon className={cn("size-12", theme.text)} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="scroll-mt-24 py-14 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {s("featuresTitle")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-xl",
                      theme.bg,
                      theme.text,
                    )}
                  >
                    <Check className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + autres solutions */}
      <section className="pb-20 md:pb-28">
        <div className="container">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center md:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70"
              />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                  {s("ctaTitle")}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                  {s("ctaSubtitle")}
                </p>
                <div className="mt-7 flex justify-center">
                  <Button asChild size="lg">
                    <Link href="/#contact">
                      {s("ctaButton")} <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-14">
            <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {s("otherTitle")}
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {others.map((o) => {
                const ot = THEME[o];
                const OIcon = ot.Icon;
                return (
                  <Link
                    key={o}
                    href={`/solutions/${o}`}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5",
                      ot.hoverBorder,
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-9 place-items-center rounded-lg",
                        ot.bg,
                        ot.text,
                      )}
                    >
                      <OIcon className="size-4" />
                    </span>
                    <span className="text-sm font-medium">{d(`${o}.name`)}</span>
                    <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
