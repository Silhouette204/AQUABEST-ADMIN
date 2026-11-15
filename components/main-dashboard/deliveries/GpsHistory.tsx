import { Check } from "lucide-react";
import { formatCoords, type GpsPoint } from "./deliveries";

export function GpsHistory({ points }: { points: GpsPoint[] }) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">GPS history</h2>
        <button className="text-sm font-medium text-tertiary">View full route</button>
      </div>

      {points.length === 0 ? (
        <p className="mt-4 text-sm text-secondary/60">No GPS data for this delivery.</p>
      ) : (
        <ol className="mt-4 space-y-4">
          {points.map((p) => (
            <li key={p.label} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check size={12} />
              </span>
              <div>
                <p className="text-sm font-medium">{p.label}</p>
                <p className="text-xs text-secondary/60">
                  {p.time} · {formatCoords(p.lat, p.lng)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}