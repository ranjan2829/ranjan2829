"use client";

import React, { useRef, useState, useSyncExternalStore } from "react";
import { useInView } from "motion/react";
import type { COBEOptions } from "cobe";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Globe } from "@/components/magicui/globe";
import { NoiseTexture } from "@/components/magicui/noise-texture";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import FolderFloat from "@/components/reactbits/FolderFloat";
import MetallicPaint from "@/components/reactbits/MetallicPaint";
import { useTheme } from "@/components/ThemeProvider";
import { site } from "@/lib/site";

const DUBAI: [number, number] = [25.2048, 55.2708];
const PUNE: [number, number] = [18.5204, 73.8567];

// Module-level so the object is stable: Globe re-creates itself whenever `config` changes.
// A lit, dotted sphere in both themes so it reads against black and against light gray;
// only the halo changes with the theme.
const globeConfig = (dark: boolean): COBEOptions => ({
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.32,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 20000,
  mapBrightness: 7,
  baseColor: [0.32, 0.33, 0.38],
  markerColor: [41 / 255, 151 / 255, 255 / 255],
  glowColor: dark ? [0.12, 0.3, 0.6] : [0.78, 0.86, 1],
  markers: [
    { location: DUBAI, size: 0.1 },
    { location: PUNE, size: 0.08 },
  ],
});
const GLOBE_DARK = globeConfig(true);
const GLOBE_LIGHT = globeConfig(false);

// Every other place to reach Ranjan, as pills that float out of a folder.
const elsewhere = [
  { label: "GitHub", value: site.socials.github },
  { label: "LinkedIn", value: site.socials.linkedin },
  { label: "LeetCode", value: site.socials.leetcode },
  { label: "X", value: site.socials.twitter },
  { label: "Résumé", value: site.resume },
  { label: site.phoneDisplay, value: `tel:${site.phone}` },
];

const openLink = (href: string) => {
  if (href.startsWith("http")) window.open(href, "_blank", "noopener,noreferrer");
  else window.location.href = href;
};

// Hover opens the folder where there is a mouse; touch screens tap it instead.
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const subscribeHover = (onChange: () => void) => {
  const query = window.matchMedia(HOVER_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** Closing call to action beside a Globe marking Dubai and Pune. */
export function Contact() {
  const { theme, mounted } = useTheme();
  const dark = !mounted || theme === "dark";
  const [copied, setCopied] = useState(false);
  const globeRef = useRef<HTMLDivElement>(null);
  // WebGL runs only while the globe is near the viewport.
  const globeNear = useInView(globeRef, { margin: "200px" });
  const canHover = useSyncExternalStore(subscribeHover, () => window.matchMedia(HOVER_QUERY).matches, () => true);
  const markRef = useRef<HTMLDivElement>(null);
  // Mounted on sight so the metal pours in while someone is looking.
  const markInView = useInView(markRef, { once: true, amount: 0.4 });

  // Many readers would rather paste the address into their own client than open a mail app.
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-t border-card-border bg-background px-5 pb-36 pt-28 sm:px-8 lg:px-12"
    >
      <NoiseTexture className="-z-10 opacity-[0.35] dark:opacity-50" frequency={0.9} slope={0.12} />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs tabular-nums text-accent">11</span>
          <h2
            id="contact-title"
            className="text-balance text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.045em]"
          >
            Building agents that need to be trusted with real money?
          </h2>
          <p className="max-w-md text-[15px] leading-relaxed text-muted">
            I build that layer today for a firm managing $5B in client assets. Open to AI
            infrastructure roles in Dubai or remote — email is the fastest way to reach me.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ShimmerButton
              type="button"
              onClick={() => {
                window.location.href = `mailto:${site.email}`;
              }}
              shimmerColor="#2997FF"
              shimmerDuration="4s"
              background={dark ? "rgba(17,17,19,1)" : "rgba(12,12,13,1)"}
              borderRadius="10px"
              className="h-12 px-6 text-sm font-medium"
            >
              {site.email}
            </ShimmerButton>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className="inline-flex h-12 items-center gap-1.5 rounded-[10px] border border-card-border bg-card px-4 text-sm font-medium transition-colors hover:border-card-hover"
            >
              {copied ? (
                <Check className="size-4 text-accent-green" aria-hidden />
              ) : (
                <Copy className="size-4" aria-hidden />
              )}
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </button>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-1.5 rounded-[10px] border border-card-border bg-card px-5 text-sm font-medium transition-colors hover:border-card-hover"
            >
              LinkedIn <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[540px]">
          <div
            aria-hidden
            className="absolute inset-[8%] rounded-full [background:radial-gradient(circle,var(--glow)_0%,transparent_70%)] blur-2xl"
          />
          <div ref={globeRef} className="relative aspect-square w-full" aria-hidden>
            {/* Mount once the theme is known, so the globe isn't built twice on load. */}
            {mounted && globeNear && (
              <Globe key={dark ? "dark" : "light"} config={dark ? GLOBE_DARK : GLOBE_LIGHT} className="max-w-none" />
            )}
          </div>
          <ul className="relative -mt-6 flex flex-wrap justify-center gap-2 font-mono text-[12px]">
            <li className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card/80 px-3.5 py-1.5 backdrop-blur">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              Dubai, UAE
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card/80 px-3.5 py-1.5 backdrop-blur">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              Pune, India
            </li>
          </ul>
          <div className="relative mt-20 flex justify-center">
            <FolderFloat
              items={elsewhere}
              label="Elsewhere"
              sublabel={`${elsewhere.length} links`}
              trigger={canHover ? "hover" : "click"}
              onSelect={openLink}
              folderColor="#1d5fd1"
              frontColor="#2f7cf6"
              paperColor="#f5f5f7"
              itemColor={dark ? "#f5f5f7" : "#1d1d1f"}
              itemTextColor={dark ? "#1d1d1f" : "#f5f5f7"}
              labelColor="#ffffff"
              spread={170}
              lift={22}
            />
          </div>
        </div>
      </div>

      {/* Signature: the name in liquid chrome, tilting with the cursor. */}
      <div
        ref={markRef}
        aria-hidden
        className="relative mx-auto mt-24 h-[clamp(120px,18vw,240px)] w-full max-w-6xl"
      >
        {mounted && markInView && (
          <MetallicPaint
            text={site.name}
            fontFamily="Geist, system-ui, sans-serif"
            fontWeight={700}
            lightMode={!dark}
            scale={0.95}
            density={2.2}
            edgeBend={0.7}
          />
        )}
      </div>
      <footer className="absolute inset-x-0 bottom-0 border-t border-card-border px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 font-mono text-xs text-muted">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Black hole rendered live with WebGPU</span>
        </div>
      </footer>
    </section>
  );
}
