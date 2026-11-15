import { Info } from "lucide-react";
import type { Rider } from "./riders";

export function RiderPerformance({ rider: r }: { rider: Rider }) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <h2 className="font-bold">Performance this month</h2>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-3xl font-bold text-emerald-600">{r.successRate}%</p>
          <p className="text-xs text-secondary/60">Delivery success</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{r.avgDeliveryMin} min</p>
          <p className="text-xs text-secondary/60">Avg. delivery time</p>
        </div>
      </div>

      <div className="mt-4 space-y-3 border-t border-secondary/10 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary/60">Completed deliveries</span>
          <span className="font-semibold">{r.completedDeliveries}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary/60">Customer rating</span>
          <span className="font-semibold">★ {r.rating} / 5</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
        <Info size={16} /> {r.name.split(" ")[0]} is your top-performing rider this month.
      </div>
    </div>
  );
}