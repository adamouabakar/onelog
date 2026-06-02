import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/site/reveal";

const DOCS = ["legal-notice", "privacy", "terms"] as const;
type Doc = (typeof DOCS)[number];

function isDoc(value: string): value is Doc {
  return (DOCS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return DOCS.map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isDoc(doc)) return {};

  const t = await getTranslations({ locale, namespace: "Legal" });
  return {
    title: t(`${doc}.title`),
    alternates: {
      canonical: `/${locale}/legal/${doc}`,
      languages: {
        fr: `/fr/legal/${doc}`,
        en: `/en/legal/${doc}`,
      },
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { locale, doc } = await params;
  if (!isDoc(doc)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Legal");
  const sections = t.raw(`${doc}.sections`) as {
    heading: string;
    body: string;
  }[];
  const updated = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    dateStyle: "long",
  }).format(new Date());

  return (
    <section className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-radial-glow"
      />
      <div className="container relative max-w-3xl py-14 md:py-20">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> {t("backToHome")}
          </Link>
          <h1 className="mt-8 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t(`${doc}.title`)}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("updated")} · {updated}
          </p>
        </Reveal>

        <div className="mt-10 space-y-8">
          {sections.map((sec, i) => (
            <Reveal key={sec.heading} delay={i * 0.04}>
              <h2 className="font-display text-lg font-semibold">{sec.heading}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{sec.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
