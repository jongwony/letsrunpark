"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RaceCard } from "@/components/RaceCard";
import { RaceResults } from "@/components/RaceResults";
import { RaceCardSkeleton } from "@/components/Skeleton";
import { useRaceCard } from "@/lib/hooks/useRaceCard";
import { formatRaceDate, MEET_NAMES, cn } from "@/lib/utils";
import { GRADE_COLORS } from "@/lib/constants";
import type { MeetCode } from "@/lib/types";

type TabId = "entries" | "scores" | "results";

const TABS: { id: TabId; label: string }[] = [
  { id: "entries", label: "출전표" },
  { id: "scores", label: "추천" },
  { id: "results", label: "결과" },
];

interface RaceDetailContentProps {
  meet: MeetCode;
  date: string;
  rcNo: number;
}

export function RaceDetailContent({ meet, date, rcNo }: RaceDetailContentProps) {
  const [activeTab, setActiveTab] = useState<TabId>("entries");
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
                {data.start_time && (
                  <span className="text-gray-400">발주 {data.start_time}</span>
                )}
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

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-stone-100 rounded-xl">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-2 text-sm rounded-lg",
              activeTab === tab.id
                ? "bg-white shadow-sm font-semibold"
                : "text-gray-500 hover:bg-stone-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "entries" && (
        <>
          {isLoading ? (
            <RaceCardSkeleton />
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              데이터를 불러올 수 없습니다.
            </div>
          ) : data ? (
            <RaceCard entries={data.entries} />
          ) : null}
        </>
      )}

      {activeTab === "scores" && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-lg font-medium mb-2">추천 준비 중</div>
          <div className="text-sm">통계 기반 유력마 추천 기능이 곧 제공됩니다.</div>
        </div>
      )}

      {activeTab === "results" && (
        <RaceResults meet={meet} date={date} rcNo={rcNo} />
      )}
    </div>
  );
}
