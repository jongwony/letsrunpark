import ky from "ky";
import type {
  MeetCode,
  RaceScheduleResponse,
  RaceCardResponse,
  ScoresResponse,
  ResultsResponse,
} from "./types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api";

export const api = ky.create({
  prefixUrl: API_URL,
  timeout: 30000,
});

export async function getSchedule(
  meet: MeetCode,
  date: string
): Promise<RaceScheduleResponse> {
  return api.get(`kra/schedule`, { searchParams: { meet, date } }).json();
}

export async function getRaceCard(
  meet: MeetCode,
  date: string,
  rcNo: number
): Promise<RaceCardResponse> {
  return api.get(`kra/race/${meet}/${date}/${rcNo}`).json();
}

export async function getScores(
  meet: MeetCode,
  date: string,
  rcNo: number
): Promise<ScoresResponse> {
  return api.get(`kra/scores/${meet}/${date}/${rcNo}`).json();
}

export async function getResults(
  meet: MeetCode,
  date: string,
  rcNo: number
): Promise<ResultsResponse> {
  return api.get(`kra/results/${meet}/${date}/${rcNo}`).json();
}
