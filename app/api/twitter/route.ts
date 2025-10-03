import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch tweets directly from RSS.app JSON feed
    const rssAppUrl = 'https://rss.app/feeds/v1.1/kBE8o4ORFvWwi2Sa.json';
    
    console.log('Fetching tweets from RSS.app...');
    
    const response = await fetch(rssAppUrl, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`RSS.app returned ${response.status}`);
    }

    const data = await response.json();
    
    // Parse RSS.app JSON feed format
    const tweets = data.items.map((item: any) => ({
      id: item.id,
      text: item.title || item.content_text.split('—')[0].trim(),
      created_at: item.date_published,
      url: item.url,
      image: item.image || null,
      public_metrics: {
        like_count: 0,
        retweet_count: 0,
        reply_count: 0,
      },
    }));

    console.log(`✅ Fetched ${tweets.length} real tweets from RSS.app`);

    return NextResponse.json({
      success: true,
      data: {
        tweets,
        user: {
          name: 'Ranjan',
          username: 'manofsteel3129',
        },
      },
    });

  } catch (error: any) {
    console.error('RSS.app fetch error:', error.message);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch tweets from RSS.app'
      },
      { status: 500 }
    );
  }
}
