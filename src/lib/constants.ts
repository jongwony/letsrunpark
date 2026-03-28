import type { MeetCode } from "./types";

export const MEETS: { code: MeetCode; name: string }[] = [
  { code: 1, name: "서울" },
  { code: 3, name: "부산경남" },
];

export const GRADE_COLORS: Record<string, string> = {
  // Full grade names from API (e.g., "국6등급", "혼4등급", "2등급")
  "1등급": "text-red-700 bg-red-50",
  "2등급": "text-red-600 bg-red-50",
  "국3등급": "text-orange-600 bg-orange-50",
  "혼3등급": "text-orange-600 bg-orange-50",
  "국4등급": "text-yellow-600 bg-yellow-50",
  "혼4등급": "text-yellow-600 bg-yellow-50",
  "국5등급": "text-green-600 bg-green-50",
  "혼5등급": "text-green-600 bg-green-50",
  "국6등급": "text-blue-600 bg-blue-50",
  "혼6등급": "text-blue-600 bg-blue-50",
};

export const BET_TYPE_LABELS: Record<string, string> = {
  "단승": "단승 (Win)",
  "복승": "복승 (Place)",
  "연승": "연승 (Show)",
};
