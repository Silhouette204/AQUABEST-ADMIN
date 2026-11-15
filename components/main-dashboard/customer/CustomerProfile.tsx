import { Pencil } from "lucide-react";
import { TYPE_BADGE, type Customer } from "./customers";

export function CustomerProfile({ customer: c }: { customer: Customer }) {
  const badge = TYPE_BADGE[c.type];
  const rows: [string, string][] = [
    ["Mobile number", c.phone],
    ["Email", c.email],
    ["Customer since", c.since],
  ];

  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tertiary/15 text-sm font-semibold text-tertiary">
          {c.initials}
        </span>
        <div>
          <h2 className="text-xl font-bold">{c.name}</h2>
          <div className="mt-1 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>{badge.label}</span>
            <span className="text-xs text-secondary/60">{c.customerCode}</span>
          </div>
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

      <div className="mt-4 border-t border-secondary/10 pt-4">
        <p className="text-sm font-semibold">Default delivery address</p>
        <p className="mt-2 text-sm text-secondary/60">{c.fullAddress}</p>
        <p className="mt-2 text-xs text-secondary/60">{c.landmark}</p>
      </div>

      <button className="mt-4 flex items-center gap-2 rounded-lg border border-secondary/10 px-4 py-2 text-sm font-medium">
        <Pencil size={14} /> Edit customer profile
      </button>
    </div>
  );
}