import { getTranslations } from "next-intl/server";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bell,
  CalendarClock,
  CloudRain,
  Droplets,
  HeartPulse,
  LineChart,
  type LucideIcon,
  MapPin,
  Pill,
  ShieldCheck,
  Sprout,
  Truck,
  Wallet,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { CountUp } from "@/components/site/count-up";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

/* ── Petits éléments de widget ──────────────────────────────── */

function Bar({ pct, className }: { pct: number; className?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
      <div
        className={cn("h-full rounded-full", className)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function Spark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 48"
      preserveAspectRatio="none"
      className={cn("h-12 w-full", className)}
      fill="none"
      aria-hidden
    >
      <polyline
        className="spark-line"
        points="0,38 24,30 48,34 72,22 96,26 120,14 144,18 168,8 200,12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="0,38 24,30 48,34 72,22 96,26 120,14 144,18 168,8 200,12 200,48 0,48"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="none"
      />
    </svg>
  );
}

/* ── Coquille de carte ──────────────────────────────────────── */

function DashCard({
  Icon,
  iconClass,
  dotClass,
  hoverClass,
  name,
  tag,
  live,
  title,
  titleClass,
  content,
  cta,
  ctaClass,
  href,
  children,
}: {
  Icon: LucideIcon;
  iconClass: string;
  dotClass: string;
  hoverClass: string;
  name: string;
  tag: string;
  live: string;
  title: string;
  titleClass: string;
  content: string;
  cta: string;
  ctaClass: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 md:p-6",
        hoverClass,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid size-10 place-items-center rounded-xl",
              iconClass,
            )}
          >
            <Icon className="size-5" />
          </span>
          <div>
            <p className="font-display text-sm font-semibold leading-tight">
              {name}
            </p>
            <p className="text-xs text-muted-foreground">{tag}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-background/60 px-2 py-1 text-[10px] uppercase tracking-wide text-muted-foreground">
          <span className={cn("size-1.5 animate-glow rounded-full", dotClass)} />
          {live}
        </span>
      </div>

      <h3
        className={cn(
          "mt-4 font-display text-lg font-semibold tracking-tight md:text-xl",
          titleClass,
        )}
      >
        {title}
      </h3>

      <div className="mt-4">{children}</div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {content}
      </p>

      <Link
        href={href}
        className={cn(
          "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5",
          ctaClass,
        )}
      >
        {cta} <ArrowRight className="size-4" />
      </Link>
    </article>
  );
}

function Field({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="truncate text-muted-foreground">{label}</span>
      <span className={cn("font-mono", valueClass)}>{value}</span>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────── */

export async function Dashboard() {
  const d = await getTranslations("Dashboard");

  return (
    <section id="dashboard" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {d("tag")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {d("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{d("subtitle")}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {/* Finance — carte vedette */}
          <Reveal className="h-full md:col-span-2 lg:col-span-7">
            <DashCard
              Icon={LineChart}
              iconClass="bg-sector-finance/10 text-sector-finance"
              dotClass="bg-sector-finance"
              hoverClass="hover:border-sector-finance/50 hover:shadow-glow-gold"
              name={d("finance.name")}
              tag={d("finance.tag")}
              live={d("live")}
              title={d("finance.title")}
              titleClass="text-sector-finance"
              content={d("finance.content")}
              cta={d("finance.cta")}
              ctaClass="text-sector-finance"
              href="/solutions/finance"
            >
              <div className="rounded-xl border border-border/70 bg-background/40 p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {d("finance.w.portfolio")}
                    </p>
                    <p className="font-mono text-2xl font-semibold">
                      <CountUp to={1248300} formatter="fcfa" />{" "}
                      <span className="text-sm text-muted-foreground">FCFA</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {d("finance.w.today")}
                    </p>
                    <p className="font-mono text-sm font-semibold text-emerald-400">
                      +2,4%
                    </p>
                  </div>
                </div>
                <Spark className="mt-3 text-sector-finance" />
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-sector-finance/10 px-2.5 py-2 text-xs text-sector-finance">
                  <Bell className="size-3.5 shrink-0" />
                  <span className="font-medium">{d("finance.w.alert")}</span>
                  <span className="ml-auto truncate text-[11px] text-muted-foreground">
                    {d("finance.w.alertHint")}
                  </span>
                </div>
              </div>
            </DashCard>
          </Reveal>

          {/* Santé */}
          <Reveal delay={0.06} className="h-full lg:col-span-5">
            <DashCard
              Icon={HeartPulse}
              iconClass="bg-sector-health/10 text-sector-health"
              dotClass="bg-sector-health"
              hoverClass="hover:border-sector-health/50 hover:shadow-glow"
              name={d("health.name")}
              tag={d("health.tag")}
              live={d("live")}
              title={d("health.title")}
              titleClass="text-sector-health"
              content={d("health.content")}
              cta={d("health.cta")}
              ctaClass="text-sector-health"
              href="/solutions/health"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 p-3">
                  <CalendarClock className="size-4 shrink-0 text-sector-health" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {d("health.w.appointment")}
                    </p>
                    <p className="truncate text-sm font-medium">
                      {d("health.w.doctor")}
                    </p>
                  </div>
                  <span className="ml-auto whitespace-nowrap font-mono text-xs text-sector-health">
                    {d("health.w.when")}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 p-3">
                  <Pill className="size-4 shrink-0 text-sector-health" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {d("health.w.med")}
                    </p>
                    <p className="truncate text-sm">{d("health.w.medHint")}</p>
                  </div>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-sector-health">
                  <MapPin className="size-3.5" /> {d("health.w.pharmacy")}
                </p>
              </div>
            </DashCard>
          </Reveal>

          {/* Agriculture */}
          <Reveal delay={0.12} className="h-full lg:col-span-4">
            <DashCard
              Icon={Sprout}
              iconClass="bg-sector-agri/10 text-sector-agri"
              dotClass="bg-sector-agri"
              hoverClass="hover:border-sector-agri/50"
              name={d("agriculture.name")}
              tag={d("agriculture.tag")}
              live={d("live")}
              title={d("agriculture.title")}
              titleClass="text-sector-agri"
              content={d("agriculture.content")}
              cta={d("agriculture.cta")}
              ctaClass="text-sector-agri"
              href="/solutions/agriculture"
            >
              <div className="space-y-3 rounded-xl border border-border/70 bg-background/40 p-4">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {d("agriculture.w.crop")}
                    </span>
                    <span className="font-mono text-sector-agri">
                      {d("agriculture.w.cropStatus")}
                    </span>
                  </div>
                  <Bar pct={92} className="mt-2 bg-sector-agri" />
                </div>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CloudRain className="size-4 text-sector-health" />
                  {d("agriculture.w.weather")}
                </p>
                <Field
                  label={d("agriculture.w.price")}
                  value={d("agriculture.w.priceVal")}
                  valueClass="text-emerald-400"
                />
                <p className="flex items-center gap-1.5 text-xs text-sector-agri">
                  <Droplets className="size-3.5" /> {d("agriculture.w.alert")}
                </p>
              </div>
            </DashCard>
          </Reveal>

          {/* Transport */}
          <Reveal delay={0.18} className="h-full lg:col-span-4">
            <DashCard
              Icon={Truck}
              iconClass="bg-sector-transport/10 text-sector-transport"
              dotClass="bg-sector-transport"
              hoverClass="hover:border-sector-transport/50"
              name={d("transport.name")}
              tag={d("transport.tag")}
              live={d("live")}
              title={d("transport.title")}
              titleClass="text-sector-transport"
              content={d("transport.content")}
              cta={d("transport.cta")}
              ctaClass="text-sector-transport"
              href="/solutions/transport"
            >
              <div className="space-y-3 rounded-xl border border-border/70 bg-background/40 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-foreground/80">
                    {d("transport.w.shipment")}
                  </span>
                  <span className="text-sector-transport">
                    {d("transport.w.eta")}
                  </span>
                </div>
                <p className="text-sm">{d("transport.w.route")}</p>
                <Bar pct={68} className="bg-sector-transport" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Truck className="size-3.5" /> {d("transport.w.fleetVal")}
                  </span>
                  <span>{d("transport.w.maintenance")}</span>
                </div>
              </div>
            </DashCard>
          </Reveal>

          {/* Transactions */}
          <Reveal delay={0.24} className="h-full lg:col-span-4">
            <DashCard
              Icon={Wallet}
              iconClass="bg-sector-pay/10 text-sector-pay"
              dotClass="bg-sector-pay"
              hoverClass="hover:border-sector-pay/50 hover:shadow-glow"
              name={d("payments.name")}
              tag={d("payments.tag")}
              live={d("live")}
              title={d("payments.title")}
              titleClass="text-sector-pay"
              content={d("payments.content")}
              cta={d("payments.cta")}
              ctaClass="text-sector-pay"
              href="/solutions/payments"
            >
              <div className="rounded-xl border border-border/70 bg-background/40 p-4">
                <p className="text-xs text-muted-foreground">
                  {d("payments.w.balance")}
                </p>
                <p className="font-mono text-2xl font-semibold">
                  <CountUp to={340500} formatter="fcfa" />{" "}
                  <span className="text-sm text-muted-foreground">FCFA</span>
                </p>
                <div className="mt-3 flex items-center justify-between rounded-lg bg-background/60 px-3 py-2 text-xs">
                  <span className="text-muted-foreground">
                    {d("payments.w.lastTransfer")}
                  </span>
                  <span className="truncate text-foreground/80">
                    {d("payments.w.lastHint")}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <span className="flex items-center justify-center gap-1.5 rounded-lg bg-sector-pay/10 py-2 text-xs font-medium text-sector-pay">
                    <ArrowUp className="size-3.5" /> {d("payments.w.send")}
                  </span>
                  <span className="flex items-center justify-center gap-1.5 rounded-lg bg-sector-pay/10 py-2 text-xs font-medium text-sector-pay">
                    <ArrowDown className="size-3.5" /> {d("payments.w.receive")}
                  </span>
                </div>
                <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <ShieldCheck className="size-3.5 text-sector-pay" />
                  {d("payments.w.secure")}
                </p>
              </div>
            </DashCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
