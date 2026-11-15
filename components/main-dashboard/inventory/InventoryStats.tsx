import { Archive, Box, Droplet, TriangleAlert, type LucideIcon } from "lucide-react";
import { formatNumber, type InventoryStats } from "./inventory";

export function InventoryStatsCards({ stats }: { stats: InventoryStats }) {
  const cards: { label: string; value: number; sub: string; color: string; Icon: LucideIcon }[] = [
    { label: "Full Gallons", value: stats.fullGallons, sub: "Ready for dispatch", color: "text-tertiary", Icon: Droplet },
    { label: "Empty Gallons", value: stats.emptyGallons, sub: "Available for refilling", color: "text-tertiary", Icon: Archive },
    { label: "Low Stock Items", value: stats.lowStockItems, sub: "Below minimum level", color: "text-amber-600", Icon: TriangleAlert },
    { label: "Total Products", value: stats.totalProducts, sub: `${stats.waterProducts} water · ${stats.supplyProducts} supplies`, color: "text-tertiary", Icon: Box },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, color, Icon }) => (
        <div key={label} className="rounded-xl border border-secondary/10 bg-white p-5">
          <div className="flex items-center justify-between text-sm text-secondary/70">
            {label}
            <Icon size={16} className={color} />
          </div>
          <p className="mt-2 text-3xl font-bold">{formatNumber(value)}</p>
          <p className={`mt-1 text-xs ${color}`}>{sub}</p>
        </div>
      ))}
    </div>
  );
}