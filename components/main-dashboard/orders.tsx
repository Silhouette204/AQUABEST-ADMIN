import { AdminShell } from "@/components/main-dashboard/admin-shell";

export function OrdersView() {
  return (
    <AdminShell active="Orders">
    <div>
      <h1 className="text-xl font-bold">Orders Management</h1>
      <p className="text-sm text-secondary/60">Dito makikita ang mga orders.</p>
    </div>
    </AdminShell>
  );
}