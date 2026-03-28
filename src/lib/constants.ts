import type { MeetCode } from "./types";

export const MEETS: { code: MeetCode; name: string }[] = [
  { code: 1, name: "서울" },
  { code: 3, name: "부산경남" },
];

export const GRADE_COLORS: Record<string, string> = {
  "국1": "text-red-600 bg-red-50",
  "국2": "text-orange-600 bg-orange-50",
  "국3": "text-yellow-600 bg-yellow-50",
  "국4": "text-green-600 bg-green-50",
  "국5": "text-blue-600 bg-blue-50",
  "국6": "text-gray-600 bg-gray-50",
};

export const BET_TYPE_LABELS: Record<string, string> = {
  "단승": "단승 (Win)",
  "복승": "복승 (Place)",
  "연승": "연승 (Show)",
};
