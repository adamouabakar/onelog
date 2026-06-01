import { getTranslations } from "next-intl/server";
import { Flame, Gauge, HeartHandshake } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

const VALUES = [
  { key: "hungry", Icon: Flame },
  { key: "together", Icon: HeartHandshake },
  { key: "excellence", Icon: Gauge },
] as const;

export async function Vision() {
  const t = await getTranslations("Vision");

  return (
    <section
      id="vision"
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gold-sheen opacity-70"
      />
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <Flame className="size-3.5" /> {t("tag")}
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">{t("body")}</p>
          </Reveal>

          <div className="grid gap-4">
            {VALUES.map(({ key, Icon }, i) => (
              <Reveal key={key} delay={i * 0.08}>
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t(`values.${key}.description`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
