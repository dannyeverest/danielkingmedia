"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
}: SectionWrapperProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`scroll-mt-[88px] ${className}`}
    >
      {children}
    </motion.section>
  );
}
