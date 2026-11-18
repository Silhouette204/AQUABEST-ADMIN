import type { DailySales } from "./reports";

const W = 520;
const H = 220;
const PAD = { top: 12, right: 12, bottom: 28, left: 32 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

export function OrderTrend({ rows }: { rows: DailySales[] }) {
  const peak = Math.max(...rows.map((r) => r.orders), 0);
  const yMax = Math.max(Math.ceil(peak / 20) * 20, 20);
  const ticks = Array.from({ length: yMax / 20 + 1 }, (_, i) => i * 20);

  const x = (i: number) => PAD.left + (PLOT_W / rows.length) * (i + 0.5);
  const y = (v: number) => PAD.top + PLOT_H - (v / yMax) * PLOT_H;

  const points = rows.map((r, i) => ({
    x: x(i),
    y: y(r.orders),
    orders: r.orders,
    label: r.date.split(",")[0],
  }));

  const baseline = PAD.top + PLOT_H;
const first = points[0];
const last = points[points.length - 1];

const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
const area = first && last ? `${line} L${last.x},${baseline} L${first.x},${baseline} Z` : "";

  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Order trend</h2>
        <span className="text-sm font-medium text-tertiary">Last 7 days</span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-secondary/60">
        <span className="h-2 w-2 rounded-full bg-tertiary" />
        Orders per day
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img" aria-label="Orders per day">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="stroke-secondary/10" />
            <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fontSize={11} className="fill-secondary/50">
              {t}
            </text>
          </g>
        ))}

        {area && <path d={area} className="fill-tertiary/10" />}
        <path d={line} fill="none" strokeWidth={2} strokeLinejoin="round" className="stroke-tertiary" />

        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r={3} className="fill-tertiary">
            <title>{`${p.label}: ${p.orders} orders`}</title>
          </circle>
        ))}

        {points.map((p) => (
          <text key={p.label} x={p.x} y={H - 8} textAnchor="middle" fontSize={11} className="fill-secondary/50">
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}