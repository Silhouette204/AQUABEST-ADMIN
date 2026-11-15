import type { DeliveryStats } from "./deliveries";

const CARDS: { label: string; key: keyof DeliveryStats; color: string }[] = [
  { label: "Delivered today", key: "deliveredToday", color: "text-emerald-600" },
  { label: "In progress", key: "inProgress", color: "text-tertiary" },
  { label: "Failed deliveries", key: "failed", color: "text-red-600" },
  { label: "Awaiting verification", key: "awaitingVerification", color: "text-amber-600" },
];

export function DeliveryStatsCards({ stats }: { stats: DeliveryStats }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {CARDS.map((c) => (
        <div
          key={c.key}
          className="flex items-center justify-between rounded-xl border border-secondary/10 bg-white px-5 py-4"
        >
          <span className="text-sm text-secondary/70">{c.label}</span>
          <span className={`text-3xl font-bold ${c.color}`}>{stats[c.key]}</span>
        </div>
      ))}
    </div>
  );
}