import type { Rider } from "./riders";

const STATUS_LABEL = {
  out_for_delivery: "Out for Delivery",
  assigned: "Assigned",
} as const;

export function CurrentDeliveries({ rider }: { rider: Rider }) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="font-bold">Current deliveries · {rider.name}</h2>
        <button className="text-sm font-medium text-tertiary">Open dispatch →</button>
      </div>

      <table className="w-full text-left text-sm">
        <thead className="bg-primary text-xs text-secondary/60">
          <tr>
            {["Order", "Destination", "Schedule", "Status"].map((h) => (
              <th key={h} className="px-5 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rider.currentDeliveries.map((d) => (
            <tr key={d.orderId} className="border-t border-secondary/10">
              <td className="px-5 py-3 font-medium text-tertiary">#{d.orderId}</td>
              <td className="px-5 py-3">
                {d.customerName}
                <br />
                <span className="text-secondary/60">{d.address}</span>
              </td>
              <td className="px-5 py-3">{d.schedule}</td>
              <td className="px-5 py-3">
                <span className="rounded-full bg-tertiary/10 px-2.5 py-0.5 text-xs text-tertiary">
                  ● {STATUS_LABEL[d.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}