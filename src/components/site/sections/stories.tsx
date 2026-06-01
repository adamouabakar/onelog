import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

const ITEMS = ["one", "two", "three"] as const;

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
          {ITEMS.map((id, i) => (
            <Reveal key={id} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <Quote className="size-7 text-primary/70" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                  {t(`items.${id}.quote`)}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="font-medium">{t(`items.${id}.author`)}</p>
                  <p className="text-xs text-muted-foreground">
                    {t(`items.${id}.role`)}
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
