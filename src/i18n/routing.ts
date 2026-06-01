import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Français par défaut (ancrage panafricain francophone), Anglais disponible.
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
