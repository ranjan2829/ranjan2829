"use client";

import React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import GitHubCalendar from "react-github-calendar";
import { BlurFade } from "@/components/magicui/blur-fade";
import Text3DFlip from "@/components/magicui/text-3d-flip";
import { useTheme } from "@/components/ThemeProvider";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "./Section";
import { useStats, type GitHubStats, type LeetCodeStats, type StatsState } from "./useStats";

const panel = "relative overflow-hidden rounded-2xl border border-card-border bg-card";
const label = "font-mono text-[11px] uppercase tracking-[0.14em] text-muted";

// Greens for the contribution grid, one ramp per theme, ending on Apple's system green.
const calendarTheme = {
  dark: ["#141416", "#103d24", "#17663a", "#22924f", "#30d158"],
  light: ["#ebebf0", "#b5e8c4", "#7dd396", "#34c759", "#248a3d"],
};

function Kpi({ title, value, prefix }: { title: string; value: number | null; prefix?: string }) {
  return (
    <div className="flex flex-col gap-1.5 bg-card px-5 py-4">
      <span className={label}>{title}</span>
      <span className="whitespace-nowrap text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-none tracking-[-0.02em] tabular-nums">
        {value === null ? (
          <span className="text-muted">—</span>
        ) : (
          // Exact and static: the 3D-flip row above is the animated read of these numbers.
          `${prefix ?? ""}${value.toLocaleString("en-US")}`
        )}
      </span>
    </div>
  );
}

function PanelHead({ title, handle, href }: { title: string; handle: string; href: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-card-border px-5 py-4">
      <span className="text-[15px] font-semibold">{title}</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-foreground"
      >
        {handle} <ArrowUpRight className="size-3" aria-hidden />
      </a>
    </div>
  );
}

function Failed({ what }: { what: string }) {
  return <p className="px-5 py-6 text-sm text-muted">Couldn&apos;t load {what} stats right now.</p>;
}

function GitHubPanel({ state }: { state: StatsState<GitHubStats> }) {
  const { theme, mounted } = useTheme();
  const { data, failed } = state;

  return (
    <div className={cn(panel, "lg:col-span-3")}>
      <PanelHead title="GitHub" handle={site.handles.github} href={site.socials.github} />
      <div className="overflow-x-auto border-b border-card-border px-5 py-5 text-muted">
        {mounted && (
          <GitHubCalendar
            username="ranjan2829"
            theme={calendarTheme}
            colorScheme={theme}
            hideColorLegend
            blockSize={11}
            blockMargin={3}
            fontSize={11}
          />
        )}
      </div>
      {failed ? (
        <Failed what="GitHub" />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-px border-b border-card-border bg-card-border sm:grid-cols-4">
            <Kpi title="Repos" value={data?.publicRepos ?? null} />
            <Kpi title="Stars" value={data?.totalStars ?? null} />
            <Kpi title="Forks" value={data?.totalForks ?? null} />
            <Kpi title="Followers" value={data?.followers ?? null} />
          </div>
          <div className="px-5 py-4">
            <h3 className={cn(label, "mb-2")}>Top repos</h3>
            <ul className="divide-y divide-card-border">
              {(data?.topRepos ?? []).slice(0, 3).map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-2.5"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Github className="size-3.5 shrink-0 text-muted" aria-hidden />
                      <span className="truncate text-sm font-medium group-hover:text-accent">{repo.name}</span>
                    </span>
                    <span className="flex shrink-0 gap-3 font-mono text-xs tabular-nums text-muted">
                      {repo.language && <span>{repo.language}</span>}
                      <span>★ {repo.stars}</span>
                      <span>⑂ {repo.forks}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function LeetCodePanel({ state }: { state: StatsState<LeetCodeStats> }) {
  const { data, failed } = state;
  const max = data ? Math.max(data.easySolved, data.mediumSolved, data.hardSolved, 1) : 1;
  const bars = data
    ? [
        { name: "Easy", n: data.easySolved, color: "bg-accent-green" },
        { name: "Medium", n: data.mediumSolved, color: "bg-accent-yellow" },
        { name: "Hard", n: data.hardSolved, color: "bg-accent-red" },
      ]
    : [];
  const topics = data?.patterns
    ? [...(data.patterns.intermediate?.slice(0, 3) ?? []), ...(data.patterns.advanced?.slice(0, 2) ?? [])]
    : [];

  return (
    <div className={cn(panel, "lg:col-span-2")}>
      <PanelHead title="LeetCode" handle={site.handles.leetcode} href={site.socials.leetcode} />
      {failed ? (
        <Failed what="LeetCode" />
      ) : (
        <>
          <div className="flex items-end justify-between gap-4 border-b border-card-border px-5 py-5">
            <div className="flex flex-col gap-1.5">
              <span className={label}>Solved</span>
              <span className="text-5xl font-semibold leading-none tracking-[-0.03em] tabular-nums">
                {data ? data.totalSolved.toLocaleString("en-US") : "—"}
                <span className="ml-1 text-base font-normal text-muted">
                  / {data ? data.totalQuestions.toLocaleString() : "—"}
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-b border-card-border px-5 py-5">
            {bars.map((b) => (
              <div key={b.name} className="flex items-center gap-3">
                <span className="w-14 text-xs text-muted">{b.name}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/[0.06]">
                  <span className={cn("block h-full rounded-full", b.color)} style={{ width: `${(b.n / max) * 100}%` }} />
                </span>
                <span className="w-8 text-right font-mono text-xs tabular-nums">{b.n}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-px border-b border-card-border bg-card-border">
            <Kpi title="Rank" value={data?.ranking ?? null} prefix="#" />
            <Kpi title="Rating" value={data?.contestRating ?? null} />
            <Kpi title="Contests" value={data?.contestsAttended ?? null} />
          </div>
          <div className="grid gap-5 px-5 py-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {topics.length > 0 && (
              <div>
                <h3 className={cn(label, "mb-2")}>Top topics</h3>
                <ul className="flex flex-col gap-1.5 text-sm">
                  {topics.map((t) => (
                    <li key={t.tagName} className="flex justify-between gap-3">
                      <span>{t.tagName}</span>
                      <span className="font-mono text-xs tabular-nums text-muted">{t.problemsSolved}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data?.recentSubmissions && data.recentSubmissions.length > 0 && (
              <div>
                <h3 className={cn(label, "mb-2")}>Recent solves</h3>
                <ul className="flex flex-col gap-1.5 text-sm">
                  {data.recentSubmissions.slice(0, 3).map((s) => (
                    <li key={s.titleSlug}>
                      <a
                        href={`https://leetcode.com/problems/${s.titleSlug}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/** One live headline figure whose digits flip in 3D on hover. */
function Headline({ value, title }: { value: number | null | undefined; title: string }) {
  const text = value == null ? "—" : value.toLocaleString("en-US");
  return (
    <div className="flex flex-col items-center gap-2 bg-card px-4 py-8 text-center">
      <Text3DFlip
        key={text}
        as="p"
        className="justify-center text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums"
        flipTextClassName="text-accent"
        staggerFrom="center"
        rotateDirection="top"
      >
        {text}
      </Text3DFlip>
      <p className="text-sm text-muted">{title}</p>
    </div>
  );
}

/** Live GitHub and LeetCode numbers, laid out like a trading dashboard. */
export function Stats() {
  const github = useStats<GitHubStats>("/api/github");
  const leetcode = useStats<LeetCodeStats>("/api/leetcode");

  return (
    <Section id="stats" labelledBy="stats-title">
      <SectionHeader
        index="07"
        eyebrow="By the numbers"
        id="stats-title"
        title="Shipping, every day."
        sub="Live from GitHub and LeetCode. Hover a number."
      />
      <BlurFade inView>
        <div className="mb-4 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-card-border bg-card-border md:grid-cols-4">
          <Headline value={github.data?.totalStars} title="GitHub stars" />
          <Headline value={github.data?.publicRepos} title="public repos" />
          <Headline value={leetcode.data?.totalSolved} title="LeetCode solved" />
          <Headline value={leetcode.data?.contestRating} title="contest rating" />
        </div>
      </BlurFade>
      <BlurFade inView delay={0.08}>
        <div className="grid gap-4 lg:grid-cols-5">
          <GitHubPanel state={github} />
          <LeetCodePanel state={leetcode} />
        </div>
      </BlurFade>
    </Section>
  );
}
