import { getTranslations } from "next-intl/server";
import { ArrowRight, Flame, Gauge, HeartHandshake } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

const VALUES = [
  { key: "hungry", Icon: Flame },
  { key: "together", Icon: HeartHandshake },
  { key: "excellence", Icon: Gauge },
] as const;

/* Carte stylisée de l'Afrique : zones d'impact (nœuds lumineux + liens or) */
const NODES = [
  { city: "Le Caire", x: 256, y: 70 },
  { city: "Dakar", x: 64, y: 150 },
  { city: "Lagos", x: 150, y: 214 },
  { city: "Nairobi", x: 300, y: 246 },
  { city: "Kinshasa", x: 214, y: 268 },
  { city: "Johannesburg", x: 236, y: 332 },
];
const LINKS = [
  [1, 2],
  [2, 4],
  [4, 3],
  [3, 0],
  [4, 5],
  [0, 1],
];

function ImpactMap({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-5">
      <div aria-hidden className="pointer-events-none absolute inset-0 starfield opacity-40" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-glow opacity-60" />
      <div className="relative flex items-center justify-between">
        <p className="font-display text-sm font-semibold">{title}</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
          <span className="size-1.5 animate-glow rounded-full bg-primary" /> 54
        </span>
      </div>
      <svg
        viewBox="0 0 360 380"
        className="relative mx-auto mt-2 h-auto w-full max-w-sm"
        role="img"
        aria-label={hint}
      >
        {LINKS.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="#B18F41"
            strokeWidth="1.2"
            strokeOpacity="0.55"
            strokeDasharray="3 4"
          />
        ))}
        {NODES.map((n) => (
          <g key={n.city}>
            <circle cx={n.x} cy={n.y} r="9" fill="#3E8EB5" fillOpacity="0.18" />
            <circle cx={n.x} cy={n.y} r="3.5" fill="#3E8EB5">
              <animate
                attributeName="fill-opacity"
                values="0.5;1;0.5"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={n.x + 12}
              y={n.y + 4}
              fontSize="11"
              fill="#829EA4"
              fontFamily="var(--font-sans), sans-serif"
            >
              {n.city}
            </text>
          </g>
        ))}
      </svg>
      <p className="relative mt-1 text-center text-xs text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}

export async function Vision() {
  const t = await getTranslations("Vision");

  return (
    <section
      id="vision"
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gold-sheen opacity-70"
      />
      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <Flame className="size-3.5" /> {t("tag")}
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-xl text-brand-silver">{t("body")}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {VALUES.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="rounded-2xl border border-border bg-card p-4"
                >
                  <Icon className="size-5 text-accent" />
                  <p className="mt-2.5 text-sm font-semibold">
                    {t(`values.${key}.title`)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t(`values.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild size="lg" variant="gold">
                <a href="#contact">
                  {t("cta")} <ArrowRight />
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ImpactMap title={t("mapTitle")} hint={t("mapHint")} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
