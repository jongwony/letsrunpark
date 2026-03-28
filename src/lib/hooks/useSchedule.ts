"use client";

import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "@/lib/api";
import type { MeetCode } from "@/lib/types";

export function useSchedule(meet: MeetCode, date: string) {
  return useQuery({
    queryKey: ["schedule", meet, date],
    queryFn: () => getSchedule(meet, date),
    staleTime: 5 * 60 * 1000,
    enabled: !!date,
  });
}
