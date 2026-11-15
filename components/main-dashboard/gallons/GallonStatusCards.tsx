import { STATUS_BADGE, STATUS_ORDER, formatNumber, type GallonStats, type GallonStatus } from "./gallons";

interface Props {
  stats: GallonStats;
  active: GallonStatus | null;
  onSelect: (status: GallonStatus | null) => void;
}

export function GallonStatusCards({ stats, active, onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {STATUS_ORDER.map((s) => {
        const badge = STATUS_BADGE[s];
        const isActive = active === s;
        return (
          <button
            key={s}
            onClick={() => onSelect(isActive ? null : s)}
            className={`flex items-center justify-between rounded-xl border bg-white px-5 py-4 text-left ${
              isActive ? "border-tertiary" : "border-secondary/10"
            }`}
          >
            <span className={`rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>● {badge.label}</span>
            <span className="text-3xl font-bold">{formatNumber(stats[s])}</span>
          </button>
        );
      })}
    </div>
  );
}