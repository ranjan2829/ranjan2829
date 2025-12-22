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
        primary: "#3b82f6",
        "accent-cyan": "#06b6d4",
        "accent-green": "#22c55e",
        "accent-yellow": "#eab308",
        "accent-red": "#ef4444",
        "bg-dark": "var(--bg-dark)",
        "bg-card": "var(--bg-card)",
        "bg-card-border": "var(--bg-card-border)",
        "terminal-text": "var(--terminal-text)",
        muted: "var(--muted)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
