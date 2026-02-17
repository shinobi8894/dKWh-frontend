"use client";

import { useState } from "react";
import { Shield, Activity, Zap, Lock } from "lucide-react";
import { AnimatedBlock } from "@/components/AnimatedBlock";

export function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-6 pl-12">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center transform -rotate-12">
            <Shield className="w-8 h-8 text-slate-400" />
          </div>
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center transform rotate-6">
            <Activity className="w-10 h-10 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-6 pr-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center transform rotate-12">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center transform -rotate-6">
            <Lock className="w-8 h-8 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <AnimatedBlock delay={0}>
              <h2 className="text-5xl md:text-6xl font-medium text-slate-900 leading-tight mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                Let&apos;s Get in Touch
              </h2>
            </AnimatedBlock>
            <AnimatedBlock delay={0.05}>
              <p className="text-lg text-slate-600" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                Have questions about DTR Platform? We&apos;d love to hear from you.
              </p>
            </AnimatedBlock>
          </div>

          <AnimatedBlock delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2 uppercase" style={{ fontFamily: "var(--font-sans)" }}>
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
                className="w-full px-4 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                style={{ fontFamily: "var(--font-sans)" }}
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2 uppercase" style={{ fontFamily: "var(--font-sans)" }}>
                name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="full name"
                required
                className="w-full px-4 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                style={{ fontFamily: "var(--font-sans)" }}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2 uppercase" style={{ fontFamily: "var(--font-sans)" }}>
                message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="write your message..."
                required
                rows={6}
                className="w-full px-4 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                style={{ fontFamily: "var(--font-sans)" }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Get in Touch
            </button>
          </form>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}
