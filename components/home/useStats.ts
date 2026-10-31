"use client";

import { useEffect, useState } from "react";

export interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  topRepos: Array<{ name: string; stars: number; forks: number; language: string | null; url: string }>;
}

export interface LeetCodeStats {
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

export type StatsState<T> = { data: T | null; failed: boolean };

/** Fetch one of the site's cached stats routes. */
export function useStats<T>(endpoint: string): StatsState<T> {
  const [state, setState] = useState<StatsState<T>>({ data: null, failed: false });

  useEffect(() => {
    const controller = new AbortController();
    fetch(endpoint, { signal: controller.signal })
      .then((res) => res.json())
      .then((result) => {
        setState(result?.success ? { data: result.data as T, failed: false } : { data: null, failed: true });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ data: null, failed: true });
      });
    return () => controller.abort();
  }, [endpoint]);

  return state;
}
