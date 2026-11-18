import { formatWhole, sumBy, type DailySales } from "./reports";

const PRODUCTS = [
  { key: "purified", label: "Purified", bar: "bg-tertiary" },
  { key: "alkaline", label: "Alkaline", bar: "bg-tertiary/60" },
  { key: "mineral", label: "Mineral", bar: "bg-tertiary/30" },
] as const;

const MAX_BAR_PX = 180;

export function SalesByProduct({ rows }: { rows: DailySales[] }) {
  const totals = PRODUCTS.map((p) => ({ ...p, value: sumBy(rows, p.key) }));
  const grandTotal = totals.reduce((sum, t) => sum + t.value, 0);
  const max = Math.max(...totals.map((t) => t.value), 1);

  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Sales by product</h2>
        <span className="text-sm font-medium text-tertiary">Total {formatWhole(grandTotal)}</span>
      </div>

      <div className="mt-6 flex h-60 items-end justify-around">
        {totals.map((t) => (
          <div key={t.key} className="flex flex-col items-center">
            <span className="mb-2 text-sm font-bold">{formatWhole(t.value)}</span>
            <div
              className={`w-14 rounded-t-md ${t.bar}`}
              style={{ height: Math.round((t.value / max) * MAX_BAR_PX) }}
            />
            <span className="mt-2 text-xs text-secondary/60">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}