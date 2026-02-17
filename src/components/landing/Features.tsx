import { Activity, Shield, Zap, Lock } from "lucide-react";
import { AnimatedBlock } from "@/components/AnimatedBlock";

export function Features() {
  return (
    <section id="features" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <AnimatedBlock delay={0}>
            <h2 className="text-5xl md:text-6xl font-medium text-slate-900 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Best Features
              <br />
              Given by DTR Platform
            </h2>
          </AnimatedBlock>
          <AnimatedBlock delay={0.05} className="flex items-center">
            <p className="text-lg text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
              Transform grid congestion into financial instruments. Our platform converts real-time grid headroom into tradeable delivery rights, allowing market participants to hedge against delivery failure risk while maintaining grid stability.
            </p>
          </AnimatedBlock>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <AnimatedBlock delay={0.1}>
          <div className="lg:col-span-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white min-h-[320px] flex flex-col justify-between">
            <div className="w-12 h-12 flex items-center justify-start mb-6">
              <Activity className="w-12 h-12 text-white/90" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-3xl font-medium mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                Real-Time Tracking
              </h3>
              <p className="text-white/90 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                Sub-second scarcity signals and headroom monitoring across all grid nodes
              </p>
            </div>
          </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.15}>
          <div className="lg:col-span-1 bg-slate-50 rounded-3xl p-8 min-h-[320px] flex flex-col justify-between hover:bg-slate-100 transition-colors">
            <div className="w-12 h-12 flex items-center justify-start mb-6">
              <Shield className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                Risk Protection
              </h3>
              <p className="text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                Hedge against delivery failure with financial instruments tied to grid capacity
              </p>
            </div>
          </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
          <div className="lg:col-span-1 bg-slate-50 rounded-3xl p-8 min-h-[320px] flex flex-col justify-between hover:bg-slate-100 transition-colors">
            <div className="w-12 h-12 flex items-center justify-start mb-6">
              <Zap className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                Market Flexibility
              </h3>
              <p className="text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                Trade delivery rights across multiple nodes and time horizons
              </p>
            </div>
          </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.25}>
          <div className="lg:col-span-1 bg-slate-50 rounded-3xl p-8 min-h-[320px] flex flex-col justify-between hover:bg-slate-100 transition-colors">
            <div className="w-12 h-12 flex items-center justify-start mb-6">
              <Lock className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                Settlement Easiness
              </h3>
              <p className="text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                Automated clearing and settlement with transparent pricing mechanisms
              </p>
            </div>
          </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}
