"use client";

import { cn } from "@/lib/utils";
import type { MeetCode } from "@/lib/types";

const venues: { code: MeetCode; name: string }[] = [
  { code: 1, name: "서울" },
  { code: 3, name: "부산경남" },
];

interface VenueSelectorProps {
  selected: MeetCode;
  onSelect: (meet: MeetCode) => void;
}

export function VenueSelector({ selected, onSelect }: VenueSelectorProps) {
  return (
    <div className="flex gap-2">
      {venues.map((v) => (
        <button
          key={v.code}
          onClick={() => onSelect(v.code)}
          className={cn(
            "px-6 py-3 rounded-xl text-base font-semibold transition-all",
            selected === v.code
              ? "bg-gray-900 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          {v.name}
        </button>
      ))}
    </div>
  );
}
