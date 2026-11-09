export type OrderState = "pending" | "out_for_delivery" | "delivered" | "failed";

export interface Rider {
  id: string;
  name: string;
  initials: string;
  vehicle: string;
  plate: string;
  activeOrders: number;
  maxOrders: number;
  lat: number;
  lng: number;
  currentDelivery?: string; // hal. "#AB-1047 → Jose Dela Cruz"
  lastUpdate?: string;
}

export interface DispatchOrder {
  id: string;
  customerName: string;
  address: string;
  window: string;
  items: string;
  paymentMethod: string;
  state: OrderState;
  lat: number;
  lng: number;
}

// Hardcoded muna. Palitan ng API / WebSocket pag ready na ang backend.
export const RIDERS: Rider[] = [
  { id: "jun", name: "Jun Bautista", initials: "JB", vehicle: "Motorcycle", plate: "XYZ 5678", activeOrders: 0, maxOrders: 5, lat: 14.6742, lng: 121.0398 },
  {
    id: "carlo", name: "Carlo Reyes", initials: "CR", vehicle: "Motorcycle", plate: "ABC 1234",
    activeOrders: 3, maxOrders: 5, lat: 14.6765, lng: 121.0445,
    currentDelivery: "#AB-1047 → Jose Dela Cruz", lastUpdate: "10:44:32 AM · 12 sec ago",
  },
  { id: "mark", name: "Mark Villanueva", initials: "MV", vehicle: "Motorcycle", plate: "DEF 9012", activeOrders: 2, maxOrders: 5, lat: 14.6801, lng: 121.0471 },
];

export const UNASSIGNED: DispatchOrder[] = [
  { id: "AB-1048", customerName: "Maria Santos", address: "24 Sampaguita St., Quezon City", window: "11:00 AM-12:00 PM", items: "2 × Purified water", paymentMethod: "Cash on delivery", state: "pending", lat: 14.6788, lng: 121.0412 },
  { id: "AB-1043", customerName: "Paolo Ramos", address: "18 Narra St., Pinyahan, Quezon City", window: "1:00 PM-2:00 PM", items: "2 × Purified water", paymentMethod: "Cash on delivery", state: "pending", lat: 14.6722, lng: 121.0467 },
  { id: "AB-1039", customerName: "Cristina Flores", address: "6 Acacia Ave., San Isidro, Quezon City", window: "2:00 PM-3:00 PM", items: "3 × Alkaline water", paymentMethod: "Cash on delivery", state: "pending", lat: 14.6699, lng: 121.0421 },
];

export const riderAvailability = (r: Rider) =>
  r.activeOrders === 0 ? "Available" : "Busy";

export const MARKER_COLOR: Record<OrderState | "rider", string> = {
  rider: "#0ea5e9",
  pending: "#d97706",
  out_for_delivery: "#0ea5e9",
  delivered: "#059669",
  failed: "#dc2626",
};