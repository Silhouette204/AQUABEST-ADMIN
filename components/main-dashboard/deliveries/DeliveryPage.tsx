"use client";

import { useState } from "react";
import { ChevronDown, Download, Search } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import { DELIVERIES, STATS } from "./deliveries";
import { DeliveryStatsCards } from "./DeliveryStats";
import { DeliveriesTable } from "./DeliveriesTable";
import { ProofOfDelivery } from "./ProofOfDelivery";
import { GpsHistory } from "./GpsHistory";
import { FailedReasons } from "./FailedReasons";
import { DataState, getViewState } from "../shared/DataState";

const TABS = [
  { label: "All deliveries", match: () => true },
  { label: "Delivered", match: (s: string) => s === "delivered" },
  { label: "Failed", match: (s: string) => s === "failed" },
];

export function DeliveriesPage() {
  const [items, setItems] = useState(DELIVERIES);
  const [tab, setTab] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(DELIVERIES[0]?.orderId ?? null);

  const visible = items.filter((d) => TABS[tab]?.match(d.status));
  const selected = items.find((d) => d.orderId === selectedId) ?? null;

  // TODO(backend): palitan ng isLoading/isError mula sa API
  const state = getViewState({ isLoading: false, isError: false, count: visible.length });

  const handleVerify = (orderId: string) => {
    // TODO: tawagin ang API dito, tapos i-update ang state sa success
    setItems((prev) => prev.map((d) => (d.orderId === orderId ? { ...d, verified: true } : d)));
  };

  return (
    <AdminShell active="Deliveries">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Deliveries</h1>
          <p className="text-sm text-secondary/60">
            Review delivery outcomes, proof of delivery, and route history.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-secondary/10 bg-white px-4 py-2 text-sm font-medium">
          <Download size={16} /> Export deliveries
        </button>
      </div>

      <div className="mt-6">
        <DeliveryStatsCards stats={STATS} />
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
                  </button>
                ))}
              </div>

              {/* Filters (static muna) */}
              <div className="my-4 flex gap-3">
                <div className="relative w-64">
                  <Search size={16} className="absolute right-3 top-3 text-secondary/40" />
                  <input
                    placeholder="Search delivery or customer"
                    className="w-full rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm"
                  />
                </div>
                {["Today, Nov 5", "All riders"].map((label) => (
                  <button
                    key={label}
                    className="flex items-center gap-6 rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm"
                  >
                    {label} <ChevronDown size={16} />
                  </button>
                ))}
              </div>
            </div>

            <DataState state={state} emptyTitle="No deliveries found">
              <DeliveriesTable deliveries={visible} selectedId={selectedId} onSelect={setSelectedId} />
            </DataState>
          </div>

          <FailedReasons failed={items.filter((d) => d.status === "failed")} />
        </div>

        {/* Kanan */}
        <div className="space-y-4">
          {selected && <ProofOfDelivery delivery={selected} onVerify={handleVerify} />}
          {selected && <GpsHistory points={selected.gps} />}
        </div>
      </div>
    </AdminShell>
  );
}