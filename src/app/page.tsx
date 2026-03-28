"use client";

import { useState } from "react";
import { VenueSelector } from "@/components/VenueSelector";
import { RaceDayNav } from "@/components/RaceDayNav";
import { RaceSchedule } from "@/components/RaceSchedule";
import { ScheduleSkeleton } from "@/components/Skeleton";
import { useSchedule } from "@/lib/hooks/useSchedule";
import { todayString, MEET_NAMES } from "@/lib/utils";
import type { MeetCode } from "@/lib/types";

export default function HomePage() {
  const [meet, setMeet] = useState<MeetCode>(1);
  const [date, setDate] = useState(todayString);

  const { data, isLoading, error } = useSchedule(meet, date);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">LetsRunPark</h1>
        <p className="text-sm text-gray-500 mt-1">경마 정보 + 유력마 추천</p>
      </div>

      {/* Venue selector */}
      <VenueSelector selected={meet} onSelect={setMeet} />

      {/* Date navigation */}
      <RaceDayNav date={date} onDateChange={setDate} />

      {/* Race list */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          {MEET_NAMES[meet]} 경주
        </h2>
        {isLoading ? (
          <ScheduleSkeleton />
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            데이터를 불러올 수 없습니다.
          </div>
        ) : data ? (
          <RaceSchedule races={data.races} meet={meet} date={date} />
        ) : null}
      </div>
    </div>
  );
}
