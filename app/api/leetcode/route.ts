import { NextResponse } from "next/server";

// Cache the upstream result for an hour — these stats move slowly and
// LeetCode rate-limits aggressively on repeat hits from one IP.
export const revalidate = 3600;

const USERNAME = "ranjanshitole";

const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats { acSubmissionNum { difficulty count } }
      profile { ranking reputation }
      tagProblemCounts {
        advanced { tagName problemsSolved }
        intermediate { tagName problemsSolved }
        fundamental { tagName problemsSolved }
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
    }
    recentSubmissionList(username: $username, limit: 20) {
      title
      titleSlug
      timestamp
      statusDisplay
    }
    allQuestionsCount { difficulty count }
  }
`;

interface CountByDifficulty {
  difficulty: string;
  count: number;
}

interface TagCount {
  tagName: string;
  problemsSolved: number;
}

interface Submission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
}

interface LeetCodeResponse {
  errors?: Array<{ message: string }>;
  data?: {
    matchedUser: {
      username: string;
      submitStats: { acSubmissionNum: CountByDifficulty[] };
      profile: { ranking: number | null; reputation: number | null };
      tagProblemCounts: {
        advanced: TagCount[];
        intermediate: TagCount[];
        fundamental: TagCount[];
      } | null;
    } | null;
    userContestRanking: {
      attendedContestsCount: number;
      rating: number;
      globalRanking: number;
      topPercentage: number;
    } | null;
    recentSubmissionList: Submission[] | null;
    allQuestionsCount: CountByDifficulty[];
  };
}

const countFor = (list: CountByDifficulty[] | undefined, difficulty: string) =>
  list?.find((d) => d.difficulty === difficulty)?.count ?? 0;

export async function GET() {
  try {
    // Without a timeout a hung upstream keeps the route open until the
    // platform kills it, and the stats card spins forever.
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
      signal: AbortSignal.timeout(8000),
      next: { revalidate },
    });

    if (!response.ok) {
      throw new Error(`LeetCode responded ${response.status}`);
    }

    const payload: LeetCodeResponse = await response.json();

    if (payload.errors?.length) {
      throw new Error(payload.errors.map((e) => e.message).join("; "));
    }

    const user = payload.data?.matchedUser;
    if (!user) {
      return NextResponse.json(
        { success: false, error: "LeetCode user not found" },
        { status: 404 }
      );
    }

    const solved = user.submitStats.acSubmissionNum;
    const contest = payload.data?.userContestRanking ?? null;

    const recentSubmissions = (payload.data?.recentSubmissionList ?? [])
      .filter((s) => s.statusDisplay === "Accepted")
      .slice(0, 5)
      .map(({ title, titleSlug, timestamp }) => ({ title, titleSlug, timestamp }));

    return NextResponse.json({
      success: true,
      data: {
        totalSolved: countFor(solved, "All"),
        totalQuestions: countFor(payload.data?.allQuestionsCount, "All"),
        easySolved: countFor(solved, "Easy"),
        mediumSolved: countFor(solved, "Medium"),
        hardSolved: countFor(solved, "Hard"),
        ranking: user.profile.ranking ?? 0,
        reputation: user.profile.reputation ?? 0,
        // Null when the account has never entered a rated contest — the UI
        // hides the block rather than inventing a number.
        contestRating: contest ? Math.round(contest.rating) : null,
        contestGlobalRanking: contest?.globalRanking ?? null,
        contestTopPercentage: contest?.topPercentage ?? null,
        contestsAttended: contest?.attendedContestsCount ?? 0,
        recentSubmissions,
        patterns: {
          advanced: user.tagProblemCounts?.advanced?.slice(0, 8) ?? [],
          intermediate: user.tagProblemCounts?.intermediate?.slice(0, 5) ?? [],
          fundamental: user.tagProblemCounts?.fundamental?.slice(0, 5) ?? [],
        },
      },
    });
  } catch (error) {
    console.error("LeetCode API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch LeetCode stats" },
      { status: 502 }
    );
  }
}
