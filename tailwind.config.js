/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // CLAUDE.md 指定トークンを単一の出どころに（tokens.css の :root を参照）
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-soft": "var(--color-surface-soft)",
        primary: "var(--color-primary)",
        "primary-deep": "var(--color-primary-deep)",
        ink: "var(--color-text)",
        muted: "var(--color-text-muted)",
        line: "var(--color-border)",
        lavender: "var(--color-lavender)",
        mint: "var(--color-mint)",
        rose: "var(--color-soft-rose)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        pill: "var(--radius-button)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
      fontFamily: {
        ui: ['"Zen Kaku Gothic New"', "system-ui", "sans-serif"],
        body: ['"Noto Sans JP"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
