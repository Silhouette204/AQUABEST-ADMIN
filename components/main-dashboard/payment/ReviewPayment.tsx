import {
  Banknote,
  ExternalLink,
  Landmark,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import {
  METHOD_LABEL,
  PAYMENT_BADGE,
  formatAmount,
  type Payment,
  type PaymentMethod,
} from "./payments";

const METHOD_ICON: Record<PaymentMethod, LucideIcon> = {
  cash: Banknote,
  gcash: Smartphone,
  bank_transfer: Landmark,
};

interface Props {
  payment: Payment;
  onVerify: (orderId: string) => void;
}

export function ReviewPayment({ payment: p, onVerify }: Props) {
  const badge = PAYMENT_BADGE[p.status];
  const Icon = METHOD_ICON[p.method];

  const rows: [string, string][] = [
    ["Customer", p.customerName],
    ["Payment method", METHOD_LABEL[p.method]],
    ["Expected amount", formatAmount(p.amount)],
    ["Reference number", p.referenceNumber ?? "—"],
    ["Submitted", p.submittedAt ?? "—"],
  ];

  return (
    <div className="space-y-4 rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Review payment</h2>
        <span className="text-sm font-medium text-tertiary">#{p.orderId}</span>
      </div>

      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>
        ● {badge.label}
      </span>

      <div className="space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-secondary/60">{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>

      {p.receipt ? (
        <div className="rounded-lg bg-primary p-5 text-center">
          <p className="flex items-center justify-center gap-2 font-semibold text-tertiary">
            <Icon size={16} /> {METHOD_LABEL[p.method]}
          </p>
          <p className="mt-3 text-[10px] tracking-widest text-secondary/50">PAYMENT SENT</p>
          <p className="text-3xl font-bold">{formatAmount(p.amount)}</p>
          <p className="mt-1 text-sm">{p.receipt.recipient}</p>
          <div className="mt-3 border-t border-secondary/10 pt-3 text-xs text-secondary/60">
            Ref. {p.referenceNumber}
            <br />
            {p.receipt.at}
          </div>
        </div>
      ) : (
        p.method === "cash" && (
          <div className="flex items-start gap-2 rounded-lg bg-primary p-4 text-sm text-secondary/70">
            <Icon size={16} className="mt-0.5 shrink-0" />
            Cash payment. Marked paid after the rider remits and the station confirms receipt.
          </div>
        )
      )}

      {p.status === "unverified" && p.method !== "cash" && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
          <TriangleAlert size={16} className="mt-0.5 shrink-0" />
          {`Match the reference with your station's ${METHOD_LABEL[p.method]} account before verifying.`}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {p.status === "unverified" && (
          <button
            onClick={() => onVerify(p.orderId)}
            className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-medium text-white"
          >
            <ShieldCheck size={16} /> Verify payment
          </button>
        )}
        {p.status === "paid" && (
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
            <ShieldCheck size={16} /> Verified
          </p>
        )}
        {p.receipt && (
          <button className="flex items-center gap-2 rounded-lg border border-secondary/10 px-4 py-2 text-sm font-medium">
            <ExternalLink size={14} /> View full receipt
          </button>
        )}
      </div>
    </div>
  );
}