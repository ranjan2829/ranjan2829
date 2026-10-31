"use client";

import React from "react";
import { Bot, Boxes, ChartCandlestick, FilePen, Lock, ShieldCheck } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "@/components/ThemeProvider";
import { Section, SectionHeader } from "./Section";

// Each pillar is a claim a fintech hiring manager screens for, backed by a line in lib/resume.ts.
const pillars = [
  {
    icon: ShieldCheck,
    title: "Compliance-grade AI",
    body: "An AI assistant for a FINRA-regulated firm managing $5B in client assets — mandatory live fetches over cached history, anti-hallucination rules, no system-prompt disclosure.",
    where: "Allocations",
  },
  {
    icon: Bot,
    title: "Agents that move money, safely",
    body: "LLM agents with wallet authority trading live on Hyperliquid, Lighter and Polymarket, with execution-safety guardrails on every order.",
    where: "GigaBrain",
  },
  {
    icon: Lock,
    title: "Security from day one",
    body: "A full OAuth 2.0 provider with email OTP and TOTP 2FA, ES256 JWT validation, row-level security, and hardening across 8 repositories.",
    where: "Allocations",
  },
  {
    icon: FilePen,
    title: "Audit-ready documents",
    body: "Six agreement types generated from structured deal data, with DocuSeal e-signature webhooks and SHA-256 audit trails.",
    where: "Allocations",
  },
  {
    icon: ChartCandlestick,
    title: "Quant foundations",
    body: "A Black-Scholes options engine with full Greeks, 45+ technical indicators, and tick-by-tick pipelines made 3.2× faster.",
    where: "MaticAlgos",
  },
  {
    icon: Boxes,
    title: "End-to-end delivery",
    body: "AllocationsX, a FINRA-regulated pre-IPO secondaries platform — NestJS + Supabase API and a Next.js admin console across 24 domain modules.",
    where: "Allocations",
  },
];

/** What a fintech team gets: six capabilities, each traceable to shipped work. */
export function Fintech() {
  const { theme, mounted } = useTheme();
  const dark = !mounted || theme === "dark";

  return (
    <Section id="fintech" labelledBy="fintech-title">
      <SectionHeader
        index="02"
        eyebrow="For fintech teams"
        id="fintech-title"
        title="Built for regulated money."
        sub="What I bring to a team that moves other people's money — each one already shipped."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map(({ icon: Icon, title, body, where }, i) => (
          <BlurFade key={title} inView delay={Math.min(i, 5) * 0.05} className="h-full">
            <MagicCard
              className="h-full rounded-3xl"
              gradientColor={dark ? "#14243a" : "#e8f0fd"}
              gradientFrom="#2997FF"
              gradientTo="#64D2FF"
              gradientOpacity={0.6}
            >
              <article className="flex h-full flex-col gap-4 p-7">
                <span className="flex size-11 items-center justify-center rounded-2xl border border-card-border bg-background text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.025em]">{title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{body}</p>
                <p className="mt-auto pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Shipped at <span className="text-foreground/80">{where}</span>
                </p>
              </article>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
