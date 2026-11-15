import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MOVEMENT_LABEL, formatSigned, type Adjustment } from "./inventory";

export function AdjustmentHistory({ adjustments }: { adjustments: Adjustment[] }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-xl border border-secondary/10 bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="font-bold">Adjustment History</h2>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1 text-sm font-medium text-tertiary"
        >
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {open ? "Collapse" : "Expand"}
        </button>
      </div>

      {open &&
        (adjustments.length === 0 ? (
          <p className="px-5 pb-5 text-sm text-secondary/60">No stock adjustments yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-primary text-xs text-secondary/60">
              <tr>
                {["Date & time", "Product", "Movement", "Quantity", "Reason", "Adjusted by"].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adjustments.map((a) => (
                <tr key={a.id} className="border-t border-secondary/10">
                  <td className="px-5 py-3 font-medium text-tertiary">{a.dateTime}</td>
                  <td className="px-5 py-3">{a.productName}</td>
                  <td className="px-5 py-3">{MOVEMENT_LABEL[a.movement]}</td>
                  <td className="px-5 py-3">
                    {formatSigned(a.quantity)} {a.unit}
                  </td>
                  <td className="px-5 py-3">{a.reason}</td>
                  <td className="px-5 py-3">{a.adjustedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
    </div>
  );
}