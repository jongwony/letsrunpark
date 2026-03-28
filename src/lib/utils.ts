import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";
import type { MeetCode } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MEET_NAMES: Record<MeetCode, string> = {
  1: "서울",
  3: "부산경남",
};

export function formatRaceDate(dateStr: string): string {
  const date = parse(dateStr, "yyyyMMdd", new Date());
  return format(date, "M월 d일 (EEE)", { locale: ko });
}

export function todayString(): string {
  return format(new Date(), "yyyyMMdd");
}

export function formatPrize(prize: number): string {
  if (prize >= 100_000_000) return `${(prize / 100_000_000).toFixed(1)}억`;
  if (prize >= 10_000) return `${(prize / 10_000).toFixed(0)}만`;
  return prize.toLocaleString();
}

export function winRate(wins: number, starts: number): string {
  if (starts === 0) return "-";
  return `${((wins / starts) * 100).toFixed(1)}%`;
}
