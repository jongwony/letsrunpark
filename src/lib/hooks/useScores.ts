"use client";

import { useQuery } from "@tanstack/react-query";
import { getScores } from "@/lib/api";
import type { MeetCode } from "@/lib/types";

export function useScores(meet: MeetCode, date: string, rcNo: number) {
  return useQuery({
    queryKey: ["scores", meet, date, rcNo],
    queryFn: () => getScores(meet, date, rcNo),
    staleTime: 5 * 60 * 1000,
    enabled: !!date && rcNo > 0,
  });
}
