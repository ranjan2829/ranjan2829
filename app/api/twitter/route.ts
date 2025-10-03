import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return your latest tweets (scraped/curated)
    return NextResponse.json({
      success: true,
      data: {
        tweets: [
          {
            id: '1974002253318000853',
            text: 'bro whattt ?🧐',
            created_at: '2025-10-03T06:43:07.000Z',
            public_metrics: {
              like_count: 2,
              retweet_count: 0,
              reply_count: 0,
            },
          },
          {
            id: '1973307252997255233',
            text: 'RBI monetary policy day!',
            created_at: '2025-10-01T08:41:26.000Z',
            public_metrics: {
              like_count: 2,
              retweet_count: 0,
              reply_count: 0,
            },
          },
          {
            id: '1973307163901931864',
            text: 'So October started with a banger profit in nifty options !',
            created_at: '2025-10-01T08:41:04.000Z',
            public_metrics: {
              like_count: 3,
              retweet_count: 0,
              reply_count: 0,
            },
          },
          {
            id: '1973377411661308124',
            text: '@Micky__21_ Maybe we should start a hedge fund together, arbitrage trading',
            created_at: '2025-10-01T13:20:13.000Z',
            public_metrics: {
              like_count: 0,
              retweet_count: 0,
              reply_count: 0,
            },
          },
        ],
        user: {
          name: 'Ranjan',
          username: 'manofsteel3129',
        },
      },
    });
  } catch (error) {
    console.error('Twitter fetch error:', error);
    return NextResponse.json(
      { 
        success: true, 
        data: {
          tweets: [
            {
              id: '1',
              text: 'Working on AI projects and quantitative finance! Follow for updates on tech, finance, and coding. 🚀',
              created_at: new Date().toISOString(),
              public_metrics: {
                like_count: 0,
                retweet_count: 0,
                reply_count: 0,
              },
            },
          ],
          user: {
            name: 'Ranjan',
            username: 'manofsteel3129',
          },
        },
      },
    );
  }
}


