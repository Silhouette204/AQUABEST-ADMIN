import { AdminShell } from "@/components/main-dashboard/admin-shell";
import { DashboardView } from "@/components/main-dashboard/dashboard";

export default function DashboardPreviewPage() {
  return (
    <AdminShell active="Dashboard">
      <DashboardView />
    </AdminShell>
  );
}