"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { site } from "@/lib/site";
import { roles, education, summary } from "@/lib/resume";

const skillLines = [
  {
    label: "AI Infrastructure",
    value:
      "Model Context Protocol, LLM orchestration, tool calling, multi-agent architecture, agent execution safety, RAG, vector search",
  },
  {
    label: "Web3",
    value:
      "Smart-contract wallets, Privy, EIP-712, SIWE, BIP-32/39, HPKE, viem, x402 micropayments, Hyperliquid, Lighter, Polymarket",
  },
  { label: "Languages", value: "Python, TypeScript, Go, C++, Rust, SQL" },
  {
    label: "Backend",
    value: "NestJS, FastAPI, Node.js, GraphQL, REST, SSE, WebSockets, microservices",
  },
  { label: "Frontend", value: "React, Next.js, TanStack Query, Radix UI, Tailwind" },
  { label: "Data", value: "PostgreSQL, Supabase, Redis, TypeORM, SQLAlchemy, pgvector" },
  { label: "Cloud", value: "AWS (ECS Fargate, S3, IAM, Lambda), GCP, Docker, Kubernetes" },
  { label: "Security", value: "OAuth 2.0 provider, TOTP 2FA, ES256 JWT, RLS, HMAC signing" },
];

const Rule = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[11px] uppercase font-semibold tracking-[0.14em] text-accent pb-1.5 mb-4 border-b border-card-border">
    {children}
  </h3>
);

/**
 * Replaces the Google Docs iframe, which rendered as a white block with
 * Google's own styling and ignored the site theme. This is real markup:
 * themed, responsive, and printable to PDF via the browser.
 */
export const Resume = () => {
  return (
    <div className="card p-6 md:p-10" id="resume-sheet">
      {/* Header */}
      <header className="pb-6 mb-7 border-b border-card-border">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-foreground">
              {site.name}
            </h2>
            <p className="text-sm text-accent font-medium mt-1">
              AI Infrastructure &amp; Full-Stack Engineer
            </p>
          </div>

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-card-border hover:border-card-hover text-muted hover:text-foreground transition-colors print:hidden"
          >
            <ExternalLink className="w-3.5 h-3.5" aria-hidden />
            Google Doc
          </a>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-xs text-muted">
          <span>{site.locations.join(" · ")}</span>
          <a href={`mailto:${site.email}`} className="hover:text-foreground transition-colors">
            {site.email}
          </a>
          <a href={`tel:${site.phone}`} className="hover:text-foreground transition-colors">
            {site.phoneDisplay}
          </a>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            github.com/ranjan2829
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            linkedin.com/in/ranjan2829
          </a>
        </div>
      </header>

      <p className="text-[13.5px] leading-relaxed text-muted mb-8">{summary}</p>

      {/* Experience */}
      <section className="mb-8">
        <Rule>Experience</Rule>

        <div className="space-y-6">
          {roles.map((role) => (
            <article key={`${role.company}-${role.date}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="text-[15px] font-semibold text-foreground font-display">
                  {role.title}
                </h4>
                <span className="text-[11px] font-mono text-muted tracking-wide">
                  {role.date}
                </span>
              </div>

              <p className="text-[13px] text-muted mt-0.5 mb-2.5">
                <span className="text-foreground/80 font-medium">{role.company}</span>
                {" · "}
                {role.location}
              </p>

              <ul className="space-y-1.5 list-none p-0">
                {role.highlights.map((point) => (
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
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <Rule>Skills</Rule>
        <dl className="space-y-2">
          {skillLines.map((line) => (
            <div key={line.label} className="flex flex-col sm:flex-row gap-1 sm:gap-4">
              <dt className="text-[12px] font-semibold text-foreground/80 sm:w-36 shrink-0">
                {line.label}
              </dt>
              <dd className="text-[12.5px] text-muted leading-relaxed">{line.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Education */}
      <section>
        <Rule>Education</Rule>
        <div className="space-y-3">
          {education.map((item) => (
            <div
              key={item.title}
              className="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <div>
                <h4 className="text-[14px] font-semibold text-foreground font-display">
                  {item.title}
                </h4>
                <p className="text-[12.5px] text-muted mt-0.5">
                  {item.company} · {item.location} — {item.detail}
                </p>
              </div>
              <span className="text-[11px] font-mono text-muted tracking-wide">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resume;
