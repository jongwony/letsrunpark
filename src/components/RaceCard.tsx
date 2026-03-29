"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { HorseEntry } from "@/lib/types";

interface RaceCardProps {
  entries: HorseEntry[];
}

export function RaceCard({ entries }: RaceCardProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (hrNo: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(hrNo)) next.delete(hrNo);
      else next.add(hrNo);
      return next;
    });
  };

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <HorseEntryRow
          key={entry.hr_no}
          entry={entry}
          isExpanded={expanded.has(entry.hr_no)}
          onToggle={() => toggle(entry.hr_no)}
        />
      ))}
    </div>
  );
}

function formatEarnings(raw: number): string {
  if (raw <= 0) return "0";
  // API returns in 원(won); convert to 만원 for display
  const manwon = Math.round(raw / 10000);
  const eok = Math.floor(manwon / 10000);
  const cheon = Math.floor((manwon % 10000) / 1000);
  if (eok > 0 && cheon > 0) return `${eok}억${cheon}천만`;
  if (eok > 0) return `${eok}억`;
  if (manwon > 0) return `${manwon.toLocaleString()}만`;
  if (raw > 0) return "1만 미만";
  return "0";
}

interface HorseEntryRowProps {
  entry: HorseEntry;
  isExpanded: boolean;
  onToggle: () => void;
}

function HorseEntryRow({ entry, isExpanded, onToggle }: HorseEntryRowProps) {
  const hasCareer = entry.career && entry.career.total > 0;
  const winPct = hasCareer
    ? (entry.career!.wins / entry.career!.total) * 100
    : 0;

  return (
    <div className="rounded-xl bg-white shadow-sm">
      {/* L1: Always visible */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Gate number */}
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-900 text-white font-bold text-xs shrink-0">
          {entry.gate_no}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          {/* Row 1: Name + badges + rating */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-gray-900 truncate">
              {entry.hr_name}
            </span>
            <span className="text-xs text-gray-400 shrink-0">
              {entry.sex}{entry.age}
            </span>
            {entry.prd && entry.prd !== "한국" && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 shrink-0">
                {entry.prd}
              </span>
            )}
            <span className="flex-1" />
            {entry.rating > 0 && (
              <span className="text-xs px-1.5 py-0.5 rounded-full border border-gray-200 text-gray-600 font-medium tabular-nums shrink-0">
                R{entry.rating}
              </span>
            )}
          </div>

          {/* Row 2: Jockey + weight */}
          <div className="flex items-center gap-2 mt-0.5 text-sm text-gray-500">
            <span className="text-gray-700 font-medium">
              {entry.jockey.name}
            </span>
            {entry.weight > 0 && (
              <span className="tabular-nums">{entry.weight}kg</span>
            )}
          </div>

          {/* Row 3: Win rate bar */}
          <div className="flex items-center gap-2 mt-1.5">
            {hasCareer ? (
              <>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{
                      width: `${Math.max(winPct, winPct > 0 ? 4 : 0)}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-700 tabular-nums shrink-0">
                  {winPct.toFixed(0)}%
                </span>
                <span className="text-xs text-gray-400 tabular-nums shrink-0">
                  {entry.career!.total}전 {entry.career!.wins}승
                </span>
              </>
            ) : (
              <span className="text-xs text-gray-400">전적 없음</span>
            )}
          </div>
        </div>

        {/* Chevron toggle */}
        <button
          type="button"
          onClick={onToggle}
          className="p-1 -mr-1 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          aria-label={isExpanded ? "상세 접기" : "상세 펼치기"}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* L2: Expandable detail */}
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-3 pt-0">
            <div className="border-t border-gray-100 pt-2.5 grid grid-cols-2 gap-y-1.5 text-sm">
              <DetailItem label="조교사" value={entry.trainer.name} />
              {entry.owner && (
                <DetailItem label="마주" value={entry.owner} />
              )}
              {entry.hr_name_en && (
                <DetailItem label="영문명" value={entry.hr_name_en} />
              )}
              {entry.earnings && entry.earnings.total > 0 && (
                <DetailItem
                  label="총상금"
                  value={formatEarnings(entry.earnings.total)}
                />
              )}
              {entry.career && entry.career.total > 0 && (
                <DetailItem
                  label="전적"
                  value={`${entry.career.total}전 ${entry.career.wins}-${entry.career.seconds}-${entry.career.thirds}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-gray-400 text-xs">{label}</span>{" "}
      <span className="text-gray-700 font-medium text-xs">{value}</span>
    </div>
  );
}
