# [One]Log — Site vitrine officiel

Infrastructure polyvalente africaine propulsée par l'IA dans **5 secteurs** :
Finance & Trading (IB), Santé, Agriculture, Transport & Logistique, Transactions financières.

> Mission : résoudre des problèmes concrets et améliorer la vie humaine en Afrique avec l'IA.
> Culture : **Stay Hungry**.

## Stack technique

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS 3.4** — charte graphique exacte (design tokens via variables CSS)
- **next-intl** — bilingue **Français / Anglais** (routing, middleware, navigation)
- **shadcn/ui** (tokens + `cn`) + **Framer Motion** (animations subtiles, respect de `prefers-reduced-motion`)
- SEO multilingue (canonical, `hreflang`, Open Graph, Twitter)

## Charte graphique

| Rôle | Couleur |
| --- | --- |
| Fond principal | `#0C1220` |
| Fond secondaire / cartes | `#142033` |
| Accent bleu électrique | `#3E8EB5` |
| Accent or / premium | `#B18F41` |
| Accent argent / texte secondaire | `#829EA4` |
| Texte principal | `#F0F0F0` |

Exposée via Tailwind : `brand.night`, `brand.surface`, `brand.blue`, `brand.gold`, `brand.silver`, `brand.ink`
et les tokens sémantiques shadcn (`bg-background`, `text-foreground`, `bg-primary`, `bg-accent`, …).

## Démarrage

```bash
pnpm install
pnpm dev          # http://localhost:3000 → redirige vers /fr
```

Autres scripts :

```bash
pnpm build        # build de production
pnpm start        # serveur de production
pnpm lint         # ESLint (next/core-web-vitals)
pnpm typecheck    # tsc --noEmit
```

## Structure

```
src/
├─ app/[locale]/
│  ├─ layout.tsx            # <html>, fonts (Inter + Sora), provider i18n, metadata SEO
│  ├─ not-found.tsx         # 404 bilingue
│  └─ (site)/
│     ├─ layout.tsx         # header + footer + skip-link
│     └─ page.tsx           # page d'accueil (Hero → Piliers → Vision → Réussites → CTA)
├─ components/
│  ├─ ui/button.tsx         # bouton shadcn (variantes: default, gold, outline…)
│  └─ site/                 # header, footer, locale-switcher, reveal, sections/*
├─ i18n/                    # routing.ts, navigation.ts, request.ts
├─ lib/utils.ts             # cn()
└─ middleware.ts            # détection/redirection de locale
messages/                   # fr.json · en.json (tout le contenu éditorial)
public/onelog-logo.svg      # logo (placeholder wordmark — à remplacer par le logo officiel)
```

## Internationalisation

- Locales : `fr` (par défaut) et `en`. Préfixe d'URL toujours présent (`/fr`, `/en`).
- Tout le copywriting vit dans `messages/{locale}.json` — modifiable sans toucher au code.

## À faire (contenu)

Le copywriting et la structure « Dashboard de vie » seront affinés à partir des documents
de référence (Stratégie, Concept Dashboard, Copywriting). Le logo officiel doit remplacer
le placeholder dans `public/`.
