"use client";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="bg-white rounded-3xl p-8 text-center max-w-lg mx-auto">
        <h2 className="text-xl font-semibold text-slate-900 mb-2" style={{ fontFamily: "var(--font-sans)" }}>
          Settings
        </h2>
        <p className="text-slate-600 mb-6" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
          Profile, security, notifications, and API keys. This section can be expanded with the full Settings component from the Vite app.
        </p>
        <Link
          href="/dashboard"
          className="text-blue-600 hover:text-blue-700 font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Back to Overview
        </Link>
      </div>
    </div>
  );
}
