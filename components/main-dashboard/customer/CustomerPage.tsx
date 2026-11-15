"use client";

import { useState } from "react";
import { ChevronDown, Download, Search, SlidersHorizontal, UserPlus } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import { CUSTOMERS, CUSTOMER_STATS } from "./customers";
import { CustomerStatsCards } from "./CustomerStats";
import { CustomersTable } from "./CustomersTable";
import { CustomerProfile } from "./CustomerProfile";
import { LoyaltyGallons } from "./LoyaltyGallons";
import { OrderHistory } from "./OrderHistory";
import { DataState, getViewState } from "../shared/DataState";

export function CustomersPage() {
  const [selectedId, setSelectedId] = useState<string | null>(CUSTOMERS[0]?.id ?? null);
  const selected = CUSTOMERS.find((c) => c.id === selectedId) ?? null;

  // TODO(backend): palitan ng isLoading/isError mula sa API
  const state = getViewState({ isLoading: false, isError: false, count: CUSTOMERS.length });

  return (
    <AdminShell active="Customers">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-sm text-secondary/60">
            A complete view of the people and households you serve.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-secondary/10 bg-white px-4 py-2 text-sm font-medium">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-medium text-white">
            <UserPlus size={16} /> Add customer
          </button>
        </div>
      </div>

      <div className="mt-6">
        <CustomerStatsCards stats={CUSTOMER_STATS} />
      </div>

      <div className="mt-4 grid grid-cols-[1fr_320px] gap-4">
        {/* Kaliwa */}
        <div className="space-y-4">
          <div className="rounded-xl border border-secondary/10 bg-white">
            {/* Filters (static muna) */}
            <div className="flex gap-3 p-5">
              <div className="relative w-64">
                <Search size={16} className="absolute right-3 top-3 text-secondary/40" />
                <input
                  placeholder="Search name, phone, or address"
                  className="w-full rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm"
                />
              </div>
              <button className="flex items-center gap-8 rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm">
                All customer types <ChevronDown size={16} />
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm font-medium">
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>

            <DataState
              state={state}
              emptyTitle="No customers found"
              emptyHint="Add a customer to get started."
            >
              <CustomersTable customers={CUSTOMERS} selectedId={selectedId} onSelect={setSelectedId} />
            </DataState>
          </div>

          {selected && <OrderHistory customer={selected} />}
        </div>

        {/* Kanan */}
        {selected && (
          <div className="space-y-4">
            <CustomerProfile customer={selected} />
            <LoyaltyGallons customer={selected} />
          </div>
        )}
      </div>
    </AdminShell>
  );
}