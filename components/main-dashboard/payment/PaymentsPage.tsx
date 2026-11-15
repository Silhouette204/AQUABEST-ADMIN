"use client";

import { useState } from "react";
import { ChevronDown, Download, Info, Plus, Search } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import type { PaymentStatus } from "../orders/orders";
import { PAYMENTS, PAYMENT_STATS, TOTAL_PAYMENTS } from "./payments";
import { PaymentStatsCards } from "./PaymentStats";
import { PaymentsTable } from "./PaymentsTable";
import { ReviewPayment } from "./ReviewPayment";
import { DataState, getViewState } from "../shared/DataState";

const TABS: { label: string; match: (s: PaymentStatus) => boolean; showCount?: boolean }[] = [
  { label: "All payments", match: () => true },
  { label: "To verify", match: (s) => s === "unverified", showCount: true },
  { label: "Paid", match: (s) => s === "paid" },
  { label: "Pending", match: (s) => s === "pending" },
];

export function PaymentsPage() {
  const [items, setItems] = useState(PAYMENTS);
  const [tab, setTab] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(PAYMENTS[0]?.orderId ?? null);

  const visible = items.filter((p) => TABS[tab]?.match(p.status));
  const selected = items.find((p) => p.orderId === selectedId) ?? null;

  // TODO(backend): palitan ng isLoading/isError mula sa API
  const state = getViewState({ isLoading: false, isError: false, count: visible.length });

  const handleVerify = (orderId: string) => {
    // TODO: tawagin ang API dito, tapos i-update ang state sa success
    setItems((prev) => prev.map((p) => (p.orderId === orderId ? { ...p, status: "paid" } : p)));
  };

  return (
    <AdminShell active="Payments">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-sm text-secondary/60">
            Reconcile collections and verify every transaction with confidence.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-secondary/10 bg-white px-4 py-2 text-sm font-medium">
            <Download size={16} /> Export payments
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-medium text-white">
            <Plus size={16} /> Record payment
          </button>
        </div>
      </div>

      <div className="mt-6">
        <PaymentStatsCards stats={PAYMENT_STATS} />
      </div>

      <div className="mt-4 grid grid-cols-[1fr_340px] gap-4">
        {/* Kaliwa */}
        <div className="space-y-4">
          <div className="rounded-xl border border-secondary/10 bg-white">
            <div className="px-5 pt-4">
              <div className="flex gap-6 border-b border-secondary/10 text-sm">
                {TABS.map((t, i) => (
                  <button
                    key={t.label}
                    onClick={() => setTab(i)}
                    className={`-mb-px pb-3 ${
                      tab === i ? "border-b-2 border-tertiary font-medium text-tertiary" : "text-secondary/60"
                    }`}
                  >
                    {t.label}
                    {t.showCount && (
                      <span className="ml-1.5 font-semibold">
                        {items.filter((p) => t.match(p.status)).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Filters (static muna) */}
              <div className="my-4 flex gap-3">
                <div className="relative w-64">
                  <Search size={16} className="absolute right-3 top-3 text-secondary/40" />
                  <input
                    placeholder="Search order or customer"
                    className="w-full rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm"
                  />
                </div>
                {["All methods", "Nov 5, 2026"].map((label) => (
                  <button
                    key={label}
                    className="flex items-center gap-8 rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm"
                  >
                    {label} <ChevronDown size={16} />
                  </button>
                ))}
              </div>
            </div>

            <DataState
              state={state}
              emptyTitle="No payments found"
              emptyHint="Try a different tab or filter."
            >
              <PaymentsTable
                payments={visible}
                total={TOTAL_PAYMENTS}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </DataState>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-tertiary/10 px-4 py-3 text-sm text-secondary/80">
            <Info size={16} className="shrink-0 text-tertiary" />
            Cash collections are marked paid after the rider remits and the station confirms receipt.
          </div>
        </div>

        {/* Kanan */}
        {selected && <ReviewPayment payment={selected} onVerify={handleVerify} />}
      </div>
    </AdminShell>
  );
}