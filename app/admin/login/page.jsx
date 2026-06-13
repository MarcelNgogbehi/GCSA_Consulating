"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiArrowRight } from "react-icons/fi";

/**
 * Admin login portal, standalone, not linked anywhere on the public site.
 * Reachable only by typing /admin (which redirects here when signed out).
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        // Distinguish a genuine credential rejection (401) from a server-side
        // failure (e.g. a 500 returning an HTML error page, which has no JSON
        // body). Falling back to "Invalid credentials" for the latter wrongly
        // blames the user's password.
        const message =
          data?.error ||
          (res.status === 401
            ? "Invalid email or password."
            : "Something went wrong on the server. Please try again in a moment.");
        throw new Error(message);
      }
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      // A thrown TypeError here means the request never reached the server.
      const isNetworkError = err instanceof TypeError;
      setError(
        isNetworkError
          ? "Can't reach the server. Check your connection and try again."
          : err.message || "Login failed. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0A1A36] px-6"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-3">
            GCSA Consulting
          </p>
          <h1 className="text-white text-2xl font-extrabold tracking-tight">Admin Portal</h1>
          <p className="text-white/50 text-sm mt-2">Authorised staff only</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
        >
          <div className="mb-4">
            <label className="block text-[12px] font-semibold text-[#0A1A36] mb-1.5">Email</label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#0A1A36]/15 text-[14px] text-[#0A1A36] focus:outline-none focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/30 transition"
              placeholder="admin@gcsaconsulting.co.uk"
            />
          </div>

          <div className="mb-5">
            <label className="block text-[12px] font-semibold text-[#0A1A36] mb-1.5">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#0A1A36]/15 text-[14px] text-[#0A1A36] focus:outline-none focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/30 transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="mb-4 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0A1A36] hover:bg-[#0d2247] text-white text-[12px] font-bold tracking-[0.16em] uppercase transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiLock className="w-4 h-4" />
            {loading ? "Signing in…" : "Sign in"}
            {!loading && (
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
