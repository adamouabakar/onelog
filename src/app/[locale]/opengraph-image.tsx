import { ImageResponse } from "next/og";

export const alt = "[One]Log — AI infrastructure for Africa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tagline =
    locale === "fr"
      ? "L'IA qui transforme votre quotidien en Afrique"
      : "The AI transforming everyday life in Africa";

  const sectors =
    locale === "fr"
      ? ["Finance", "Santé", "Agriculture", "Transport", "Paiements"]
      : ["Finance", "Health", "Agriculture", "Transport", "Payments"];

  const colors = ["#B18F41", "#3E8EB5", "#8BC34A", "#FFC107", "#3E8EB5"];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0C1220",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "440px",
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(62,142,181,0.28), rgba(12,18,32,0))",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 800 }}>
          <span style={{ color: "#829EA4" }}>[one]</span>
          <span style={{ color: "#B18F41" }}>Log</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 70,
              fontWeight: 800,
              color: "#F0F0F0",
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            {tagline}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {sectors.map((s, i) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1px solid rgba(130,158,164,0.28)",
                  borderRadius: 999,
                  padding: "8px 18px",
                  fontSize: 22,
                  color: "#C9D3D6",
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    background: colors[i],
                    display: "flex",
                  }}
                />
                {s}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#829EA4",
          }}
        >
          <div style={{ display: "flex" }}>onelog.io</div>
          <div style={{ display: "flex", color: "#B18F41", fontWeight: 600 }}>
            Stay Hungry.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
