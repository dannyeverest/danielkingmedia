"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function LogoBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-y border-border bg-gray-50 px-6 py-10 md:py-12"
    >
      <div className="mx-auto max-w-3xl">
        {/* Featured On */}
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Featured On
        </p>
        <div className="mt-6 grid grid-cols-3 items-center justify-items-center gap-4">
          <Image src="/logos/king.png" alt="KING 5" width={100} height={25} className="h-6 w-auto object-contain opacity-70 transition-all hover:opacity-100" />
          <Image src="/logos/komo-logo.svg" alt="KOMO News" width={120} height={20} className="h-8 w-auto object-contain opacity-70 transition-all hover:opacity-100" />
          <Image src="/logos/425magazine.png" alt="425 Magazine" width={60} height={25} className="h-6 w-auto object-contain opacity-70 transition-all hover:opacity-100" />
        </div>

        {/* Notable Clients */}
        <p className="mt-10 text-center text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Notable Clients
        </p>
        <div className="mt-6 grid grid-cols-2 items-center justify-items-center gap-x-4 gap-y-8 sm:grid-cols-4">
          <Image src="/logos/microsoft.svg" alt="Microsoft" width={160} height={36} className="h-8 w-auto object-contain opacity-80 transition-all hover:opacity-100" />
          <Image src="/logos/john-l-scott-logo.png" alt="John L. Scott" width={140} height={40} className="h-8 w-auto object-contain opacity-70 transition-all hover:opacity-100" />
          <Image src="/logos/movetotacoma.png" alt="Move to Tacoma" width={120} height={70} className="h-8 w-auto object-contain opacity-70 transition-all hover:opacity-100" />
          <Image src="/logos/sothebys.svg" alt="Sotheby's" width={140} height={40} className="h-8 w-auto object-contain opacity-70 transition-all hover:opacity-100" />
        </div>
      </div>
    </motion.section>
  );
}
