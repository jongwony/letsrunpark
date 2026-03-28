import type { HorseEntry } from "@/lib/types";

interface RaceCardProps {
  entries: HorseEntry[];
}

export function RaceCard({ entries }: RaceCardProps) {
  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <HorseEntryRow key={entry.hr_no} entry={entry} />
      ))}
    </div>
  );
}

function HorseEntryRow({ entry }: { entry: HorseEntry }) {
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
            {entry.rating > 0 && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                R{entry.rating}
              </span>
            )}
          </div>

          {/* Jockey, Trainer, Weight */}
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
            <span>
              기수 <span className="text-gray-700 font-medium">{entry.jockey.name}</span>
            </span>
            <span>
              조교사 <span className="text-gray-700 font-medium">{entry.trainer.name}</span>
            </span>
            {entry.weight > 0 && <span>{entry.weight}kg</span>}
          </div>

          {/* Owner */}
          {entry.owner && (
            <div className="mt-1 text-xs text-gray-400">
              마주 {entry.owner}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
