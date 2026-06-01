import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/site/sections/hero";
import { Pillars } from "@/components/site/sections/pillars";
import { Vision } from "@/components/site/sections/vision";
import { Stories } from "@/components/site/sections/stories";
import { Cta } from "@/components/site/sections/cta";

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
      <Vision />
      <Stories />
      <Cta />
    </>
  );
}
