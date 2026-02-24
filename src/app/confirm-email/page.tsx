"use client";

import { Zap, Shield, Activity, Lock, TrendingUp, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified") === "1";
  const emailParam = searchParams.get("email") ?? "";

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
        {verified ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-medium text-slate-900 leading-tight mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              Email Verified
            </h1>
            <p className="text-slate-600 mb-8" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
              Your email has been confirmed. You can now sign in to your account.
            </p>
            <Link
              href="/login"
              className="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Sign In
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-medium text-slate-900 leading-tight mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              Check Your Email
            </h1>
            <p className="text-slate-600 mb-8" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
              We sent a confirmation link to your email. Click the link to verify your account.
              {emailParam ? ` (${decodeURIComponent(emailParam)})` : ""}
            </p>
            <div className="bg-slate-50 rounded-2xl p-6 mb-6 text-left">
              <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                Did not receive the email? Check your spam folder or <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">sign up again</Link>.
              </p>
            </div>
            <Link href="/login" className="text-slate-600 hover:text-slate-900 font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConfirmEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center relative overflow-hidden py-12 px-6">
      <AuthDeco />
      <Suspense fallback={<div className="w-full max-w-md text-center text-slate-500">Loading...</div>}>
        <ConfirmEmailContent />
      </Suspense>
    </div>
  );
}
