export type DeliveryStatus = "delivered" | "failed";

export interface GpsPoint {
  label: string;
  time: string;
  lat: number;
  lng: number;
}

export interface Delivery {
  orderId: string;
  customerName: string;
  riderName: string;
  status: DeliveryStatus;
  completedAt: string;
  verified: boolean;
  proofPhotoUrl: string | null;
  uploadedBy: string;
  recipient: string | null;
  quantity: string;
  gpsMatchesAddress: boolean;
  failureReason: string | null;
  followUp: "reschedule" | "contact" | null;
  gps: GpsPoint[];
}

export interface DeliveryStats {
  deliveredToday: number;
  inProgress: number;
  failed: number;
  awaitingVerification: number;
}

// Hardcoded muna. Palitan ng API pag ready na ang backend.
export const STATS: DeliveryStats = {
  deliveredToday: 26,
  inProgress: 8,
  failed: 2,
  awaitingVerification: 4,
};

export const DELIVERIES: Delivery[] = [
  {
    orderId: "AB-1045",
    customerName: "Roberto Lim",
    riderName: "Carlo Reyes",
    status: "delivered",
    completedAt: "10:16 AM",
    verified: false,
    proofPhotoUrl: null,
    uploadedBy: "Carlo Reyes · 10:16 AM",
    recipient: "Roberto Lim (customer)",
    quantity: "4 × Purified water",
    gpsMatchesAddress: true,
    failureReason: null,
    followUp: null,
    gps: [
      { label: "Left station", time: "9:48 AM", lat: 14.6351, lng: 121.0382 },
      { label: "Arrived at destination", time: "10:12 AM", lat: 14.6388, lng: 121.0421 },
      { label: "Delivery completed", time: "10:16 AM", lat: 14.6389, lng: 121.042 },
    ],
  },
  {
    orderId: "AB-1042",
    customerName: "Grace Aquino",
    riderName: "Mark Villanueva",
    status: "failed",
    completedAt: "9:40 AM",
    verified: false,
    proofPhotoUrl: null,
    uploadedBy: "Mark Villanueva · 9:40 AM",
    recipient: null,
    quantity: "1 × Purified water",
    gpsMatchesAddress: false,
    failureReason: "Customer unavailable. Called twice; no response at the delivery address.",
    followUp: "reschedule",
    gps: [],
  },
  {
    orderId: "AB-1041",
    customerName: "Miguel Torres",
    riderName: "Jun Bautista",
    status: "delivered",
    completedAt: "9:32 AM",
    verified: true,
    proofPhotoUrl: null,
    uploadedBy: "Jun Bautista · 9:32 AM",
    recipient: "Miguel Torres (customer)",
    quantity: "3 × Purified water",
    gpsMatchesAddress: true,
    failureReason: null,
    followUp: null,
    gps: [],
  },
  {
    orderId: "AB-1038",
    customerName: "Benjie Tan",
    riderName: "Mark Villanueva",
    status: "failed",
    completedAt: "9:12 AM",
    verified: false,
    proofPhotoUrl: null,
    uploadedBy: "Mark Villanueva · 9:12 AM",
    recipient: null,
    quantity: "2 × Alkaline water",
    gpsMatchesAddress: false,
    failureReason: "Incorrect address. Rider could not locate the house number.",
    followUp: "contact",
    gps: [],
  },
];

export const formatCoords = (lat: number, lng: number) =>
  `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;

export const STATUS_BADGE: Record<DeliveryStatus, { label: string; className: string }> = {
  delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700" },
  failed: { label: "Failed", className: "bg-red-50 text-red-600" },
};