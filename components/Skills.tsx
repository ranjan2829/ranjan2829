"use client";

import React from "react";
import { motion } from "framer-motion";

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

export const Skills = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {skillGroups.map((group, i) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className={`card p-4 ${group.lead ? "sm:col-span-2" : ""}`}
        >
          <h3 className="text-[11px] uppercase font-semibold tracking-[0.12em] mb-3 font-display flex items-center gap-2">
            <span className={group.lead ? "text-accent" : "text-muted"}>
              {group.category}
            </span>
          </h3>

          <ul className="flex flex-wrap gap-1.5 list-none p-0">
            {group.items.map((item) => (
              <li
                key={item}
                className="text-xs px-2 py-1 rounded-md bg-foreground/[0.04] border border-card-border text-muted font-mono"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default Skills;
