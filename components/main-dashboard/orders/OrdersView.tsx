//orderView.tsx
"use client";

import { useState } from "react";
import { Download, Plus, Search } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import { ORDERS, type OrderStatus } from "./orders";
import { OrdersTable } from "./OrdersTable";
import { OrderDetail } from "./OrdersDetails";

// (idikit dito ang STATUS_STYLE at PAYMENT_STYLE mula sa Step 2)

const TABS: { label: string; match: (s: OrderStatus) => boolean }[] = [
  { label: "All orders", match: () => true },
  { label: "Pending", match: (s) => s === "pending" },
  { label: "In progress", match: (s) => s === "assigned" || s === "out_for_delivery" },
  { label: "Completed", match: (s) => s === "delivered" },
  { label: "Failed", match: (s) => s === "failed" },
];

export function OrdersView() {
  const [tab, setTab] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(ORDERS[0]?.id ?? null);

  const visible = ORDERS.filter((o) => TABS[tab]?.match(o.status));
  const selected = ORDERS.find((o) => o.id === selectedId) ?? null;

  return (
    <AdminShell active="Orders">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-secondary/60">
            Manage every refill, from a new request to the customer&apos;s door.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white">
            <Plus size={16} /> New Walk-in Order
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-6 border-b text-sm">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setTab(i)}
            className={`-mb-px pb-3 ${
              tab === i ? "border-b-2 border-sky-500 font-medium text-sky-600" : "text-secondary/60"
            }`}
          >
            {t.label}{" "}
            <span className="font-semibold">{ORDERS.filter((o) => t.match(o.status)).length}</span>
          </button>
        ))}
      </div>

      {/* Filters (static muna, wala pang logic) */}
      <div className="mt-4 flex gap-3">
        <div className="relative w-64">
          <Search size={16} className="absolute right-3 top-3 text-secondary/40" />
          <input
            placeholder="Search ID or customer"
            className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
          />
        </div>
        <select className="rounded-lg border bg-white px-3 py-2 text-sm">
          <option>All statuses</option>
        </select>
        <select className="rounded-lg border bg-white px-3 py-2 text-sm">
          <option>Online / Walk-in</option>
        </select>
        <select className="rounded-lg border bg-white px-3 py-2 text-sm">
          <option>All riders</option>
        </select>
      </div>

      {/* Table + Detail panel */}
      <div className="mt-4 grid grid-cols-[1fr_320px] gap-4">
        <OrdersTable orders={visible} selectedId={selectedId} onSelect={setSelectedId} />
        {selected && <OrderDetail order={selected} onClose={() => setSelectedId(null)} />}
      </div>
    </AdminShell>
  );
}