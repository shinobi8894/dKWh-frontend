"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatedBlock } from "@/components/AnimatedBlock";

const faqs = [
  {
    question: "What are Delivery Transaction Rights (DTRs)?",
    answer:
      "DTRs are financial instruments that represent the right to deliver energy across specific grid nodes. They are created from real-time grid headroom measurements and allow market participants to hedge against delivery failure risk while helping maintain grid stability.",
  },
  {
    question: "How does the DTR Platform work?",
    answer:
      "Our platform continuously monitors grid capacity in real-time, converting available headroom into tradeable DTRs. Market participants can purchase these rights to secure delivery capacity or trade them in secondary markets. Settlement occurs automatically based on actual grid conditions.",
  },
  {
    question: "Who can participate in the DTR market?",
    answer:
      "The DTR market is open to energy producers, utilities, grid operators, financial institutions, and qualified market participants who need to manage delivery risk or optimize grid capacity utilization.",
  },
  {
    question: "How are DTRs priced?",
    answer:
      "DTR pricing is determined by real-time supply and demand dynamics, reflecting grid congestion levels, renewable generation forecasts, and market participant demand. Our transparent pricing mechanism ensures fair market discovery.",
  },
  {
    question: "What are the settlement terms?",
    answer:
      "DTRs settle based on actual grid capacity utilization. Our automated clearing system handles all settlements with transparent pricing mechanisms, typically within 24-48 hours after the delivery period ends.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <AnimatedBlock delay={0} className="lg:sticky lg:top-32">
            <h2 className="text-5xl md:text-6xl font-medium text-slate-900 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Frequently
              <br />
              Asked
              <br />
              Questions
            </h2>
          </AnimatedBlock>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedBlock key={index} delay={0.05 + index * 0.05}>
              <div className="bg-white rounded-2xl overflow-hidden transition-all hover:shadow-md">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-medium text-slate-900 pr-8" style={{ fontFamily: "var(--font-sans)" }}>
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-6 h-6 text-slate-900 transition-transform">
                    {openIndex === index ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="px-8 pb-6">
                    <p className="text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                      {faq.answer}
                    </p>
                </div>
              </div>
            </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
