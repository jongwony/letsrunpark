"use client";

import { useResults } from "@/lib/hooks/useResults";
import type { MeetCode, RaceResultEntry } from "@/lib/types";

interface RaceResultsProps {
  meet: MeetCode;
  date: string;
  rcNo: number;
}

/** Medal colors: gold=#F59E0B, silver=#9CA3AF, bronze=#D97706 */
const MEDAL_STYLES: Record<number, string> = {
  1: "bg-[#F59E0B] text-white",
  2: "bg-[#9CA3AF] text-white",
  3: "bg-[#D97706] text-white",
};

function formatFinishTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const secsStr = secs < 10 ? `0${secs.toFixed(1)}` : secs.toFixed(1);
  return `${mins}:${secsStr}`;
}

export function RaceResults({ meet, date, rcNo }: RaceResultsProps) {
  const { data, isLoading, error } = useResults(meet, date, rcNo);

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-400">로딩 중...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        결과 데이터를 불러올 수 없습니다.
      </div>
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-lg font-medium mb-2">아직 결과가 없습니다.</div>
        <div className="text-sm">경주 종료 후 결과가 표시됩니다.</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {data.results.map((entry) => (
        <ResultRow key={entry.hr_no} entry={entry} />
      ))}
    </div>
  );
}

function ResultRow({ entry }: { entry: RaceResultEntry }) {
  const isTopThree = entry.rank >= 1 && entry.rank <= 3;
  const rankStyle = MEDAL_STYLES[entry.rank] ?? "bg-gray-100 text-gray-600";

  return (
    <div className="px-4 py-3 rounded-xl bg-white shadow-sm">
      <div className="flex items-center gap-3">
        {/* Rank badge */}
        <div
          className={`flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs shrink-0 ${rankStyle}`}
        >
          {entry.rank}
        </div>

        {/* Horse info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{entry.gate_no}번</span>
            <span className="font-bold text-gray-900 truncate">
              {entry.hr_name}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-0.5 text-sm text-gray-500">
            <span className="text-gray-700 font-medium">
              {entry.jockey_name}
            </span>
            {entry.margin && (
              <span className="text-gray-400">{entry.margin}</span>
            )}
          </div>

          {/* Odds for top 3 */}
          {isTopThree && (
            <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
              {entry.win_odds != null && entry.win_odds > 0 && (
                <span>
                  단승{" "}
                  <span className="text-gray-700 font-medium tabular-nums">
                    {entry.win_odds.toFixed(1)}배
                  </span>
                </span>
              )}
              {entry.plc_odds != null && entry.plc_odds > 0 && (
                <span>
                  연승{" "}
                  <span className="text-gray-700 font-medium tabular-nums">
                    {entry.plc_odds.toFixed(1)}배
                  </span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Finish time — right-aligned */}
        <div className="text-right shrink-0">
          {entry.finish_time > 0 ? (
            <span className="text-sm font-medium text-gray-700 tabular-nums">
              {formatFinishTime(entry.finish_time)}
            </span>
          ) : (
            <span className="text-sm text-gray-400">---</span>
          )}
        </div>
      </div>
    </div>
  );
}
