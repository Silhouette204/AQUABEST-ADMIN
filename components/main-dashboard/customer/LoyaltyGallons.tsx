import { ScanLine } from "lucide-react";
import { GALLON_BADGE, TYPE_BADGE, type Customer } from "./customers";

export function LoyaltyGallons({ customer: c }: { customer: Customer }) {
  const badge = TYPE_BADGE[c.type];

  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <h2 className="font-bold">Loyalty &amp; registered gallons</h2>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <p className="text-3xl font-bold text-tertiary">{c.points}</p>
          <p className="text-xs text-secondary/60">Available points</p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>{badge.label}</span>
      </div>

      <ul className="mt-4 space-y-3 border-t border-secondary/10 pt-4">
        {c.gallons.length === 0 && (
          <li className="text-sm text-secondary/60">No registered gallons yet.</li>
        )}
        {c.gallons.map((g) => {
          const gb = GALLON_BADGE[g.status];
          return (
            <li key={g.code} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-secondary/70">
                <ScanLine size={16} /> {g.code}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs ${gb.className}`}>● {gb.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}