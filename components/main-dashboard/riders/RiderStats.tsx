import { Bike, CircleCheck, Power, Truck, type LucideIcon } from "lucide-react";
import type { RiderStats } from "./riders";

export function RiderStatsCards({ stats }: { stats: RiderStats }) {
  const cards: {
    label: string;
    value: number;
    sub: string;
    color: string;
    Icon: LucideIcon;
  }[] = [
    { label: "Total riders", value: stats.total, sub: `${stats.verifiedAccounts} verified accounts`, color: "text-tertiary", Icon: Bike },
    { label: "Available now", value: stats.available, sub: "Ready to accept an order", color: "text-emerald-600", Icon: CircleCheck },
    { label: "Busy", value: stats.busy, sub: `${stats.currentDeliveries} current deliveries`, color: "text-amber-600", Icon: Truck },
    { label: "Offline", value: stats.offline, sub: stats.lastActive, color: "text-tertiary", Icon: Power },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, color, Icon }) => (
        <div key={label} className="rounded-xl border border-secondary/10 bg-white p-5">
          <div className="flex items-center justify-between text-sm text-secondary/70">
            {label}
            <Icon size={16} className={color} />
          </div>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          <p className={`mt-1 text-xs ${color}`}>{sub}</p>
        </div>
      ))}
    </div>
  );
}