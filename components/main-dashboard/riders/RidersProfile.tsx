import { Pencil } from "lucide-react";
import { AVAILABILITY_BADGE, type Rider } from "./riders";

export function RiderProfile({ rider: r }: { rider: Rider }) {
  const badge = AVAILABILITY_BADGE[r.availability];
  const rows: [string, string][] = [
    ["Phone", r.phone],
    ["Username", r.username],
    ["Vehicle", r.vehicle],
    ["Joined", r.joined],
    ["Last GPS update", r.lastGpsUpdate],
  ];

  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tertiary/15 text-sm font-semibold text-tertiary">
          {r.initials}
        </span>
        <div>
          <h2 className="text-xl font-bold">{r.name}</h2>
          <p className="text-xs text-secondary/60">Rider ID · {r.riderCode}</p>
          <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>
            ● {badge.label}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3 border-t border-secondary/10 pt-4">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-secondary/60">{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>

      <button className="mt-4 flex items-center gap-2 rounded-lg border border-secondary/10 px-4 py-2 text-sm font-medium">
        <Pencil size={14} /> Edit rider account
      </button>
    </div>
  );
}