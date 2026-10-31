"use client";

import React from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "@/components/ThemeProvider";
import { Section, SectionHeader } from "./Section";

// Planned essays from PORTFOLIO-UPGRADE-PLAN.md. Marked "coming soon" until they're published.
const posts = [
  {
    kind: "Essay",
    title: "Guardrails for AI agents that move real money",
    blurb:
      "Mandatory TP/SL, reduce-only exits, clarify-before-trade, no silent retries — and why an absent signal is not a neutral one.",
  },
  {
    kind: "Deep dive",
    title: "Shipping x402: pay-per-request APIs for AI agents",
    blurb:
      "The HTTP 402 flow, machine-readable pricing agents can discover, the facilitator, and payment without accounts.",
  },
];

/** Upcoming writing on Magic Cards whose spotlight follows the cursor. */
export function Writing() {
  const { theme, mounted } = useTheme();
  const dark = !mounted || theme === "dark";

  return (
    <Section id="writing" labelledBy="writing-title">
      <SectionHeader index="09" eyebrow="Writing" id="writing-title" title="Notes from the trading floor." sub="What it takes to let AI agents move real money." />
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <MagicCard
            key={p.title}
            className="rounded-2xl"
            gradientColor={dark ? "#1a2236" : "#e6ecfb"}
            gradientFrom="#2997FF"
            gradientTo="#64D2FF"
            gradientOpacity={0.6}
          >
            <article className="flex min-h-60 flex-col gap-3.5 p-8 sm:p-9">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Coming soon · {p.kind}
              </span>
              <h3 className="text-2xl font-semibold leading-tight tracking-[-0.025em]">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{p.blurb}</p>
            </article>
          </MagicCard>
        ))}
      </div>
    </Section>
  );
}
