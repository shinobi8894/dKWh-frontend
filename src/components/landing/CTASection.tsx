import { ArrowRight } from "lucide-react";
import { AnimatedBlock } from "@/components/AnimatedBlock";

export function CTASection() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 lg:p-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <AnimatedBlock delay={0}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                  Secure Your Energy
                  <br />
                  Delivery Rights Today
                </h2>
              </AnimatedBlock>
              <AnimatedBlock delay={0.05}>
                <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                  Join the future of energy grid management. Trade delivery transaction rights in real-time, hedge against delivery failures, and optimize your grid capacity utilization with our advanced platform.
                </p>
              </AnimatedBlock>
              <AnimatedBlock delay={0.1}>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center gap-2 group" style={{ fontFamily: "var(--font-sans)" }}>
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </AnimatedBlock>
            </div>

            <div className="relative hidden lg:block">
              <AnimatedBlock delay={0.1}>
              <div className="absolute top-0 right-0 w-80 h-48 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-3xl shadow-2xl transform rotate-6 translate-x-8">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm"></div>
                    <div className="text-white/90 text-sm font-medium">DTR</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs mb-1">Node Capacity</div>
                    <div className="text-white text-2xl font-semibold">2,847 MW</div>
                  </div>
                </div>
              </div>
              </AnimatedBlock>

              <AnimatedBlock delay={0.15}>
              <div className="absolute top-12 right-16 w-80 h-48 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl shadow-2xl transform -rotate-3">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm"></div>
                    <div className="text-white/90 text-sm font-medium">ACTIVE</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs mb-1">Trading Volume</div>
                    <div className="text-white text-2xl font-semibold">$1.2M</div>
                  </div>
                </div>
              </div>
              </AnimatedBlock>

              <AnimatedBlock delay={0.2}>
              <div className="absolute top-24 right-8 w-80 h-48 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-600 rounded-3xl shadow-2xl transform rotate-2">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm"></div>
                    <div className="text-white/90 text-sm font-medium">LIVE</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs mb-1">Grid Status</div>
                    <div className="text-white text-2xl font-semibold">98.4% Uptime</div>
                  </div>
                </div>
              </div>
              </AnimatedBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
