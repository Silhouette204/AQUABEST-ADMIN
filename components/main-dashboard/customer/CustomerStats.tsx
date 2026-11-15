import { formatCount, type CustomerStats } from "./customers";

export function CustomerStatsCards({ stats }: { stats: CustomerStats }) {
  const cards = [
    { label: "Total customers", value: formatCount(stats.total), sub: `${stats.newThisMonth} new this month`, subClass: "text-tertiary" },
    { label: "VIP members", value: formatCount(stats.vip), sub: `${stats.vipPercent}% of customers`, subClass: "text-secondary/60" },
    { label: "Registered gallons", value: formatCount(stats.registeredGallons), sub: `Across ${stats.households} households`, subClass: "text-secondary/60" },
    { label: "Loyalty points issued", value: formatCount(stats.pointsIssued), sub: `${formatCount(stats.pointsRedeemed)} redeemed this month`, subClass: "text-secondary/60" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl border border-secondary/10 bg-white p-5">
          <p className="text-sm text-secondary/70">{c.label}</p>
          <p className="mt-2 text-3xl font-bold">{c.value}</p>
          <p className={`mt-1 text-xs ${c.subClass}`}>{c.sub}</p>
        </div>
      ))}
    </div>
  );
}