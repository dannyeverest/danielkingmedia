"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Camera, Clapperboard, Drone, Sunset, Rocket, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import LogoBar from "@/components/LogoBar";

const services = [
  {
    icon: Camera,
    color: "#e04e6a",
    title: "Listing Photography",
    description:
      "HDR interior & exterior photos that make every room shine. Professionally edited, delivered next day.",
  },
  {
    icon: Clapperboard,
    color: "#7c5bf5",
    title: "Video Walkthroughs",
    description:
      "Cinematic property tours that let buyers experience the home before stepping inside.",
  },
  {
    icon: Drone,
    color: "#0ea5e9",
    title: "Aerial / Drone",
    description:
      "FAA Part 107 licensed. Stunning aerial views of the property, neighborhood, and surrounding area.",
  },
  {
    icon: Sunset,
    color: "#f59e0b",
    title: "Twilight Shoots",
    description:
      "Golden hour and twilight exteriors that create that luxury feel and stop the scroll on listings.",
  },
  {
    icon: Rocket,
    color: "#10b981",
    title: "Content Marketing",
    description:
      "Social media reels, ad-ready clips, and branded content that drive traffic to your listings.",
  },
];

const galleryImages: string[] = [
  "/realestate/1234-1.jpg",
  "/realestate/1234-4.jpg",
  "/realestate/1234-7.jpg",
  "/realestate/Photo-3.jpg",
  "/realestate/Photo-6.jpg",
  "/realestate/Photo-7.jpg",
  "/realestate/Photo-8.jpg",
  "/realestate/Photo-9.jpg",
  "/realestate/Photo-10.jpg",
  "/realestate/Photo-12.jpg",
  "/realestate/Photo-13.jpg",
  "/realestate/Photo-14.jpg",
  "/realestate/Photo-15.jpg",
  "/realestate/Photo-16.jpg",
  "/realestate/Photo-22.jpg",
];

const videoTours = [
  { src: "/realestate-videos/1804 Unbranded.mp4", poster: "/realestate-videos/1804-poster.jpg" },
  { src: "/realestate-videos/20006 Unbranded.mp4", poster: "/realestate-videos/20006-poster.jpg" },
  { src: "/realestate-videos/Untitled Project.mp4", poster: "/realestate-videos/untitled-poster.jpg" },
];

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function RealEstatePage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formWebsite, setFormWebsite] = useState(""); // honeypot
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          email: formEmail,
          message: formMessage,
          propertyAddress: formAddress,
          website: formWebsite,
          source: "realestate",
        }),
      });

      if (!res.ok) throw new Error();
      setFormStatus("success");
      setFormName("");
      setFormPhone("");
      setFormEmail("");
      setFormAddress("");
      setFormMessage("");
    } catch {
      setFormStatus("error");
    }
  }

  const updateScrollButtons = useCallback(() => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const firstChild = el.firstElementChild as HTMLElement | null;
    if (!firstChild) return;
    // Check if scrolled past roughly half the first card
    const threshold = firstChild.offsetWidth / 2;
    setCanScrollLeft(el.scrollLeft > threshold);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - threshold);
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.offsetWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Back to home */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/DKMLogoSquare.svg"
              alt="Daniel King Media"
              width={36}
              height={36}
            />
            <span className="text-lg font-semibold tracking-tight">Daniel King Media</span>
          </a>
          <a
            href="#book"
            className="bg-foreground px-5 py-2 text-sm tracking-widest uppercase text-white transition-opacity hover:opacity-80"
          >
            Book Now
          </a>
        </div>
      </div>

      {/* Hero with video background */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-16">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/realestate-hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/realestate-hero-web.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-6 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold uppercase tracking-tight md:text-6xl"
          >
            Real Estate Media
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-xl text-lg text-white/80"
          >
            Professional photography, video tours & drone coverage that sell
            listings faster in the Seattle/Tacoma market.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#book"
              className="bg-white px-8 py-3 text-sm tracking-widest uppercase text-black transition-opacity hover:opacity-80"
            >
              Book a Shoot
            </a>
            <a
              href="#gallery"
              className="border border-white/50 px-8 py-3 text-sm tracking-widest uppercase text-white transition-all hover:bg-white hover:text-black"
            >
              View Work
            </a>
          </motion.div>
        </div>
      </section>

      <LogoBar />

      {/* Services */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="text-center text-3xl font-light tracking-tight md:text-4xl">
              Packages &amp; Services
            </h2>
            <p className="mt-3 text-center text-muted">
              Everything you need to make your listing stand out
            </p>
          </FadeIn>

          {/* Desktop grid */}
          <div className="mt-14 hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <FadeIn key={service.title}>
                <div className="text-center">
                  <div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl backdrop-blur-md"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}18, ${service.color}08)`,
                      boxShadow: `0 4px 24px ${service.color}25, 0 0 0 1px ${service.color}15`,
                    }}
                  >
                    <service.icon size={28} strokeWidth={1.5} style={{ color: service.color }} />
                  </div>
                  <h3 className="mt-5 text-sm font-semibold uppercase tracking-widest">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="relative mt-14 sm:hidden">
            <div
              ref={carouselRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[12.5vw] pb-4 scrollbar-hide"
              onScroll={updateScrollButtons}
            >
              {services.map((service) => (
                <div
                  key={service.title}
                  className="min-w-[75vw] snap-center text-center"
                >
                  <div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl backdrop-blur-md"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}18, ${service.color}08)`,
                      boxShadow: `0 4px 24px ${service.color}25, 0 0 0 1px ${service.color}15`,
                    }}
                  >
                    <service.icon size={28} strokeWidth={1.5} style={{ color: service.color }} />
                  </div>
                  <h3 className="mt-5 text-sm font-semibold uppercase tracking-widest">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
            {canScrollLeft && (
              <button
                onClick={() => scrollCarousel("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scrollCarousel("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="border-t border-border bg-gray-50 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="text-center text-3xl font-light tracking-tight md:text-4xl">
              Recent Listings
            </h2>
            <p className="mt-3 text-center text-muted">
              Properties photographed across the Pacific Northwest
            </p>
          </FadeIn>

          {galleryImages.length > 0 ? (
            <div className="mt-14 grid grid-cols-3 gap-1 sm:gap-2">
              {galleryImages.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i % 3 * 0.1 }}
                  className="relative aspect-square overflow-hidden"
                >
                  <Image
                    src={src}
                    alt="Real estate listing"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mt-14 flex items-center justify-center rounded border border-dashed border-border py-20">
              <p className="text-muted">Gallery coming soon — listing photos will go here</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Tours */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="text-center text-3xl font-light tracking-tight md:text-4xl">
              Video Tours
            </h2>
            <p className="mt-3 text-center text-muted">
              Full walkthrough videos that sell homes before the first showing
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videoTours.map((video) => (
              <FadeIn key={video.src}>
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={video.poster}
                  className="aspect-video w-full object-cover"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Book */}
      <section id="book" className="border-t border-border px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl">
          <FadeIn>
            <h2 className="text-center text-3xl font-light tracking-tight md:text-4xl">
              Book a Listing Shoot
            </h2>
            <p className="mt-3 text-center text-muted">
              Quick turnaround. Professional results. Let&apos;s get your listing sold.
            </p>
          </FadeIn>

          <FadeIn className="mt-14">
            {formStatus === "success" ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-center text-lg">
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleFormSubmit}>
                {/* Honeypot — hidden from real users */}
                <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formWebsite}
                    onChange={(e) => setFormWebsite(e.target.value)}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full border border-border bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-foreground"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full border border-border bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-foreground"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email (optional)"
                  className="w-full border border-border bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-foreground"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Property Address"
                  className="w-full border border-border bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-foreground"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                />
                <textarea
                  placeholder="Tell me about the property and what you need..."
                  rows={4}
                  className="w-full resize-none border border-border bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-foreground"
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                />
                {formStatus === "error" && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full bg-foreground px-8 py-3 text-sm tracking-widest uppercase text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  {formStatus === "loading" ? "Sending..." : "Request a Quote"}
                </button>
              </form>
            )}
          </FadeIn>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
            <a
              href="tel:2539217438"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Phone size={16} />
              (253) 921-7438
            </a>
            <a
              href="mailto:daniel@danielkingmedia.com"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail size={16} />
              daniel@danielkingmedia.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
