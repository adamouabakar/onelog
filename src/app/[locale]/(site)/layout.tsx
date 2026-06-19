import { getTranslations } from "next-intl/server";

import { PlausibleScript } from "@/components/site/plausible-script";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { WhatsAppCta } from "@/components/site/whatsapp-cta";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("Nav");
  const plausibleDomain = process.env.PLAUSIBLE_DOMAIN;
  const whatsappNumber = process.env.WHATSAPP_NUMBER;

  return (
    <>
      {plausibleDomain ? <PlausibleScript domain={plausibleDomain} /> : null}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        {t("skipToContent")}
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      {whatsappNumber ? (
        <WhatsAppCta number={whatsappNumber} label={t("whatsapp")} />
      ) : null}
    </>
  );
}
