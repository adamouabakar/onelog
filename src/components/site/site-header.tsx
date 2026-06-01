import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/site/locale-switcher";

export async function SiteHeader() {
  const t = await getTranslations("Nav");
  const links = [
    { href: "#pillars", label: t("pillars") },
    { href: "#vision", label: t("vision") },
    { href: "#stories", label: t("stories") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label="[One]Log">
          <Image
            src="/onelog-logo.svg"
            alt="[One]Log"
            width={132}
            height={30}
            priority
            unoptimized
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LocaleSwitcher />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact">
              {t("contact")} <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
