"use client";

import { useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, UserPlus } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import { RIDERS, RIDER_STATS } from "./riders";
import { RiderStatsCards } from "./RiderStats";
import { RidersTable } from "./RidersTable";
import { CurrentDeliveries } from "./CurrentDeliveries";
import { RiderProfile } from "./RidersProfile";
import { RiderPerformance } from "./RiderPerformance";

export function RidersPage() {
  const [selectedId, setSelectedId] = useState<string | null>(RIDERS[0]?.id ?? null);
  const selected = RIDERS.find((r) => r.id === selectedId) ?? null;

  return (
    <AdminShell active="Riders">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Riders</h1>
          <p className="text-sm text-secondary/60">
            Keep your delivery team connected, available, and performing at their best.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-medium text-white">
          <UserPlus size={16} /> Create rider account
        </button>
      </div>

      <div className="mt-6">
        <RiderStatsCards stats={RIDER_STATS} />
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
                  placeholder="Search rider name or phone"
                  className="w-full rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm"
                />
              </div>
              <button className="flex items-center gap-8 rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm">
                All availability <ChevronDown size={16} />
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm font-medium">
                <SlidersHorizontal size={16} /> More filters
              </button>
            </div>

            <RidersTable riders={RIDERS} selectedId={selectedId} onSelect={setSelectedId} />
          </div>

          {selected && <CurrentDeliveries rider={selected} />}
        </div>

        {/* Kanan */}
        {selected && (
          <div className="space-y-4">
            <RiderProfile rider={selected} />
            <RiderPerformance rider={selected} />
          </div>
        )}
      </div>
    </AdminShell>
  );
}