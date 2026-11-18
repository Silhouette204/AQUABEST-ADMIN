import { Crown, Gift, Sparkles, Users, type LucideIcon } from "lucide-react";
import { formatNumber, formatWhole, type LoyaltyStats } from "./loyalty";

export function LoyaltyStatsCards({ stats }: { stats: LoyaltyStats }) {
  const cards: { label: string; value: string; sub: string; color: string; Icon: LucideIcon }[] = [
    { label: "Enrolled customers", value: formatNumber(stats.enrolled), sub: "Automatic enrollment enabled", color: "text-tertiary", Icon: Users },
    { label: "VIP members", value: formatNumber(stats.vipMembers), sub: `${stats.newVipsThisMonth} new VIPs this month`, color: "text-tertiary", Icon: Crown },
    { label: "Points issued", value: formatNumber(stats.pointsIssued), sub: "This month", color: "text-tertiary", Icon: Sparkles },
    { label: "Rewards redeemed", value: formatNumber(stats.rewardsRedeemed), sub: `${formatWhole(stats.redeemedValue)} in customer value`, color: "text-emerald-600", Icon: Gift },
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