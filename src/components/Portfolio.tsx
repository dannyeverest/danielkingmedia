"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const categories = ["All", "People", "Places", "Things", "Pets"];

const images = [
  // People
  { src: "/portfolio/people/barski-0194.jpg", category: "People" },
  { src: "/portfolio/people/Copy-of-IMG_7381-10.jpg", category: "People" },
  { src: "/portfolio/people/DK-ALI-9537.jpg", category: "People" },
  { src: "/portfolio/people/DK-ALI.jpg", category: "People" },
  { src: "/portfolio/people/DKM-Photos-2023-20.jpeg", category: "People" },
  { src: "/portfolio/people/IMG_0778.jpg", category: "People" },
  { src: "/portfolio/people/Photo-1090-2.jpg", category: "People" },
  { src: "/portfolio/people/S&B-FInal-41.jpg", category: "People" },
  { src: "/portfolio/people/Vet-Headshot-16.jpg", category: "People" },
  { src: "/portfolio/people/Vet-Headshot-2.jpg", category: "People" },
  { src: "/portfolio/people/Vet-Headshot-5.jpg", category: "People" },
  { src: "/portfolio/people/Vet-Headshot-9.jpg", category: "People" },
  // Places
  { src: "/portfolio/places/AIS-38.jpg", category: "Places" },
  { src: "/portfolio/places/AIS-44.jpg", category: "Places" },
  { src: "/portfolio/places/DKM-Lockwood-0856.jpg", category: "Places" },
  { src: "/portfolio/places/IMG_3614.jpg", category: "Places" },
  { src: "/portfolio/places/IMG_4346.jpg", category: "Places" },
  { src: "/portfolio/places/IMG_8786.jpg", category: "Places" },
  { src: "/portfolio/places/P1111705.jpg", category: "Places" },
  { src: "/portfolio/places/P1200782.jpg", category: "Places" },
  { src: "/portfolio/places/proc-8.jpg", category: "Places" },
  { src: "/portfolio/places/Quickshots-2.jpg", category: "Places" },
  { src: "/portfolio/places/summitski-3106.jpg", category: "Places" },
  { src: "/portfolio/places/Viewskis-2.jpg", category: "Places" },
  // Things
  { src: "/portfolio/things/Cruise-7682.jpg", category: "Things" },
  { src: "/portfolio/things/Cruise-7885.jpg", category: "Things" },
  { src: "/portfolio/things/DKM-Lockwood-7083.jpg", category: "Things" },
  { src: "/portfolio/things/DKM-Lockwood-7141.jpg", category: "Things" },
  { src: "/portfolio/things/DKM-Lockwood-8224.jpg", category: "Things" },
  { src: "/portfolio/things/DKM-Lockwood-largerset-7003.jpg", category: "Things" },
  { src: "/portfolio/things/Frwwzeski-2063.jpg", category: "Things" },
  { src: "/portfolio/things/IMG_0844.jpg", category: "Things" },
  { src: "/portfolio/things/IMG_1149.jpg", category: "Things" },
  { src: "/portfolio/things/IMG_1173.jpg", category: "Things" },
  { src: "/portfolio/things/Moore-24.jpg", category: "Things" },
  { src: "/portfolio/things/Moore-45.jpg", category: "Things" },
  // Pets
  { src: "/portfolio/Pets/barski-2592.jpg", category: "Pets" },
  { src: "/portfolio/Pets/barski-2611.jpg", category: "Pets" },
  { src: "/portfolio/Pets/Boardwalkdoggydock-.jpg", category: "Pets" },
  { src: "/portfolio/Pets/Boardwalkdoggydock-3518.jpg", category: "Pets" },
  { src: "/portfolio/Pets/IMG_4678.jpg", category: "Pets" },
  { src: "/portfolio/Pets/IMG_6854.jpg", category: "Pets" },
];

function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [shuffled, setShuffled] = useState(images);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShuffled(shuffle(images));
  }, []);

  const filtered =
    active === "All" ? shuffled : shuffled.filter((img) => img.category === active);
  const visible = active === "All" && !showAll ? filtered.slice(0, 12) : filtered;

  const lightboxIndex = lightbox ? visible.findIndex((img) => img.src === lightbox) : -1;

  const goNext = useCallback(() => {
    if (lightboxIndex < visible.length - 1) setLightbox(visible[lightboxIndex + 1].src);
  }, [lightboxIndex, visible]);

  const goPrev = useCallback(() => {
    if (lightboxIndex > 0) setLightbox(visible[lightboxIndex - 1].src);
  }, [lightboxIndex, visible]);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, goNext, goPrev]);

  return (
    <SectionWrapper id="work" className="px-6 py-20">
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
              onClick={() => { setActive(cat); setShowAll(false); }}
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
        <div key={active} className="mt-14 grid grid-cols-3 gap-1 sm:gap-2">
            {visible.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
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

        {active === "All" && !showAll && filtered.length > 12 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 text-sm tracking-widest uppercase border border-border text-muted transition-colors hover:bg-foreground hover:text-white"
            >
              Load More
            </button>
          </div>
        )}
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
            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Previous arrow */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Next arrow */}
            {lightboxIndex < visible.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            )}

            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) goNext();
                else if (info.offset.x > 80) goPrev();
              }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
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
