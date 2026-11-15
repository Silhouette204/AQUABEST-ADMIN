import { STATUS_BADGE, formatNumber, type Gallon } from "./gallons";

interface Props {
  gallons: Gallon[];
  total: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GallonsTable({ gallons, total, selectedId, onSelect }: Props) {
  return (
    <div>
      <table className="w-full text-left text-sm">
        <thead className="bg-primary text-xs text-secondary/60">
          <tr>
            {["Gallon ID / QR", "Owner", "Status", "Last scan", "Overdue"].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gallons.map((g) => {
            const badge = STATUS_BADGE[g.status];
            return (
              <tr
                key={g.id}
                onClick={() => onSelect(g.id)}
                className={`cursor-pointer border-t border-secondary/10 ${
                  g.id === selectedId ? "bg-tertiary/10" : "hover:bg-primary"
                }`}
              >
                <td className="px-4 py-3 font-medium text-tertiary">
                  {g.id}
                  <br />
                  QR · {g.qrCode}
                </td>
                <td className="px-4 py-3">{g.owner}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>
                    ● {badge.label}
                  </span>
                </td>
                <td className="px-4 py-3">{g.lastScan}</td>
                <td className="px-4 py-3">
                  {g.overdueDays !== null ? (
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs text-red-600">● Overdue</span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-secondary/10 px-4 py-3 text-xs text-secondary/60">
        <span>Showing 1-{gallons.length} of {formatNumber(total)} results</span>
        <div className="flex items-center gap-2 text-sm">
          <button className="rounded-lg border border-secondary/10 px-3 py-1.5 font-medium">Previous</button>
          <span className="rounded-lg bg-tertiary/10 px-3 py-1.5 text-tertiary">1</span>
          <button className="rounded-lg border border-secondary/10 px-3 py-1.5 font-medium">Next</button>
        </div>
      </div>
    </div>
  );
}