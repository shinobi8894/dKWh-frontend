"use client";

import { useState } from "react";
import { Zap, Shield, Activity, Lock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    router.push("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center relative overflow-hidden py-12 px-6">
      {/* Left decorative graphic */}
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

      {/* Right decorative graphic */}
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

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
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
              Welcome Back
            </h1>
            <p className="text-slate-600" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
              Sign in to access your DTR Platform account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
                email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="w-full px-4 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                style={{ fontFamily: "var(--font-sans)" }}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
                password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="enter your password"
                required
                className="w-full px-4 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                style={{ fontFamily: "var(--font-sans)" }}
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Sign In
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                or
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-600" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-8" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
          By signing in, you agree to our{" "}
          <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors underline decoration-slate-300 hover:decoration-slate-900">
            Terms & Agreements
          </a>{" "}
          and{" "}
          <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors underline decoration-slate-300 hover:decoration-slate-900">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
