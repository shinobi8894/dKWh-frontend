"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

const defaultVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px 0px -80px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={defaultVariants}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
