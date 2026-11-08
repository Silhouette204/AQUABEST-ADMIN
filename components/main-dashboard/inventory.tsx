import { AdminShell } from "@/components/main-dashboard/admin-shell";

export function InventoryPage() {
  return (
    <AdminShell active="Products & Inventory">
      <div>
        <h1 className="text-xl font-bold">Products & Inventory</h1>
        <p className="text-sm text-secondary/60">Inventory view component placeholder.</p>
      </div>
    </AdminShell>
  );
}