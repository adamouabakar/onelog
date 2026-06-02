import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

export async function Faq() {
  const t = await getTranslations("Faq");
  const items = t.raw("items") as { q: string; a: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-24 py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container max-w-3xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("tag")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-10 space-y-3">
          {items.map((it, i) => (
            <Reveal key={it.q} delay={i * 0.04}>
              <details className="faq-item group rounded-2xl border border-border bg-card px-5 transition-colors open:border-primary/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-base font-semibold [&::-webkit-details-marker]:hidden">
                  {it.q}
                  <ChevronDown className="faq-chevron size-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                </summary>
                <p className="pb-5 leading-relaxed text-muted-foreground">{it.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
