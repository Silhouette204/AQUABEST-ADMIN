"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Layers, Radio, RefreshCw } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import { MARKER_COLOR, RIDERS, UNASSIGNED } from "./dispatch";
import { UnassignedOrders } from "./UnassignedOrders";

const DispatchMap = dynamic(() => import("./DispatchMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-gray-100" />,
});

const ROUTE: [number, number][] = [
  [14.6765, 121.0445],
  [14.6776, 121.0428],
  [14.6788, 121.0412],
];

const LEGEND = [
  { label: "Pending", color: MARKER_COLOR.pending },
  { label: "Out for Delivery", color: MARKER_COLOR.out_for_delivery },
  { label: "Delivered", color: MARKER_COLOR.delivered },
  { label: "Failed", color: MARKER_COLOR.failed },
];

export function DispatchPage() {
  const [tab, setTab] = useState<"unassigned" | "active">("unassigned");

  const activeCount = RIDERS.reduce((sum, r) => sum + r.activeOrders, 0);

  const handleAssign = (orderId: string, riderId: string) => {
    // TODO: tawagin ang API dito (hal. client.orders[":id"].assign.$post(...))
    console.log("assign", orderId, riderId);
  };

  return (
    <AdminShell active="Dispatch">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dispatch center</h1>
          <p className="text-sm text-secondary/60">
            Connect the next order to the right rider. Track your team in real time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
          </span>
          <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium">
            <RefreshCw size={16} /> Refresh map
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[360px_1fr] gap-4">
        {/* Kaliwa: tabs + listahan */}
        <div>
          <div className="flex gap-6 border-b text-sm">
            {[
              { key: "unassigned", label: "Unassigned Orders", count: UNASSIGNED.length },
              { key: "active", label: "Active Deliveries", count: activeCount },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as "unassigned" | "active")}
                className={`-mb-px pb-3 ${
                  tab === t.key ? "border-b-2 border-sky-500 font-medium text-sky-600" : "text-secondary/60"
                }`}
              >
                {t.label} <span className="font-semibold">{t.count}</span>
              </button>
            ))}
          </div>

          <div className="mt-3">
            {tab === "unassigned" ? (
              <UnassignedOrders orders={UNASSIGNED} riders={RIDERS} onAssign={handleAssign} />
            ) : (
              <p className="py-8 text-center text-sm text-secondary/60">
                Active deliveries list, gagawin natin sa susunod.
              </p>
            )}
          </div>
        </div>

        {/* Kanan: mapa + overlays */}
        <div className="relative h-[640px] overflow-hidden rounded-xl border">
          <DispatchMap riders={RIDERS} orders={UNASSIGNED} route={ROUTE} />

          <div className="absolute left-3 top-3 z-[1000] flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs shadow-sm">
            <Radio size={14} className="text-emerald-500" />
            Live map · {RIDERS.length} riders online
          </div>

          <button className="absolute right-3 top-3 z-[1000] flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs shadow-sm">
            <Layers size={14} /> Layers
          </button>

          <div className="absolute bottom-3 left-3 right-3 z-[1000] flex gap-2 rounded-lg border bg-white px-3 py-2 text-xs shadow-sm">
            {LEGEND.map((l) => (
              <span key={l.label} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}