import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
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
        "card-hover": "var(--card-hover)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-green": "var(--accent-green)",
        "accent-yellow": "var(--accent-yellow)",
        "accent-red": "var(--accent-red)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
