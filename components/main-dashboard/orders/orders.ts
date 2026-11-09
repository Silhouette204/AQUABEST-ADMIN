// orders.ts
export type OrderStatus = "pending" | "assigned" | "out_for_delivery" | "delivered" | "failed";
export type PaymentStatus = "pending" | "paid" | "unverified";
export type OrderType = "online" | "walk_in";

export interface Order {
  id: string;
  type: OrderType;
  customerName: string;
  customerPhone: string;
  address: string;
  items: { name: string; qty: number; unitPrice: number }[];
  scheduledAt: string;
  deliveryFee: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  rider: string | null;
  createdAt: string;
  timeline: { label: string; detail: string; done: boolean }[];
}

// Hardcoded muna. Palitan ng fetch sa API pag ready na ang backend.
export const ORDERS: Order[] = [
  {
    id: "AB-1048",
    type: "online",
    customerName: "Maria Santos",
    customerPhone: "0917 823 4567",
    address: "24 Sampaguita St., Brgy. San Isidro, Quezon City, Metro Manila",
    items: [{ name: "Purified water (5 gal)", qty: 2, unitPrice: 35 }],
    scheduledAt: "Today, 11:00 AM",
    deliveryFee: 0,
    paymentMethod: "Cash on delivery",
    paymentStatus: "pending",
    status: "pending",
    rider: null,
    createdAt: "Nov 5, 2026 at 10:42 AM",
    timeline: [
      { label: "Order placed", detail: "Maria Santos · Today, 10:42 AM", done: true },
      { label: "Payment pending", detail: "Collect ₱70.00 upon delivery", done: true },
      { label: "Awaiting rider assignment", detail: "Scheduled today, 11:00 AM-12:00 PM", done: false },
    ],
  },
];

export const orderTotal = (o: Order) =>
  o.items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0) + o.deliveryFee;

export const peso = (n: number) => `₱${n.toFixed(2)}`;

export const STATUS_STYLE: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "text-amber-600" },
  assigned: { label: "Assigned", className: "text-sky-600" },
  out_for_delivery: { label: "Out for Delivery", className: "text-sky-600" },
  delivered: { label: "Delivered", className: "text-emerald-600" },
  failed: { label: "Failed", className: "text-red-600" },
};

export const PAYMENT_STYLE: Record<PaymentStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "text-amber-600" },
  paid: { label: "Paid", className: "text-emerald-600" },
  unverified: { label: "Unverified", className: "text-gray-500" },
};