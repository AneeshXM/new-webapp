import { NextResponse } from 'next/server';
import { footballApi } from '@/lib/api/football-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get('id');

  try {
    if (teamId) {
      const teams = await footballApi.getTeams();
      const team = teams.find(t => t.id === parseInt(teamId));
      
      if (!team) {
        return NextResponse.json(
          {
            success: false,
            error: 'Team not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: team,
        timestamp: new Date().toISOString(),
      });
    }

    const teams = await footballApi.getTeams();

    return NextResponse.json({
      success: true,
      data: teams,
      count: teams.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch team data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
