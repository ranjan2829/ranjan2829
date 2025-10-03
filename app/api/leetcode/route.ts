import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'ranjanshitole';
    
    // Using LeetCode's GraphQL API with enhanced query
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              profile {
                ranking
                reputation
              }
              tagProblemCounts {
                advanced {
                  tagName
                  problemsSolved
                }
                intermediate {
                  tagName
                  problemsSolved
                }
                fundamental {
                  tagName
                  problemsSolved
                }
              }
            }
            recentSubmissionList(username: $username, limit: 10) {
              title
              titleSlug
              timestamp
              statusDisplay
            }
            allQuestionsCount {
              difficulty
              count
            }
          }
        `,
        variables: { username }
      }),
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('LeetCode GraphQL Errors:', data.errors);
      throw new Error('Failed to fetch LeetCode data');
    }

    const matchedUser = data.data?.matchedUser;
    if (!matchedUser) {
      throw new Error('User not found');
    }

    const stats = matchedUser.submitStats.acSubmissionNum;
    const allQuestions = data.data.allQuestionsCount;
    const allSubmissions = data.data.recentSubmissionList || [];
    
    // Filter only accepted submissions
    const recentSubmissions = allSubmissions
      .filter((sub: any) => sub.statusDisplay === 'Accepted')
      .slice(0, 5);
    
    const easySolved = stats.find((s: any) => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved = stats.find((s: any) => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = stats.find((s: any) => s.difficulty === 'Hard')?.count || 0;
    const totalSolved = stats.find((s: any) => s.difficulty === 'All')?.count || 0;
    
    const totalQuestions = allQuestions.find((q: any) => q.difficulty === 'All')?.count || 0;
    
    // Extract top patterns from each category
    console.log('Tag Problem Counts:', matchedUser.tagProblemCounts);
    const topAdvanced = matchedUser.tagProblemCounts?.advanced?.slice(0, 8) || [];
    const topIntermediate = matchedUser.tagProblemCounts?.intermediate?.slice(0, 5) || [];
    const topFundamental = matchedUser.tagProblemCounts?.fundamental?.slice(0, 5) || [];
    
    return NextResponse.json({
      success: true,
      data: {
        totalSolved,
        totalQuestions,
        easySolved,
        mediumSolved,
        hardSolved,
        ranking: matchedUser.profile.ranking || 0,
        reputation: matchedUser.profile.reputation || 0,
        contestRating: 1411, // Your actual contest rating (1400-1450 range)
        contestGlobalRanking: 181539,
        contestTopPercentage: 85.82, // Your actual top percentile
        contestsAttended: 1,
        recentSubmissions: recentSubmissions.map((sub: any) => ({
          title: sub.title,
          titleSlug: sub.titleSlug,
          timestamp: sub.timestamp
        })),
        patterns: {
          advanced: topAdvanced,
          intermediate: topIntermediate,
          fundamental: topFundamental
        }
      }
    });
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch LeetCode stats' },
      { status: 500 }
    );
  }
}

