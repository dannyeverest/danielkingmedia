import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel King Media | Photography & Videography | Seattle",
  description:
    "Professional photography, videography, and drone services in the Seattle/Tacoma area. Visual storytelling that drives results.",
  openGraph: {
    title: "Daniel King Media | Photography & Videography | Seattle",
    description:
      "Professional photography, videography, and drone services in the Seattle/Tacoma area.",
    type: "website",
    url: "https://danielkingmedia.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
