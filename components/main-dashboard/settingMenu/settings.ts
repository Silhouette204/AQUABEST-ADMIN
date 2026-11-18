export type UserRole = "Admin" | "Dispatcher" | "Staff";
export type AccountStatus = "active" | "inactive";

export interface StationInfo {
  name: string;
  contactNumber: string;
  mobileNumber: string;
  email: string;
  address: string;
  currency: string;
  timezone: string;
}

export interface OperationsConfig {
  openingTime: string;        // "07:00" (24-hour)
  closingTime: string;        // "18:00"
  deliveryRadiusKm: number;
  defaultDeliveryFee: number; // PHP
  acceptOnlineOrders: boolean;
  lowStockAlerts: boolean;
  requireDeliveryProof: boolean;
}

export interface SecurityConfig {
  twoFactorRequired: boolean;
}

export interface SettingsConfig {
  station: StationInfo;
  operations: OperationsConfig;
  security: SecurityConfig;
}

export interface AdminAccount {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  lastActive: string;
  status: AccountStatus;
}

export interface PermissionRow {
  id: string;
  label: string;
  admin: string;
  dispatcher: string;
  staff: string;
}

export interface SettingsUpdate {
  by: string;
  at: string;
}

// Hardcoded muna. Palitan ng API pag ready na ang backend.
export const DEFAULT_SETTINGS: SettingsConfig = {
  station: {
    name: "AquaBest San Isidro",
    contactNumber: "02 8123 4567",
    mobileNumber: "0917 800 1234",
    email: "sanisidro@aquabest.ph",
    address: "15 Sampaguita St., San Isidro, Quezon City",
    currency: "PHP",
    timezone: "Asia/Manila",
  },
  operations: {
    openingTime: "07:00",
    closingTime: "18:00",
    deliveryRadiusKm: 5,
    defaultDeliveryFee: 0,
    acceptOnlineOrders: true,
    lowStockAlerts: true,
    requireDeliveryProof: true,
  },
  security: { twoFactorRequired: true },
};

export const SEAT_LIMIT = 5;

export const ADMIN_ACCOUNTS: AdminAccount[] = [
  { id: "u1", name: "Andrea Reyes", username: "andrea.reyes", role: "Admin", lastActive: "Now", status: "active" },
  { id: "u2", name: "Paolo Navarro", username: "paolo.navarro", role: "Dispatcher", lastActive: "10 min ago", status: "active" },
  { id: "u3", name: "Bea Gonzales", username: "bea.gonzales", role: "Staff", lastActive: "1 hour ago", status: "active" },
];

export const PERMISSIONS: PermissionRow[] = [
  { id: "p1", label: "Orders & customers", admin: "Full access", dispatcher: "Manage", staff: "Create / view" },
  { id: "p2", label: "Dispatch & riders", admin: "Full access", dispatcher: "Manage", staff: "View" },
  { id: "p3", label: "Products & stock", admin: "Full access", dispatcher: "View", staff: "Adjust stock" },
  { id: "p4", label: "Payments & reports", admin: "Full access", dispatcher: "View", staff: "Record cash" },
  { id: "p5", label: "Loyalty & rewards", admin: "Full access", dispatcher: "View", staff: "View" },
  { id: "p6", label: "Users & settings", admin: "Full access", dispatcher: "—", staff: "—" },
];

export const LAST_SETTINGS_UPDATE: SettingsUpdate = { by: "Andrea Reyes", at: "Nov 4, 2026, 4:45 PM" };

export const SETTINGS_TABS = ["Station settings", "Users & roles", "Notifications", "Security & audit"] as const;
export type SettingsTab = (typeof SETTINGS_TABS)[number];

export const SECTION_IDS = {
  station: "station-details",
  users: "admin-accounts",
  security: "security",
} as const;

// Aling section ang ini-scroll ng bawat tab (wala pang laman ang Notifications)
export const TAB_SECTION: Partial<Record<SettingsTab, string>> = {
  "Station settings": SECTION_IDS.station,
  "Users & roles": SECTION_IDS.users,
  "Security & audit": SECTION_IDS.security,
};

export const CURRENCY_OPTIONS = [{ value: "PHP", label: "PHP · Philippine Peso" }];
export const TIMEZONE_OPTIONS = [{ value: "Asia/Manila", label: "Asia/Manila (UTC+8)" }];

const formatHour = (h: number) => {
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${period}`;
};

// 5:00 AM hanggang 11:00 PM
export const TIME_OPTIONS = Array.from({ length: 19 }, (_, i) => i + 5).map((h) => ({
  value: `${String(h).padStart(2, "0")}:00`,
  label: formatHour(h),
}));

export const ACCOUNT_STATUS_LABEL: Record<AccountStatus, string> = {
  active: "Active",
  inactive: "Inactive",
};