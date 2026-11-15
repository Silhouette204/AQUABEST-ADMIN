import type { PaymentStatus } from "../orders/orders";

export type PaymentMethod = "cash" | "gcash" | "bank_transfer";

export interface PaymentReceipt {
  recipient: string;
  at: string;
}

export interface Payment {
  orderId: string;
  customerName: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  recordedAt: string;
  referenceNumber: string | null;
  submittedAt: string | null;
  receipt: PaymentReceipt | null; // para sa digital payments lang
}

export interface PaymentStats {
  collectedToday: number;
  paidTransactions: number;
  cashCollections: number;
  cashTransactions: number;
  digitalPayments: number;
  gcashTotal: number;
  bankTotal: number;
  awaitingVerification: number;
  awaitingCount: number;
}

// Hardcoded muna. Palitan ng API pag ready na ang backend.
export const TOTAL_PAYMENTS = 48;

export const PAYMENT_STATS: PaymentStats = {
  collectedToday: 4860,
  paidTransactions: 38,
  cashCollections: 2770,
  cashTransactions: 25,
  digitalPayments: 2090,
  gcashTotal: 1740,
  bankTotal: 350,
  awaitingVerification: 250,
  awaitingCount: 4,
};

export const PAYMENTS: Payment[] = [
  { orderId: "AB-1048", customerName: "Maria Santos", method: "cash", amount: 70, status: "pending", recordedAt: "10:42 AM", referenceNumber: null, submittedAt: null, receipt: null },
  { orderId: "AB-1047", customerName: "Jose Dela Cruz", method: "gcash", amount: 105, status: "paid", recordedAt: "10:35 AM", referenceNumber: "9812 6044 1790", submittedAt: "Today, 10:35 AM", receipt: { recipient: "AquaBest San Isidro", at: "Nov 5, 2026 · 10:34 AM" } },
  {
    orderId: "AB-1046",
    customerName: "Ana Garcia",
    method: "gcash",
    amount: 50,
    status: "unverified",
    recordedAt: "10:28 AM",
    referenceNumber: "9812 6044 1827",
    submittedAt: "Today, 10:28 AM",
    receipt: { recipient: "AquaBest San Isidro", at: "Nov 5, 2026 · 10:27 AM" },
  },
  { orderId: "AB-1045", customerName: "Roberto Lim", method: "cash", amount: 140, status: "paid", recordedAt: "10:16 AM", referenceNumber: null, submittedAt: null, receipt: null },
  { orderId: "AB-1044", customerName: "Liza Mendoza", method: "bank_transfer", amount: 100, status: "paid", recordedAt: "10:04 AM", referenceNumber: "BT-1105-0044", submittedAt: "Today, 10:04 AM", receipt: { recipient: "AquaBest San Isidro", at: "Nov 5, 2026 · 10:03 AM" } },
  { orderId: "AB-1043", customerName: "Paolo Ramos", method: "cash", amount: 70, status: "pending", recordedAt: "9:56 AM", referenceNumber: null, submittedAt: null, receipt: null },
];

export const METHOD_LABEL: Record<PaymentMethod, string> = {
  cash: "Cash",
  gcash: "GCash",
  bank_transfer: "Bank transfer",
};

export const PAYMENT_BADGE: Record<PaymentStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  paid: { label: "Paid", className: "bg-emerald-50 text-emerald-700" },
  unverified: { label: "Unverified", className: "bg-amber-50 text-amber-700" },
};

export const ACTION_LABEL: Record<PaymentStatus, string> = {
  pending: "View",
  paid: "Receipt",
  unverified: "Verify",
};

export const formatWhole = (n: number) => `₱${n.toLocaleString("en-US")}`;
export const formatAmount = (n: number) =>
  `₱${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;