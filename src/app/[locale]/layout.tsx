import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL("https://onelog.io"),
    title: {
      default: t("title"),
      template: "%s · [One]Log",
    },
    description: t("description"),
    applicationName: "[One]Log",
    keywords: [
      "[One]Log",
      "onelog",
      "IA",
      "intelligence artificielle",
      "Afrique",
      "fintech",
      "trading",
      "santé",
      "agriculture",
      "logistique",
      "paiements",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: "[One]Log",
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    icons: {
      icon: "/favicon.svg",
      apple: "/favicon.svg",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tMeta = await getTranslations({ locale, namespace: "Meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://onelog.io/#organization",
        name: "[One]Log",
        url: "https://onelog.io",
        logo: "https://onelog.io/onelog-logo.svg",
        description: tMeta("description"),
        slogan: "Stay Hungry.",
        areaServed: "Africa",
      },
      {
        "@type": "WebSite",
        "@id": "https://onelog.io/#website",
        url: "https://onelog.io",
        name: "[One]Log",
        inLanguage: locale,
        publisher: { "@id": "https://onelog.io/#organization" },
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`dark ${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
