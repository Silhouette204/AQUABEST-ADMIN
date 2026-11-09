import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";

export function ReportsPage() {
  return (
    <AdminShell active="Reports">
      <div>
        <h1 className="text-xl font-bold">Reports</h1>
        <p className="text-sm text-secondary/60">Reports view component placeholder.</p>
      </div>
    </AdminShell>
  );
}