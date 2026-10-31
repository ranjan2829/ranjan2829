"use client";

import React, { useRef } from "react";
import { useInView } from "motion/react";
import { ArrowDown, Code2, FileText, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { HyperText } from "@/components/magicui/hyper-text";
import { LightRays } from "@/components/magicui/light-rays";
import { Particles } from "@/components/magicui/particles";
import { useTheme } from "@/components/ThemeProvider";
import { site } from "@/lib/site";

const socials = [
  { icon: Github, href: site.socials.github, label: "GitHub" },
  { icon: Linkedin, href: site.socials.linkedin, label: "LinkedIn" },
  { icon: Code2, href: site.socials.leetcode, label: "LeetCode" },
  { icon: Mail, href: `mailto:${site.email}`, label: "Email" },
];

/** Scene 1. Transparent so the fixed WebGPU black hole shows through. */
export function Hero() {
  const { theme, mounted } = useTheme();
  const dark = !mounted || theme === "dark";
  const heroRef = useRef<HTMLElement>(null);
  const heroNear = useInView(heroRef, { margin: "100px" });

  return (
    <section
      ref={heroRef}
      id="home"
      aria-labelledby="hero-name"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-5 pb-28 pt-28 sm:px-8 lg:px-12"
    >
      {heroNear && (
        <>
          <Particles
            className="pointer-events-none absolute inset-0"
            quantity={90}
            staticity={40}
            size={0.5}
            color={dark ? "#ffffff" : "#1d1d1f"}
          />
          <LightRays count={6} color={dark ? "rgba(41,151,255,0.18)" : "rgba(0,102,204,0.10)"} speed={16} />
        </>
      )}

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="flex max-w-3xl flex-col">
          <BlurFade delay={0.05}>
            <span className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-card-border bg-card/60 px-3.5 py-1.5 text-[13px] backdrop-blur-xl">
              <span aria-hidden className="size-1.5 rounded-full bg-accent-green motion-safe:animate-pulse" />
              <AnimatedShinyText className="mx-0 max-w-none text-foreground/75 dark:text-foreground/75">
                Open to AI infrastructure roles · Dubai, Remote
              </AnimatedShinyText>
            </span>
          </BlurFade>

          <h1 id="hero-name" className="sr-only">
            {site.name} — Lead AI Infrastructure &amp; Full-Stack Engineer
          </h1>
          <HyperText
            as="div"
            aria-hidden
            duration={1000}
            className="name-fill py-0 text-[clamp(4.5rem,15vw,12.5rem)] font-bold leading-[0.82] tracking-[-0.06em] [&_span]:font-display"
          >
            Ranjan
          </HyperText>

          {/* What I am, and the stakes — the two things a reader decides on first. */}
          <BlurFade delay={0.15}>
            <p className="mt-8 text-balance text-[clamp(1.4rem,2.6vw,2.1rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
              Lead AI Infrastructure &amp; <span className="whitespace-nowrap">Full-Stack Engineer</span>
            </p>
            <p className="mt-2 max-w-2xl text-pretty text-[clamp(1.1rem,1.9vw,1.45rem)] leading-snug tracking-[-0.015em] text-muted">
              Building the AI layer of a FINRA-regulated firm that manages{" "}
              <span className="whitespace-nowrap font-medium text-foreground">$5B in assets</span> for its
              clients.
            </p>
          </BlurFade>

          <BlurFade delay={0.22}>
            <p className="mt-6 font-mono text-[13px] text-muted">
              <span aria-hidden className="text-accent-green">❯ </span>
              ai infrastructure · full-stack · web3 &amp; agent systems
              <span aria-hidden className="ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-foreground/70 motion-safe:animate-pulse" />
            </p>
          </BlurFade>

          <BlurFade delay={0.29}>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
              Building the infrastructure that lets AI agents act autonomously — tool protocols,
              execution safety, and the systems underneath. Model Context Protocol, LLM agent
              architecture, and on-chain execution across fintech and crypto.
            </p>
          </BlurFade>

          <BlurFade delay={0.36}>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
              {site.locations.map((location) => (
                <li key={location} className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0" aria-hidden />
                  {location}
                </li>
              ))}
              <li className="flex items-center gap-1.5">
                <Mail className="size-3.5 shrink-0" aria-hidden />
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-foreground">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="size-3.5 shrink-0" aria-hidden />
                <a href={`tel:${site.phone}`} className="tabular-nums transition-colors hover:text-foreground">
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </BlurFade>

          <BlurFade delay={0.43}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#resume"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-medium text-background transition-opacity hover:opacity-90"
              >
                <FileText className="size-4" aria-hidden />
                View resume
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-card-border bg-card/60 px-6 text-[15px] font-medium backdrop-blur-xl transition-colors hover:border-card-hover"
              >
                <Mail className="size-4" aria-hidden />
                Email me
              </a>
              <span className="mx-1 hidden h-6 w-px bg-card-border sm:block" aria-hidden />
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-card-border bg-card/60 text-muted backdrop-blur-xl transition-colors hover:border-card-hover hover:text-foreground"
                >
                  <Icon className="size-[18px]" aria-hidden />
                </a>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>

      <a
        href="#experience"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-foreground [@media(min-width:768px)_and_(min-height:960px)]:flex"
      >
        Scroll
        <ArrowDown className="size-4 motion-safe:animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
