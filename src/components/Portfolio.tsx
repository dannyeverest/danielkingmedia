"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const categories = ["All", "Commercial", "Portraits", "Headshots", "Events", "Jewelry", "Landscapes"];

const images = [
  // Commercial
  { src: "/portfolio/Copy-of-WPP.jpg", category: "Commercial" },
  { src: "/portfolio/Copy-of-IMG_7381-10.jpg", category: "Commercial" },
  { src: "/portfolio/IMG_2696.jpg", category: "Commercial" },
  { src: "/portfolio/Quickshots-2.jpg", category: "Commercial" },
  { src: "/portfolio/VCACentral-6.jpg", category: "Commercial" },
  // Portraits
  { src: "/portfolio/DKM-Photos-2023-03.jpeg", category: "Portraits" },
  { src: "/portfolio/DKM-Photos-2023-11.jpeg", category: "Portraits" },
  { src: "/portfolio/DKM-Photos-2023-15.jpeg", category: "Portraits" },
  { src: "/portfolio/DKM-Photos-2023-16.jpeg", category: "Portraits" },
  { src: "/portfolio/DKM-Photos-2023-20.jpeg", category: "Portraits" },
  { src: "/portfolio/DKM-Photos-2023-23.jpeg", category: "Portraits" },
  { src: "/portfolio/DKM-Photos-2023-28.jpg", category: "Portraits" },
  { src: "/portfolio/IMG_2648.jpg", category: "Portraits" },
  { src: "/portfolio/IMG_3777.jpg", category: "Portraits" },
  { src: "/portfolio/Haval-2.jpg", category: "Portraits" },
  { src: "/portfolio/S&B-FInal-41.jpg", category: "Portraits" },
  { src: "/portfolio/S&B-FInal-74.jpg", category: "Portraits" },
  // Events
  { src: "/portfolio/DK-ALI.jpg", category: "Events" },
  { src: "/portfolio/DK-ALI-4.jpg", category: "Events" },
  { src: "/portfolio/DK-ALI-8.jpg", category: "Events" },
  { src: "/portfolio/DK-ALI-9162.jpg", category: "Events" },
  { src: "/portfolio/DK-ALI-9201.jpg", category: "Events" },
  { src: "/portfolio/DK-ALI-9537.jpg", category: "Events" },
  { src: "/portfolio/DKM-Lockwood-6.jpg", category: "Events" },
  { src: "/portfolio/DKM-Lockwood-6589.jpg", category: "Events" },
  { src: "/portfolio/DKM-Lockwood-7233.jpg", category: "Events" },
  { src: "/portfolio/DKM-Lockwood-7259.jpg", category: "Events" },
  { src: "/portfolio/DKM-Lockwood-7882.jpg", category: "Events" },
  { src: "/portfolio/DKM-Lockwood-8224edited.jpg", category: "Events" },
  // Headshots
  { src: "/portfolio/Vet-Headshot-1.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-2.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-3.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-4.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-5.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-6.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-7.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-8.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-9.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-10.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-11.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-12.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-13.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-14.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-15.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-16.jpg", category: "Headshots" },
  { src: "/portfolio/Vet-Headshot-17.webp", category: "Headshots" },
  // Jewelry
  { src: "/portfolio/Moore-2.jpg", category: "Jewelry" },
  { src: "/portfolio/Moore-3.jpg", category: "Jewelry" },
  { src: "/portfolio/Moore-4.jpg", category: "Jewelry" },
  { src: "/portfolio/Moore-5.jpg", category: "Jewelry" },
  { src: "/portfolio/Moore-6.jpg", category: "Jewelry" },
  { src: "/portfolio/Moore-24.jpg", category: "Jewelry" },
  { src: "/portfolio/Moore-45.jpg", category: "Jewelry" },
  // Landscapes
  { src: "/portfolio/IMG_0778.jpg", category: "Landscapes" },
  { src: "/portfolio/IMG_0853.JPG", category: "Landscapes" },
  { src: "/portfolio/IMG_3614.jpg", category: "Landscapes" },
  { src: "/portfolio/IMG_3712.jpg", category: "Landscapes" },
  { src: "/portfolio/IMG_4041.jpg", category: "Landscapes" },
  { src: "/portfolio/IMG_4174.jpg", category: "Landscapes" },
  { src: "/portfolio/IMG_4299.jpg", category: "Landscapes" },
  { src: "/portfolio/IMG_4346.jpg", category: "Landscapes" },
  { src: "/portfolio/IMG_4357.jpg", category: "Landscapes" },
  { src: "/portfolio/IMG_4364.jpg", category: "Landscapes" },
  { src: "/portfolio/IMG_5223.JPG", category: "Landscapes" },
];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    active === "All" ? images : images.filter((img) => img.category === active);

  return (
    <SectionWrapper id="work" className="px-6 py-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-light tracking-tight md:text-4xl">
          Selected Work
        </h2>
        <p className="mt-3 text-center text-muted">
          Photography & videography across the Pacific Northwest
        </p>

        {/* Filter buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-sm tracking-wide transition-all ${
                active === cat
                  ? "bg-foreground text-white"
                  : "bg-gray-100 text-muted hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <div className="mt-14 grid grid-cols-3 gap-1 sm:gap-2">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i % 3 * 0.1 }}
                className="relative aspect-[3/4] cursor-pointer overflow-hidden"
                onClick={() => setLightbox(img.src)}
              >
                <Image
                  src={img.src}
                  alt={`Portfolio - ${img.category}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-[90vw]"
            >
              <Image
                src={lightbox}
                alt="Portfolio enlarged"
                width={1600}
                height={1200}
                className="max-h-[90vh] w-auto object-contain"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
