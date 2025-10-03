import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'ranjanshitole';
    
    // Using LeetCode's GraphQL API
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
      throw new Error('Failed to fetch LeetCode data');
    }

    const stats = data.data.matchedUser.submitStats.acSubmissionNum;
    const allQuestions = data.data.allQuestionsCount;
    
    const easySolved = stats.find((s: any) => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved = stats.find((s: any) => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = stats.find((s: any) => s.difficulty === 'Hard')?.count || 0;
    const totalSolved = stats.find((s: any) => s.difficulty === 'All')?.count || 0;
    
    const totalQuestions = allQuestions.find((q: any) => q.difficulty === 'All')?.count || 0;
    
    return NextResponse.json({
      success: true,
      data: {
        totalSolved,
        totalQuestions,
        easySolved,
        mediumSolved,
        hardSolved,
        ranking: data.data.matchedUser.profile.ranking || 0,
        reputation: data.data.matchedUser.profile.reputation || 0,
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

