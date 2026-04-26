import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "./providers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Shagun — Aapki Shaadi, Humari Zimmedari",
    template: "%s | Shagun",
  },
  description:
    "India's premier wedding services marketplace. Find trusted vendors for venues, photographers, caterers, decorators, makeup artists & more. Plan your dream wedding with Shagun.",
  keywords: [
    "wedding",
    "shaadi",
    "wedding planner",
    "wedding vendors",
    "Indian wedding",
    "venues",
    "photographers",
    "caterers",
    "decorators",
    "makeup artists",
    "bridal",
    "shagun",
  ],
  authors: [{ name: "Shagun" }],
  openGraph: {
    title: "Shagun — Aapki Shaadi, Humari Zimmedari",
    description:
      "India's premier wedding services marketplace. Plan your dream wedding with trusted vendors.",
    type: "website",
    locale: "en_IN",
    siteName: "Shagun",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          <div id="main-content" className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
