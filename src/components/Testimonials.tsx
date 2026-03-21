"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

const testimonials = [
  {
    quote:
      "So far, 30 leads for tree work in 4 days. Your video took the professionalism of our newsletter to a whole new level.",
    name: "Andrew Bachman",
    role: "Trout Brook Arborists",
    image: "/Bachman.jpeg",
  },
  {
    quote:
      "If there's some message you want to deliver to your clients and your audience, he's able to capture that. That's a skill worth millions. He's gifted.",
    name: "Sheryl Burke",
    role: "S. Burke Law",
    image: "/sheryl-burke.png",
  },
  {
    quote:
      "His professionalism is amazing, and he will do you right every single time. He made sure our photographs turned out absolutely perfect.",
    name: "Melanie Root",
    role: "Simply Irresistible Pets",
    image: "/MelanieRoot.jpeg",
  },
];

const stats = [
  { value: "30+", label: "Leads in 4 days" },
  { value: "5,000", label: "New customers from one ad" },
  { value: "100%", label: "Client satisfaction" },
];

export default function Testimonials() {
  return (
    <SectionWrapper
      id="results"
      className="border-t border-border bg-gray-50 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-light tracking-tight md:text-4xl">
          Client Results
        </h2>
        <p className="mt-3 text-center text-muted">
          Real outcomes from real partnerships
        </p>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-light md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between bg-white p-8 md:p-10"
            >
              <blockquote className="text-lg leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                {t.image && (
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
