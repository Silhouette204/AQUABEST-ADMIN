import type { Delivery } from "./deliveries";

export function FailedReasons({ failed }: { failed: Delivery[] }) {
  if (failed.length === 0) return null;
  const needFollowUp = failed.filter((d) => d.followUp).length;

  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Failed delivery reasons</h2>
        <span className="text-sm font-medium text-tertiary">{needFollowUp} require follow-up</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-6">
        {failed.map((d) => (
          <div key={d.orderId}>
            <p className="text-sm font-semibold text-red-600">
              #{d.orderId} · {d.customerName}
            </p>
            <p className="mt-1 text-sm text-secondary/60">{d.failureReason}</p>
            {d.followUp && (
              <button className="mt-2 text-sm font-medium text-tertiary">
                {d.followUp === "reschedule" ? "Reschedule delivery →" : "Contact customer →"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}