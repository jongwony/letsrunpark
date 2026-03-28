import { cn, winRate } from "@/lib/utils";
import type { HorseEntry } from "@/lib/types";

interface RaceCardProps {
  entries: HorseEntry[];
  distance: number;
}

export function RaceCard({ entries, distance: _distance }: RaceCardProps) {
  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <HorseEntryRow key={entry.hr_no} entry={entry} />
      ))}
    </div>
  );
}

function HorseEntryRow({ entry }: { entry: HorseEntry }) {
  const { total_record: tr } = entry;

  return (
    <div className="p-4 rounded-xl bg-white border border-gray-100">
      <div className="flex items-start gap-3">
        {/* Gate number */}
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white font-bold text-sm shrink-0">
          {entry.gate_no}
        </div>

        {/* Horse info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 truncate">{entry.hr_name}</span>
            <span className="text-xs text-gray-400">{entry.sex}{entry.age}세</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
              R{entry.rating}
            </span>
          </div>

          {/* Jockey & Trainer */}
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
            <span>기수 <span className="text-gray-700 font-medium">{entry.jockey.name}</span></span>
            <span>조교사 <span className="text-gray-700 font-medium">{entry.trainer.name}</span></span>
            <span>{entry.weight}kg</span>
          </div>

          {/* Recent results */}
          <div className="flex items-center gap-1 mt-2">
            {entry.recent_results.slice(0, 5).map((r, i) => (
              <span
                key={i}
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  r === "1" && "bg-yellow-400 text-yellow-900",
                  r === "2" && "bg-gray-300 text-gray-700",
                  r === "3" && "bg-orange-200 text-orange-800",
                  !["1", "2", "3"].includes(r) && "bg-gray-100 text-gray-500"
                )}
              >
                {r}
              </span>
            ))}
          </div>

          {/* Record summary */}
          <div className="mt-2 text-xs text-gray-400">
            통산 {tr.starts}전 {tr.wins}승 {tr.seconds}복 {tr.thirds}준 · 승률 {winRate(tr.wins, tr.starts)}
          </div>
        </div>
      </div>
    </div>
  );
}
