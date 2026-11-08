import { AdminShell } from "@/components/main-dashboard/admin-shell";

export function CustomersPage() {
  return (
    <AdminShell active="Customers">
      <div>
        <h1 className="text-xl font-bold">Customers</h1>
        <p className="text-sm text-secondary/60">Customers view component placeholder.</p>
      </div>
    </AdminShell>
  );
}