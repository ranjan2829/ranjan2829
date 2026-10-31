import React from "react";
import { cn } from "@/lib/utils";

/** Solid section that covers the fixed black hole beneath it. */
export function Section({
  id,
  labelledBy,
  className,
  wide,
  children,
}: {
  id: string;
  labelledBy: string;
  className?: string;
  /** Let the content run wider than the reading column. */
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative isolate bg-background px-5 py-28 sm:px-8 lg:px-12 lg:py-40", className)}
    >
      <div className={cn("mx-auto w-full", wide ? "max-w-7xl" : "max-w-6xl")}>{children}</div>
    </section>
  );
}

/** Keynote-style header: a small eyebrow over a large, softly graded headline. */
export function SectionHeader({
  index,
  eyebrow,
  id,
  title,
  sub,
  aside,
}: {
  index: string;
  eyebrow?: string;
  id: string;
  title: string;
  sub?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <header className="mx-auto mb-16 flex max-w-4xl flex-col items-center text-center lg:mb-20">
      <p className="mb-5 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
        <span className="tabular-nums text-accent">{index}</span>
        {eyebrow && <span> · {eyebrow}</span>}
      </p>
      <h2
        id={id}
        className="text-balance bg-gradient-to-b from-foreground to-foreground/55 bg-clip-text pb-2 text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-transparent"
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-5 max-w-2xl text-pretty text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-muted">
          {sub}
        </p>
      )}
      {aside && <div className="mt-6 text-sm text-muted">{aside}</div>}
    </header>
  );
}

/** Small mono chip used for tech and skills. */
export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-card-border bg-foreground/[0.03] px-2.5 py-1 font-mono text-[12px] text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
