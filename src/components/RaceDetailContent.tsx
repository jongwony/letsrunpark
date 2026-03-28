"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RaceCard } from "@/components/RaceCard";
import { RaceCardSkeleton } from "@/components/Skeleton";
import { useRaceCard } from "@/lib/hooks/useRaceCard";
import { formatRaceDate, MEET_NAMES, cn } from "@/lib/utils";
import { GRADE_COLORS } from "@/lib/constants";
import type { MeetCode } from "@/lib/types";

interface RaceDetailContentProps {
  meet: MeetCode;
  date: string;
  rcNo: number;
}

export function RaceDetailContent({ meet, date, rcNo }: RaceDetailContentProps) {
  const { data, isLoading, error } = useRaceCard(meet, date, rcNo);

  return (
    <div className="space-y-4">
      {/* Back navigation */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {MEET_NAMES[meet]} {formatRaceDate(date)}
      </Link>

      {/* Race header */}
      {data && (
        <div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white font-bold">
              {rcNo}R
            </div>
            <div>
              <h1 className="text-xl font-bold">{data.rc_name}</h1>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <span>{data.distance}m</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    GRADE_COLORS[data.grade] || "text-gray-600 bg-gray-50"
                  )}
                >
                  {data.grade}
                </span>
                <span>{data.entry_count}두 출전</span>
              </div>
              {(data.track || data.weather) && (
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                  {data.track && <span>{data.track}</span>}
                  {data.weather && <span>{data.weather}</span>}
                  {data.budam && <span>{data.budam}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab placeholder (Phase 4: 출전표 / 추천 / 결과) */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
        <button className="flex-1 py-2 text-sm font-semibold rounded-lg bg-white shadow-sm">
          출전표
        </button>
        <button className="flex-1 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50">
          추천
        </button>
        <button className="flex-1 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50">
          결과
        </button>
      </div>

      {/* Race card */}
      {isLoading ? (
        <RaceCardSkeleton />
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          데이터를 불러올 수 없습니다.
        </div>
      ) : data ? (
        <RaceCard entries={data.entries} />
      ) : null}
    </div>
  );
}
