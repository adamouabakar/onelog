import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  ArrowUpRight,
  HeartPulse,
  LineChart,
  Sparkles,
  Sprout,
  Truck,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

const TILES = [
  { key: "finance", Icon: LineChart },
  { key: "health", Icon: HeartPulse },
  { key: "agriculture", Icon: Sprout },
  { key: "logistics", Icon: Truck },
  { key: "payments", Icon: Wallet },
] as const;

export async function Hero() {
  const t = await getTranslations("Hero");
  const p = await getTranslations("Pillars");

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:40px_40px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />

      <div className="container relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" /> {t("badge")}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {t("titleLead")}{" "}
              <span className="text-gradient">{t("titleHighlight")}</span>{" "}
              {t("titleTail")}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#contact">
                  {t("ctaPrimary")} <ArrowRight />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#pillars">{t("ctaSecondary")}</a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="relative">
          <div className="relative rounded-2xl border border-border bg-card/70 p-5 shadow-card backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("dashboardSubtitle")}
                </p>
                <p className="font-display text-sm font-semibold">
                  {t("dashboardTitle")}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
                <span className="size-1.5 animate-glow rounded-full bg-primary" />
                live
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {TILES.map(({ key, Icon }, i) => (
                <div
                  key={key}
                  className={`flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 p-3 ${
                    i === 0 ? "col-span-2" : ""
                  }`}
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {p(`${key}.name`)}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {p(`${key}.badge`)}
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground/60" />
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              <Stat value="5" label={t("stats.sectors")} />
              <Stat value={t("stats.continentValue")} label={t("stats.continent")} />
              <Stat value={t("stats.aiValue")} label={t("stats.ai")} />
            </div>
          </div>

          <div
            aria-hidden
            className="absolute -right-6 -top-6 -z-10 size-40 rounded-full bg-gold-sheen blur-2xl"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/40 p-3">
      <p className="font-display text-lg font-bold text-foreground">{value}</p>
      <p className="text-[11px] leading-tight text-muted-foreground">{label}</p>
    </div>
  );
}
