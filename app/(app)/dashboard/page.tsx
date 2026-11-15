import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import { DashboardView } from "@/components/main-dashboard/dashboard/dashboard";

export default function DashboardPreviewPage() {
  return (
    <AdminShell active="Dashboard">
      <DashboardView />
    </AdminShell>
  );
}