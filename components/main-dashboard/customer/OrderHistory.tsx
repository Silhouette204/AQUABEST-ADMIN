import { HISTORY_BADGE, formatTotal, type Customer } from "./customers";

export function OrderHistory({ customer: c }: { customer: Customer }) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="font-bold">Order history · {c.name}</h2>
        <button className="text-sm font-medium text-tertiary">View all {c.totalOrders} orders</button>
      </div>

      {c.orderHistory.length === 0 ? (
        <p className="px-5 pb-5 text-sm text-secondary/60">This customer has no orders yet.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-primary text-xs text-secondary/60">
            <tr>
              {["Order", "Date", "Items", "Total", "Status"].map((h) => (
                <th key={h} className="px-5 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.orderHistory.map((o) => {
              const badge = HISTORY_BADGE[o.status];
              return (
                <tr key={o.orderId} className="border-t border-secondary/10">
                  <td className="px-5 py-3 font-medium text-tertiary">#{o.orderId}</td>
                  <td className="px-5 py-3">{o.date}</td>
                  <td className="px-5 py-3">{o.items}</td>
                  <td className="px-5 py-3">{formatTotal(o.total)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>
                      ● {badge.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}