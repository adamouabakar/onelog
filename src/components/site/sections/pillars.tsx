import { getTranslations } from "next-intl/server";
import { Infinity as InfinityIcon, Languages, Layers, LayoutGrid } from "lucide-react";

import { CountUp } from "@/components/site/count-up";
import { Reveal } from "@/components/site/reveal";

/** Bande de valeurs : preuve immédiate de la proposition [One]Log. */
export async function Pillars() {
  const t = await getTranslations("Pillars");

  const items = [
    { Icon: LayoutGrid, to: 5, label: t("sectors") },
    { Icon: Layers, to: 1, label: t("platform") },
    { Icon: Languages, to: 2, label: t("languages") },
  ] as const;

  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="container">
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-9 py-10 md:grid-cols-4">
            {items.map(({ Icon, to, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <Icon className="size-5 text-primary" />
                <dd className="mt-2.5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  <CountUp to={to} />
                </dd>
                <dt className="mt-1.5 text-xs text-muted-foreground">{label}</dt>
              </div>
            ))}
            <div className="flex flex-col items-center text-center">
              <InfinityIcon className="size-5 text-accent" />
              <dd className="mt-2.5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                24/7
              </dd>
              <dt className="mt-1.5 text-xs text-muted-foreground">{t("always")}</dt>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
