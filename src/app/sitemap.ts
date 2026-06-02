import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

const SECTORS = ["finance", "health", "agriculture", "transport", "payments"];
const LEGAL = ["legal-notice", "privacy", "terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://onelog.io";
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    });
    for (const sector of SECTORS) {
      entries.push({
        url: `${base}/${locale}/solutions/${sector}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    for (const doc of LEGAL) {
      entries.push({
        url: `${base}/${locale}/legal/${doc}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
  }

  return entries;
}
