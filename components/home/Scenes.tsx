"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/aceternity/3d-card";
import { MacbookScroll } from "@/components/aceternity/macbook-scroll";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { Safari } from "@/components/magicui/safari";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";
import { projects, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ASCII_BLACK_HOLE } from "./asciiBlackHole";
import { Chip, Section, SectionHeader } from "./Section";

const [gigabrain, hft, ...showcase] = projects;

function Tech({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Tech">
      {items.map((t) => (
        <li key={t}>
          <Chip>{t}</Chip>
        </li>
      ))}
    </ul>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-5 text-sm font-medium">
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          {project.repo ? "Live demo" : "Visit product"} <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-muted hover:text-foreground"
        >
          <Github className="size-3.5" aria-hidden /> Code
        </a>
      )}
    </div>
  );
}

const venue = "rounded-full border border-card-border bg-background px-2.5 py-1 text-xs whitespace-nowrap";

const prompt = (
  <>
    <span className="text-[#30d158]">ranjan@allocations</span> <span className="text-white/45">~ %</span>
  </>
);

type ScriptLine = { kind: "cmd" | "out"; text: string };

const script: ScriptLine[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "lead ai infrastructure & full-stack engineer" },
  { kind: "cmd", text: "cat now.txt" },
  { kind: "out", text: "firm    finra-regulated · $5B in client assets" },
  { kind: "out", text: "mcp     3 servers · 40+ tools · oauth 2.0" },
  { kind: "out", text: "agents  10 behind one gateway" },
];

// A command types one character per tick and then pauses; an output line lands in one tick.
const starts: number[] = [];
const SCRIPT_TICKS = script.reduce((tick, line) => {
  starts.push(tick);
  return tick + (line.kind === "cmd" ? line.text.length + 6 : 3);
}, 0);

const Caret = () => (
  <span className="inline-block h-[1em] w-[0.6em] translate-y-[0.15em] bg-white/80 motion-safe:animate-pulse" />
);

/** Types the session out once the screen is in view; reduced motion shows it finished. */
function useTyping(active: boolean) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setTick((t) => {
        if (t >= SCRIPT_TICKS) {
          clearInterval(id);
          return t;
        }
        return t + 1;
      });
    }, 55);
    return () => clearInterval(id);
  }, [active]);
  return tick;
}

/**
 * What the laptop shows: the site's black hole as ASCII art, with a whoami
 * session typing over it. Sized in container units so it fits any screen width.
 */
function LaptopScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const tick = useTyping(inView && !reduceMotion);
  const shown = reduceMotion ? SCRIPT_TICKS : tick;

  return (
    <div ref={ref} className="@container relative size-full overflow-hidden bg-black font-mono text-white">
      <div className="flex h-[4cqw] items-center gap-[0.8cqw] border-b border-white/10 px-[2cqw]">
        <span className="size-[1.2cqw] rounded-full bg-[#ff5f57]" />
        <span className="size-[1.2cqw] rounded-full bg-[#febc2e]" />
        <span className="size-[1.2cqw] rounded-full bg-[#28c840]" />
        <span className="mx-auto text-[1.4cqw] text-white/45">ranjan@allocations — zsh</span>
      </div>
      <pre
        aria-hidden
        className="absolute inset-x-[1.5cqw] bottom-[1cqw] m-0 bg-gradient-to-br from-white via-white/85 to-[#64d2ff] bg-clip-text text-[1.33cqw] leading-none text-transparent"
      >
        {ASCII_BLACK_HOLE}
      </pre>
      <div className="sr-only">
        {script.map((line) => (line.kind === "cmd" ? `$ ${line.text}` : line.text)).join("\n")}
      </div>
      <div
        aria-hidden
        className="absolute left-[2.5cqw] top-[6.5cqw] flex flex-col gap-[0.4cqw] rounded-[0.8cqw] bg-black/65 p-[1cqw] text-[max(1.5cqw,8px)] leading-[1.45]"
      >
        {script.map((line, i) => {
          if (shown < starts[i]) return null;
          if (line.kind === "out") {
            return (
              <p key={i} className="m-0 whitespace-pre text-white/75">
                {line.text}
              </p>
            );
          }
          const typed = line.text.slice(0, Math.max(0, shown - starts[i]));
          return (
            <p key={i} className={cn("m-0", i > 0 && "mt-[0.6cqw]")}>
              {prompt} {typed}
              {typed.length < line.text.length && <Caret />}
            </p>
          );
        })}
        {shown >= SCRIPT_TICKS && (
          <p className="m-0 mt-[0.6cqw]">
            {prompt} <Caret />
          </p>
        )}
      </div>
    </div>
  );
}

function LaptopTitle() {
  return (
    <span className="flex flex-col items-center gap-4 text-center font-sans">
      <span className="font-mono text-[12px] font-normal uppercase tracking-[0.18em] text-muted">
        <span className="text-accent">04</span> · Under the hood
      </span>
      <span className="bg-gradient-to-b from-foreground to-foreground/55 bg-clip-text text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-transparent">
        Built in the terminal.
        <br />
        Trusted with real money.
      </span>
    </span>
  );
}

/** Scene 3: a MacBook opens on scroll onto the black hole, in ASCII. */
export function LaptopScene() {
  return (
    <section id="terminal" aria-label="Under the hood" className="relative isolate bg-background">
      {/* Desktop: the MacBook opens as you scroll. Its screen slides down through
          this stage, so the stage clips it and fades it out before the next section. */}
      <div className="relative hidden overflow-hidden md:-mt-40 md:block">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-72 bg-gradient-to-t from-background via-background/80 to-transparent"
        />
        <div className="mx-auto max-w-7xl">
          <MacbookScroll screen={<LaptopScreen />} showGradient title={<LaptopTitle />} />
        </div>
      </div>

      {/* Phone: the animation needs a wide screen, so the screen alone. */}
      <div className="flex flex-col items-center gap-10 px-5 pb-24 pt-28 sm:px-8 md:hidden">
        <h2>
          <LaptopTitle />
        </h2>
        <div className="aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border border-card-border shadow-2xl">
          <LaptopScreen />
        </div>
      </div>
    </section>
  );
}

/** Scene 4: GigaBrain — the live product, and the venues its agents trade on. */
export function GigaBrainScene() {
  return (
    <Section id="gigabrain" labelledBy="gigabrain-title">
      <SectionHeader
        index="05"
        eyebrow={gigabrain.role}
        id="gigabrain-title"
        title="Trading agents that hold their own keys."
        sub="LLM agents with wallet authority, executing live perpetuals trades on‑chain."
      />
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <BlurFade inView>
          <Safari url="gigabrain.gg" imageSrc={gigabrain.image} className="w-full drop-shadow-2xl" />
        </BlurFade>
        <div className="relative mx-auto flex size-[300px] items-center justify-center" aria-hidden>
          <span className="z-10 flex size-16 items-center justify-center rounded-full bg-foreground text-[13px] font-semibold text-background">
            agent
          </span>
          <OrbitingCircles radius={128} duration={32} iconSize={88}>
            <span className={venue}>Hyperliquid</span>
            <span className={venue}>Polymarket</span>
            <span className={venue}>Lighter</span>
          </OrbitingCircles>
          <OrbitingCircles radius={68} duration={18} iconSize={48} reverse>
            <span className={cn(venue, "text-accent")}>Base</span>
            <span className={cn(venue, "text-accent")}>x402</span>
          </OrbitingCircles>
        </div>
      </div>
      <BlurFade inView delay={0.08}>
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <p className="text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-muted">
            <span className="font-medium text-foreground">{gigabrain.title}.</span> {gigabrain.description}
          </p>
          <div className="flex flex-col gap-5">
            <Tech items={gigabrain.tech} />
            <Links project={gigabrain} />
          </div>
        </div>
      </BlurFade>
    </Section>
  );
}

const Node = forwardRef<HTMLDivElement, { className?: string; children: React.ReactNode }>(
  ({ className, children }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center rounded-xl border border-card-border bg-background px-3 py-2 text-[13px] shadow-[0_0_24px_-12px_var(--accent)]",
        className
      )}
    >
      {children}
    </div>
  )
);
Node.displayName = "Node";

const platform = [
  { k: "AllocationsX", v: "FINRA-regulated pre-IPO secondaries trading — NestJS + Supabase API, Next.js admin, 24 domain modules" },
  { k: "Legal docs", v: "Six agreement types from deal data — Puppeteer PDF, DocuSeal e-signature, SHA-256 audit trails" },
  { k: "Security", v: "Hardening across 8 repositories; fixed a multi-gigabyte memory leak from unbounded session state" },
];

/** Scene 2: Allocations — the MCP data flow, then the rest of the platform. */
export function AllocationsScene() {
  const container = useRef<HTMLDivElement>(null);
  const llm = useRef<HTMLDivElement>(null);
  const mcp = useRef<HTMLDivElement>(null);
  const funds = useRef<HTMLDivElement>(null);
  const investors = useRef<HTMLDivElement>(null);
  const banking = useRef<HTMLDivElement>(null);
  const legal = useRef<HTMLDivElement>(null);
  const beam = {
    containerRef: container,
    pathColor: "#86868B",
    pathOpacity: 0.25,
    pathWidth: 2,
    gradientStartColor: "#2997FF",
    gradientStopColor: "#64D2FF",
  };

  return (
    <Section id="work" labelledBy="alloc-title">
      <SectionHeader
        index="03"
        eyebrow="Allocations · Feb 2026 — now · latest"
        id="alloc-title"
        title="AI for a firm trusted with $5B of its clients' money."
        sub="Streaming chat on Cerebras GLM-4.7 with Model Context Protocol tool calling over live fund, investor and banking data."
      />

      <BlurFade inView>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card px-6 py-10 sm:px-12 sm:py-14">
          <div
            aria-hidden
            className="absolute inset-0 [background:radial-gradient(60%_60%_at_50%_40%,var(--glow),transparent)]"
          />
          <div ref={container} className="relative mx-auto flex h-72 max-w-4xl items-center justify-between" aria-hidden>
            <Node ref={llm} className="h-24 w-28 flex-col gap-1">
              <span className="text-base font-semibold">LLM</span>
              <span className="font-mono text-[10px] text-muted">GLM-4.7</span>
            </Node>
            <Node ref={mcp} className="h-32 w-40 flex-col gap-1 border-accent/60 text-center">
              <span className="text-xl font-semibold">MCP</span>
              <span className="font-mono text-[10px] leading-tight text-accent">
                3 servers
                <br />
                40+ tools · OAuth 2.0
              </span>
            </Node>
            <div className="flex flex-col gap-3.5">
              <Node ref={funds} className="w-32">Funds</Node>
              <Node ref={investors} className="w-32">Investors</Node>
              <Node ref={banking} className="w-32">Banking</Node>
              <Node ref={legal} className="w-32">Legal docs</Node>
            </div>
            <AnimatedBeam {...beam} fromRef={llm} toRef={mcp} />
            <AnimatedBeam {...beam} fromRef={mcp} toRef={funds} curvature={34} />
            <AnimatedBeam {...beam} fromRef={mcp} toRef={investors} curvature={11} delay={0.4} />
            <AnimatedBeam {...beam} fromRef={mcp} toRef={banking} curvature={-11} delay={0.8} />
            <AnimatedBeam {...beam} fromRef={mcp} toRef={legal} curvature={-34} delay={1.2} />
          </div>
          <div className="relative mt-10 grid gap-6 border-t border-card-border pt-8 sm:grid-cols-3">
            {[
              { n: "10", l: "agents behind one gateway, classifier-routed" },
              { n: "40+", l: "tools over MCP with ES256 JWT auth" },
              { n: "8", l: "repositories security-hardened" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-4xl font-semibold tracking-[-0.03em] tabular-nums">{s.n}</p>
                <p className="mt-1 text-sm text-muted">{s.l}</p>
              </div>
            ))}
          </div>
          <BorderBeam size={180} duration={12} colorFrom="#2997FF" colorTo="#64D2FF" />
        </div>
      </BlurFade>

      <BlurFade inView delay={0.1}>
        <dl className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-card-border bg-card-border md:grid-cols-3">
          {platform.map((row) => (
            <div key={row.k} className="flex flex-col gap-2 bg-card p-7">
              <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">{row.k}</dt>
              <dd className="text-[15px] leading-relaxed text-muted">{row.v}</dd>
            </div>
          ))}
        </dl>
      </BlurFade>
    </Section>
  );
}

/** Scene 5: the other projects, each in a Safari window on a 3D tilt card. */
export function ProjectsScene() {
  return (
    <Section id="projects" labelledBy="projects-title" wide>
      <SectionHeader
        index="06"
        eyebrow="Projects"
        id="projects-title"
        title="Shipped, live, and open source."
        sub="Hover a card — it tilts in 3D."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {showcase.map((p, i) => (
          <BlurFade key={p.title} inView delay={i * 0.08}>
            <CardContainer containerClassName="py-0" className="w-full">
              <CardBody className="group/card relative flex h-auto w-full flex-col gap-5 rounded-3xl border border-card-border bg-card p-5">
                <CardItem translateZ={60} className="w-full">
                  <Safari
                    url={(p.demo ?? p.repo ?? "").replace(/^https?:\/\//, "")}
                    imageSrc={p.image}
                    className="w-full drop-shadow-2xl"
                  />
                </CardItem>
                <CardItem as="h3" translateZ={40} className="px-1 text-xl font-semibold tracking-[-0.02em]">
                  {p.title}
                </CardItem>
                <CardItem as="p" translateZ={30} className="px-1 text-sm leading-relaxed text-muted">
                  {p.description}
                </CardItem>
                <CardItem translateZ={20} className="flex w-full flex-col gap-4 px-1">
                  <Tech items={p.tech} />
                  <Links project={p} />
                </CardItem>
              </CardBody>
            </CardContainer>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}

const sdkFacts = [
  { k: "CoinGlass", v: "284 typed models · ~120 endpoints" },
  { k: "DeFiLlama", v: "12 domains" },
  { k: "TA engine", v: "6,300 lines · 25+ indicators · ~70% faster" },
  { k: "LLM routing", v: "OpenAI, Anthropic, Gemini, xAI, OpenRouter" },
];

/** Scene 6: two engineering deep-cuts on neon gradient cards. */
export function EngineeringScene() {
  return (
    <Section id="engineering" labelledBy="eng-title">
      <SectionHeader
        index="07"
        eyebrow="Engineering"
        id="eng-title"
        title="Low latency. High stakes."
        sub="Matching engines in C++, market-data SDKs from scratch."
      />
      <div className="grid gap-8 md:grid-cols-2">
        <BlurFade inView>
          <NeonGradientCard
            borderRadius={24}
            borderSize={2}
            neonColors={{ firstColor: "#2997FF", secondColor: "#BF5AF2" }}
            className="h-full"
          >
            <div className="flex h-full flex-col gap-5">
              <Terminal className="max-w-none border-card-border bg-background [&_code]:break-all [&_code]:whitespace-pre-wrap">
                <TypingAnimation>$ git clone ranjan2829/High-Frequency-Trading-Exchange-Engine</TypingAnimation>
                <TypingAnimation>$ cmake --build build</TypingAnimation>
                <AnimatedSpan className="text-accent-green">✔ lock-free queues</AnimatedSpan>
                <AnimatedSpan className="text-accent-green">✔ memory pooling</AnimatedSpan>
                <AnimatedSpan className="text-accent-green">✔ socket networking</AnimatedSpan>
                <TypingAnimation>$ ./exchange</TypingAnimation>
              </Terminal>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">{hft.title}</h3>
                <span className="font-mono text-[13px] tabular-nums text-muted">★ 136 · ⑂ 41</span>
              </div>
              <p className="text-[15px] leading-relaxed text-muted">{hft.description}</p>
              <Tech items={hft.tech} />
              <Links project={hft} />
            </div>
          </NeonGradientCard>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <NeonGradientCard
            borderRadius={24}
            borderSize={2}
            neonColors={{ firstColor: "#BF5AF2", secondColor: "#64D2FF" }}
            className="h-full"
          >
            <div className="flex h-full flex-col gap-5">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">GigaBrain · data layer</p>
              <h3 className="text-2xl font-semibold tracking-[-0.025em]">Market-data SDKs and an analysis engine, from scratch</h3>
              <dl className="divide-y divide-card-border border-y border-card-border">
                {sdkFacts.map((f) => (
                  <div key={f.k} className="flex flex-wrap justify-between gap-3 py-3.5">
                    <dt className="font-mono text-[13px]">{f.k}</dt>
                    <dd className="text-sm text-muted">{f.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-[15px] leading-relaxed text-muted">
                Async technical analysis with market-regime classification, pattern and divergence
                detection, and volatility-based risk sizing — feeding agents that trade live.
              </p>
            </div>
          </NeonGradientCard>
        </BlurFade>
      </div>
    </Section>
  );
}
