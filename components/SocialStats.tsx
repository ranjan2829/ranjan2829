"use client";
import React, { useState, useEffect } from 'react';
import { Code2, Github, Star, GitFork, TrendingUp } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

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
  dark: ['#050505', '#0e4429', '#006d32', '#26a641', '#39d353']
};

export const SocialStats = () => {
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null);
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [githubLoading, setGithubLoading] = useState(true);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch('/api/leetcode');
        const result = await response.json();
        
        if (result.success) {
          setLeetcodeStats(result.data);
        }
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
        
        if (result.success) {
          setGithubStats(result.data);
        }
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
    <div className="glass-panel rounded-xl p-5 w-full">
      <div className="flex flex-row gap-6 items-start w-full">
        {/* GitHub Stats Section - Left */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5 text-accent-green" />
              <span className="text-sm uppercase tracking-wider text-muted font-bold">
                <span className="text-accent-green">git</span>hub-stats
              </span>
            </div>
            <span className="text-xs bg-white/5 px-2 py-1 rounded">Past Year</span>
          </div>

          {/* GitHub Calendar - Larger */}
          <div className="bg-bg-card/50 rounded-lg p-4 overflow-x-auto">
            <div className="scale-100 origin-top-left">
              <GitHubCalendar 
                username="ranjan2829"
                theme={githubTheme}
                hideColorLegend
                hideMonthLabels={false}
                fontSize={12}
              />
            </div>
          </div>

          {/* GitHub Stats Grid */}
          {githubLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-green"></div>
            </div>
          ) : githubStats ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <div className="text-xs text-muted font-mono mb-1">Repos</div>
                  <div className="text-lg font-bold text-white">{githubStats.publicRepos}</div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <div className="text-xs text-muted font-mono mb-1">Stars</div>
                  <div className="text-lg font-bold text-accent-yellow flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {githubStats.totalStars}
                  </div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <div className="text-xs text-muted font-mono mb-1">Forks</div>
                  <div className="text-lg font-bold text-accent-cyan flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {githubStats.totalForks}
                  </div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <div className="text-xs text-muted font-mono mb-1">Starred</div>
                  <div className="text-lg font-bold text-white">{githubStats.starredCount}+</div>
                </div>
              </div>

              {/* Top Repos */}
              {githubStats.topRepos && githubStats.topRepos.length > 0 && (
                <div className="pt-2 border-t border-white/5">
                  <div className="text-xs font-bold text-white mb-2 font-mono">Top Repos</div>
                  <div className="space-y-1.5">
                    {githubStats.topRepos.slice(0, 3).map((repo, idx) => (
                      <a
                        key={idx}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 rounded bg-white/5 border border-white/10 hover:border-accent-green/50 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-white group-hover:text-accent-green transition-colors truncate">
                              {repo.name}
                            </div>
                            {repo.language && (
                              <div className="text-[10px] text-muted font-mono mt-0.5">{repo.language}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-muted">
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3" />
                              <span>{repo.stars}</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              <GitFork className="w-3 h-3" />
                              <span>{repo.forks}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-xs text-muted font-mono flex justify-between items-center pt-2 border-t border-white/5">
                <a 
                  href="https://github.com/ranjan2829" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent-cyan transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span>@ranjan2829</span>
                </a>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
                  <span>99.9% Uptime</span>
                </span>
              </div>
            </>
          ) : null}
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-white/5 self-stretch"></div>

        {/* LeetCode Stats Section - Right */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {leetcodeLoading ? (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-yellow"></div>
            </div>
          ) : leetcodeStats ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-accent-yellow" />
                  <span className="text-sm font-bold text-white">LeetCode</span>
                </div>
                <a 
                  href="https://leetcode.com/u/ranjanshitole/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-accent-cyan transition-colors"
                >
                  @ranjanshitole
                </a>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted font-mono">Solved</span>
                  <span className="text-white font-bold">
                    {leetcodeStats.totalSolved}/{leetcodeStats.totalQuestions}
                  </span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-green to-accent-cyan transition-all duration-1000"
                    style={{ width: `${(leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2.5 rounded bg-green-500/10 border border-green-500/30">
                  <div className="text-white font-bold text-lg">{leetcodeStats.easySolved}</div>
                  <div className="text-muted text-xs">Easy</div>
                </div>
                <div className="text-center p-2.5 rounded bg-yellow-500/10 border border-yellow-500/30">
                  <div className="text-white font-bold text-lg">{leetcodeStats.mediumSolved}</div>
                  <div className="text-muted text-xs">Medium</div>
                </div>
                <div className="text-center p-2.5 rounded bg-red-500/10 border border-red-500/30">
                  <div className="text-white font-bold text-lg">{leetcodeStats.hardSolved}</div>
                  <div className="text-muted text-xs">Hard</div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <div className="text-center p-2 rounded bg-white/5 border border-white/10">
                  <div className="text-muted text-xs font-mono mb-1">Rank</div>
                  <div className="text-purple-400 font-bold text-base">
                    #{(leetcodeStats.ranking || 0).toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-2 rounded bg-white/5 border border-white/10">
                  <div className="text-muted text-xs font-mono mb-1">Rating</div>
                  <div className="text-accent-yellow font-bold text-base">
                    {leetcodeStats.contestRating || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Top Skills */}
              {leetcodeStats.patterns && (
                <div className="pt-2 border-t border-white/5">
                  <div className="text-xs font-bold text-white mb-2 font-mono">Top Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      ...(leetcodeStats.patterns.intermediate?.slice(0, 3) || []),
                      ...(leetcodeStats.patterns.advanced?.slice(0, 2) || [])
                    ].map((pattern, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-xs bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 font-mono"
                      >
                        {pattern.tagName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Submissions */}
              {leetcodeStats.recentSubmissions && leetcodeStats.recentSubmissions.length > 0 && (
                <div className="pt-2 border-t border-white/5">
                  <div className="text-xs font-bold text-white mb-2 font-mono">Recent AC</div>
                  <div className="space-y-1">
                    {leetcodeStats.recentSubmissions.slice(0, 3).map((sub, idx) => (
                      <a
                        key={idx}
                        href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs font-mono text-muted hover:text-accent-cyan transition-colors truncate"
                      >
                        → {sub.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SocialStats;
