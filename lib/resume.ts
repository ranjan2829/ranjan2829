/**
 * Single source of truth for work history.
 *
 * Both the Experience timeline and the Resume section read from here, so the
 * two can never drift — the embedded Google Doc used to say "Brain Labs,
 * September – Present" while the timeline said Allocations.
 */

export interface Role {
  title: string;
  company: string;
  location: string;
  date: string;
  /** One-line summary shown collapsed. */
  description: string;
  /** Detail shown on expand and in the full resume. */
  highlights: string[];
  isActive?: boolean;
}

export const summary =
  "AI infrastructure and full-stack engineer building the systems that let AI agents act autonomously — tool protocols, execution safety, and the infrastructure underneath. Model Context Protocol, LLM agent architecture, and on-chain execution across regulated fintech and crypto.";

export const roles: Role[] = [
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
    description: "Autonomous crypto trading agents with live on-chain execution authority.",
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
];

export const education = [
  {
    title: "B.E. Artificial Intelligence",
    company: "Pune University",
    location: "Pune",
    date: "2021 — 2025",
    detail: "CGPA 8.9 / 10",
  },
  {
    title: "ICSE",
    company: "Podar International School",
    location: "Pune",
    date: "2019",
    detail: "GPA 8.1",
  },
];
