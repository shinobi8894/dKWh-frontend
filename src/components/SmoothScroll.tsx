"use client";

import { useEffect, useRef, ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
  };
};

export function SmoothScroll({ children, options = {} }: SmoothScrollProps) {
  const { duration = 1.2, easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) } = options;
  const lenisRef = useRef<{ destroy: () => void } | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let mounted = true;

    import("lenis").then(({ default: Lenis }) => {
      if (!mounted) return;
      const lenis = new Lenis({
        duration,
        easing,
        smoothWheel: true,
        touchMultiplier: 2,
      });
      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }
      rafRef.current = requestAnimationFrame(raf);
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [duration, easing]);

  return <>{children}</>;
}
