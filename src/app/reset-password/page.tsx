"use client";

import { useState } from "react";
import { Zap, Shield, Activity, Lock, TrendingUp, KeyRound } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthDeco() {
  return (
    <>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-6 pl-12">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-300">
            <Shield className="w-10 h-10 text-slate-400" />
          </div>
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300">
            <Activity className="w-12 h-12 text-white" />
          </div>
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-6 pr-12">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
            <Lock className="w-8 h-8 text-slate-400" />
          </div>
          <div className="w-24 h-24 bg-slate-900 rounded-3xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
            <Activity className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
    </>
  );
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: verify token and call API to set new password
    if (token) {
      console.log("Reset password with token");
    }
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>
              DTR Platform
            </span>
          </Link>
        </div>
        <div className="bg-white rounded-3xl p-10 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <KeyRound className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-slate-900 leading-tight mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            Password Reset
          </h1>
          <p className="text-slate-600 mb-8" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
            Your password has been updated. You can now sign in with your new password.
          </p>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>
            DTR Platform
          </span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-10">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-medium text-slate-900 leading-tight mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            Set New Password
          </h1>
          <p className="text-slate-600" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
            Enter your new password below. Use a strong password you do not use elsewhere.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
              new password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              minLength={8}
              className="w-full px-4 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              style={{ fontFamily: "var(--font-sans)" }}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-900 mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
              confirm new password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
              minLength={8}
              className="w-full px-4 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              style={{ fontFamily: "var(--font-sans)" }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Update Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 font-medium" style={{ fontFamily: "var(--font-sans)" }}>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center relative overflow-hidden py-12 px-6">
      <AuthDeco />
      <Suspense fallback={<div className="w-full max-w-md text-center text-slate-500">Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
