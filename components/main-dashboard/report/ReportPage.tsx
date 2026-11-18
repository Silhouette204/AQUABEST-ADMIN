"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import {
  DAILY_SALES,
  DEFAULT_FILTERS,
  LAST_UPDATED,
  REPORT_SUMMARY,
  type ReportFilters as Filters,
  type ReportTab,
} from "./reports";
import { ReportsFilters } from "./ReportsFilters";
import { ReportsStats } from "./ReportsStats";
import { SalesByProduct } from "./SalesByProduct";
import { OrderTrend } from "./OrderTrend";
import { DailySalesTable } from "./DailySalesTable";

export function ReportsPage() {
  const [tab, setTab] = useState<ReportTab>("Sales");
  const [draft, setDraft] = useState<Filters>(DEFAULT_FILTERS);
  const [applied, setApplied] = useState<Filters>(DEFAULT_FILTERS);

  const dirty = JSON.stringify(applied) !== JSON.stringify(draft);

  const updateFilters = (patch: Partial<Filters>) => setDraft((d) => ({ ...d, ...patch }));

  const handleApply = () => {
    // TODO(backend): i-fetch ulit ang summary at daily sales gamit ang draft na filters
    setApplied(draft);
  };

  const handlePickDate = () => {
    // TODO: buksan ang date range picker
  };

  const handleExportPdf = () => {
    // TODO(backend): export ng report gamit ang applied na filters
  };

  const handleExportExcel = () => {
    // TODO(backend): export ng report gamit ang applied na filters
  };

  return (
    <AdminShell active="Reports">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports &amp; Analytics</h1>
          <p className="text-sm text-secondary/60">
            Understand your station&apos;s performance and make every decision count.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportPdf}
            className="flex items-center gap-2 rounded-lg border border-secondary/10 bg-white px-4 py-2 text-sm font-medium"
          >
            <FileText size={16} /> Export PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-medium text-white"
          >
            <Download size={16} /> Export Excel
          </button>
        </div>
      </div>

      <div className="mt-6">
        <ReportsFilters
          filters={draft}
          onChange={updateFilters}
          onApply={handleApply}
          canApply={dirty}
          onPickDate={handlePickDate}
          tab={tab}
          onTabChange={setTab}
          updatedLabel={LAST_UPDATED}
        />
      </div>

      {tab === "Sales" ? (
        <div className="mt-4 space-y-4">
          <ReportsStats summary={REPORT_SUMMARY} />
          <div className="grid grid-cols-2 items-start gap-4">
            <SalesByProduct rows={DAILY_SALES} />
            <OrderTrend rows={DAILY_SALES} />
          </div>
          <DailySalesTable rows={DAILY_SALES} />
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-secondary/10 bg-white p-10 text-center text-sm text-secondary/60">
          The {tab} report is not available yet.
        </div>
      )}
    </AdminShell>
  );
}