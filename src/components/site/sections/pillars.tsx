import { getTranslations } from "next-intl/server";
import { HeartPulse, LineChart, Sprout, Truck, Wallet } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const PILLARS = [
  { key: "finance", Icon: LineChart, span: "lg:col-span-4", feature: true },
  { key: "payments", Icon: Wallet, span: "lg:col-span-2", feature: false },
  { key: "health", Icon: HeartPulse, span: "lg:col-span-2", feature: false },
  { key: "agriculture", Icon: Sprout, span: "lg:col-span-2", feature: false },
  { key: "logistics", Icon: Truck, span: "lg:col-span-2", feature: false },
] as const;

export async function Pillars() {
  const t = await getTranslations("Pillars");

  return (
    <section id="pillars" className="relative scroll-mt-24 py-20 md:py-28">
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

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {PILLARS.map(({ key, Icon, span, feature }, i) => (
            <Reveal key={key} delay={i * 0.06} className={cn(span, "h-full")}>
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow",
                )}
              >
                {feature && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-radial-glow opacity-60"
                  />
                )}
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Icon className="size-6" />
                  </span>
                  <span className="rounded-full border border-border bg-background/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {t(`${key}.badge`)}
                  </span>
                </div>
                <h3
                  className={cn(
                    "mt-5 font-display font-semibold tracking-tight",
                    feature ? "text-2xl" : "text-xl",
                  )}
                >
                  {t(`${key}.name`)}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {t(`${key}.description`)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
