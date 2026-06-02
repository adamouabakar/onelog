import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/site/sections/hero";
import { Pillars } from "@/components/site/sections/pillars";
import { Hub } from "@/components/site/sections/hub";
import { Dashboard } from "@/components/site/sections/dashboard";
import { Stories } from "@/components/site/sections/stories";
import { Vision } from "@/components/site/sections/vision";
import { Faq } from "@/components/site/sections/faq";
import { Contact } from "@/components/site/sections/contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Pillars />
      <Hub />
      <Dashboard />
      <Stories />
      <Vision />
      <Faq />
      <Contact />
    </>
  );
}
