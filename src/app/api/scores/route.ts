import { NextResponse } from 'next/server';
import { footballApi } from '@/lib/api/football-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';
  const date = searchParams.get('date') || undefined;
  const from = searchParams.get('from') || undefined;
  const to = searchParams.get('to') || undefined;
  const teamId = searchParams.get('team') ? parseInt(searchParams.get('team')!) : undefined;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

  try {
    let matches;

    switch (type) {
      case 'live':
        matches = await footballApi.getLiveMatches();
        break;
      case 'upcoming':
        matches = await footballApi.getUpcomingMatches(limit || 10);
        break;
      case 'completed':
        matches = await footballApi.getCompletedMatches(limit || 10);
        break;
      case 'all':
      default:
        matches = await footballApi.getMatches({
          date,
          from,
          to,
          team: teamId,
          limit,
        });
        break;
    }

    return NextResponse.json({
      success: true,
      data: matches,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch match data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
