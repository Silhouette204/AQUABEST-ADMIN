import { AVAILABILITY_BADGE, type Rider } from "./riders";

interface Props {
  riders: Rider[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RidersTable({ riders, selectedId, onSelect }: Props) {
  return (
    <div>
      <table className="w-full text-left text-sm">
        <thead className="bg-primary text-xs text-secondary/60">
          <tr>
            {["Rider / phone", "Availability", "Current load", "Delivered today", "Success rate", "Actions"].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {riders.map((r) => {
            const badge = AVAILABILITY_BADGE[r.availability];
            return (
              <tr
                key={r.id}
                onClick={() => onSelect(r.id)}
                className={`cursor-pointer border-t border-secondary/10 ${
                  r.id === selectedId ? "bg-tertiary/10" : "hover:bg-primary"
                }`}
              >
                <td className="px-4 py-3 font-medium text-tertiary">
                  {r.name}
                  <br />
                  {r.phone}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>
                    ● {badge.label}
                  </span>
                </td>
                <td className="px-4 py-3">{r.activeOrders} / {r.maxOrders} orders</td>
                <td className="px-4 py-3">{r.deliveredToday}</td>
                <td className="px-4 py-3">{r.successRate}%</td>
                <td className="px-4 py-3">
                  <button onClick={(e) => e.stopPropagation()} className="text-secondary/70">
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-secondary/10 px-4 py-3 text-xs text-secondary/60">
        <span>Showing 1-{riders.length} of {riders.length} results</span>
        <div className="flex items-center gap-2 text-sm">
          <button className="rounded-lg border border-secondary/10 px-3 py-1.5 font-medium">Previous</button>
          <span className="rounded-lg bg-tertiary/10 px-3 py-1.5 text-tertiary">1</span>
          <button className="rounded-lg border border-secondary/10 px-3 py-1.5 font-medium">Next</button>
        </div>
      </div>
    </div>
  );
}