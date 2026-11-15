import { peso } from "../orders/orders";

export type CustomerType = "vip" | "regular";
export type GallonStatus = "with_customer" | "refilling" | "returned";
export type HistoryStatus = "pending" | "assigned" | "out_for_delivery" | "delivered" | "failed";

export interface CustomerGallon {
  code: string;
  status: GallonStatus;
}

export interface CustomerOrder {
  orderId: string;
  date: string;
  items: string;
  total: number;
  status: HistoryStatus;
}

export interface Customer {
  id: string;
  customerCode: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  areaLabel: string;     // maikling address para sa table
  fullAddress: string;
  landmark: string;
  since: string;
  type: CustomerType;
  totalOrders: number;
  points: number;
  gallons: CustomerGallon[];
  orderHistory: CustomerOrder[];
}

export interface CustomerStats {
  total: number;
  newThisMonth: number;
  vip: number;
  vipPercent: number;
  registeredGallons: number;
  households: number;
  pointsIssued: number;
  pointsRedeemed: number;
}

// Hardcoded muna. Palitan ng API pag ready na ang backend.
export const CUSTOMER_STATS: CustomerStats = {
  total: 248,
  newThisMonth: 18,
  vip: 36,
  vipPercent: 14.5,
  registeredGallons: 240,
  households: 164,
  pointsIssued: 12480,
  pointsRedeemed: 2360,
};

export const CUSTOMERS: Customer[] = [
  {
    id: "maria-santos",
    customerCode: "CUS-0012",
    name: "Maria Santos",
    initials: "MS",
    phone: "0917 823 4567",
    email: "maria.santos@gmail.com",
    areaLabel: "San Isidro, QC",
    fullAddress: "24 Sampaguita St., Brgy. San Isidro, Quezon City, Metro Manila",
    landmark: "Landmark: blue gate beside the sari-sari store",
    since: "Mar 18, 2026",
    type: "vip",
    totalOrders: 32,
    points: 280,
    gallons: [
      { code: "GL-0081", status: "with_customer" },
      { code: "GL-0082", status: "refilling" },
      { code: "GL-0083", status: "returned" },
    ],
    orderHistory: [
      { orderId: "AB-1048", date: "Nov 5, 2026", items: "2 × Purified", total: 70, status: "pending" },
      { orderId: "AB-1002", date: "Nov 2, 2026", items: "2 × Purified", total: 70, status: "delivered" },
      { orderId: "AB-0956", date: "Oct 29, 2026", items: "3 × Purified", total: 105, status: "delivered" },
    ],
  },
];

export const TYPE_BADGE: Record<CustomerType, { label: string; className: string }> = {
  vip: { label: "VIP", className: "bg-violet-50 text-violet-700" },
  regular: { label: "Regular", className: "bg-secondary/10 text-secondary/70" },
};

export const GALLON_BADGE: Record<GallonStatus, { label: string; className: string }> = {
  with_customer: { label: "With Customer", className: "bg-tertiary/10 text-tertiary" },
  refilling: { label: "Refilling", className: "bg-amber-50 text-amber-700" },
  returned: { label: "Returned", className: "bg-emerald-50 text-emerald-700" },
};

export const HISTORY_BADGE: Record<HistoryStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  assigned: { label: "Assigned", className: "bg-tertiary/10 text-tertiary" },
  out_for_delivery: { label: "Out for Delivery", className: "bg-tertiary/10 text-tertiary" },
  delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700" },
  failed: { label: "Failed", className: "bg-red-50 text-red-600" },
};

export const formatTotal = (n: number) => peso(n);
export const formatCount = (n: number) => n.toLocaleString("en-US");