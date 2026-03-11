import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────────────────────────
      // COLORS — oklch-driven, referencing CSS variables
      // ─────────────────────────────────────────────────────────────
      colors: {
        // ── Surfaces ──
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-fg": "var(--card-foreground)",

        // ── Brand — bottle green ──
        primary: "var(--primary)",
        "primary-fg": "var(--primary-foreground)",

        // ── Supporting ──
        secondary: "var(--secondary)",
        "secondary-fg": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-fg": "var(--muted-foreground)",

        // ── Accent ──
        accent: "var(--accent)",
        "accent-fg": "var(--accent-foreground)",

        // ── Chrome ──
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        // ── State ──
        destructive: "var(--destructive)",
        "destructive-fg": "var(--destructive-foreground)",

        // ── Legacy aliases (backwards compat for any straggler classes) ──
        dark: "var(--background)",
        surface: "var(--card)",
        elevated: "var(--contact-bg)",
        "text-hi": "var(--foreground)",
        "text-mid": "var(--muted-foreground)",
        "text-lo": "var(--muted-foreground)",
      },

      // ─────────────────────────────────────────────────────────────
      // FONTS
      // ─────────────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      // ─────────────────────────────────────────────────────────────
      // ANIMATIONS
      // ─────────────────────────────────────────────────────────────
      animation: {
        "pulse-slow": "pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.2s ease-in-out infinite alternate",
        "marquee": "marquee 32s linear infinite",
        "marquee-rev": "marquee-rev 28s linear infinite",
        "shimmer": "shimmer 2.2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "glow-pulse": {
          "0%": { boxShadow: "0 0  6px oklch(0.72 0.18 48 / 0.20)" },
          "100%": { boxShadow: "0 0 22px oklch(0.72 0.18 48 / 0.50), 0 0 50px oklch(0.72 0.18 48 / 0.12)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "100%": { transform: "translateX( 350%) skewX(-20deg)" },
        },
      },

      // ─────────────────────────────────────────────────────────────
      // BACKGROUND IMAGES
      // ─────────────────────────────────────────────────────────────
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url('/noise.svg')",
        "grid": `
          linear-gradient(oklch(0.72 0.18 48 / 0.04) 1px, transparent 1px),
          linear-gradient(90deg, oklch(0.72 0.18 48 / 0.04) 1px, transparent 1px)
        `,
        "accent-gradient": "linear-gradient(135deg, var(--primary), oklch(0.50 0.022 52))",
      },
      backgroundSize: {
        "grid": "64px 64px",
      },

      // ─────────────────────────────────────────────────────────────
      // BOX SHADOWS — bottle green glows
      // ─────────────────────────────────────────────────────────────
      boxShadow: {
        "accent-sm": "0  4px 16px oklch(0.72 0.18 48 / 0.12)",
        "accent-md": "0  8px 32px oklch(0.72 0.18 48 / 0.16)",
        "accent-lg": "0 16px 56px oklch(0.72 0.18 48 / 0.22)",
        "accent-glow": "0  0  18px oklch(0.72 0.18 48 / 0.20), 0 0 50px oklch(0.72 0.18 48 / 0.06)",
        "card-hover": "0 16px 48px oklch(0.72 0.18 48 / 0.06), 0 4px 16px oklch(0 0 0 / 0.08)",
        "card-deep": "0 24px 64px oklch(0 0 0 / 0.12)",
      },

      // ─────────────────────────────────────────────────────────────
      // BORDER RADIUS
      // ─────────────────────────────────────────────────────────────
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;