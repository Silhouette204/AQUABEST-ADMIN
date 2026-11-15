import { Camera, Info, Maximize2, ShieldCheck } from "lucide-react";
import type { Delivery } from "./deliveries";

interface Props {
  delivery: Delivery;
  onVerify: (orderId: string) => void;
}

export function ProofOfDelivery({ delivery: d, onVerify }: Props) {
  const row = (label: string, value: string) => (
    <div key={label} className="flex justify-between text-sm">
      <span className="text-secondary/60">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="space-y-4 rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Proof of delivery</h2>
        <span className="text-sm font-medium text-tertiary">#{d.orderId}</span>
      </div>

      {d.status === "failed" ? (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{d.failureReason}</div>
      ) : (
        <>
          {d.proofPhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={d.proofPhotoUrl} alt="Proof of delivery" className="h-44 w-full rounded-lg object-cover" />
          ) : (
            <div className="flex h-44 w-full items-center justify-center rounded-lg bg-primary text-secondary/40">
              <Camera size={32} />
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-secondary/60">
            <span>Uploaded by {d.uploadedBy}</span>
            <Maximize2 size={14} />
          </div>

          <div className="space-y-2">
            {row("Customer", d.customerName)}
            {row("Recipient", d.recipient ?? "—")}
            {row("Delivered quantity", d.quantity)}
          </div>

          {d.gpsMatchesAddress && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              <Info size={16} /> Photo and GPS match the delivery address.
            </div>
          )}

          {d.verified ? (
            <p className="text-sm font-medium text-emerald-700">Verified</p>
          ) : (
            <button
              onClick={() => onVerify(d.orderId)}
              className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-medium text-white"
            >
              <ShieldCheck size={16} /> Verify delivery
            </button>
          )}
        </>
      )}
    </div>
  );
}