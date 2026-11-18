export const REPORT_TABS = [
  "Sales",
  "Orders",
  "Deliveries",
  "Inventory",
  "Rider Performance",
  "Gallons",
] as const;

export type ReportTab = (typeof REPORT_TABS)[number];

export interface ReportFilters {
  dateRange: string;
  compareWith: string;
  reportType: ReportTab;
}

export interface ReportSummary {
  totalSales: number;
  salesChange: number;     // % kumpara sa nakaraang period
  totalOrders: number;
  ordersChange: number;    // %
  avgOrderChange: number;  // PHP na diperensya
  deliveredOrders: number;
}

export type ProductKey = "purified" | "alkaline" | "mineral";

export interface DailySales {
  id: string;
  date: string;            // "Oct 30, 2026"
  orders: number;
  purified: number;
  alkaline: number;
  mineral: number;
  changeVsPrevDay: number; // %
}

// Hardcoded muna. Palitan ng API pag ready na ang backend.
export const DEFAULT_FILTERS: ReportFilters = {
  dateRange: "Oct 30 – Nov 5, 2026",
  compareWith: "Previous 7 days",
  reportType: "Sales",
};

export const COMPARE_OPTIONS = ["Previous 7 days", "Previous 30 days", "Same period last year"];

export const LAST_UPDATED = "Updated today, 10:45 AM";

export const REPORT_SUMMARY: ReportSummary = {
  totalSales: 31240,
  salesChange: 14.7,
  totalOrders: 312,
  ordersChange: 12.2,
  avgOrderChange: 2.18,
  deliveredOrders: 294,
};

export const DAILY_SALES: DailySales[] = [
  { id: "d1", date: "Oct 30, 2026", orders: 38, purified: 2450, alkaline: 1000, mineral: 410, changeVsPrevDay: 4.1 },
  { id: "d2", date: "Oct 31, 2026", orders: 46, purified: 2800, alkaline: 1050, mineral: 470, changeVsPrevDay: 11.9 },
  { id: "d3", date: "Nov 1, 2026", orders: 40, purified: 2300, alkaline: 950, mineral: 430, changeVsPrevDay: -14.8 },
  { id: "d4", date: "Nov 2, 2026", orders: 54, purified: 3350, alkaline: 1350, mineral: 520, changeVsPrevDay: 41.8 },
  { id: "d5", date: "Nov 3, 2026", orders: 44, purified: 2900, alkaline: 1100, mineral: 460, changeVsPrevDay: -14.6 },
  { id: "d6", date: "Nov 4, 2026", orders: 42, purified: 3100, alkaline: 1250, mineral: 490, changeVsPrevDay: 8.5 },
  { id: "d7", date: "Nov 5, 2026", orders: 48, purified: 3100, alkaline: 1300, mineral: 460, changeVsPrevDay: 0.4 },
];

export const dayTotal = (d: DailySales) => d.purified + d.alkaline + d.mineral;

export const sumBy = (rows: DailySales[], key: ProductKey | "orders") =>
  rows.reduce((sum, r) => sum + r[key], 0);

export const formatNumber = (n: number) => n.toLocaleString("en-US");
export const formatWhole = (n: number) => `₱${n.toLocaleString("en-US")}`;
export const formatDecimal = (n: number) =>
  `₱${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const trendArrow = (n: number) => (n >= 0 ? "↑" : "↓");
export const trendColor = (n: number) => (n >= 0 ? "text-emerald-600" : "text-red-500");
export const formatPercent = (n: number) => `${trendArrow(n)} ${Math.abs(n)}%`;