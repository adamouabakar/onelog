import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";

export async function Contact() {
  const t = await getTranslations("Contact");
  const f = await getTranslations("ContactForm");
  const email = t("email");

  return (
    <section id="contact" className="scroll-mt-24 pb-24 pt-4 md:pb-32">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-12">
            <div aria-hidden className="pointer-events-none absolute inset-0 starfield opacity-40" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-glow" />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-gold-sheen blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  {t("tag")}
                </p>
                <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                  {t("title")}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                  {t("subtitle")}
                </p>
              </div>

              <div className="mt-8">
                <ContactForm />
              </div>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {f("orEmail")}{" "}
                <a
                  href={`mailto:${email}`}
                  className="font-mono text-primary hover:underline"
                >
                  {email}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
