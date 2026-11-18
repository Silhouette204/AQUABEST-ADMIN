import { DataState, getViewState } from "../shared/DataState";
import {
  dayTotal,
  formatNumber,
  formatPercent,
  formatWhole,
  trendColor,
  type DailySales,
} from "./reports";

const HEADERS = [
  "Date",
  "Orders",
  "Purified sales",
  "Alkaline sales",
  "Mineral sales",
  "Total sales",
  "vs. previous day",
];

export function DailySalesTable({ rows }: { rows: DailySales[] }) {
  // TODO(backend): palitan ng isLoading/isError mula sa API
  const state = getViewState({ isLoading: false, isError: false, count: rows.length });

  return (
    <div className="rounded-xl border border-secondary/10 bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="font-bold">Daily sales breakdown</h2>
        <span className="text-sm font-medium text-tertiary">7-day summary</span>
      </div>

      <DataState state={state} emptyTitle="No sales data for this range" skeletonRows={7}>
        <table className="w-full text-left text-sm">
          <thead className="bg-primary text-xs text-secondary/60">
            <tr>
              {HEADERS.map((h) => (
                <th key={h} className="px-5 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-secondary/10">
                <td className="px-5 py-3 font-semibold text-tertiary">{r.date}</td>
                <td className="px-5 py-3">{formatNumber(r.orders)}</td>
                <td className="px-5 py-3">{formatWhole(r.purified)}</td>
                <td className="px-5 py-3">{formatWhole(r.alkaline)}</td>
                <td className="px-5 py-3">{formatWhole(r.mineral)}</td>
                <td className="px-5 py-3 font-semibold">{formatWhole(dayTotal(r))}</td>
                <td className={`px-5 py-3 font-medium ${trendColor(r.changeVsPrevDay)}`}>
                  {formatPercent(r.changeVsPrevDay)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataState>
    </div>
  );
}