"use client";

import React, { useState } from "react";
import { ChevronDown, GraduationCap } from "lucide-react";
import { Timeline, type TimelineEntry } from "@/components/aceternity/timeline";
import { BorderBeam } from "@/components/magicui/border-beam";
import { education, roles, type Role } from "@/lib/resume";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "./Section";

/** Big year with the exact range under it, pinned while the entry scrolls by. */
function When({ year, range }: { year: string; range: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-3xl font-semibold leading-none tracking-[-0.04em] text-foreground/85 tabular-nums md:text-5xl">
        {year}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{range}</span>
    </div>
  );
}

const firstYear = (date: string) => date.match(/\d{4}/)?.[0] ?? "";
const lastYear = (date: string) => date.match(/\d{4}/g)?.at(-1) ?? "";

const card = "relative overflow-hidden rounded-3xl border border-card-border bg-card/70 p-6 backdrop-blur-xl md:p-8";

function RoleCard({ role }: { role: Role }) {
  // The current role opens in full; earlier ones show their top three wins.
  const [open, setOpen] = useState(Boolean(role.isActive));
  const shown = open ? role.highlights : role.highlights.slice(0, 3);
  const hidden = role.highlights.length - shown.length;

  return (
    <article className={card}>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-[1.75rem]">{role.company}</h3>
          <p className="mt-1 text-[15px] font-medium text-foreground/80">{role.title}</p>
        </div>
        {role.isActive && (
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-green">
            <span className="size-1.5 rounded-full bg-accent-green motion-safe:animate-pulse" aria-hidden />
            Current
          </span>
        )}
      </div>
      <p className="mt-3 font-mono text-[12px] text-muted">
        {role.date.replace("Present", "now")} · {role.location}
      </p>
      <p className="mt-5 text-[15px] leading-relaxed text-foreground/75">{role.description}</p>

      <ul className="mt-5 flex flex-col gap-3 border-t border-card-border pt-5">
        {shown.map((point) => (
          <li key={point} className="flex gap-3 text-[14.5px] leading-relaxed text-muted">
            <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
            {point}
          </li>
        ))}
      </ul>

      {role.highlights.length > 3 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          {open ? "Show less" : `Show ${hidden} more`}
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
      )}

      {role.isActive && <BorderBeam size={160} duration={10} colorFrom="#2997FF" colorTo="#30D158" />}
    </article>
  );
}

function EducationCard({ item }: { item: (typeof education)[number] }) {
  return (
    <article className={cn(card, "flex items-start gap-5")}>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-card-border bg-background text-accent">
        <GraduationCap className="size-5" aria-hidden />
      </span>
      <div>
        <h3 className="text-xl font-semibold tracking-[-0.025em]">{item.title}</h3>
        <p className="mt-1 text-[15px] text-foreground/80">
          {item.company} · {item.location}
        </p>
        <p className="mt-2 font-mono text-[12px] text-muted">{item.detail}</p>
      </div>
    </article>
  );
}

/** Career as a scroll-drawn timeline: newest first, education last. */
export function Experience() {
  const entries: TimelineEntry[] = [
    ...roles.map((role) => ({
      title: <When year={firstYear(role.date)} range={role.date.replace("Present", "now")} />,
      content: <RoleCard role={role} />,
      active: role.isActive,
    })),
    ...education.map((item) => ({
      title: <When year={lastYear(item.date)} range={item.date} />,
      content: <EducationCard item={item} />,
    })),
  ];

  return (
    <Section id="experience" labelledBy="exp-title" className="pb-16 lg:pb-24">
      <SectionHeader
        index="01"
        eyebrow="Experience"
        id="exp-title"
        title="From quant desks to regulated fintech."
        sub="Six roles since 2024, newest first."
      />
      <Timeline data={entries} />
    </Section>
  );
}
