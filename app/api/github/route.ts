import { NextResponse } from "next/server";

export const revalidate = 3600;

const USERNAME = "ranjan2829";
const API = "https://api.github.com";

interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  fork: boolean;
}

// Unauthenticated GitHub allows 60 req/hr per IP, which a deployed site
// burns through fast. Set GITHUB_TOKEN to get 5000.
const headers: Record<string, string> = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

const get = (path: string) =>
  fetch(`${API}${path}`, {
    headers,
    signal: AbortSignal.timeout(8000),
    next: { revalidate },
  });

/**
 * The starred list is paginated at 100/page, so `body.length` undercounts
 * anyone with more. Ask for one item and read the total off the `last` page
 * link instead.
 */
async function getStarredCount(): Promise<number> {
  const res = await get(`/users/${USERNAME}/starred?per_page=1`);
  if (!res.ok) return 0;

  const link = res.headers.get("link");
  const last = link?.match(/[?&]page=(\d+)>;\s*rel="last"/);
  if (last) return Number(last[1]);

  const body = await res.json();
  return Array.isArray(body) ? body.length : 0;
}

export async function GET() {
  try {
    const [userRes, reposRes, starredCount] = await Promise.all([
      get(`/users/${USERNAME}`),
      get(`/users/${USERNAME}/repos?sort=updated&per_page=100`),
      getStarredCount(),
    ]);

    if (!userRes.ok) throw new Error(`GitHub user request failed (${userRes.status})`);
    if (!reposRes.ok) throw new Error(`GitHub repos request failed (${reposRes.status})`);

    const user: GitHubUser = await userRes.json();
    const allRepos: GitHubRepo[] = await reposRes.json();

    // Forks carry the upstream project's stars, not this user's — counting
    // them would overstate the totals.
    const repos = allRepos.filter((r) => !r.fork);

    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

    const topRepos = [...repos]
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 5)
      .map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        language: r.language,
        url: r.html_url,
        updated: r.updated_at,
      }));

    const languages = new Map<string, number>();
    for (const r of repos) {
      if (r.language) languages.set(r.language, (languages.get(r.language) ?? 0) + 1);
    }

    const topLanguages = [...languages.entries()]
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      success: true,
      data: {
        username: user.login,
        name: user.name,
        bio: user.bio,
        avatar: user.avatar_url,
        followers: user.followers || 0,
        following: user.following || 0,
        publicRepos: user.public_repos || 0,
        totalStars,
        totalForks,
        starredCount,
        topRepos,
        topLanguages,
        githubUrl: user.html_url,
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch GitHub data" },
      { status: 502 }
    );
  }
}
