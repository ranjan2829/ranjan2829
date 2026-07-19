/**
 * Ordered by differentiation, not convention: AI infrastructure and Web3 lead
 * because they're the least common skills here. Languages sit lower — every
 * candidate lists those.
 */
export const skillGroups = [
  {
    category: "AI Infrastructure",
    lead: true,
    items: [
      "Model Context Protocol",
      "LLM orchestration",
      "Tool calling",
      "Multi-agent architecture",
      "Agent execution safety",
      "Anti-hallucination guardrails",
      "Streaming SSE inference",
      "Token-budget management",
      "RAG",
      "Vector search",
      "Turbopuffer",
      "pgvector",
    ],
  },
  {
    category: "Web3",
    lead: true,
    items: [
      "Smart-contract wallets",
      "Privy",
      "EIP-712",
      "SIWE",
      "BIP-32/39",
      "HPKE",
      "ERC-721 gating",
      "viem",
      "ethers.js",
      "x402 micropayments",
      "Hyperliquid",
      "Lighter (zkSync)",
      "Polymarket",
    ],
  },
  {
    category: "Backend",
    items: [
      "NestJS",
      "FastAPI",
      "Node.js",
      "GraphQL",
      "REST",
      "SSE",
      "WebSockets",
      "Microservices",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TanStack Query",
      "TanStack Table",
      "Radix UI",
      "Tailwind",
      "Framer Motion",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "TypeScript", "Go", "C++", "Rust", "SQL"],
  },
  {
    category: "Data",
    items: [
      "PostgreSQL",
      "Supabase (RLS)",
      "Redis Streams",
      "Redis Pub/Sub",
      "TypeORM",
      "SQLAlchemy",
      "pgvector",
    ],
  },
  {
    category: "Cloud",
    items: [
      "AWS ECS Fargate",
      "S3",
      "EFS",
      "IAM",
      "Lambda",
      "GCP Cloud Run",
      "Docker",
      "Kubernetes",
      "Vercel",
    ],
  },
  {
    category: "Security",
    items: [
      "OAuth 2.0 provider",
      "TOTP 2FA",
      "ES256 JWT",
      "Row-level security",
      "HMAC signing",
    ],
  },
];
