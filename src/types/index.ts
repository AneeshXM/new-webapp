// Common Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

// Match Types
export interface Team {
  id: number;
  name: string;
  shortName: string;
  code: string;
  logo: string;
  country?: string;
  founded?: number;
  venue?: string;
  squad?: Player[];
}

export interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  nationality: string;
  dateOfBirth: string;
  photo: string;
  number?: number;
  stats?: PlayerStats;
}

export interface PlayerStats {
  goals: number;
  assists: number;
  appearances: number;
  minutesPlayed: number;
  yellowCards: number;
  redCards: number;
}

export interface Match {
  id: number;
  date: string;
  time: string;
  timestamp: number;
  status: MatchStatus;
  venue?: string;
  city?: string;
  country?: string;
  competition: Competition;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  score?: MatchScore;
  events?: MatchEvent[];
  statistics?: MatchStatistics;
  minute?: number;
  addedTime?: number;
  isExtraTime?: boolean;
  isPenalties?: boolean;
}

export type MatchStatus = 
  | 'SCHEDULED' 
  | 'LIVE' 
  | 'IN_PLAY' 
  | 'PAUSED' 
  | 'FINISHED' 
  | 'FINISHED_AFTER_EXTRA_TIME'
  | 'FINISHED_AFTER_PENALTIES'
  | 'POSTPONED'
  | 'CANCELLED'
  | 'SUSPENDED'
  | 'INTERRUPTED';

export interface MatchTeam {
  team: Team;
  goals?: number;
  penalties?: number;
  winner?: boolean;
}

export interface MatchScore {
  home: number;
  away: number;
  halftime?: {
    home: number;
    away: number;
  };
  fulltime?: {
    home: number;
    away: number;
  };
  extraTime?: {
    home: number;
    away: number;
  };
  penalties?: {
    home: number;
    away: number;
  };
}

export interface MatchEvent {
  id: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'var' | 'penalty' | 'missed_penalty';
  minute: number;
  addedTime?: number;
  player: string;
  playerId?: number;
  assist?: string;
  assistId?: number;
  team: 'home' | 'away';
  text?: string;
}

export interface MatchStatistics {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
  offsides: { home: number; away: number };
  saves: { home: number; away: number };
}

// Standings Types
export interface Standing {
  league: Competition;
  season: string;
  stage: string;
  group?: string;
  standings: StandingData[];
}

export interface StandingData {
  stage: string;
  type: 'TOTAL' | 'HOME' | 'AWAY';
  group?: string;
  table: TableEntry[];
}

export interface TableEntry {
  position: number;
  team: Team;
  playedGames: number;
  form: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  home?: StandingStats;
  away?: StandingStats;
}

export interface StandingStats {
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

// Competition Types
export interface Competition {
  id: number;
  name: string;
  code: string;
  emblem: string;
  type: 'DOMESTIC' | 'INTERNATIONAL' | 'WORLD_CUP';
  country?: string;
}

// News Types
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  author?: string;
  source: NewsSource;
  image?: string;
  url: string;
  publishedAt: string;
  category?: string;
  related?: string[];
}

export interface NewsSource {
  id?: string;
  name: string;
  url?: string;
  logo?: string;
}

export interface NewsFilters {
  query?: string;
  category?: string;
  source?: string;
  from?: string;
  to?: string;
  language?: string;
  country?: string;
  page?: number;
}

// Group Types (World Cup specific)
export interface WorldCupGroup {
  name: string;
  teams: TableEntry[];
  matches?: Match[];
}

export interface WorldCupData {
  groups: WorldCupGroup[];
  roundOf16: Match[];
  quarterFinals: Match[];
  semiFinals: Match[];
  thirdPlace: Match;
  final: Match;
}

// Top Scorers Types
export interface TopScorer {
  position: number;
  player: Player;
  team: Team;
  goals: number;
  assists?: number;
  penalties?: number;
  minutesPlayed?: number;
  matchesPlayed?: number;
}

// API Response Wrappers
export interface FixturesResponse {
  matches: Match[];
  competitions: Competition[];
}

export interface StandingsResponse {
  standings: Standing[];
}

export interface TeamsResponse {
  teams: Team[];
  count: number;
}

export interface NewsResponse {
  articles: NewsArticle[];
  pagination?: Pagination;
  totalResults?: number;
}

// Utility Types
export type MatchFilter = 'all' | 'live' | 'completed' | 'upcoming';
export type DateRange = 'today' | 'tomorrow' | 'week' | 'month' | 'custom';

export interface MatchQueryParams {
  date?: string;
  from?: string;
  to?: string;
  status?: MatchStatus[];
  competition?: number;
  team?: number;
  venue?: 'home' | 'away' | 'all';
  limit?: number;
  page?: number;
}
