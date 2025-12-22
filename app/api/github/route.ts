import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'ranjan2829';
    
    // Fetch user info
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch GitHub user data');
    }

    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    });

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }

    const repos = await reposResponse.json();

    // Fetch starred repositories
    const starredResponse = await fetch(`https://api.github.com/users/${username}/starred?per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    });

    const starred = starredResponse.ok ? await starredResponse.json() : [];

    // Calculate stats
    const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0);
    const totalForks = repos.reduce((sum: number, repo: any) => sum + (repo.forks_count || 0), 0);
    
    // Get top repos by stars
    const topRepos = repos
      .sort((a: any, b: any) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 5)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language,
        url: repo.html_url,
        updated: repo.updated_at,
      }));

    // Get languages used
    const languages: { [key: string]: number } = {};
    repos.forEach((repo: any) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      success: true,
      data: {
        username: userData.login,
        name: userData.name,
        bio: userData.bio,
        avatar: userData.avatar_url,
        followers: userData.followers || 0,
        following: userData.following || 0,
        publicRepos: userData.public_repos || 0,
        totalStars,
        totalForks,
        starredCount: Array.isArray(starred) ? starred.length : 0,
        topRepos,
        topLanguages,
        githubUrl: userData.html_url,
      },
    });
  } catch (error: any) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch GitHub data',
      },
      { status: 500 }
    );
  }
}

