# Portfolio Upgrade Plan — ranjan2829.vercel.app

Audit of the live site against the GigaBrain + Allocations codebase evidence.
The site is **well-engineered**; the **content is a version behind** and carries claims
the code doesn't support. Fix in priority order.

---

## P0 — Factual problems, fix today

These are not style issues. They are things a hiring manager can catch.

### 1. Brain Labs highlights contain unverifiable claims

`components/Timeline.tsx` currently says:

| Claim on site | What the code shows |
|---|---|
| "macro-event pipelines using ... **Kafka**" | **No Kafka anywhere** in the monorepo. It's Redis Streams + Postgres. |
| "public API framework ... on PostgreSQL and **Cassandra**" | **No Cassandra.** That module also lives in a repo with no commits under your identity. |
| "Hyperliquid trading agent on Turbopuffer vector DB, **Go backend**" | **No Go files** in the repo. Turbopuffer lib was authored by another engineer. |
| "async policy engine running **10+ AI agents** concurrently" | `intelligence/policies/policy_router.py` — 88 commits, none yours. You *consume* it. |

**Action:** replace with the verified bullets in §2 below. An interviewer who asks
"tell me about the Kafka pipeline" and gets a blank look ends the interview mentally.

### 2. Date inconsistency between site and resume

- Site: OneLab Ventures **"Jun — Aug 2025"**
- Resume: OneLab Ventures **Jun – Aug 2024**
- Site: Allocations **"Mar 2026"** → should be **Feb 2026**
- Site: Brain Labs **"Sep 2025"** → resume says Aug 2025

Recruiters cross-check LinkedIn ↔ portfolio ↔ resume. Pick one truth, apply everywhere.

### 3. Allocations is your best work and gets two vague lines

> "Building production AI systems and automation across the investment platform."
> "Working onsite with the platform and infrastructure teams."

This says nothing. It's your current role at a $3B-AUM FINRA-regulated firm.

---

## P1 — Replace the timeline content

Paste into `components/Timeline.tsx`.

```ts
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
```

---

## P2 — Reposition the Hero

`components/Hero.tsx` currently rotates `["AI Engineer", "Software Development Engineer",
"Quantitative Engineer"]` and describes "LLMs, distributed systems, and cloud-native
architecture on AWS." Nothing about **agents, MCP, or Web3** — your three differentiators.

```ts
const ROLES = [
  "AI Infrastructure Engineer",
  "Full-Stack Engineer",
  "Web3 & Agent Systems",
];
```

```tsx
Building the infrastructure that lets AI agents act autonomously — tool protocols,
execution safety, and the systems underneath. Model Context Protocol, LLM agent
architecture, and on-chain execution across fintech and crypto.
```

---

## P3 — Add GigaBrain to Projects

The four project cards are all personal work. Your two strongest systems are invisible.
Add to `components/Projects.tsx`:

```ts
{
  title: "GigaBrain — Autonomous Trading Agents",
  description:
    "Multi-agent crypto trading system where LLM agents hold wallet keys and execute live perpetuals trades across Hyperliquid, Lighter (zkSync L2) and Polymarket. Built the 30-tool execution interface, the wallet layer, and the safety guardrails gating every order.",
  tech: ["Python", "agno", "AWS ECS", "EIP-712", "Privy", "x402"],
  repo: "https://github.com/ranjan2829",   // link a write-up if the repo is private
  image: "/projects/gigabrain.png",
},
```

**If the repo is private,** link a write-up page instead of a dead repo link — see P5.

---

## P4 — Add a Skills section (missing entirely)

There is no skills component. Recruiters and keyword filters both look for one, and your
stack is your strongest signal. Create `components/Skills.tsx` with these groups:

| Group | Contents |
|---|---|
| **AI Infrastructure** | Model Context Protocol (server + client), LLM orchestration & tool calling, multi-agent architectures, agent execution-safety design, anti-hallucination guardrails, streaming SSE inference, token-budget management, RAG, vector search (Turbopuffer, pgvector) |
| **Web3** | Smart-contract wallets, Privy, EIP-712, SIWE, BIP-32/39, HPKE, ERC-721 gating, viem, ethers.js, x402 USDC micropayments, Hyperliquid, Lighter (zkSync), Polymarket |
| **Languages** | Python, TypeScript, Go, C++, Rust, SQL |
| **Backend** | NestJS, FastAPI, Node.js, GraphQL, REST, SSE, WebSockets, microservices |
| **Frontend** | React, Next.js, TanStack Query & Table, Radix UI, Tailwind, Framer Motion |
| **Data** | PostgreSQL, Supabase (RLS), Redis (Streams, Pub/Sub), TypeORM, SQLAlchemy, pgvector |
| **Cloud** | AWS (ECS Fargate, S3, EFS, IAM, Lambda), GCP Cloud Run, Docker, Kubernetes, Vercel |
| **Security** | OAuth 2.0 provider implementation, TOTP 2FA, ES256 JWT, row-level security, HMAC signing |

---

## P5 — The highest-leverage addition: write two case studies

This is what separates a portfolio from a résumé with CSS. Add `/writing` with two posts:

### (a) "Shipping x402: pay-per-request APIs for AI agents"
Almost nobody has production x402 experience. Cover the HTTP-402 flow, the
machine-readable schema that lets agents self-discover pricing, the facilitator, and why
account-free payment matters for agent commerce.

### (b) "Guardrails for AI agents that move real money"
Draw from both jobs: mandatory TP/SL, reduce-only exits, clarify-before-trade,
no-silent-retry, data-grounding contracts, `failed_indicators` (absence ≠ neutrality),
human-in-the-loop approval. This is a genuinely under-written topic and you have real scars.

**Why this matters more than any styling change:** at ~1 YOE with private repos, writing is
the only way to *prove* depth rather than assert it. One good post on x402 or agent safety
will out-perform every other item on this list for inbound interest.

---

## P6 — Smaller wins

- **Resume download button** in the Hero → link the PDF. Currently no way to get it.
- **Open to opportunities** badge is good — add what you're open to (roles, locations).
- **`/api/github` and `/api/leetcode`** already exist — surface contribution volume; 666
  commits at Allocations + 274 at GigaBrain is a real signal.
- **OG image** (`app/opengraph-image.tsx`) — make sure it reflects the new positioning,
  since it's what renders when someone shares your link.
- **Case-study depth on project cards** — a "Read more" per project beats a 2-line blurb.

---

## Priority summary

1. **P0** — remove Kafka / Cassandra / Go / policy-engine claims; fix the dates. *(30 min)*
2. **P1** — paste the new timeline data. *(20 min)*
3. **P2** — Hero roles + description. *(10 min)*
4. **P3** — GigaBrain project card. *(15 min)*
5. **P4** — Skills component. *(45 min)*
6. **P5** — two case studies. *(a weekend — and worth more than 1–4 combined)*
