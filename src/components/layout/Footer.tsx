import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heart } from "lucide-react";

const footerLinks = {
  "Wedding Vendors": [
    { label: "Venues", href: "/categories/venues" },
    { label: "Photographers", href: "/categories/photography" },
    { label: "Makeup Artists", href: "/categories/makeup-beauty" },
    { label: "Decorators", href: "/categories/planning-decor" },
    { label: "Caterers", href: "/categories/food-catering" },
    { label: "DJs", href: "/categories/music-entertainment" },
  ],
  "Popular Cities": [
    { label: "Mumbai", href: "/cities/mumbai" },
    { label: "Delhi", href: "/cities/delhi" },
    { label: "Bangalore", href: "/cities/bangalore" },
    { label: "Jaipur", href: "/cities/jaipur" },
    { label: "Udaipur", href: "/cities/udaipur" },
    { label: "Goa", href: "/cities/goa" },
  ],
  "Quick Links": [
    { label: "About Us", href: "/about" },
    { label: "Real Weddings", href: "/real-weddings" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Register as Vendor", href: "/register" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="inline-block">
              <span className="text-3xl font-heading font-bold text-gradient-gold">Shagun</span>
            </Link>
            <p className="mt-4 text-slate-light text-sm leading-relaxed">
              India&apos;s Wedding Super App. Find the perfect vendors for your dream wedding — all in one place.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-heading text-lg text-gold mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-light hover:text-gold transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-light text-sm">
            &copy; {new Date().getFullYear()} Shagun. All rights reserved.
          </p>
          <p className="text-slate-light text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-magenta fill-magenta" /> in India
          </p>
        </div>
      </Container>
    </footer>
  );
}
