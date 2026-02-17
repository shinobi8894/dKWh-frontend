import { Play } from "lucide-react";
import { AnimatedBlock } from "@/components/AnimatedBlock";

export function HowItWorksShowcase() {
  return (
    <section id="how-it-works" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <AnimatedBlock delay={0}>
            <h2 className="text-5xl md:text-6xl font-medium text-slate-900 mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              How DTR Platform Works
            </h2>
          </AnimatedBlock>
          <AnimatedBlock delay={0.05}>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
              Watch how our platform transforms grid congestion into tradeable financial instruments
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock delay={0.1} className="mb-12">
          <div className="bg-slate-900 rounded-3xl p-8 aspect-video relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow">
            <div className="absolute top-8 left-8 z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg"></div>
                <span className="text-white text-xl font-semibold" style={{ fontFamily: "var(--font-sans)" }}>DTR Platform</span>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-slate-700/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-slate-600/90 transition-colors group-hover:scale-110 transform duration-300">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50"></div>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  );
}
