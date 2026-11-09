import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";

export function FeedbackPage() {
  return (
    <AdminShell active="Feedback & Messages">
      <div>
        <h1 className="text-xl font-bold">Feedback & Messages</h1>
        <p className="text-sm text-secondary/60">Feedback view component placeholder.</p>
      </div>
    </AdminShell>
  );
}