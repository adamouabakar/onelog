import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const ITEMS = [
  { key: "agri", metricClass: "text-sector-agri" },
  { key: "health", metricClass: "text-sector-health" },
  { key: "finance", metricClass: "text-sector-finance" },
] as const;

export async function Stories() {
  const t = await getTranslations("Stories");

  return (
    <section id="stories" className="scroll-mt-24 py-20 md:py-28">
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

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {ITEMS.map(({ key, metricClass }, i) => (
            <Reveal key={key} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "font-display text-4xl font-extrabold tracking-tight",
                      metricClass,
                    )}
                  >
                    {t(`items.${key}.metric`)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t(`items.${key}.metricLabel`)}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold leading-snug">
                  {t(`items.${key}.title`)}
                </h3>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t(`items.${key}.quote`)}”
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-medium text-primary">
                    {t(`items.${key}.author`)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t(`items.${key}.role`)}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
