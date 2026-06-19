import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";

import { DeckLink } from "@/components/site/deck-link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 starfield opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-15%] h-[42rem] w-[42rem] -translate-x-1/2 animate-aurora rounded-full bg-radial-glow opacity-50 blur-3xl"
      />

      <div className="container relative grid items-center gap-10 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal eager>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" /> {t("badge")}
            </span>
          </Reveal>

          <Reveal eager delay={0.06}>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-balance sm:text-5xl lg:text-[3.75rem]">
              {t("titleA")}
              <span className="text-gradient">{t("titleAI")}</span>
              {t("titleB")}
              <span className="text-primary text-glow">{t("titleAfrica")}</span>
              {t("titleC")}
            </h1>
          </Reveal>

          <Reveal eager delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-silver sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal eager delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg">
                <a href="#contact">
                  {t("ctaPrimary")} <ArrowRight />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#dashboard">{t("ctaSecondary")}</a>
              </Button>
            </div>
            <p className="mt-4">
              <DeckLink />
            </p>
          </Reveal>
        </div>

        <Reveal eager delay={0.1} className="relative flex justify-center lg:justify-end">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow blur-2xl"
          />
          <div className="animate-float">
            <Image
              src="/onelog-logo.svg"
              alt={t("logoAlt")}
              width={480}
              height={480}
              priority
              sizes="(max-width: 1024px) 70vw, 480px"
              className="h-auto w-[min(78vw,460px)] select-none [mask-image:radial-gradient(72%_72%_at_50%_45%,black_58%,transparent_100%)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}