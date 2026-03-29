// Meet codes
export type MeetCode = 1 | 3; // 1=서울, 3=부산경남

// Schedule
export interface RaceScheduleResponse {
  meet: MeetCode;
  date: string; // YYYYMMDD
  race_count: number;
  races: RaceSummary[];
}

export interface RaceSummary {
  rc_no: number;
  rc_name: string;
  distance: number;
  grade: string;
  entry_count: number;
  prize: number;
  budam: string;
  track: string;
  weather: string;
  // Pre-race fields (API26_2)
  start_time?: string;  // "10:35"
  age_cond?: string;
  sex_cond?: string;
}

// Race Card
export interface RaceCardResponse {
  meet: MeetCode;
  date: string;
  rc_no: number;
  rc_name: string;
  distance: number;
  grade: string;
  budam: string;
  track: string;
  weather: string;
  entry_count: number;
  entries: HorseEntry[];
  // Pre-race fields (API26_2)
  start_time?: string;
}

export interface HorseEntry {
  hr_no: string;
  hr_name: string;
  gate_no: number;
  jockey: { name: string; no: string };
  trainer: { name: string; no: string };
  weight: number;
  age: number;
  sex: string;
  rating: number;
  owner: string;
  // Pre-race fields (API26_2)
  hr_name_en?: string;
  prd?: string;
  ilsu?: number;
  career?: { total: number; wins: number; seconds: number; thirds: number };
  earnings?: { total: number; yearly: number; half_year: number };
}

// Results
export interface ResultsResponse {
  meet: MeetCode;
  date: string;
  rc_no: number;
  results: RaceResultEntry[];
}

export interface RaceResultEntry {
  rank: number;
  gate_no: number;
  hr_no: string;
  hr_name: string;
  jockey_name: string;
  trainer_name: string;
  finish_time: number;
  margin?: string;
  win_odds?: number;
  plc_odds?: number;
}

// Scores (Phase 3+)
export interface ScoresResponse {
  meet: MeetCode;
  date: string;
  rc_no: number;
  scores: HorseScore[];
}

export interface HorseScore {
  rank: number;
  hr_no: string;
  hr_name: string;
  total_score: number;
  factors: Record<
    string,
    { value: number; weight: number; contribution: number }
  >;
  recommendation: "상" | "중" | "하";
}
