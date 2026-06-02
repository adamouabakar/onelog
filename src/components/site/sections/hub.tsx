import { getTranslations } from "next-intl/server";
import {
  Bell,
  HeartPulse,
  Lightbulb,
  LineChart,
  Sparkles,
  Sprout,
  TrendingUp,
  Truck,
  Wallet,
} from "lucide-react";

import { Reveal } from "@/components/site/reveal";

const INPUTS = [
  { key: "finance", Icon: LineChart },
  { key: "health", Icon: HeartPulse },
  { key: "agriculture", Icon: Sprout },
  { key: "transport", Icon: Truck },
  { key: "payments", Icon: Wallet },
] as const;

const OUTPUTS = [
  { key: "decisions", Icon: Lightbulb },
  { key: "alerts", Icon: Bell },
  { key: "optimizations", Icon: TrendingUp },
] as const;

export async function Hub() {
  const t = await getTranslations("Hub");
  const d = await getTranslations("Dashboard");

  return (
    <section id="hub" className="relative scroll-mt-24 py-20 md:py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("tag")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-border bg-card/50 p-6 md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70"
            />
            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
              {/* Entrées : données des 5 secteurs */}
              <div className="grid gap-2.5">
                {INPUTS.map(({ key, Icon }) => (
                  <div
                    key={key}
                    className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 px-3 py-2"
                  >
                    <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="truncate text-sm text-foreground/90">
                      {d(`${key}.name`)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cœur : IA [One]Log */}
              <div className="relative grid place-items-center py-2">
                {/* anneau externe */}
                <div
                  aria-hidden
                  className="absolute size-36 animate-spin-slow rounded-full border border-dashed border-primary/25"
                />
                {/* anneau interne contra-rotatif */}
                <div
                  aria-hidden
                  className="absolute size-28 animate-spin-slow rounded-full border border-dashed border-accent/20 [animation-direction:reverse] [animation-duration:26s]"
                />
                {/* point de donnée en orbite */}
                <div aria-hidden className="absolute size-36 animate-spin-slow">
                  <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 rounded-full bg-primary shadow-glow" />
                </div>
                {/* halo pulsé */}
                <div
                  aria-hidden
                  className="absolute size-24 animate-glow rounded-full bg-primary/15 blur-xl"
                />
                <div className="relative grid size-24 place-items-center rounded-full border border-primary/40 bg-background/80 text-center shadow-glow">
                  <div>
                    <Sparkles className="mx-auto size-5 text-primary" />
                    <p className="mt-1 font-display text-xs font-semibold leading-tight">
                      {t("core")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sorties : solutions générées */}
              <div className="grid gap-2.5">
                {OUTPUTS.map(({ key, Icon }) => (
                  <div
                    key={key}
                    className="flex items-center justify-end gap-3 rounded-xl border border-accent/30 bg-accent/5 px-3 py-2"
                  >
                    <span className="truncate text-sm text-foreground/90">
                      {t(`outputs.${key}`)}
                    </span>
                    <span className="grid size-8 place-items-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-4" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="relative mt-8 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t("flow")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
