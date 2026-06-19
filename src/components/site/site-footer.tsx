import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { DECK_HREF, isDeckAvailable } from "@/lib/deck";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const d = await getTranslations("Dashboard");
  const year = new Date().getFullYear();

  const sectors = [
    "finance",
    "health",
    "agriculture",
    "transport",
    "payments",
  ] as const;

  const company = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "careers", href: "/careers" },
    { key: "blog", href: "/blog" },
    ...(isDeckAvailable()
      ? [{ key: "deck" as const, href: DECK_HREF, external: true as const }]
      : []),
    { key: "contact", href: "/#contact" },
  ] as const;

  const legal = [
    { key: "legalNotice", href: "/legal/legal-notice" },
    { key: "privacy", href: "/legal/privacy" },
    { key: "terms", href: "/legal/terms" },
  ] as const;

  return (
    <footer className="border-t border-border bg-brand-surface/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/onelog-logo.svg"
              alt="[One]Log"
              width={140}
              height={32}
              unoptimized
              className="h-7 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {t("tagline")}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {t("stayHungry")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("cols.solutions")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {sectors.map((s) => (
                <li key={s}>
                  <Link
                    href={`/solutions/${s}`}
                    className="transition-colors hover:text-primary"
                  >
                    {d(`${s}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("cols.company")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {company.map(({ key, href, ...rest }) => (
                <li key={key}>
                  {"external" in rest && rest.external ? (
                    <a
                      href={href}
                      className="transition-colors hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t(`links.${key}`)}
                    </a>
                  ) : href.startsWith("/") ? (
                    <Link
                      href={href}
                      className="transition-colors hover:text-primary"
                    >
                      {t(`links.${key}`)}
                    </Link>
                  ) : (
                    <a href={href} className="transition-colors hover:text-primary">
                      {t(`links.${key}`)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("cols.legal")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {legal.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className="transition-colors hover:text-primary">
                    {t(`links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} [One]Log. {t("rights")}</p>
          <p>{t("madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}
