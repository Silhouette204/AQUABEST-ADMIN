"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Droplets,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

type LoginValues = { identifier: string; password: string; remember: boolean };

type Props = {
  // Ikabit dito ang totoong login (better-auth) ng portal
  onSubmit?: (values: LoginValues) => void | Promise<void>;
  error?: string;
  loading?: boolean;
};

const inputClass =
  "h-11 w-full rounded-lg border border-secondary/15 bg-white px-3 pr-10 text-sm text-secondary outline-none placeholder:text-secondary/40 focus:border-tertiary focus:ring-2 focus:ring-tertiary/20";

export function LoginScreen({ onSubmit, error, loading = false }: Props) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const AFTER_LOGIN = "/dashboard";
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ identifier, password, remember });
      return;
    }
    router.push(AFTER_LOGIN); // TEMPORARY
  }

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
     
      <aside className="relative hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex">
        <Image src="/login-img.png" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-secondary/30" />

        <div className="relative flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary">
            <Droplets size={22} />
          </span>
          <div>
            <p className="text-lg font-semibold leading-tight">AquaBest</p>
            <p className="text-[10px] uppercase tracking-wider text-white/60">Water Station Management</p>
          </div>
        </div>

        <div className="relative">
          <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70">
            <MapPin size={14} /> Phase 7C Bagong Silang · Caloocan City
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight">
            Pure water.
            <br />
            Smoother operations.
          </h2>
          <p className="mt-6 max-w-md text-sm text-white/75">
            From the first refill to the last delivery, keep your entire station flowing in one place.
          </p>

          <div className="mt-8 flex gap-6 text-xs text-white/80">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} /> Secure access
            </span>
            <span className="flex items-center gap-2">
              <RefreshCw size={16} /> Always in sync
            </span>
          </div>
        </div>
      </aside>

      <main className="flex flex-col px-6 py-8 sm:px-12">
       

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10 gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary">
            <Droplets size={24} />
          </span>
          <h1 className="mt-5 text-3xl font-semibold text-secondary">Welcome back</h1>
          <p className="mt-2 text-sm text-secondary/60">Sign in to manage your AquaBest station.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <div>
              <label htmlFor="identifier" className="text-xs font-semibold text-secondary">
                Email or username
              </label>
              <div className="relative mt-2">
                <input
                  id="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="you@aquabest.ph"
                  className={inputClass}
                />
                <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/40" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-semibold text-secondary">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-secondary"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex cursor-pointer items-center gap-2 text-secondary/70">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 accent-tertiary"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="font-semibold text-tertiary hover:underline">
                Forgot password?
              </Link>
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-tertiary text-sm font-semibold text-white transition-colors hover:bg-tertiary/85 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in to your station"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-secondary/50">
            <Lock size={12} /> Your station data is encrypted and protected.
          </p>
        </div>

        <footer className="flex items-center justify-between text-xs text-secondary/50">
          <span>© 2026 AquaBest. All rights reserved.</span>
          <a href="#" className="hover:text-secondary">
            Privacy policy
          </a>
        </footer>
      </main>
    </div>
  );
}