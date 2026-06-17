import { NextResponse } from 'next/server';
import { footballApi } from '@/lib/api/football-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';

  try {
    let data;

    switch (type) {
      case 'scorers':
        const scorers = await footballApi.getTopScorers();
        data = { type: 'scorers', data: scorers };
        break;
      case 'all':
      default:
        const standings = await footballApi.getStandings();
        data = { type: 'standings', data: standings };
        break;
    }

    return NextResponse.json({
      success: true,
      ...data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching standings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch standings data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
