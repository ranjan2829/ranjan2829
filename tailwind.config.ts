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
        "bg-dark": "#050505",
        "bg-card": "#0f0f11",
        "bg-card-border": "#1f1f23",
        "terminal-text": "#e2e8f0",
        muted: "#94a3b8",
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
