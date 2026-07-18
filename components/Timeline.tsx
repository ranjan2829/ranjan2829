"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Role {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  /** Detail shown on expand — the specifics a hiring manager actually wants. */
  highlights: string[];
  isActive?: boolean;
}

const timelineData: Role[] = [
  {
    title: "Lead AI Infrastructure & Full-Stack Engineer",
    company: "Allocations",
    location: "Dubai, UAE",
    date: "Feb 2026 — Present",
    description:
      "AI platform, Model Context Protocol infrastructure, and a FINRA-regulated secondaries trading platform.",
    highlights: [
      "Built the company's AI assistant across backend and frontend — streaming SSE chat on Cerebras GLM-4.7 with Model Context Protocol tool calling over live fund, investor and banking data.",
      "Engineered its reliability layer: intent-based tool routing, token-budget pruning for long sessions, MCP reconnection, and server-side pagination keeping summaries consistent with tables.",
      "Authored the safety architecture — mandatory live-fetch over cached history, anti-hallucination rules, and reasoning-block suppression preventing system-prompt disclosure.",
      "Built three MCP servers with a full OAuth 2.0 provider (email OTP + TOTP 2FA), ES256 JWT validation, opaque token registry, headless auth, and 40+ tools.",
      "Built a gateway orchestrating 10 AI agents with classifier-based routing, multi-agent synthesis and SSE progress streaming.",
      "Built AllocationsX, the firm's FINRA-regulated pre-IPO secondaries trading platform — NestJS + Supabase API and Next.js admin console across 24 domain modules.",
      "Architected the legal document generation platform — six agreement types from structured deal data via Puppeteer HTML-to-PDF, with DocuSeal e-signature webhooks and SHA-256 audit trails.",
      "Led security hardening across 8 repositories and fixed a multi-gigabyte production memory leak traced to unbounded session state.",
    ],
    isActive: true,
  },
  {
    title: "Software Development Engineer",
    company: "Brain Labs (GigaBrain)",
    location: "Pune, India",
    date: "Aug 2025 — Jan 2026",
    description:
      "Autonomous crypto trading agents with live on-chain execution authority.",
    highlights: [
      "Built AI trading agents executing live on-chain across Hyperliquid perps, Lighter (zkSync L2) and Polymarket — a 30-tool LLM interface with execution-safety guardrails on every order.",
      "Engineered the wallet layer: factory-deployed smart-contract wallets on Base, Privy delegated signing, EIP-712 typed-data signatures, BIP-32/39 derivation and HPKE key custody.",
      "Shipped x402 HTTP-native USDC micropayments on Base — pay-per-request API access enabling autonomous agent-to-agent commerce without accounts.",
      "Architected a 6,300-line async technical analysis engine — 25+ indicators, market-regime classification, pattern and divergence detection, and volatility-based risk sizing (~70% faster).",
      "Built two market-data SDKs from scratch: CoinGlass (284 typed models, ~120 endpoints) and DeFiLlama (12 domains).",
      "Designed multi-provider LLM routing with bring-your-own-model across OpenAI, Anthropic, Gemini, xAI and OpenRouter.",
      "Deployed 20+ Python microservices on AWS ECS Fargate with per-agent IAM isolation and SQLite + Litestream S3 replication for crash recovery.",
    ],
  },
  {
    title: "Associate Software Developer Intern",
    company: "OneLab Ventures",
    location: "Hinjewadi, Pune",
    date: "Jun — Aug 2025",
    description: "AI calling agent on Twilio, FastAPI and AWS.",
    highlights: [
      "Built and deployed an AI calling agent processing 320+ interviews at 98%+ transcription accuracy.",
      "Architected an async backend (15+ REST APIs, WebSockets) handling 70 concurrent calls with horizontal scaling — about 65% lower latency.",
      "Implemented a Transformer-based text generator with sub-second inference using PyTorch.",
    ],
  },
  {
    title: "Quantitative Engineer Intern",
    company: "MaticAlgos",
    location: "Pune",
    date: "Mar — May 2025",
    description: "Real-time market data pipelines and options pricing.",
    highlights: [
      "Optimized real-time tick-by-tick data pipelines to run 3.2× faster, cutting latency roughly 69%.",
      "Developed 45+ technical indicators at >95% accuracy and a Black-Scholes options engine with full Greeks.",
      "Integrated 4 broker APIs (5Paisa, Kotak, Upstox, DHAN) over REST and WebSocket with OAuth2/JWT auth.",
      "Stood up a Loki–Prometheus–Grafana observability stack for live monitoring.",
    ],
  },
  {
    title: "Backend Engineer Intern",
    company: "Ventory",
    location: "Pune",
    date: "Jun — Aug 2024",
    description: "Backend features and API surface in Python.",
    highlights: ["Developed backend features and extended API functionality in Python."],
  },
  {
    title: "B.E. Artificial Intelligence",
    company: "Pune University",
    location: "Pune",
    date: "2021 — 2025",
    description: "CGPA 8.9 / 10",
    highlights: ["Bachelor of Engineering in Artificial Intelligence. CGPA 8.9 / 10."],
  },
];

export const Timeline = () => {
  // The current role starts open so the most relevant detail is visible
  // without a click; the rest expand on demand.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="card p-5 md:p-6 h-full flex flex-col"
    >
      <h2 className="eyebrow mb-5 font-display">Experience</h2>

      <div className="relative flex-1">
        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-card-border" aria-hidden />

        <ol className="space-y-1 pl-7 relative list-none p-0">
          {timelineData.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `role-panel-${index}`;

            return (
              <li key={`${item.company}-${item.date}`} className="relative group pb-4">
                <div
                  className={`absolute -left-7 top-[10px] w-[9px] h-[9px] rounded-full border-2 transition-colors duration-200 ${
                    item.isActive
                      ? "border-accent-green bg-accent-green shadow-[0_0_8px_rgba(34,197,94,0.45)]"
                      : "border-card-border bg-background group-hover:border-accent"
                  }`}
                  aria-hidden
                />

                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full text-left rounded-lg -mx-2 px-2 py-1.5 hover:bg-foreground/[0.03] transition-colors"
                >
                  <div className="text-xs text-muted font-mono tracking-wide">{item.date}</div>

                  <div className="flex items-start justify-between gap-3 mt-1">
                    <h3 className="text-[15px] font-semibold text-foreground leading-snug font-display group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-muted shrink-0 mt-0.5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </div>

                  <div className="text-[13px] text-muted mt-1">
                    <span className="text-foreground/80 font-medium">{item.company}</span>
                    {item.location ? ` · ${item.location}` : ""}
                  </div>

                  {!isOpen && (
                    <p className="text-[13px] text-muted mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {item.isActive && (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-accent-green font-medium tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-green motion-safe:animate-pulse" />
                      Current
                    </span>
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-2 space-y-2 list-none p-0">
                        {item.highlights.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2.5 text-[13px] text-muted leading-relaxed"
                          >
                            <span
                              className="mt-[7px] w-1 h-1 rounded-full bg-accent shrink-0"
                              aria-hidden
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </motion.div>
  );
};

export default Timeline;
