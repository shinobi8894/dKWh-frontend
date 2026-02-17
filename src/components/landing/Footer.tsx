import { Zap } from "lucide-react";
import { AnimatedBlock } from "@/components/AnimatedBlock";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 relative overflow-hidden rounded-t-[3rem]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <AnimatedBlock delay={0}>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Join DTR Platform for
              <br />
              Grid Delivery Management
            </h2>
          </AnimatedBlock>
          <AnimatedBlock delay={0.05}>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-4 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105" style={{ fontFamily: "var(--font-sans)" }}>
              Get Started Now
            </button>
          </AnimatedBlock>
        </div>

        <AnimatedBlock delay={0.1} className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-sans)" }}>
                DTR Platform
              </span>
              <span className="text-slate-500 text-sm" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                @2026 All Rights Reserved
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
              Terms & Agreements
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
              Privacy Policy
            </a>
          </div>
        </AnimatedBlock>
      </div>
    </footer>
  );
}
