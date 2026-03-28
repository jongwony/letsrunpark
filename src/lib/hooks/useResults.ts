"use client";

import { useQuery } from "@tanstack/react-query";
import { getResults } from "@/lib/api";
import type { MeetCode } from "@/lib/types";

export function useResults(meet: MeetCode, date: string, rcNo: number) {
  return useQuery({
    queryKey: ["results", meet, date, rcNo],
    queryFn: () => getResults(meet, date, rcNo),
    staleTime: 5 * 60 * 1000,
    enabled: !!date && rcNo > 0,
  });
}
