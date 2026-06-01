import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const p = await getTranslations("Pillars");
  const year = new Date().getFullYear();
  const sectors = [
    "finance",
    "health",
    "agriculture",
    "logistics",
    "payments",
  ] as const;

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/onelog-logo.svg"
              alt="[One]Log"
              width={132}
              height={30}
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
            <h3 className="text-sm font-semibold">{t("sectorsTitle")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {sectors.map((s) => (
                <li key={s}>
                  <a
                    href="#pillars"
                    className="transition-colors hover:text-foreground"
                  >
                    {p(`${s}.name`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("companyTitle")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="#vision"
                  className="transition-colors hover:text-foreground"
                >
                  {t("vision")}
                </a>
              </li>
              <li>
                <a
                  href="#stories"
                  className="transition-colors hover:text-foreground"
                >
                  {t("stories")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@onelog.io"
                  className="transition-colors hover:text-foreground"
                >
                  {t("contact")}
                </a>
              </li>
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
