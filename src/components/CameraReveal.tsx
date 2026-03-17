"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function CameraReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax on the background image
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Blur: starts blurred, comes into focus, blurs out
  const filterBlur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    ["blur(6px)", "blur(1px)", "blur(0px)", "blur(1px)", "blur(6px)"]
  );

  // Text fades in
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);

  return (
    <div ref={ref} className="border-t border-border">
      {/* Heading above the image */}
      <motion.div
        style={{ opacity: headingOpacity }}
        className="py-16 text-center"
      >
        <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Meet Daniel King
        </h2>
        <p className="mt-3 text-lg md:text-xl">
          &ldquo;I don&apos;t just take photos,
          <br />I make things{" "}
          <em className="font-semibold italic">happen</em>&rdquo;
        </p>
      </motion.div>

      {/* Full-width camera image with parallax */}
      <div className="relative h-[70vh] w-full overflow-hidden md:h-[85vh]">
        <motion.div
          style={{ y, filter: filterBlur }}
          className="absolute inset-0 h-[120%] w-full"
        >
          <Image
            src="/portfolio/DKM-WEB-ASSET.png"
            alt="Daniel King holding camera"
            fill
            className="object-cover object-center grayscale"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Gradient overlay at bottom for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Overlay text */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-x-0 bottom-12 text-center md:bottom-16"
        >
          <h3 className="text-2xl font-light uppercase tracking-[0.2em] text-white md:text-4xl">
            Capture Your Excellence
          </h3>
        </motion.div>
      </div>
    </div>
  );
}
