"use client";

import { useState } from "react";
import { ChevronDown, Clock, QrCode, ScanLine, Search } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import { GALLONS, GALLON_STATS, UNSUCCESSFUL_SCANS, totalGallons, type GallonStatus } from "./gallons";
import { GallonStatusCards } from "./GallonStatusCards";
import { GallonsTable } from "./GallonsTable";
import { GallonJourney } from "./GallonJourney";
import { OverdueBanner } from "./OverdueBanner";
import { UnsuccessfulScans } from "./UnsuccessfulScans";
import { DataState, getViewState } from "../shared/DataState";

export function GallonsPage() {
  const [activeStatus, setActiveStatus] = useState<GallonStatus | null>(null);
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(GALLONS[0]?.id ?? null);

  const visible = GALLONS.filter(
    (g) => (!activeStatus || g.status === activeStatus) && (!overdueOnly || g.overdueDays !== null),
  );
  const selected = GALLONS.find((g) => g.id === selectedId) ?? null;
  const overdue = GALLONS.filter((g) => g.overdueDays !== null);

  // TODO(backend): palitan ng isLoading/isError mula sa API
  const state = getViewState({ isLoading: false, isError: false, count: visible.length });

  return (
    <AdminShell active="Gallon Tracking">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gallon Tracking</h1>
          <p className="text-sm text-secondary/60">
            Every gallon has a story. Follow it from refill to delivery and return.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-secondary/10 bg-white px-4 py-2 text-sm font-medium">
            <ScanLine size={16} /> Scan QR
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-medium text-white">
            <QrCode size={16} /> Generate QR
          </button>
        </div>
      </div>

      <div className="mt-6">
        <GallonStatusCards stats={GALLON_STATS} active={activeStatus} onSelect={setActiveStatus} />
      </div>

      <div className="mt-4 grid grid-cols-[1fr_320px] gap-4">
        {/* Kaliwa */}
        <div className="space-y-4">
          <div className="rounded-xl border border-secondary/10 bg-white">
            {/* Filters */}
            <div className="flex gap-3 p-5">
              <div className="relative w-64">
                <Search size={16} className="absolute right-3 top-3 text-secondary/40" />
                <input
                  placeholder="Search QR, gallon ID, or customer"
                  className="w-full rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm"
                />
              </div>
              <button className="flex items-center gap-8 rounded-lg border border-secondary/10 bg-white px-3 py-2 text-sm">
                All statuses <ChevronDown size={16} />
              </button>
              <button
                onClick={() => setOverdueOnly((v) => !v)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${
                  overdueOnly
                    ? "border-tertiary bg-tertiary/10 text-tertiary"
                    : "border-secondary/10 bg-white"
                }`}
              >
                <Clock size={16} /> Overdue only
              </button>
            </div>

            <DataState
              state={state}
              emptyTitle="No gallons found"
              emptyHint="Try a different status or turn off the overdue filter."
            >
              <GallonsTable
                gallons={visible}
                total={totalGallons(GALLON_STATS)}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </DataState>
          </div>

          <OverdueBanner overdue={overdue} />
          <UnsuccessfulScans scans={UNSUCCESSFUL_SCANS} />
        </div>

        {/* Kanan */}
        {selected && <GallonJourney gallon={selected} />}
      </div>
    </AdminShell>
  );
}