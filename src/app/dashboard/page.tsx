"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>
              DTR Platform
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/change-password"
              className="text-sm text-slate-600 hover:text-slate-900 font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Change password
            </Link>
            <Link
              href="/login"
              className="text-sm text-slate-600 hover:text-slate-900 font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Sign out
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-medium text-slate-900 mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            Dashboard
          </h1>
          <p className="text-slate-600 mb-6" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
            Welcome. This is a placeholder. Add your dashboard content here.
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
