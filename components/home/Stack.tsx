"use client";

import React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GlareHover } from "@/components/magicui/glare-hover";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { useTheme } from "@/components/ThemeProvider";
import { skillGroups } from "@/lib/skills";
import { cn } from "@/lib/utils";
import { Chip, Section, SectionHeader } from "./Section";

// Simple Icons slugs for the 3D cloud: languages and the tools named in the resume.
const slugs = [
  "typescript", "python", "go", "rust", "cplusplus", "nextdotjs", "react", "nestjs",
  "fastapi", "nodedotjs", "graphql", "postgresql", "redis", "supabase", "docker",
  "kubernetes", "googlecloud", "vercel", "tailwindcss", "ethereum", "anthropic",
  "git", "github", "linux",
];

// A few skills sit in two groups (pgvector), so count and scroll each once.
const everything = [...new Set(skillGroups.flatMap((g) => g.items))];
const total = everything.length;

/** Icon Cloud of the stack beside every skill group from lib/skills. */
export function Stack() {
  const { theme, mounted } = useTheme();
  const dark = !mounted || theme === "dark";
  const color = dark ? "c9c9cf" : "2a2a2e";
  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${color}`);

  return (
    <Section id="stack" labelledBy="stack-title">
      <SectionHeader
        index="08"
        eyebrow="Stack"
        id="stack-title"
        title="Everything it takes to ship."
        aside={
          <span className="font-mono text-xs tabular-nums">
            {total} skills · {skillGroups.length} domains
          </span>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <BlurFade inView>
          <div className="relative flex h-full min-h-[420px] items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-card [&_canvas]:h-auto [&_canvas]:max-w-full">
            <div
              aria-hidden
              className="absolute inset-0 [background:radial-gradient(circle_at_50%_45%,var(--glow),transparent_65%)]"
            />
            <div aria-hidden className="relative">
              <IconCloud key={color} images={images} />
            </div>
            <span className="absolute bottom-4 left-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              drag to spin
            </span>
          </div>
        </BlurFade>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-card-border bg-card-border sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <BlurFade key={group.category} inView delay={Math.min(i, 6) * 0.04} className="bg-card">
              <GlareHover
                background="var(--card)"
                color={dark ? "#ffffff" : "#0066cc"}
                opacity={dark ? 0.14 : 0.1}
                angle={-35}
                size={300}
                duration={900}
                className="size-full cursor-default place-items-stretch"
              >
                <div className="flex h-full flex-col gap-3 p-5">
                  <h3 className="flex items-baseline justify-between gap-3">
                    <span
                      className={cn(
                        "font-mono text-[11px] uppercase tracking-[0.14em]",
                        group.lead ? "text-accent" : "text-muted"
                      )}
                    >
                      {group.category}
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-muted">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Chip className={cn(group.lead && "text-foreground/85")}>{item}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlareHover>
            </BlurFade>
          ))}
        </div>
      </div>

    </Section>
  );
}
