"use client";

import { Zap, ArrowRight, Activity, TrendingUp } from "lucide-react";
import Link from "next/link";
import { AnimatedBlock } from "@/components/AnimatedBlock";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 min-h-screen flex items-center">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 container mx-auto px-6 py-6 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>
              DTR Platform
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              How It Works
            </a>
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              Features
            </a>
            <a href="#technology" className="text-slate-600 hover:text-slate-900 transition-colors font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              Technology
            </a>
            <Link
              href="/login"
              className="px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Left Smart Cards */}
          <AnimatedBlock delay={0.1} className="hidden lg:block absolute -left-48 top-28 w-56">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-semibold text-slate-900 whitespace-nowrap" style={{ fontFamily: "var(--font-serif)" }}>Real-Time</div>
                  <div className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Grid Monitoring</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4 text-left leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                Sub-second scarcity signals across all nodes
              </p>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors" style={{ fontFamily: "var(--font-sans)" }}>
                  Telemetry
                </button>
                <button className="flex-1 px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors" style={{ fontFamily: "var(--font-sans)" }}>
                  View Data
                </button>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2} className="hidden lg:block absolute -left-52 top-[480px] w-52">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <div className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Active Nodes</div>
              <div className="text-4xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-serif)" }}>1,247</div>
            </div>
          </AnimatedBlock>

          {/* Right Smart Cards */}
          <AnimatedBlock delay={0.15} className="hidden lg:block absolute -right-48 top-20 w-52">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <div className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Market Volume</div>
              <div className="text-4xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-serif)" }}>$2.4B</div>
              <div className="text-xs text-green-600 font-medium" style={{ fontFamily: "var(--font-sans)" }}>↑ 34% This Quarter</div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.25} className="hidden lg:block absolute -right-52 top-96 w-52">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Trading Active</div>
                  <div className="text-sm font-semibold text-slate-900 whitespace-nowrap" style={{ fontFamily: "var(--font-sans)" }}>24/7 Operations</div>
                </div>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.05}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full mb-10 shadow-sm">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium" style={{ fontFamily: "var(--font-sans)" }}>Financial-Physical Hybrid System</span>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.1}>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-slate-900 mb-8 leading-[1.1]" style={{ fontFamily: "var(--font-serif)" }}>
            Trade Delivery Rights,
            <br />
            Not Just Electrons
          </h1>
          </AnimatedBlock>

          <AnimatedBlock delay={0.15}>
          <p className="text-xl md:text-2xl text-slate-600 mb-14 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
            The first platform to create a market for trading delivery transaction rights on energy grids.
            Price the probability of successful energy delivery between nodes.
          </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              Request Demo
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 rounded-xl hover:bg-slate-50 transition-all font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              Learn More
            </button>
          </div>
          </AnimatedBlock>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" className="text-slate-900" />
          <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" className="text-blue-600" />
          <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="1" className="text-slate-900" />
        </svg>
      </div>
    </section>
  );
}
