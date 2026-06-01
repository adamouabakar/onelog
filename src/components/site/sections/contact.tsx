import { getTranslations } from "next-intl/server";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export async function Contact() {
  const t = await getTranslations("Contact");
  const email = t("email");

  return (
    <section id="contact" className="scroll-mt-24 pb-24 pt-4 md:pb-32">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center md:p-14">
            <div aria-hidden className="pointer-events-none absolute inset-0 starfield opacity-40" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-glow" />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-gold-sheen blur-3xl"
            />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {t("tag")}
              </p>
              <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                {t("subtitle")}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href={`mailto:${email}`}>
                    <Mail /> {t("button")}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#dashboard">
                    {t("secondary")} <ArrowRight />
                  </a>
                </Button>
              </div>
              <p className="mt-6 font-mono text-sm text-muted-foreground">
                {email}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
