import { useState } from "react";
import { Check, ChevronDown, Clock, UserPlus } from "lucide-react";
import { riderAvailability, type DispatchOrder, type Rider } from "./dispatch";

interface Props {
  orders: DispatchOrder[];
  riders: Rider[];
  onAssign: (orderId: string, riderId: string) => void;
}

export function UnassignedOrders({ orders, riders, onAssign }: Props) {
  const [openId, setOpenId] = useState<string | null>(orders[0]?.id ?? null);
  const [picked, setPicked] = useState<Record<string, string>>({});

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-secondary/50">
        Sorted by schedule · earliest first
      </p>

      {orders.map((o) => {
        const isOpen = openId === o.id;
        const rider = riders.find((r) => r.id === picked[o.id]);

        return (
          <div key={o.id} className="rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-sky-600">#{o.id}</span>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-600">Pending</span>
            </div>

            <p className="mt-3 font-semibold">{o.customerName}</p>
            <p className="text-sm text-secondary/60">{o.address}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-sky-600">
              <Clock size={14} /> {o.window}
            </p>
            <p className="text-sm text-secondary/60">
              {o.items} · {o.paymentMethod}
            </p>

            {isOpen || rider ? (
              <div className="mt-3">
                <button
                  onClick={() => setOpenId(isOpen ? null : o.id)}
                  className="flex w-full items-center justify-between rounded-lg border border-sky-400 px-3 py-2 text-sm"
                >
                  <span>
                    {rider ? `${rider.name} · ${rider.activeOrders} active` : "Select rider"}
                  </span>
                  <ChevronDown size={16} />
                </button>

                {isOpen && (
                  <ul className="mt-1 rounded-lg border bg-white p-1 shadow-sm">
                    {riders.map((r) => (
                      <li key={r.id}>
                        <button
                          onClick={() => {
                            setPicked((p) => ({ ...p, [o.id]: r.id }));
                            setOpenId(null);
                          }}
                          className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-[11px] font-semibold text-sky-700">
                            {r.initials}
                          </span>
                          <span className="flex-1">
                            <span className="block text-sm font-medium">{r.name}</span>
                            <span className="block text-xs text-secondary/60">
                              {riderAvailability(r)} · {r.activeOrders}/{r.maxOrders} orders
                            </span>
                          </span>
                          {picked[o.id] === r.id && <Check size={16} className="text-sky-600" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  disabled={!rider}
                  onClick={() => rider && onAssign(o.id, rider.id)}
                  className="mt-3 flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  <UserPlus size={16} /> Assign Rider
                </button>
              </div>
            ) : (
              <button
                onClick={() => setOpenId(o.id)}
                className="mt-3 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
              >
                <UserPlus size={16} /> Assign Rider
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}