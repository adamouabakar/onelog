import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Applique l'i18n à toutes les routes sauf API, assets internes et fichiers.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
