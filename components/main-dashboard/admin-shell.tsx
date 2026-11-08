import Link from "next/link";
import {
  BarChart3,
  Bell,
  Bike,
  ChevronDown,
  ClipboardList,
  Crown,
  Droplets,
  LayoutDashboard,
  LifeBuoy,
  Map as MapIcon,
  MessageSquare,
  Package,
  ScanLine,
  Search,
  Settings,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Orders", icon: ClipboardList, href: "/orders" },
  { label: "Dispatch", icon: MapIcon, href: "/dispatch" },
  { label: "Deliveries", icon: Truck, href: "/deliveries" },
  { label: "Riders", icon: Bike, href: "/riders" },
  { label: "Customers", icon: Users, href: "/customers" },
  { label: "Products & Inventory", icon: Package, href: "/inventory" },
  { label: "Gallon Tracking", icon: ScanLine, href: "/gallons" },
  { label: "Payments", icon: Wallet, href: "/payments" },
  { label: "Loyalty & VIP", icon: Crown, href: "/loyalty" },
  { label: "Reports", icon: BarChart3, href: "/reports" },
  { label: "Feedback & Messages", icon: MessageSquare, href: "/feedback" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

type Props = {
  active: string;
  children: React.ReactNode;
  stationName?: string;
  userName?: string;
  userRole?: string;
  ordersBadge?: number; // ipakita lang kapag may laman
};

export function AdminShell({
  active,
  children,
  stationName = "Your station",
  userName = "Administrator",
  userRole = "Station administrator",
  ordersBadge,
}: Props) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    // fixed inset-0: sumasaklaw sa buong screen kahit may nakakulong na container sa parent layout
    <div className="fixed inset-0 z-50 flex overflow-hidden bg-primary text-secondary">
      {/* SIDEBAR */}
      <aside className="hidden h-full w-60 shrink-0 flex-col bg-secondary p-4 text-white lg:flex">
        <div className="flex items-center gap-3 px-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary">
            <Droplets size={22} />
          </span>
          <div>
            <p className="text-lg font-semibold leading-tight">AquaBest</p>
            <p className="text-[9px] uppercase tracking-wider text-white/50">Water Station Management</p>
          </div>
        </div>

        <button className="mt-5 flex w-full items-center justify-between rounded-xl bg-white/5 p-3 text-left">
          <span>
            <span className="block text-[10px] uppercase tracking-wider text-white/50">Your station</span>
            <span className="text-sm font-semibold">{stationName}</span>
          </span>
          <ChevronDown size={16} className="text-white/60" />
        </button>

        <nav className="mt-5 flex flex-1 flex-col gap-1 overflow-y-auto">
          {nav.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                label === active ? "bg-tertiary/25 font-semibold text-white" : "text-white/70 hover:bg-white/10"
              }`}
            >
              <Icon size={16} />
              {label}
              {label === "Orders" && ordersBadge ? (
                <span className="ml-auto rounded bg-tertiary px-1.5 text-[10px] font-semibold">{ordersBadge}</span>
              ) : null}
            </Link>
          ))}
        </nav>

        <button className="mt-4 flex w-full items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
          <LifeBuoy size={14} /> Help &amp; support
        </button>
      </aside>

      {/* MAIN */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-secondary/10 bg-white px-6">
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40" />
            <input
              placeholder="Search orders, customers, and more..."
              className="h-10 w-full rounded-lg border border-secondary/10 bg-primary pl-9 pr-12 text-sm outline-none focus:border-tertiary"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-secondary/40"></kbd>
          </div>

          <div className="flex shrink-0 items-center gap-5">
            <span className="hidden whitespace-nowrap text-xs text-secondary/60 md:block">{today}</span>
            <Bell size={18} className="text-secondary/60" />
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tertiary/15 text-xs font-semibold text-tertiary">
                {initials}
              </span>
              <span className="hidden whitespace-nowrap leading-tight md:block">
                <span className="block text-sm font-semibold">{userName}</span>
                <span className="block text-[11px] text-secondary/50">{userRole}</span>
              </span>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}