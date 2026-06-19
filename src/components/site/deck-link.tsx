import { Download } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { DECK_HREF, isDeckAvailable } from "@/lib/deck";

type DeckLinkProps = {
  namespace?: "Hero" | "Deck";
  className?: string;
  showTrust?: boolean;
  variant?: "inline" | "button";
};

export async function DeckLink({
  namespace = "Hero",
  className = "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary",
  showTrust = namespace === "Hero",
  variant = "inline",
}: DeckLinkProps) {
  const t = await getTranslations(namespace);

  if (!isDeckAvailable()) {
    const message = (
      <>
        <Download className="size-4" aria-hidden />
        {t("unavailable")}
      </>
    );

    if (variant === "button") {
      return (
        <p className="text-sm text-muted-foreground" role="status">
          {message}
        </p>
      );
    }

    return (
      <p className={className} role="status">
        {message}
      </p>
    );
  }

  const label = namespace === "Hero" ? t("ctaTertiary") : t("download");

  if (variant === "button") {
    return (
      <Button asChild size="lg" variant="outline">
        <a href={DECK_HREF} download>
          <Download className="size-4" aria-hidden /> {label}
        </a>
      </Button>
    );
  }

  return (
    <a href={DECK_HREF} className={className} download>
      <Download className="size-4" aria-hidden />
      {label}
      {showTrust ? (
        <span className="text-xs text-muted-foreground/80">
          · {namespace === "Hero" ? t("deckTrust") : t("trust")}
        </span>
      ) : null}
    </a>
  );
}