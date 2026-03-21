"use client";

import { useState } from "react";
import { Instagram, Facebook, Youtube, Phone, Mail } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message, website, source: "homepage" }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionWrapper
      id="contact"
      className="border-t border-border px-6 pt-6 pb-20"
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
          {status === "success" ? (
            <div className="flex items-center justify-center">
              <p className="text-center text-lg">
                Thanks for reaching out! I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Honeypot — hidden from real users */}
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-border bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-foreground"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  className="w-full border border-border bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-foreground"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full border border-border bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-foreground"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full resize-none border border-border bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-foreground"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-red-600">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-foreground px-8 py-3 text-sm tracking-widest uppercase text-white transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}

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
