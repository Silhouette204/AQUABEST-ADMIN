"use client";

import { ChevronDown, Plus, Search, SlidersHorizontal } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import {
  ADJUSTMENTS,
  INVENTORY_STATS,
  LAST_UPDATED,
  PRODUCTS,
  getStockStatus,
} from "./inventory";
import { InventoryStatsCards } from "./InventoryStats";
import { LowStockBanner } from "./LowStockBanner";
import { InventoryTable } from "./InventoryTable";
import { AdjustmentHistory } from "./AdjustmentHistory";
import { DataState, getViewState } from "../shared/DataState";

export function InventoryPage() {
  const lowCount = PRODUCTS.filter((p) => getStockStatus(p) === "low").length;
  const outCount = PRODUCTS.filter((p) => getStockStatus(p) === "out").length;

  // TODO(backend): palitan ng isLoading/isError mula sa API
  const state = getViewState({ isLoading: false, isError: false, count: PRODUCTS.length });

  const handleEdit = (productId: string) => {
    // TODO: buksan ang Edit Product modal
    console.log("edit", productId);
  };

  const handleAdjust = (productId: string) => {
    // TODO: buksan ang Adjust Stock modal, tapos tawagin ang API
    console.log("adjust", productId);
  };

  return (
    <AdminShell active="Products & Inventory">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products &amp; Inventory</h1>
          <p className="text-sm text-secondary/60">
            Stay on top of every product, refill, and stock movement.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-secondary/10 bg-white px-4 py-2 text-sm font-medium">
            <SlidersHorizontal size={16} /> Adjust Stock
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-medium text-white">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div className="mt-6">
        <InventoryStatsCards stats={INVENTORY_STATS} />
      </div>

      <div className="mt-4">
        <LowStockBanner lowCount={lowCount} outCount={outCount} />
      </div>

      <div className="mt-4 space-y-4">
        <div className="rounded-xl border border-secondary/10 bg-white">
          {/* Filters (static muna) */}
          <div className="flex items-center gap-3 p-5">
            <div className="relative w-64">
              <Search size={16} className="absolute right-3 top-3 text-secondary/40" />
              <input
                placeholder="Search product name or SKU"
                className="w-full rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm"
              />
            </div>
            {["All categories", "All stock statuses"].map((label) => (
              <button
                key={label}
                className="flex items-center gap-8 rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm"
              >
                {label} <ChevronDown size={16} />
              </button>
            ))}
            <span className="ml-auto text-xs text-secondary/60">Last updated {LAST_UPDATED.toLowerCase()}</span>
          </div>

          <DataState
            state={state}
            emptyTitle="No products yet"
            emptyHint="Add a product to start tracking stock."
          >
            <InventoryTable products={PRODUCTS} onEdit={handleEdit} onAdjust={handleAdjust} />
          </DataState>
        </div>

        <AdjustmentHistory adjustments={ADJUSTMENTS} />
      </div>
    </AdminShell>
  );
}