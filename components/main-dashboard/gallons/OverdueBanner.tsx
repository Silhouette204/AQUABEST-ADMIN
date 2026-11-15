import { TriangleAlert } from "lucide-react";
import type { Gallon } from "./gallons";

export function OverdueBanner({ overdue }: { overdue: Gallon[] }) {
  const first = overdue[0];
  if (!first) return null;

  const more = overdue.length - 1;

  return (
    <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
      <TriangleAlert size={16} className="shrink-0" />
      <span>
        {first.id} has been with {first.owner} for {first.overdueDays} days
        {more > 0 ? ` (and ${more} more overdue)` : ""}. Send a return reminder or schedule collection.
      </span>
    </div>
  );
}