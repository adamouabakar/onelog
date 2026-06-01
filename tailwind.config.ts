import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        /* ── [One]Log brand palette (exact) ───────────────────── */
        brand: {
          night: "#0C1220", // fond principal
          surface: "#142033", // fond secondaire / cartes
          blue: "#3E8EB5", // accent principal — bleu électrique
          gold: "#B18F41", // accent or / premium
          silver: "#829EA4", // accent argent / texte secondaire
          ink: "#F0F0F0", // texte principal
          cream: "#DAD3A5", // texte secondaire alternatif (crème)
        },
        /* ── Couleurs sectorielles (Dashboard de vie) ─────────── */
        sector: {
          finance: "#B18F41", // or
          health: "#3E8EB5", // bleu électrique
          agri: "#8BC34A", // vert doux
          transport: "#FFC107", // orange / jaune
          pay: "#3E8EB5", // bleu (accent or possible)
        },
        /* ── shadcn/ui semantic tokens (HSL via CSS variables) ── */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        display: ["var(--font-display)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(130,158,164,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(130,158,164,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(62,142,181,0.18) 0%, rgba(12,18,32,0) 70%)",
        "gold-sheen":
          "linear-gradient(135deg, rgba(177,143,65,0.18) 0%, rgba(20,32,51,0) 55%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(62,142,181,0.25), 0 18px 60px -20px rgba(62,142,181,0.45)",
        "glow-gold":
          "0 0 0 1px rgba(177,143,65,0.30), 0 18px 60px -20px rgba(177,143,65,0.40)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -28px rgba(0,0,0,0.7)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(2%, -4%) rotate(4deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.9" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        glow: "glow 4.5s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        aurora: "aurora 16s ease-in-out infinite",
        twinkle: "twinkle 5s ease-in-out infinite",
        "spin-slow": "spin-slow 38s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
