"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Github, Star, GitFork, Code2, RefreshCw } from "lucide-react";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "./ThemeProvider";
import { site } from "@/lib/site";

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contestRating: number | null;
  contestsAttended: number;
  recentSubmissions?: Array<{ title: string; titleSlug: string; timestamp: string }>;
  patterns?: {
    advanced: Array<{ tagName: string; problemsSolved: number }>;
    intermediate: Array<{ tagName: string; problemsSolved: number }>;
  };
}

interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  topRepos: Array<{
    name: string;
    stars: number;
    forks: number;
    language: string | null;
    url: string;
  }>;
}

const githubTheme = {
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

type State<T> = { data: T | null; loading: boolean; error: boolean };

/** Shared fetch + state machine — GitHub and LeetCode had duplicate copies. */
function useStats<T>(endpoint: string) {
  const [state, setState] = useState<State<T>>({ data: null, loading: true, error: false });

  const load = useCallback(
    async (signal?: AbortSignal) => {
      setState((s) => ({ ...s, loading: true, error: false }));
      try {
        const res = await fetch(endpoint, { signal });
        const result = await res.json();
        if (!res.ok || !result.success) throw new Error(result.error ?? "Request failed");
        setState({ data: result.data as T, loading: false, error: false });
      } catch (error) {
        if (signal?.aborted) return;
        console.error(`Failed to load ${endpoint}:`, error);
        setState({ data: null, loading: false, error: true });
      }
    },
    [endpoint]
  );

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return { ...state, retry: () => load() };
}

const Spinner = ({ label }: { label: string }) => (
  <div className="flex justify-center items-center py-10" role="status">
    <div className="w-5 h-5 border-2 border-card-border border-t-foreground rounded-full animate-spin" />
    <span className="sr-only">{label}</span>
  </div>
);

const ErrorState = ({ label, onRetry }: { label: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
    <p className="text-xs text-muted">Couldn&apos;t load {label} stats right now.</p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground px-3 py-1.5 rounded-lg border border-card-border hover:border-card-hover transition-colors"
    >
      <RefreshCw className="w-3.5 h-3.5" aria-hidden />
      Retry
    </button>
  </div>
);

const StatTile = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="text-center p-2 rounded-lg bg-foreground/[0.03]">
    <div className="text-[10px] text-muted mb-0.5">{label}</div>
    <div className="text-sm font-bold text-foreground flex items-center justify-center gap-1">
      {icon}
      {value}
    </div>
  </div>
);

export const SocialStats = () => {
  const github = useStats<GitHubStats>("/api/github");
  const leetcode = useStats<LeetCodeStats>("/api/leetcode");
  const { theme, mounted } = useTheme();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* GitHub */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="w-[18px] h-[18px] text-foreground" aria-hidden />
            <span className="text-sm font-semibold font-display text-foreground">GitHub</span>
          </div>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            {site.handles.github}
          </a>
        </div>

        {/* Horizontally scrollable rather than hidden — the old build told
            mobile visitors to "view the graph on desktop". */}
        <div className="overflow-x-auto -mx-1 px-1 pb-1">
          <div className="min-w-[620px] sm:min-w-0">
            {mounted && (
              <GitHubCalendar
                username="ranjan2829"
                theme={githubTheme}
                colorScheme={theme}
                hideColorLegend
                fontSize={11}
              />
            )}
          </div>
        </div>

        {github.loading ? (
          <Spinner label="Loading GitHub stats" />
        ) : github.error ? (
          <ErrorState label="GitHub" onRetry={github.retry} />
        ) : github.data ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <StatTile label="Repos" value={github.data.publicRepos} />
              <StatTile
                label="Stars"
                value={github.data.totalStars}
                icon={<Star className="w-3 h-3 text-accent-yellow" aria-hidden />}
              />
              <StatTile
                label="Forks"
                value={github.data.totalForks}
                icon={<GitFork className="w-3 h-3 text-accent-cyan" aria-hidden />}
              />
              <StatTile label="Followers" value={github.data.followers} />
            </div>

            {github.data.topRepos?.length > 0 && (
              <div className="pt-3 border-t border-card-border">
                <h3 className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
                  Top Repos
                </h3>
                <ul className="space-y-1 list-none p-0">
                  {github.data.topRepos.slice(0, 3).map((repo) => (
                    <li key={repo.name}>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-foreground/[0.03] transition-colors group"
                      >
                        <span className="min-w-0">
                          <span className="block text-xs font-medium text-foreground truncate group-hover:text-accent transition-colors">
                            {repo.name}
                          </span>
                          {repo.language && (
                            <span className="block text-[10px] text-muted font-mono mt-0.5">
                              {repo.language}
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-2 text-[10px] text-muted shrink-0 ml-2">
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3" aria-hidden />
                            {repo.stars}
                            <span className="sr-only"> stars</span>
                          </span>
                          <span className="flex items-center gap-0.5">
                            <GitFork className="w-3 h-3" aria-hidden />
                            {repo.forks}
                            <span className="sr-only"> forks</span>
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : null}
      </div>

      {/* LeetCode */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-[18px] h-[18px] text-foreground" aria-hidden />
            <span className="text-sm font-semibold font-display text-foreground">LeetCode</span>
          </div>
          <a
            href={site.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            {site.handles.leetcode}
          </a>
        </div>

        {leetcode.loading ? (
          <Spinner label="Loading LeetCode stats" />
        ) : leetcode.error ? (
          <ErrorState label="LeetCode" onRetry={leetcode.retry} />
        ) : leetcode.data ? (
          <>
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold text-foreground font-display">
                  {leetcode.data.totalSolved}
                </span>
                <span className="text-xs text-muted">
                  / {leetcode.data.totalQuestions.toLocaleString()} solved
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-cyan transition-all duration-1000"
                  style={{
                    // Guard the divide — totalQuestions is 0 if upstream omits it.
                    width: `${
                      leetcode.data.totalQuestions
                        ? (leetcode.data.totalSolved / leetcode.data.totalQuestions) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-2.5">
              {(() => {
                const max = Math.max(
                  leetcode.data.easySolved,
                  leetcode.data.mediumSolved,
                  leetcode.data.hardSolved,
                  1
                );
                return [
                  { label: "Easy", solved: leetcode.data.easySolved, color: "bg-accent-green" },
                  { label: "Medium", solved: leetcode.data.mediumSolved, color: "bg-accent-yellow" },
                  { label: "Hard", solved: leetcode.data.hardSolved, color: "bg-accent-red" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center gap-3">
                    <span className="w-14 text-xs text-muted">{d.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${d.color} transition-all duration-700`}
                        style={{ width: `${(d.solved / max) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-foreground w-8 text-right">
                      {d.solved}
                    </span>
                  </div>
                ));
              })()}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-card-border">
              <StatTile label="Rank" value={`#${(leetcode.data.ranking || 0).toLocaleString()}`} />
              {/* Only shown when the account has a real rated-contest history. */}
              {leetcode.data.contestRating ? (
                <StatTile label="Contest rating" value={leetcode.data.contestRating} />
              ) : (
                <StatTile label="Contests" value={leetcode.data.contestsAttended} />
              )}
            </div>

            {leetcode.data.patterns && (
              <div className="pt-3 border-t border-card-border">
                <h3 className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
                  Top Skills
                </h3>
                <ul className="flex flex-wrap gap-1.5 list-none p-0">
                  {[
                    ...(leetcode.data.patterns.intermediate?.slice(0, 3) ?? []),
                    ...(leetcode.data.patterns.advanced?.slice(0, 2) ?? []),
                  ].map((p) => (
                    <li
                      key={p.tagName}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-foreground/[0.04] border border-card-border text-muted font-mono"
                    >
                      {p.tagName}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {leetcode.data.recentSubmissions && leetcode.data.recentSubmissions.length > 0 && (
              <div className="pt-3 border-t border-card-border">
                <h3 className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
                  Recent Solves
                </h3>
                <ul className="space-y-1 list-none p-0">
                  {leetcode.data.recentSubmissions.slice(0, 3).map((sub) => (
                    <li key={sub.titleSlug}>
                      <a
                        href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs text-muted hover:text-foreground transition-colors truncate"
                      >
                        {sub.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SocialStats;
