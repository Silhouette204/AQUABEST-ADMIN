//orderDetails
import { Check, Pencil, UserPlus, X } from "lucide-react";
import { orderTotal, peso, PAYMENT_STYLE, type Order } from "./orders";

export function OrderDetail({ order, onClose }: { order: Order; onClose: () => void }) {
  const row = (label: string, value: string) => (
    <div key={label} className="flex justify-between text-sm">
      <span className="text-secondary/60">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );

  return (
    <aside className="space-y-4 rounded-xl border bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold">Order #{order.id}</h2>
          <p className="text-xs text-secondary/60">
            {order.type === "online" ? "Online" : "Walk-in"} · {order.createdAt}
          </p>
        </div>
        <button onClick={onClose}><X size={16} /></button>
      </div>

      <div className="border-t pt-4">
        <p className="text-xs uppercase text-secondary/60">Customer</p>
        <p className="font-semibold">{order.customerName}</p>
        <p className="text-sm text-secondary/60">{order.customerPhone}</p>
        <p className="mt-1 text-sm">{order.address}</p>
      </div>

      <div className="space-y-2 border-t pt-4">
        {order.items.map((i) => row(`${i.qty} × ${i.name}`, peso(i.qty * i.unitPrice)))}
        {row("Delivery fee", order.deliveryFee === 0 ? "Free" : peso(order.deliveryFee))}
        {row("Total amount", peso(orderTotal(order)))}
        {row("Payment method", order.paymentMethod)}
        {row("Payment status", PAYMENT_STYLE[order.paymentStatus].label)}
      </div>

      <div className="border-t pt-4">
        <p className="mb-3 font-semibold">Order timeline</p>
        <ol className="space-y-4">
          {order.timeline.map((t) => (
            <li key={t.label} className="flex gap-3">
              <span
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                  t.done ? "bg-emerald-100 text-emerald-600" : "bg-sky-100 text-sky-600"
                }`}
              >
                <Check size={12} />
              </span>
              <div>
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-xs text-secondary/60">{t.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white">
          <UserPlus size={16} /> Assign Rider
        </button>
        <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">
          <Pencil size={14} /> Edit order
        </button>
        <button className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">Cancel order</button>
      </div>
    </aside>
  );
}