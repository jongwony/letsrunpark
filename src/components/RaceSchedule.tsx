"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatPrize } from "@/lib/utils";
import { GRADE_COLORS } from "@/lib/constants";
import type { RaceSummary, MeetCode } from "@/lib/types";
import { Clock, Users } from "lucide-react";

interface RaceScheduleProps {
  races: RaceSummary[];
  meet: MeetCode;
  date: string;
}

export function RaceSchedule({ races, meet, date }: RaceScheduleProps) {
  if (races.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        해당 일자에 경주가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {races.map((race) => (
        <Link
          key={race.rc_no}
          href={`/race/${meet}/${date}/${race.rc_no}`}
          className={cn(
            "block p-4 rounded-2xl border border-gray-100 bg-white",
            "hover:border-gray-300 hover:shadow-md transition-all",
            "active:scale-[0.98]"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white font-bold text-sm">
                {race.rc_no}R
              </div>
              <div>
                <div className="font-semibold text-gray-900">{race.rc_name}</div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <span>{race.distance}m</span>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", GRADE_COLORS[race.grade] || "text-gray-600 bg-gray-50")}>
                    {race.grade}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{race.post_time}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                <Users className="w-3.5 h-3.5" />
                <span>{race.entry_count}두</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            1착 상금 {formatPrize(race.prize)}
          </div>
        </Link>
      ))}
    </div>
  );
}
