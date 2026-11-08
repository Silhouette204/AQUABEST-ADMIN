import Link from "next/link";
import { Calendar, CircleAlert, CircleCheck, ClipboardCheck, Clock, Package, Plus, Truck, Wallet } from "lucide-react";

type Status = "Pending" | "Assigned" | "Out for Delivery" | "Delivered" | "Failed";
type Order = { id: string; customer: string; items: string; status: Status; rider?: string; time: string };
type Rider = { name: string; note: string; status: "Busy" | "Available" | "Offline" };
type StockItem = { name: string; note: string };
type Kpis = { newOrders: number; pending: number; outForDelivery: number; delivered: number; failed: number; sales: number };
type GallonCounts = { refilling: number; outForDelivery: number; withCustomer: number; returned: number };

// Lahat ng data ay galing sa props. Walang laman = empty state.
export type DashboardProps = {
  userName?: string;
  kpis?: Kpis;
  volume?: { labels: string[]; data: number[] };
  orders?: Order[];
  lowStock?: StockItem[];
  riders?: Rider[];
  gallons?: GallonCounts;
};

const emptyKpis: Kpis = { newOrders: 0, pending: 0, outForDelivery: 0, delivered: 0, failed: 0, sales: 0 };
const emptyGallons: GallonCounts = { refilling: 0, outForDelivery: 0, withCustomer: 0, returned: 0 };

const card = "rounded-xl border border-secondary/10 bg-white shadow-sm";
const statusStyle: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  "Out for Delivery": "bg-sky-100 text-sky-700",
  Assigned: "bg-blue-100 text-blue-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Failed: "bg-red-100 text-red-600",
  Busy: "bg-amber-100 text-amber-700",
  Available: "bg-emerald-100 text-emerald-700",
  Offline: "bg-slate-100 text-slate-500",
  Low: "bg-amber-100 text-amber-700",
};

function Badge({ text }: { text: string }) {
  return <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusStyle[text]}`}>{text}</span>;
}

function Empty({ text }: { text: string }) {
  return <p className="py-6 text-center text-sm text-secondary/50">{text}</p>;
}

function CardHeader({ title, link, href = "#" }: { title: string; link: string; href?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h2 className="font-semibold">{title}</h2>
      <Link href={href} className="whitespace-nowrap text-xs font-semibold text-tertiary hover:underline">
        {link}
      </Link>
    </div>
  );
}

function LineChart({ labels, data }: { labels: string[]; data: number[] }) {
  if (data.length === 0) return <Empty text="No order data yet." />;

  const W = 600, H = 220, L = 36, B = 28, T = 10, R = 8;
  const max = Math.ceil(Math.max(...data, 5) / 20) * 20;
  const x = (i: number) => L + (i * (W - L - R)) / Math.max(data.length - 1, 1);
  const y = (v: number) => T + (1 - v / max) * (H - T - B);
  const line = data.map((v, i) => `${x(i)},${y(v)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full">
      {[0, 1, 2, 3, 4].map((n) => {
        const g = (max / 4) * n;
        return (
          <g key={n}>
            <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} className="stroke-secondary/10" />
            <text x={L - 8} y={y(g) + 4} textAnchor="end" className="fill-secondary/50 text-[10px]">{g}</text>
          </g>
        );
      })}
      <polygon points={`${x(0)},${y(0)} ${line} ${x(data.length - 1)},${y(0)}`} className="fill-tertiary/10" />
      <polyline points={line} fill="none" strokeWidth={2.5} className="stroke-tertiary" />
      {data.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={3} className="fill-tertiary" />
      ))}
      {labels.map((l, i) => (
        <text key={l + i} x={x(i)} y={H - 8} textAnchor="middle" className="fill-secondary/50 text-[10px]">{l}</text>
      ))}
    </svg>
  );
}

function Donut({ segs }: { segs: { value: number; color: string }[] }) {
  const total = segs.reduce((s, g) => s + g.value, 0);
  const r = 40, C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        {total === 0 ? (
          <circle cx={50} cy={50} r={r} fill="none" strokeWidth={13} className="stroke-secondary/10" />
        ) : (
          segs.map((s, i) => {
            const len = (s.value / total) * C;
            const el = (
              <circle key={i} cx={50} cy={50} r={r} fill="none" stroke={s.color} strokeWidth={13}
                strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-acc} />
            );
            acc += len;
            return el;
          })
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold">{total}</span>
        <span className="text-[10px] text-secondary/50">gallons</span>
      </div>
    </div>
  );
}

export function DashboardView({
  userName,
  kpis = emptyKpis,
  volume = { labels: [], data: [] },
  orders = [],
  lowStock = [],
  riders = [],
  gallons = emptyGallons,
}: DashboardProps) {
  const totalOrders = volume.data.reduce((a, b) => a + b, 0);
  const online = riders.filter((r) => r.status !== "Offline").length;
  const firstName = userName?.split(" ")[0];

  const kpiCards = [
    { label: "New Orders Today", value: kpis.newOrders, tone: "text-tertiary", icon: ClipboardCheck },
    { label: "Pending Orders", value: kpis.pending, tone: "text-amber-600", icon: Clock },
    { label: "Out for Delivery", value: kpis.outForDelivery, tone: "text-tertiary", icon: Truck },
    { label: "Delivered Today", value: kpis.delivered, tone: "text-emerald-600", icon: CircleCheck },
    { label: "Failed Deliveries", value: kpis.failed, tone: "text-red-500", icon: CircleAlert },
    { label: "Sales Today", value: `₱${kpis.sales.toLocaleString("en-US")}`, tone: "text-emerald-600", icon: Wallet },
  ];

  const gallonSegs = [
    { label: "Refilling", value: gallons.refilling, color: "#b7791f" },
    { label: "Out for Delivery", value: gallons.outForDelivery, color: "#0EA5E9" },
    { label: "With Customer", value: gallons.withCustomer, color: "#0B2545" },
    { label: "Returned", value: gallons.returned, color: "#059669" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Your station at a glance</h1>
          <p className="mt-1 text-sm text-secondary/60">
            {firstName ? `Welcome back, ${firstName}. ` : ""}
            {"Here's what's flowing today."}
          </p>
        </div>
        <div className="flex gap-3">
          <button className={`${card} flex items-center gap-2 px-4 py-2 text-sm font-medium`}>
            <Calendar size={15} className="text-secondary/60" /> Today
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-semibold text-white hover:bg-tertiary/85">
            <Plus size={16} /> New order
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {kpiCards.map(({ label, value, tone, icon: Icon }) => (
          <div key={label} className={`${card} p-4`}>
            <div className="flex items-start justify-between gap-2 text-xs text-secondary/60">
              {label} <Icon size={15} className={`shrink-0 ${tone}`} />
            </div>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* LEFT */}
        <div className="min-w-0 space-y-6 xl:col-span-2">
          <section className={`${card} p-5`}>
            <CardHeader title="Order volume" link="Last 7 days" />
            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-semibold">{totalOrders}</span>
              <span className="text-xs text-secondary/50">total orders</span>
            </p>
            <LineChart labels={volume.labels} data={volume.data} />
          </section>

          <section className={card}>
            <div className="p-5 pb-3">
              <CardHeader title="Recent orders" link="View all orders →" href="/orders" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-primary text-xs text-secondary/60">
                  <tr>
                    {["Order ID", "Customer", "Items", "Status", "Rider", "Time"].map((h) => (
                      <th key={h} className="whitespace-nowrap px-5 py-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6}><Empty text="No orders yet." /></td>
                    </tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o.id} className="border-t border-secondary/10">
                        <td className="whitespace-nowrap px-5 py-3 font-semibold text-tertiary">{o.id}</td>
                        <td className="whitespace-nowrap px-5 py-3">{o.customer}</td>
                        <td className="whitespace-nowrap px-5 py-3 text-secondary/70">{o.items}</td>
                        <td className="px-5 py-3"><Badge text={o.status} /></td>
                        <td className="whitespace-nowrap px-5 py-3 text-secondary/70">{o.rider ?? "Unassigned"}</td>
                        <td className="whitespace-nowrap px-5 py-3 text-secondary/70">{o.time}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-secondary/10 px-5 py-3 text-xs text-secondary/50">
              <span>{orders.length} orders shown</span>
              <Link href="/orders" className="font-semibold text-tertiary">Manage orders →</Link>
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="min-w-0 space-y-6">
          <section className={`${card} p-5`}>
            <CardHeader title="Low stock alerts" link="View inventory" href="/inventory" />
            {lowStock.length === 0 ? (
              <Empty text="No low stock items." />
            ) : (
              <ul className="mt-4 space-y-3">
                {lowStock.map((item) => (
                  <li key={item.name} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <Package size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{item.name}</span>
                      <span className="block text-[11px] text-secondary/50">{item.note}</span>
                    </span>
                    <Badge text="Low" />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className={`${card} p-5`}>
            <CardHeader title="Active riders" link="View all" href="/riders" />
            {riders.length === 0 ? (
              <Empty text="No riders yet." />
            ) : (
              <>
                <ul className="mt-4 space-y-3">
                  {riders.map((r) => (
                    <li key={r.name} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tertiary/15 text-[11px] font-semibold text-tertiary">
                        {r.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{r.name}</span>
                        <span className="block text-[11px] text-secondary/50">{r.note}</span>
                      </span>
                      <Badge text={r.status} />
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-secondary/10 pt-3 text-[11px] text-secondary/50">
                  {online} online of {riders.length} riders
                </p>
              </>
            )}
          </section>

          <section className={`${card} p-5`}>
            <CardHeader title="Gallon status" link="Track gallons →" href="/gallons" />
            <div className="mt-4 flex items-center gap-5">
              <Donut segs={gallonSegs} />
              <ul className="min-w-0 flex-1 space-y-2 text-xs">
                {gallonSegs.map((g) => (
                  <li key={g.label} className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: g.color }} />
                    <span className="flex-1 text-secondary/60">{g.label}</span>
                    <span className="font-semibold">{g.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}