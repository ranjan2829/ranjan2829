import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        card: "var(--card)",
        "card-border": "var(--card-border)",
        muted: "var(--muted)",
        accent: "#3b82f6",
        "accent-cyan": "#06b6d4",
        "accent-green": "#22c55e",
        "accent-yellow": "#eab308",
        "accent-red": "#ef4444",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        mono: ['"Fira Code"', "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
