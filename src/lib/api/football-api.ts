/**
 * Football API Service using Football-Data.org (FREE - No credit card required!)
 * Sign up at: https://www.football-data.org/
 * Free tier: 10 requests/minute, 100 requests/day
 * 
 * This service falls back to mock data if no API key is provided.
 */

import type { Match, Team, Standing, TopScorer, Competition, MatchQueryParams } from '@/types';

// Environment variable for Football-Data.org API key
const FOOTBALL_DATA_KEY = process.env.FOOTBALL_DATA_KEY;
const FOOTBALL_DATA_HOST = 'https://api.football-data.org/v4';

// World Cup 2026 Competition ID (IC:17 for World Cup qualifiers, WC:1 for World Cup)
const WORLD_CUP_ID = 1;
const CURRENT_SEASON = 2025;

/**
 * Fetch from Football-Data.org API
 */
async function fetchFromFootballData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${FOOTBALL_DATA_HOST}${endpoint}`, {
    headers: {
      'X-Auth-Token': FOOTBALL_DATA_KEY || '',
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Football-Data error: ${response.status}`);
  }

  return response.json();
}

// Football-Data.org response types
export interface FootballDataMatch {
  id: number;
  utcDate: string;
  status: string;
  venue?: string;
  referee?: string;
  competition: {
    id: number;
    name: string;
    code: string;
    emblem: string;
  };
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  score: {
    fullTime: { home: number | null; away: number | null };
    halfTime: { home: number | null; away: number | null };
    extraTime?: { home: number | null; away: number | null };
    penalties?: { home: number | null; away: number | null };
  };
  minute?: number;
}

export interface FootballDataStandings {
  competition: {
    id: number;
    name: string;
    code: string;
    emblem: string;
  };
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  };
  standings: Array<{
    stage: string;
    type: string;
    group: string | null;
    table: Array<{
      position: number;
      team: {
        id: number;
        name: string;
        shortName: string;
        tla: string;
        crest: string;
      };
      playedGames: number;
      form: string | null;
      won: number;
      draw: number;
      lost: number;
      points: number;
      goalsFor: number;
      goalsAgainst: number;
      goalDifference: number;
    }>;
  }>;
}

export interface FootballDataTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  venue?: string;
  country?: string;
}

export interface FootballDataScorer {
  player: {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    nationality: string;
  };
  team: {
    id: number;
    name: string;
    shortName: string;
    tla?: string;
    crest: string;
  };
  goals: number;
  assists?: number;
}

// Map Football-Data status to our MatchStatus
function mapStatus(fdStatus: string): Match['status'] {
  const statusMap: Record<string, Match['status']> = {
    'SCHEDULED': 'SCHEDULED',
    'TIMED': 'SCHEDULED',
    'POSTPONED': 'POSTPONED',
    'SUSPENDED': 'SUSPENDED',
    'CANCELLED': 'CANCELLED',
    'IN_PLAY': 'IN_PLAY',
    'PAUSED': 'PAUSED',
    'FINISHED': 'FINISHED',
    'AWARDED': 'FINISHED',
    'LIVE': 'LIVE',
  };
  return statusMap[fdStatus] || 'SCHEDULED';
}

// Transform Football-Data match to our Match type
function transformMatch(match: FootballDataMatch): Match {
  return {
    id: match.id,
    date: match.utcDate,
    time: new Date(match.utcDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    timestamp: new Date(match.utcDate).getTime(),
    status: mapStatus(match.status),
    venue: match.venue,
    competition: {
      id: match.competition.id,
      name: match.competition.name,
      code: match.competition.code,
      emblem: match.competition.emblem,
      type: 'WORLD_CUP',
    },
    homeTeam: {
      team: {
        id: match.homeTeam.id,
        name: match.homeTeam.name,
        shortName: match.homeTeam.shortName,
        code: match.homeTeam.tla,
        logo: match.homeTeam.crest,
      },
      goals: match.score.fullTime.home ?? undefined,
    },
    awayTeam: {
      team: {
        id: match.awayTeam.id,
        name: match.awayTeam.name,
        shortName: match.awayTeam.shortName,
        code: match.awayTeam.tla,
        logo: match.awayTeam.crest,
      },
      goals: match.score.fullTime.away ?? undefined,
    },
    score: {
      home: match.score.fullTime.home ?? 0,
      away: match.score.fullTime.away ?? 0,
      halftime: match.score.halfTime.home !== null ? {
        home: match.score.halfTime.home,
        away: match.score.halfTime.away ?? 0,
      } : undefined,
      fulltime: match.score.fullTime.home !== null ? {
        home: match.score.fullTime.home,
        away: match.score.fullTime.away ?? 0,
      } : undefined,
      extraTime: match.score.extraTime?.home !== null && match.score.extraTime?.home !== undefined ? {
        home: match.score.extraTime.home,
        away: match.score.extraTime.away ?? 0,
      } : undefined,
      penalties: match.score.penalties?.home !== null && match.score.penalties?.home !== undefined ? {
        home: match.score.penalties.home,
        away: match.score.penalties.away ?? 0,
      } : undefined,
    },
  };
}

// Football API Service
export const footballApi = {
  /**
   * Get World Cup matches
   */
  async getMatches(params: MatchQueryParams = {}): Promise<Match[]> {
    // If no API key, use mock data
    if (!FOOTBALL_DATA_KEY) {
      console.log('No Football-Data API key, using mock data');
      return getMockMatches();
    }

    try {
      let endpoint = `/competitions/${WORLD_CUP_ID}/matches?limit=50`;
      
      if (params.from && params.to) {
        endpoint = `/competitions/${WORLD_CUP_ID}/matches?dateFrom=${params.from}&dateTo=${params.to}&limit=50`;
      }

      const data = await fetchFromFootballData<{ matches: FootballDataMatch[] }>(endpoint);
      return data.matches.map(transformMatch);
    } catch (error) {
      console.error('Failed to fetch matches from Football-Data:', error);
      return getMockMatches();
    }
  },

  /**
   * Get live matches
   */
  async getLiveMatches(): Promise<Match[]> {
    if (!FOOTBALL_DATA_KEY) {
      return getMockMatches().filter(m => m.status === 'LIVE' || m.status === 'IN_PLAY');
    }

    try {
      const data = await fetchFromFootballData<{ matches: FootballDataMatch[] }>(
        `/competitions/${WORLD_CUP_ID}/matches?status=LIVE`
      );
      return data.matches.map(transformMatch);
    } catch (error) {
      console.error('Failed to fetch live matches:', error);
      return getMockMatches().filter(m => m.status === 'LIVE' || m.status === 'IN_PLAY');
    }
  },

  /**
   * Get upcoming matches
   */
  async getUpcomingMatches(limit = 10): Promise<Match[]> {
    if (!FOOTBALL_DATA_KEY) {
      return getMockMatches().filter(m => m.status === 'SCHEDULED').slice(0, limit);
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const data = await fetchFromFootballData<{ matches: FootballDataMatch[] }>(
        `/competitions/${WORLD_CUP_ID}/matches?dateFrom=${today}&dateTo=${nextWeek}&status=SCHEDULED`
      );
      return data.matches.slice(0, limit).map(transformMatch);
    } catch (error) {
      console.error('Failed to fetch upcoming matches:', error);
      return getMockMatches().filter(m => m.status === 'SCHEDULED').slice(0, limit);
    }
  },

  /**
   * Get completed matches
   */
  async getCompletedMatches(limit = 10): Promise<Match[]> {
    if (!FOOTBALL_DATA_KEY) {
      return getMockMatches().filter(m => m.status === 'FINISHED').slice(0, limit);
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const data = await fetchFromFootballData<{ matches: FootballDataMatch[] }>(
        `/competitions/${WORLD_CUP_ID}/matches?dateFrom=${lastWeek}&dateTo=${today}&status=FINISHED`
      );
      return data.matches.slice(0, limit).map(transformMatch);
    } catch (error) {
      console.error('Failed to fetch completed matches:', error);
      return getMockMatches().filter(m => m.status === 'FINISHED').slice(0, limit);
    }
  },

  /**
   * Get standings
   */
  async getStandings(): Promise<Standing[]> {
    if (!FOOTBALL_DATA_KEY) {
      return getMockStandings();
    }

    try {
      const data = await fetchFromFootballData<FootballDataStandings>(
        `/competitions/${WORLD_CUP_ID}/standings`
      );

      return [{
        league: {
          id: data.competition.id,
          name: data.competition.name,
          code: data.competition.code,
          emblem: data.competition.emblem,
          type: 'WORLD_CUP',
        },
        season: data.season.startDate.split('-')[0],
        stage: 'Group Stage',
        standings: data.standings.map(s => ({
          stage: s.stage,
          type: s.type as 'TOTAL' | 'HOME' | 'AWAY',
          group: s.group || undefined,
          table: s.table.map(entry => ({
            position: entry.position,
            team: {
              id: entry.team.id,
              name: entry.team.name,
              shortName: entry.team.shortName,
              code: entry.team.tla,
              logo: entry.team.crest,
            },
            playedGames: entry.playedGames,
            form: entry.form || '',
            won: entry.won,
            draw: entry.draw,
            lost: entry.lost,
            points: entry.points,
            goalsFor: entry.goalsFor,
            goalsAgainst: entry.goalsAgainst,
            goalDifference: entry.goalDifference,
          })),
        })),
      }];
    } catch (error) {
      console.error('Failed to fetch standings:', error);
      return getMockStandings();
    }
  },

  /**
   * Get teams
   */
  async getTeams(): Promise<Team[]> {
    if (!FOOTBALL_DATA_KEY) {
      return getMockTeams();
    }

    try {
      const data = await fetchFromFootballData<{ teams: FootballDataTeam[] }>(
        `/competitions/${WORLD_CUP_ID}/teams`
      );

      return data.teams.map(team => ({
        id: team.id,
        name: team.name,
        shortName: team.shortName,
        code: team.tla,
        logo: team.crest,
        country: team.country,
        venue: team.venue,
      }));
    } catch (error) {
      console.error('Failed to fetch teams:', error);
      return getMockTeams();
    }
  },

  /**
   * Get top scorers
   */
  async getTopScorers(): Promise<TopScorer[]> {
    if (!FOOTBALL_DATA_KEY) {
      return getMockTopScorers();
    }

    try {
      const data = await fetchFromFootballData<{ scorers: FootballDataScorer[] }>(
        `/competitions/${WORLD_CUP_ID}/scorers?limit=10`
      );

      return data.scorers.map((scorer, index) => ({
        position: index + 1,
        player: {
          id: 0,
          name: scorer.player.name,
          firstName: scorer.player.firstName,
          lastName: scorer.player.lastName,
          position: '',
          nationality: scorer.player.nationality,
          dateOfBirth: '',
          photo: '',
        },
        team: {
          id: scorer.team.id,
          name: scorer.team.name,
          shortName: scorer.team.shortName,
          code: scorer.team.tla || scorer.team.shortName.substring(0, 3).toUpperCase(),
          logo: scorer.team.crest,
        },
        goals: scorer.goals,
        assists: scorer.assists,
      }));
    } catch (error) {
      console.error('Failed to fetch top scorers:', error);
      return getMockTopScorers();
    }
  },

  /**
   * Get single match by ID
   */
  async getMatchById(id: number): Promise<Match | null> {
    if (!FOOTBALL_DATA_KEY) {
      return getMockMatches().find(m => m.id === id) || null;
    }

    try {
      const data = await fetchFromFootballData<FootballDataMatch>(`/matches/${id}`);
      return transformMatch(data);
    } catch (error) {
      console.error('Failed to fetch match:', error);
      return getMockMatches().find(m => m.id === id) || null;
    }
  },
};

// ============================================
// MOCK DATA - Used when no API key is provided
// ============================================

function getMockMatches(): Match[] {
  const teams = getMockTeams();
  
  return [
    {
      id: 1,
      date: new Date(Date.now() + 3600000).toISOString(),
      time: '21:00',
      timestamp: Date.now() + 3600000,
      status: 'SCHEDULED',
      venue: 'MetLife Stadium',
      city: 'East Rutherford',
      country: 'USA',
      competition: {
        id: 1,
        name: 'FIFA World Cup 2026',
        code: 'WC',
        emblem: 'https://upload.wikimedia.org/wikipedia/en/e/e3/2026_FIFA_World_Cup.svg',
        type: 'WORLD_CUP',
      },
      homeTeam: { team: teams[0], winner: undefined },
      awayTeam: { team: teams[1], winner: undefined },
    },
    {
      id: 2,
      date: new Date(Date.now() - 3600000).toISOString(),
      time: '18:00',
      timestamp: Date.now() - 3600000,
      status: 'FINISHED',
      venue: 'SoFi Stadium',
      city: 'Los Angeles',
      country: 'USA',
      competition: {
        id: 1,
        name: 'FIFA World Cup 2026',
        code: 'WC',
        emblem: 'https://upload.wikimedia.org/wikipedia/en/e/e3/2026_FIFA_World_Cup.svg',
        type: 'WORLD_CUP',
      },
      homeTeam: { team: teams[2], goals: 3, winner: true },
      awayTeam: { team: teams[3], goals: 1, winner: false },
      score: {
        home: 3,
        away: 1,
        halftime: { home: 1, away: 0 },
        fulltime: { home: 3, away: 1 },
      },
    },
    {
      id: 3,
      date: new Date().toISOString(),
      time: '20:00',
      timestamp: Date.now(),
      status: 'IN_PLAY',
      venue: 'AT&T Stadium',
      city: 'Dallas',
      country: 'USA',
      competition: {
        id: 1,
        name: 'FIFA World Cup 2026',
        code: 'WC',
        emblem: 'https://upload.wikimedia.org/wikipedia/en/e/e3/2026_FIFA_World_Cup.svg',
        type: 'WORLD_CUP',
      },
      homeTeam: { team: teams[4], goals: 2, winner: undefined },
      awayTeam: { team: teams[5], goals: 1, winner: undefined },
      minute: 65,
    },
    {
      id: 4,
      date: new Date(Date.now() - 7200000).toISOString(),
      time: '16:00',
      timestamp: Date.now() - 7200000,
      status: 'FINISHED',
      venue: 'Mercedes-Benz Stadium',
      city: 'Atlanta',
      country: 'USA',
      competition: {
        id: 1,
        name: 'FIFA World Cup 2026',
        code: 'WC',
        emblem: 'https://upload.wikimedia.org/wikipedia/en/e/e3/2026_FIFA_World_Cup.svg',
        type: 'WORLD_CUP',
      },
      homeTeam: { team: teams[6], goals: 0, winner: false },
      awayTeam: { team: teams[7], goals: 2, winner: true },
      score: {
        home: 0,
        away: 2,
        halftime: { home: 0, away: 1 },
        fulltime: { home: 0, away: 2 },
      },
    },
    {
      id: 5,
      date: new Date(Date.now() + 86400000).toISOString(),
      time: '19:00',
      timestamp: Date.now() + 86400000,
      status: 'SCHEDULED',
      venue: 'BC Place',
      city: 'Vancouver',
      country: 'Canada',
      competition: {
        id: 1,
        name: 'FIFA World Cup 2026',
        code: 'WC',
        emblem: 'https://upload.wikimedia.org/wikipedia/en/e/e3/2026_FIFA_World_Cup.svg',
        type: 'WORLD_CUP',
      },
      homeTeam: { team: teams[8], winner: undefined },
      awayTeam: { team: teams[9], winner: undefined },
    },
    {
      id: 6,
      date: new Date(Date.now() + 172800000).toISOString(),
      time: '18:00',
      timestamp: Date.now() + 172800000,
      status: 'SCHEDULED',
      venue: 'Estadio Azteca',
      city: 'Mexico City',
      country: 'Mexico',
      competition: {
        id: 1,
        name: 'FIFA World Cup 2026',
        code: 'WC',
        emblem: 'https://upload.wikimedia.org/wikipedia/en/e/e3/2026_FIFA_World_Cup.svg',
        type: 'WORLD_CUP',
      },
      homeTeam: { team: teams[10], winner: undefined },
      awayTeam: { team: teams[11], winner: undefined },
    },
  ];
}

function getMockTeams(): Team[] {
  return [
    { id: 1, name: 'Argentina', shortName: 'ARG', code: 'ARG', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_Argentina.svg', country: 'Argentina' },
    { id: 2, name: 'Brazil', shortName: 'BRA', code: 'BRA', logo: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg', country: 'Brazil' },
    { id: 3, name: 'France', shortName: 'FRA', code: 'FRA', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg', country: 'France' },
    { id: 4, name: 'Germany', shortName: 'GER', code: 'GER', logo: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg', country: 'Germany' },
    { id: 5, name: 'Spain', shortName: 'ESP', code: 'ESP', logo: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg', country: 'Spain' },
    { id: 6, name: 'England', shortName: 'ENG', code: 'ENG', logo: 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg', country: 'England' },
    { id: 7, name: 'Italy', shortName: 'ITA', code: 'ITA', logo: 'https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg', country: 'Italy' },
    { id: 8, name: 'Netherlands', shortName: 'NED', code: 'NED', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg', country: 'Netherlands' },
    { id: 9, name: 'Portugal', shortName: 'POR', code: 'POR', logo: 'https://upload.wikimedia.org/wikipedia/en/5/5c/Flag_of_Portugal.svg', country: 'Portugal' },
    { id: 10, name: 'Belgium', shortName: 'BEL', code: 'BEL', logo: 'https://upload.wikimedia.org/wikipedia/en/6/65/Flag_of_Belgium.svg', country: 'Belgium' },
    { id: 11, name: 'Mexico', shortName: 'MEX', code: 'MEX', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg', country: 'Mexico' },
    { id: 12, name: 'USA', shortName: 'USA', code: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg', country: 'USA' },
  ];
}

function getMockStandings(): Standing[] {
  const teams = getMockTeams();
  return [{
    league: {
      id: 1,
      name: 'FIFA World Cup 2026',
      code: 'WC',
      emblem: 'https://upload.wikimedia.org/wikipedia/en/e/e3/2026_FIFA_World_Cup.svg',
      type: 'WORLD_CUP',
      country: 'USA/Canada/Mexico',
    },
    season: '2026',
    stage: 'Group Stage',
    standings: [
      {
        stage: 'Group A',
        type: 'TOTAL',
        group: 'Group A',
        table: [
          { position: 1, team: teams[0], playedGames: 2, form: 'WW', won: 2, draw: 0, lost: 0, points: 6, goalsFor: 5, goalsAgainst: 1, goalDifference: 4 },
          { position: 2, team: teams[2], playedGames: 2, form: 'LW', won: 1, draw: 0, lost: 1, points: 3, goalsFor: 3, goalsAgainst: 2, goalDifference: 1 },
          { position: 3, team: teams[4], playedGames: 2, form: 'WL', won: 1, draw: 0, lost: 1, points: 3, goalsFor: 2, goalsAgainst: 3, goalDifference: -1 },
          { position: 4, team: teams[6], playedGames: 2, form: 'LL', won: 0, draw: 0, lost: 2, points: 0, goalsFor: 1, goalsAgainst: 5, goalDifference: -4 },
        ],
      },
      {
        stage: 'Group B',
        type: 'TOTAL',
        group: 'Group B',
        table: [
          { position: 1, team: teams[1], playedGames: 2, form: 'WW', won: 2, draw: 0, lost: 0, points: 6, goalsFor: 6, goalsAgainst: 1, goalDifference: 5 },
          { position: 2, team: teams[3], playedGames: 2, form: 'LW', won: 1, draw: 0, lost: 1, points: 3, goalsFor: 3, goalsAgainst: 2, goalDifference: 1 },
          { position: 3, team: teams[5], playedGames: 2, form: 'WL', won: 1, draw: 0, lost: 1, points: 3, goalsFor: 2, goalsAgainst: 3, goalDifference: -1 },
          { position: 4, team: teams[7], playedGames: 2, form: 'LL', won: 0, draw: 0, lost: 2, points: 0, goalsFor: 0, goalsAgainst: 5, goalDifference: -5 },
        ],
      },
    ],
  }];
}

function getMockTopScorers(): TopScorer[] {
  const teams = getMockTeams();
  return [
    { position: 1, player: { id: 1, name: 'Lionel Messi', firstName: 'Lionel', lastName: 'Messi', position: 'Forward', nationality: 'Argentina', dateOfBirth: '1987-06-24', photo: '' }, team: teams[0], goals: 5, assists: 3, penalties: 1, matchesPlayed: 4 },
    { position: 2, player: { id: 2, name: 'Kylian Mbappé', firstName: 'Kylian', lastName: 'Mbappé', position: 'Forward', nationality: 'France', dateOfBirth: '1998-12-20', photo: '' }, team: teams[2], goals: 4, assists: 2, penalties: 0, matchesPlayed: 4 },
    { position: 3, player: { id: 3, name: 'Neymar Jr', firstName: 'Neymar', lastName: 'Jr', position: 'Forward', nationality: 'Brazil', dateOfBirth: '1992-02-05', photo: '' }, team: teams[1], goals: 3, assists: 4, penalties: 0, matchesPlayed: 4 },
    { position: 4, player: { id: 4, name: 'Harry Kane', firstName: 'Harry', lastName: 'Kane', position: 'Forward', nationality: 'England', dateOfBirth: '1993-07-28', photo: '' }, team: teams[5], goals: 3, assists: 1, penalties: 2, matchesPlayed: 4 },
    { position: 5, player: { id: 5, name: 'Erling Haaland', firstName: 'Erling', lastName: 'Haaland', position: 'Forward', nationality: 'Norway', dateOfBirth: '2000-07-21', photo: '' }, team: teams[3], goals: 2, assists: 2, penalties: 0, matchesPlayed: 4 },
  ];
}

export default footballApi;
