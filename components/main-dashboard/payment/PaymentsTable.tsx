import {
  ACTION_LABEL,
  METHOD_LABEL,
  PAYMENT_BADGE,
  formatAmount,
  type Payment,
  type PaymentMethod,
} from "./payments";

function MethodCell({ method }: { method: PaymentMethod }) {
  if (method === "gcash") {
    return (
      <span className="rounded-full bg-tertiary/10 px-2.5 py-0.5 text-xs text-tertiary">● GCash</span>
    );
  }
  return <>{METHOD_LABEL[method]}</>;
}

interface Props {
  payments: Payment[];
  total: number;
  selectedId: string | null;
  onSelect: (orderId: string) => void;
}

export function PaymentsTable({ payments, total, selectedId, onSelect }: Props) {
  return (
    <div>
      <table className="w-full text-left text-sm">
        <thead className="bg-primary text-xs text-secondary/60">
          <tr>
            {["Order / customer", "Method", "Amount", "Status", "Recorded", "Actions"].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => {
            const badge = PAYMENT_BADGE[p.status];
            return (
              <tr
                key={p.orderId}
                onClick={() => onSelect(p.orderId)}
                className={`cursor-pointer border-t border-secondary/10 ${
                  p.orderId === selectedId ? "bg-tertiary/10" : "hover:bg-primary"
                }`}
              >
                <td className="px-4 py-3 font-medium text-tertiary">
                  #{p.orderId}
                  <br />
                  {p.customerName}
                </td>
                <td className="px-4 py-3"><MethodCell method={p.method} /></td>
                <td className="px-4 py-3">{formatAmount(p.amount)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>
                    ● {badge.label}
                  </span>
                </td>
                <td className="px-4 py-3">{p.recordedAt}</td>
                <td className="px-4 py-3 text-secondary/70">{ACTION_LABEL[p.status]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-secondary/10 px-4 py-3 text-xs text-secondary/60">
        <span>Showing 1-{payments.length} of {total} results</span>
        <div className="flex items-center gap-2 text-sm">
          <button className="rounded-lg border border-secondary/10 px-3 py-1.5 font-medium">Previous</button>
          <span className="rounded-lg bg-tertiary/10 px-3 py-1.5 text-tertiary">1</span>
          <button className="rounded-lg border border-secondary/10 px-3 py-1.5 font-medium">Next</button>
        </div>
      </div>
    </div>
  );
}