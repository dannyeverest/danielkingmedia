"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  // Camera moves upward as you scroll — looks like it's raising to the eye
  const cameraY = useTransform(scrollYProgress, [0, 0.5, 1], ["15%", "0%", "-10%"]);

  // Face stays mostly still (slight movement for depth)
  const faceY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  // Face blurs slightly as camera comes into focus
  const faceBlur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    ["blur(0px)", "blur(1px)", "blur(2px)", "blur(1.5px)", "blur(0px)"]
  );

  // Camera sharpens as it rises
  const cameraBlur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    ["blur(3px)", "blur(1px)", "blur(0px)", "blur(0px)", "blur(1px)"]
  );

  // Camera scales up slightly as it rises
  const cameraScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 1]);

  return (
    <SectionWrapper
      id="about"
      className="border-t border-border px-6 py-14 md:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
        {/* Photo — face background with camera overlay, parallax */}
        <div
          ref={imageRef}
          className="relative aspect-[4/5] w-full overflow-hidden"
        >
          {/* Face photo (background, blurs as you scroll) */}
          <motion.div
            style={{ y: faceY, filter: faceBlur }}
            className="absolute inset-0 h-[110%] w-full"
          >
            <Image
              src="/daniel-face.png"
              alt="Daniel King"
              fill
              className="object-cover object-center grayscale"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Camera overlay (rises up with parallax, sharpens) */}
          <motion.div
            style={{
              y: cameraY,
              filter: cameraBlur,
              scale: cameraScale,
            }}
            className="absolute inset-0 h-[110%] w-full"
          >
            <Image
              src="/camera3.png"
              alt="Camera raising to eye"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Bio */}
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
            Meet Daniel King
          </h2>
          <p className="mt-3 text-lg">
            &ldquo;I don&apos;t just take photos, I make things{" "}
            <em className="font-semibold italic">happen</em>&rdquo;
          </p>
          <div className="mt-6 space-y-4 text-muted leading-relaxed">
            <p>
              As a photographer, videographer, and licensed Part 107 drone pilot
              based in the Seattle/Tacoma area, I help businesses and families
              tell their stories through powerful visual content.
            </p>
            <p>
              In 2021, I directed a viral advertisement for a startup eCommerce
              brand that generated over 5,000 new customers. From commercial
              campaigns to intimate portraits, I bring the same level of passion
              and precision to every project.
            </p>
            <p>
              Beyond the camera, I&apos;m an Eagle Scout and a classically
              trained pianist with 10 years of study. I bring discipline,
              creativity, and a relentless drive for excellence to everything I
              do.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <div>
              <div className="text-2xl font-light">5,000+</div>
              <div className="mt-1 text-muted">
                Customers from one viral ad
              </div>
            </div>
            <div>
              <div className="text-2xl font-light">Part 107</div>
              <div className="mt-1 text-muted">Licensed drone pilot</div>
            </div>
            <div>
              <div className="text-2xl font-light">Eagle Scout</div>
              <div className="mt-1 text-muted">Leadership & discipline</div>
            </div>
          </div>
          <a
            href="#contact"
            className="mt-8 inline-block bg-foreground px-8 py-3 text-sm tracking-widest uppercase text-white transition-opacity hover:opacity-80"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
