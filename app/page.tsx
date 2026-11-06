import Image from "next/image";
import Link from "next/link";
import { LandingBody, LandingFooter } from "@/components/landing/landing-sections";
import { CircleCheck, Droplets, MessageCircle, PackageCheck, QrCode, Truck } from "lucide-react";

// Custom SVG Icons para sa mga social media para maiwasan ang lucide-react export error
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

// Professional Chamfer clip paths based on reference styling
const chamferLogo = "[clip-path:polygon(0_0,100%_0,100%_70%,75%_100%,0_100%)]";
const chamferCard = "[clip-path:polygon(0_0,100%_0,100%_calc(100%-50px),calc(100%-50px)_100%,0_100%)]";
const chamferBtn = "[clip-path:polygon(0_0,100%_0,100%_65%,85%_100%,0_100%)]";
const chamferSide = "[clip-path:polygon(0_0,100%_0,100%_80%,80%_100%,0_100%)]";

const features = [
  { title: "Unified Order Management", text: "Seamlessly handle both online and walk-in transactions with real-time status tracking from Pending to Delivered." },
  { title: "Smart Rider Dispatch", text: "Efficiently assign available delivery personnel and monitor active routes via an interactive live map." },
  { title: "Advanced QR Gallon Tracking", text: "Accurately monitor the precise location, lifecycle status, and customer assignment of every individual gallon." },
  { title: "Comprehensive Inventory", text: "Monitor full and empty stock reserves with automated low-inventory alerts to prevent stockouts." },
  { title: "Loyalty & VIP Rewards", text: "Drive customer retention and engagement through integrated point systems and exclusive perks for loyal patrons." },
  { title: "Robust Analytics & Reporting", text: "Generate detailed performance insights for sales, deliveries, and rider efficiency with PDF and Excel export options." },
];

export default function HomePage() {
  return (
    <main className="bg-[#0b192c] font-sans antialiased text-white selection:bg-teal-500 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden flex flex-col justify-between bg-[#071321] text-white">
        {/* Background Image & Immersive Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/watee-hero.png"
            alt="AquaBest Water Background"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071321]/70 via-[#071321]/30 to-[#071321]/50 backdrop-blur-[1px]" />
        </div>

        {/* HEADER / NAVIGATION */}
        <header className="relative z-30 flex items-center justify-between px-6 pt-6 md:px-12">
          {/* Logo Badge */}
          <div className={`bg-teal-500 px-8 py-4 text-xl font-extrabold text-white shadow-lg shadow-teal-500/30 flex items-center gap-2 ${chamferLogo}`}>
            <Droplets className="h-5 w-5 text-white animate-pulse" />
            AquaBest
          </div>

          {/* Center Floating Navigation Pill */}
          <nav className="hidden gap-1 md:flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-xl shadow-lg">
            {[
              ["Features", "#features"],
              ["How It Works", "#how"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-6 py-2 text-xs font-semibold tracking-wider uppercase text-white/90 transition-all hover:bg-white/20 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Admin Login Button */}
          <Link
            href="/login"
            className={`bg-teal-500 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/40 active:scale-95 ${chamferBtn}`}
          >
            Admin Portal
          </Link>
        </header>

        {/* MAIN HERO CONTENT CONTAINER */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 py-12 md:px-12 flex items-center justify-between my-auto">
          
          {/* LEFT SIDE: Floating Social Sidebar */}
          <div className={`hidden lg:flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl shadow-xl ${chamferSide}`}>
            {[
              { icon: InstagramIcon, href: "#" },
              { icon: FacebookIcon, href: "#" },
              { icon: TwitterIcon, href: "#" },
              { icon: MessageCircle, href: "#" },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-teal-500 hover:scale-110"
                >
                  <IconComponent size={18} />
                </a>
              );
            })}
          </div>

          {/* CENTER/LEFT DECORATIVE TECH LINE & RINGS */}
          <div className="absolute left-1/4 top-1/2 hidden xl:block pointer-events-none opacity-60">
            <div className="h-[1px] w-48 bg-gradient-to-r from-teal-400 to-transparent relative">
              <span className="absolute -top-1 right-0 h-2.5 w-2.5 rounded-full bg-teal-300 animate-ping" />
            </div>
            <div className="absolute -bottom-20 left-10 h-16 w-32 rounded-full border border-teal-300/30 rotate-[-15deg]" />
            <div className="absolute -bottom-24 left-16 h-12 w-24 rounded-full border border-teal-300/20 rotate-[-15deg]" />
          </div>

          {/* RIGHT SIDE: Main Glassmorphism Card */}
          <div className={`relative ml-auto max-w-xl w-full rounded-3xl border border-white/30 bg-gradient-to-br from-white/20 via-white/10 to-teal-950/40 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all ${chamferCard}`}>
            
            {/* Sparkle Accents */}
            <div className="absolute -top-4 -right-4 text-teal-300 text-xl animate-pulse">✦</div>
            <div className="absolute top-1/2 -right-6 text-teal-300 text-lg">✦</div>
            <div className="absolute -bottom-4 right-1/3 text-teal-300 text-sm">✦</div>

            {/* Sub-badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/40 bg-teal-500/20 px-4 py-1 text-xs font-semibold tracking-wide text-teal-200 backdrop-blur-md mb-4">
              <Droplets size={14} className="animate-pulse text-teal-300" />
              <span>Next-Gen Water Station Management</span>
            </div>

            {/* Typography */}
            <p className="text-3xl font-light text-teal-100 md:text-4xl tracking-wide">
              Elevating the standard of
            </p>
            <h1 className="text-4xl font-black leading-none text-white md:text-5xl lg:text-6xl tracking-tight mt-1">
              pure hydration <br />
              <span className="text-teal-300 drop-shadow-md">& precision care</span>
            </h1>

            <p className="mt-5 text-sm md:text-base text-white/80 leading-relaxed font-light">
              An enterprise-grade, centralized platform engineered for automated ordering, real-time inventory control, logistics dispatch, and QR-based gallon tracking.
            </p>

            {/* Feature Bullets */}
            <ul className="mt-6 space-y-2.5 text-sm font-medium text-teal-50">
              {[
                "Integrated online & walk-in order pipelines",
                "Dynamic rider assignment & live map routing",
                "End-to-end QR code asset lifecycle tracking",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CircleCheck size={16} className="text-teal-300 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/login"
                className={`inline-block bg-teal-500 px-9 py-4 font-bold text-white transition-all hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/40 active:scale-95 ${chamferBtn}`}
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white"
              >
                Explore Features
              </a>
            </div>

            {/* Right-side Tech Ticks */}
            <div className="absolute right-4 top-1/4 hidden md:flex flex-col gap-3 text-teal-300/60">
              <div className="h-6 w-0.5 bg-teal-300/60 mx-auto" />
              <div className="h-1.5 w-1.5 rounded-full bg-teal-300" />
              <div className="h-6 w-0.5 bg-teal-300/60 mx-auto" />
              <div className="h-1.5 w-1.5 rounded-full bg-teal-300" />
              <div className="h-6 w-0.5 bg-teal-300/60 mx-auto" />
            </div>
          </div>
        </div>

        {/* BOTTOM STATS STRIP */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pb-12 pt-4 md:px-12">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["3", "Integrated Platforms", "Customer Portal, Rider App & Admin Dashboard"],
              ["3", "Strategic QR Scans", "Comprehensive lifecycle touchpoints per gallon"],
              ["1", "Centralized Ecosystem", "Unified robust API infrastructure & secure database"],
            ].map(([num, label, sub]) => (
              <div
                key={label}
                className="group flex items-center gap-5 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl transition-all hover:bg-white/20 hover:border-white/40 shadow-lg"
              >
                <span className="text-4xl font-black text-teal-300 transition-transform group-hover:scale-110">
                  {num}
                </span>
                <div>
                  <p className="font-bold text-white text-base">{label}</p>
                  <p className="text-xs text-teal-100/70">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="bg-[#0f223d] py-24 border-t border-teal-950/60">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white md:text-4xl">
              Core System Capabilities
            </h2>
            <p className="mt-3 text-teal-200/70">
              Comprehensive modules meticulously designed to streamline operations and maximize water station efficiency.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-teal-500/20 bg-[#142a48] p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/50 hover:shadow-teal-500/10"
              >
                <div className="h-2 w-10 bg-teal-500 rounded-full mb-6 transition-all group-hover:w-16" />
                <h3 className="text-xl font-bold text-white">{f.title}</h3>
                <p className="mt-3 text-sm text-teal-100/70 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 SCAN SECTION */}
      <section id="how" className="relative overflow-hidden bg-[#0b192c] py-24 border-t border-teal-950/60">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mx-auto flex w-fit items-center gap-2.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-5 py-2 text-teal-300 backdrop-blur-md">
            <QrCode size={18} />
            <span className="text-xs font-bold tracking-wider uppercase">Gallon Lifecycle Protocol</span>
          </div>

          <h2 className="mt-6 text-center text-3xl font-bold text-white md:text-4xl">
            Three Scans, One Complete Record
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-teal-200/70">
            Every container is embedded with a unique QR identifier, systematically tracked across three essential delivery touchpoints.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Droplets,
                title: "Scan 1: Refill Verification",
                text: "The delivery personnel scans the returned empty container upon collection before undergoing professional sanitization and refilling.",
              },
              {
                icon: Truck,
                title: "Scan 2: Dispatch Confirmation",
                text: "The sealed and refilled container is scanned out of inventory as it is loaded for transit and scheduled delivery.",
              },
              {
                icon: PackageCheck,
                title: "Scan 3: Delivery Completion",
                text: "The transaction is finalized on-site, recording successful handover or detailing any delivery exceptions.",
              },
            ].map(({ icon: Icon, title, text }, index) => (
              <div
                key={title}
                className="group relative flex flex-col justify-between rounded-3xl border border-teal-500/20 bg-gradient-to-b from-[#142a48] to-[#0f223d] p-8 transition-all duration-300 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/10"
              >
                <span className="absolute top-6 right-6 text-xs font-extrabold text-teal-500/40 group-hover:text-teal-400">
                  0{index + 1}
                </span>

                <div>
                  <div className="my-6 flex justify-center">
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-teal-500/10 text-teal-400 transition-transform duration-500 group-hover:scale-110 group-hover:bg-teal-500/20">
                      <div className="absolute inset-0 rounded-full bg-teal-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon size={56} strokeWidth={1.5} className="relative z-10" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-center text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 text-center text-sm text-teal-200/60 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LandingBody />
      <LandingFooter />
    </main>
  );
}