"use client";

import { useQuery } from "@tanstack/react-query";
import { getRaceCard } from "@/lib/api";
import type { MeetCode } from "@/lib/types";

export function useRaceCard(meet: MeetCode, date: string, rcNo: number) {
  return useQuery({
    queryKey: ["raceCard", meet, date, rcNo],
    queryFn: () => getRaceCard(meet, date, rcNo),
    staleTime: 5 * 60 * 1000,
    enabled: !!date && rcNo > 0,
  });
}
