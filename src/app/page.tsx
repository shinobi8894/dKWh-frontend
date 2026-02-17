import {
  Hero,
  Features,
  HowItWorksShowcase,
  PlatformBenefits,
  CTASection,
  FAQ,
  Contact,
  Footer,
} from "@/components/landing";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AnimatedSection delay={0}>
        <Hero />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Features />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <HowItWorksShowcase />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <PlatformBenefits />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <CTASection />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <FAQ />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Contact />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Footer />
      </AnimatedSection>
    </div>
  );
}
