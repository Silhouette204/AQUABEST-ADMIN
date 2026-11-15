export type GallonStatus = "refilling" | "out_for_delivery" | "with_customer" | "returned";
export type ScanResult = "refilling" | "out_for_delivery" | "successful" | "unsuccessful";

export interface ScanStep {
  step: 1 | 2 | 3;
  actor: string;
  role: string;
  at: string;
  result: ScanResult;
}

export interface Gallon {
  id: string;
  qrCode: string;
  owner: string;
  description: string;
  status: GallonStatus;
  lastScan: string;
  overdueDays: number | null;
  linkedOrder: string | null;
  lastKnownLocation: string;
  daysWithCustomer: number | null;
  scans: ScanStep[];
}

export interface UnsuccessfulScan {
  id: string;
  orderId: string;
  gallonId: string;
  rider: string;
  at: string;
  reason: string;
}

export type GallonStats = Record<GallonStatus, number>;

// Hardcoded muna. Palitan ng API pag ready na ang backend.
export const GALLON_STATS: GallonStats = {
  refilling: 48,
  out_for_delivery: 32,
  with_customer: 112,
  returned: 48,
};

export const GALLONS: Gallon[] = [
  {
    id: "GL-0081",
    qrCode: "AB0081",
    owner: "Maria Santos",
    description: "5-gallon container",
    status: "with_customer",
    lastScan: "Nov 2 · 10:08 AM",
    overdueDays: null,
    linkedOrder: "AB-1002",
    lastKnownLocation: "San Isidro, QC",
    daysWithCustomer: 3,
    scans: [
      { step: 1, actor: "Paolo Navarro", role: "Station staff", at: "Nov 2, 2026 · 8:42 AM", result: "refilling" },
      { step: 2, actor: "Jun Bautista", role: "Rider", at: "Nov 2, 2026 · 9:48 AM", result: "out_for_delivery" },
      { step: 3, actor: "Jun Bautista", role: "Rider", at: "Nov 2, 2026 · 10:08 AM", result: "successful" },
    ],
  },
  {
    id: "GL-0082",
    qrCode: "AB0082",
    owner: "Maria Santos",
    description: "5-gallon container",
    status: "refilling",
    lastScan: "Nov 5 · 8:40 AM",
    overdueDays: null,
    linkedOrder: "AB-1048",
    lastKnownLocation: "Station",
    daysWithCustomer: null,
    scans: [
      { step: 1, actor: "Paolo Navarro", role: "Station staff", at: "Nov 5, 2026 · 8:40 AM", result: "refilling" },
    ],
  },
  {
    id: "GL-0083",
    qrCode: "AB0083",
    owner: "Maria Santos",
    description: "5-gallon container",
    status: "returned",
    lastScan: "Nov 4 · 4:12 PM",
    overdueDays: null,
    linkedOrder: null,
    lastKnownLocation: "Station",
    daysWithCustomer: null,
    scans: [
      { step: 1, actor: "Paolo Navarro", role: "Station staff", at: "Nov 4, 2026 · 2:30 PM", result: "refilling" },
      { step: 2, actor: "Mark Villanueva", role: "Rider", at: "Nov 4, 2026 · 3:15 PM", result: "out_for_delivery" },
      { step: 3, actor: "Mark Villanueva", role: "Rider", at: "Nov 4, 2026 · 4:12 PM", result: "successful" },
    ],
  },
  {
    id: "GL-0094",
    qrCode: "AB0094",
    owner: "Jose Dela Cruz",
    description: "5-gallon container",
    status: "with_customer",
    lastScan: "Oct 19 · 11:20 AM",
    overdueDays: 17,
    linkedOrder: "AB-0901",
    lastKnownLocation: "Pinyahan, QC",
    daysWithCustomer: 17,
    scans: [
      { step: 1, actor: "Paolo Navarro", role: "Station staff", at: "Oct 19, 2026 · 9:42 AM", result: "refilling" },
      { step: 2, actor: "Carlo Reyes", role: "Rider", at: "Oct 19, 2026 · 10:30 AM", result: "out_for_delivery" },
      { step: 3, actor: "Carlo Reyes", role: "Rider", at: "Oct 19, 2026 · 11:20 AM", result: "successful" },
    ],
  },
  {
    id: "GL-0102",
    qrCode: "AB0102",
    owner: "Ana Garcia",
    description: "5-gallon container",
    status: "out_for_delivery",
    lastScan: "Nov 5 · 10:28 AM",
    overdueDays: null,
    linkedOrder: "AB-1046",
    lastKnownLocation: "Kamias, QC",
    daysWithCustomer: null,
    scans: [
      { step: 1, actor: "Paolo Navarro", role: "Station staff", at: "Nov 5, 2026 · 9:50 AM", result: "refilling" },
      { step: 2, actor: "Mark Villanueva", role: "Rider", at: "Nov 5, 2026 · 10:28 AM", result: "out_for_delivery" },
    ],
  },
];

export const UNSUCCESSFUL_SCANS: UnsuccessfulScan[] = [
  {
    id: "ex-1",
    orderId: "AB-1042",
    gallonId: "GL-0146",
    rider: "Mark Villanueva",
    at: "Nov 5, 9:40 AM",
    reason: "Customer unavailable. Gallon returned to station.",
  },
];

export const STATUS_ORDER: GallonStatus[] = ["refilling", "out_for_delivery", "with_customer", "returned"];

export const STATUS_BADGE: Record<GallonStatus, { label: string; className: string }> = {
  refilling: { label: "Refilling", className: "bg-amber-50 text-amber-700" },
  out_for_delivery: { label: "Out for Delivery", className: "bg-tertiary/10 text-tertiary" },
  with_customer: { label: "With Customer", className: "bg-tertiary/10 text-tertiary" },
  returned: { label: "Returned", className: "bg-emerald-50 text-emerald-700" },
};

export const SCAN_BADGE: Record<ScanResult, { label: string; className: string }> = {
  refilling: { label: "Refilling", className: "bg-amber-50 text-amber-700" },
  out_for_delivery: { label: "Out for Delivery", className: "bg-tertiary/10 text-tertiary" },
  successful: { label: "Successful", className: "bg-emerald-50 text-emerald-700" },
  unsuccessful: { label: "Unsuccessful", className: "bg-red-50 text-red-600" },
};

export const SCAN_TITLE = { 1: "Refill", 2: "Deliver", 3: "Result" } as const;

export const formatNumber = (n: number) => n.toLocaleString("en-US");
export const totalGallons = (s: GallonStats) => Object.values(s).reduce((sum, n) => sum + n, 0);