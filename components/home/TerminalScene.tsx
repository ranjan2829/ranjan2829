"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ASCII_BLACK_HOLE } from "./asciiBlackHole";
import { Section, SectionHeader } from "./Section";

type Line = { text: string; href?: string };
type Command = { label: string; out: Line[] };

// Every answer is lifted from lib/resume.ts, lib/projects.ts or lib/site.ts.
const commands: Command[] = [
  {
    label: "whoami",
    out: [
      { text: "ranjan — lead ai infrastructure & full-stack engineer" },
      { text: "dubai, uae · pune, india · open to ai infrastructure roles" },
    ],
  },
  {
    label: "cat allocations.txt",
    out: [
      { text: "role     lead ai infrastructure & full-stack engineer · feb 2026 — now" },
      { text: "firm     finra-regulated · $5B in client assets" },
      { text: "ai       streaming sse chat · glm-4.7 · model context protocol" },
      { text: "mcp      3 servers · 40+ tools · oauth 2.0 + totp 2fa · es256 jwt" },
      { text: "agents   10 behind one gateway · classifier-routed" },
      { text: "safety   live fetch over cache · no system-prompt disclosure" },
      { text: "also     allocationsx (24 modules) · legal docs (sha-256 audit) · 8 repos hardened" },
    ],
  },
  {
    label: "cat gigabrain.txt",
    out: [
      { text: "role     sde i · baven (gigabrain) · feb 2025 — jan 2026" },
      { text: "agents   live on-chain: hyperliquid · lighter (zksync) · polymarket" },
      { text: "tools    30-tool llm interface · guardrails on every order" },
      { text: "wallets  smart-contract wallets on base · privy · eip-712 · hpke" },
      { text: "x402     pay-per-request usdc micropayments for agents" },
      { text: "infra    20+ python services on aws ecs fargate" },
    ],
  },
  {
    label: "ls projects",
    // Plain-ASCII columns: glyphs like ★ and → fall back to a wider font and break alignment.
    out: (
      [
        ["gigabrain/", "autonomous trading agents", "gigabrain.gg", "https://gigabrain.gg"],
        [
          "hft-exchange-engine/",
          "c++ · lock-free · 136 stars",
          "github",
          "https://github.com/ranjan2829/High-Frequency-Trading-Exchange-Engine",
        ],
        [
          "ai-calling-agent/",
          "320+ interviews · 70 concurrent",
          "github",
          "https://github.com/ranjan2829/AI-Calling-Agent",
        ],
        ["hyperliquid-rag-agent/", "turbopuffer · sentiment", "live demo", "https://hyper-liquid-agent.vercel.app/"],
        ["perception-ai/", "handwriting -> latex · gemini", "live demo", "https://ai-illustration-sigma.vercel.app/"],
      ] as const
    ).map(([name, what, where, href]) => ({ text: `${name.padEnd(23)}${what.padEnd(33)}-> ${where}`, href })),
  },
  {
    label: "cat stack.txt",
    out: [
      { text: "ai       mcp · llm orchestration · tool calling · multi-agent · rag" },
      { text: "web3     eip-712 · siwe · privy · viem · x402 · hyperliquid" },
      { text: "backend  nestjs · fastapi · node.js · graphql · sse · websockets" },
      { text: "data     postgresql · supabase (rls) · redis streams · pgvector" },
      { text: "cloud    aws ecs fargate · s3 · lambda · gcp · docker · kubernetes" },
      { text: "lang     python · typescript · go · c++ · rust · sql" },
    ],
  },
  {
    label: "cat contact.txt",
    out: [
      { text: `email     ${site.email}`, href: `mailto:${site.email}` },
      { text: "linkedin  linkedin.com/in/ranjan2829", href: site.socials.linkedin },
      { text: "github    github.com/ranjan2829", href: site.socials.github },
      { text: "where     dubai, uae · pune, india · remote" },
    ],
  },
];

// A command types one character per tick, pauses, then prints a line every two ticks.
const PAUSE = 6;
const ticksFor = (c: Command) => c.label.length + PAUSE + c.out.length * 2;

const Prompt = () => (
  <>
    <span className="text-[#30d158]">ranjan@allocations</span> <span className="text-white/40">~ %</span>
  </>
);

const Caret = () => (
  <span
    aria-hidden
    className="ml-0.5 inline-block h-[1.05em] w-[0.6em] translate-y-[0.18em] bg-white/80 motion-safe:animate-pulse"
  />
);

/** Scene 4: a terminal you can drive — every command answers with the real thing. */
export function TerminalScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const [run, setRun] = useState(0);
  const [tick, setTick] = useState(0);

  const command = commands[current];
  const total = ticksFor(command);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = setInterval(() => {
      setTick((t) => {
        if (t >= total) {
          clearInterval(id);
          return t;
        }
        return t + 1;
      });
    }, 38);
    return () => clearInterval(id);
  }, [inView, reduceMotion, run, total]);

  const runCommand = (index: number) => {
    setCurrent(index);
    setTick(0);
    setRun((r) => r + 1);
  };

  const shown = reduceMotion ? total : tick;
  const typed = command.label.slice(0, shown);
  const typing = shown < command.label.length;
  const printed = Math.min(
    command.out.length,
    Math.max(0, Math.floor((shown - command.label.length - PAUSE) / 2) + 1)
  );
  const done = shown >= total;

  return (
    <Section id="terminal" labelledBy="terminal-title" wide>
      <SectionHeader
        index="04"
        eyebrow="Under the hood"
        id="terminal-title"
        title="Built in the terminal. Trusted with real money."
        sub="Click a command — every answer is real."
      />

      <BlurFade inView>
        <div
          ref={ref}
          className="overflow-hidden rounded-2xl border border-card-border bg-[#0a0a0b] text-white shadow-[0_40px_120px_-50px_rgba(41,151,255,0.35)]"
        >
          {/* Title bar */}
          <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4">
            <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
            <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
            <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
            <span className="mx-auto pr-12 font-mono text-[12px] text-white/45">ranjan@allocations — zsh</span>
          </div>

          {/* Commands */}
          <div
            role="toolbar"
            aria-label="Terminal commands"
            className="flex flex-wrap gap-2 border-b border-white/10 px-4 py-3"
          >
            {commands.map((c, i) => (
              <button
                key={c.label}
                type="button"
                onClick={() => runCommand(i)}
                aria-pressed={i === current}
                className={cn(
                  "rounded-md border px-3 py-1.5 font-mono text-[12px] transition-colors",
                  i === current
                    ? "border-[#30d158]/40 bg-[#30d158]/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            {/* Output */}
            <div className="h-[340px] overflow-auto px-4 py-4 font-mono text-[12px] leading-[1.7] sm:h-[400px] sm:px-5 sm:py-5 sm:text-[13px] sm:leading-[1.75]">
              <div className="sr-only" aria-live="polite">
                {`${command.label}\n${command.out.map((l) => l.text).join("\n")}`}
              </div>
              {/* Columns line up on wide screens; on phones long lines wrap instead of scrolling sideways. */}
              <div aria-hidden className="whitespace-pre-wrap break-words sm:whitespace-pre">
                <p className="m-0">
                  <Prompt /> <span className="text-white">{typed}</span>
                  {typing && <Caret />}
                </p>
                {command.out.slice(0, printed).map((line) =>
                  line.href ? (
                    <a
                      key={line.text}
                      href={line.href}
                      tabIndex={-1}
                      {...(line.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block text-white/75 underline-offset-4 hover:text-[#64d2ff] hover:underline"
                    >
                      {line.text}
                    </a>
                  ) : (
                    <p key={line.text} className="m-0 text-white/75">
                      {line.text}
                    </p>
                  )
                )}
                {done && (
                  <p className="m-0 mt-2">
                    <Prompt /> <Caret />
                  </p>
                )}
              </div>
            </div>

            {/* The site's black hole, in ASCII */}
            <div className="@container relative overflow-hidden border-t border-white/10 px-4 py-5 lg:border-l lg:border-t-0">
              <pre
                aria-hidden
                className="m-0 bg-gradient-to-br from-white via-white/80 to-[#64d2ff] bg-clip-text text-[1.32cqw] leading-none text-transparent"
              >
                {ASCII_BLACK_HOLE}
              </pre>
              <p className="mt-3 font-mono text-[11px] text-white/35">
                the black hole above the fold, in {"{.:-=+*#%@}"}
              </p>
            </div>
          </div>
        </div>
      </BlurFade>
    </Section>
  );
}
