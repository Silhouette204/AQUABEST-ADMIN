"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  ClipboardList,
  Droplets,
  LayoutDashboard,
  MapPin,
  QrCode,
  Smartphone,
  Truck,
  type LucideIcon,
} from "lucide-react";

const wrap = "mx-auto max-w-6xl px-6";

const features = [
  { icon: ClipboardList, title: "Centralized Order Processing", text: "Consolidate all digital and physical ordering channels into a single interface, featuring status tracking from Pending to Delivered." },
  { icon: MapPin, title: "Intelligent Rider Dispatch", text: "Optimize field operations by assigning available logistics personnel and monitoring deliveries via integrated mapping tools." },
  { icon: Boxes, title: "Automated Inventory Control", text: "Track full and empty inventory levels dynamically, backed by intelligent threshold warnings to mitigate stock depletion." },
  { icon: QrCode, title: "Traceable QR Asset Management", text: "Eliminate asset loss by identifying the exact status, location, and custodian of each individual water container." },
];

const steps = [
  { id: 1, title: "Refill Stage", desc: "Scan returned containers to initiate professional cleaning and refilling workflows." },
  { id: 2, title: "Dispatch Stage", desc: "Scan outgoing containers upon vehicle loading for deployment to clients." },
  { id: 3, title: "Completion Stage", desc: "Verify successful delivery handover and update system records instantly." },
];

const platforms = [
  { icon: Smartphone, title: "Customer Mobile App", text: "Empower consumers to place orders, schedule recurring deliveries, and monitor asset custody directly from their smartphones." },
  { icon: Truck, title: "Rider Companion App", text: "Equip field agents with tools to receive task assignments, scan container QR codes, and execute proof-of-delivery confirmations." },
  { icon: LayoutDashboard, title: "Administrator Web Portal", text: "Govern overall business metrics, manage user roles, supervise stock inventory, and generate comprehensive reports from a unified command center." },
];

const previews = [
  { id: 1, icon: ClipboardList, title: "Order Management", desc: "Filter transactions by current fulfillment status, acquisition type, date, or assigned personnel. Access granular data including itemized breakdowns and audit timelines." },
  { id: 2, icon: MapPin, title: "Logistics & Dispatch", desc: "Visualize unassigned queues alongside active field agents simultaneously, enabling rapid one-click deployment." },
  { id: 3, icon: QrCode, title: "Asset Surveillance", desc: "Query specific container identities via QR serial numbers to audit complete three-scan journey histories." },
];

const footerLinks = [
  {
    title: "Ecosystem",
    links: [
      { label: "Core Features", href: "#features" },
      { label: "Operation Workflow", href: "#how" },
      { label: "Platform Apps", href: "#apps" },
      { label: "Admin Dashboard", href: "#preview" },
    ],
  },
  {
    title: "Access Control",
    links: [
      { label: "Admin Login", href: "/login" },
      { label: "System Registration", href: "/register" },
    ],
  },
  {
    title: "Governance",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

function SectionHeading({
  icon: Icon,
  badge,
  title,
  text,
  dark = false,
}: {
  icon: LucideIcon;
  badge: string;
  title: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className={`flex items-center gap-2 rounded-2xl border px-3 py-2 ${
          dark ? "border-white/30 bg-white/10 text-white" : "border-secondary/30 text-secondary"
        }`}
      >
        <Icon size={22} />
        <h3 className="font-semibold">{badge}</h3>
      </div>
      <h2 className={`mt-4 text-3xl font-semibold md:text-4xl ${dark ? "text-white" : "text-secondary"}`}>
        {title}
      </h2>
      <p className={`max-w-2xl ${dark ? "text-primary/70" : "text-secondary/70"}`}>{text}</p>
    </div>
  );
}

export function LandingBody() {
  const [activeStep, setActiveStep] = useState(1);
  const [activeCard, setActiveCard] = useState(1);
  const currentStep = steps.find((s) => s.id === activeStep)!;

  return (
    <>
      {/* FEATURES */}
      <section id="features" className="bg-primary py-20">
        <div className={wrap}>
          <SectionHeading
            icon={Droplets}
            badge="The AquaBest Advantage"
            title="A Unified Operating System for Modern Water Stations"
            text="From the initial customer inquiry down to final container retrieval, every operational touchpoint is systematically recorded and synchronized."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-secondary/10 bg-white p-8 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary/15 text-tertiary">
                  <Icon size={26} />
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-secondary">{title}</h3>
                <p className="mt-2 text-secondary/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 scans) */}
      <section id="how" className="bg-primary pb-20">
        <div className={wrap}>
          <SectionHeading
            icon={QrCode}
            badge="Gallon Lifecycle Protocol"
            title="Three Strategic Scans, Total Accountability"
            text="Every container features an assigned QR code mapped to client registries. Delivery personnel execute three mandatory verification scans per cycle."
          />

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3">
            {steps.map((step) => {
              const isActive = step.id === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex flex-col items-center gap-2 border-b-2 px-2 pb-4 transition-colors md:px-4 ${
                    isActive ? "border-secondary" : "border-secondary/10 hover:border-secondary/40"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isActive ? "bg-secondary text-white" : "bg-secondary/10 text-secondary/60"
                    }`}
                  >
                    {step.id}
                  </span>
                  <span className={`text-sm font-semibold ${isActive ? "text-secondary" : "text-secondary/60"}`}>
                    {step.title}
                  </span>
                  <span className="hidden max-w-[220px] text-xs text-secondary/70 md:block">{step.desc}</span>
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-secondary/10 bg-secondary/5 p-4 md:p-8">
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-secondary/20 bg-white/60 px-6 text-center text-sm text-secondary/50">
              Interactive Scan Stage {currentStep.id}: {currentStep.title} Preview Panel
            </div>
          </div>
        </div>
      </section>

      {/* THREE PLATFORMS (dark) */}
      <section id="apps" className="rounded-t-[3rem] bg-secondary px-6 py-20">
        <div className={wrap}>
          <SectionHeading
            dark
            icon={LayoutDashboard}
            badge="Multi-Platform Synergy"
            title="Customer, Rider, and Admin Synchronized in Real-Time"
            text="All three native client interfaces operate on a centralized API architecture and database, ensuring absolute data consistency across your workforce."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {platforms.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-white/10 p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-tertiary/20 text-tertiary">
                  <Icon size={30} />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-primary/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section id="preview" className="bg-primary py-20">
        <div className={wrap}>
          <SectionHeading
            icon={LayoutDashboard}
            badge="Administrative Control"
            title="Complete Enterprise Oversight at Your Fingertips"
            text="Select a category below to explore specific administrative management modules."
          />
          <div className="mt-12 flex h-[30rem] flex-col gap-4 md:h-80 md:flex-row">
            {previews.map(({ id, icon: Icon, title, desc }) => {
              const isActive = id === activeCard;
              return (
                <button
                  key={id}
                  onClick={() => setActiveCard(id)}
                  aria-expanded={isActive}
                  className={`min-h-0 min-w-0 basis-0 overflow-hidden rounded-3xl border p-6 text-left transition-[flex-grow,background-color] duration-500 ${
                    isActive
                      ? "grow-[3] border-secondary bg-secondary text-white shadow-xl"
                      : "grow border-secondary/10 bg-secondary/5 text-secondary hover:bg-secondary/10"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isActive ? "bg-tertiary/20 text-tertiary" : "bg-secondary/10"
                      }`}
                    >
                      <Icon size={22} />
                    </span>
                    <span className="text-lg font-semibold md:text-xl">{title}</span>
                  </span>
                  <span
                    className={`mt-6 block transition-opacity duration-500 ${
                      isActive ? "opacity-100 delay-300" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <span className="block max-w-md text-sm text-primary/70">{desc}</span>
                    <span className="mt-6 block h-24 w-full rounded-2xl border border-dashed border-white/20 bg-white/5" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section id="banner-1" className="bg-primary pb-20">
        <div className={wrap}>
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-secondary px-6 py-16 text-center">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Ready to Scale Your Water Station Operations?</h2>
            <p className="max-w-xl text-primary/60">
              Access the administrator management portal to efficiently control orders, dispatch riders, audit inventory, and analyze performance reports.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-tertiary px-8 py-3 font-semibold text-white transition-colors hover:bg-tertiary/85"
            >
              Access Admin Portal <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-secondary/10 bg-primary">
      <div className={`${wrap} grid gap-10 py-14 md:grid-cols-2`}>
        <div>
          <a href="#" className="flex items-center gap-3 text-secondary">
            <Droplets size={28} />
            <span className="text-base font-semibold">AquaBest</span>
          </a>
          <p className="mt-5 max-w-xs text-sm text-secondary/60">
            An advanced web-based water station management system engineered with comprehensive ordering, inventory control, logistics dispatch, and QR gallon tracking modules.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:justify-items-end">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-secondary">{group.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-secondary/60 transition-colors hover:text-secondary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="border-t border-secondary/10 py-6 text-center text-sm text-secondary/50">
        © 2026 AquaBest. All rights reserved.
      </p>
    </footer>
  );
}