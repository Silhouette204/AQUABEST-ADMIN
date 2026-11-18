import { CheckCircle2, ShoppingBag, TrendingUp, Wallet, type LucideIcon } from "lucide-react";
import {
  formatDecimal,
  formatNumber,
  formatPercent,
  formatWhole,
  trendArrow,
  trendColor,
  type ReportSummary,
} from "./reports";

export function ReportsStats({ summary }: { summary: ReportSummary }) {
  const { totalSales, totalOrders, deliveredOrders } = summary;
  const avgOrderValue = totalOrders === 0 ? 0 : totalSales / totalOrders;
  const deliverySuccess = totalOrders === 0 ? 0 : (deliveredOrders / totalOrders) * 100;

  const cards: {
    label: string;
    value: string;
    sub: string;
    iconColor: string;
    subColor: string;
    Icon: LucideIcon;
  }[] = [
    {
      label: "Total sales",
      value: formatWhole(totalSales),
      sub: `${formatPercent(summary.salesChange)} vs. previous period`,
      iconColor: "text-tertiary",
      subColor: trendColor(summary.salesChange),
      Icon: Wallet,
    },
    {
      label: "Total orders",
      value: formatNumber(totalOrders),
      sub: `${formatPercent(summary.ordersChange)} vs. previous period`,
      iconColor: "text-tertiary",
      subColor: trendColor(summary.ordersChange),
      Icon: ShoppingBag,
    },
    {
      label: "Average order value",
      value: formatDecimal(avgOrderValue),
      sub: `${trendArrow(summary.avgOrderChange)} ${formatDecimal(Math.abs(summary.avgOrderChange))} vs. previous period`,
      iconColor: "text-tertiary",
      subColor: trendColor(summary.avgOrderChange),
      Icon: TrendingUp,
    },
    {
      label: "Delivery success",
      value: `${deliverySuccess.toFixed(1)}%`,
      sub: `${formatNumber(deliveredOrders)} of ${formatNumber(totalOrders)} deliveries`,
      iconColor: "text-emerald-600",
      subColor: "text-emerald-600",
      Icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, iconColor, subColor, Icon }) => (
        <div key={label} className="rounded-xl border border-secondary/10 bg-white p-5">
          <div className="flex items-center justify-between text-sm text-secondary/70">
            {label}
            <Icon size={16} className={iconColor} />
          </div>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          <p className={`mt-1 text-xs ${subColor}`}>{sub}</p>
        </div>
      ))}
    </div>
  );
}