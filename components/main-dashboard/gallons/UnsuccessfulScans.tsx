import type { UnsuccessfulScan } from "./gallons";

export function UnsuccessfulScans({ scans }: { scans: UnsuccessfulScan[] }) {
  if (scans.length === 0) return null;

  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Unsuccessful scan result</h2>
        <button className="text-sm font-medium text-tertiary">View exception</button>
      </div>

      <ul className="mt-4 space-y-4">
        {scans.map((s) => (
          <li key={s.id} className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">
                #{s.orderId} · {s.gallonId}
              </p>
              <p className="text-sm text-secondary/60">
                {s.rider} · {s.at}
              </p>
              <p className="mt-1 text-sm">{s.reason}</p>
            </div>
            <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-0.5 text-xs text-red-600">
              ● Unsuccessful
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}