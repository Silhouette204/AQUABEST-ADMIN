import { AdminShell } from "@/components/main-dashboard/admin-shell";

export function SettingsPage() {
  return (
    <AdminShell active="Settings">
      <div>
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-sm text-secondary/60">Settings view component placeholder.</p>
      </div>
    </AdminShell>
  );
}