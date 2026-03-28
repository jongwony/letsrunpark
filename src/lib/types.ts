// Meet codes
export type MeetCode = 1 | 3; // 1=서울, 3=부산경남

// Schedule
export interface RaceScheduleResponse {
  meet: MeetCode;
  meet_name: string;
  date: string; // YYYYMMDD
  day_of_week: string;
  races: RaceSummary[];
}

export interface RaceSummary {
  rc_no: number;
  rc_name: string;
  distance: number;
  grade: string;
  post_time: string;
  entry_count: number;
  prize: number;
  status: "scheduled" | "finished" | "cancelled";
}

// Race Card
export interface RaceCardResponse {
  meet: MeetCode;
  date: string;
  rc_no: number;
  rc_name: string;
  distance: number;
  grade: string;
  entries: HorseEntry[];
}

export interface HorseEntry {
  hr_no: string;
  hr_name: string;
  gate_no: number;
  jockey: { name: string; no: string; recent_win_rate: number };
  trainer: { name: string; no: string; recent_win_rate: number };
  weight: number;
  age: number;
  sex: string;
  rating: number;
  recent_results: string[];
  total_record: {
    starts: number;
    wins: number;
    seconds: number;
    thirds: number;
  };
  distance_record: {
    starts: number;
    wins: number;
    seconds: number;
    thirds: number;
  };
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

// Results (Phase 3+)
export interface ResultsResponse {
  meet: MeetCode;
  date: string;
  rc_no: number;
  results: RaceResultEntry[];
  dividends: Record<string, { combination: string; amount: number }[]>;
}

export interface RaceResultEntry {
  hr_no: string;
  hr_name: string;
  ord: number;
  rc_time: string;
  odds_win: number;
  odds_plc: number;
}
