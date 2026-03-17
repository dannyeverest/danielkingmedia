"use client";

import { Instagram, Facebook, Youtube, Phone, Mail } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function Contact() {
  return (
    <SectionWrapper
      id="contact"
      className="border-t border-border px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-light tracking-tight md:text-4xl">
          Let&apos;s Create Something Together
        </h2>
        <p className="mt-3 text-center text-muted">
          Ready to elevate your brand? Get in touch.
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {/* Contact form */}
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Tell me about your project..."
                rows={5}
                className="w-full resize-none border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-foreground px-8 py-3 text-sm tracking-widest uppercase text-white transition-opacity hover:opacity-80"
            >
              Send Message
            </button>
          </form>

          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted">
                Get in Touch
              </h3>
              <div className="mt-4 space-y-3">
                <a
                  href="tel:2539217438"
                  className="flex items-center gap-3 text-muted transition-colors hover:text-foreground"
                >
                  <Phone size={18} />
                  <span>(253) 921-7438</span>
                </a>
                <a
                  href="mailto:daniel@danielkingmedia.com"
                  className="flex items-center gap-3 text-muted transition-colors hover:text-foreground"
                >
                  <Mail size={18} />
                  <span>daniel@danielkingmedia.com</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted">
                Follow Along
              </h3>
              <div className="mt-4 flex gap-4">
                <a
                  href="https://instagram.com/daniel_king_media"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-foreground"
                  aria-label="Instagram"
                >
                  <Instagram size={22} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-foreground"
                  aria-label="Facebook"
                >
                  <Facebook size={22} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-foreground"
                  aria-label="YouTube"
                >
                  <Youtube size={22} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted">
                Location
              </h3>
              <p className="mt-4 text-muted">
                Seattle / Tacoma, Washington
                <br />
                Available for travel worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
