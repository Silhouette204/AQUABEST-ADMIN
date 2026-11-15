export type ProductCategory = "water" | "container" | "supply";
export type StockUnit = "gal" | "units" | "pcs";
export type StockStatus = "in_stock" | "low" | "out";
export type MovementType = "add_full_stock" | "deduct_full_stock" | "add_empty_stock" | "deduct_stock";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  price: number;
  fullStock: number;
  emptyStock: number | null;
  minimum: number;
  unit: StockUnit;
}

export interface Adjustment {
  id: string;
  dateTime: string;
  productName: string;
  movement: MovementType;
  quantity: number; // may sign: positive = dagdag, negative = bawas
  unit: StockUnit;
  reason: string;
  adjustedBy: string;
}

export interface InventoryStats {
  fullGallons: number;
  emptyGallons: number;
  lowStockItems: number;
  totalProducts: number;
  waterProducts: number;
  supplyProducts: number;
}

// Hardcoded muna. Palitan ng API pag ready na ang backend.
export const LAST_UPDATED = "Today, 10:30 AM";

export const INVENTORY_STATS: InventoryStats = {
  fullGallons: 174,
  emptyGallons: 66,
  lowStockItems: 2,
  totalProducts: 6,
  waterProducts: 3,
  supplyProducts: 3,
};

export const PRODUCTS: Product[] = [
  { id: "pur-5", name: "Purified water · 5 gal", sku: "WTR-PUR-005", category: "water", price: 35, fullStock: 120, emptyStock: 42, minimum: 40, unit: "gal" },
  { id: "alk-5", name: "Alkaline water · 5 gal", sku: "WTR-ALK-005", category: "water", price: 50, fullStock: 8, emptyStock: 12, minimum: 20, unit: "gal" },
  { id: "min-5", name: "Mineral water · 5 gal", sku: "WTR-MIN-005", category: "water", price: 45, fullStock: 46, emptyStock: 12, minimum: 20, unit: "gal" },
  { id: "slim", name: "Slim gallon container", sku: "CTR-SLM-001", category: "container", price: 180, fullStock: 5, emptyStock: null, minimum: 10, unit: "units" },
  { id: "round", name: "Round gallon container", sku: "CTR-RND-001", category: "container", price: 150, fullStock: 0, emptyStock: null, minimum: 10, unit: "units" },
  { id: "caps", name: "Gallon caps · sealed", sku: "SUP-CAP-001", category: "supply", price: 3, fullStock: 1200, emptyStock: null, minimum: 200, unit: "pcs" },
];

export const ADJUSTMENTS: Adjustment[] = [
  { id: "adj-1", dateTime: "Nov 5 · 10:30 AM", productName: "Purified water", movement: "add_full_stock", quantity: 40, unit: "gal", reason: "Morning refill batch", adjustedBy: "Andrea Reyes" },
  { id: "adj-2", dateTime: "Nov 5 · 9:45 AM", productName: "Alkaline water", movement: "deduct_full_stock", quantity: -12, unit: "gal", reason: "Orders dispatched", adjustedBy: "Paolo Navarro" },
  { id: "adj-3", dateTime: "Nov 4 · 4:20 PM", productName: "Slim gallon container", movement: "deduct_stock", quantity: -5, unit: "units", reason: "Walk-in container sales", adjustedBy: "Andrea Reyes" },
];

// Out = wala nang stock. Low = mas mababa sa minimum.
export const getStockStatus = (p: Product): StockStatus =>
  p.fullStock === 0 ? "out" : p.fullStock < p.minimum ? "low" : "in_stock";

export const formatNumber = (n: number) => n.toLocaleString("en-US");
export const formatStock = (n: number, unit: StockUnit) => `${formatNumber(n)} ${unit}`;
export const formatSigned = (n: number) => `${n > 0 ? "+" : "−"}${formatNumber(Math.abs(n))}`;

export const STOCK_BADGE: Record<StockStatus, { label: string; className: string }> = {
  in_stock: { label: "In Stock", className: "bg-emerald-50 text-emerald-700" },
  low: { label: "Low", className: "bg-amber-50 text-amber-700" },
  out: { label: "Out", className: "bg-red-50 text-red-600" },
};

export const MOVEMENT_LABEL: Record<MovementType, string> = {
  add_full_stock: "Add full stock",
  deduct_full_stock: "Deduct full stock",
  add_empty_stock: "Add empty stock",
  deduct_stock: "Deduct stock",
};