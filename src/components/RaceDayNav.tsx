"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { parse, format, addDays, subDays } from "date-fns";
import { formatRaceDate } from "@/lib/utils";

interface RaceDayNavProps {
  date: string; // YYYYMMDD
  onDateChange: (date: string) => void;
}

export function RaceDayNav({ date, onDateChange }: RaceDayNavProps) {
  const parsed = parse(date, "yyyyMMdd", new Date());

  const goTo = (offset: number) => {
    const next = offset > 0 ? addDays(parsed, offset) : subDays(parsed, Math.abs(offset));
    onDateChange(format(next, "yyyyMMdd"));
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => goTo(-1)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="이전 날짜"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-lg font-medium min-w-[140px] text-center">
        {formatRaceDate(date)}
      </span>
      <button
        onClick={() => goTo(1)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="다음 날짜"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
