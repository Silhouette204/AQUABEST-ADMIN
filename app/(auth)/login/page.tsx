"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginScreen } from "@/components/login/login"; // Siguraduhing tugma sa tamang folder kung nasaan ang login file mo

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function handleLogin(values: { identifier: string; password: string; remember: boolean }) {
    setLoading(true);
    setError(undefined);

    try {
      console.log("Submitting login:", values);
      // Dito mo ilalagay ang better-auth sign-in logic mo sa susunod
    } catch (err: any) {
      setError(err?.message || "May naganap na error sa pag-sign in. Subukan muli.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoginScreen
      onSubmit={handleLogin}
      error={error}
      loading={loading}
    />
  );
}