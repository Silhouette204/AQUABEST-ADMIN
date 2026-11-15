export type Availability = "available" | "busy" | "offline";

export interface RiderDelivery {
  orderId: string;
  customerName: string;
  address: string;
  schedule: string;
  status: "out_for_delivery" | "assigned";
}

export interface Rider {
  id: string;
  riderCode: string;
  name: string;
  initials: string;
  phone: string;
  username: string;
  vehicle: string;
  joined: string;
  lastGpsUpdate: string;
  availability: Availability;
  activeOrders: number;
  maxOrders: number;
  deliveredToday: number;
  successRate: number;
  avgDeliveryMin: number;
  completedDeliveries: number;
  rating: number;
  currentDeliveries: RiderDelivery[];
}

export interface RiderStats {
  total: number;
  verifiedAccounts: number;
  available: number;
  busy: number;
  currentDeliveries: number;
  offline: number;
  lastActive: string;
}

// Hardcoded muna. Palitan ng API pag ready na ang backend.
export const RIDER_STATS: RiderStats = {
  total: 4,
  verifiedAccounts: 4,
  available: 1,
  busy: 2,
  currentDeliveries: 5,
  offline: 1,
  lastActive: "Last active yesterday",
};

export const RIDERS: Rider[] = [
  {
    id: "carlo",
    riderCode: "RD-001",
    name: "Carlo Reyes",
    initials: "CR",
    phone: "0917 552 0184",
    username: "carlo.reyes",
    vehicle: "Motorcycle · ABC 1234",
    joined: "Feb 12, 2026",
    lastGpsUpdate: "12 seconds ago",
    availability: "busy",
    activeOrders: 3,
    maxOrders: 5,
    deliveredToday: 12,
    successRate: 98.4,
    avgDeliveryMin: 18,
    completedDeliveries: 184,
    rating: 4.9,
    currentDeliveries: [
      {
        orderId: "AB-1047",
        customerName: "Jose Dela Cruz",
        address: "12 Narra St., Pinyahan",
        schedule: "11:00 AM",
        status: "out_for_delivery",
      },
    ],
  },
];

export const AVAILABILITY_BADGE: Record<Availability, { label: string; className: string }> = {
  available: { label: "Available", className: "bg-emerald-50 text-emerald-700" },
  busy: { label: "Busy", className: "bg-amber-50 text-amber-700" },
  offline: { label: "Offline", className: "bg-secondary/10 text-secondary/70" },
};