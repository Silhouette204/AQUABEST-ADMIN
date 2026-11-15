import { STATUS_BADGE, type Delivery } from "./deliveries";

function ProofCell({ d }: { d: Delivery }) {
  if (d.status === "failed") return <span className="text-tertiary">View reason</span>;
  if (d.verified) {
    return (
      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-700">
        ● Verified
      </span>
    );
  }
  return <span className="text-tertiary">View photo</span>;
}

interface Props {
  deliveries: Delivery[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function DeliveriesTable({ deliveries, selectedId, onSelect }: Props) {
  return (
    <div>
      <table className="w-full text-left text-sm">
        <thead className="bg-primary text-xs text-secondary/60">
          <tr>
            {["Order", "Customer", "Rider", "Status", "Completed", "Proof"].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {deliveries.map((d) => {
            const badge = STATUS_BADGE[d.status];
            return (
              <tr
                key={d.orderId}
                onClick={() => onSelect(d.orderId)}
                className={`cursor-pointer border-t border-secondary/10 ${
                  d.orderId === selectedId ? "bg-tertiary/10" : "hover:bg-primary"
                }`}
              >
                <td className="px-4 py-3 font-medium text-tertiary">#{d.orderId}</td>
                <td className="px-4 py-3">{d.customerName}</td>
                <td className="px-4 py-3">{d.riderName}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>
                    ● {badge.label}
                  </span>
                </td>
                <td className="px-4 py-3">{d.completedAt}</td>
                <td className="px-4 py-3"><ProofCell d={d} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-secondary/10 px-4 py-3 text-xs text-secondary/60">
        <span>Showing 1-{deliveries.length} of {deliveries.length} results</span>
      </div>
    </div>
  );
}