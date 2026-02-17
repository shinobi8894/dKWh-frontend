import { Shield, Zap, Lock } from "lucide-react";
import { AnimatedBlock } from "@/components/AnimatedBlock";

export function PlatformBenefits() {
  return (
    <section className="py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <AnimatedBlock delay={0}>
              <div className="text-sm font-medium text-blue-600 mb-4 tracking-wide uppercase" style={{ fontFamily: "var(--font-sans)" }}>
                Platform Benefits
              </div>
            </AnimatedBlock>
            <AnimatedBlock delay={0.05}>
              <h2 className="text-5xl md:text-6xl font-medium text-slate-900 leading-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                Advanced Features
                <br />
                for Grid Management
              </h2>
            </AnimatedBlock>
            <AnimatedBlock delay={0.1}>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                Transform how you manage grid delivery with our comprehensive platform. Real-time monitoring, automated risk protection, and seamless settlement mechanisms designed for modern energy markets.
              </p>
            </AnimatedBlock>
            <AnimatedBlock delay={0.15}>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105" style={{ fontFamily: "var(--font-sans)" }}>
                Explore Platform
              </button>
            </AnimatedBlock>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <AnimatedBlock delay={0.1}>
              <div className="bg-white rounded-3xl p-8 hover:bg-slate-50 transition-all transform hover:-translate-y-2 duration-300">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                  Protection
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                  Comprehensive risk hedging against delivery failures
                </p>
              </div>
              </AnimatedBlock>

              <AnimatedBlock delay={0.15}>
              <div className="bg-slate-900 rounded-3xl p-8 transition-all transform hover:-translate-y-2 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-medium text-white" style={{ fontFamily: "var(--font-serif)" }}>
                    Tracking
                  </h3>
                </div>
                <div className="h-24 flex items-center justify-center mb-4">
                  <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                    <path
                      d="M 0 40 Q 25 20, 50 40 T 100 40 T 150 40 T 200 40"
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                  Real-time grid capacity monitoring and analytics
                </p>
              </div>
              </AnimatedBlock>

              <AnimatedBlock delay={0.2}>
              <div className="bg-white rounded-3xl p-8 hover:bg-slate-50 transition-all transform hover:-translate-y-2 duration-300">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                  Flexibility
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                  Trade across multiple nodes and time horizons
                </p>
              </div>
              </AnimatedBlock>

              <AnimatedBlock delay={0.25}>
              <div className="bg-white rounded-3xl p-8 hover:bg-slate-50 transition-all transform hover:-translate-y-2 duration-300">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                  Easiness
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                  Automated settlement and transparent pricing
                </p>
              </div>
              </AnimatedBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
