"use client";

import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, Code2 } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';
import { useTheme } from './ThemeProvider';

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contestRating?: number;
  contestTopPercentage?: number;
  recentSubmissions?: Array<{
    title: string;
    titleSlug: string;
    timestamp: string;
  }>;
  patterns?: {
    advanced: Array<{ tagName: string; problemsSolved: number }>;
    intermediate: Array<{ tagName: string; problemsSolved: number }>;
    fundamental: Array<{ tagName: string; problemsSolved: number }>;
  };
}

interface GitHubStats {
  username: string;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  starredCount: number;
  followers: number;
  following: number;
  topRepos: Array<{
    name: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
  }>;
  topLanguages: Array<{
    name: string;
    count: number;
  }>;
}

const githubTheme = {
  dark: ['#111113', '#0e4429', '#006d32', '#26a641', '#39d353'],
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
};

const Spinner = () => (
  <div className="flex justify-center py-6">
    <div className="w-5 h-5 border-2 border-card-border border-t-foreground rounded-full animate-spin" />
  </div>
);

export const SocialStats = () => {
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null);
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [githubLoading, setGithubLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch('/api/leetcode');
        const result = await response.json();
        if (result.success) setLeetcodeStats(result.data);
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
      } finally {
        setLeetcodeLoading(false);
      }
    };

    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('/api/github');
        const result = await response.json();
        if (result.success) setGithubStats(result.data);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setGithubLoading(false);
      }
    };

    fetchLeetCodeStats();
    fetchGitHubStats();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* GitHub */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="w-[18px] h-[18px] text-foreground" />
            <span className="text-sm font-semibold font-display text-foreground">GitHub</span>
          </div>
          <a
            href="https://github.com/ranjan2829"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            @ranjan2829
          </a>
        </div>

        <div className="overflow-x-auto -mx-1 px-1 pb-1">
          <GitHubCalendar
            username="ranjan2829"
            theme={githubTheme}
            colorScheme={theme}
            hideColorLegend
            fontSize={11}
          />
        </div>

        {githubLoading ? (
          <Spinner />
        ) : githubStats ? (
          <>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Repos", value: githubStats.publicRepos },
                { label: "Stars", value: githubStats.totalStars, icon: <Star className="w-3 h-3 text-accent-yellow" /> },
                { label: "Forks", value: githubStats.totalForks, icon: <GitFork className="w-3 h-3 text-accent-cyan" /> },
                { label: "Starred", value: `${githubStats.starredCount}+` },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-2 rounded-lg bg-foreground/[0.03]">
                  <div className="text-[10px] text-muted mb-0.5">{stat.label}</div>
                  <div className="text-sm font-bold text-foreground flex items-center justify-center gap-1">
                    {stat.icon}
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {githubStats.topRepos && githubStats.topRepos.length > 0 && (
              <div className="pt-3 border-t border-card-border">
                <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
                  Top Repos
                </div>
                <div className="space-y-1">
                  {githubStats.topRepos.slice(0, 3).map((repo, idx) => (
                    <a
                      key={idx}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-foreground/[0.03] transition-colors group"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-foreground truncate group-hover:text-accent transition-colors">
                          {repo.name}
                        </div>
                        {repo.language && (
                          <div className="text-[10px] text-muted font-mono mt-0.5">{repo.language}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted flex-shrink-0 ml-2">
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3" />{repo.stars}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <GitFork className="w-3 h-3" />{repo.forks}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>

      {/* LeetCode */}
      <div className="card p-5 space-y-4">
        {leetcodeLoading ? (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <div className="w-5 h-5 border-2 border-card-border border-t-foreground rounded-full animate-spin" />
          </div>
        ) : leetcodeStats ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-[18px] h-[18px] text-foreground" />
                <span className="text-sm font-semibold font-display text-foreground">LeetCode</span>
              </div>
              <a
                href="https://leetcode.com/u/ranjanshitole/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-foreground transition-colors"
              >
                @ranjanshitole
              </a>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold text-foreground font-display">
                  {leetcodeStats.totalSolved}
                </span>
                <span className="text-xs text-muted">/ {leetcodeStats.totalQuestions} solved</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-cyan transition-all duration-1000"
                  style={{ width: `${(leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2.5">
              {(() => {
                const maxSolved = Math.max(
                  leetcodeStats.easySolved,
                  leetcodeStats.mediumSolved,
                  leetcodeStats.hardSolved,
                  1
                );
                return [
                  { label: "Easy", solved: leetcodeStats.easySolved, color: "bg-accent-green" },
                  { label: "Medium", solved: leetcodeStats.mediumSolved, color: "bg-accent-yellow" },
                  { label: "Hard", solved: leetcodeStats.hardSolved, color: "bg-accent-red" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center gap-3">
                    <span className="w-14 text-xs text-muted">{d.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${d.color} transition-all duration-700`}
                        style={{ width: `${(d.solved / maxSolved) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-foreground w-8 text-right">{d.solved}</span>
                  </div>
                ));
              })()}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-card-border">
              <div className="text-center p-2 rounded-lg bg-foreground/[0.03]">
                <div className="text-[10px] text-muted mb-0.5">Rank</div>
                <div className="text-sm font-bold text-foreground">
                  #{(leetcodeStats.ranking || 0).toLocaleString()}
                </div>
              </div>
              <div className="text-center p-2 rounded-lg bg-foreground/[0.03]">
                <div className="text-[10px] text-muted mb-0.5">Rating</div>
                <div className="text-sm font-bold text-accent-yellow">
                  {leetcodeStats.contestRating || 'N/A'}
                </div>
              </div>
            </div>

            {leetcodeStats.patterns && (
              <div className="pt-3 border-t border-card-border">
                <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
                  Top Skills
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    ...(leetcodeStats.patterns.intermediate?.slice(0, 3) || []),
                    ...(leetcodeStats.patterns.advanced?.slice(0, 2) || []),
                  ].map((p, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-foreground/[0.04] border border-card-border text-muted font-mono"
                    >
                      {p.tagName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {leetcodeStats.recentSubmissions && leetcodeStats.recentSubmissions.length > 0 && (
              <div className="pt-3 border-t border-card-border">
                <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
                  Recent Solves
                </div>
                <div className="space-y-1">
                  {leetcodeStats.recentSubmissions.slice(0, 3).map((sub, i) => (
                    <a
                      key={i}
                      href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-muted hover:text-foreground transition-colors truncate"
                    >
                      {sub.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SocialStats;
