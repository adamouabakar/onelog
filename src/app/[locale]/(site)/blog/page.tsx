import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { fr: "/fr/blog", en: "/en/blog" },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const topics = t.raw("topics") as string[];

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
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 rounded-2xl border border-border bg-card p-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" /> {t("soonTitle")}
            </span>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t("soonBody")}</p>

            <h2 className="mt-7 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("topicsTitle")}
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-background/40 px-4 py-3 text-sm"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  {topic}
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Button asChild size="lg">
                <Link href="/#contact">
                  {t("cta")} <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
