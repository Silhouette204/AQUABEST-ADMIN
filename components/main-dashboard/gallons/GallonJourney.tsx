import { Check, CircleDot, MoreHorizontal, QrCode } from "lucide-react";
import { SCAN_BADGE, SCAN_TITLE, STATUS_BADGE, type Gallon } from "./gallons";

const STEPS = [1, 2, 3] as const;

export function GallonJourney({ gallon: g }: { gallon: Gallon }) {
  const badge = STATUS_BADGE[g.status];
  const latest = Math.max(0, ...g.scans.map((s) => s.step));

  const rows: [string, string][] = [
    ["Linked order", g.linkedOrder ? `#${g.linkedOrder}` : "—"],
    ["Last known location", g.lastKnownLocation],
    ["Days with customer", g.daysWithCustomer === null ? "—" : `${g.daysWithCustomer} days`],
  ];

  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Gallon journey</h2>
        <MoreHorizontal size={16} className="text-tertiary" />
      </div>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <p className="text-2xl font-bold">{g.id}</p>
          <p className="text-sm text-secondary/60">
            {g.owner} · {g.description}
          </p>
        </div>
        <QrCode size={28} className="text-secondary/70" />
      </div>

      <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>
        ● {badge.label}
      </span>

      <ol className="mt-4 space-y-5 border-t border-secondary/10 pt-4">
        {STEPS.map((n) => {
          const scan = g.scans.find((s) => s.step === n);
          const sb = scan ? SCAN_BADGE[scan.result] : undefined;
          const iconStyle = !scan
            ? "border border-secondary/20"
            : n === latest
              ? "bg-tertiary/10 text-tertiary"
              : "bg-emerald-100 text-emerald-600";

          return (
            <li key={n} className="flex gap-3">
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${iconStyle}`}>
                {scan && (n === latest ? <CircleDot size={12} /> : <Check size={12} />)}
              </span>
              <div>
                <p className="text-sm font-medium">
                  Scan {n} · {SCAN_TITLE[n]}
                </p>
                {scan && sb ? (
                  <>
                    <p className="text-xs text-secondary/60">
                      {scan.actor} · {scan.role}
                    </p>
                    <p className="text-xs text-secondary/60">{scan.at}</p>
                    <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs ${sb.className}`}>
                      ● {sb.label}
                    </span>
                  </>
                ) : (
                  <p className="text-xs text-secondary/50">Waiting for scan</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 space-y-3 border-t border-secondary/10 pt-4 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between">
            <span className="text-secondary/60">{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>

      <button className="mt-4 flex items-center gap-2 rounded-lg border border-secondary/10 px-4 py-2 text-sm font-medium">
        <QrCode size={14} /> View QR label
      </button>
    </div>
  );
}