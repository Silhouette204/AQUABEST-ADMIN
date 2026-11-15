import { Banknote, ShieldAlert, Smartphone, Wallet, type LucideIcon } from "lucide-react";
import { formatWhole, type PaymentStats } from "./payments";

export function PaymentStatsCards({ stats }: { stats: PaymentStats }) {
  const cards: { label: string; value: string; sub: string; color: string; Icon: LucideIcon }[] = [
    { label: "Collected today", value: formatWhole(stats.collectedToday), sub: `${stats.paidTransactions} paid transactions`, color: "text-emerald-600", Icon: Wallet },
    { label: "Cash collections", value: formatWhole(stats.cashCollections), sub: `${stats.cashTransactions} transactions`, color: "text-tertiary", Icon: Banknote },
    { label: "Digital payments", value: formatWhole(stats.digitalPayments), sub: `GCash ${formatWhole(stats.gcashTotal)} · Bank ${formatWhole(stats.bankTotal)}`, color: "text-tertiary", Icon: Smartphone },
    { label: "Awaiting verification", value: formatWhole(stats.awaitingVerification), sub: `${stats.awaitingCount} payments to review`, color: "text-amber-600", Icon: ShieldAlert },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, color, Icon }) => (
        <div key={label} className="rounded-xl border border-secondary/10 bg-white p-5">
          <div className="flex items-center justify-between text-sm text-secondary/70">
            {label}
            <Icon size={16} className={color} />
          </div>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          <p className={`mt-1 text-xs ${color}`}>{sub}</p>
        </div>
      ))}
    </div>
  );
}